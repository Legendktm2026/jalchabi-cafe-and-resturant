import React, { useRef, useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { SCROLLY_ZONES } from '../../config/scrollytellingData';
import { ScrollyEditorialCard } from './ScrollyEditorialCard';
import { ScrollySideRail } from './ScrollySideRail';
import { SparklesCore } from './SparklesCore';
import { QualitySettings } from '../../types';
import { Film, ChevronDown, DoorOpen, Sparkles, ArrowUpRight } from 'lucide-react';
import { AudioWaveformVisualizer } from './AudioWaveformVisualizer';
import { SolarTimePreset } from '../../config/solarLighting';
import { SolarTimeSwitcher } from './SolarTimeSwitcher';
import { useLanguage } from '../../context/LanguageContext';
import { scrollyStore } from '../../stores/scrollyStore';

const CafeScene = lazy(() =>
  import('../canvas/CafeScene').then((mod) => ({ default: mod.CafeScene }))
);

interface ScrollytellingExperienceProps {
  qualitySettings: QualitySettings;
  onToggleSound: () => void;
  onOpenVideoModal: () => void;
  onNavigateSection: (sectionId: string) => void;
  isCanvasVisible: boolean;
  isVideoModalOpen: boolean;
  solarPreset?: SolarTimePreset;
  isAutoSolar?: boolean;
  onSelectSolarPreset?: (preset: SolarTimePreset) => void;
  onToggleAutoSolar?: () => void;
  onSelectTable?: (seatingId: string) => void;
  selectedTableId?: string;
}

export const ScrollytellingExperience: React.FC<ScrollytellingExperienceProps> = ({
  qualitySettings,
  onToggleSound,
  onOpenVideoModal,
  onNavigateSection,
  isCanvasVisible,
  isVideoModalOpen,
  solarPreset = 'golden_hour',
  isAutoSolar = false,
  onSelectSolarPreset = () => {},
  onToggleAutoSolar = () => {},
  onSelectTable,
  selectedTableId,
}) => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOrbitMode, setIsOrbitMode] = useState(false);
  const [isInViewport, setIsInViewport] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);

  // Cached layout metrics to eliminate forced synchronous getBoundingClientRect reflows on scroll
  const metricsRef = useRef({ top: 0, height: 1 });

  const updateMetrics = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    metricsRef.current = {
      top: rect.top + window.scrollY,
      height: Math.max(1, containerRef.current.offsetHeight - window.innerHeight),
    };
  }, []);

  useEffect(() => {
    updateMetrics();
    window.addEventListener('resize', updateMetrics, { passive: true });
    return () => window.removeEventListener('resize', updateMetrics);
  }, [updateMetrics]);

  // Zero-layout-overhead IntersectionObserver for viewport tracking
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Passive high-performance scroll listener: drives 60fps Three.js spline with 0 React renders
  useEffect(() => {
    let lastActiveIndex = 0;
    let lastIsAtTop = true;

    const onScroll = () => {
      const { top, height } = metricsRef.current;
      // When at top of page, start progress directly from window.scrollY to eliminate navbar dead-zone
      const scrolled = top <= 85 ? Math.max(0, window.scrollY) : Math.max(0, window.scrollY - top);
      const progress = Math.max(0, Math.min(1, scrolled / height));

      // 1. Update mutable store for 60fps Three.js useFrame without React reconciliation
      scrollyStore.setProgress(progress);

      // 2. Only trigger React state updates when milestone or threshold actually changes
      const totalZones = SCROLLY_ZONES.length;
      const newIndex = Math.min(
        totalZones - 1,
        Math.max(0, Math.round(progress * (totalZones - 1)))
      );
      if (newIndex !== lastActiveIndex) {
        lastActiveIndex = newIndex;
        setActiveIndex(newIndex);
      }

      const nextAtTop = progress < 0.04;
      if (nextAtTop !== lastIsAtTop) {
        lastIsAtTop = nextAtTop;
        setIsAtTop(nextAtTop);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const totalZones = SCROLLY_ZONES.length; // 6 zones
  const activeZone = SCROLLY_ZONES[activeIndex];

  // Jump smoothly to a specific zone milestone
  const handleSelectZone = (index: number) => {
    if (!containerRef.current) return;
    setIsOrbitMode(false);
    const containerTop = metricsRef.current.top <= 85 ? 0 : metricsRef.current.top;
    const totalHeight = metricsRef.current.height;
    const targetScrollY = containerTop + (index / (totalZones - 1)) * totalHeight;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  // Skip tour to menu/story
  const handleSkipTour = () => {
    onNavigateSection('menu');
  };

  return (
    <div
      ref={containerRef}
      id="experience"
      className="relative w-full h-[340vh] sm:h-[600vh] bg-[#070e0c]"
    >
      {/* Sticky Fullscreen 3D Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#070e0c] select-none">
        {/* 3D WebGL Canvas */}
        <div className="absolute inset-0 z-0">
          <Suspense
            fallback={
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070e0c] z-10">
                <div className="w-12 h-12 rounded-full border-2 border-[#dfb86c]/20 border-t-[#dfb86c] animate-spin mb-4" />
                <span className="font-serif text-lg text-[#fdfbf7] tracking-wider">
                  Awakening Jalchabi Sanctuary...
                </span>
                <span className="text-[11px] uppercase tracking-widest text-[#dfb86c] mt-1">
                  Kolkata 3D Atmosphere
                </span>
              </div>
            }
          >
            <CafeScene
              qualitySettings={qualitySettings}
              isVisible={isCanvasVisible && isInViewport && !isVideoModalOpen}
              isOrbitMode={isOrbitMode}
              solarPreset={solarPreset}
              onSelectTable={onSelectTable}
              selectedTableId={selectedTableId}
              onOpenPortal={onOpenVideoModal}
              onEnterSanctuary={() => handleSelectZone(1)}
            />
          </Suspense>
        </div>

        {/* Golden Embers Sparkles Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <SparklesCore
            id="scrolly-sparkles"
            minSize={0.6}
            maxSize={1.8}
            particleDensity={14}
            particleColor="#dfb86c"
          />
        </div>

        {/* Top Floating Sanctuary HUD */}
        <div className="absolute top-20 md:top-24 left-3 sm:left-4 md:left-8 right-3 sm:right-4 md:right-8 z-20 flex items-center justify-between pointer-events-none">
          {/* Status Badge & Solar Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-[#dfb86c]/20 bg-[#070e0c]/85 px-3 sm:px-4 py-1.5 backdrop-blur-xl shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#dfb86c] animate-pulse" />
              <span className="text-[9px] sm:text-[10px] md:text-xs font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#fdfbf7]">
                KOLKATA 3D SANCTUARY
              </span>
            </div>

            {/* Real-time Day/Dusk/Night Solar Switcher */}
            <div className="pointer-events-auto hidden sm:block">
              <SolarTimeSwitcher
                currentPreset={solarPreset}
                isAutoMode={isAutoSolar}
                onSelectPreset={onSelectSolarPreset}
                onToggleAuto={onToggleAutoSolar}
              />
            </div>
          </div>

          {/* Quick Media Controls & Direct Menu Jump */}
          <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => onNavigateSection('menu')}
              className="flex items-center gap-1.5 rounded-full border border-[#dfb86c]/50 bg-[#dfb86c]/20 hover:bg-[#dfb86c] text-[#e5c378] hover:text-[#070e0c] px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-wider backdrop-blur-xl transition-all shadow-lg cursor-pointer"
              title="Skip 3D tour directly to food menu"
            >
              <span>{language === 'bn' ? 'সরাসরি মেনু' : 'Menu'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenVideoModal}
              className="group hidden md:flex items-center gap-2 rounded-full border border-[#dfb86c]/30 bg-[#070e0c]/85 px-3.5 py-1.5 text-[10px] md:text-xs font-mono uppercase tracking-wider text-[#fdfbf7] hover:border-[#dfb86c] hover:text-[#fdfbf7] backdrop-blur-xl transition-all shadow-lg cursor-pointer"
            >
              <Film className="w-3.5 h-3.5 text-[#dfb86c] group-hover:scale-110 transition-transform" />
              <span>Cinematic Film</span>
            </button>

            <AudioWaveformVisualizer
              isPlaying={qualitySettings.soundEnabled}
              onToggle={onToggleSound}
            />
          </div>
        </div>

        {/* Floating Glassmorphic Editorial Card */}
        <div
          className={`absolute z-20 pointer-events-none transition-all duration-700 ease-out ${
            activeZone.cardAlignment === 'left'
              ? 'left-3 sm:left-8 md:left-16 bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] sm:bottom-12 md:bottom-16 max-w-[calc(100vw-1.5rem)] sm:max-w-none'
              : 'left-3 sm:left-auto right-3 sm:right-8 md:right-56 lg:right-64 bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] sm:bottom-12 md:bottom-16 max-w-[calc(100vw-1.5rem)] sm:max-w-none'
          }`}
        >
          <ScrollyEditorialCard
            zone={activeZone}
            isActive={true}
            onCtaClick={(sectionId) => {
              if (sectionId === 'portal') {
                onOpenVideoModal();
              } else if (sectionId === 'enter-sanctuary') {
                handleSelectZone(1);
              } else {
                onNavigateSection(sectionId);
              }
            }}
            onOpenPortal={onOpenVideoModal}
          />
        </div>

        {/* Interactive Vertical Side Rail (Desktop & Tablet) */}
        {isInViewport && (
          <ScrollySideRail
            activeIndex={activeIndex}
            onSelectZone={handleSelectZone}
            isOrbitMode={isOrbitMode}
            onToggleOrbitMode={() => setIsOrbitMode((prev) => !prev)}
            onSkipTour={handleSkipTour}
          />
        )}

        {/* Floating Veranda Portal Action Button (at Zone 06 Veranda) */}
        {activeZone.id === 'veranda' && (
          <div className="absolute bottom-[calc(5.75rem+env(safe-area-inset-bottom,0px))] sm:bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-auto flex flex-col items-center gap-1.5 animate-bounce">
            <button
              onClick={onOpenVideoModal}
              className="group flex items-center gap-2.5 rounded-full border border-[#dfb86c] bg-[#070e0c]/90 px-5 py-2.5 text-xs font-mono tracking-wider text-[#fdfbf7] hover:bg-[#dfb86c] hover:text-[#070e0c] shadow-[0_0_30px_rgba(223,184,108,0.45)] backdrop-blur-xl transition-all cursor-pointer transform-gpu hover:scale-105"
            >
              <DoorOpen className="w-4 h-4 text-[#dfb86c] group-hover:text-[#070e0c] group-hover:rotate-12 transition-transform" />
              <span className="font-semibold uppercase tracking-wider">
                Open Doors • Step Into Real Cafe
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#38bdf8] group-hover:text-[#070e0c] animate-pulse" />
            </button>
            <span className="text-[10px] font-mono tracking-widest text-[#dfb86c]/80 uppercase bg-[#070e0c]/80 px-2 py-0.5 rounded backdrop-blur">
              Gemini AI Real-World Video Experience
            </span>
          </div>
        )}

        {/* Initial Scroll Prompt at Hero Entry */}
        {isAtTop && (
          <div className="absolute bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none animate-bounce">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#dfb86c] uppercase">
              Scroll to explore sanctuary
            </span>
            <ChevronDown className="w-4 h-4 text-[#dfb86c]" />
          </div>
        )}
      </div>
    </div>
  );
};
