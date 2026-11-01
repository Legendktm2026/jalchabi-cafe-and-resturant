const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));
  
  // Test hiding each child of ExteriorEntrance (children[5])
  const results = [];
  const total = await page.evaluate(() => window.__THREE_SCENE__.children[5].children.length);
  
  for (let i = 0; i < total; i++) {
    await page.evaluate((idx) => {
      window.__THREE_SCENE__.children[5].children[idx].visible = false;
    }, i);
    
    // Check if the canvas at (720, 120) changed by taking screenshot of that 10x10 clip
    const clip = { x: 715, y: 115, width: 10, height: 10 };
    await page.screenshot({ path: `verification_screenshots/post_fix_verification/clip_${i}.png`, clip });
    
    await page.evaluate((idx) => {
      window.__THREE_SCENE__.children[5].children[idx].visible = true;
    }, i);
    
    const info = await page.evaluate((idx) => {
      const c = window.__THREE_SCENE__.children[5].children[idx];
      return {
        idx,
        type: c.type,
        geo: c.geometry ? c.geometry.type : 'group',
        args: c.geometry ? c.geometry.parameters : null,
        mat: c.material ? {
          color: '#' + c.material.color.getHexString(),
          opacity: c.material.opacity
        } : null
      };
    }, i);
    results.push(info);
  }
  
  fs.writeFileSync('verification_screenshots/post_fix_verification/mesh_children_list.json', JSON.stringify(results, null, 2));
  console.log(`Saved ${total} clips and mesh list.`);
  await browser.close();
})();
