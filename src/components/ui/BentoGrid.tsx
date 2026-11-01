import React from 'react';

interface BentoGridProps {
  className?: string;
  children?: React.ReactNode;
}

export const BentoGrid: React.FC<BentoGridProps> = ({
  className = '',
  children,
}) => {
  return (
    <div
      className={`grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ${className}`}
    >
      {children}
    </div>
  );
};

interface BentoGridItemProps {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string;
}

export const BentoGridItem: React.FC<BentoGridItemProps> = ({
  className = '',
  title,
  description,
  header,
  icon,
  badge,
}) => {
  return (
    <div
      className={`row-span-1 rounded-2xl group/bento hover:shadow-2xl hover:border-[#dfb86c]/60 transition-all duration-300 p-5 md:p-6 bg-[#0e1b17]/90 border border-[#dfb86c]/20 justify-between flex flex-col space-y-4 backdrop-blur-xl relative overflow-hidden ${className}`}
    >
      {/* Top Header / Graphic */}
      {header && <div className="w-full flex-1 overflow-hidden rounded-xl">{header}</div>}

      {/* Content */}
      <div className="relative z-10 transition-transform duration-300 group-hover/bento:translate-x-1">
        {badge && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#dfb86c]/30 bg-[#dfb86c]/10 px-2.5 py-0.5 text-[9px] font-mono tracking-widest text-[#dfb86c] uppercase font-medium mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dfb86c]" />
            {badge}
          </span>
        )}
        <div className="flex items-center gap-2 mb-1">
          {icon && <div className="text-[#dfb86c]">{icon}</div>}
          <div className="font-serif text-lg md:text-xl font-medium text-[#fdfbf7] tracking-wide">
            {title}
          </div>
        </div>
        <div className="font-light text-xs md:text-sm text-[#8fa69d] leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
};
