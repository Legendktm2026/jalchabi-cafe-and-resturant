const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const http = require('http');

async function verifyAuthenticFoodPhotos() {
  const screenshotDir = path.join(__dirname, '../verification_screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  // Start a simple static server for dist
  const distDir = path.join(__dirname, '../dist');
  const server = http.createServer((req, res) => {
    let filePath = path.join(distDir, req.url === '/' ? 'index.html' : req.url);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(distDir, 'index.html');
    }
    const ext = path.extname(filePath);
    const contentTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.json': 'application/json',
      '.mp4': 'video/mp4',
    };
    const contentType = contentTypes[ext] || 'application/octet-stream';
    try {
      const data = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    } catch (e) {
      res.writeHead(404);
      res.end('Not found');
    }
  });

  await new Promise((resolve) => server.listen(4175, resolve));
  console.log('Static server listening on port 4175');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:4175...');
  await page.goto('http://localhost:4175', { waitUntil: 'networkidle0' });

  // Scroll to menu section
  await page.evaluate(() => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1500));

  // Screenshot 1: Menu grid with authentic photos
  const menuPath = path.join(screenshotDir, '01-authentic-menu-grid.png');
  await page.screenshot({ path: menuPath, fullPage: false });
  console.log(`Saved: ${menuPath}`);

  // Screenshot 2: Click Fish Fry modal
  await page.evaluate(() => {
    const card = document.querySelector('[data-dish-id="m-fish-fry"]');
    if (card) card.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  const fishFryModalPath = path.join(screenshotDir, '02-fish-fry-modal.png');
  await page.screenshot({ path: fishFryModalPath, fullPage: false });
  console.log(`Saved: ${fishFryModalPath}`);

  // Close modal by pressing Escape or clicking close button
  await page.keyboard.press('Escape');
  await new Promise(r => setTimeout(r, 500));

  // Screenshot 3: Switch to Mughlai Biryani tab and click Kolkata Chicken Biryani
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll('button'));
    const biryaniTab = tabs.find(t => t.textContent && (t.textContent.includes('শাহি দম বিরিয়ানি') || t.textContent.includes('Biryani')));
    if (biryaniTab) biryaniTab.click();
  });
  await new Promise(r => setTimeout(r, 800));

  await page.evaluate(() => {
    const card = document.querySelector('[data-dish-id="m-biryani-chicken"]');
    if (card) card.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  const biryaniModalPath = path.join(screenshotDir, '03-biryani-modal.png');
  await page.screenshot({ path: biryaniModalPath, fullPage: false });
  console.log(`Saved: ${biryaniModalPath}`);

  // Copy all to artifact directory
  const artifactDir = '/Users/rizwankhan/.gemini/antigravity/brain/d8283db8-8786-4472-9c50-59460300f6b2';
  fs.copyFileSync(menuPath, path.join(artifactDir, '01-authentic-menu-grid.png'));
  fs.copyFileSync(fishFryModalPath, path.join(artifactDir, '02-fish-fry-modal.png'));
  fs.copyFileSync(biryaniModalPath, path.join(artifactDir, '03-biryani-modal.png'));

  await browser.close();
  server.close();
  console.log('Verification completed successfully!');
}

verifyAuthenticFoodPhotos().catch(err => {
  console.error(err);
  process.exit(1);
});
