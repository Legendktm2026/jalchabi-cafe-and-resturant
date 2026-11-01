import React, { useState } from 'react';
import { Sparkles, Maximize2, Play } from 'lucide-react';

export interface FocusCardData {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  isVideo?: boolean;
}

interface FocusCardsProps {
  cards: FocusCardData[];
  onCardClick?: (index: number, card: FocusCardData) => void;
}

export const FocusCards: React.FC<FocusCardsProps> = ({ cards, onCardClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto w-full">
      {cards.map((card, index) => {
        const isHovered = hoveredIndex === index;
        const isBlurred = hoveredIndex !== null && !isHovered;

        return (
          <div
            key={card.id}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onCardClick?.(index, card)}
            style={{
              opacity: isBlurred ? 0.5 : 1,
              transform: isHovered ? 'scale(1.025) translateY(-4px)' : 'scale(1) translateY(0)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="group relative rounded-2xl overflow-hidden bg-[#0e1b17] border border-[#dfb86c]/20 hover:border-[#dfb86c]/60 cursor-pointer shadow-xl aspect-[4/3] transform-gpu"
          >
            {/* Background Image / Thumbnail */}
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              loading="lazy"
            />

            {/* Video Indicator */}
            {card.isVideo && (
              <div className="absolute top-3 right-3 p-2 rounded-full bg-[#dfb86c] text-[#070e0c] shadow-lg flex items-center justify-center animate-pulse z-20">
                <Play className="w-3.5 h-3.5 fill-current" />
              </div>
            )}

            {/* Subtle dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070e0c] via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Card Content Overlay */}
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <div className="transform transition-transform duration-300 group-hover:translate-y-0">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#dfb86c]/25 border border-[#dfb86c]/40 text-[#e5c378] mb-2">
                  <Sparkles className="w-2.5 h-2.5" />
                  {card.category}
                </span>

                <h3 className="font-serif text-lg sm:text-xl font-medium text-[#fdfbf7] group-hover:text-[#e5c378] transition-colors leading-snug">
                  {card.title}
                </h3>

                <p className="text-xs text-[#8fa69d] line-clamp-2 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {card.description}
                </p>
              </div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-4 left-4 p-2 rounded-full bg-black/60 text-[#e5c378] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
