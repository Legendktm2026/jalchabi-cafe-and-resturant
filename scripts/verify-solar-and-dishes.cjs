const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function verifySolarAndDishes() {
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
    // 1. TEST SOLAR TIME SWITCHER (8 AM, 5:30 PM, 9 PM)
    // ==========================================
    console.log('Testing Solar Time Switcher...');

    // Switch to Morning Sunlight (8 AM)
    const morningBtn = await page.waitForSelector('button[title*="Morning Sun"]', { timeout: 5000 });
    if (morningBtn) {
      await morningBtn.click();
      await new Promise((r) => setTimeout(r, 1800)); // allow lerp transition
      await saveScreenshot(page, 'solar_01_morning.png');
    }

    // Switch to Golden Hour (5:30 PM)
    const goldenBtn = await page.waitForSelector('button[title*="Golden Hour"]', { timeout: 5000 });
    if (goldenBtn) {
      await goldenBtn.click();
      await new Promise((r) => setTimeout(r, 1800));
      await saveScreenshot(page, 'solar_02_golden_hour.png');
    }

    // Switch to Candlelight Hearth (9 PM)
    const candleBtn = await page.waitForSelector('button[title*="Candlelight"]', { timeout: 5000 });
    if (candleBtn) {
      await candleBtn.click();
      await new Promise((r) => setTimeout(r, 1800));
      await saveScreenshot(page, 'solar_03_candlelight.png');
    }

    // ==========================================
    // 2. TEST 3D DISH VIEWERS FROM MENU
    // ==========================================
    console.log('Testing Menu 3D Dish Viewers...');

    // Scroll to Menu Section
    await page.evaluate(() => {
      const menu = document.getElementById('menu');
      if (menu) menu.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1500));

    // Helper to open dish modal by data-dish-id
    const testDish = async (dishId, screenshotName) => {
      console.log(`Opening 3D viewer for dish: ${dishId}...`);
      await page.evaluate((id) => {
        const card = document.querySelector(`[data-dish-id="${id}"]`);
        if (card) (card).click();
      }, dishId);

      await new Promise((r) => setTimeout(r, 2500)); // allow 3D canvas and shaders to render
      await saveScreenshot(page, screenshotName);

      // Close modal using Escape key
      await page.keyboard.press('Escape');
      await new Promise((r) => setTimeout(r, 800));
    };

    // A. Makaibari Darjeeling First Flush / Kalita Pour-Over 3D
    await testDish('m-darjeelingtea', 'dish_01_kalita_pourover_3d.png');

    // B. Bengal Bhetki Paturi 3D (Banana leaf steamed fish)
    await testDish('m-paturi', 'dish_02_bhetki_paturi_3d.png');

    // C. Baked Mishti Doi in Terracotta Bhar 3D
    await testDish('m-mishtidoi', 'dish_03_mishti_doi_bhar_3d.png');

    // D. Kolkata Royal Mutton Dum Biryani 3D
    await testDish('m-biryani', 'dish_04_biryani_3d.png');

    // ==========================================
    // 3. TEST RESERVATION SECTION & SEAT SELECTION
    // ==========================================
    console.log('Testing Reservation table seat selection...');
    await page.evaluate(() => {
      const res = document.getElementById('reservations');
      if (res) res.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1500));

    // Click Walnut Banquette Booth button
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('#reservations button'));
      const boothBtn = buttons.find((b) => b.textContent.includes('Walnut Banquette Booth'));
      if (boothBtn) (boothBtn).click();
    });
    await new Promise((r) => setTimeout(r, 800));
    await saveScreenshot(page, 'table_01_selection_reservation.png');

    console.log('----------------------------------------------------');
    console.log(`Verification Complete! Total Console Errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.warn('Browser console errors encountered:', consoleErrors);
    }
  } finally {
    await browser.close();
  }
}

verifySolarAndDishes().catch((err) => {
  console.error('Fatal verification error:', err);
  process.exit(1);
});
