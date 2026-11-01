import React, { useState, useEffect, useRef } from 'react';
import { X, Search, Plus, Minus, ShoppingBag } from 'lucide-react';
import { RESTAURANT_DATA, MenuItem, MenuCategoryType } from '../../config/restaurantData';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { soundFoley } from '../../utils/soundFoley';

interface MobileMenuSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES: { key: MenuCategoryType; label: string; labelEn: string }[] = [
  { key: 'all',               label: 'সব পদ',           labelEn: 'All' },
  { key: 'momo',              label: '🥟 মোমো',          labelEn: '🥟 Momos' },
  { key: 'starters-crispy',   label: '🍗 ফ্রাইড চিকেন',  labelEn: '🍗 Crispy' },
  { key: 'rolls-sandwiches',  label: '🌯 রোল ও স্যান্ডউইচ',labelEn: '🌯 Rolls' },
  { key: 'burgers-pizzas',    label: '🍔 বার্গার ও পিৎজা',labelEn: '🍔 Burgers/Pizza' },
  { key: 'chinese-noodles',   label: '🍜 চাইনিজ নুডলস',  labelEn: '🍜 Chinese' },
  { key: 'tandoori-indian',   label: '🍛 তন্দুরি কারি',   labelEn: '🍛 Tandoori' },
  { key: 'beverages-shakes',  label: '🥤 শেক ও চা',      labelEn: '🥤 Drinks' },
];

/**
 * Phase 4 — Zomato-style Mobile Menu Sheet
 *
 * A full-screen bottom sheet (95svh) triggered by:
 *  - The "See Menu & Order" CTA on MobileHeroSection
 *  - The "মেনু" button on MobileQuickActionDock
 *
 * Features:
 *  - Search bar (instant filter by name / Bengali name)
 *  - Horizontally scrollable category pills (sticky)
 *  - Large food cards: 80×80px photo, name, price, Add/Qty stepper
 *  - Sticky cart footer bar: item count + grand total → opens Checkout modal
 *  - body scroll lock while open
 *  - Escape key and backdrop tap to close
 *  - animate-slideUp entrance animation (defined in index.css)
 *
 * Desktop/Tablet (xl+): Hidden via className="xl:hidden".
 * The existing MenuSection scroll page is unchanged.
 */
