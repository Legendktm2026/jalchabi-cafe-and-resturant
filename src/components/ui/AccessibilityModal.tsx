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
        className="relative w-full max-w-md overflow-hidden rounded-2xl glass-panel-elevated border border-[#c58b4b]/40 shadow-2xl p-6 sm:p-8 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close settings"
          className="absolute top-5 right-5 p-2 rounded-full bg-[#18120d] text-[#c9bea9] hover:text-[#f5efe6] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-full bg-[#c58b4b]/20 text-[#c58b4b]">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h3 id="accessibility-settings-title" className="text-xl font-serif text-[#f5efe6]">
              Visual &amp; Experience Controls
            </h3>
            <span className="text-xs text-[#c9bea9]">Tailor performance and accessibility</span>
          </div>
        </div>

        <div className="space-y-6">
          {/* Reduced Motion Toggle */}
          <div className="flex items-center justify-between pb-4 border-b border-[#c58b4b]/15">
            <div className="pr-4">
              <span className="font-medium text-sm text-[#f5efe6] block mb-0.5">
                Reduced Motion
              </span>
              <span className="text-xs text-[#c9bea9] block">
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
                qualitySettings.reducedMotion ? 'bg-[#c58b4b]' : 'bg-[#2b1f16]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#f5efe6] shadow ring-0 transition duration-200 ease-in-out ${
                  qualitySettings.reducedMotion ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 3D Shadows Toggle */}
          <div className="flex items-center justify-between pb-4 border-b border-[#c58b4b]/15">
            <div className="pr-4">
              <span className="font-medium text-sm text-[#f5efe6] block mb-0.5">
                3D Dynamic Shadows
              </span>
              <span className="text-xs text-[#c9bea9] block">
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
                qualitySettings.shadows ? 'bg-[#c58b4b]' : 'bg-[#2b1f16]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#f5efe6] shadow ring-0 transition duration-200 ease-in-out ${
                  qualitySettings.shadows ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Graphics Fidelity / DPR Selector */}
          <div className="pb-4 border-b border-[#c58b4b]/15">
            <div className="mb-2.5">
              <span className="font-medium text-sm text-[#f5efe6] block mb-0.5">
                Graphics Resolution
              </span>
              <span className="text-xs text-[#c9bea9] block">
                Adjust pixel density for GPU performance or maximum sharpness.
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Battery', dpr: 1.0 },
                { label: 'Balanced', dpr: 1.5 },
                { label: 'Ultra HD', dpr: 2.0 },
              ].map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() =>
                    setQualitySettings((prev) => ({
                      ...prev,
                      pixelRatio: opt.dpr,
                    }))
                  }
                  className={`py-2 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    qualitySettings.pixelRatio === opt.dpr
                      ? 'bg-[#c58b4b] text-[#120d09] shadow-sm'
                      : 'bg-[#18120d] text-[#c9bea9] border border-[#c58b4b]/20 hover:border-[#c58b4b]/40'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sound Toggle */}
          <div className="flex items-center justify-between pb-2">
            <div className="pr-4">
              <span className="font-medium text-sm text-[#f5efe6] block mb-0.5">
                Ambient Sound Simulation
              </span>
              <span className="text-xs text-[#c9bea9] block">
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
                qualitySettings.soundEnabled ? 'bg-[#c58b4b]' : 'bg-[#2b1f16]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#f5efe6] shadow ring-0 transition duration-200 ease-in-out ${
                  qualitySettings.soundEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Done Button */}
        <div className="mt-8 pt-4 border-t border-[#c58b4b]/20">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-[#c58b4b] hover:bg-[#e6be8a] text-[#120d09] font-semibold text-xs tracking-wider uppercase transition-colors"
          >
            Apply &amp; Return to Experience
          </button>
        </div>
      </div>
    </div>
  );
};
