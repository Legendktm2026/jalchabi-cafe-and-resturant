import React, { useState } from 'react';
import { Menu, X, SlidersHorizontal, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenAccessibility: () => void;
  onEnter3D: () => void;
  isScrolled?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAccessibility, onEnter3D, isScrolled = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '3D Experience', href: '#experience', onClick: onEnter3D },
    { label: 'The Concept', href: '#story' },
    { label: 'Menu Preview', href: '#menu' },
    { label: 'Visual Gallery', href: '#gallery' },
    { label: 'Visit Kolkata', href: '#visit' },
    { label: 'Concierge & Enquiries', href: '#reservations' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 apple-gpu ${
        isScrolled
          ? 'backdrop-blur-2xl bg-[#100b07]/92 border-b border-[#c58b4b]/30 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
          : 'backdrop-blur-md bg-[#120d09]/80 border-b border-[#c58b4b]/15'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-16' : 'h-18'
        }`}
      >
        {/* Brand Wordmark */}
        <a href="#experience" className="group flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-[#c58b4b]/40 flex items-center justify-center bg-[#1c1510] group-hover:border-[#c58b4b] transition-colors">
            <span className="font-serif text-lg font-light text-[#c58b4b]">J</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl font-normal tracking-wider text-[#f5efe6] group-hover:text-[#e6be8a] transition-colors">
              JALCHOBI
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#c58b4b] font-medium">
              Cafe &amp; Restaurant • Kolkata
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={link.onClick}
              className="text-xs font-medium uppercase tracking-widest text-[#c9bea9] hover:text-[#e6be8a] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenAccessibility}
            title="Settings & Accessibility"
            aria-label="Settings and accessibility"
            className="p-2 rounded-full border border-[#c58b4b]/20 hover:border-[#c58b4b] text-[#c9bea9] hover:text-[#f5efe6] transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          <a
            href="#reservations"
            className="px-5 py-2.5 rounded-full bg-[#c58b4b] hover:bg-[#e6be8a] text-[#120d09] font-medium text-xs tracking-wider uppercase transition-colors shadow-[0_0_20px_rgba(197,139,75,0.25)] flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Book a Table</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={onOpenAccessibility}
            aria-label="Settings"
            className="p-2 rounded-full border border-[#c58b4b]/20 text-[#c9bea9]"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-full border border-[#c58b4b]/30 text-[#f5efe6]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#c58b4b]/20 bg-[#16100b] px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                link.onClick?.();
                setMobileMenuOpen(false);
              }}
              className="block py-2 text-sm uppercase tracking-wider text-[#c9bea9] hover:text-[#e6be8a] border-b border-[#c58b4b]/10"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#reservations"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-3 rounded-full bg-[#c58b4b] text-[#120d09] font-semibold text-xs tracking-wider uppercase"
            >
              Book a Table
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
