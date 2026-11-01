import React, { useEffect, useState } from 'react';
import { Phone, Utensils, MapPin, Calendar, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { soundFoley } from '../../utils/soundFoley';

interface MobileQuickActionDockProps {
  onNavigateSection?: (sectionId: string) => void;
  /** Phase 4: Opens the Zomato-style MobileMenuSheet instead of scrolling to #menu */
  onOpenMenuSheet?: () => void;
}

/**
 * Phase 4 + 6 — MobileQuickActionDock
 *
 * Phase 4: "মেনু" button now opens MobileMenuSheet (via onOpenMenuSheet prop)
 *          instead of scrolling to the #menu section.
 *
 * Phase 6: "অর্ডার" button is now:
 *  - Wider (extra horizontal padding)
 *  - Golden background highlight strip
 *  - Larger icon (w-5 h-5) with persistent glow pulse (animate-order-pulse)
 *  - Bolder label (font-bold, text-[11px])
 *  - First-visit tooltip (sessionStorage, auto-dismisses after 4s)
 */
export const MobileQuickActionDock: React.FC<MobileQuickActionDockProps> = ({
  onNavigateSection,
  onOpenMenuSheet,
}) => {
  const { language } = useLanguage();
  const { totalItems, setIsCartOpen } = useCart();

  // Phase 6: First-visit tooltip — shown once per browser session
  const [showOrderTooltip, setShowOrderTooltip] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem('jalchabi_order_tip_shown');
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (!showOrderTooltip) return;
    const timer = setTimeout(() => {
      setShowOrderTooltip(false);
      try {
        sessionStorage.setItem('jalchabi_order_tip_shown', '1');
      } catch { /* ignore */ }
    }, 4000);
    return () => clearTimeout(timer);
  }, [showOrderTooltip]);

  const handleScrollTo = (id: string) => {
    soundFoley.playSwitchClick();
    if (onNavigateSection) {
      onNavigateSection(id);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Mobile quick actions"
      className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070e0c]/95 backdrop-blur-xl border-t border-[#dfb86c]/30 px-2 py-2 shadow-[0_-10px_30px_rgba(0,0,0,0.85)] pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">

        {/* ── Call button ───────────────────────────────────────────────── */}
        <a
          href="tel:+918918948730"
          onClick={() => soundFoley.playSwitchClick()}
          className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl hover:bg-[#dfb86c]/15 text-[#8fa69d] active:scale-95 transition-all text-center min-w-[56px]"
        >
          <div className="p-1.5 rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-medium tracking-tight">
            {language === 'bn' ? 'কল করুন' : 'Call Us'}
          </span>
        </a>

        {/* ── Phase 4: Menu → opens MobileMenuSheet ────────────────────── */}
        <button
          type="button"
          onClick={() => {
            soundFoley.playSwitchClick();
            if (onOpenMenuSheet) {
              onOpenMenuSheet();
            } else {
              handleScrollTo('menu');
            }
          }}
          className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl hover:bg-[#dfb86c]/15 text-[#8fa69d] active:scale-95 transition-all text-center min-w-[56px] cursor-pointer"
        >
          <div className="p-1.5 rounded-full bg-[#dfb86c]/20 text-[#e5c378] border border-[#dfb86c]/40">
            <Utensils className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-medium tracking-tight">
            {language === 'bn' ? 'মেনু' : 'Menu'}
          </span>
        </button>

        {/* ── Directions / Route ───────────────────────────────────────── */}
        <a
          href="https://maps.google.com/?q=Sarberia,+Canning+II,+West+Bengal+743329"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundFoley.playSwitchClick()}
          className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl hover:bg-[#dfb86c]/15 text-[#8fa69d] active:scale-95 transition-all text-center min-w-[56px]"
        >
          <div className="p-1.5 rounded-full bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/30">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-medium tracking-tight">
            {language === 'bn' ? 'ম্যাপ' : 'Directions'}
          </span>
        </a>

        {/* ── Table Reservation ────────────────────────────────────────── */}
        <button
          type="button"
          onClick={() => handleScrollTo('reservations')}
          className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl hover:bg-[#dfb86c]/15 text-[#8fa69d] active:scale-95 transition-all text-center min-w-[56px] cursor-pointer"
        >
          <div className="p-1.5 rounded-full bg-[#dfb86c]/20 text-[#e5c378] border border-[#dfb86c]/40">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-medium tracking-tight">
            {language === 'bn' ? 'বুকিং' : 'Book'}
          </span>
        </button>

        {/* ── Phase 6: Order button — golden, wider, pulsing ───────────── */}
        <div className="relative">
          {/* First-visit tooltip */}
          {showOrderTooltip && (
            <div className="absolute bottom-full mb-2 right-0 bg-[#dfb86c] text-[#070e0c] text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-lg whitespace-nowrap animate-fadeIn pointer-events-none z-10">
              {language === 'bn' ? 'ট্যাপ করে অর্ডার করুন 🍛' : 'Tap to order 🍛'}
              {/* Tooltip caret */}
              <div className="absolute top-full right-5 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-[#dfb86c]" />
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              soundFoley.playSwitchClick();
              // Dismiss tooltip immediately on tap
              if (showOrderTooltip) {
                setShowOrderTooltip(false);
                try { sessionStorage.setItem('jalchabi_order_tip_shown', '1'); } catch { /* ignore */ }
              }
              setIsCartOpen(true);
            }}
            className="relative flex flex-col items-center gap-0.5 py-1.5 px-4 rounded-xl bg-[#dfb86c]/15 border border-[#dfb86c]/40 text-[#fdfbf7] active:scale-95 transition-all text-center cursor-pointer"
          >
            {/* Cart badge */}
            {totalItems > 0 && (
              <span className="absolute top-0 right-1.5 w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full bg-emerald-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-[#070e0c] px-0.5 z-10">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}

            {/* Golden pulsing icon wrapper */}
            <div className="p-2 rounded-full bg-[#dfb86c] text-[#070e0c] animate-order-pulse">
              <ShoppingBag className="w-5 h-5" />
            </div>

            <span className="text-[11px] font-bold text-[#e5c378] tracking-tight">
              {language === 'bn' ? 'অর্ডার' : 'Order'}
            </span>
          </button>
        </div>

      </div>
    </nav>
  );
};
