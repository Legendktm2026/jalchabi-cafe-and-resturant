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
} from 'lucide-react';

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
}) => {
  const isIntro = sceneMode === 'intro' && currentPreset === 'exterior';

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 md:p-8">
      {/* =========================================================================
          TOP BAR OVERLAY (Brand Subtitle & Quick Controls)
          ========================================================================= */}
      <div className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-[#c58b4b]/15 shadow-sm">
        {/* Brand Micro-Tag */}
        <div className="pointer-events-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#c58b4b] animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#e6be8a] font-medium font-sans">
            Kolkata Sanctuary Preview
          </span>
        </div>

        {/* Audio & Accessibility Controls */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            type="button"
            onClick={onToggleSound}
            aria-label={qualitySettings.soundEnabled ? 'Mute ambient sound' : 'Enable ambient sound'}
            className="p-2.5 rounded-full glass-panel border border-[#c58b4b]/20 hover:border-[#c58b4b]/50 text-[#f5efe6] transition-colors"
          >
            {qualitySettings.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#c58b4b]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#c9bea9]" />
            )}
          </button>

          {/* Accessibility Settings */}
          <button
            type="button"
            onClick={onOpenAccessibility}
            aria-label="Experience Settings"
            className="p-2.5 rounded-full glass-panel border border-[#c58b4b]/20 hover:border-[#c58b4b]/50 text-[#f5efe6] transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#c9bea9]" />
          </button>
        </div>
      </div>

      {/* =========================================================================
          HERO ESTABLISHING SHOT 1 CONTENT (When at Exterior Intro)
          ========================================================================= */}
      {isIntro && (
        <div className="my-auto max-w-2xl mx-auto text-center px-4 pointer-events-auto animate-fadeIn">
          {/* Typographic Monogram */}
          <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-full border border-[#c58b4b]/30 bg-[#18120d]/60 backdrop-blur-md">
            <span className="font-serif text-2xl font-light text-[#c58b4b]">J</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-light tracking-wide text-[#f5efe6] mb-2 drop-shadow-md">
            JALCHOBI
          </h1>

          {/* Subtitle */}
          <div className="text-xs sm:text-sm uppercase tracking-[0.35em] text-[#c58b4b] font-medium mb-4">
            CAFE &amp; RESTAURANT
          </div>

          {/* Tagline */}
          <p className="text-base sm:text-lg text-[#c9bea9] italic font-serif mb-8 max-w-md mx-auto leading-relaxed">
            “A place to linger.”
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary Enter CTA */}
            <button
              type="button"
              onClick={onEnterExperience}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#c58b4b] to-[#dfb15b] text-[#120d09] font-medium text-sm tracking-widest uppercase hover:brightness-110 shadow-[0_0_30px_rgba(197,139,75,0.4)] transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>ENTER JALCHOBI</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Skip Intro CTA */}
            <button
              type="button"
              onClick={onSkipIntro}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full glass-panel border border-[#c58b4b]/30 text-[#e6be8a] font-medium text-xs tracking-wider uppercase hover:border-[#c58b4b] transition-all cursor-pointer"
            >
              Skip Intro
            </button>
          </div>

          {/* Notice on unverified business records */}
          <div className="mt-8 text-[11px] text-[#c9bea9]/70 tracking-wider">
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
          <div className="flex items-center gap-2 p-1.5 rounded-full glass-panel border border-[#c58b4b]/20">
            <button
              type="button"
              onClick={() => onToggleMode('interior')}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
                sceneMode === 'interior'
                  ? 'bg-[#c58b4b] text-[#120d09] shadow-md'
                  : 'text-[#c9bea9] hover:text-[#f5efe6]'
              }`}
            >
              Guided Tour
            </button>
            <button
              type="button"
              onClick={() => onToggleMode('explore')}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                sceneMode === 'explore'
                  ? 'bg-[#c58b4b] text-[#120d09] shadow-md'
                  : 'text-[#c9bea9] hover:text-[#f5efe6]'
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
              className="p-2 rounded-full text-[#c9bea9] hover:text-[#f5efe6] hover:bg-[#c58b4b]/10 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right: Camera Preset Navigation */}
          {sceneMode === 'interior' && (
            <div className="flex items-center gap-1.5 p-1.5 rounded-full glass-panel border border-[#c58b4b]/20 overflow-x-auto max-w-full">
              {PRESET_BUTTONS.map((btn) => {
                const isActive = currentPreset === btn.preset;
                return (
                  <button
                    key={btn.preset}
                    type="button"
                    onClick={() => onSelectPreset(btn.preset)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#c58b4b]/20 border border-[#c58b4b] text-[#e6be8a]'
                        : 'text-[#c9bea9] hover:text-[#f5efe6]'
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
            <div className="px-4 py-2 rounded-full glass-panel border border-[#c58b4b]/20 text-xs text-[#c9bea9] flex items-center gap-2">
              <Maximize2 className="w-3.5 h-3.5 text-[#c58b4b]" />
              <span>Drag to orbit • Scroll to zoom • Click hotspots to inspect</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
