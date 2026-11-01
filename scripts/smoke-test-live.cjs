const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function runLiveSmokeTest() {
  const screenshotsDir = path.join(__dirname, '../verification_screenshots/live_smoke_test');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
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

  const report = {
    url: 'http://localhost:4173',
    timestamp: new Date().toISOString(),
    desktop: {
      consoleLogs: [],
      consoleErrors: [],
      sparkleAnalysis: [],
      scrollObservations: [],
      features: {},
    },
    mobile: {
      consoleLogs: [],
      consoleErrors: [],
      sparkleAnalysis: [],
      scrollObservations: [],
      features: {},
    },
  };

  try {
    // ==========================================
    // 1. LAPTOP VIEWPORT (1440x900)
    // ==========================================
    console.log('>>> TESTING LAPTOP VIEWPORT (1440x900)...');
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

    page.on('console', (msg) => {
      const text = msg.text();
      const type = msg.type();
      if (type === 'error') {
        report.desktop.consoleErrors.push(text);
      } else {
        report.desktop.consoleLogs.push(`[${type}] ${text}`);
      }
    });

    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 2000));

    // Capture initial load
    await page.screenshot({ path: path.join(screenshotsDir, 'desktop_01_hero_initial.png') });

    // Inspect Canvas & Sparkle elements
    const getSparkleInfo = async () => {
      return await page.evaluate(() => {
        const canvases = Array.from(document.querySelectorAll('canvas')).map((c) => {
          const rect = c.getBoundingClientRect();
          return {
            id: c.id,
            className: c.className,
            width: c.width,
            height: c.height,
            cssWidth: rect.width,
            cssHeight: rect.height,
            top: rect.top,
            left: rect.left,
          };
        });

        // Search for any element that looks yellow/sun-like or glowing
        const yellowElements = [];
        document.querySelectorAll('*').forEach((el) => {
          const comp = window.getComputedStyle(el);
          const bg = comp.backgroundColor;
          const border = comp.borderColor;
          const color = comp.color;
          const isYellowOrGold =
            bg.includes('197, 139, 75') ||
            bg.includes('255, 170, 85') ||
            bg.includes('255, 200,') ||
            comp.backgroundImage.includes('gradient') ||
            (comp.boxShadow && comp.boxShadow.includes('197, 139, 75'));

          const classNameStr = typeof el.className === 'string' ? el.className : '';
          if (
            isYellowOrGold ||
            classNameStr.includes('sun') ||
            classNameStr.includes('sparkle') ||
            classNameStr.includes('pulse') ||
            el.id.includes('sun') ||
            el.id.includes('sparkle')
          ) {
            const r = el.getBoundingClientRect();
            if (r.width > 0 && r.height > 0 && r.top < window.innerHeight && r.bottom > 0) {
              yellowElements.push({
                tag: el.tagName,
                id: el.id,
                className: classNameStr.slice(0, 100),
                rect: { top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) },
                text: el.innerText ? el.innerText.trim().slice(0, 50) : '',
                boxShadow: comp.boxShadow,
                borderRadius: comp.borderRadius,
              });
            }
          }
        });

        return { canvases, yellowElements: yellowElements.slice(0, 15) };
      });
    };

    report.desktop.sparkleAnalysis.push({
      scrollPos: 0,
      info: await getSparkleInfo(),
    });

    // Scroll through zones and take screenshots
    const scrollSteps = [0.15, 0.35, 0.55, 0.75, 0.95];
    for (let i = 0; i < scrollSteps.length; i++) {
      const targetProgress = scrollSteps[i];
      await page.evaluate((prog) => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: totalHeight * prog, behavior: 'instant' });
      }, targetProgress);

      await new Promise((r) => setTimeout(r, 1200));

      const filename = `desktop_scroll_step_${i + 1}_prog_${Math.round(targetProgress * 100)}.png`;
      await page.screenshot({ path: path.join(screenshotsDir, filename) });

      const info = await getSparkleInfo();
      report.desktop.scrollObservations.push({
        step: i + 1,
        progress: targetProgress,
        scrollY: await page.evaluate(() => window.scrollY),
        activeElements: info.yellowElements.length,
      });
    }

    // Test Solar switcher presets
    console.log('Testing Solar Switcher on Laptop...');
    const solarBtns = await page.$$('button[title*="Sun"], button[title*="Hour"], button[title*="Candlelight"]');
    console.log(`Found ${solarBtns.length} solar preset buttons`);
    if (solarBtns.length > 0) {
      await solarBtns[0].click();
      await new Promise((r) => setTimeout(r, 1000));
      await page.screenshot({ path: path.join(screenshotsDir, 'desktop_solar_clicked.png') });
    }

    // Scroll to Menu section and inspect
    console.log('Testing Menu section on Laptop...');
    await page.evaluate(() => {
      const menu = document.getElementById('menu');
      if (menu) menu.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(screenshotsDir, 'desktop_menu_section.png') });

    // Click a dish to open 3D Modal
    const dishCard = await page.$('[data-dish-id="kolkata-biryani"]');
    if (dishCard) {
      console.log('Clicking Kolkata Biryani card...');
      await dishCard.click();
      await new Promise((r) => setTimeout(r, 2000));
      await page.screenshot({ path: path.join(screenshotsDir, 'desktop_dish_modal_open.png') });

      // Close modal
      const closeBtn = await page.$('button[aria-label*="Close"], button:has(svg.lucide-x)');
      if (closeBtn) await closeBtn.click();
      await new Promise((r) => setTimeout(r, 500));
    }

    await page.close();

    // ==========================================
    // 2. MOBILE VIEWPORT (iPhone 14 / 390x844)
    // ==========================================
    console.log('>>> TESTING MOBILE VIEWPORT (390x844)...');
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });

    mobilePage.on('console', (msg) => {
      const text = msg.text();
      const type = msg.type();
      if (type === 'error') {
        report.mobile.consoleErrors.push(text);
      } else {
        report.mobile.consoleLogs.push(`[${type}] ${text}`);
      }
    });

    await mobilePage.goto('http://localhost:4173', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 2000));

    // Capture mobile hero
    await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile_01_hero.png') });

    // Inspect sparkle/sun on mobile initial
    report.mobile.sparkleAnalysis.push({
      scrollPos: 0,
      info: await mobilePage.evaluate(() => {
        const canvases = Array.from(document.querySelectorAll('canvas')).map((c) => ({
          id: c.id,
          width: c.width,
          height: c.height,
          rect: c.getBoundingClientRect(),
        }));
        return { canvases };
      }),
    });

    // Mobile scroll steps
    for (let i = 0; i < scrollSteps.length; i++) {
      const targetProgress = scrollSteps[i];
      await mobilePage.evaluate((prog) => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: totalHeight * prog, behavior: 'instant' });
      }, targetProgress);

      await new Promise((r) => setTimeout(r, 1200));

      const filename = `mobile_scroll_step_${i + 1}_prog_${Math.round(targetProgress * 100)}.png`;
      await mobilePage.screenshot({ path: path.join(screenshotsDir, filename) });
    }

    // Mobile Navigation & Menu drawer check
    console.log('Testing Mobile Navigation drawer...');
    await mobilePage.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 500));
    const mobileMenuBtn = await mobilePage.$('button[aria-label*="menu" i], nav button:has(svg.lucide-menu)');
    if (mobileMenuBtn) {
      await mobileMenuBtn.click();
      await new Promise((r) => setTimeout(r, 800));
      await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile_nav_drawer_open.png') });
    }

    // Scroll to Mobile Menu & test Add to Cart
    await mobilePage.evaluate(() => {
      const menu = document.getElementById('menu');
      if (menu) menu.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1200));
    await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile_menu_section.png') });

    // Click Add to Cart on mobile
    const added = await mobilePage.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const addBtn = buttons.find(b => b.textContent.includes('Add') || b.textContent.includes('অর্ডার'));
      if (addBtn) {
        addBtn.click();
        return true;
      }
      return false;
    });
    if (added) {
      await new Promise((r) => setTimeout(r, 1000));
      await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile_dish_added_to_cart.png') });
    }

    // Check Footer & Sarberia Map / Bengali details
    await mobilePage.evaluate(() => {
      window.scrollTo(0, document.documentElement.scrollHeight);
    });
    await new Promise((r) => setTimeout(r, 1000));
    await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile_footer.png') });

    await mobilePage.close();

    console.log('Smoke test completed successfully!');
  } finally {
    await browser.close();
  }

  fs.writeFileSync(
    path.join(screenshotsDir, 'smoke_test_report.json'),
    JSON.stringify(report, null, 2)
  );
  console.log('Report saved to verification_screenshots/live_smoke_test/smoke_test_report.json');
}

runLiveSmokeTest().catch((err) => {
  console.error('Smoke test failed:', err);
  process.exit(1);
});
