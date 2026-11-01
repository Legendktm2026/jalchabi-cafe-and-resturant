import React from 'react';
import { BookOpen, UtensilsCrossed } from 'lucide-react';

interface WebGLFallbackProps {
  onExploreClick?: () => void;
}

export const WebGLFallback: React.FC<WebGLFallbackProps> = ({ onExploreClick }) => {
  return (
    <div className="relative w-full h-[650px] md:h-[800px] bg-[#070e0c] overflow-hidden flex items-center justify-center">
      {/* Background Concept Artwork */}
      <img
        src="/images/jalchabi-exterior-dusk.jpg"
        alt="Jalchabi Cafe Concept Rendering"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070e0c] via-[#070e0c]/70 to-[#070e0c]/40" />

      {/* Content Card */}
      <div className="relative z-10 max-w-xl mx-4 text-center p-8 rounded-2xl glass-panel-elevated border border-[#dfb86c]/30">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#dfb86c]/20 text-[#e5c378] mb-4">
          High-Fidelity Concept Mode
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#fdfbf7] mb-3">
          JALCHABI
        </h2>
        <p className="text-sm md:text-base text-[#8fa69d] mb-6 leading-relaxed">
          Your browser is currently displaying our high-resolution visual concept gallery.
          Experience the full atmosphere, curated menu, and culinary sanctuary below.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="#menu"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#dfb86c] text-[#070e0c] font-semibold text-sm hover:bg-[#e5c378] transition-colors"
          >
            <UtensilsCrossed className="w-4 h-4" />
            Explore Menu Preview
          </a>
          <button
            type="button"
            onClick={onExploreClick || (() => {
              const el = document.getElementById('story');
              el?.scrollIntoView({ behavior: 'smooth' });
            })}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#dfb86c]/40 text-[#fdfbf7] font-medium text-sm hover:border-[#dfb86c] transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Discover The Concept
          </button>
        </div>
      </div>
    </div>
  );
};
