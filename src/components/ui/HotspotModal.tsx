import React, { useEffect } from 'react';
import { HotspotInfo } from '../../types';
import { X, ArrowRight, Sparkles } from 'lucide-react';

interface HotspotModalProps {
  hotspot: HotspotInfo | null;
  onClose: () => void;
  onActionClick: (targetSectionId: string) => void;
}

export const HotspotModal: React.FC<HotspotModalProps> = ({
  hotspot,
  onClose,
  onActionClick,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!hotspot) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="hotspot-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-2xl glass-panel-elevated border border-[#c58b4b]/40 shadow-2xl animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#120d09]/70 text-[#c9bea9] hover:text-[#f5efe6] hover:bg-[#120d09] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Featured Image */}
        <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-[#18120c]">
          <img
            src={hotspot.featuredImage}
            alt={hotspot.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1510] via-transparent to-transparent" />

          {/* Category Badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#c58b4b] text-[#120d09] flex items-center gap-1.5 shadow-md">
              <Sparkles className="w-3 h-3" />
              {hotspot.category}
            </span>
            <span className="text-xs text-[#e6be8a] tracking-widest font-mono">
              {hotspot.badgeText}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <h3 id="hotspot-title" className="text-2xl font-serif font-medium text-[#f5efe6] mb-1">
            {hotspot.title}
          </h3>
          <p className="text-xs uppercase tracking-wider text-[#c58b4b] font-medium mb-3">
            {hotspot.subtitle}
          </p>

          <p className="text-sm text-[#c9bea9] leading-relaxed mb-6 font-sans">
            {hotspot.description}
          </p>

          {/* Action CTA Button */}
          <div className="flex items-center justify-between pt-4 border-t border-[#c58b4b]/20">
            <button
              type="button"
              onClick={onClose}
              className="text-xs uppercase tracking-wider text-[#c9bea9] hover:text-[#f5efe6] font-medium"
            >
              Continue Exploring
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onActionClick(hotspot.targetSectionId);
              }}
              className="px-5 py-2.5 rounded-full bg-[#c58b4b] hover:bg-[#e6be8a] text-[#120d09] font-medium text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-2"
            >
              <span>{hotspot.actionText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
