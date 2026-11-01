import React, { useState, useEffect } from 'react';
import { RESTAURANT_DATA, PromotionalCombo } from '../../config/restaurantData';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { soundFoley } from '../../utils/soundFoley';
import { AppleScrollReveal } from './AppleScrollReveal';
import { CardSpotlight } from './CardSpotlight';
import { ShimmerBadge } from './ShimmerBadge';
import { Sparkles, Clock, Flame, ShoppingBag, ArrowRight, Check } from 'lucide-react';

export const PromotionalOffersSection: React.FC = React.memo(() => {
  const { language, t } = useLanguage();
  const { addToCart, setIsCartOpen } = useCart();
  const [addedComboId, setAddedComboId] = useState<string | null>(null);

  // Dynamic Live Weekend Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // Calculate target: coming Sunday at 23:59:59 IST
      const dayOfWeek = now.getDay(); // 0 is Sunday, 6 is Saturday
      const daysUntilSunday = (7 - dayOfWeek) % 7;
      const target = new Date(now);
      target.setDate(now.getDate() + (daysUntilSunday === 0 && now.getHours() >= 23 ? 7 : daysUntilSunday));
      target.setHours(23, 59, 59, 999);

      const diff = Math.max(0, target.getTime() - now.getTime());
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddCombo = (combo: PromotionalCombo) => {
    soundFoley.playSwitchClick();
    addToCart({
      id: combo.id,
      name: combo.title,
      bengaliName: combo.bengaliTitle,
      price: combo.comboPrice,
      image: combo.image,
    });
    setAddedComboId(combo.id);
    setTimeout(() => {
      setAddedComboId(null);
      setIsCartOpen(true);
    }, 800);
  };

  return (
    <section
      id="promotions"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#070e0c] border-t border-[#dfb86c]/20 overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#dfb86c]/10 via-[#7b1925]/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <ShimmerBadge>
            <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[#e5c378]">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>{t.promotions.badge}</span>
            </span>
          </ShimmerBadge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#fdfbf7] tracking-tight">
            {t.promotions.title}
          </h2>

          <p className="text-sm sm:text-base text-[#8fa69d] leading-relaxed">
            {t.promotions.subtitle}
          </p>

          {/* Live Weekend Countdown Ribbon */}
          <div className="pt-4">
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-3 rounded-2xl bg-[#0e1b17] border border-[#dfb86c]/30 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#e5c378]">
                <Clock className="w-4 h-4 text-[#dfb86c] animate-pulse" />
                <span>{t.promotions.weekendTimerLabel}</span>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#fdfbf7]">
                <span className="px-2.5 py-1 rounded-lg bg-[#14241f] border border-[#dfb86c]/30 text-[#f7e5b5]">
                  {String(timeLeft.days).padStart(2, '0')} {t.promotions.days}
                </span>
                <span>:</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#14241f] border border-[#dfb86c]/30 text-[#f7e5b5]">
                  {String(timeLeft.hours).padStart(2, '0')} {t.promotions.hours}
                </span>
                <span>:</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#14241f] border border-[#dfb86c]/30 text-[#f7e5b5]">
                  {String(timeLeft.minutes).padStart(2, '0')} {t.promotions.minutes}
                </span>
                <span>:</span>
                <span className="px-2.5 py-1 rounded-lg bg-[#14241f] border border-[#dfb86c]/30 text-[#f7e5b5]">
                  {String(timeLeft.seconds).padStart(2, '0')} {t.promotions.seconds}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Combo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {RESTAURANT_DATA.combos.map((combo, idx) => {
            const isAdded = addedComboId === combo.id;

            return (
              <AppleScrollReveal key={combo.id} delayMs={idx * 150}>
                <CardSpotlight className="h-full rounded-3xl bg-[#0e1b17]/90 border border-[#dfb86c]/25 overflow-hidden flex flex-col justify-between group hover:border-[#dfb86c]/60 transition-all duration-300">
                  {/* Photo Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-[#070e0c]">
                    <img
                      src={combo.image}
                      alt={combo.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e1b17] via-black/20 to-black/30" />

                    {/* Badge */}
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/75 border border-[#dfb86c]/40 text-[#e5c378] backdrop-blur-md">
                      <Sparkles className="w-3 h-3 text-[#dfb86c]" />
                      <span>{language === 'bn' ? combo.bengaliBadge : combo.badge}</span>
                    </div>

                    {/* Savings Pill */}
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-bold font-mono bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg">
                      {language === 'bn' ? `সাশ্রয় ₹${combo.savings}` : `SAVE ₹${combo.savings}`}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-baseline justify-between">
                        <h3 className="font-serif text-xl sm:text-2xl text-[#fdfbf7] font-medium leading-snug">
                          {language === 'bn' ? combo.bengaliTitle : combo.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-2xl font-bold text-[#e5c378]">
                          ₹{combo.comboPrice}
                        </span>
                        <span className="text-sm line-through text-[#8fa69d]/60">
                          ₹{combo.originalPrice}
                        </span>
                      </div>

                      <p className="text-xs text-[#8fa69d] leading-relaxed">
                        {language === 'bn' ? combo.bengaliTagline : combo.tagline}
                      </p>

                      {/* Included Items List */}
                      <div className="pt-2 border-t border-[#dfb86c]/15 space-y-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#dfb86c] block">
                          {t.promotions.itemsIncludedLabel}
                        </span>
                        {(language === 'bn' ? combo.bengaliItemsIncluded : combo.itemsIncluded).map((it, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-[#fdfbf7]">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{it}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 border-t border-[#dfb86c]/15">
                      <button
                        type="button"
                        onClick={() => handleAddCombo(combo)}
                        disabled={isAdded}
                        className={`w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] text-[#070e0c] hover:shadow-[0_0_20px_rgba(223,184,108,0.4)]'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>{language === 'bn' ? 'যোগ করা হয়েছে' : 'Added to Cart'}</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" />
                            <span>{t.promotions.addComboToCart}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </CardSpotlight>
              </AppleScrollReveal>
            );
          })}
        </div>

        {/* Small Notice */}
        <p className="text-center text-xs font-mono text-[#8fa69d]/70 pt-4">
          {t.promotions.offerValidNotice}
        </p>
      </div>
    </section>
  );
});
