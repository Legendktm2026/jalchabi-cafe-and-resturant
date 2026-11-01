import React from 'react';
import { motion } from 'motion/react';
import { RotateCw, ChevronDown } from 'lucide-react';
import { SCROLLY_ZONES } from '../../config/scrollytellingData';

interface ScrollySideRailProps {
  activeIndex: number;
  onSelectZone: (index: number) => void;
  isOrbitMode: boolean;
  onToggleOrbitMode: () => void;
  onSkipTour: () => void;
}

export const ScrollySideRail: React.FC<ScrollySideRailProps> = ({
  activeIndex,
  onSelectZone,
  isOrbitMode,
  onToggleOrbitMode,
  onSkipTour,
}) => {
  return (
    <div className="hidden md:flex fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 flex-col items-end gap-5 pointer-events-auto select-none">
      {/* 360° Free Look Toggle Pill */}
      <button
        onClick={onToggleOrbitMode}
        title={isOrbitMode ? 'Lock Camera to Scroll Tour' : 'Enable 360° Free Look & Orbit'}
        className={`group flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] md:text-xs font-mono tracking-wider transition-all cursor-pointer shadow-lg ${
          isOrbitMode
            ? 'bg-[#dfb86c] border-[#dfb86c] text-[#070e0c] font-semibold shadow-[#dfb86c]/30'
            : 'bg-[#070e0c]/95 border-[#dfb86c]/30 text-[#8fa69d] hover:border-[#dfb86c]/70 hover:text-[#fdfbf7]'
        }`}
      >
        <RotateCw className={`w-3.5 h-3.5 ${isOrbitMode ? 'animate-spin' : 'group-hover:rotate-45 transition-transform'}`} />
        <span className="hidden sm:inline">
          {isOrbitMode ? 'EXIT 360° ORBIT' : '360° FREE LOOK'}
        </span>
      </button>

      {/* Vertical Zone Track */}
      <div className="relative flex flex-col items-end gap-3.5 rounded-2xl border border-[#dfb86c]/20 bg-[#070e0c]/95 p-3 shadow-2xl">
        {/* Subtle vertical connecting line */}
        <div className="absolute right-[21px] top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-[#dfb86c]/30 to-transparent" />

        {SCROLLY_ZONES.map((zone, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={zone.id}
              onClick={() => onSelectZone(idx)}
              className="group relative flex items-center gap-3 cursor-pointer py-1"
            >
              {/* Expandable Label on Hover or Active */}
              <span
                className={`text-[10px] md:text-[11px] font-mono tracking-widest uppercase transition-all whitespace-nowrap ${
                  isActive
                    ? 'text-[#dfb86c] font-semibold opacity-100 translate-x-0'
                    : 'text-[#8fa69d] opacity-60 group-hover:opacity-100 group-hover:text-[#fdfbf7] translate-x-1 group-hover:translate-x-0'
                }`}
              >
                {zone.name}
              </span>

              {/* Indicator Dot */}
              <div className="relative flex items-center justify-center w-4 h-4">
                {isActive && (
                  <motion.div
                    layoutId="activeZoneIndicator"
                    className="absolute inset-0 rounded-full border-2 border-[#dfb86c] bg-[#dfb86c]/20"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                <div
                  className={`rounded-full transition-all ${
                    isActive
                      ? 'w-2 h-2 bg-[#dfb86c] shadow-[0_0_10px_#dfb86c]'
                      : 'w-1.5 h-1.5 bg-[#14241f] group-hover:bg-[#dfb86c]/70 group-hover:scale-125'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Skip Tour Button */}
      <button
        onClick={onSkipTour}
        className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#070e0c]/80 px-3 py-1 text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-[#8fa69d] hover:text-[#fdfbf7] hover:border-[#dfb86c]/40 backdrop-blur-md transition-all cursor-pointer"
      >
        <span>Skip Tour</span>
        <ChevronDown className="w-3 h-3 text-[#dfb86c]" />
      </button>
    </div>
  );
};
