const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function run() {
  const artifactDir = '/Users/rizwankhan/.gemini/antigravity/brain/7657e9a8-a69e-47c0-b974-c3e95bf034c3/screenshots';
  if (!fs.existsSync(artifactDir)) {
    fs.mkdirSync(artifactDir, { recursive: true });
  }

  console.log('--- Launching Chrome for Future Enhancements Verification ---');
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
  await page.setViewport({ width: 1440, height: 960, deviceScaleFactor: 2 });

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

  // 1. Toggle Audio to test AudioWaveformVisualizer
  console.log('1. Testing AudioWaveformVisualizer in top navigation/HUD...');
  await page.evaluate(() => {
    const audioBtn = Array.from(document.querySelectorAll('button')).find((b) =>
      b.getAttribute('title')?.includes('Atmosphere') || b.textContent?.includes('Sound Off') || b.textContent?.includes('Dusk Ambience')
    );
    audioBtn?.click();
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({ path: path.join(artifactDir, 'future_01_audio_visualizer.png') });

  // 2. Scroll to Concept Story Section (LampContainer, FlipWords, WaterRippleCanvas)
  console.log('2. Scrolling to Concept Story (LampContainer + FlipWords + WaterRippleCanvas)...');
  await page.evaluate(() => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'instant' });
  });
  // Simulate mouse movement over the watercolor canvas card to trigger ripples
  const canvasCard = await page.$('#story canvas');
  if (canvasCard) {
    const box = await canvasCard.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await new Promise((r) => setTimeout(r, 200));
      await page.mouse.move(box.x + box.width / 2 + 30, box.y + box.height / 2 + 20);
    }
  }
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(artifactDir, 'future_02_lamp_story.png') });

  // 3. Scroll to Provenance Marquee (InfiniteMovingCards)
  console.log('3. Scrolling to Provenance Marquee Section...');
  await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h3'));
    const marqueeHeading = headings.find((h) => h.textContent?.includes('Esteemed Estate Partners'));
    if (marqueeHeading) {
      marqueeHeading.scrollIntoView({ behavior: 'instant', block: 'center' });
    } else {
      document.getElementById('gallery')?.scrollIntoView({ behavior: 'instant' });
      window.scrollBy(0, -400);
    }
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(artifactDir, 'future_03_marquee_provenance.png') });

  // 4. Scroll to Visit Kolkata (BentoGrid + Live IST Clock)
  console.log('4. Scrolling to Visit Kolkata (BentoGrid + Live IST Clock)...');
  await page.evaluate(() => {
    document.getElementById('visit')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(artifactDir, 'future_04_visit_bentogrid.png') });

  // 5. Scroll to Reservations (AuroraBackground + MagneticButton)
  console.log('5. Scrolling to Reservations (AuroraBackground + MagneticButton)...');
  await page.evaluate(() => {
    document.getElementById('reservations')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(artifactDir, 'future_05_aurora_reservation.png') });

  console.log('\n--- Future Enhancements Smoke Test Summary ---');
  console.log(`Console Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    consoleErrors.forEach((err) => console.log('  ❌', err));
  } else {
    console.log('  ✅ 0 browser console errors detected.');
  }

  await browser.close();
  console.log('Verification screenshots saved to:', artifactDir);
}

run().catch((err) => {
  console.error('Fatal verification error:', err);
  process.exit(1);
});
