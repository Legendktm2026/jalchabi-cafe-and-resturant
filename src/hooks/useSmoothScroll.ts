import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

interface SmoothScrollOptions {
  reducedMotion?: boolean;
}

export interface ScrollState {
  scrollY: number;
  progress: number;
  velocity: number;
}

export function useSmoothScroll({ reducedMotion = false }: SmoothScrollOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    progress: 0,
    velocity: 0,
  });

  useEffect(() => {
    // If user prefers reduced motion, do not initialize smooth inertia scroll
    if (reducedMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    // Initialize Lenis with Apple-style inertia and momentum curve
    const lenis = new Lenis({
      duration: 1.15, // Smooth Apple-grade momentum duration
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple exponential deceleration curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95, // Refined trackpad sensitivity for MacBook Pro
      touchMultiplier: 1.6,
      infinite: false,
    });

    lenisRef.current = lenis;

    // High-precision scroll event listener synced to display refresh rate
    const handleScroll = (e: { scroll: number; progress: number; velocity: number }) => {
      setScrollState({
        scrollY: e.scroll,
        progress: e.progress,
        velocity: e.velocity,
      });
    };

    lenis.on('scroll', handleScroll);

    // Synchronize directly with 120Hz ProMotion display vsync via requestAnimationFrame
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Intercept internal hash anchor clicks (e.g., #story, #menu, #gallery)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -70, // Header clearance
            duration: 1.3,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  const scrollTo = (target: string | HTMLElement | number, options?: { offset?: number; duration?: number }) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: options?.offset ?? -70,
        duration: options?.duration ?? 1.3,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else {
        const el = typeof target === 'string' ? document.querySelector(target) : target;
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return {
    lenis: lenisRef.current,
    scrollState,
    scrollTo,
  };
}
