import React, { useState } from 'react';
import { RESTAURANT_DATA, MenuItem, MenuCategoryType } from '../../config/restaurantData';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { Sparkles, ArrowUpRight, Calendar, Award, Flame, Plus } from 'lucide-react';
import { AppleScrollReveal } from './AppleScrollReveal';
import { CardSpotlight } from './CardSpotlight';
import { FluidTabs, TabItem } from './FluidTabs';
import { MenuItemDetailModal } from './MenuItemDetailModal';
import { ShimmerBadge } from './ShimmerBadge';
import { MagneticButton } from './MagneticButton';
import { soundFoley } from '../../utils/soundFoley';

export const MenuSection: React.FC = React.memo(() => {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryType>('all');
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);

  const categories: TabItem<MenuCategoryType>[] = [
    { 
      key: 'all', 
      label: language === 'bn' ? 'সব পদ' : 'All Offerings', 
      count: RESTAURANT_DATA.menu.length 
    },
    { 
      key: 'momo', 
      label: language === 'bn' ? '🥟 দার্জিলিং মোমো' : '🥟 Momos' 
    },
    { 
      key: 'starters-crispy', 
      label: language === 'bn' ? '🍗 ফ্রাইড ও ড্রামস' : '🍗 Starters & Crispy' 
    },
    { 
      key: 'rolls-sandwiches', 
      label: language === 'bn' ? '🌯 কাঠি রোল ও স্যান্ডউইচ' : '🌯 Rolls & Sandwiches' 
    },
    { 
      key: 'burgers-pizzas', 
      label: language === 'bn' ? '🍔 বার্গার ও পিৎজা' : '🍔 Burgers & Pizzas' 
    },
    { 
      key: 'chinese-noodles', 
      label: language === 'bn' ? '🍜 চাইনিজ ও নুডলস' : '🍜 Chinese & Noodles' 
    },
    { 
      key: 'tandoori-indian', 
      label: language === 'bn' ? '🍛 তন্দুরি ও কারি' : '🍛 Tandoori & Curries' 
    },
    { 
      key: 'beverages-shakes', 
      label: language === 'bn' ? '🥤 শেক ও চা-কফি' : '🥤 Shakes & Brews' 
    },
  ];

  const filteredItems = selectedCategory === 'all'
    ? RESTAURANT_DATA.menu
    : RESTAURANT_DATA.menu.filter((item) => item.category === selectedCategory);

  return (
    <section id="menu" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070e0c] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <AppleScrollReveal className="text-center max-w-3xl mx-auto mb-12">
          <div className="mb-4 flex justify-center">
            <ShimmerBadge icon={<Award className="w-3.5 h-3.5 text-[#dfb86c]" />}>
              {t.menu.badge}
            </ShimmerBadge>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#fdfbf7] mb-3 tracking-wide">
            {t.menu.title}
          </h2>

          <p className="text-xs sm:text-sm font-serif text-[#e5c378] mb-4 tracking-widest uppercase">
            {t.menu.bengaliTitle}
          </p>

          <p className="text-sm sm:text-base text-[#8fa69d] max-w-2xl mx-auto leading-relaxed">
            {t.menu.subtitle}
          </p>

          {/* Authentic Local Guarantee */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#0e1b17] border border-[#dfb86c]/35 text-xs text-[#e5c378] shadow-lg">
            <Flame className="w-4 h-4 shrink-0 text-[#e5c378]" />
            <span>
              <strong>{language === 'bn' ? 'তাজা ও খাঁটি উপাদান:' : 'Fresh & Pure Quality:'}</strong> {t.menu.notice}
            </span>
          </div>
        </AppleScrollReveal>

        {/* Skiper UI-Style Fluid Category Filter Tabs */}
        <div className="flex justify-center pb-4 mb-12 overflow-x-auto no-scrollbar">
          <FluidTabs
            tabs={categories}
            activeTab={selectedCategory}
            onChange={(key) => {
              soundFoley.playSwitchClick();
              setSelectedCategory(key);
            }}
          />
        </div>

        {/* Menu Items Grid with Aceternity Card Spotlight & 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item: MenuItem, idx: number) => {
            return (
              <div
                key={item.id}
                style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 200px' }}
              >
                <AppleScrollReveal delayMs={(idx % 4) * 40}>
                  <CardSpotlight
                    data-dish-id={item.id}
                    onClick={() => {
                      item.category === 'beverages-shakes' ? soundFoley.playCoffeePour() : soundFoley.playPorcelainClink();
                      setActiveItem(item);
                    }}
                    onMouseEnter={() => {
                      item.category === 'beverages-shakes' ? soundFoley.playCoffeePour() : soundFoley.playPorcelainClink();
                    }}
                    className="group p-5 cursor-pointer flex flex-col sm:flex-row gap-5 h-full hover:shadow-[0_10px_35px_-5px_rgba(223,184,108,0.25)] transition-all bg-[#0e1b17]/90 border border-[#dfb86c]/20"
                  >
                  {/* Item Thumbnail */}
                  <div className="relative w-full sm:w-40 h-40 shrink-0 rounded-xl overflow-hidden bg-[#14241f]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />

                    {item.highlight && (
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gradient-to-r from-[#dfb86c] to-[#ebd08d] text-[#070e0c] flex items-center gap-1 shadow-md">
                        <Sparkles className="w-2.5 h-2.5" />
                        {language === 'bn' ? 'স্পেশাল' : 'Special'}
                      </span>
                    )}

                    {/* Quick View Badge Indicator */}
                    <span className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/60 text-[#e5c378] opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {/* Standard Indian Veg / Non-Veg Indicator for Instant Universal Recognition */}
                            {(() => {
                              const isVeg = item.dietary?.includes('Vegetarian') || 
                                            item.dietary?.includes('Vegan') || 
                                            item.category === 'beverages-shakes' || 
                                            item.name.toLowerCase().includes('paneer');
                              return (
                                <span 
                                  title={isVeg ? 'নিরামিষ (Vegetarian)' : 'আমিষ (Non-Vegetarian)'}
                                  className={`inline-flex items-center justify-center w-3.5 h-3.5 rounded-[3px] border shrink-0 ${
                                    isVeg ? 'border-emerald-500 bg-emerald-950/40' : 'border-red-500 bg-red-950/40'
                                  }`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full ${isVeg ? 'bg-emerald-400' : 'bg-red-400'}`} />
                                </span>
                              );
                            })()}
                            <h3 className="font-serif text-lg sm:text-xl font-medium text-[#fdfbf7] group-hover:text-[#e5c378] transition-colors leading-snug">
                              {language === 'bn' && item.bengaliName ? item.bengaliName : item.name}
                            </h3>
                          </div>
                          {item.bengaliName && language === 'en' && (
                            <p className="text-xs text-[#dfb86c] font-serif tracking-wide mt-0.5">
                              {item.bengaliName}
                            </p>
                          )}
                          {language === 'bn' && (
                            <p className="text-xs font-mono text-[#8fa69d] mt-0.5 tracking-wide">
                              {item.name}
                            </p>
                          )}
                        </div>
                        <span className="font-mono text-base font-semibold text-[#e5c378] shrink-0">
                          {item.price}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#8fa69d] leading-relaxed my-2 line-clamp-2">
                        {language === 'bn' && item.bengaliDescription ? item.bengaliDescription : item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#dfb86c]/15">
                      {/* Dietary Badges */}
                      <div className="flex flex-wrap gap-1.5">
                        {item.dietary && item.dietary.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-[#14241f] border border-[#dfb86c]/20 text-[#8fa69d]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart({
                              id: item.id,
                              name: item.name,
                              bengaliName: item.bengaliName,
                              price: item.numericPrice,
                              image: item.image,
                            });
                          }}
                          className="px-3.5 py-2 rounded-full text-xs font-semibold bg-[#dfb86c]/20 hover:bg-[#dfb86c] text-[#e5c378] hover:text-[#070e0c] border border-[#dfb86c]/40 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 min-h-[40px]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{t.menu.addToCart}</span>
                        </button>

                        <span className="text-[11px] text-[#dfb86c] font-medium group-hover:underline flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          <span>{t.menu.viewDetails}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </CardSpotlight>
              </AppleScrollReveal>
              </div>
            );
          })}
        </div>

        {/* Reservation Quick Prompt with Magnetic Button */}
        <div className="mt-14 text-center">
          <MagneticButton
            onClick={() => {
              const el = document.getElementById('reservations');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#dfb86c]/40 bg-gradient-to-r from-[#dfb86c] to-[#c99e52] px-8 py-3 text-sm font-medium text-[#070e0c] shadow-xl shadow-[#dfb86c]/25 hover:brightness-105 transition-all font-serif tracking-wide cursor-pointer font-bold">
              <Calendar className="w-4 h-4 text-[#070e0c]" />
              <span>{language === 'bn' ? 'টেবিল বুকিং করুন' : 'Reserve a Table at Jalchabi'}</span>
              <ArrowUpRight className="w-4 h-4 text-[#070e0c]" />
            </div>
          </MagneticButton>
        </div>
      </div>

      {/* Tasting & Gastronomy Details Modal */}
      <MenuItemDetailModal
        item={activeItem}
        onClose={() => setActiveItem(null)}
      />
    </section>
  );
});
