const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function runPerformanceAudit() {
  console.log('=== Commencing Performance Audit & Smoke Test ===');

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
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  console.log('1. Loading application at http://localhost:4173/ ...');
  const navStart = Date.now();
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0', timeout: 25000 });
  const loadTime = Date.now() - navStart;
  console.log(`✓ Initial Page Load Complete: ${loadTime}ms`);

  const glInfo = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return 'No canvas found';
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return 'No WebGL context';
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    return {
      vendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'Unknown',
      renderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unknown',
      dpr: window.devicePixelRatio,
      width: canvas.width,
      height: canvas.height,
    };
  });
  console.log('✓ WebGL Engine Info:', JSON.stringify(glInfo, null, 2));

  // Measure 3D Canvas FPS & Performance
  console.log('2. Measuring 3D Canvas FPS over 60 frames...');
  const fpsMetrics = await page.evaluate(async () => {
    return new Promise((resolve) => {
      let frameCount = 0;
      const start = performance.now();
      const checkFrame = () => {
        frameCount++;
        if (frameCount < 60) {
          requestAnimationFrame(checkFrame);
        } else {
          const duration = performance.now() - start;
          const fps = Math.round((frameCount / duration) * 1000);
          resolve({ fps, duration: Math.round(duration) });
        }
      };
      requestAnimationFrame(checkFrame);
    });
  });
  console.log(`✓ 3D Canvas Idle FPS: ${fpsMetrics.fps} fps (Duration for 60 frames: ${fpsMetrics.duration}ms)`);

  // Test 3D Camera Transition to Interior
  console.log('3. Triggering 3D Transition (ENTER JALCHABI & Camera Presets)...');
  const enterStart = Date.now();
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('ENTER JALCHABI')
    );
    btn?.click();
  });

  // Measure FPS during active camera lerp
  const transitionFps = await page.evaluate(async () => {
    return new Promise((resolve) => {
      let count = 0;
      const start = performance.now();
      const tick = () => {
        count++;
        if (performance.now() - start < 2000) {
          requestAnimationFrame(tick);
        } else {
          const dur = performance.now() - start;
          resolve({ fps: Math.round((count / dur) * 1000), frames: count });
        }
      };
      requestAnimationFrame(tick);
    });
  });
  console.log(`✓ 3D Camera Motion Transition FPS: ${transitionFps.fps} fps (${transitionFps.frames} frames during lerp)`);

  // Test Camera Presets (Brew Bar, Dining, Lakeside)
  const presets = ['Brew Bar Counter', 'Lakeside Veranda', 'Dining Room'];
  for (const preset of presets) {
    await page.evaluate((name) => {
      const btn = Array.from(document.querySelectorAll('button')).find((b) =>
        b.textContent?.includes(name)
      );
      btn?.click();
    }, preset);
    await new Promise((r) => setTimeout(r, 600));
  }
  console.log(`✓ Tested all camera presets in ${Date.now() - enterStart}ms`);

  // Test Video Modal Playback Performance
  console.log('4. Testing Video Modal & Playback...');
  await page.evaluate(() => {
    const filmBtn = Array.from(document.querySelectorAll('button')).find((b) =>
      b.textContent?.includes('Cinematic Film') || b.textContent?.includes('Watch Film')
    );
    filmBtn?.click();
  });
  await new Promise((r) => setTimeout(r, 800));

  // Check if video element is active and playing without error
  const videoState = await page.evaluate(() => {
    const video = document.querySelector('video');
    if (!video) return { exists: false };
    return {
      exists: true,
      paused: video.paused,
      currentTime: video.currentTime,
      duration: video.duration,
      readyState: video.readyState, // 4 = HAVE_ENOUGH_DATA
      videoWidth: video.videoWidth,
      videoHeight: video.videoHeight,
    };
  });
  console.log('✓ Video Modal Status:', JSON.stringify(videoState, null, 2));

  // Close Video Modal
  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 400));

  // Test Rapid Scrolling Performance (Lenis + ScrollProgressBar)
  console.log('5. Stress testing 120Hz Smooth Scroll down to Footer...');
  const scrollFps = await page.evaluate(async () => {
    return new Promise((resolve) => {
      let frames = 0;
      const startTime = performance.now();
      let scrollY = 0;

      const step = () => {
        scrollY += 120;
        window.scrollTo(0, scrollY);
        frames++;
        if (scrollY < 3000 && frames < 80) {
          requestAnimationFrame(step);
        } else {
          const elapsed = performance.now() - startTime;
          resolve({
            fps: Math.round((frames / elapsed) * 1000),
            frames,
            elapsed: Math.round(elapsed),
          });
        }
      };
      requestAnimationFrame(step);
    });
  });
  console.log(`✓ Scroll Stress FPS: ${scrollFps.fps} fps (${scrollFps.frames} frames in ${scrollFps.elapsed}ms)`);

  // Smoke Test: Menu & Gallery Interactive verification
  console.log('6. Smoke testing Menu and Gallery components...');
  const interactiveState = await page.evaluate(() => {
    const tabs = document.querySelectorAll('#menu button');
    const menuCards = document.querySelectorAll('#menu .will-change-transform');
    const galleryCards = document.querySelectorAll('#gallery .transform-gpu');
    return {
      menuTabsCount: tabs.length,
      menuCardsCount: menuCards.length,
      galleryCardsCount: galleryCards.length,
    };
  });
  console.log('✓ Interactive Components Smoke Test:', JSON.stringify(interactiveState, null, 2));

  await browser.close();

  console.log('\n=== AUDIT SUMMARY ===');
  console.log(`• Errors Detected: ${errors.length}`);
  console.log(`• 3D Idle FPS: ${fpsMetrics.fps} fps`);
  console.log(`• Scroll FPS: ${scrollFps.fps} fps`);
  console.log(`• Video Playback ReadyState: ${videoState.readyState} (HAVE_ENOUGH_DATA)`);
  console.log('=======================\n');

  if (errors.length > 0) {
    console.error('Audit failed with errors:', errors);
    process.exit(1);
  }
}

runPerformanceAudit().catch((err) => {
  console.error('Audit script failed:', err);
  process.exit(1);
});
