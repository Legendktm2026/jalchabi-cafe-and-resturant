import React from 'react';
import { QualitySettings } from '../../types';
import { X, SlidersHorizontal } from 'lucide-react';

interface AccessibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  qualitySettings: QualitySettings;
  setQualitySettings: React.Dispatch<React.SetStateAction<QualitySettings>>;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({
  isOpen,
  onClose,
  qualitySettings,
  setQualitySettings,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-settings-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl glass-panel-elevated border border-[#dfb86c]/40 shadow-2xl p-6 sm:p-8 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close settings"
          className="absolute top-5 right-5 p-2 rounded-full bg-[#0e1b17] text-[#8fa69d] hover:text-[#fdfbf7] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-full bg-[#dfb86c]/20 text-[#dfb86c]">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h3 id="accessibility-settings-title" className="text-xl font-serif text-[#fdfbf7]">
              Visual &amp; Experience Controls
            </h3>
            <span className="text-xs text-[#8fa69d]">Tailor performance and accessibility</span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Reduced Motion Toggle */}
          <div className="flex items-center justify-between pb-4 border-b border-[#dfb86c]/15">
            <div className="pr-4">
              <span className="font-medium text-sm text-[#fdfbf7] block mb-0.5">
                Reduced Motion
              </span>
              <span className="text-xs text-[#8fa69d] block">
                Disables dynamic camera transitions and sweeping sweeps.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={qualitySettings.reducedMotion}
              onClick={() =>
                setQualitySettings((prev) => ({
                  ...prev,
                  reducedMotion: !prev.reducedMotion,
                }))
              }
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                qualitySettings.reducedMotion ? 'bg-[#dfb86c]' : 'bg-[#14241f]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#fdfbf7] shadow ring-0 transition duration-200 ease-in-out ${
                  qualitySettings.reducedMotion ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 3D Shadows Toggle */}
          <div className="flex items-center justify-between pb-4 border-b border-[#dfb86c]/15">
            <div className="pr-4">
              <span className="font-medium text-sm text-[#fdfbf7] block mb-0.5">
                3D Dynamic Shadows
              </span>
              <span className="text-xs text-[#8fa69d] block">
                Render realistic soft shadows from sunlight and chandeliers.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={qualitySettings.shadows}
              onClick={() =>
                setQualitySettings((prev) => ({
                  ...prev,
                  shadows: !prev.shadows,
                }))
              }
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                qualitySettings.shadows ? 'bg-[#dfb86c]' : 'bg-[#14241f]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#fdfbf7] shadow ring-0 transition duration-200 ease-in-out ${
                  qualitySettings.shadows ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Adaptive Graphics Profile Tiers */}
          <div className="pb-4 border-b border-[#dfb86c]/15">
            <div className="mb-2.5">
              <span className="font-medium text-sm text-[#fdfbf7] block mb-0.5">
                Graphics &amp; Performance Profile
              </span>
              <span className="text-xs text-[#8fa69d] block">
                Adaptive profiles tailored for iPhone 17 Pro Max (120Hz) and practical Android devices.
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { 
                  tier: 'low' as const,
                  label: 'Low / Saver', 
                  dpr: 1.0, 
                  shadows: false,
                  desc: 'Low power & older phones'
                },
                { 
                  tier: 'balanced' as const,
                  label: 'Balanced', 
                  dpr: 1.25, 
                  shadows: true,
                  desc: 'Smooth 60Hz balance'
                },
                { 
                  tier: 'high' as const,
                  label: 'High / Pro', 
                  dpr: 1.5, 
                  shadows: true,
                  desc: 'Maximum cinematic fidelity'
                },
              ].map((opt) => {
                const isActive = qualitySettings.tier === opt.tier || (qualitySettings.pixelRatio === opt.dpr && qualitySettings.shadows === opt.shadows);
                return (
                  <button
                    key={opt.tier}
                    type="button"
                    onClick={() =>
                      setQualitySettings((prev) => ({
                        ...prev,
                        tier: opt.tier,
                        pixelRatio: opt.dpr,
                        shadows: opt.shadows,
                        particleDensity: opt.tier === 'high' ? 14 : opt.tier === 'balanced' ? 8 : 4,
                      }))
                    }
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
                      isActive
                        ? 'bg-[#dfb86c] text-[#070e0c] shadow-md ring-2 ring-[#e5c378]/40 font-bold'
                        : 'bg-[#0e1b17] text-[#8fa69d] border border-[#dfb86c]/20 hover:border-[#dfb86c]/50'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span className={`text-[9px] mt-0.5 lowercase font-mono ${isActive ? 'text-[#070e0c]/80' : 'text-[#8fa69d]/60'}`}>
                      {opt.dpr}x dpr
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sound Toggle */}
          <div className="flex items-center justify-between pb-2">
            <div className="pr-4">
              <span className="font-medium text-sm text-[#fdfbf7] block mb-0.5">
                Ambient Sound Simulation
              </span>
              <span className="text-xs text-[#8fa69d] block">
                Atmospheric coffee house acoustic background cues.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={qualitySettings.soundEnabled}
              onClick={() =>
                setQualitySettings((prev) => ({
                  ...prev,
                  soundEnabled: !prev.soundEnabled,
                }))
              }
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                qualitySettings.soundEnabled ? 'bg-[#dfb86c]' : 'bg-[#14241f]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#fdfbf7] shadow ring-0 transition duration-200 ease-in-out ${
                  qualitySettings.soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Done Button */}
        <div className="mt-8 pt-4 border-t border-[#dfb86c]/20">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#dfb86c] hover:bg-[#e5c378] text-[#070e0c] font-semibold text-xs tracking-wider uppercase transition-colors"
          >
            Apply &amp; Return to Experience
          </button>
        </div>
      </div>
    </div>
  );
};
