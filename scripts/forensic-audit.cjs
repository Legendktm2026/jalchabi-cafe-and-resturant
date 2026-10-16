const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function runForensicAudit() {
  console.log('=== STARTING FORENSIC PERFORMANCE & VISUAL AUDIT ===');
  const auditReport = {
    timestamp: new Date().toISOString(),
    environment: {
      platform: 'macOS (Darwin arm64 / M1 Pro target)',
      browser: 'Google Chrome / Headless ANGLE WebGL',
      targetRefreshRate: '120Hz ProMotion',
    },
    network: {
      failedRequests: [],
      totalRequests: 0,
    },
    console: {
      errors: [],
      warnings: [],
      logs: [],
    },
    measurements: {},
    auditResults: {},
  };

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--use-gl=angle',
      '--enable-webgl',
      '--ignore-gpu-blocklist',
      '--disable-background-timer-throttling',
      '--disable-renderer-backgrounding',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // Listen to network requests
  page.on('requestfailed', (req) => {
    auditReport.network.failedRequests.push({
      url: req.url(),
      errorText: req.failure()?.errorText || 'unknown',
    });
  });
  page.on('response', () => {
    auditReport.network.totalRequests++;
  });

  // Listen to console
  page.on('console', (msg) => {
    const text = msg.text();
    if (msg.type() === 'error') auditReport.console.errors.push(text);
    else if (msg.type() === 'warning') auditReport.console.warnings.push(text);
    else auditReport.console.logs.push(text);
  });
  page.on('pageerror', (err) => {
    auditReport.console.errors.push(`[PageError] ${err.toString()}`);
  });

  console.log('1. Navigating to http://localhost:4173/ ...');
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 25000 });
  await new Promise((r) => setTimeout(r, 2000));

  // --- Measure WebGL & Three.js Scene Metrics ---
  const sceneMetrics = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return { error: 'No canvas found' };
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return { error: 'No WebGL context' };

    // Inspect Three.js internal renderer if exposed or inspect canvas bounds & context
    return {
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      dpr: window.devicePixelRatio,
      renderer: gl.getParameter(gl.RENDERER),
      vendor: gl.getParameter(gl.VENDOR),
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      maxViewportDims: Array.from(gl.getParameter(gl.MAX_VIEWPORT_DIMS)),
    };
  });
  auditReport.measurements.sceneMetrics = sceneMetrics;
  console.log('Scene Metrics:', JSON.stringify(sceneMetrics, null, 2));

  // --- Audit 2: Measure FPS during 3D Entrance Sequence ---
  console.log('2. Measuring Entrance Animation FPS...');
  await page.evaluate(() => {
    window.__fpsRecords = [];
    window.__lastFrameTime = performance.now();
    window.__measureActive = true;

    function recordFrame(now) {
      if (window.__measureActive) {
        const delta = now - window.__lastFrameTime;
        window.__lastFrameTime = now;
        window.__fpsRecords.push(delta);
        requestAnimationFrame(recordFrame);
      }
    }
    requestAnimationFrame(recordFrame);
  });

  // Trigger entrance
  await page.evaluate(() => {
    const enterBtn = Array.from(document.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('ENTER JALCHOBI')
    );
    enterBtn?.click();
  });

  await new Promise((r) => setTimeout(r, 2800));

  const entrancePerf = await page.evaluate(() => {
    window.__measureActive = false;
    const deltas = window.__fpsRecords || [];
    if (deltas.length < 5) return { error: 'Insufficient frame records' };
    
    // Drop first 2 warmup frames
    const validDeltas = deltas.slice(2);
    const avgDelta = validDeltas.reduce((a, b) => a + b, 0) / validDeltas.length;
    const avgFPS = 1000 / avgDelta;
    const maxDelta = Math.max(...validDeltas);
    const minDelta = Math.min(...validDeltas);
    const janks = validDeltas.filter((d) => d > 20).length; // frames taking >20ms (>50fps drop)

    return {
      sampleCount: validDeltas.length,
      avgDeltaMs: Number(avgDelta.toFixed(2)),
      avgFPS: Number(avgFPS.toFixed(1)),
      minDeltaMs: Number(minDelta.toFixed(2)),
      maxDeltaMs: Number(maxDelta.toFixed(2)),
      jankFrames: janks,
      jankPercentage: Number(((janks / validDeltas.length) * 100).toFixed(1)),
    };
  });
  auditReport.measurements.entrancePerformance = entrancePerf;
  console.log('Entrance Performance:', JSON.stringify(entrancePerf, null, 2));

  // --- Audit 3: Measure FPS during Long-Page Scrolling (Lenis vsync) ---
  console.log('3. Measuring Long-Page Scroll FPS with Lenis...');
  await page.evaluate(() => {
    window.__fpsRecords = [];
    window.__lastFrameTime = performance.now();
    window.__measureActive = true;

    function recordFrame(now) {
      if (window.__measureActive) {
        const delta = now - window.__lastFrameTime;
        window.__lastFrameTime = now;
        window.__fpsRecords.push(delta);
        requestAnimationFrame(recordFrame);
      }
    }
    requestAnimationFrame(recordFrame);
  });

  // Scroll down in simulated increments
  for (let i = 0; i < 8; i++) {
    await page.evaluate((step) => {
      window.scrollBy({ top: 400, behavior: 'smooth' });
    }, i);
    await new Promise((r) => setTimeout(r, 250));
  }

  const scrollPerf = await page.evaluate(() => {
    window.__measureActive = false;
    const deltas = window.__fpsRecords || [];
    if (deltas.length < 5) return { error: 'Insufficient frame records' };

    const validDeltas = deltas.slice(2);
    const avgDelta = validDeltas.reduce((a, b) => a + b, 0) / validDeltas.length;
    const avgFPS = 1000 / avgDelta;
    const maxDelta = Math.max(...validDeltas);
    const janks = validDeltas.filter((d) => d > 20).length;

    return {
      sampleCount: validDeltas.length,
      avgDeltaMs: Number(avgDelta.toFixed(2)),
      avgFPS: Number(avgFPS.toFixed(1)),
      maxDeltaMs: Number(maxDelta.toFixed(2)),
      jankFrames: janks,
      jankPercentage: Number(((janks / validDeltas.length) * 100).toFixed(1)),
    };
  });
  auditReport.measurements.scrollPerformance = scrollPerf;
  console.log('Scroll Performance:', JSON.stringify(scrollPerf, null, 2));

  // --- Audit 4: Check if Canvas Renders when scrolled far off-screen ---
  console.log('4. Checking Canvas Off-screen Behavior...');
  const offscreenCheck = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return { hasCanvas: false };
    const rect = canvas.getBoundingClientRect();
    return {
      canvasRect: {
        top: rect.top,
        bottom: rect.bottom,
        height: rect.height,
      },
      isOffscreen: rect.bottom < 0,
      windowScrollY: window.scrollY,
    };
  });
  auditReport.measurements.offscreenCheck = offscreenCheck;
  console.log('Offscreen Check:', JSON.stringify(offscreenCheck, null, 2));

  // --- Audit 5: Check Lenis Lifecycle & Event Listeners ---
  console.log('5. Auditing Lenis Lifecycle & Memory...');
  const lenisAudit = await page.evaluate(() => {
    return {
      hasLenisClass: document.documentElement.classList.contains('lenis'),
      htmlScrollBehavior: window.getComputedStyle(document.documentElement).scrollBehavior,
      bodyOverscroll: window.getComputedStyle(document.body).overscrollBehaviorY,
    };
  });
  auditReport.measurements.lenisAudit = lenisAudit;
  console.log('Lenis Audit:', JSON.stringify(lenisAudit, null, 2));

  console.log('=== AUDIT COMPLETE ===');
  await browser.close();

  fs.writeFileSync(
    path.join(__dirname, '../audit_report.json'),
    JSON.stringify(auditReport, null, 2)
  );
  console.log('Wrote audit_report.json');
}

runForensicAudit().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
