import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { RESTAURANT_DATA } from '../../config/restaurantData';
import { soundFoley } from '../../utils/soundFoley';
import { 
  X, 
  QrCode, 
  Send, 
  MapPin, 
  Phone, 
  User, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  UtensilsCrossed
} from 'lucide-react';

export const OrderCheckoutModal: React.FC = () => {
  const { cart, grandTotal, isCheckoutModalOpen, setIsCheckoutModalOpen, clearCart } = useCart();
  const { language, t } = useLanguage();

  const [orderMode, setOrderMode] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [tableNumber, setTableNumber] = useState('Table 1');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!isCheckoutModalOpen) return null;

  const upiString = `upi://pay?pa=${RESTAURANT_DATA.contact.upiVpa}&pn=${encodeURIComponent(
    RESTAURANT_DATA.contact.upiPayeeName
  )}&am=${grandTotal}&cu=INR&tn=${encodeURIComponent('Jalchabi Cafe Order')}`;

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=10&data=${encodeURIComponent(
    upiString
  )}`;

  const generateWhatsAppMessage = () => {
    const header = language === 'bn' 
      ? `*জলছবি ক্যাফে ও রেস্তোরাঁ — সারবেড়িয়া*\n_নতুন রিয়েল-টাইম অর্ডার_`
      : `*JALCHABI CAFE & RESTAURANT — SARBERIA*\n_New Real-Time Order Confirmation_`;

    const details = orderMode === 'dine-in'
      ? (language === 'bn' ? `🍽️ *ধরণ:* ক্যাফে ডাইন-ইন (${tableNumber})` : `🍽️ *Mode:* Dine-In (${tableNumber})`)
      : (language === 'bn' 
          ? `🛵 *ধরণ:* হোম ডেলিভারি / পার্সেল\n📍 *ঠিকানা:* ${deliveryAddress || 'সারবেড়িয়া'}`
          : `🛵 *Mode:* Takeaway / Delivery\n📍 *Address:* ${deliveryAddress || 'Sarberia'}`);

    const customer = language === 'bn'
      ? `👤 *গ্রাহক:* ${customerName || 'সম্মানিত অতিথি'} (📞 ${customerPhone || 'প্রযোজ্য নয়'})`
      : `👤 *Guest:* ${customerName || 'Honored Guest'} (📞 ${customerPhone || 'N/A'})`;

    const items = cart
      .map(
        (i) =>
          `• ${i.quantity}x ${language === 'bn' && i.bengaliName ? i.bengaliName : i.name} (₹${
            i.price * i.quantity
          })`
      )
      .join('\n');

    const paymentInfo = language === 'bn'
      ? `💰 *সর্বমোট প্রদেয়:* ₹${grandTotal}\n💳 *UPI পেমেন্ট:* ৮৯১৮৯৪৮৭৩০@upi (PhonePe / GPay)`
      : `💰 *Grand Total:* ₹${grandTotal}\n💳 *UPI Payment:* 8918948730@upi (PhonePe / GPay)`;

    return `${header}\n\n${details}\n${customer}\n\n*${language === 'bn' ? 'অর্ডারকৃত পদসমূহ:' : 'Items Ordered:'}*\n${items}\n\n${paymentInfo}\n\n${
      language === 'bn' 
        ? '🙏 জলছবি ক্যাফেতে অর্ডার করার জন্য ধন্যবাদ!' 
        : '🙏 Thank you for dining with Jalchabi!'
    }`;
  };

  const handleSendWhatsAppOrder = () => {
    soundFoley.playPorcelainClink();
    const msg = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/918918948730?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
    }, 1500);
  };

  const handleClose = () => {
    setIsCheckoutModalOpen(false);
    setOrderPlaced(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0e1b17] border border-[#dfb86c]/40 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 p-6 sm:p-8 space-y-6"
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-[#dfb86c]/20 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono font-medium bg-[#14241f] text-[#e5c378] border border-[#dfb86c]/30">
                <UtensilsCrossed className="w-3.5 h-3.5 text-[#dfb86c]" />
                <span>SARBERIA • CANNING II • UPI PHONEPE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#fdfbf7] font-light mt-1.5">
                {language === 'bn' ? 'রিয়েল-টাইম অর্ডার ও পেমেন্ট' : 'Real-Time Order & UPI Payment'}
              </h3>
            </div>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close modal"
              className="p-2 rounded-full bg-black/60 text-[#8fa69d] hover:text-[#fdfbf7] border border-[#dfb86c]/20 hover:border-[#dfb86c]/60 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {orderPlaced ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-serif text-[#fdfbf7]">
                {t.ordering.orderPlacedSuccess}
              </h4>
              <p className="text-sm text-[#8fa69d] max-w-md mx-auto">
                {t.ordering.orderPlacedSub}
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] text-[#070e0c]"
                >
                  {language === 'bn' ? 'সম্পন্ন করুন' : 'Done'}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Order Mode Toggle */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#dfb86c]">
                  {t.ordering.orderMode}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      soundFoley.playSwitchClick();
                      setOrderMode('dine-in');
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      orderMode === 'dine-in'
                        ? 'bg-[#dfb86c]/20 border-[#dfb86c] text-[#fdfbf7]'
                        : 'bg-[#14241f]/70 border-[#dfb86c]/15 text-[#8fa69d] hover:border-[#dfb86c]/40'
                    }`}
                  >
                    <span className="block text-sm font-semibold">
                      {t.ordering.dineIn}
                    </span>
                    <span className="text-xs opacity-75">
                      {language === 'bn' ? 'টেবিল সেবা' : 'In-Cafe Table Service'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundFoley.playSwitchClick();
                      setOrderMode('takeaway');
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      orderMode === 'takeaway'
                        ? 'bg-[#dfb86c]/20 border-[#dfb86c] text-[#fdfbf7]'
                        : 'bg-[#14241f]/70 border-[#dfb86c]/15 text-[#8fa69d] hover:border-[#dfb86c]/40'
                    }`}
                  >
                    <span className="block text-sm font-semibold">
                      {t.ordering.takeaway}
                    </span>
                    <span className="text-xs opacity-75">
                      {language === 'bn' ? 'সারবেড়িয়া ও ক্যানিং ২' : 'Sarberia & Canning II'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Dynamic Inputs Based on Mode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {orderMode === 'dine-in' ? (
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#8fa69d]">
                      {t.ordering.tableNumberLabel}
                    </label>
                    <select
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-full bg-[#070e0c] border border-[#dfb86c]/30 rounded-xl px-4 py-3 text-sm text-[#fdfbf7] focus:border-[#dfb86c] focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                        <option key={num} value={`Table ${num}`}>
                          {language === 'bn' ? `টেবিল নং ${num} (জলছবি ক্যাফে)` : `Table ${num} (Jalchabi Cafe)`}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="sm:col-span-2 space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#8fa69d] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#dfb86c]" />
                      <span>{t.ordering.addressLabel}</span>
                    </label>

                    {/* 1-Tap Quick Landmark Selector for Rural Visitors */}
                    <div className="flex flex-wrap gap-1.5 pb-1">
                      {[
                        'সারবেড়িয়া মেইন মার্কেট',
                        'আঠারোবাঁকি মোড়',
                        'ক্যানিং ২ ব্লক রোড',
                        'সুন্দরবন রোড',
                        'হাসপাতাল চত্বর',
                      ].map((landmark) => (
                        <button
                          key={landmark}
                          type="button"
                          onClick={() => {
                            soundFoley.playSwitchClick();
                            setDeliveryAddress(landmark);
                          }}
                          className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                            deliveryAddress.includes(landmark)
                              ? 'bg-[#dfb86c] text-[#070e0c] font-bold border-[#dfb86c]'
                              : 'bg-[#14241f] text-[#e5c378] border-[#dfb86c]/30 hover:border-[#dfb86c]'
                          }`}
                        >
                          📍 {landmark}
                        </button>
                      ))}
                    </div>

                    <input
                      type="text"
                      placeholder={t.ordering.addressPlaceholder}
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full bg-[#070e0c] border border-[#dfb86c]/30 rounded-xl px-4 py-3 text-sm text-[#fdfbf7] focus:border-[#dfb86c] focus:outline-none"
                    />
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#8fa69d] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#dfb86c]" />
                    <span>{t.ordering.nameLabel}</span>
                  </label>
                  <input
                    type="text"
                    placeholder={language === 'bn' ? 'আপনার নাম' : 'Your Name'}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#070e0c] border border-[#dfb86c]/30 rounded-xl px-4 py-2.5 text-sm text-[#fdfbf7] focus:border-[#dfb86c] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#8fa69d] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#dfb86c]" />
                    <span>{t.ordering.phoneLabel}</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-[#070e0c] border border-[#dfb86c]/30 rounded-xl px-4 py-2.5 text-sm text-[#fdfbf7] focus:border-[#dfb86c] focus:outline-none"
                  />
                </div>
              </div>

              {/* UPI QR & Payment Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#070e0c] border border-[#dfb86c]/20 flex flex-col sm:flex-row items-center gap-5">
                <div className="shrink-0 p-2 bg-white rounded-xl shadow-lg border border-[#dfb86c]/30">
                  <img
                    src={qrCodeUrl}
                    alt="PhonePe UPI QR Code"
                    className="w-32 h-32 sm:w-36 sm:h-36 object-contain"
                  />
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#14241f] text-[#e5c378] border border-[#dfb86c]/30">
                    <QrCode className="w-3 h-3 text-[#dfb86c]" />
                    <span>UPI ID: 8918948730@upi</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-serif text-[#fdfbf7]">
                    {t.ordering.payUpiTitle}
                  </h4>
                  <p className="text-xs text-[#8fa69d] leading-relaxed">
                    {t.ordering.payUpiSub}
                  </p>
                  <div className="pt-2">
                    <a
                      href={upiString}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#5f259f] hover:bg-[#722ebd] text-white text-xs font-semibold uppercase tracking-wider shadow-md min-h-[44px] transition-all cursor-pointer"
                    >
                      <span>PhonePe / GPay অ্যাপে সরাসরি পে করুন</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Order Summary Line */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-[#dfb86c]/20 pt-4 text-sm">
                <div>
                  <span className="text-xs text-[#8fa69d] block font-mono">
                    {cart.reduce((sum, i) => sum + i.quantity, 0)} {language === 'bn' ? 'পদ নির্বাচিত' : 'items selected'}
                  </span>
                  <span className="text-xl font-serif text-[#fdfbf7] font-semibold">
                    {t.ordering.total}: ₹{grandTotal}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleSendWhatsAppOrder}
                  className="px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 cursor-pointer min-h-[48px] active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.ordering.sendWhatsappOrder}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
