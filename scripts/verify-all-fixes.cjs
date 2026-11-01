const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const VIEWPORTS = [
  { name: '320px_android_narrow', width: 320, height: 640 },
  { name: '360px_android_standard', width: 360, height: 740 },
  { name: '375px_iphone_se', width: 375, height: 667 },
  { name: '390px_iphone_standard', width: 390, height: 844 },
  { name: '402px_android_pixel', width: 402, height: 874 },
  { name: '412px_android_samsung', width: 412, height: 915 },
  { name: '430px_iphone_17_pro_max', width: 430, height: 932 },
  { name: '440px_android_large', width: 440, height: 956 },
  { name: '768px_ipad_portrait', width: 768, height: 1024 },
  { name: '820px_ipad_air', width: 820, height: 1180 },
  { name: '1024px_ipad_pro_landscape', width: 1024, height: 768 },
  { name: '1280px_macbook_compact', width: 1280, height: 800 },
  { name: '1440px_macbook_pro', width: 1440, height: 900 },
  { name: '1920px_desktop_fhd', width: 1920, height: 1080 }
];

const OUT_DIR = path.join(__dirname, '..', 'verification_screenshots', 'final_verification');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function runVerification() {
  console.log('🚀 Starting Jalchabi Cafe Final Mobile & Cross-Device Verification...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const results = {
    viewports: [],
    occlusionChecks: {},
    drawerCheck: {},
    reservationCheck: {},
    allPassed: true
  };

  try {
    const page = await browser.newPage();

    // 1. Check all 14 viewports for horizontal overflow
    for (const vp of VIEWPORTS) {
      await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
      await page.goto('http://localhost:4173', { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 600));

      const overflowData = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const bodyWidth = document.body.scrollWidth;
        return {
          scrollWidth: docWidth,
          innerWidth: winWidth,
          bodyWidth: bodyWidth,
          hasOverflow: docWidth > winWidth
        };
      });

      console.log(`Viewport ${vp.width}x${vp.height} (${vp.name}): overflow = ${overflowData.hasOverflow} (${overflowData.scrollWidth}px vs ${overflowData.innerWidth}px)`);

      results.viewports.push({
        name: vp.name,
        width: vp.width,
        height: vp.height,
        ...overflowData
      });

      if (overflowData.hasOverflow) {
        results.allPassed = false;
      }

      // Save screenshot for key representative devices
      const captureKeys = ['320px_android_narrow', '390px_iphone_standard', '412px_android_samsung', '430px_iphone_17_pro_max', '1024px_ipad_pro_landscape', '1280px_macbook_compact', '1920px_desktop_fhd'];
      if (captureKeys.includes(vp.name)) {
        await page.screenshot({
          path: path.join(OUT_DIR, `viewport_${vp.name}.png`),
          fullPage: false
        });
      }
    }

    // 2. Occlusion Verification on iPhone 17 Pro Max (430x932)
    console.log('\n📱 Testing Element Occlusion on iPhone 17 Pro Max (430x932)...');
    await page.setViewport({ width: 430, height: 932, deviceScaleFactor: 3 });
    await page.goto('http://localhost:4173', { waitUntil: 'networkidle2' });
    await new Promise(r => setTimeout(r, 800));

    // Test Hero CTA button occlusion
    const heroOcclusion = await page.evaluate(() => {
      // Find "Enter Sanctuary" or "Explore Menu" button on Zone 0
      const buttons = Array.from(document.querySelectorAll('button, a'));
      const enterBtn = buttons.find(b => b.textContent && (b.textContent.includes('Enter Sanctuary') || b.textContent.includes('প্রবেশ করুন')));
      const dock = document.querySelector('nav[aria-label="Mobile quick actions"]');

      if (!enterBtn) {
        return { found: false, message: 'Enter Sanctuary button not found' };
      }

      const rect = enterBtn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const elAtPoint = document.elementFromPoint(cx, cy);

      const isOccludedByDock = dock ? (dock.contains(elAtPoint) && !enterBtn.contains(elAtPoint)) : false;
      const dockRect = dock ? dock.getBoundingClientRect() : null;

      return {
        found: true,
        enterBtnRect: { top: rect.top, bottom: rect.bottom, height: rect.height },
        dockRect: dockRect ? { top: dockRect.top, height: dockRect.height } : null,
        clearanceAboveDock: dockRect ? (dockRect.top - rect.bottom) : null,
        isOccludedByDock,
        topElementTag: elAtPoint ? elAtPoint.tagName : null,
        isEnterBtnOrChild: enterBtn.contains(elAtPoint)
      };
    });

    results.occlusionChecks.heroCTA = heroOcclusion;
    console.log('Hero CTA Occlusion Check:', JSON.stringify(heroOcclusion, null, 2));

    // Test Footer Scroll to Top Occlusion
    console.log('\n📜 Testing Footer Scroll-to-Top Occlusion...');
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await new Promise(r => setTimeout(r, 600));

    const footerOcclusion = await page.evaluate(() => {
      const scrollBtn = document.querySelector('button[aria-label="Scroll to top"]');
      const dock = document.querySelector('nav[aria-label="Mobile quick actions"]');

      if (!scrollBtn) {
        return { found: false, message: 'Scroll to top button not found' };
      }

      const rect = scrollBtn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const elAtPoint = document.elementFromPoint(cx, cy);

      const isOccludedByDock = dock ? (dock.contains(elAtPoint) && !scrollBtn.contains(elAtPoint)) : false;
      const dockRect = dock ? dock.getBoundingClientRect() : null;

      return {
        found: true,
        scrollBtnRect: { top: rect.top, bottom: rect.bottom, height: rect.height },
        dockRect: dockRect ? { top: dockRect.top, height: dockRect.height } : null,
        clearanceAboveDock: dockRect ? (dockRect.top - rect.bottom) : null,
        isOccludedByDock,
        isScrollBtnOrChild: scrollBtn.contains(elAtPoint)
      };
    });

    results.occlusionChecks.footerScrollTop = footerOcclusion;
    console.log('Footer Scroll-to-Top Occlusion Check:', JSON.stringify(footerOcclusion, null, 2));

    // 3. Mobile Navigation Drawer Check
    console.log('\n🍔 Testing Mobile Navigation Drawer...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 400));

    // Click mobile hamburger menu
    const menuBtn = await page.$('button[aria-label="Toggle menu"]');
    if (menuBtn) {
      await menuBtn.click();
      await new Promise(r => setTimeout(r, 500));

      const drawerState = await page.evaluate(() => {
        const dialog = document.querySelector('div[role="dialog"]');
        const bodyOverflow = document.body.style.overflow;
        return {
          isOpen: !!dialog,
          isBodyLocked: bodyOverflow === 'hidden',
          ariaModal: dialog ? dialog.getAttribute('aria-modal') : null
        };
      });

      console.log('Mobile Drawer Open State:', drawerState);

      await page.screenshot({
        path: path.join(OUT_DIR, 'mobile_drawer_open_430px.png'),
        fullPage: false
      });

      // Press Escape to verify dismissal
      await page.keyboard.press('Escape');
      await new Promise(r => setTimeout(r, 500));

      const drawerClosedState = await page.evaluate(() => {
        const dialog = document.querySelector('div[role="dialog"]');
        const bodyOverflow = document.body.style.overflow;
        return {
          isClosed: !dialog,
          bodyUnlocked: bodyOverflow === ''
        };
      });

      console.log('Mobile Drawer Closed via Escape:', drawerClosedState);
      results.drawerCheck = { ...drawerState, ...drawerClosedState };
    } else {
      console.error('Menu button not found');
      results.drawerCheck = { error: 'Menu button not found' };
    }

    // 4. Reservation Submission & WhatsApp Link Verification
    console.log('\n🍽️ Testing Reservation Form Submission & WhatsApp Link...');
    await page.evaluate(() => {
      const resSection = document.getElementById('reservations');
      if (resSection) resSection.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 600));

    // Fill form fields
    await page.type('#reservation-name', 'Rizwan & Guests');
    await page.type('#reservation-email', 'concierge@jalchabicafe.com');
    await page.type('#reservation-phone', '+91 89189 48730');
    await page.type('#reservation-notes', 'Window seat requested with evening sunset ambiance.');

    // Submit form
    const submitBtn = await page.$('#reservations form button[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
      // Wait for submission animation and confetti
      await new Promise(r => setTimeout(r, 1500));

      const reservationResult = await page.evaluate(() => {
        const refStrong = document.querySelector('#reservations strong');
        const whatsappLink = document.querySelector('#reservations a[href*="wa.me"]');
        return {
          referenceCode: refStrong ? refStrong.textContent : null,
          hasWhatsAppBtn: !!whatsappLink,
          whatsAppHref: whatsappLink ? whatsappLink.getAttribute('href') : null
        };
      });

      console.log('Reservation Result:', reservationResult);
      results.reservationCheck = reservationResult;

      await page.screenshot({
        path: path.join(OUT_DIR, 'reservation_confirmation_whatsapp.png'),
        fullPage: false
      });
    }

    // 5. Test Graphics Profiles & Accessibility Modal
    console.log('\n⚙️ Testing Adaptive Graphics Profiles & Accessibility Modal...');
    // Open accessibility modal
    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });
    await new Promise(r => setTimeout(r, 400));

    // Open mobile menu to click Graphics & Settings
    const menuBtnAgain = await page.$('button[aria-label="Toggle menu"]');
    if (menuBtnAgain) {
      await menuBtnAgain.click();
      await new Promise(r => setTimeout(r, 400));

      const settingsBtn = await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const target = btns.find(b => b.textContent && (b.textContent.includes('Graphics & Settings') || b.textContent.includes('গ্রাফিক্স ও সেটিংস')));
        if (target) {
          target.click();
          return true;
        }
        return false;
      });

      await new Promise(r => setTimeout(r, 600));

      const modalState = await page.evaluate(() => {
        const dialog = document.querySelector('div[role="dialog"]');
        const tierButtons = Array.from(document.querySelectorAll('button')).filter(b => 
          b.textContent && (b.textContent.includes('Low / Saver') || b.textContent.includes('Balanced') || b.textContent.includes('High / Pro'))
        );
        return {
          isOpen: !!dialog,
          tierCount: tierButtons.length,
          tiersFound: tierButtons.map(b => b.textContent.trim())
        };
      });

      console.log('Accessibility & Graphics Profile State:', modalState);
      results.graphicsSettingsCheck = modalState;

      await page.screenshot({
        path: path.join(OUT_DIR, 'accessibility_graphics_modal.png'),
        fullPage: false
      });

      // Close modal with Escape
      await page.keyboard.press('Escape');
      await new Promise(r => setTimeout(r, 400));
    }

    // Write full test summary to JSON
    fs.writeFileSync(
      path.join(OUT_DIR, 'verification_results.json'),
      JSON.stringify(results, null, 2),
      'utf8'
    );
    console.log('\n✅ Verification run complete! Report written to verification_results.json');

  } catch (err) {
    console.error('Error during verification:', err);
    results.allPassed = false;
    results.error = err.message;
  } finally {
    await browser.close();
  }
}

runVerification();
