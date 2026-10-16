import React from 'react';

interface ScrollProgressBarProps {
  progress: number; // 0 to 1
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ progress }) => {
  // Hide bar when at the absolute top
  const opacity = Math.min(progress * 8, 1);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none transition-opacity duration-300"
      style={{ opacity }}
    >
      <div
        className="h-full bg-gradient-to-r from-[#8b6534] via-[#c58b4b] to-[#e6be8a] shadow-[0_0_8px_rgba(197,139,75,0.6)] origin-left will-change-transform"
        style={{
          transform: `scaleX(${progress})`,
          transition: 'transform 0.08s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </div>
  );
};
