import React, { useState } from 'react';
import { Menu, X, SlidersHorizontal, Sparkles, Globe, ShoppingBag, Phone } from 'lucide-react';
import { AudioWaveformVisualizer } from './AudioWaveformVisualizer';
import { MagneticButton } from './MagneticButton';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { soundFoley } from '../../utils/soundFoley';

interface NavbarProps {
  onOpenAccessibility: () => void;
  onEnter3D: () => void;
  isScrolled?: boolean;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  /** Phase 3: Current mobile-first mode state (fast = true, 3D = false) */
  mobileFirstMode?: boolean;
  /** Phase 3: Callback to toggle between Mobile-First Mode and 3D Art Edition */
  onToggleMobileFirstMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAccessibility,
  onEnter3D,
  isScrolled: propIsScrolled,
  soundEnabled = false,
  onToggleSound,
  mobileFirstMode,
  onToggleMobileFirstMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [internalScrolled, setInternalScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { totalItems, setIsCartOpen } = useCart();

  // Self-contained scroll elevation tracking: prevents re-rendering parent AppContent
  React.useEffect(() => {
    let last = false;
    const onScroll = () => {
      const scrolled = window.scrollY > 40;
      if (scrolled !== last) {
        last = scrolled;
        setInternalScrolled(scrolled);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isScrolled = propIsScrolled !== undefined ? propIsScrolled : internalScrolled;

  const handleLanguageSwitch = (lang: 'bn' | 'en') => {
    soundFoley.playSwitchClick();
    setLanguage(lang);
  };

  const navLinks = [
    { label: t.nav.experience3d, href: '#experience', onClick: onEnter3D },
    { label: t.nav.founderStory, href: '#founder-story' },
    { label: t.nav.concept, href: '#story' },
    { label: t.nav.menu, href: '#menu' },
    { label: t.nav.promotions, href: '#promotions' },
    { label: t.nav.reviews, href: '#reviews' },
    { label: t.nav.visit, href: '#visit' },
    { label: t.nav.reservations, href: '#reservations' },
  ];

  // Lock background scrolling and add Escape listener when mobile drawer is open
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 apple-gpu ${
          isScrolled
            ? 'backdrop-blur-2xl bg-[#070e0c]/95 border-b border-[#dfb86c]/30 shadow-[0_8px_32px_rgba(0,0,0,0.6)]'
            : 'backdrop-blur-md bg-[#070e0c]/80 border-b border-[#dfb86c]/15'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 xl:px-4 2xl:px-8 flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-16' : 'h-18'
          }`}
        >
          {/* Brand Wordmark */}
          <a href="#experience" className="group flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-full border border-[#dfb86c]/40 flex items-center justify-center bg-[#0e1b17] group-hover:border-[#dfb86c] transition-colors">
              <span className="font-serif text-lg font-light text-[#dfb86c]">J</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-xl sm:text-2xl font-normal tracking-wider text-[#fdfbf7] group-hover:text-[#e5c378] transition-colors">
                {language === 'bn' ? 'জলছবি' : 'JALCHABI'}
              </span>
              {/* Phase 7: hidden below 360px to prevent 2-line wrap on budget Android phones */}
              <span className="hide-below-360 text-[10px] tracking-[0.2em] uppercase text-[#dfb86c] font-medium truncate max-w-[160px]">
                {language === 'bn' ? 'ক্যাফে ও রেস্তোরাঁ • ক্যানিং ২' : 'Cafe & Restaurant • Canning II'}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links (Visible >= 1280px with elegant proportional spacing) */}
          <nav className="hidden xl:flex items-center gap-2 xl:gap-2.5 2xl:gap-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={link.onClick}
                className="text-[11px] 2xl:text-xs font-medium uppercase tracking-wider text-[#8fa69d] hover:text-[#e5c378] transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Actions (Visible >= 1280px) */}
          <div className="hidden xl:flex items-center gap-1.5 2xl:gap-2.5 shrink-0">
            {/* Bilingual Language Switcher Pill */}
            <div className="flex items-center rounded-full bg-[#0e1b17] border border-[#dfb86c]/30 p-1 shadow-md">
              <button
                type="button"
                onClick={() => handleLanguageSwitch('bn')}
                title="বাংলা ভাষা নির্বাচন করুন"
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  language === 'bn'
                    ? 'bg-[#dfb86c] text-[#070e0c] font-bold shadow-sm'
                    : 'text-[#8fa69d] hover:text-[#fdfbf7]'
                }`}
              >
                বাংলা
              </button>
              <button
                type="button"
                onClick={() => handleLanguageSwitch('en')}
                title="Select English Language"
                className={`px-2.5 py-1 rounded-full text-xs font-medium font-mono uppercase transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#dfb86c] text-[#070e0c] font-bold shadow-sm'
                    : 'text-[#8fa69d] hover:text-[#fdfbf7]'
                }`}
              >
                EN
              </button>
            </div>

            {onToggleSound && (
              <AudioWaveformVisualizer
                isPlaying={soundEnabled}
                onToggle={onToggleSound}
              />
            )}

            {/* Direct Phone / WhatsApp Helpline */}
            <a
              href="tel:+918918948730"
              title="Call Sabir Hossen Khan: +91 8918948730"
              className="p-2 rounded-full border border-[#dfb86c]/20 hover:border-[#dfb86c] text-[#8fa69d] hover:text-[#e5c378] transition-colors"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => {
                soundFoley.playSwitchClick();
                setIsCartOpen(true);
              }}
              title={t.nav.cart}
              aria-label={t.nav.cart}
              className="relative p-2 rounded-full border border-[#dfb86c]/30 hover:border-[#dfb86c] bg-[#0e1b17] text-[#e5c378] hover:text-[#fdfbf7] transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#dfb86c] text-[#070e0c] text-[10px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenAccessibility}
              title="Settings & Accessibility"
              aria-label="Settings and accessibility"
              className="p-2 rounded-full border border-[#dfb86c]/20 hover:border-[#dfb86c] text-[#8fa69d] hover:text-[#fdfbf7] transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            <MagneticButton magneticStrength={0.25}>
              <a
                href="#reservations"
                className="px-3.5 2xl:px-5 py-2 2xl:py-2.5 rounded-full bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] hover:brightness-110 text-[#070e0c] font-bold text-[11px] 2xl:text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(223,184,108,0.25)] flex items-center gap-1.5 whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#070e0c]" />
                <span>{t.nav.bookTable}</span>
              </a>
            </MagneticButton>
          </div>

          {/* Mobile Actions: Clean & Spacious (Visible < 1280px) */}
          <div className="flex xl:hidden items-center gap-2">
            {/* Mobile Language Switcher */}
            <button
              type="button"
              onClick={() => handleLanguageSwitch(language === 'bn' ? 'en' : 'bn')}
              aria-label="Toggle language"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border border-[#dfb86c]/30 bg-[#0e1b17] text-[#e5c378] hover:border-[#dfb86c] cursor-pointer"
            >
              <Globe className="w-3 h-3 text-[#dfb86c]" />
              <span>{language === 'bn' ? 'EN' : 'বাংলা'}</span>
            </button>

            {/* Mobile Cart Button */}
            <button
              type="button"
              onClick={() => {
                soundFoley.playSwitchClick();
                setIsCartOpen(true);
              }}
              aria-label="Shopping Cart"
              className="relative p-2 rounded-full border border-[#dfb86c]/30 bg-[#0e1b17] text-[#e5c378] hover:border-[#dfb86c] cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#dfb86c] text-[#070e0c] text-[9px] font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-full border border-[#dfb86c]/30 text-[#fdfbf7] bg-[#0e1b17] hover:border-[#dfb86c] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#dfb86c]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Accessible Mobile Navigation Drawer (Visible < 1280px) */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 xl:hidden overflow-hidden flex justify-end"
        >
          {/* Dimmed Blurred Backdrop */}
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-over Drawer Panel */}
          <div
            className="relative w-full max-w-sm h-full bg-[#070e0c] border-l border-[#dfb86c]/30 shadow-2xl flex flex-col justify-between overflow-y-auto p-6 z-10 animate-slideLeft pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))]"
          >
            <div>
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#dfb86c]/20 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full border border-[#dfb86c]/40 flex items-center justify-center bg-[#0e1b17]">
                    <span className="font-serif text-sm font-light text-[#dfb86c]">J</span>
                  </div>
                  <div>
                    <span className="font-serif text-lg text-[#fdfbf7] font-normal block leading-tight">
                      {language === 'bn' ? 'জলছবি' : 'JALCHABI'}
                    </span>
                    <span className="text-[9px] tracking-widest uppercase text-[#dfb86c] block">
                      Sarberia, Canning II
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation"
                  className="p-2 rounded-full bg-[#0e1b17] border border-[#dfb86c]/30 text-[#e5c378] hover:text-[#fdfbf7] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categorized Customer Navigation Links */}
              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => {
                      link.onClick?.();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-between py-3 px-3 rounded-xl text-sm font-medium tracking-wide text-[#e6ece9] hover:text-[#fdfbf7] hover:bg-[#dfb86c]/15 transition-all min-h-[48px]"
                  >
                    <span>{link.label}</span>
                    <span className="text-[#dfb86c]/60 text-xs">→</span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Bottom Actions inside Drawer */}
            <div className="pt-6 border-t border-[#dfb86c]/20 space-y-4">
              {/* Direct Call & WhatsApp Contact */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+918918948730"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#0e1b17] border border-[#dfb86c]/30 text-[#e6ece9] text-xs font-mono uppercase tracking-wider min-h-[44px]"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call Us</span>
                </a>
                <a
                  href="https://wa.me/918918948730"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono uppercase tracking-wider min-h-[44px]"
                >
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Accessibility & Audio Controls */}
              <div className="flex items-center justify-between text-xs text-[#8fa69d] px-1">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAccessibility();
                  }}
                  className="flex items-center gap-1.5 hover:text-[#fdfbf7] cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#dfb86c]" />
                  <span>{language === 'bn' ? 'গ্রাফিক্স ও সেটিংস' : 'Graphics & Settings'}</span>
                </button>

                {onToggleSound && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-[#8fa69d]">{soundEnabled ? 'SFX ON' : 'SFX OFF'}</span>
                    <AudioWaveformVisualizer
                      isPlaying={soundEnabled}
                      onToggle={onToggleSound}
                    />
                  </div>
                )}
              </div>

              {/* Phase 3: Mobile-First Mode toggle */}
              {onToggleMobileFirstMode && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onToggleMobileFirstMode();
                  }}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl bg-[#0e1b17] border border-[#dfb86c]/25 text-xs text-[#8fa69d] hover:border-[#dfb86c]/50 transition-colors cursor-pointer"
                >
                  <span>
                    {mobileFirstMode
                      ? (language === 'bn' ? '✨ 3D আর্ট এডিশনে যান' : '✨ Switch to 3D Art Edition')
                      : (language === 'bn' ? '⚡ ফাস্ট মোডে ফিরুন' : '⚡ Switch to Fast Mode')}
                  </span>
                  <div className={`w-8 h-4 rounded-full transition-all ${mobileFirstMode ? 'bg-[#1a2f28]' : 'bg-[#dfb86c]'}`}>
                    <div className={`w-3 h-3 rounded-full bg-white mt-0.5 transition-all ${mobileFirstMode ? 'ml-0.5' : 'ml-4.5'}`} />
                  </div>
                </button>
              )}

              {/* Primary Book Table CTA */}
              <a
                href="#reservations"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-3.5 rounded-full bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] text-[#070e0c] font-bold text-xs tracking-wider uppercase shadow-lg shadow-[#dfb86c]/25 min-h-[48px] flex items-center justify-center"
              >
                {t.nav.bookTable}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
