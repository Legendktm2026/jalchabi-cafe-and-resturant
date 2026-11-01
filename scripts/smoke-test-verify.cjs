const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function runVerification() {
  const screenshotsDir = path.join(__dirname, '../verification_screenshots/post_fix_verification');
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
    desktop: { consoleErrors: [], checks: {} },
    mobile: { consoleErrors: [], checks: {} },
  };

  try {
    // ==========================================
    // 1. DESKTOP VIEWPORT (1440x900)
    // ==========================================
    console.log('>>> [1/2] RUNNING VERIFICATION ON DESKTOP (1440x900)...');
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        report.desktop.consoleErrors.push(msg.text());
      }
    });

    await page.goto('http://localhost:4173', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 2000));

    // Screenshot 1: Desktop Initial Hero (Verify wall facade gap sealed, no sun slit)
    await page.screenshot({ path: path.join(screenshotsDir, 'desktop_01_hero_sealed_facade.png') });

    // Scroll to scrolly step 1
    await page.evaluate(() => {
      window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(screenshotsDir, 'desktop_02_scrolly_step.png') });

    // Scroll to Menu Section
    console.log('Scrolling to Menu section...');
    await page.evaluate(() => {
      const menu = document.getElementById('menu');
      if (menu) menu.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(screenshotsDir, 'desktop_03_menu_section.png') });

    // Check high-res photography and test dish modal
    const dishCards = await page.$$('[data-dish-id]');
    report.desktop.checks.dishCardsCount = dishCards.length;
    console.log(`Found ${dishCards.length} dish cards in Menu.`);

    if (dishCards.length > 0) {
      console.log('Clicking first dish card to verify High-Res Photography modal...');
      await dishCards[0].click();
      await new Promise((r) => setTimeout(r, 1500));
      await page.screenshot({ path: path.join(screenshotsDir, 'desktop_04_dish_modal_highres.png') });

      // Verify no 3D canvas inside the dish modal
      const modalCanvasCount = await page.evaluate(() => {
        const modal = document.querySelector('.fixed.inset-0.z-50');
        return modal ? modal.querySelectorAll('canvas').length : 0;
      });
      report.desktop.checks.modalHas3DCanvas = modalCanvasCount > 0;
      console.log(`Modal contains 3D canvas: ${modalCanvasCount > 0} (Expected: false)`);

      // Close modal
      const closeBtn = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const close = btns.find((b) => b.getAttribute('aria-label') === 'Close modal' || b.innerHTML.includes('lucide-x'));
        if (close) {
          close.click();
          return true;
        }
        return false;
      });
      await new Promise((r) => setTimeout(r, 600));
    }

    // Scroll to Bengal Culinary Glossary
    console.log('Scrolling to Bengal Culinary Glossary...');
    await page.evaluate(() => {
      const glossary = document.getElementById('heritage-glossary');
      if (glossary) glossary.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(screenshotsDir, 'desktop_05_bengal_glossary.png') });

    // Click second glossary item (e.g. Kasundi Mustard)
    await page.evaluate(() => {
      const tabs = Array.from(document.querySelectorAll('#heritage-glossary button'));
      if (tabs.length > 1) tabs[1].click();
    });
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({ path: path.join(screenshotsDir, 'desktop_06_bengal_glossary_kasundi.png') });

    // Scroll to Visit section & Highway Transit Guide
    console.log('Scrolling to Highway Transit & Parking Guide...');
    await page.evaluate(() => {
      const visit = document.getElementById('visit');
      if (visit) visit.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(screenshotsDir, 'desktop_07_highway_transit_parking.png') });

    await page.close();

    // ==========================================
    // 2. MOBILE VIEWPORT (iPhone 14 / 390x844)
    // ==========================================
    console.log('>>> [2/2] RUNNING VERIFICATION ON MOBILE (390x844)...');
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true });

    mobilePage.on('console', (msg) => {
      if (msg.type() === 'error') {
        report.mobile.consoleErrors.push(msg.text());
      }
    });

    await mobilePage.goto('http://localhost:4173', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 2000));

    // Screenshot 1: Mobile Hero with Clean Header & HUD "Skip to Menu"
    await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile_01_hero_clean_header.png') });

    // Verify Mobile Quick Action Dock is present
    const dockInfo = await mobilePage.evaluate(() => {
      const dock = document.querySelector('nav[aria-label="Mobile quick actions"]');
      if (!dock) return null;
      const rect = dock.getBoundingClientRect();
      const links = Array.from(dock.querySelectorAll('a, button')).map((el) => el.textContent.trim());
      return {
        visible: rect.width > 0 && rect.height > 0,
        rect: { top: rect.top, bottom: rect.bottom, height: rect.height },
        buttons: links,
      };
    });
    report.mobile.checks.dockInfo = dockInfo;
    console.log('Mobile Quick Action Dock detected:', dockInfo);

    // Test Mobile Scrolly Card button alignment
    await mobilePage.evaluate(() => {
      window.scrollTo({ top: 350, behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1200));
    await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile_02_scrolly_card_no_clip.png') });

    // Check button clipping on mobile scrolly card
    const cardClipping = await mobilePage.evaluate(() => {
      const card = document.querySelector('.apple-card-hover');
      if (!card) return 'No card found';
      const cRect = card.getBoundingClientRect();
      const btns = Array.from(card.querySelectorAll('button'));
      const clipped = btns.some((b) => {
        const bRect = b.getBoundingClientRect();
        return bRect.right > window.innerWidth || bRect.bottom > window.innerHeight || bRect.left < 0;
      });
      return { cardRect: cRect, buttonClipped: clipped };
    });
    report.mobile.checks.cardClipping = cardClipping;
    console.log('Mobile Card Clipping Check:', cardClipping);

    // Test Mobile HUD "Direct Menu Jump"
    console.log('Testing Mobile HUD Menu Jump button...');
    const hudJumped = await mobilePage.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const menuBtn = buttons.find((b) => b.textContent.includes('সরাসরি মেনু') || b.textContent.includes('মেনু') || b.textContent.includes('Menu'));
      if (menuBtn) {
        menuBtn.click();
        return true;
      }
      return false;
    });
    console.log(`HUD Menu Jump clicked: ${hudJumped}`);
    await new Promise((r) => setTimeout(r, 1500));
    await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile_03_hud_jump_to_menu.png') });

    // Test Mobile Navigation Drawer
    console.log('Testing Mobile Navbar Hamburger Drawer...');
    await mobilePage.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 600));
    const toggled = await mobilePage.evaluate(() => {
      const hamburger = document.querySelector('button[aria-label="Toggle menu"]');
      if (hamburger) {
        hamburger.click();
        return true;
      }
      return false;
    });
    console.log(`Hamburger clicked: ${toggled}`);
    await new Promise((r) => setTimeout(r, 800));
    await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile_04_nav_drawer_open.png') });

    // Close drawer
    await mobilePage.evaluate(() => {
      const close = document.querySelector('button[aria-label="Toggle menu"]');
      if (close) close.click();
    });
    await new Promise((r) => setTimeout(r, 500));

    // Scroll to Bengal Culinary Glossary on Mobile
    console.log('Scrolling to Bengal Culinary Glossary on Mobile...');
    await mobilePage.evaluate(() => {
      const glossary = document.getElementById('heritage-glossary');
      if (glossary) glossary.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1200));
    await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile_05_bengal_glossary.png') });

    // Scroll to Highway Transit & Parking Guide on Mobile
    console.log('Scrolling to Highway Transit & Parking Guide on Mobile...');
    await mobilePage.evaluate(() => {
      const visit = document.getElementById('visit');
      if (visit) {
        const transitCard = visit.querySelector('.rounded-3xl.glass-panel') || visit;
        transitCard.scrollIntoView({ behavior: 'instant' });
      }
    });
    await new Promise((r) => setTimeout(r, 1200));
    await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile_06_highway_parking_card.png') });

    await mobilePage.close();
    console.log('Verification completed successfully!');
  } finally {
    await browser.close();
  }

  fs.writeFileSync(
    path.join(screenshotsDir, 'verification_report.json'),
    JSON.stringify(report, null, 2)
  );
  console.log(`Verification report saved to ${screenshotsDir}/verification_report.json`);
}

runVerification().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
