import React, { useEffect, useRef } from 'react';

interface TracingBeamProps {
  children: React.ReactNode;
  className?: string;
}

export const TracingBeam: React.FC<TracingBeamProps> = ({ children, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animId = 0;
    const updatePosition = () => {
      if (!containerRef.current || !beamRef.current || !dotRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = containerRef.current.offsetHeight;

      // Progress through container: 0 when top enters middle, 1 when bottom leaves middle
      const progress = Math.max(0, Math.min(1, (windowHeight * 0.5 - rect.top) / totalHeight));
      const beamHeight = progress * totalHeight;

      beamRef.current.style.height = `${beamHeight}px`;
      dotRef.current.style.transform = `translate3d(0, ${beamHeight}px, 0)`;
      animId = 0;
    };

    const onScroll = () => {
      if (!animId) {
        animId = requestAnimationFrame(updatePosition);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updatePosition();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full max-w-7xl mx-auto ${className}`}>
      {/* Tracing Vertical Line & Indicator (Visible on md and larger screens) */}
      <div className="absolute -left-4 md:-left-8 top-3 bottom-0 w-8 hidden md:block pointer-events-none select-none">
        {/* Base Track Line */}
        <div className="absolute left-[31px] top-0 bottom-0 w-[1.5px] bg-[#dfb86c]/20" />

        {/* Active Golden Gradient Beam */}
        <div
          ref={beamRef}
          className="absolute left-[31px] top-0 w-[2px] bg-gradient-to-b from-[#dfb86c]/0 via-[#dfb86c] to-[#e5c378] will-change-[height]"
          style={{ height: '0px' }}
        />

        {/* Glowing Head Marker */}
        <div
          ref={dotRef}
          className="absolute left-[24px] top-0 h-4 w-4 rounded-full border border-[#dfb86c] bg-[#0e1b17] flex items-center justify-center will-change-transform shadow-[0_0_16px_2px_rgba(223,184,108,0.5)]"
          style={{ transform: 'translate3d(0, 0px, 0)' }}
        >
          <div className="h-2 w-2 rounded-full border border-[#e5c378] bg-[#dfb86c]" />
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
};
