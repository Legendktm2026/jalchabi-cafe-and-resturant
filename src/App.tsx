import React, { useState, useRef, useEffect } from 'react';
import { CameraViewPreset, SceneMode, HotspotInfo, QualitySettings } from './types';
import { Suspense, lazy } from 'react';
const CafeScene = lazy(() =>
  import('./components/canvas/CafeScene').then((mod) => ({ default: mod.CafeScene }))
);
import { CinematicHeroOverlay } from './components/ui/CinematicHeroOverlay';
import { Navbar } from './components/ui/Navbar';
import { ConceptStorySection } from './components/ui/ConceptStorySection';
import { MenuSection } from './components/ui/MenuSection';
import { GallerySection } from './components/ui/GallerySection';
import { VisitSection } from './components/ui/VisitSection';
import { ReservationSection } from './components/ui/ReservationSection';
import { Footer } from './components/ui/Footer';
import { HotspotModal } from './components/ui/HotspotModal';
import { AccessibilityModal } from './components/ui/AccessibilityModal';
import { WebGLFallback } from './components/ui/WebGLFallback';
import { isWebGLAvailable } from './utils/webgl';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { ScrollProgressBar } from './components/ui/ScrollProgressBar';

export const App: React.FC = () => {
  const [currentPreset, setCurrentPreset] = useState<CameraViewPreset>('exterior');
  const [sceneMode, setSceneMode] = useState<SceneMode>('intro');
  const [activeHotspot, setActiveHotspot] = useState<HotspotInfo | null>(null);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
  const [webGLSupported] = useState<boolean>(() => isWebGLAvailable());

  // Reference for off-screen viewport intersection to suspend WebGL rendering
  const experienceRef = useRef<HTMLElement | null>(null);
  const [isCanvasVisible, setIsCanvasVisible] = useState(true);

  useEffect(() => {
    const el = experienceRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCanvasVisible(entry.isIntersecting);
      },
      { root: null, rootMargin: '60px', threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const [qualitySettings, setQualitySettings] = useState<QualitySettings>(() => {
    // Check for prefers-reduced-motion media query
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return {
      pixelRatio: 1.5,
      shadows: true,
      reducedMotion: prefersReducedMotion,
      highContrast: false,
      soundEnabled: false,
    };
  });

  // Apple-grade 120Hz ProMotion smooth momentum scroll engine
  const { scrollState, scrollTo } = useSmoothScroll({
    reducedMotion: qualitySettings.reducedMotion,
  });

  // Handle Shot 2 -> Shot 3: User clicks ENTER JALCHOBI
  const handleEnterExperience = () => {
    setCurrentPreset('entering');
  };

  // Called when camera sweeps through doors
  const handleEnterAnimationComplete = () => {
    setCurrentPreset('interior_overview');
    setSceneMode('interior');
  };

  // Skip intro sequence immediately
  const handleSkipIntro = () => {
    setCurrentPreset('interior_overview');
    setSceneMode('interior');
  };

  // Handle Preset selection
  const handleSelectPreset = (preset: CameraViewPreset) => {
    setCurrentPreset(preset);
    setSceneMode('interior');
  };

  // Toggle Mode (Guided vs Explore)
  const handleToggleMode = (mode: SceneMode) => {
    setSceneMode(mode);
  };

  // Reset View to Overview
  const handleResetView = () => {
    setCurrentPreset('interior_overview');
    setSceneMode('interior');
  };

  // Click on a Hotspot
  const handleSelectHotspot = (hotspot: HotspotInfo) => {
    setActiveHotspot(hotspot);
    setCurrentPreset(hotspot.preset);
    setSceneMode('interior');
  };

  // Action inside Hotspot Modal
  const handleHotspotAction = (targetSectionId: string) => {
    setActiveHotspot(null);
    scrollTo(`#${targetSectionId}`, { offset: -70 });
  };

  // Audio Toggle
  const handleToggleSound = () => {
    setQualitySettings((prev) => ({
      ...prev,
      soundEnabled: !prev.soundEnabled,
    }));
  };

  // Apple-style hero perspective fade & scale as user scrolls down
  const heroScrollFactor = Math.min(scrollState.scrollY / 750, 1);
  const heroScale = qualitySettings.reducedMotion ? 1 : 1 - heroScrollFactor * 0.04;
  const heroDimOpacity = qualitySettings.reducedMotion ? 1 : 1 - heroScrollFactor * 0.35;

  return (
    <div className="relative min-h-screen bg-[#120d09] text-[#f5efe6] selection:bg-[#c58b4b] selection:text-[#120d09]">
      {/* Apple-style Top Scroll Progress Bar */}
      <ScrollProgressBar progress={scrollState.progress} />

      {/* Top Navigation with dynamic elevation on scroll */}
      <Navbar
        isScrolled={scrollState.scrollY > 40}
        onOpenAccessibility={() => setIsAccessibilityOpen(true)}
        onEnter3D={() => {
          scrollTo(0);
          if (sceneMode === 'intro') {
            handleEnterExperience();
          }
        }}
      />

      {/* Main 3D Experience Viewport */}
      <section
        ref={experienceRef}
        id="experience"
        className="relative w-full h-[780px] md:h-[900px] lg:h-[calc(100vh-4.5rem)] min-h-[640px] overflow-hidden bg-[#100b08] apple-gpu"
        style={{
          transform: `scale(${heroScale})`,
          opacity: heroDimOpacity,
          transformOrigin: 'center bottom',
          transition: qualitySettings.reducedMotion ? 'none' : 'transform 0.08s ease-out, opacity 0.08s ease-out',
        }}
      >
        {webGLSupported ? (
          <>
            {/* Three.js Canvas Scene */}
            <Suspense
              fallback={
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#100b08] z-10">
                  <div className="w-12 h-12 rounded-full border-2 border-[#c58b4b]/20 border-t-[#c58b4b] animate-spin mb-4" />
                  <span className="font-serif text-lg text-[#f5efe6] tracking-wider">Awakening Jalchobi Sanctuary...</span>
                  <span className="text-[11px] uppercase tracking-widest text-[#c58b4b] mt-1">Kolkata 3D Atmosphere</span>
                </div>
              }
            >
              <CafeScene
                currentPreset={currentPreset}
                sceneMode={sceneMode}
                onEnterAnimationComplete={handleEnterAnimationComplete}
                onSelectHotspot={handleSelectHotspot}
                activeHotspotId={activeHotspot?.id}
                qualitySettings={qualitySettings}
                isVisible={isCanvasVisible}
              />
            </Suspense>

            {/* Cinematic HUD Overlay */}
            <CinematicHeroOverlay
              sceneMode={sceneMode}
              currentPreset={currentPreset}
              onEnterExperience={handleEnterExperience}
              onSkipIntro={handleSkipIntro}
              onSelectPreset={handleSelectPreset}
              onToggleMode={handleToggleMode}
              onResetView={handleResetView}
              qualitySettings={qualitySettings}
              onToggleSound={handleToggleSound}
              onOpenAccessibility={() => setIsAccessibilityOpen(true)}
            />
          </>
        ) : (
          <WebGLFallback
            onExploreClick={() => {
              const el = document.getElementById('story');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}
      </section>

      {/* Editorial & Practical Sections */}
      <ConceptStorySection />
      <MenuSection />
      <GallerySection />
      <VisitSection />
      <ReservationSection onSuccessModal={() => {}} />
      <Footer onOpenAccessibility={() => setIsAccessibilityOpen(true)} />

      {/* Interactive Modals */}
      <HotspotModal
        hotspot={activeHotspot}
        onClose={() => setActiveHotspot(null)}
        onActionClick={handleHotspotAction}
      />

      <AccessibilityModal
        isOpen={isAccessibilityOpen}
        onClose={() => setIsAccessibilityOpen(false)}
        qualitySettings={qualitySettings}
        setQualitySettings={setQualitySettings}
      />
    </div>
  );
};
export default App;
