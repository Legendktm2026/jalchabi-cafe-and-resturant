const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const VIEWPORTS = [
  // Mobile
  { name: 'Mobile-320', width: 320, height: 640, isMobile: true, dpr: 2 },
  { name: 'Mobile-360', width: 360, height: 740, isMobile: true, dpr: 3 },
  { name: 'Mobile-375-SE', width: 375, height: 667, isMobile: true, dpr: 2 },
  { name: 'Mobile-390-i14', width: 390, height: 844, isMobile: true, dpr: 3 },
  { name: 'Mobile-402', width: 402, height: 874, isMobile: true, dpr: 3 },
  { name: 'Mobile-412-Pixel', width: 412, height: 915, isMobile: true, dpr: 3.5 },
  { name: 'Mobile-430-i14ProMax', width: 430, height: 932, isMobile: true, dpr: 3 },
  { name: 'Mobile-440-i17ProMax', width: 440, height: 956, isMobile: true, dpr: 3 },
  // Tablet
  { name: 'Tablet-768-iPadMini', width: 768, height: 1024, isMobile: true, dpr: 2 },
  { name: 'Tablet-820-iPadAir', width: 820, height: 1180, isMobile: true, dpr: 2 },
  { name: 'Tablet-1024-iPadPro', width: 1024, height: 1366, isMobile: true, dpr: 2 },
  // Desktop
  { name: 'Desktop-1280', width: 1280, height: 800, isMobile: false, dpr: 1 },
  { name: 'Desktop-1440', width: 1440, height: 900, isMobile: false, dpr: 2 },
  { name: 'Desktop-1920', width: 1920, height: 1080, isMobile: false, dpr: 1 }
];

async function runAllViewportAudit() {
  const outputDir = path.join(__dirname, '../verification_screenshots/all_viewports');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--use-gl=angle',
      '--enable-webgl',
      '--ignore-gpu-blocklist',
    ],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  const results = [];

  for (const vp of VIEWPORTS) {
    console.log(`Auditing viewport: ${vp.name} (${vp.width}x${vp.height}, dpr:${vp.dpr})`);
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: vp.dpr,
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile
    });

    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 25000 });
    await new Promise((r) => setTimeout(r, 1200));

    // Check overflow at top
    const checkOverflow = async (scrollPosName) => {
      return await page.evaluate((pos) => {
        const winWidth = window.innerWidth;
        const bodyWidth = document.body.scrollWidth;
        const docWidth = document.documentElement.scrollWidth;
        const overflowing = [];

        document.querySelectorAll('*').forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.right > winWidth + 2) {
            overflowing.push({
              tag: el.tagName,
              id: el.id,
              className: (el.className || '').toString().slice(0, 70),
              right: Math.round(rect.right),
              width: Math.round(rect.width),
              winWidth: winWidth
            });
          }
        });

        return {
          pos,
          winWidth,
          bodyWidth,
          docWidth,
          hasOverflow: bodyWidth > winWidth || docWidth > winWidth,
          overflowCount: overflowing.length,
          topOffenders: overflowing.slice(0, 5)
        };
      }, scrollPosName);
    };

    const topOverflow = await checkOverflow('top');

    // Scroll through sections to check mid and bottom overflow
    await page.evaluate(() => window.scrollBy(0, 800));
    await new Promise((r) => setTimeout(r, 400));
    const mid1Overflow = await checkOverflow('mid-800');

    await page.evaluate(() => {
      const menu = document.getElementById('menu');
      if (menu) menu.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 400));
    const menuOverflow = await checkOverflow('menu');

    await page.evaluate(() => {
      const res = document.getElementById('reservations');
      if (res) res.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 400));
    const resOverflow = await checkOverflow('reservations');

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise((r) => setTimeout(r, 400));
    const bottomOverflow = await checkOverflow('bottom');

    // Take screenshot of landing
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 500));
    const shotPath = path.join(outputDir, `${vp.name}_landing.png`);
    await page.screenshot({ path: shotPath, fullPage: false });

    // If mobile, test menu drawer
    let menuOpenOverflow = null;
    if (vp.isMobile && vp.width < 1024) {
      const menuBtn = await page.$('button[aria-label="Toggle menu"]');
      if (menuBtn) {
        await menuBtn.click();
        await new Promise((r) => setTimeout(r, 500));
        menuOpenOverflow = await checkOverflow('mobile-menu-open');
        await page.screenshot({ path: path.join(outputDir, `${vp.name}_menu_drawer.png`), fullPage: false });
        await menuBtn.click();
        await new Promise((r) => setTimeout(r, 300));
      }
    }

    results.push({
      viewport: vp.name,
      width: vp.width,
      height: vp.height,
      topOverflow,
      mid1Overflow,
      menuOverflow,
      resOverflow,
      bottomOverflow,
      menuOpenOverflow
    });
  }

  await browser.close();

  const summary = {
    testedViewportsCount: VIEWPORTS.length,
    results,
    consoleErrorsCount: consoleErrors.length,
    consoleErrors: consoleErrors.slice(0, 10)
  };

  fs.writeFileSync(
    path.join(__dirname, '../verification_screenshots/all_viewports/audit_summary.json'),
    JSON.stringify(summary, null, 2)
  );

  console.log('=== AUDIT COMPLETE ===');
  console.log(`Tested ${VIEWPORTS.length} viewports. Check audit_summary.json for details.`);
}

runAllViewportAudit().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
