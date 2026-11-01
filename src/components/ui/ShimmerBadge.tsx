import React from 'react';

interface ShimmerBadgeProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const ShimmerBadge: React.FC<ShimmerBadgeProps> = ({
  children,
  className = '',
  icon,
}) => {
  return (
    <span
      className={`relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#dfb86c]/30 bg-[#070e0c]/85 px-3.5 py-1 text-[10px] md:text-xs font-mono font-medium uppercase tracking-[0.2em] text-[#e5c378] backdrop-blur-xl shadow-lg group ${className}`}
    >
      {/* Moving Shimmer Highlight */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#dfb86c]/35 to-transparent animate-[shimmer_2.8s_infinite] pointer-events-none" />

      {icon && <span className="relative z-10 text-[#dfb86c]">{icon}</span>}
      <span className="relative z-10">{children}</span>
    </span>
  );
};
