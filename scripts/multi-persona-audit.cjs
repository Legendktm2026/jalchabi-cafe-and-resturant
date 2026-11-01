const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

async function runMultiPersonaAudit() {
  const screenshotDir = path.join(__dirname, '../verification_screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  console.log('>>> [Technical Architect] Starting Vite preview server on port 4173...');
  const server = spawn('npx', ['vite', 'preview', '--port', '4173'], {
    cwd: path.join(__dirname, '..'),
    stdio: 'pipe',
  });

  server.stdout.on('data', (d) => {
    const text = d.toString().trim();
    if (text) console.log('[Server]', text);
  });
  server.stderr.on('data', (d) => {
    const text = d.toString().trim();
    if (text) console.error('[Server Error]', text);
  });

  // Wait 3s for server to start
  await new Promise((r) => setTimeout(r, 3000));

  let browser;
  const auditReport = {
    customer: {},
    ceo: {},
    architect: {
      consoleErrors: [],
      networkFailures: [],
      performanceMetrics: {},
    },
  };

  try {
    console.log('>>> [Technical Architect] Launching Chrome with WebGL enabled...');
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

    page.on('console', (msg) => {
      const type = msg.type();
      const text = msg.text();
      if (type === 'error') {
        auditReport.architect.consoleErrors.push(text);
        console.error('  [Console Error]', text);
      }
    });

    page.on('requestfailed', (req) => {
      auditReport.architect.networkFailures.push({
        url: req.url(),
        failure: req.failure() ? req.failure().errorText : 'unknown',
      });
      console.warn('  [Network Failed]', req.url());
    });

    // -------------------------------------------------------------
    // PERSONA 1 & 2: CUSTOMER & CEO LANDING PAGE AUDIT
    // -------------------------------------------------------------
    console.log('\n=============================================================');
    console.log('STEP 1: CUSTOMER & CEO LANDING AT STARTING FACADE (Zone 0)');
    console.log('=============================================================');
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 3000)); // Allow Three.js textures and entrance to render

    // Check if any unwanted video is playing or visible in landing page
    const landingVideoCheck = await page.evaluate(() => {
      const videos = Array.from(document.querySelectorAll('video'));
      const visibleVideos = videos.filter((v) => {
        const rect = v.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && window.getComputedStyle(v).display !== 'none';
      });
      const modalOpen = !!document.querySelector('[role="dialog"]') || document.body.textContent.includes('Real-World Portal');
      const headline = document.querySelector('h1')?.textContent || '';
      return {
        totalVideos: videos.length,
        visibleVideosCount: visibleVideos.length,
        isModalOpenPrematurely: modalOpen,
        headlineText: headline,
      };
    });

    console.log('Landing Page State:', landingVideoCheck);
    auditReport.customer.landingClean = landingVideoCheck.visibleVideosCount === 0 && !landingVideoCheck.isModalOpenPrematurely;
    auditReport.ceo.landingImpression = {
      headline: landingVideoCheck.headlineText,
      cleanAesthetic: auditReport.customer.landingClean,
    };

    const landingScreenshot = path.join(screenshotDir, '01_persona_landing_facade_clean.png');
    await page.screenshot({ path: landingScreenshot });
    console.log('Saved Screenshot:', landingScreenshot);

    // -------------------------------------------------------------
    // STEP 2: TEST 3D DOOR CLICK INTERACTIVITY
    // -------------------------------------------------------------
    console.log('\n=============================================================');
    console.log('STEP 2: TESTING 3D ENTRANCE DOOR CLICK (Tactile Open/Close)');
    console.log('=============================================================');

    // Click near center screen on the 3D doors
    const doorClickResult = await page.evaluate(async () => {
      // Find the Canvas element
      const canvas = document.querySelector('canvas');
      if (!canvas) return { error: 'Canvas not found' };

      const rect = canvas.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Dispatch click event directly on canvas at center (where the double doors are)
      const evt = new MouseEvent('click', {
        clientX: centerX,
        clientY: centerY,
        bubbles: true,
        cancelable: true,
      });
      canvas.dispatchEvent(evt);

      return { clicked: true, x: centerX, y: centerY };
    });

    console.log('Dispatched click to 3D doors on canvas:', doorClickResult);
    await new Promise((r) => setTimeout(r, 1500));

    // Verify modal DID NOT open upon clicking front door
    const modalAfterDoorClick = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]') || document.body.textContent.includes('Real-World Portal');
      return !!modal;
    });

    console.log('Did video modal pop up after front door click? ->', modalAfterDoorClick, '(Must be false)');
    auditReport.customer.doorOpenedWithoutUnwantedModal = !modalAfterDoorClick;

    const doorClickedScreenshot = path.join(screenshotDir, '02_persona_door_clicked_3d.png');
    await page.screenshot({ path: doorClickedScreenshot });
    console.log('Saved Screenshot:', doorClickedScreenshot);

    // -------------------------------------------------------------
    // STEP 3: CUSTOMER JOURNEY THROUGH SCROLLYTELLING TO VERANDA
    // -------------------------------------------------------------
    console.log('\n=============================================================');
    console.log('STEP 3: JOURNEY TO ZONE 06: WATERFRONT VERANDA');
    console.log('=============================================================');

    await page.evaluate(() => {
      const container = document.getElementById('experience');
      if (container) {
        const top = container.offsetTop;
        const h = container.offsetHeight - window.innerHeight;
        // Scroll to 97% of the experience container (Veranda zone)
        window.scrollTo({ top: top + h * 0.97, behavior: 'instant' });
      }
    });

    await new Promise((r) => setTimeout(r, 3000)); // Let 3D camera move to Veranda and render portal mesh

    // Capture Veranda view showing open doors and portal vista
    const verandaScreenshot = path.join(screenshotDir, '03_persona_veranda_portal_vista.png');
    await page.screenshot({ path: verandaScreenshot });
    console.log('Saved Screenshot:', verandaScreenshot);

    const verandaZoneInfo = await page.evaluate(() => {
      const bodyText = document.body.textContent || '';
      return {
        hasVerandaCard: bodyText.includes('Waterfront Veranda') || bodyText.includes('Portal'),
        hasStepIntoCafeBtn: bodyText.includes('Open Doors • Step Into Real Cafe') || bodyText.includes('Step Into Real Cafe'),
      };
    });
    console.log('Veranda Zone UI detected:', verandaZoneInfo);
    auditReport.customer.verandaPortalDiscovered = verandaZoneInfo.hasStepIntoCafeBtn;

    // -------------------------------------------------------------
    // STEP 4: OPENING PORTAL TO REAL WORLD CINEMA EXPERIENCE
    // -------------------------------------------------------------
    console.log('\n=============================================================');
    console.log('STEP 4: STEPPING INTO REAL WORLD CINEMA EXPERIENCE');
    console.log('=============================================================');

    const clickedPortal = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const portalBtn = btns.find((b) =>
        b.textContent && (
          b.textContent.includes('Open Doors • Step Into Real Cafe') ||
          b.textContent.includes('Step Into Real Cafe') ||
          b.textContent.includes('Real Cafe')
        )
      );
      if (portalBtn) {
        portalBtn.click();
        return true;
      }
      return false;
    });

    console.log('Clicked "Step Into Real Cafe" CTA:', clickedPortal);
    await new Promise((r) => setTimeout(r, 2500)); // Allow modal enter animation and video start

    // Audit Cinema Modal elements: Check for clutter, video attributes, resolution
    const cinemaAudit = await page.evaluate(() => {
      const video = document.querySelector('video');
      const bodyText = document.body.textContent || '';

      // Check for removed distractors
      const hasClutterBadge = bodyText.includes('Gemini AI Real-World Vision');
      const hasClutterChapters = bodyText.includes('Lake Caustics & Dusk Sky');
      const hasClutterBanner = bodyText.includes('High Definition');

      return {
        videoFound: !!video,
        videoSrc: video ? video.getAttribute('src') : null,
        videoWidth: video ? video.videoWidth : 0,
        videoHeight: video ? video.videoHeight : 0,
        isPaused: video ? video.paused : null,
        isDistractionFree: !hasClutterBadge && !hasClutterChapters && !hasClutterBanner,
        hasPureCinemaHeader: bodyText.includes('Jalchabi Real-World Sanctuary') || bodyText.includes('Real-World Portal'),
      };
    });

    console.log('Cinema Experience Audit:', cinemaAudit);
    auditReport.customer.cinemaExperience = cinemaAudit;
    auditReport.ceo.cinematicStandard = cinemaAudit.videoFound && cinemaAudit.isDistractionFree;

    const cinemaScreenshot = path.join(screenshotDir, '04_persona_cinema_distraction_free.png');
    await page.screenshot({ path: cinemaScreenshot });
    console.log('Saved Screenshot:', cinemaScreenshot);

    // -------------------------------------------------------------
    // STEP 5: CEO BRANDING & MENU AUDIT (Scroll to Menu & Dining)
    // -------------------------------------------------------------
    console.log('\n=============================================================');
    console.log('STEP 5: CEO BRANDING & DINING SECTIONS AUDIT');
    console.log('=============================================================');

    // Close the cinema modal
    await page.evaluate(() => {
      const closeBtn = document.querySelector('button[aria-label="Close portal"]') ||
        Array.from(document.querySelectorAll('button')).find((b) => b.textContent && b.textContent.includes('Return to 3D'));
      if (closeBtn) closeBtn.click();
    });

    await new Promise((r) => setTimeout(r, 1000));

    // Scroll to Menu section
    await page.evaluate(() => {
      const menuSec = document.getElementById('menu');
      if (menuSec) menuSec.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise((r) => setTimeout(r, 1500));

    const menuScreenshot = path.join(screenshotDir, '05_ceo_menu_presentation.png');
    await page.screenshot({ path: menuScreenshot });
    console.log('Saved Menu Screenshot:', menuScreenshot);

    // Final Technical Architect Report
    const perfTiming = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      return nav ? {
        domInteractive: nav.domInteractive,
        loadEventEnd: nav.loadEventEnd,
        duration: nav.duration,
      } : {};
    });
    auditReport.architect.performanceMetrics = perfTiming;

    console.log('\n=============================================================');
    console.log('SMOKE TEST & MULTI-PERSONA AUDIT COMPLETE');
    console.log('=============================================================');
    console.log(JSON.stringify(auditReport, null, 2));

  } catch (err) {
    console.error('Audit failed with error:', err);
  } finally {
    if (browser) await browser.close();
    server.kill();
  }
}

runMultiPersonaAudit();
