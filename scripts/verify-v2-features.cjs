const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function verifyV2Features() {
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
    // 1. VERIFY 3D ARCHITECTURAL SANCTUARY (CLEAN ATMOSPHERE)
    // ==========================================
    console.log('Testing 3D Architectural Sanctuary at Entrance...');
    await new Promise((r) => setTimeout(r, 2000));
    await saveScreenshot(page, 'v2_01_sanctuary_entrance_clean.png');

    // ==========================================
    // 2. SCROLL TO KITCHEN BOARD
    // ==========================================
    console.log('Testing Kitchen Board Sanctuary Zone...');
    await page.evaluate(() => {
      const experience = document.getElementById('experience');
      if (experience) {
        const top = experience.offsetTop;
        const totalHeight = experience.offsetHeight - window.innerHeight;
        const targetScrollY = top + 0.6 * totalHeight;
        window.scrollTo(0, targetScrollY);
      }
    });
    await new Promise((r) => setTimeout(r, 3000));
    await saveScreenshot(page, 'v2_02_kitchen_board_clean.png');

    // ==========================================
    // 3. TEST REAL-TIME MENU ORDERING & CART DRAWER
    // ==========================================
    console.log('Testing Menu Section & Adding Items to Cart...');
    await page.evaluate(() => {
      const menu = document.getElementById('menu');
      if (menu) menu.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1200));

    // Click "Add to Cart" on first dish (Momos) and second dish (Drums of Heaven)
    await page.evaluate(() => {
      const addBtns = Array.from(document.querySelectorAll('#menu button')).filter(
        (b) => b.textContent.includes('যোগ করুন') || b.textContent.includes('Add to Cart')
      );
      if (addBtns[0]) addBtns[0].click();
      if (addBtns[1]) addBtns[1].click();
    });
    await new Promise((r) => setTimeout(r, 800));

    // Open Cart Drawer
    console.log('Opening Cart Drawer...');
    await page.evaluate(() => {
      // Find cart button in navbar or floating
      const cartBtn = document.querySelector('button[aria-label="Order Cart"]') || 
                      document.querySelector('button[aria-label="Shopping Cart"]') ||
                      document.querySelector('header button[title*="কার্ট"]') ||
                      document.querySelector('.fixed.bottom-6.right-6 button');
      if (cartBtn) cartBtn.click();
    });
    await new Promise((r) => setTimeout(r, 1500));
    await saveScreenshot(page, 'v2_03_cart_drawer_active.png');

    // Proceed to Checkout & UPI Payment Modal
    console.log('Opening Order Checkout & PhonePe UPI QR Modal...');
    await page.evaluate(() => {
      const checkoutBtn = Array.from(document.querySelectorAll('button')).find(
        (b) => b.textContent.includes('এখনই অর্ডার') || b.textContent.includes('Checkout')
      );
      if (checkoutBtn) checkoutBtn.click();
    });
    await new Promise((r) => setTimeout(r, 1500));
    await saveScreenshot(page, 'v2_04_order_upi_qr_modal.png');

    // Close checkout modal
    await page.evaluate(() => {
      const closeBtn = document.querySelector('button[aria-label="Close modal"]');
      if (closeBtn) closeBtn.click();
    });
    await new Promise((r) => setTimeout(r, 800));

    // ==========================================
    // 4. TEST WEEKEND SPECIALS & COUNTDOWN SECTION
    // ==========================================
    console.log('Testing Weekend Specials & Live Countdown...');
    await page.evaluate(() => {
      const promo = document.getElementById('promotions');
      if (promo) promo.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1500));
    await saveScreenshot(page, 'v2_05_weekend_specials_combos.png');

    // ==========================================
    // 5. TEST CUSTOMER REVIEWS & LEAVE REVIEW MODAL
    // ==========================================
    console.log('Testing Customer Reviews Section...');
    await page.evaluate(() => {
      const rev = document.getElementById('reviews');
      if (rev) rev.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1500));
    await saveScreenshot(page, 'v2_06_customer_reviews_grid.png');

    // Open Leave a Review Modal
    console.log('Opening Leave a Review Modal...');
    await page.evaluate(() => {
      const writeBtn = Array.from(document.querySelectorAll('#reviews button')).find(
        (b) => b.textContent.includes('মতামত') || b.textContent.includes('Write a Review')
      );
      if (writeBtn) writeBtn.click();
    });
    await new Promise((r) => setTimeout(r, 1200));
    await saveScreenshot(page, 'v2_07_write_review_modal.png');

    // Close review modal
    await page.evaluate(() => {
      const closeButtons = Array.from(document.querySelectorAll('button'));
      const modalClose = closeButtons.find(b => b.querySelector('svg.lucide-x') || b.innerHTML.includes('lucide-x'));
      if (modalClose) modalClose.click();
    });
    await new Promise((r) => setTimeout(r, 800));

    // ==========================================
    // 6. TEST FOOTER CREDITS & SARBERIA ADDRESS
    // ==========================================
    console.log('Testing Footer with Sarberia address and +91 8918948730...');
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await new Promise((r) => setTimeout(r, 1200));
    await saveScreenshot(page, 'v2_08_footer_sarberia_credits.png');

    console.log('----------------------------------------------------');
    console.log(`Verification Complete! Total Console Errors: ${consoleErrors.length}`);
  } catch (err) {
    console.error('Verification error:', err);
  } finally {
    await browser.close();
  }
}

verifyV2Features();
