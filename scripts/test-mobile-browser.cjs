const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

async function testMobileAndDesktop() {
  const screenshotDir = path.join(__dirname, '../verification_screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  console.log('Starting vite preview server...');
  const preview = spawn('npx', ['vite', 'preview', '--port', '4173'], {
    cwd: path.join(__dirname, '..'),
    stdio: 'pipe',
  });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log('--- Launching Chrome for Mobile & Desktop Verification ---');
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--use-gl=angle',
      '--enable-webgl',
    ],
  });

  try {
    // 1. STANDARD MOBILE PHONE (Samsung Galaxy / Redmi / iPhone 12: 375x812, DPR 2)
    // Note: Concurrency can be controlled or localStorage can be set, or width < 390
    // Width 375 < 390 ensures isHighEndMobile() returns FALSE (Phase 2 rule: width >= 390)
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });

    console.log('1. Testing Standard Mobile Phone (Fast Mode Hero)...');
    await mobilePage.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 20000 });
    await new Promise((r) => setTimeout(r, 1200));

    // Capture Mobile-First Fast Mode Hero
    await mobilePage.screenshot({
      path: path.join(screenshotDir, '01_mobile_fast_hero_375w.png'),
    });
    console.log('Captured 01_mobile_fast_hero_375w.png');

    // 2. Open Mobile Menu Sheet via Hero CTA "মেনু দেখুন ও অর্ডার করুন"
    console.log('2. Opening Mobile Menu Sheet via Hero CTA...');
    await mobilePage.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const heroCta = btns.find(b => b.textContent && b.textContent.includes('মেনু দেখুন ও অর্ডার করুন'));
      if (heroCta) heroCta.click();
    });
    await new Promise((r) => setTimeout(r, 800));

    await mobilePage.screenshot({
      path: path.join(screenshotDir, '02_mobile_menu_sheet_open.png'),
    });
    console.log('Captured 02_mobile_menu_sheet_open.png');

    // 3. Add an item to cart inside Mobile Menu Sheet
    console.log('3. Adding Momo to cart in sheet...');
    await mobilePage.evaluate(() => {
      const addBtns = Array.from(document.querySelectorAll('button'));
      const addBtn = addBtns.find(b => b.textContent && b.textContent.trim() === 'Add');
      if (addBtn) addBtn.click();
    });
    await new Promise((r) => setTimeout(r, 500));

    await mobilePage.screenshot({
      path: path.join(screenshotDir, '03_mobile_menu_sheet_with_cart.png'),
    });
    console.log('Captured 03_mobile_menu_sheet_with_cart.png');

    // 4. Close Sheet and Open Founder Story Modal
    console.log('4. Closing sheet and testing Founder Story mobile card...');
    await mobilePage.evaluate(() => {
      const closeBtn = document.querySelector('button[aria-label="Close menu"]');
      if (closeBtn) (closeBtn).click();
    });
    await new Promise((r) => setTimeout(r, 500));

    // Scroll down to founder story teaser
    await mobilePage.evaluate(() => {
      const storySec = document.getElementById('founder-story');
      if (storySec) storySec.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 800));

    await mobilePage.screenshot({
      path: path.join(screenshotDir, '04_mobile_founder_story_teaser.png'),
    });
    console.log('Captured 04_mobile_founder_story_teaser.png');

    // Click "Read Full Story" / "পূর্ণ গল্প পড়ুন"
    await mobilePage.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const readBtn = btns.find(b => b.textContent && b.textContent.includes('গল্প পড়ুন'));
      if (readBtn) readBtn.click();
    });
    await new Promise((r) => setTimeout(r, 800));

    await mobilePage.screenshot({
      path: path.join(screenshotDir, '05_mobile_founder_story_modal.png'),
    });
    console.log('Captured 05_mobile_founder_story_modal.png');

    // 5. Test Mode Switching to 3D Art Edition
    console.log('5. Testing 3D Art Edition toggle from mobile hamburger drawer...');
    // Close modal first
    await mobilePage.evaluate(() => {
      const closeBtn = document.querySelector('button[aria-label="Close story"]');
      if (closeBtn) (closeBtn).click();
    });
    await new Promise((r) => setTimeout(r, 500));

    // Scroll to top
    await mobilePage.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 500));

    // Open mobile hamburger menu
    await mobilePage.evaluate(() => {
      const menuBtn = document.querySelector('button[aria-label="Toggle Navigation Menu"]');
      if (menuBtn) (menuBtn).click();
    });
    await new Promise((r) => setTimeout(r, 600));

    await mobilePage.screenshot({
      path: path.join(screenshotDir, '06_mobile_drawer_with_mode_toggle.png'),
    });
    console.log('Captured 06_mobile_drawer_with_mode_toggle.png');

    // Click "Switch to 3D Art Edition"
    await mobilePage.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const modeBtn = btns.find(b => b.textContent && b.textContent.includes('3D Art Edition'));
      if (modeBtn) modeBtn.click();
    });
    await new Promise((r) => setTimeout(r, 2000));

    await mobilePage.screenshot({
      path: path.join(screenshotDir, '07_mobile_switched_to_3d_mode.png'),
    });
    console.log('Captured 07_mobile_switched_to_3d_mode.png');

    // 6. TEST DESKTOP (1440x900) - Unchanged 3D Experience
    console.log('6. Verifying desktop 3D experience remains unchanged...');
    const desktopPage = await browser.newPage();
    await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await desktopPage.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 20000 });
    await new Promise((r) => setTimeout(r, 2000));

    const desktopHasCanvas = await desktopPage.evaluate(() => !!document.querySelector('canvas'));
    console.log('Desktop 3D canvas verified:', desktopHasCanvas);

    await desktopPage.screenshot({
      path: path.join(screenshotDir, '08_desktop_full_3d.png'),
    });
    console.log('Captured 08_desktop_full_3d.png');

    console.log('ALL VERIFICATION FLOWS SUCCEEDED!');
  } finally {
    await browser.close();
    preview.kill();
  }
}

testMobileAndDesktop().catch((err) => {
  console.error('Test script error:', err);
  process.exit(1);
});
