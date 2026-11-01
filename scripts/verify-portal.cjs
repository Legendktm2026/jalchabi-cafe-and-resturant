const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

async function main() {
  const screenshotDir = path.join(__dirname, '../verification_screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  console.log('1. Starting preview server on port 4173...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4173'], {
    cwd: path.join(__dirname, '..'),
    stdio: 'pipe',
  });

  server.stdout.on('data', (d) => console.log('[Server stdout]', d.toString().trim()));
  server.stderr.on('data', (d) => console.error('[Server stderr]', d.toString().trim()));

  // Wait 2.5s for server to start
  await new Promise((r) => setTimeout(r, 2500));

  let browser;
  try {
    console.log('2. Launching Chrome...');
    browser = await puppeteer.launch({
      executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--use-gl=angle',
        '--enable-webgl',
        '--ignore-gpu-blocklist',
        '--autoplay-policy=no-user-gesture-required',
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

    const errors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
        console.error('[Browser Error]', msg.text());
      }
    });

    console.log('3. Navigating to http://localhost:4173...');
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 25000 });
    await new Promise((r) => setTimeout(r, 2000));

    // Scroll to Veranda zone (zone index 5 in Scrollytelling)
    console.log('4. Navigating to Zone 5 (Veranda & Portal)...');
    await page.evaluate(() => {
      const container = document.getElementById('experience');
      if (container) {
        const top = container.offsetTop;
        const h = container.offsetHeight - window.innerHeight;
        window.scrollTo({ top: top + h * 0.98, behavior: 'instant' });
      }
    });

    await new Promise((r) => setTimeout(r, 2000));

    // Capture Veranda open shot
    const verandaShot = path.join(screenshotDir, 'portal-veranda-view.png');
    await page.screenshot({ path: verandaShot });
    console.log('Captured Veranda View Screenshot:', verandaShot);

    // Click the "Open Doors • Step Into Real Cafe" button
    console.log('5. Clicking Open Doors / Portal Button...');
    const clicked = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const portalBtn = btns.find((b) => b.textContent && b.textContent.includes('Open Doors • Step Into Real Cafe'));
      if (portalBtn) {
        portalBtn.click();
        return true;
      }
      return false;
    });
    console.log('Portal button clicked:', clicked);

    // Wait for the door opening transition & video reveal
    await new Promise((r) => setTimeout(r, 2000));

    // Verify video modal state
    const modalState = await page.evaluate(() => {
      const video = document.querySelector('video');
      const hasGeminiBadge = document.body.textContent.includes('Gemini AI Real-World Vision');
      const hasChapters = document.body.textContent.includes('Lake Caustics & Dusk Sky');
      return {
        hasVideo: !!video,
        videoSrc: video ? video.getAttribute('src') : null,
        hasGeminiBadge,
        hasChapters,
        paused: video ? video.paused : null,
      };
    });
    console.log('Portal Modal State:', JSON.stringify(modalState, null, 2));

    // Capture Real World Portal Cinema Shot
    const portalShot = path.join(screenshotDir, 'portal-real-world-cinema.png');
    await page.screenshot({ path: portalShot });
    console.log('Captured Real World Portal Cinema Screenshot:', portalShot);

    console.log('--- Verification Complete ---');
    console.log('Errors logged:', errors.length);
  } catch (err) {
    console.error('Test run failed:', err);
  } finally {
    if (browser) await browser.close();
    server.kill();
  }
}

main();
