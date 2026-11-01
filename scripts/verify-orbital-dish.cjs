const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function testOrbital() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Test on iPhone 17 Pro Max (430x932)
  await page.setViewport({ width: 430, height: 932, deviceScaleFactor: 2 });
  console.log('Navigating to http://localhost:4173/ ...');
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle2' });

  // Scroll to #pairings section
  console.log('Locating #pairings section...');
  const pairingsSection = await page.$('#pairings');
  if (!pairingsSection) {
    console.error('ERROR: #pairings section not found!');
    process.exit(1);
  }

  await page.evaluate(() => {
    document.getElementById('pairings')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 1000));

  const artifactDir = '/Users/rizwankhan/.gemini/antigravity/brain/2e0da4fe-1aae-49dd-a3af-52bd306fb55a/screenshots';
  if (!fs.existsSync(artifactDir)) fs.mkdirSync(artifactDir, { recursive: true });

  const screenshotPathMobile = path.join(artifactDir, 'orbital_showcase_iphone_430px.png');
  await page.screenshot({ path: screenshotPathMobile, fullPage: false });
  console.log('Saved mobile screenshot:', screenshotPathMobile);

  // Test interactive stepper click (Pill 2: Basanti Pulao)
  const buttons = await page.$$('#pairings button');
  console.log(`Found ${buttons.length} buttons in pairings section`);

  // Click on stepper button 2
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('#pairings button'));
    const pill2 = btns.find(b => b.textContent && (b.textContent.includes('2') || b.textContent.includes('রাজবাড়ির')));
    if (pill2) pill2.click();
  });
  await new Promise((r) => setTimeout(r, 800));

  // Click Order Duo CTA button
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('#pairings button'));
    const orderBtn = btns.find(b => b.textContent && (b.textContent.includes('Order') || b.textContent.includes('অর্ডার করুন')));
    if (orderBtn) orderBtn.click();
  });
  await new Promise((r) => setTimeout(r, 500));

  const screenshotPathAdded = path.join(artifactDir, 'orbital_dish_added_to_cart.png');
  await page.screenshot({ path: screenshotPathAdded, fullPage: false });
  console.log('Saved cart added screenshot:', screenshotPathAdded);

  // Test Desktop 1440px
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.evaluate(() => {
    document.getElementById('pairings')?.scrollIntoView({ behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 1000));

  const screenshotPathDesktop = path.join(artifactDir, 'orbital_showcase_desktop_1440px.png');
  await page.screenshot({ path: screenshotPathDesktop, fullPage: false });
  console.log('Saved desktop screenshot:', screenshotPathDesktop);

  await browser.close();
  console.log('Orbital showcase visual QA completed successfully!');
}

testOrbital().catch(err => {
  console.error('Error during test:', err);
  process.exit(1);
});
