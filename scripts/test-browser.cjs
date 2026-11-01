const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function runBrowserVerification() {
  const screenshotDir = path.join(__dirname, '../verification_screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  console.log('--- Launching Chrome for End-to-End Verification ---');
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
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  const consoleLogs = [];
  page.on('console', (msg) => {
    const text = msg.text();
    consoleLogs.push({ type: msg.type(), text });
    if (msg.type() === 'error') {
      console.error('[Browser Error]', text);
    } else {
      console.log('[Browser Log]', text);
    }
  });

  page.on('pageerror', (err) => {
    console.error('[Browser PageError]', err.toString());
  });

  console.log('Navigating to http://localhost:4173/ ...');
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 20000 });
  await new Promise((r) => setTimeout(r, 2000));

  // Check WebGL and Canvas in DOM
  const webglState = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return { hasCanvas: false };
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    return {
      hasCanvas: true,
      hasGL: !!gl,
      renderer: gl ? gl.getParameter(gl.RENDERER) : null,
      vendor: gl ? gl.getParameter(gl.VENDOR) : null,
    };
  });
  console.log('WebGL State:', JSON.stringify(webglState, null, 2));

  // 1. Capture Shot 1: Exterior Establishing Shot
  console.log('1. Capturing Shot 1 (Exterior Establishing Shot)...');
  await page.screenshot({ path: path.join(screenshotDir, '01_establishing_exterior.png') });

  // 2. Click "ENTER JALCHABI" button
  console.log('2. Clicking "ENTER JALCHABI" ...');
  const enterBtn = await page.$('button ::-p-text(ENTER JALCHABI)');
  if (enterBtn) {
    await enterBtn.click();
    console.log('Clicked ENTER JALCHABI. Waiting for entrance transition (2.6s)...');
    await new Promise((r) => setTimeout(r, 2800));
  } else {
    console.warn('ENTER JALCHABI button not found via text selector, trying fallback query');
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent?.includes('ENTER JALCHABI')
      );
      btn?.click();
    });
    await new Promise((r) => setTimeout(r, 2800));
  }

  // 3. Capture Shot 4 / 5: Interior Reveal & Hotspots
  console.log('3. Capturing Interior Reveal...');
  await page.screenshot({ path: path.join(screenshotDir, '02_interior_reveal.png') });

  // 4. Test clicking a Hotspot or Camera Preset (e.g. "Brew Bar")
  console.log('4. Selecting Brew Bar preset...');
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Brew Bar')
    );
    btn?.click();
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(screenshotDir, '03_brew_bar_preset.png') });

  // 5. Test clicking a 3D Hotspot pin
  console.log('5. Clicking Hotspot pin in 3D scene...');
  const hotspotClicked = await page.evaluate(() => {
    const hotspotBtn = Array.from(document.querySelectorAll('button')).find(
      (b) => b.getAttribute('aria-label')?.includes('hotspot') || b.textContent?.includes('01 / BREW BAR')
    );
    if (hotspotBtn) {
      hotspotBtn.click();
      return true;
    }
    return false;
  });
  console.log('Hotspot button clicked:', hotspotClicked);
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(screenshotDir, '04_hotspot_modal_open.png') });

  // Close the modal
  await page.evaluate(() => {
    const closeBtn = document.querySelector('button[aria-label="Close dialog"]');
    closeBtn?.click();
  });
  await new Promise((r) => setTimeout(r, 500));

  // 6. Test Seating Banquette Preset
  console.log('6. Selecting Banquettes preset...');
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Banquettes')
    );
    btn?.click();
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(screenshotDir, '05_banquette_seating.png') });

  // 7. Scroll down to Menu Section
  console.log('7. Testing Menu Section & Filtering...');
  await page.evaluate(() => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(screenshotDir, '06_menu_section.png') });

  // Filter menu to Specialty Coffee
  await page.evaluate(() => {
    const catBtn = Array.from(document.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Specialty Coffee')
    );
    catBtn?.click();
  });
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.join(screenshotDir, '07_menu_filtered.png') });

  // 8. Scroll down to Gallery Section
  console.log('8. Testing Gallery Section...');
  await page.evaluate(() => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(screenshotDir, '08_gallery_section.png') });

  // 9. Scroll down to Visit Kolkata Section
  console.log('9. Testing Visit Kolkata Section...');
  await page.evaluate(() => {
    document.getElementById('visit')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: path.join(screenshotDir, '09_visit_kolkata.png') });

  // 10. Scroll down to Reservation & Inquiries Section
  console.log('10. Testing Reservation Form Submission...');
  await page.evaluate(() => {
    document.getElementById('reservations')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 600));

  // Fill in sample inquiry form
  await page.type('input[placeholder*="Satyajit"]', 'Arundhati Roy');
  await page.type('input[placeholder*="name@example.com"]', 'arundhati@kolkata-arts.example');
  await page.type('input[placeholder*="98300"]', '+91 98300 12345');
  await page.click('button[type="submit"]');
  console.log('Submitted reservation form. Waiting for confirmation voucher...');
  await new Promise((r) => setTimeout(r, 1400));
  await page.screenshot({ path: path.join(screenshotDir, '10_reservation_confirmation.png') });

  // 11. Mobile Viewport Verification (iPhone 14: 390 x 844)
  console.log('11. Testing Mobile Viewport (390 x 844)...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotDir, '11_mobile_establishing.png') });

  console.log('--- All Browser Verifications Completed Successfully ---');
  await browser.close();
}

runBrowserVerification().catch((err) => {
  console.error('Browser verification failed:', err);
  process.exit(1);
});
