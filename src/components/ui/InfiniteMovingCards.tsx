import React, { useEffect, useState, useRef } from 'react';

export interface MarqueeItem {
  quote: string;
  name: string;
  title: string;
  badge?: string;
  badgeType?: 'coffee' | 'press' | 'heritage';
}

interface InfiniteMovingCardsProps {
  items: MarqueeItem[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({
  items,
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      if (scrollerRef.current.children.length > items.length) {
        setStart(true);
        return;
      }
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty('--animation-direction', 'forwards');
      } else {
        containerRef.current.style.setProperty('--animation-direction', 'reverse');
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === 'fast') {
        containerRef.current.style.setProperty('--animation-duration', '24s');
      } else if (speed === 'normal') {
        containerRef.current.style.setProperty('--animation-duration', '42s');
      } else {
        containerRef.current.style.setProperty('--animation-duration', '65s');
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={`scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)] ${className}`}
    >
      <ul
        ref={scrollerRef}
        className={`flex min-w-full shrink-0 gap-5 py-4 w-max flex-nowrap ${
          start ? 'animate-marquee' : ''
        } ${pauseOnHover ? 'hover:[animation-play-state:paused]' : ''}`}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="w-[320px] md:w-[380px] max-w-full relative rounded-2xl border border-[#dfb86c]/20 flex-shrink-0 bg-[#0e1b17]/90 px-6 py-6 md:py-7 backdrop-blur-xl shadow-xl transition-all hover:border-[#dfb86c]/50 group"
          >
            {/* Top Badge */}
            {item.badge && (
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#dfb86c]/30 bg-[#dfb86c]/10 px-2.5 py-0.5 text-[9px] md:text-[10px] font-mono tracking-widest text-[#dfb86c] uppercase font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dfb86c]" />
                  {item.badge}
                </span>
                <span className="text-[#dfb86c]/30 text-xs">✦</span>
              </div>
            )}

            {/* Quote / Description */}
            <p className="text-xs md:text-sm text-[#fdfbf7]/90 font-light leading-relaxed font-serif italic mb-4">
              "{item.quote}"
            </p>

            {/* Author / Origin Footer */}
            <div className="border-t border-[#dfb86c]/15 pt-3 flex items-center justify-between">
              <div>
                <h4 className="font-serif text-sm font-medium text-[#fdfbf7] tracking-wide">
                  {item.name}
                </h4>
                <p className="text-[10px] font-mono text-[#dfb86c]/80 uppercase tracking-wider">
                  {item.title}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
