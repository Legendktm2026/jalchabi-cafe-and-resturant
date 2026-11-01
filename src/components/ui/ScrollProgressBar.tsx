import React, { useEffect, useRef } from 'react';

interface ScrollProgressBarProps {
  progress?: number; // Optional fallback
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ progress: propProgress }) => {
  const barRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (propProgress !== undefined) {
      if (barRef.current) barRef.current.style.transform = `scaleX(${propProgress})`;
      if (containerRef.current) containerRef.current.style.opacity = `${Math.min(propProgress * 8, 1)}`;
      return;
    }

    let ticking = false;
    const updateProgress = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / totalScroll)) : 0;
      
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      if (containerRef.current) {
        containerRef.current.style.opacity = `${Math.min(progress * 8, 1)}`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [propProgress]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none transition-opacity duration-200"
      style={{ opacity: 0 }}
    >
      <div
        ref={barRef}
        className="h-full bg-gradient-to-r from-[#7b1925] via-[#dfb86c] to-[#f7e5b5] shadow-[0_0_8px_rgba(223,184,108,0.6)] origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
};
