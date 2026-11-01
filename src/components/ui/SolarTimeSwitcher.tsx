import React from 'react';
import { Sun, Sunset, Flame, Sparkles } from 'lucide-react';
import { SolarTimePreset } from '../../config/solarLighting';
import { soundFoley } from '../../utils/soundFoley';

interface SolarTimeSwitcherProps {
  currentPreset: SolarTimePreset;
  isAutoMode: boolean;
  onSelectPreset: (preset: SolarTimePreset) => void;
  onToggleAuto: () => void;
  className?: string;
}

export const SolarTimeSwitcher: React.FC<SolarTimeSwitcherProps> = ({
  currentPreset,
  isAutoMode,
  onSelectPreset,
  onToggleAuto,
  className = '',
}) => {
  const options: { id: SolarTimePreset; label: string; time: string; icon: React.ReactNode }[] = [
    {
      id: 'morning',
      label: 'Morning Sun',
      time: '8 AM',
      icon: <Sun className="w-3.5 h-3.5" />,
    },
    {
      id: 'golden_hour',
      label: 'Golden Hour',
      time: '5:30 PM',
      icon: <Sunset className="w-3.5 h-3.5" />,
    },
    {
      id: 'candlelight',
      label: 'Candlelight',
      time: '9 PM',
      icon: <Flame className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div
      className={`flex items-center gap-1 rounded-full border border-[#dfb86c]/30 bg-[#070e0c]/85 p-1 backdrop-blur-xl shadow-xl select-none ${className}`}
    >
      {options.map((opt) => {
        const isActive = !isAutoMode && currentPreset === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => {
              soundFoley.playSwitchClick();
              onSelectPreset(opt.id);
            }}
            title={`${opt.label} (${opt.time})`}
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] md:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              isActive
                ? 'bg-[#dfb86c] text-[#070e0c] font-semibold shadow-md'
                : 'text-[#8fa69d] hover:text-[#fdfbf7] hover:bg-[#dfb86c]/15'
            }`}
          >
            {opt.icon}
            <span className="hidden sm:inline">{opt.time}</span>
          </button>
        );
      })}

      {/* Auto IST Mode Toggle */}
      <button
        type="button"
        onClick={() => {
          soundFoley.playSwitchClick();
          onToggleAuto();
        }}
        title="Synchronize lighting with live Kolkata Solar Time (IST)"
        className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] md:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer border-l border-[#dfb86c]/20 ml-0.5 ${
          isAutoMode
            ? 'bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] text-[#070e0c] font-bold shadow-md'
            : 'text-[#8fa69d] hover:text-[#fdfbf7] hover:bg-[#dfb86c]/15'
        }`}
      >
        <Sparkles className="w-3 h-3" />
        <span>Auto</span>
      </button>
    </div>
  );
};
