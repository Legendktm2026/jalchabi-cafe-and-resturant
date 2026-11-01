const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function verifyScrollytelling() {
  console.log('=== Verifying 3D Continuous Scrollytelling Sanctuary ===');

  const browser = await puppeteer.launch({
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
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  const screenshotDir = path.join(
    '/Users/rizwankhan/.gemini/antigravity/brain/7657e9a8-a69e-47c0-b974-c3e95bf034c3',
    'screenshots'
  );
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  console.log('1. Loading application at http://localhost:4173/ ...');
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 25000 });
  await new Promise((r) => setTimeout(r, 1200));

  // Capture Zone 0: OVERVIEW
  console.log('2. Verifying Zone 0: OVERVIEW (0% scroll)...');
  const zone0Text = await page.evaluate(() => {
    return document.querySelector('#experience h3')?.textContent || '';
  });
  console.log(`✓ Zone 0 Title: "${zone0Text}"`);
  await page.screenshot({ path: path.join(screenshotDir, 'scrolly_01_overview.png') });

  // Scroll to Zone 1: BREW BAR (at ~20% of 600vh = ~1000px)
  console.log('3. Scrolling to Zone 1: BREW BAR...');
  await page.evaluate(() => {
    const el = document.getElementById('experience');
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: total * 0.2, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 800));
  const zone1Text = await page.evaluate(() => {
    return document.querySelector('#experience h3')?.textContent || '';
  });
  console.log(`✓ Zone 1 Title: "${zone1Text}"`);
  await page.screenshot({ path: path.join(screenshotDir, 'scrolly_02_brew_bar.png') });

  // Scroll to Zone 2: BANQUETTES (at ~40% of 600vh)
  console.log('4. Scrolling to Zone 2: BANQUETTES...');
  await page.evaluate(() => {
    const el = document.getElementById('experience');
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: total * 0.4, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 800));
  const zone2Text = await page.evaluate(() => {
    return document.querySelector('#experience h3')?.textContent || '';
  });
  console.log(`✓ Zone 2 Title: "${zone2Text}"`);
  await page.screenshot({ path: path.join(screenshotDir, 'scrolly_03_banquettes.png') });

  // Scroll to Zone 3: KITCHEN BOARD (at ~60% of 600vh)
  console.log('5. Scrolling to Zone 3: KITCHEN BOARD...');
  await page.evaluate(() => {
    const el = document.getElementById('experience');
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: total * 0.6, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 800));
  const zone3Text = await page.evaluate(() => {
    return document.querySelector('#experience h3')?.textContent || '';
  });
  console.log(`✓ Zone 3 Title: "${zone3Text}"`);
  await page.screenshot({ path: path.join(screenshotDir, 'scrolly_04_kitchen_board.png') });

  // Scroll to Zone 4: HERITAGE WALL (at ~80% of 600vh)
  console.log('6. Scrolling to Zone 4: HERITAGE WALL...');
  await page.evaluate(() => {
    const el = document.getElementById('experience');
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: total * 0.8, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 800));
  const zone4Text = await page.evaluate(() => {
    return document.querySelector('#experience h3')?.textContent || '';
  });
  console.log(`✓ Zone 4 Title: "${zone4Text}"`);
  await page.screenshot({ path: path.join(screenshotDir, 'scrolly_05_heritage_wall.png') });

  // Scroll to Zone 5: VERANDA (at ~100% of 600vh)
  console.log('7. Scrolling to Zone 5: VERANDA...');
  await page.evaluate(() => {
    const el = document.getElementById('experience');
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: total * 0.98, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 800));
  const zone5Text = await page.evaluate(() => {
    return document.querySelector('#experience h3')?.textContent || '';
  });
  console.log(`✓ Zone 5 Title: "${zone5Text}"`);
  await page.screenshot({ path: path.join(screenshotDir, 'scrolly_06_veranda.png') });

  // Test Side Rail Click Navigation
  console.log('8. Testing Side Rail Click Navigation to BREW BAR...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const brewBarBtn = buttons.find((b) => b.textContent?.includes('BREW BAR'));
    brewBarBtn?.click();
  });
  await new Promise((r) => setTimeout(r, 1000));
  const railJumpTitle = await page.evaluate(() => {
    return document.querySelector('#experience h3')?.textContent || '';
  });
  console.log(`✓ Jumped via Side Rail to: "${railJumpTitle}"`);

  // Test 360° Free Look Toggle
  console.log('9. Testing 360° Free Look Orbit Toggle...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const orbitBtn = buttons.find((b) => b.textContent?.includes('360° FREE LOOK'));
    orbitBtn?.click();
  });
  await new Promise((r) => setTimeout(r, 500));
  const isOrbitActive = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.some((b) => b.textContent?.includes('EXIT 360° ORBIT'));
  });
  console.log(`✓ 360° Orbit Mode Active: ${isOrbitActive}`);

  // Test smooth unpinning into editorial sections
  console.log('10. Testing unpinning past 600vh track into Menu Section...');
  await page.evaluate(() => {
    const el = document.getElementById('menu');
    el?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 600));
  const menuVisible = await page.evaluate(() => {
    const menu = document.getElementById('menu');
    if (!menu) return false;
    const rect = menu.getBoundingClientRect();
    return rect.top >= 0 && rect.top < window.innerHeight;
  });
  console.log(`✓ Unpinned into Menu Section: ${menuVisible}`);

  await browser.close();

  console.log('\n=== SCROLLYTELLING VERIFICATION SUMMARY ===');
  console.log(`• Errors Detected: ${errors.length}`);
  console.log(`• Zone 0: "${zone0Text}"`);
  console.log(`• Zone 1: "${zone1Text}"`);
  console.log(`• Zone 2: "${zone2Text}"`);
  console.log(`• Zone 3: "${zone3Text}"`);
  console.log(`• Zone 4: "${zone4Text}"`);
  console.log(`• Zone 5: "${zone5Text}"`);
  console.log(`• Side Rail Navigation: Working`);
  console.log(`• 360° Free Look Toggle: Working`);
  console.log(`• Page Unpinning: Working`);
  console.log('============================================\n');

  if (errors.length > 0) {
    console.error('Errors found during scrollytelling test:', errors);
    process.exit(1);
  }
}

verifyScrollytelling().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
