const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function verifyFounderAndBilingual() {
  const brainScreenshotsDir = '/Users/rizwankhan/.gemini/antigravity/brain/7657e9a8-a69e-47c0-b974-c3e95bf034c3/screenshots';
  const localScreenshotsDir = path.join(__dirname, '../verification_screenshots');

  [brainScreenshotsDir, localScreenshotsDir].forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  const saveScreenshot = async (page, filename) => {
    const brainPath = path.join(brainScreenshotsDir, filename);
    const localPath = path.join(localScreenshotsDir, filename);
    await page.screenshot({ path: brainPath });
    fs.copyFileSync(brainPath, localPath);
    console.log(`[PASS] Captured ${filename}`);
  };

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

  const consoleErrors = [];

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
        console.error('[BROWSER ERROR]', msg.text());
      }
    });

    console.log('Navigating to http://localhost:4173/ ...');
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 2500));

    // ==========================================
    // 1. VERIFY FOUNDER STORY SECTION (BENGALI)
    // ==========================================
    console.log('Testing Founder Story Section in Bengali (Default)...');
    await page.evaluate(() => {
      const founder = document.getElementById('founder-story');
      if (founder) founder.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1500));
    await saveScreenshot(page, 'founder_01_story_bengali.png');

    // ==========================================
    // 2. TEST LANGUAGE SWITCHER TO ENGLISH
    // ==========================================
    console.log('Testing Language Switch to English...');
    await page.evaluate(() => {
      // Find EN button in Navbar
      const buttons = Array.from(document.querySelectorAll('header button'));
      const enBtn = buttons.find((b) => b.textContent.trim() === 'EN');
      if (enBtn) (enBtn).click();
    });
    await new Promise((r) => setTimeout(r, 1200));

    // Re-verify Founder Story in English
    await page.evaluate(() => {
      const founder = document.getElementById('founder-story');
      if (founder) founder.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1000));
    await saveScreenshot(page, 'founder_02_story_english.png');

    // ==========================================
    // 3. TEST MENU SECTION & FOOD PHOTOGRAPHY MODAL
    // ==========================================
    console.log('Testing Menu Section with Momos & Drums of Heaven...');
    await page.evaluate(() => {
      const menu = document.getElementById('menu');
      if (menu) menu.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1500));

    // Open Steamed Momos Modal
    console.log('Opening Steamed Momos Modal...');
    await page.evaluate(() => {
      const card = document.querySelector('[data-dish-id="m-momos-steamed"]');
      if (card) (card).click();
    });
    await new Promise((r) => setTimeout(r, 1500));
    await saveScreenshot(page, 'menu_01_momos_modal.png');

    // Close modal
    await page.keyboard.press('Escape');
    await new Promise((r) => setTimeout(r, 800));

    // Open Drums of Heaven Modal
    console.log('Opening Drums of Heaven Modal...');
    await page.evaluate(() => {
      const card = document.querySelector('[data-dish-id="m-drums-of-heaven"]');
      if (card) (card).click();
    });
    await new Promise((r) => setTimeout(r, 1500));
    await saveScreenshot(page, 'menu_02_drums_of_heaven_modal.png');

    // Close modal
    await page.keyboard.press('Escape');
    await new Promise((r) => setTimeout(r, 800));

    // ==========================================
    // 4. TEST FOOTER CREDITS (SABIR HOSSAIN KHAN & RIZWAN KHAN)
    // ==========================================
    console.log('Testing Footer credits plaque...');
    await page.evaluate(() => {
      const footer = document.querySelector('footer');
      if (footer) footer.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1200));
    await saveScreenshot(page, 'footer_01_credits_sabir_rizwan.png');

    console.log('----------------------------------------------------');
    console.log(`Verification Complete! Total Console Errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.warn('Browser console errors encountered:', consoleErrors);
    }
  } finally {
    await browser.close();
  }
}

verifyFounderAndBilingual().catch((err) => {
  console.error('Fatal verification error:', err);
  process.exit(1);
});
