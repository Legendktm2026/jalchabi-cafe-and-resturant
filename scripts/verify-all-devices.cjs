const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function verifyAllDevices() {
  const screenshotDir = path.join(__dirname, '../verification_screenshots/devices_audit');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
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

  const devices = [
    {
      name: 'iPhone 17 Pro Max (6.9 inch Flagship)',
      filePrefix: 'iphone_17_pro_max',
      viewport: { width: 440, height: 956, deviceScaleFactor: 3, isMobile: true, hasTouch: true }
    },
    {
      name: 'Compact 4.0 inch Budget Android (e.g. Jio / Redmi)',
      filePrefix: 'android_4_inch',
      viewport: { width: 320, height: 568, deviceScaleFactor: 2, isMobile: true, hasTouch: true }
    },
    {
      name: 'Standard 6.4 inch Android (e.g. Realme / Galaxy A)',
      filePrefix: 'android_6_4_inch',
      viewport: { width: 393, height: 873, deviceScaleFactor: 2.75, isMobile: true, hasTouch: true }
    },
    {
      name: 'Large 6.8 inch Android (e.g. Galaxy Ultra / Pixel Pro)',
      filePrefix: 'android_6_8_inch',
      viewport: { width: 412, height: 915, deviceScaleFactor: 3.5, isMobile: true, hasTouch: true }
    }
  ];

  console.log('=== Starting Multi-Device Universal Audit ===');

  for (const dev of devices) {
    console.log(`\nTesting Device: ${dev.name} [${dev.viewport.width}x${dev.viewport.height}]...`);
    await page.setViewport(dev.viewport);
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 2000));

    // Check overflow
    const overflow = await page.evaluate(() => {
      const scrollW = document.documentElement.scrollWidth;
      const innerW = window.innerWidth;
      return {
        hasOverflow: scrollW > innerW,
        scrollW,
        innerW,
      };
    });

    console.log(`  [Overflow Check]: ${overflow.hasOverflow ? 'FAIL' : 'PASS (No horizontal scroll)'} (scrollW: ${overflow.scrollW}, innerW: ${overflow.innerW})`);

    // 1. Hero view
    await page.screenshot({ path: path.join(screenshotDir, `${dev.filePrefix}_01_hero.png`) });

    // 2. Founder Story with Audio Narrator button
    await page.evaluate(() => {
      document.getElementById('founder-story')?.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(screenshotDir, `${dev.filePrefix}_02_founder_story.png`) });

    // 3. Why Jalchabi section
    await page.evaluate(() => {
      const el = document.querySelector('section:has(h2)');
      const whySec = Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('কেন জলছবি'));
      whySec?.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(screenshotDir, `${dev.filePrefix}_03_why_jalchabi.png`) });

    // 4. Menu section with Indian Veg/Non-Veg Badges
    await page.evaluate(() => {
      document.getElementById('menu')?.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 600));
    await page.screenshot({ path: path.join(screenshotDir, `${dev.filePrefix}_04_menu.png`) });

    // 5. Test Cart & Checkout Modal with quick landmarks on iPhone 17 Pro Max
    if (dev.filePrefix === 'iphone_17_pro_max' || dev.filePrefix === 'android_4_inch') {
      console.log(`  Testing Cart & Checkout on ${dev.name}...`);
      await page.evaluate(() => {
        const addBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('Add') || b.textContent?.includes('যোগ করুন'));
        addBtn?.click();
      });
      await new Promise((r) => setTimeout(r, 500));

      // Open Cart
      await page.evaluate(() => {
        const cartBtn = document.querySelector('button[aria-label="Shopping Cart"]') ||
                        document.querySelector('button[aria-label="Your Cart"]') ||
                        Array.from(document.querySelectorAll('button')).find(b => b.textContent?.includes('অর্ডার') || b.textContent?.includes('Cart'));
        cartBtn?.click();
      });
      await new Promise((r) => setTimeout(r, 600));

      // Open Checkout
      await page.evaluate(() => {
        const checkoutBtn = Array.from(document.querySelectorAll('button')).find(b => 
          b.textContent?.includes('Proceed to Checkout') || 
          b.textContent?.includes('এখনই অর্ডার') || 
          b.textContent?.includes('অর্ডার সম্পূর্ণ')
        );
        checkoutBtn?.click();
      });
      await new Promise((r) => setTimeout(r, 800));

      // Switch to takeaway mode to show landmark chips
      await page.evaluate(() => {
        const takeawayBtn = Array.from(document.querySelectorAll('button')).find(b => 
          b.textContent?.includes('হোম ডেলিভারি') || b.textContent?.includes('Takeaway')
        );
        takeawayBtn?.click();
      });
      await new Promise((r) => setTimeout(r, 500));
      await page.screenshot({ path: path.join(screenshotDir, `${dev.filePrefix}_05_checkout_modal.png`) });

      // Close modal
      await page.evaluate(() => {
        const closeBtn = document.querySelector('button[aria-label="Close modal"]') ||
                         Array.from(document.querySelectorAll('button')).find(b => b.querySelector('svg.lucide-x'));
        closeBtn?.click();
      });
      await new Promise((r) => setTimeout(r, 400));
    }
  }

  await browser.close();
  console.log('\n=== Multi-Device Universal Audit Completed Successfully ===');
}

verifyAllDevices().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
