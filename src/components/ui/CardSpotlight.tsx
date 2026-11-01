import React, { useRef, useCallback } from 'react';

interface CardSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  radius?: number;
  color?: string;
  className?: string;
  enableTilt?: boolean;
}

export const CardSpotlight: React.FC<CardSpotlightProps> = ({
  children,
  radius = 280,
  color = 'rgba(223, 184, 108, 0.22)',
  className = '',
  enableTilt = true,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      if (!cardRef.current || !glowRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      glowRef.current.style.opacity = '1';
      glowRef.current.style.background = `radial-gradient(${radius}px circle at ${x}px ${y}px, ${color}, transparent 80%)`;

      if (enableTilt) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3.5;
        const rotateY = ((x - centerX) / centerX) * 3.5;
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    });
  }, [radius, color, enableTilt]);

  const handleMouseEnter = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '1';
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (glowRef.current) glowRef.current.style.opacity = '0';
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      cardRef.current.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    }
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border border-[#dfb86c]/20 bg-[#0e1b17] transition-colors hover:border-[#dfb86c]/50 ${className}`}
      {...props}
    >
      {/* Zero-render Aceternity Mouse Spotlight Radial Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
      />
      
      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};
