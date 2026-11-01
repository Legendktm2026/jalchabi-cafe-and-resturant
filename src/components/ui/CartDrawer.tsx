import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { soundFoley } from '../../utils/soundFoley';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    grandTotal, 
    subtotal, 
    setIsCheckoutModalOpen 
  } = useCart();
  const { language, t } = useLanguage();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    soundFoley.playSwitchClick();
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
        />

        {/* Slide-out Drawer */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="fixed inset-y-0 right-0 w-full max-w-md bg-[#070e0c] border-l border-[#dfb86c]/30 shadow-2xl z-10 flex flex-col justify-between"
        >
          {/* Top Bar */}
          <div className="p-5 border-b border-[#dfb86c]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#dfb86c]" />
              <h3 className="text-xl font-serif text-[#fdfbf7] font-light">
                {t.ordering.cartTitle}
              </h3>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#0e1b17] text-[#e5c378] border border-[#dfb86c]/30">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full bg-black/40 text-[#8fa69d] hover:text-[#fdfbf7] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#dfb86c]/40 mx-auto" />
                <p className="text-base font-serif text-[#fdfbf7]">
                  {t.ordering.emptyCart}
                </p>
                <p className="text-xs text-[#8fa69d] max-w-xs mx-auto">
                  {t.ordering.emptyCartSub}
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-[#0e1b17] border border-[#dfb86c]/20 flex items-center gap-3.5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#dfb86c]/20"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-serif text-[#fdfbf7] truncate">
                      {language === 'bn' && item.bengaliName ? item.bengaliName : item.name}
                    </h4>
                    <p className="text-xs font-mono text-[#e5c378] mt-0.5">
                      ₹{item.price} each
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-md bg-[#14241f] text-[#fdfbf7] hover:bg-[#dfb86c]/40 flex items-center justify-center text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono text-[#fdfbf7] font-bold px-1.5">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-md bg-[#14241f] text-[#fdfbf7] hover:bg-[#dfb86c]/40 flex items-center justify-center text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-mono font-bold text-[#e5c378] block">
                      ₹{item.price * item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-red-400/80 hover:text-red-400 mt-2 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#dfb86c]/20 bg-[#070e0c]/95 space-y-3">
              <div className="space-y-1.5 text-xs text-[#8fa69d]">
                <div className="flex justify-between">
                  <span>{t.ordering.subtotal}</span>
                  <span className="font-mono text-[#fdfbf7]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.ordering.packaging}</span>
                  <span className="font-mono text-emerald-400">{language === 'bn' ? 'বিনামূল্যে (ফ্রি)' : 'FREE (₹0)'}</span>
                </div>
                <div className="flex justify-between text-base font-serif text-[#fdfbf7] font-bold pt-2 border-t border-[#dfb86c]/15">
                  <span>{t.ordering.total}</span>
                  <span className="font-mono text-[#e5c378]">₹{grandTotal}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 text-[11px] text-[#8fa69d]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#dfb86c] shrink-0" />
                <span>{language === 'bn' ? 'PhonePe UPI ও সরাসরি হোয়াটসঅ্যাপে নিশ্চিতকরণ' : 'Direct UPI PhonePe QR & WhatsApp Dispatch'}</span>
              </div>

              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] text-[#070e0c] font-bold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(223,184,108,0.4)] transition-all cursor-pointer"
              >
                <span>{t.ordering.checkoutNow} (₹{grandTotal})</span>
                <ArrowRight className="w-4 h-4 text-[#070e0c]" />
              </button>

              <button
                type="button"
                onClick={clearCart}
                className="w-full text-center text-xs text-[#8fa69d] hover:text-red-400 transition-colors pt-1"
              >
                {t.ordering.clearCart}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
