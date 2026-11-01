import React from 'react';
import { CameraViewPreset, SceneMode, QualitySettings } from '../../types';
import {
  Compass,
  RotateCcw,
  Volume2,
  VolumeX,
  SlidersHorizontal,
  ChevronRight,
  Maximize2,
  Coffee,
  Armchair,
  UtensilsCrossed,
  Sparkles,
  DoorOpen,
  Film,
} from 'lucide-react';
import { SparklesCore } from './SparklesCore';

interface CinematicHeroOverlayProps {
  sceneMode: SceneMode;
  currentPreset: CameraViewPreset;
  onEnterExperience: () => void;
  onSkipIntro: () => void;
  onSelectPreset: (preset: CameraViewPreset) => void;
  onToggleMode: (mode: SceneMode) => void;
  onResetView: () => void;
  qualitySettings: QualitySettings;
  onToggleSound: () => void;
  onOpenAccessibility: () => void;
  onOpenVideoModal?: () => void;
}

const PRESET_BUTTONS: { preset: CameraViewPreset; label: string; icon: React.ReactNode }[] = [
  { preset: 'interior_overview', label: 'Overview', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { preset: 'counter', label: 'Brew Bar', icon: <Coffee className="w-3.5 h-3.5" /> },
  { preset: 'seating', label: 'Banquettes', icon: <Armchair className="w-3.5 h-3.5" /> },
  { preset: 'menu', label: 'Kitchen Board', icon: <UtensilsCrossed className="w-3.5 h-3.5" /> },
  { preset: 'story', label: 'Heritage Wall', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { preset: 'window', label: 'Veranda', icon: <DoorOpen className="w-3.5 h-3.5" /> },
];

export const CinematicHeroOverlay: React.FC<CinematicHeroOverlayProps> = ({
  sceneMode,
  currentPreset,
  onEnterExperience,
  onSkipIntro,
  onSelectPreset,
  onToggleMode,
  onResetView,
  qualitySettings,
  onToggleSound,
  onOpenAccessibility,
  onOpenVideoModal,
}) => {
  const isIntro = sceneMode === 'intro' && currentPreset === 'exterior';

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 md:p-8 overflow-hidden">
      {/* Aceternity Sparkles Core across Hero Canvas */}
      <SparklesCore
        minSize={0.8}
        maxSize={2.4}
        particleDensity={35}
        particleColor="#dfb86c"
        className="opacity-70"
      />

      {/* =========================================================================
          TOP BAR OVERLAY (Brand Subtitle & Quick Controls)
          ========================================================================= */}
      <div className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-[#dfb86c]/15 shadow-sm">
        {/* Brand Micro-Tag */}
        <div className="pointer-events-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#dfb86c] animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#e5c378] font-medium font-sans">
            Kolkata Sanctuary Preview
          </span>
        </div>

        {/* Audio, Video Tour & Accessibility Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Cinematic Film Button */}
          {onOpenVideoModal && (
            <button
              type="button"
              onClick={onOpenVideoModal}
              title="Watch Cinematic Film"
              aria-label="Watch Cinematic Film"
              className="px-3 py-1.5 rounded-full bg-[#dfb86c]/20 hover:bg-[#dfb86c]/30 border border-[#dfb86c]/40 text-[#e5c378] text-xs font-medium tracking-wider uppercase transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Film className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cinematic Film</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={onToggleSound}
            aria-label={qualitySettings.soundEnabled ? 'Mute ambient sound' : 'Enable ambient sound'}
            className="p-2.5 rounded-full glass-panel border border-[#dfb86c]/20 hover:border-[#dfb86c]/50 text-[#fdfbf7] transition-colors cursor-pointer"
          >
            {qualitySettings.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#dfb86c]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#8fa69d]" />
            )}
          </button>

          {/* Accessibility Settings */}
          <button
            type="button"
            onClick={onOpenAccessibility}
            aria-label="Experience Settings"
            className="p-2.5 rounded-full glass-panel border border-[#dfb86c]/20 hover:border-[#dfb86c]/50 text-[#fdfbf7] transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#8fa69d]" />
          </button>
        </div>
      </div>

      {/* =========================================================================
          HERO ESTABLISHING SHOT 1 CONTENT (When at Exterior Intro)
          ========================================================================= */}
      {isIntro && (
        <div className="relative my-auto max-w-2xl mx-auto text-center px-4 pointer-events-auto animate-fadeIn">
          {/* Aceternity-inspired ambient lamp glow behind title */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-48 bg-[#dfb86c]/15 rounded-full blur-[70px] pointer-events-none" />

          {/* Typographic Monogram */}
          <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full border border-[#dfb86c]/30 bg-[#0e1b17]/60 backdrop-blur-md shadow-[0_0_20px_rgba(223,184,108,0.2)]">
            <span className="font-serif text-2xl font-light text-[#dfb86c]">J</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light tracking-wide text-[#fdfbf7] mb-2 drop-shadow-md">
            JALCHABI
          </h1>

          {/* Subtitle */}
          <div className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#dfb86c] font-medium mb-4">
            CAFE &amp; RESTAURANT
          </div>

          {/* Tagline */}
          <p className="text-base sm:text-lg text-[#8fa69d] italic font-serif mb-8 max-w-md mx-auto leading-relaxed">
            “A place to linger.”
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Primary Enter CTA */}
            <button
              type="button"
              onClick={onEnterExperience}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] text-[#070e0c] font-semibold text-xs tracking-widest uppercase hover:brightness-110 shadow-[0_0_25px_rgba(223,184,108,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>ENTER JALCHABI</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Watch Film CTA */}
            {onOpenVideoModal && (
              <button
                type="button"
                onClick={onOpenVideoModal}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#14241f]/80 hover:bg-[#1a2f27] border border-[#dfb86c]/40 text-[#fdfbf7] font-medium text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Film className="w-3.5 h-3.5 text-[#dfb86c]" />
                <span>Watch Film</span>
              </button>
            )}

            {/* Skip Intro CTA */}
            <button
              type="button"
              onClick={onSkipIntro}
              className="w-full sm:w-auto px-5 py-3 rounded-full glass-panel border border-[#dfb86c]/30 text-[#e5c378] font-medium text-xs tracking-wider uppercase hover:border-[#dfb86c] transition-all cursor-pointer"
            >
              Skip Intro
            </button>
          </div>

          {/* Notice on unverified business records */}
          <div className="mt-8 text-[11px] text-[#8fa69d]/70 tracking-wider">
            Kolkata Concept Preview • Tap to explore 3D architectural interior
          </div>
        </div>
      )}

      {/* =========================================================================
          INTERACTIVE HUD (When inside the cafe)
          ========================================================================= */}
      {!isIntro && (
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto">
          {/* Left: Mode Switcher & Reset */}
          <div className="flex items-center gap-2 p-1.5 rounded-full glass-panel border border-[#dfb86c]/20">
            <button
              type="button"
              onClick={() => onToggleMode('interior')}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
                sceneMode === 'interior'
                  ? 'bg-[#dfb86c] text-[#070e0c] shadow-md'
                  : 'text-[#8fa69d] hover:text-[#fdfbf7]'
              }`}
            >
              Guided Tour
            </button>
            <button
              type="button"
              onClick={() => onToggleMode('explore')}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                sceneMode === 'explore'
                  ? 'bg-[#dfb86c] text-[#070e0c] shadow-md'
                  : 'text-[#8fa69d] hover:text-[#fdfbf7]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Free 3D Orbit
            </button>

            {/* Reset View Button */}
            <button
              type="button"
              onClick={onResetView}
              title="Reset Camera to Overview"
              aria-label="Reset Camera"
              className="p-2 rounded-full text-[#8fa69d] hover:text-[#fdfbf7] hover:bg-[#dfb86c]/10 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right: Camera Preset Navigation */}
          {sceneMode === 'interior' && (
            <div className="flex items-center gap-1.5 p-1.5 rounded-full glass-panel border border-[#dfb86c]/20 overflow-x-auto max-w-full">
              {PRESET_BUTTONS.map((btn) => {
                const isActive = currentPreset === btn.preset;
                return (
                  <button
                    key={btn.preset}
                    type="button"
                    onClick={() => onSelectPreset(btn.preset)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#dfb86c]/20 border border-[#dfb86c] text-[#e5c378]'
                        : 'text-[#8fa69d] hover:text-[#fdfbf7]'
                    }`}
                  >
                    {btn.icon}
                    <span>{btn.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Explore Mode Helper Tip */}
          {sceneMode === 'explore' && (
            <div className="px-4 py-2 rounded-full glass-panel border border-[#dfb86c]/20 text-xs text-[#8fa69d] flex items-center gap-2">
              <Maximize2 className="w-3.5 h-3.5 text-[#dfb86c]" />
              <span>Drag to orbit • Scroll to zoom • Click hotspots to inspect</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
