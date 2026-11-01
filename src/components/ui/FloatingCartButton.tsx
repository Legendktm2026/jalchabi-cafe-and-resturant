import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { soundFoley } from '../../utils/soundFoley';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const FloatingCartButton: React.FC = () => {
  const { totalItems, grandTotal, setIsCartOpen } = useCart();
  const { language } = useLanguage();

  if (totalItems === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.9 }}
        className="fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom,0px))] xl:bottom-8 right-4 xl:right-8 z-40 flex items-center"
      >
        <button
          type="button"
          onClick={() => {
            soundFoley.playSwitchClick();
            setIsCartOpen(true);
          }}
          className="flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] text-[#070e0c] font-semibold text-xs uppercase tracking-wider shadow-[0_10px_30px_rgba(223,184,108,0.4)] hover:shadow-[0_15px_40px_rgba(223,184,108,0.6)] transition-all transform hover:-translate-y-0.5 cursor-pointer border border-[#dfb86c]/40"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-[#070e0c]" />
            <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#070e0c] text-[#dfb86c] text-[10px] font-bold flex items-center justify-center">
              {totalItems}
            </span>
          </div>

          <div className="text-left font-mono">
            <span className="block text-[11px] leading-none opacity-80">
              {language === 'bn' ? 'অর্ডার কার্ট' : 'View Cart'}
            </span>
            <span className="text-sm font-bold leading-none">
              ₹{grandTotal}
            </span>
          </div>

          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
