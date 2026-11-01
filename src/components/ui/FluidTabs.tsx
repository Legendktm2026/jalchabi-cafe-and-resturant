import React from 'react';
import { motion } from 'motion/react';

export interface TabItem<T extends string = string> {
  key: T;
  label: string;
  count?: number;
}

interface FluidTabsProps<T extends string = string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (key: T) => void;
  className?: string;
}

export const FluidTabs = <T extends string>({
  tabs,
  activeTab,
  onChange,
  className = '',
}: FluidTabsProps<T>): React.ReactElement => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 p-1.5 rounded-full bg-[#0e1b17]/90 backdrop-blur-md border border-[#dfb86c]/25 shadow-lg overflow-x-auto max-w-full scrollbar-none touch-pan-x ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`relative min-h-[44px] flex items-center justify-center px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase whitespace-nowrap transition-colors duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#dfb86c] ${
              isActive ? 'text-[#070e0c]' : 'text-[#8fa69d] hover:text-[#fdfbf7]'
            }`}
          >
            {/* Animated pill background gliding between tabs */}
            {isActive && (
              <motion.div
                layoutId="fluidTabIndicator"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] shadow-[0_0_20px_rgba(223,184,108,0.45)]"
                transition={{
                  type: 'spring',
                  stiffness: 450,
                  damping: 32,
                }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5 font-semibold">
              {tab.label}
              {typeof tab.count === 'number' && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-[#070e0c]/20 text-[#070e0c]' : 'bg-[#14241f] text-[#8fa69d]'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};