export const MobileMenuSheet: React.FC<MobileMenuSheetProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const { cart, addToCart, updateQuantity, totalItems, grandTotal, setIsCheckoutModalOpen } =
    useCart();

  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryType>('all');
  const [query, setQuery] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Escape key to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Reset search + scroll to top when category changes
  const handleCategoryChange = (key: MenuCategoryType) => {
    soundFoley.playSwitchClick();
    setSelectedCategory(key);
    if (listRef.current) listRef.current.scrollTop = 0;
  };

  // Filtered items
  const filtered = RESTAURANT_DATA.menu.filter((item) => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const q = query.trim().toLowerCase();
    const matchQ =
      q === '' ||
      item.name.toLowerCase().includes(q) ||
      (item.bengaliName?.toLowerCase().includes(q) ?? false);
    return matchCat && matchQ;
  });

  const getItemQty = (id: string): number =>
    cart.find((i) => i.id === id)?.quantity ?? 0;

  // Veg/non-veg indicator helper
  const isVeg = (item: MenuItem): boolean =>
    item.dietary?.includes('Vegetarian') ||
    item.dietary?.includes('Vegan') ||
    item.category === 'beverages-shakes' ||
    item.name.toLowerCase().includes('paneer');

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={language === 'bn' ? 'মেনু' : 'Menu'}
      className="fixed inset-0 z-50 flex flex-col justify-end xl:hidden"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ── Sheet panel ─────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full h-[95svh] bg-[#070e0c] rounded-t-3xl flex flex-col shadow-2xl border-t border-[#dfb86c]/30 animate-slideUp">

        {/* Drag handle indicator */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1 rounded-full bg-[#dfb86c]/40" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#dfb86c]/20 shrink-0">
          <h2 className="font-serif text-xl text-[#fdfbf7]">
            {language === 'bn' ? 'আমাদের মেনু' : 'Our Menu'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 rounded-full bg-[#0e1b17] border border-[#dfb86c]/30 text-[#e5c378] active:scale-95 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search bar */}
        <div className="px-4 py-2 shrink-0">
          <div className="flex items-center gap-2 bg-[#0e1b17] border border-[#dfb86c]/30 rounded-xl px-3 py-2.5">
            <Search className="w-4 h-4 text-[#dfb86c] shrink-0" />
            <input
              type="search"
              placeholder={language === 'bn' ? 'কী খুঁজছেন?' : 'Search dishes...'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-[#fdfbf7] placeholder-[#8fa69d] outline-none"
              autoComplete="off"
            />
            {query !== '' && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-[#8fa69d] hover:text-[#fdfbf7] transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category pills — horizontally scrollable */}
        <div className="overflow-x-auto flex gap-2 px-4 py-2 no-scrollbar shrink-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => handleCategoryChange(cat.key)}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all active:scale-95 ${
                selectedCategory === cat.key
                  ? 'bg-gradient-to-r from-[#dfb86c] to-[#ebd08d] text-[#070e0c] font-bold shadow-md shadow-[#dfb86c]/20'
                  : 'bg-[#0e1b17] border border-[#dfb86c]/30 text-[#8fa69d] hover:border-[#dfb86c]/60'
              }`}
            >
              {language === 'bn' ? cat.label : cat.labelEn}
            </button>
          ))}
        </div>

        {/* ── Scrollable item list ─────────────────────────────────────── */}
        <div ref={listRef} className="flex-1 overflow-y-auto overscroll-contain px-4 pb-3 space-y-2.5">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="text-4xl mb-3">🍽</span>
              <p className="text-sm text-[#8fa69d]">
                {language === 'bn' ? 'কিছু পাওয়া যায়নি' : 'No items found'}
              </p>
              <button
                type="button"
                onClick={() => { setQuery(''); setSelectedCategory('all'); }}
                className="mt-3 text-xs text-[#dfb86c] underline"
              >
                {language === 'bn' ? 'সব দেখুন' : 'Clear filters'}
              </button>
            </div>
          ) : (
            filtered.map((item: MenuItem) => {
              const qty = getItemQty(item.id);
              const veg = isVeg(item);
              return (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-2xl bg-[#0e1b17] border border-[#dfb86c]/20 active:border-[#dfb86c]/40 transition-colors"
                >
                  {/* Food thumbnail */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#14241f]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Item info */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      {/* Veg/Non-veg indicator + name */}
                      <div className="flex items-start gap-1.5">
                        <span
                          title={veg ? 'Vegetarian' : 'Non-Vegetarian'}
                          className={`inline-flex items-center justify-center w-3.5 h-3.5 rounded-[3px] border shrink-0 mt-0.5 ${
                            veg
                              ? 'border-emerald-500 bg-emerald-950/40'
                              : 'border-red-500 bg-red-950/40'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              veg ? 'bg-emerald-400' : 'bg-red-400'
                            }`}
                          />
                        </span>
                        <h3 className="font-serif text-[15px] text-[#fdfbf7] leading-snug line-clamp-2">
                          {language === 'bn' && item.bengaliName
                            ? item.bengaliName
                            : item.name}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#8fa69d] mt-0.5 line-clamp-2 leading-relaxed">
                        {language === 'bn' && item.bengaliDescription
                          ? item.bengaliDescription
                          : item.description}
                      </p>
                    </div>

                    {/* Price + Add/Stepper */}
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-mono text-sm font-semibold text-[#e5c378]">
                        {item.price}
                      </span>

                      {qty === 0 ? (
                        /* Add button */
                        <button
                          type="button"
                          onClick={() =>
                            addToCart({
                              id: item.id,
                              name: item.name,
                              bengaliName: item.bengaliName,
                              price: item.numericPrice,
                              image: item.image,
                            })
                          }
                          className="flex items-center gap-1 px-4 py-2 rounded-full bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] text-[#070e0c] text-xs font-bold min-h-[36px] min-w-[72px] justify-center active:scale-95 transition-all shadow-md shadow-[#dfb86c]/20"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{language === 'bn' ? 'যোগ' : 'Add'}</span>
                        </button>
                      ) : (
                        /* Quantity stepper */
                        <div className="flex items-center gap-2 bg-[#dfb86c]/15 border border-[#dfb86c]/50 rounded-full px-2 py-1">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-7 h-7 rounded-full bg-[#dfb86c]/25 flex items-center justify-center text-[#e5c378] active:scale-90 transition-all"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold text-[#e5c378] min-w-[18px] text-center tabular-nums">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              addToCart({
                                id: item.id,
                                name: item.name,
                                bengaliName: item.bengaliName,
                                price: item.numericPrice,
                                image: item.image,
                              })
                            }
                            className="w-7 h-7 rounded-full bg-[#dfb86c] flex items-center justify-center text-[#070e0c] active:scale-90 transition-all"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ── Sticky cart footer bar (shows only when cart has items) ─── */}
        {totalItems > 0 && (
          <div className="shrink-0 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-[#dfb86c]/25 bg-[#070e0c]">
            <button
              type="button"
              onClick={() => {
                onClose();
                // Small delay so sheet close animation plays before modal opens
                setTimeout(() => setIsCheckoutModalOpen(true), 300);
              }}
              className="w-full flex items-center justify-between py-4 px-5 rounded-2xl bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] text-[#070e0c] font-bold shadow-[0_4px_24px_rgba(223,184,108,0.4)] active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span className="text-sm">
                  {totalItems}{' '}
                  {language === 'bn'
                    ? totalItems === 1 ? 'আইটেম' : 'আইটেম'
                    : totalItems === 1 ? 'item' : 'items'}
                </span>
              </div>
              <span className="text-sm">
                ₹{grandTotal} ·{' '}
                {language === 'bn' ? 'অর্ডার করুন →' : 'Place Order →'}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
