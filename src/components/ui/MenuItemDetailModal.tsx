import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem } from '../../config/restaurantData';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { X, Sparkles, Utensils, Clock, MapPin } from 'lucide-react';
import { soundFoley } from '../../utils/soundFoley';

interface MenuItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const MenuItemDetailModal: React.FC<MenuItemDetailModalProps> = ({ item, onClose }) => {
  const { language, t } = useLanguage();
  const { addToCart, setIsCartOpen } = useCart();

  // Trigger porcelain clink on modal open & handle Escape key
  useEffect(() => {
    if (item) {
      soundFoley.playPorcelainClink();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-2xl bg-[#0e1b17] border border-[#dfb86c]/40 rounded-3xl shadow-2xl overflow-hidden z-10 my-8"
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-[#8fa69d] hover:text-[#fdfbf7] border border-[#dfb86c]/20 hover:border-[#dfb86c]/60 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* High-Resolution Food Photography Showcase */}
            <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-[#070e0c]">
              <img
                src={item.image}
                alt={item.name}
                loading="eager"
                onError={(e) => {
                  // Fallback in case of image load issue
                  (e.target as HTMLImageElement).src = '/images/food/m-fish-fry.jpg';
                }}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1b17] via-black/20 to-black/40" />

              {/* Signature / Popular Badge */}
              <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/70 border border-[#dfb86c]/40 text-[#e5c378] backdrop-blur-md shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#dfb86c]" />
                <span>{language === 'bn' ? 'জলছবি স্পেশাল' : 'Jalchabi Special'}</span>
              </div>

              {item.highlight && (
                <div className="absolute bottom-4 left-6 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] text-[#070e0c] shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'জনপ্রিয় পছন্দ' : "Chef's Signature Selection"}</span>
                </div>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#dfb86c]/20 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#dfb86c] font-mono font-medium">
                    {item.category.toUpperCase().replace('-', ' ')} • JALCHABI CANNING II
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#fdfbf7] font-light mt-1">
                    {language === 'bn' && item.bengaliName ? item.bengaliName : item.name}
                  </h3>
                  {item.bengaliName && language === 'en' && (
                    <p className="text-sm font-serif text-[#e5c378] mt-0.5 tracking-wide">
                      {item.bengaliName}
                    </p>
                  )}
                  {language === 'bn' && (
                    <p className="text-xs font-mono text-[#8fa69d] mt-0.5 tracking-wide">
                      {item.name}
                    </p>
                  )}
                </div>
                <div className="font-mono text-2xl font-bold text-[#e5c378]">
                  {item.price}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-[#8fa69d] leading-relaxed">
                {language === 'bn' && item.bengaliDescription ? item.bengaliDescription : item.description}
              </p>

              {/* Dietary / Feature Badges */}
              {item.dietary && (
                <div className="flex flex-wrap gap-2">
                  {item.dietary.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-[#14241f] border border-[#dfb86c]/30 text-[#e5c378] font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Preparation & Provenance Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-[#14241f]/70 border border-[#dfb86c]/15 flex items-start gap-3">
                  <Utensils className="w-4 h-4 text-[#dfb86c] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-[#fdfbf7] block">
                      {language === 'bn' ? 'তাজা প্রস্তুতি' : 'Fresh Kitchen Preparation'}
                    </span>
                    <span className="text-xs text-[#8fa69d]">
                      {language === 'bn' ? 'অর্ডার অনুযায়ী গরম গরম তৈরি করা হয়' : 'Prepared fresh to order by our kitchen artisans'}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#14241f]/70 border border-[#dfb86c]/15 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#dfb86c] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-[#fdfbf7] block">
                      {language === 'bn' ? 'ক্যাফের ঠিকানা' : 'Sanctuary Location'}
                    </span>
                    <span className="text-xs text-[#8fa69d]">
                      Sarberia, Atharobanki, Canning II - 743329
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#dfb86c]/20">
                <div className="text-xs text-[#8fa69d] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#dfb86c]" />
                  <span>{language === 'bn' ? 'প্রতিদিন সকাল ১০টা থেকে রাত ১০টা' : 'Available daily 10:00 AM – 10:00 PM'}</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      addToCart({
                        id: item.id,
                        name: item.name,
                        bengaliName: item.bengaliName,
                        price: item.numericPrice,
                        image: item.image,
                      });
                      onClose();
                      setIsCartOpen(true);
                    }}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#dfb86c]/20 hover:bg-[#dfb86c] text-[#e5c378] hover:text-[#070e0c] border border-[#dfb86c]/50 transition-all text-center cursor-pointer"
                  >
                    {t.menu.addToCart}
                  </button>

                  <a
                    href="#reservations"
                    onClick={onClose}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] text-[#070e0c] hover:shadow-[0_0_20px_rgba(223,184,108,0.4)] transition-all text-center"
                  >
                    {t.menu.reserveDish}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
