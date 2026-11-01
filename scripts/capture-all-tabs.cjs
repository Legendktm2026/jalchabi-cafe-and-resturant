const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const http = require('http');

async function captureAllTabs() {
  const screenshotDir = path.join(__dirname, '../verification_screenshots/food_tabs');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

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

  await new Promise((resolve) => server.listen(4177, resolve));

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:4177', { waitUntil: 'networkidle0' });

  // Scroll to menu
  await page.evaluate(() => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1200));

  const artifactDir = '/Users/rizwankhan/.gemini/antigravity/brain/d8283db8-8786-4472-9c50-59460300f6b2';

  // 1. Drinks & Brews tab
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const b = btns.find(btn => btn.textContent && (btn.textContent.includes('শেক') || btn.textContent.includes('Brews')));
    if (b) b.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  const sPathDrinks = path.join(screenshotDir, '03-drinks-tab.png');
  await page.screenshot({ path: sPathDrinks, fullPage: false });
  fs.copyFileSync(sPathDrinks, path.join(artifactDir, '03-drinks-tab.png'));
  console.log('Captured: 03-drinks-tab');

  // 2. Crispy Chicken tab
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const b = btns.find(btn => btn.textContent && (btn.textContent.includes('হেভেন') || btn.textContent.includes('Crispy')));
    if (b) b.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  const sPathCrispy = path.join(screenshotDir, '04-crispy-tab.png');
  await page.screenshot({ path: sPathCrispy, fullPage: false });
  fs.copyFileSync(sPathCrispy, path.join(artifactDir, '04-crispy-tab.png'));
  console.log('Captured: 04-crispy-tab');

  // 3. Promotions & Weekend Combos section
  await page.evaluate(() => {
    const el = document.getElementById('promotions');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1200));
  const sPathCombos = path.join(screenshotDir, '05-weekend-combos.png');
  await page.screenshot({ path: sPathCombos, fullPage: false });
  fs.copyFileSync(sPathCombos, path.join(artifactDir, '05-weekend-combos.png'));
  console.log('Captured: 05-weekend-combos');

  await browser.close();
  server.close();
  console.log('All tab captures finished successfully!');
}

captureAllTabs().catch(err => {
  console.error(err);
  process.exit(1);
});
