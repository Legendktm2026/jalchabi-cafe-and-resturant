const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const http = require('http');

async function testKolkataMenu() {
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
      '.json': 'application/json',
      '.mp4': 'video/mp4',
    };
    const contentType = contentTypes[ext] || 'application/octet-stream';
    try {
      const content = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    } catch (e) {
      res.writeHead(500);
      res.end('Error loading ' + filePath);
    }
  });

  await new Promise((resolve) => server.listen(4180, resolve));
  console.log('Static server started at http://localhost:4180');

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

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

    console.log('Navigating to http://localhost:4180 ...');
    await page.goto('http://localhost:4180/', { waitUntil: 'networkidle0', timeout: 25000 });
    await new Promise((r) => setTimeout(r, 2000));

    // Scroll to Menu section
    await page.evaluate(() => {
      const menu = document.getElementById('menu');
      if (menu) menu.scrollIntoView();
    });
    await new Promise((r) => setTimeout(r, 1500));

    const menuScreenshotPath = path.join(screenshotDir, 'kolkata-menu-section.png');
    await page.screenshot({ path: menuScreenshotPath });
    console.log('Saved menu section screenshot:', menuScreenshotPath);

    // Click on the first menu item (Kolkata Dum Biryani) to open the 3D detail modal
    const biryaniCard = await page.$('#menu .cursor-pointer');
    if (biryaniCard) {
      console.log('Clicking on Kolkata Dum Biryani card...');
      await biryaniCard.click();
      await new Promise((r) => setTimeout(r, 2000));

      const modalScreenshotPath = path.join(screenshotDir, 'kolkata-biryani-3d-modal.png');
      await page.screenshot({ path: modalScreenshotPath });
      console.log('Saved 3D Biryani modal screenshot:', modalScreenshotPath);
    }

    console.log('Verification completed successfully!');
  } finally {
    await browser.close();
    server.close();
  }
}

testKolkataMenu().catch((err) => {
  console.error('Error in verification:', err);
  process.exit(1);
});
