import React, { useState } from 'react';
import { RESTAURANT_DATA, MenuItem } from '../../config/restaurantData';
import { Coffee, AlertCircle, Sparkles } from 'lucide-react';
import { AppleScrollReveal } from './AppleScrollReveal';

type MenuCategory = 'all' | 'coffee' | 'specialty' | 'brunch' | 'mains' | 'dessert';

export const MenuSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');

  const categories: { key: MenuCategory; label: string }[] = [
    { key: 'all', label: 'All Offerings' },
    { key: 'coffee', label: 'Specialty Coffee' },
    { key: 'specialty', label: 'House Signatures' },
    { key: 'brunch', label: 'Artisanal Brunch' },
    { key: 'mains', label: 'Contemporary Mains' },
    { key: 'dessert', label: 'Patisserie & Desserts' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? RESTAURANT_DATA.menu
    : RESTAURANT_DATA.menu.filter((item) => item.category === selectedCategory);

  return (
    <section id="menu" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#16100b] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <AppleScrollReveal className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#c58b4b]/15 text-[#e6be8a] mb-4 border border-[#c58b4b]/30">
            <Coffee className="w-3.5 h-3.5" />
            <span>Curated Gastronomy</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#f5efe6] mb-4 tracking-wide">
            The Seasonal Kitchen &amp; Brew Bar
          </h2>

          <p className="text-sm sm:text-base text-[#c9bea9] max-w-xl mx-auto">
            A harmonious synthesis of Indian estate roasts, European fermentation traditions, and seasonal regional produce.
          </p>

          {/* Sample Data Disclaimer Alert */}
          <div className="mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#281e17]/80 border border-[#c58b4b]/30 text-xs text-[#e6be8a]">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#c58b4b]" />
            <span>
              <strong>Sample Concept Menu:</strong> Dish selections and prices reflect our proposed culinary direction and await final verification for Kolkata.
            </span>
          </div>
        </AppleScrollReveal>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-[#c58b4b] text-[#120d09] shadow-[0_0_15px_rgba(197,139,75,0.35)]'
                  : 'bg-[#1f1611] text-[#c9bea9] hover:text-[#f5efe6] border border-[#c58b4b]/20 hover:border-[#c58b4b]/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item: MenuItem, idx: number) => (
            <AppleScrollReveal key={item.id} delayMs={(idx % 4) * 80}>
              <div
                className="group relative rounded-2xl glass-panel p-5 border border-[#c58b4b]/20 hover:border-[#c58b4b]/50 apple-card-hover flex flex-col sm:flex-row gap-5 h-full"
              >
                {/* Item Thumbnail */}
                <div className="relative w-full sm:w-36 h-36 shrink-0 rounded-xl overflow-hidden bg-[#1f1611]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {item.highlight && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#c58b4b] text-[#120d09] flex items-center gap-1 shadow-md">
                      <Sparkles className="w-2.5 h-2.5" />
                      Signature
                    </span>
                  )}
                </div>

                {/* Item Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-1.5">
                      <h3 className="font-serif text-lg sm:text-xl font-medium text-[#f5efe6] group-hover:text-[#e6be8a] transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-mono text-base font-semibold text-[#e6be8a] shrink-0">
                        {item.price}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#c9bea9] leading-relaxed mb-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Dietary Badges */}
                  {item.dietary && item.dietary.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#c58b4b]/10">
                      {item.dietary.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-[#251b14] border border-[#c58b4b]/20 text-[#c9bea9]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </AppleScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
