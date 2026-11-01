import React, { useEffect, useState, useRef } from 'react';

export const AmbientCursorGlow: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const posRef = useRef({ x: -1000, y: -1000, currentX: -1000, currentY: -1000, moving: false });
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    setEnabled(true);

    let idleTimeout: ReturnType<typeof setTimeout>;
    let animId: number = 0;

    const updateGlow = () => {
      const pos = posRef.current;
      const dx = pos.x - pos.currentX;
      const dy = pos.y - pos.currentY;

      // Smooth lerp
      pos.currentX += dx * 0.15;
      pos.currentY += dy * 0.15;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${pos.currentX - 300}px, ${pos.currentY - 300}px, 0)`;
      }

      // If still closing in on target, keep animating; otherwise sleep
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        animId = requestAnimationFrame(updateGlow);
      } else {
        animId = 0;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;

      if (!animId) {
        animId = requestAnimationFrame(updateGlow);
      }

      clearTimeout(idleTimeout);
      if (glowRef.current) glowRef.current.style.opacity = '0.35';

      idleTimeout = setTimeout(() => {
        if (glowRef.current) glowRef.current.style.opacity = '0.15';
      }, 1500);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      clearTimeout(idleTimeout);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-30 w-[600px] h-[600px] rounded-full will-change-transform opacity-25 transition-opacity duration-700"
      style={{
        background: 'radial-gradient(circle, rgba(223, 184, 108, 0.12) 0%, rgba(229, 195, 120, 0.04) 40%, transparent 70%)',
      }}
    />
  );
};
