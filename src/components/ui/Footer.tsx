import React from 'react';
import { RESTAURANT_DATA } from '../../config/restaurantData';
import { SlidersHorizontal, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAccessibility: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAccessibility }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0e0a07] border-t border-[#c58b4b]/20 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-[#c9bea9]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-[#c58b4b] flex items-center justify-center bg-[#1c1510]">
                <span className="font-serif text-base text-[#c58b4b]">J</span>
              </div>
              <span className="font-serif text-2xl tracking-wider text-[#f5efe6]">
                JALCHOBI
              </span>
            </div>

            <p className="text-sm font-serif italic text-[#c9bea9] max-w-sm leading-relaxed">
              “A place to linger.” — Where artisanal roasts, hearth baking, and Kolkata’s unhurried cultural soul find quiet sanctuary.
            </p>

            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-widest text-[#c58b4b] block mb-1">
                City Context
              </span>
              <p className="text-xs text-[#f5efe6]">Kolkata, West Bengal, India</p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#f5efe6] mb-4">
              Exploration
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider uppercase">
              <li>
                <a href="#experience" className="hover:text-[#e6be8a] transition-colors">
                  3D Sanctuary
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#e6be8a] transition-colors">
                  The Concept
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#e6be8a] transition-colors">
                  Menu Preview
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#e6be8a] transition-colors">
                  Visual Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Hospitality & Visiting */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#f5efe6] mb-4">
              Sanctuary
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider uppercase">
              <li>
                <a href="#visit" className="hover:text-[#e6be8a] transition-colors">
                  Kolkata Quarters
                </a>
              </li>
              <li>
                <a href="#reservations" className="hover:text-[#e6be8a] transition-colors">
                  Table Inquiries
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenAccessibility}
                  className="hover:text-[#e6be8a] transition-colors uppercase cursor-pointer flex items-center gap-1.5"
                >
                  <SlidersHorizontal className="w-3 h-3" />
                  <span>3D Settings</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Socials & Dispatch */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#f5efe6] mb-4">
              Presence
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider uppercase">
              {RESTAURANT_DATA.socials.map((soc) => (
                <li key={soc.platform}>
                  <a
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#e6be8a] transition-colors"
                  >
                    {soc.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal & Concept Verification Disclaimer */}
        <div className="pt-8 border-t border-[#c58b4b]/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#c9bea9]/70">
          <p className="max-w-2xl leading-relaxed text-center md:text-left">
            © {new Date().getFullYear()} Jalchobi Cafe &amp; Restaurant. Conceptual digital prototype developed for Kolkata. All architectural models, dish previews, and contact details represent proposed creative direction.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-2.5 rounded-full border border-[#c58b4b]/30 text-[#e6be8a] hover:bg-[#c58b4b]/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="text-[11px] font-medium uppercase tracking-wider">Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
