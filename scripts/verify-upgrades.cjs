const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const http = require('http');

async function run() {
  const screenshotDir = path.join(__dirname, '../verification_screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  console.log('--- Launching Chrome for Component Upgrade Verification ---');
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

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.error('[Browser Error]', msg.text());
    }
  });

  console.log('Navigating to http://localhost:4173/ ...');
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 25000 });
  await new Promise((r) => setTimeout(r, 2000));

  // 1. Capture Hero with Sparkles & Watch Film CTA
  console.log('1. Capturing Hero with Sparkles & Watch Film CTA...');
  await page.screenshot({ path: path.join(screenshotDir, 'upgrade_01_hero_sparkles.png') });

  // 2. Click "Watch Film" button to open Cinematic Video Modal
  console.log('2. Clicking "Watch Film" button...');
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Watch Film') || b.textContent?.includes('Cinematic Film')
    );
    btn?.click();
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotDir, 'upgrade_02_cinematic_video_modal.png') });

  // Close Video Modal
  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 500));

  // 3. Scroll to Story & Tracing Beam
  console.log('3. Scrolling to Concept Story (Tracing Beam)...');
  await page.evaluate(() => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotDir, 'upgrade_03_concept_story_tracing_beam.png') });

  // 4. Scroll to Menu with Skiper Fluid Tabs & Aceternity Card Spotlight
  console.log('4. Scrolling to Menu Section...');
  await page.evaluate(() => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotDir, 'upgrade_04_menu_fluid_tabs.png') });

  // Test clicking a category tab (e.g. Specialty Coffee)
  console.log('5. Clicking "Specialty Coffee" tab...');
  await page.evaluate(() => {
    const tab = Array.from(document.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Specialty Coffee')
    );
    tab?.click();
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(screenshotDir, 'upgrade_05_menu_tab_active.png') });

  // Click on first menu card to open Tasting & Gastronomy Modal
  console.log('6. Clicking on first menu card to open Tasting Details...');
  await page.evaluate(() => {
    const card = document.querySelector('#menu .cursor-pointer');
    if (card) card.click();
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(screenshotDir, 'upgrade_06_menu_item_detail_modal.png') });

  // Close modal
  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 500));

  // 7. Scroll to Gallery with Focus Cards
  console.log('7. Scrolling to Gallery Section (Focus Cards)...');
  await page.evaluate(() => {
    document.getElementById('gallery')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(screenshotDir, 'upgrade_07_gallery_focus_cards.png') });

  await browser.close();
  console.log('--- Verification Complete! Errors:', consoleErrors.length, '---');
  if (consoleErrors.length > 0) {
    console.error('Console errors logged:', consoleErrors);
    process.exit(1);
  }
}

run().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
