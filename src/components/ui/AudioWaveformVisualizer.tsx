import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioWaveformVisualizerProps {
  isPlaying: boolean;
  onToggle: () => void;
  className?: string;
}

export const AudioWaveformVisualizer: React.FC<AudioWaveformVisualizerProps> = ({
  isPlaying,
  onToggle,
  className = '',
}) => {
  return (
    <button
      onClick={onToggle}
      title={isPlaying ? 'Mute Sanctuary Atmosphere' : 'Play Sanctuary Atmosphere'}
      className={`group flex items-center gap-2 rounded-full border border-[#dfb86c]/30 bg-[#070e0c]/85 px-3 py-1.5 text-[10px] md:text-xs font-mono uppercase tracking-wider text-[#8fa69d] hover:border-[#dfb86c] hover:text-[#fdfbf7] backdrop-blur-xl transition-all shadow-lg cursor-pointer ${className}`}
    >
      {/* Dynamic Animated Waveform Bars */}
      <div className="flex items-center gap-0.5 h-3 w-4">
        <span
          className={`w-0.5 rounded-full bg-[#dfb86c] transition-all duration-300 ${
            isPlaying ? 'h-3 animate-[pulse_0.8s_ease-in-out_infinite]' : 'h-1 opacity-50'
          }`}
        />
        <span
          className={`w-0.5 rounded-full bg-[#e5c378] transition-all duration-300 ${
            isPlaying ? 'h-2 animate-[pulse_0.6s_ease-in-out_infinite_0.2s]' : 'h-1 opacity-50'
          }`}
        />
        <span
          className={`w-0.5 rounded-full bg-[#dfb86c] transition-all duration-300 ${
            isPlaying ? 'h-3.5 animate-[pulse_1s_ease-in-out_infinite_0.4s]' : 'h-1 opacity-50'
          }`}
        />
        <span
          className={`w-0.5 rounded-full bg-[#e5c378] transition-all duration-300 ${
            isPlaying ? 'h-1.5 animate-[pulse_0.7s_ease-in-out_infinite_0.1s]' : 'h-1 opacity-50'
          }`}
        />
      </div>

      <span className="hidden sm:inline">
        {isPlaying ? 'Dusk Ambience' : 'Sound Off'}
      </span>

      {isPlaying ? (
        <Volume2 className="w-3 h-3 text-[#dfb86c] group-hover:scale-110 transition-transform" />
      ) : (
        <VolumeX className="w-3 h-3 text-[#8fa69d] group-hover:scale-110 transition-transform" />
      )}
    </button>
  );
};
