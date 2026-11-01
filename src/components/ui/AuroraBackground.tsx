import React from 'react';

interface AuroraBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  showRadialGradient?: boolean;
}

export const AuroraBackground: React.FC<AuroraBackgroundProps> = ({
  children,
  className = '',
  showRadialGradient = true,
}) => {
  return (
    <div
      className={`relative flex flex-col items-center justify-center bg-[#070e0c] text-[#fdfbf7] transition-bg overflow-hidden ${className}`}
    >
      {/* Aurora Ambient Gradient Layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div
          className={`
            [--aurora:repeating-linear-gradient(100deg,#dfb86c_10%,#14241f_20%,#0e1b17_30%,#070e0c_40%,#dfb86c_50%)]
            [background-image:var(--aurora)]
            [background-size:300%_200%]
            [background-position:50%_50%]
            filter blur-[60px]
            after:content-[""]
            after:absolute
            after:inset-0
            after:[background-image:var(--aurora)]
            after:[background-size:200%_100%]
            after:animate-aurora
            after:[background-attachment:fixed]
            after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50 will-change-transform
          `}
        />
      </div>

      {/* Radial Vignette Overlay to maintain deep dark borders */}
      {showRadialGradient && (
        <div className="absolute inset-0 bg-[#070e0c] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />
      )}

      {/* Analog Film Grain Layer */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};
