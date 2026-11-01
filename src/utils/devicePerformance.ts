import { GraphicsTier, QualitySettings } from '../types';

/**
 * Detect device hardware capabilities to select the optimal Graphics Profile:
 * - HIGH: Modern desktop GPUs, iPhone Pro Max (120Hz ProMotion), flagship devices
 * - BALANCED: Standard mobile devices (iPhone standard, mid-range Android)
 * - LOW: Budget Android devices, low-memory devices (< 4GB), battery saver mode
 * - FALLBACK: Devices with no WebGL or severely restricted software rendering
 */
export function detectDeviceCapabilities(): {
  tier: GraphicsTier;
  recommendedSettings: QualitySettings;
  deviceInfo: {
    isMobile: boolean;
    dpr: number;
    hardwareConcurrency: number;
    deviceMemoryGb?: number;
    prefersReducedMotion: boolean;
  };
} {
  const isBrowser = typeof window !== 'undefined';
  const prefersReducedMotion =
    isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const width = isBrowser ? window.innerWidth : 1280;
  const isMobile = width < 768;
  const dpr = isBrowser ? window.devicePixelRatio || 1 : 1;
  const concurrency = isBrowser ? navigator.hardwareConcurrency || 4 : 4;

  // Experimental Device Memory API
  const nav = isBrowser ? (navigator as unknown as { deviceMemory?: number }) : {};
  const deviceMemoryGb = nav.deviceMemory;

  // Determine optimal tier based on measured capabilities
  let tier: GraphicsTier = 'balanced';

  if (isMobile) {
    if (prefersReducedMotion || (deviceMemoryGb && deviceMemoryGb < 3) || concurrency < 4) {
      tier = 'low';
    } else if (width >= 390 && dpr >= 2.5 && concurrency >= 6 && (!deviceMemoryGb || deviceMemoryGb >= 4)) {
      // Premium mobile reference like iPhone 14/15/16/17 Pro Max or high-end flagship
      tier = 'high';
    } else {
      tier = 'balanced';
    }
  } else {
    // Desktop: default to High unless low-spec concurrency
    if (concurrency < 4) {
      tier = 'balanced';
    } else {
      tier = 'high';
    }
  }

  // Define settings corresponding to the profile tier
  const recommendedSettings: QualitySettings = {
    tier,
    // Cap pixel ratio appropriately to maintain locked 60/120fps without GPU throttling
    pixelRatio: tier === 'high' ? (isMobile ? 1.25 : 1.35) : tier === 'balanced' ? 1.15 : 1.0,
    shadows: tier === 'high' || (tier === 'balanced' && !isMobile),
    reducedMotion: prefersReducedMotion,
    highContrast: false,
    soundEnabled: false,
    maxLights: tier === 'high' ? 6 : tier === 'balanced' ? 4 : 2,
    particleDensity: tier === 'high' ? 14 : tier === 'balanced' ? 8 : 4,
  };

  return {
    tier,
    recommendedSettings,
    deviceInfo: {
      isMobile,
      dpr,
      hardwareConcurrency: concurrency,
      deviceMemoryGb,
      prefersReducedMotion,
    },
  };
}

/**
 * Phase 2 — Flagship Phone Detection
 *
 * Returns true only for high-end flagship mobile devices that can
 * comfortably run the Three.js WebGL scene without thermal throttling.
 * Examples: iPhone 14 Pro+, Samsung Galaxy S23+, Pixel 8 Pro
 *
 * Heuristics (all must pass):
 *  - viewport width < 768px (confirms it's a phone, not tablet)
 *  - hardwareConcurrency ≥ 6 (flagship SoC indicator)
 *  - devicePixelRatio ≥ 3   (flagship display indicator)
 *  - innerWidth ≥ 390px     (modern flagship screen width)
 *  - deviceMemory ≥ 6 GB or unavailable (conservative RAM gate)
 */
export function isHighEndMobile(): boolean {
  if (typeof window === 'undefined') return false;
  const width = window.innerWidth;
  if (width >= 768) return false; // Tablet or desktop — handled separately

  const dpr = window.devicePixelRatio || 1;
  const concurrency = navigator.hardwareConcurrency || 4;
  const nav = navigator as unknown as { deviceMemory?: number };
  const memory = nav.deviceMemory;

  return (
    concurrency >= 6 &&
    dpr >= 3 &&
    width >= 390 &&
    (!memory || memory >= 6)
  );
}
