import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, DoorOpen, Sparkles } from 'lucide-react';
import { ScrollyZone } from '../../config/scrollytellingData';

interface ScrollyEditorialCardProps {
  zone: ScrollyZone;
  isActive: boolean;
  onCtaClick: (targetSection: string) => void;
  onOpenPortal?: () => void;
}

export const ScrollyEditorialCard: React.FC<ScrollyEditorialCardProps> = ({
  zone,
  isActive,
  onCtaClick,
  onOpenPortal,
}) => {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={zone.id}
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.97 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto relative w-full max-w-[340px] sm:max-w-[390px] rounded-2xl border border-[#dfb86c]/35 bg-[#070e0c]/95 p-3.5 sm:p-6 md:p-8 shadow-[0_15px_35px_rgba(0,0,0,0.85)] transform-gpu overflow-hidden`}
        >
          {/* Subtle Ambient Golden Corner Gradient */}
          <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-[#dfb86c]/15 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-[#0a1e19]/40 blur-2xl pointer-events-none" />

          {/* Bengali Watermark Calligraphy */}
          <div
            aria-hidden="true"
            className="absolute top-2 right-4 text-4xl sm:text-5xl md:text-6xl font-serif text-[#dfb86c]/10 select-none pointer-events-none font-bold tracking-tight"
          >
            {zone.bengaliSubtitle}
          </div>

          {/* Zone Badge */}
          <div className="relative z-10 flex items-center justify-between mb-2 sm:mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#dfb86c]/40 bg-[#dfb86c]/10 px-2.5 py-0.5 text-[9px] sm:text-[10px] md:text-xs font-mono font-medium tracking-[0.15em] text-[#dfb86c] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dfb86c] animate-ping" />
              {zone.badge}
            </span>
            <span className="text-[10px] sm:text-[11px] font-mono text-[#dfb86c]/70 uppercase tracking-widest">
              0{zone.index + 1} / 06
            </span>
          </div>

          {/* Title & Bengali Subtitle */}
          <div className="relative z-10 mb-2 sm:mb-3">
            <h3 className="font-serif text-lg sm:text-2xl md:text-3xl font-light text-[#fdfbf7] tracking-wide leading-tight">
              {zone.title}
            </h3>
            <p className="font-serif text-[11px] sm:text-xs md:text-sm text-[#dfb86c]/90 italic mt-0.5 tracking-wider">
              {zone.bengaliSubtitle}
            </p>
          </div>

          {/* Craft Narrative Description */}
          <p className="relative z-10 text-[11px] sm:text-xs md:text-sm text-[#8fa69d] leading-relaxed font-light mb-3 sm:mb-5 line-clamp-2 sm:line-clamp-none">
            {zone.description}
          </p>

          {/* Craft Details / Highlights (Hidden on small mobile to prevent screen overflow) */}
          <div className="hidden sm:block relative z-10 space-y-1.5 mb-5 border-t border-[#dfb86c]/15 pt-3">
            {zone.craftDetails.map((detail, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-[#fdfbf7]">
                <span className="text-[#dfb86c] text-[10px]">✦</span>
                <span className="tracking-wide font-light">{detail}</span>
              </div>
            ))}
          </div>

          {/* Action CTA Button */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-2">
            {zone.id === 'veranda' ? (
              <>
                <button
                  type="button"
                  onClick={() => (onOpenPortal ? onOpenPortal() : onCtaClick('portal'))}
                  className="group flex-1 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] px-4 py-2.5 sm:px-5 sm:py-3 text-xs md:text-sm font-semibold text-[#070e0c] shadow-[0_0_25px_rgba(223,184,108,0.45)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer font-serif tracking-wide"
                >
                  <DoorOpen className="w-4 h-4 text-[#070e0c] group-hover:rotate-12 transition-transform" />
                  <span>Open Doors • Real Cafe</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#070e0c] animate-pulse" />
                </button>
                <button
                  type="button"
                  onClick={() => onCtaClick('visit')}
                  className="w-full sm:w-auto px-3 py-2 rounded-xl border border-[#dfb86c]/30 bg-[#0e1b17] text-xs font-mono text-[#8fa69d] hover:text-[#fdfbf7] hover:border-[#dfb86c] transition-all cursor-pointer text-center"
                >
                  Hours & Info
                </button>
              </>
            ) : zone.id === 'kitchen-board' ? (
              <>
                <button
                  type="button"
                  onClick={() => onCtaClick('menu')}
                  className="group flex-1 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] px-4 py-2.5 text-xs md:text-sm font-medium text-[#070e0c] shadow-lg shadow-[#dfb86c]/20 hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer font-serif tracking-wide"
                >
                  <span>Browse Full Menu</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <button
                  type="button"
                  onClick={() => (onOpenPortal ? onOpenPortal() : onCtaClick('portal'))}
                  className="hidden sm:flex px-3.5 py-2.5 rounded-xl border border-[#dfb86c]/40 bg-[#0e1b17] text-xs font-serif text-[#e5c378] hover:border-[#dfb86c] hover:text-[#fdfbf7] transition-all cursor-pointer items-center gap-1.5 whitespace-nowrap"
                  title="Gateway from Kitchen directly to Lakeside Veranda"
                >
                  <DoorOpen className="w-3.5 h-3.5 text-[#dfb86c]" />
                  <span>Veranda Portal</span>
                </button>
              </>
            ) : zone.id === 'overview' ? (
              <>
                <button
                  type="button"
                  onClick={() => onCtaClick('enter-sanctuary')}
                  className="group flex-1 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] px-4 py-2.5 sm:px-5 sm:py-2.5 text-xs md:text-sm font-semibold text-[#070e0c] shadow-lg shadow-[#dfb86c]/20 hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer font-serif tracking-wide min-h-[44px]"
                >
                  <span>{zone.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onCtaClick('menu')}
                  className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl border border-[#dfb86c]/40 bg-[#0e1b17] text-xs font-mono text-[#8fa69d] hover:text-[#fdfbf7] hover:border-[#dfb86c] transition-all cursor-pointer text-center min-h-[44px] flex items-center justify-center whitespace-nowrap"
                  title="Direct jump to food menu"
                >
                  Explore Menu
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => onCtaClick(zone.targetSection)}
                className="group flex-1 w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] px-4 py-2.5 sm:px-5 sm:py-2.5 text-xs md:text-sm font-medium text-[#070e0c] shadow-lg shadow-[#dfb86c]/20 hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer font-serif tracking-wide min-h-[44px]"
              >
                <span>{zone.ctaText}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
