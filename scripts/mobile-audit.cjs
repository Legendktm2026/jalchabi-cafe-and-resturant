const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

async function runMobileAudit() {
  const screenshotDir = path.join(__dirname, '../verification_screenshots/mobile_audit');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  console.log('--- Starting Vite Preview Server ---');
  const server = spawn('npx', ['vite', 'preview', '--port', '4173'], {
    cwd: path.join(__dirname, '..'),
    stdio: 'pipe',
  });

  server.stdout.on('data', (d) => {
    const text = d.toString().trim();
    if (text) console.log('[Server]', text);
  });

  await new Promise((r) => setTimeout(r, 2500));

  let browser;
  const auditResults = {
    horizontalOverflows: [],
    viewportTests: [],
    consoleErrors: [],
  };

  try {
    browser = await puppeteer.launch({
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
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        auditResults.consoleErrors.push(msg.text());
        console.error('[Console Error]', msg.text());
      }
    });

    // Device 1: iPhone 14 (390 x 844)
    console.log('=== Testing iPhone 14 Viewport (390 x 844, dpr: 3) ===');
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 25000 });
    await new Promise((r) => setTimeout(r, 2000));

    // Check overflow
    const checkOverflow = async (sectionName) => {
      const overflow = await page.evaluate(() => {
        const bodyWidth = document.body.scrollWidth;
        const htmlWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const elementsOverflowing = [];
        document.querySelectorAll('*').forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.right > winWidth + 2) {
            elementsOverflowing.push({
              tag: el.tagName,
              className: (el.className || '').toString().slice(0, 50),
              right: rect.right,
              winWidth: winWidth,
            });
          }
        });
        return {
          winWidth,
          bodyWidth,
          htmlWidth,
          hasOverflow: bodyWidth > winWidth || htmlWidth > winWidth,
          overflowCount: elementsOverflowing.length,
          elementsOverflowing: elementsOverflowing.slice(0, 5),
        };
      });
      console.log(`[Overflow Check: ${sectionName}]`, overflow.hasOverflow ? 'FAIL - Elements overflow' : 'PASS - No horizontal scroll');
      if (overflow.hasOverflow) {
        auditResults.horizontalOverflows.push({ section: sectionName, details: overflow });
      }
      return overflow;
    };

    // 1. Landing / Zone 0
    await checkOverflow('Landing Hero');
    await page.screenshot({ path: path.join(screenshotDir, '01_mobile_hero.png') });

    // 2. Open Mobile Menu
    console.log('Testing Mobile Menu interaction...');
    const hamburgerBtn = await page.$('button[aria-label="Toggle menu"]');
    if (hamburgerBtn) {
      await hamburgerBtn.click();
      await new Promise((r) => setTimeout(r, 600));
      await page.screenshot({ path: path.join(screenshotDir, '02_mobile_menu_open.png') });
      await hamburgerBtn.click(); // Close
      await new Promise((r) => setTimeout(r, 400));
    }

    // 3. Enter Sanctuary / Scrollytelling
    console.log('Clicking ENTER JALCHABI...');
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent?.includes('ENTER JALCHABI')
      );
      btn?.click();
    });
    await new Promise((r) => setTimeout(r, 2500));
    await page.screenshot({ path: path.join(screenshotDir, '03_mobile_sanctuary_zone1.png') });
    await checkOverflow('Zone 1 Sanctuary');

    // 4. Scroll down to Story Section
    console.log('Scrolling to Founder Story...');
    await page.evaluate(() => {
      document.getElementById('founder-story')?.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 800));
    await checkOverflow('Founder Story');
    await page.screenshot({ path: path.join(screenshotDir, '04_mobile_founder_story.png') });

    // 5. Scroll down to Menu Section
    console.log('Scrolling to Menu Section...');
    await page.evaluate(() => {
      document.getElementById('menu')?.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 800));
    await checkOverflow('Menu Section');
    await page.screenshot({ path: path.join(screenshotDir, '05_mobile_menu.png') });

    // 6. Test Adding Item to Cart & Opening Cart Drawer
    console.log('Adding item to Cart...');
    const addBtn = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const add = btns.find((b) => b.textContent?.includes('Add') || b.textContent?.includes('যোগ করুন'));
      if (add) {
        add.click();
        return true;
      }
      return false;
    });
    console.log('Add button found and clicked:', addBtn);
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(screenshotDir, '06_mobile_item_added.png') });

    // Open Cart Drawer
    console.log('Opening Cart Drawer on mobile...');
    await page.evaluate(() => {
      const cartBtn = document.querySelector('button[aria-label="Shopping Cart"]') ||
                      document.querySelector('button[aria-label="Your Cart"]');
      if (cartBtn) cartBtn.click();
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(screenshotDir, '07_mobile_cart_drawer.png') });

    // Click Proceed to Checkout in Cart
    console.log('Proceeding to Checkout Modal...');
    await page.evaluate(() => {
      const checkoutBtn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent?.includes('Proceed to Checkout') || 
        b.textContent?.includes('এখনই অর্ডার') ||
        b.textContent?.includes('অর্ডার সম্পূর্ণ')
      );
      checkoutBtn?.click();
    });
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(screenshotDir, '08_mobile_checkout_modal.png') });

    // Close Checkout Modal
    await page.evaluate(() => {
      // Find modal close button or click backdrop
      const closeButtons = Array.from(document.querySelectorAll('button'));
      const closeBtn = closeButtons.find(b => b.querySelector('svg.lucide-x') || b.getAttribute('aria-label')?.includes('Close'));
      if (closeBtn) {
        closeBtn.click();
      } else {
        const backdrop = document.querySelector('.fixed.inset-0.bg-black\\/80');
        if (backdrop) backdrop.click();
      }
    });
    await new Promise((r) => setTimeout(r, 800));

    // Also ensure Cart Drawer is closed
    await page.evaluate(() => {
      const closeButtons = Array.from(document.querySelectorAll('button'));
      const closeBtn = closeButtons.find(b => b.querySelector('svg.lucide-x'));
      closeBtn?.click();
    });
    await new Promise((r) => setTimeout(r, 800));

    // 7. Scroll to Reservations
    console.log('Scrolling to Reservations...');
    await page.evaluate(() => {
      document.getElementById('reservations')?.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 800));
    await checkOverflow('Reservations');
    await page.screenshot({ path: path.join(screenshotDir, '09_mobile_reservations.png') });

    // 8. Scroll to Visit / Location & Footer
    console.log('Scrolling to Visit & Footer...');
    await page.evaluate(() => {
      document.getElementById('visit')?.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 800));
    await checkOverflow('Visit Section');
    await page.screenshot({ path: path.join(screenshotDir, '10_mobile_visit.png') });

    await page.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 800));
    await checkOverflow('Footer');
    await page.screenshot({ path: path.join(screenshotDir, '11_mobile_footer.png') });

    // Device 2: iPhone SE (375 x 667) - compact screen test
    console.log('=== Testing iPhone SE Compact Viewport (375 x 667) ===');
    await page.setViewport({ width: 375, height: 667, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await new Promise((r) => setTimeout(r, 1000));
    await checkOverflow('iPhone SE Landing');
    await page.screenshot({ path: path.join(screenshotDir, '12_iphone_se_landing.png') });

    console.log('=== Mobile Audit Completed Successfully ===');
    console.log(JSON.stringify(auditResults, null, 2));

  } finally {
    if (browser) await browser.close();
    server.kill();
  }
}

runMobileAudit().catch((err) => {
  console.error('Mobile audit execution failed:', err);
  process.exit(1);
});
