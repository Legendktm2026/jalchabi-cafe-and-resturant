import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Plus, Check, Clock, Flame, Award, Droplets, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { soundFoley } from '../../utils/soundFoley';

export interface OrbitalDish {
  id: string;
  cartItemId: string;
  name: string;
  bengaliName: string;
  badge: string;
  bengaliBadge: string;
  stepNumber: string;
  price: number;
  originalPrice: number;
  savings: number;
  mainImage: string;
  beverageImage: string;
  ingredientPhoto?: string;
  beverageName: string;
  quote: string;
  bengaliQuote: string;
  description: string;
  bengaliDescription: string;
  proofTime: string;
  cookingStyle: string;
  flavors: string[];
  benchmarks: { label: string; value: string }[];
}

export const OrbitalDishShowcase: React.FC = React.memo(() => {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const dishes: OrbitalDish[] = [
    {
      id: 'shahi-biryani-duo',
      cartItemId: 'mb-01',
      name: 'Royal Mutton Dum Biryani Duo',
      bengaliName: 'শাহি মাটন দম বিরিয়ানি ও দই জুটি',
      badge: 'Kolkata Nawabi Heritage',
      bengaliBadge: 'নওয়াবি ঐতিহ্য',
      stepNumber: '01 / 04',
      price: 349,
      originalPrice: 399,
      savings: 50,
      mainImage: '/images/food/m-biryani-mutton.jpg',
      beverageImage: '/images/food/m-gondhoraj-brew.jpg',
      ingredientPhoto: '/images/food/raw-coffee-beans.jpg',
      beverageName: 'Gondhoraj Refreshing Cooler',
      quote: 'Long-grain aged Basmati steamed over slow embers with tender mutton and golden braised potato.',
      bengaliQuote: 'ঘিয়ে সুবাসিত দেরাদুন বাসমতী চাল, নরম কচি মাটন এবং বিরিয়ানির স্পেশাল ভাজা আলু।',
      description:
        'Our ustaads seal hand-hammered copper deghs with soft dough, trapping rich saffron vapours and aromatic meetha attar over charcoal embers in authentic Kolkata tradition.',
      bengaliDescription:
        'সিল করা তামার ডেকে খাঁটি কাশ্মীরি জাফরান ও ধনেপাতার সুবাসে ধিমে আঁচে রান্না করা কলকাতা স্পেশাল দম বিরিয়ানি।',
      proofTime: '36-Hour Marination',
      cookingStyle: 'Clay Charcoal Dum',
      flavors: ['Kashmir Saffron', 'Tender Mutton', 'Caramelized Onion', 'Meetha Attar'],
      benchmarks: [
        { label: 'Basmati Rice', value: '2-Year Aged Extra Long' },
        { label: 'Saffron Grade', value: 'Mongra GI Certified' },
        { label: 'Potato Prep', value: 'Slow-Braised in Yakhni' },
        { label: 'Dum Technique', value: 'Dough-Sealed Copper Degh' },
      ],
    },
    {
      id: 'basanti-pulao-kosha',
      cartItemId: 'mb-02',
      name: 'Basanti Pulao & Kosha Mangsho Duo',
      bengaliName: 'বাসন্তী পোলাও ও খাসির কষা মাংস',
      badge: 'Bengal Rajbari Heritage',
      bengaliBadge: 'রাজবাড়ির ঘরানা',
      stepNumber: '02 / 04',
      price: 389,
      originalPrice: 439,
      savings: 50,
      mainImage: '/images/food/m-biryani-chicken.jpg',
      beverageImage: '/images/food/pairing-iced-latte.jpg',
      beverageName: 'Artisanal Cold Crema Latte',
      quote: 'Fragrant sweet Gobindobhog rice scented with Jharna ghee, paired with velvety dark spiced mutton.',
      bengaliQuote: 'ঝরনা ঘিয়ে মাখা সুগন্ধি গোবিন্দভোগ চাল এবং কষা মশলায় ভুনা রসালো খাসির মাংস।',
      description:
        'Short-grain golden Gobindobhog rice tossed with whole cloves, cardamom, cashews, and raisins, served alongside rich mutton slow-cooked in heavy iron kadais.',
      bengaliDescription:
        'কাজু-কিশমিশ ও দারুচিনির মিষ্টি সুবাসে তৈরি পোলাও, সাথে লোহার কড়াইয়ে ৪ ঘণ্টা কষানো গাঢ় লাল খাসির মাংস।',
      proofTime: '4-Hour Iron Kadai Bhuna',
      cookingStyle: 'Pure Jharna Cow Ghee',
      flavors: ['Sweet Cow Ghee', 'Dark Spiced Bhuna', 'Whole Clove', 'Golden Raisins'],
      benchmarks: [
        { label: 'Heritage Grain', value: 'Aromatic Gobindobhog' },
        { label: 'Ghee Source', value: 'Pure Cow Jharna Ghee' },
        { label: 'Mutton Cut', value: 'Tender Rib & Shank' },
        { label: 'Gravy Base', value: 'Slow Onion-Ginger Reduction' },
      ],
    },
    {
      id: 'crispy-bhetki-kasundi',
      cartItemId: 'cc-02',
      name: 'Crispy Bhetki Fish Fry & Kasundi Duo',
      bengaliName: 'ক্রিস্পি ভেটকি ফ্রাই ও কলিতা কফি',
      badge: 'Kolkata Cabin Heritage',
      bengaliBadge: 'ঐতিহ্যবাহী কেবিন স্টাইল',
      stepNumber: '03 / 04',
      price: 199,
      originalPrice: 249,
      savings: 50,
      mainImage: '/images/food/m-fish-fry.jpg',
      beverageImage: '/images/food/m-cold-coffee.jpg',
      beverageName: 'Signature Iced Kalita Coffee',
      quote: 'Pure Kolkata sea-Bhetki fillet marinated in fresh coriander & chillies, double-crumbed to feather-crisp perfection.',
      bengaliQuote: 'খাঁটি ভেটকি মাছের ফিলে, তাজা ধনেপাতা ও কাঁচালঙ্কার মেরিনেশন এবং মুচমুচে পাউরুটির কোটিং।',
      description:
        'Crisped in fragrant mustard oil, our Bhetki fry pairs an impossibly crunchy golden crust with flaky, tender fish that dissolves on the tongue with artisanal Kasundi mustard.',
      bengaliDescription:
        'ঝাঁঝালো খাঁটি কাসুন্দি ও কাঁচা পেঁয়াজের সাথে পরিবেশিত কলকাতার বনেদি কেবিন স্বাদের এক নম্বর ভেটকি ফ্রাই।',
      proofTime: 'Fresh Morning Catch',
      cookingStyle: 'Crisped in Kachi Ghani',
      flavors: ['Flaky Kolkata Bhetki', 'Pungent Kasundi Dip', 'Panko Gold Crunch', 'Coriander Herb'],
      benchmarks: [
        { label: 'Fish Origin', value: 'Pure Saltwater Bhetki' },
        { label: 'Crumb Coating', value: 'Double Crisp Panko' },
        { label: 'Mustard Dip', value: 'Artisanal Kasundi' },
        { label: 'Frying Medium', value: 'First-Press Mustard Oil' },
      ],
    },
    {
      id: 'tangra-drums-heaven',
      cartItemId: 'cc-01',
      name: 'Tangra Drums of Heaven & Darjeeling Duo',
      bengaliName: 'ট্যাংরা ড্রামস অফ হেভেন ও চা',
      badge: 'Kolkata Chinatown Legend',
      bengaliBadge: 'ট্যাংরা চায়নাটাউন',
      stepNumber: '04 / 04',
      price: 239,
      originalPrice: 289,
      savings: 50,
      mainImage: '/images/food/m-drums-of-heaven.jpg',
      beverageImage: '/images/food/m-darjeeling-tea.jpg',
      beverageName: 'First Flush Darjeeling Tea',
      quote: 'Juicy chicken winglet lollipops tossed in a blistered garlic, scallion, and dark soya glaze over high wok flame.',
      bengaliQuote: 'গরম চাইনিজ ওকের ধোঁয়ায় রসুন, স্প্রিং অনিয়ন ও ডার্ক সয়া সসে টস করা মুচমুচে ড্রামস অফ হেভেন।',
      description:
        'Directly inspired by Tangra, Kolkata’s historic Chinatown. Each winglet is fried until crackling crisp, then flashed through high-heat wok breath with fiery crushed dry red chillies.',
      bengaliDescription:
        'দার্জিলিং ফ্রেশ চায়ের সাথে পরিবেশিত কলকাতার ঐতিহাসিক ট্যাংরা চায়নাটাউনের খাঁটি স্বাদের স্পেশাল চিকেন।',
      proofTime: 'High-BTU Wok Toss',
      cookingStyle: 'Cast-Iron Flame Glaze',
      flavors: ['Wok-Hei Smoke', 'Crushed Garlic Chilli', 'Sweet Dark Soya', 'Spring Scallions'],
      benchmarks: [
        { label: 'Chicken Cut', value: 'Hand-Trimmed Lollipops' },
        { label: 'Glaze Recipe', value: 'Tangra Secret Soya-Chilli' },
        { label: 'Wok Heat', value: '300°C Cast-Iron Breath' },
        { label: 'Tea Pairing', value: 'Makaibari Darjeeling Leaf' },
      ],
    },
  ];

  const currentDish = dishes[activeIndex] || dishes[0];

  const handleNext = () => {
    soundFoley.playSwitchClick();
    setActiveIndex((prev) => (prev + 1) % dishes.length);
  };

  const handlePrev = () => {
    soundFoley.playSwitchClick();
    setActiveIndex((prev) => (prev - 1 + dishes.length) % dishes.length);
  };

  const handleOrderDuo = (dish: OrbitalDish) => {
    soundFoley.playPorcelainClink();
    addToCart({
      id: dish.cartItemId,
      name: dish.name,
      bengaliName: dish.bengaliName,
      price: dish.price,
      image: dish.mainImage,
    });
    setAddedItem(dish.id);
    setTimeout(() => {
      setAddedItem(null);
    }, 1800);
  };

  return (
    <section
      id="pairings"
      className="relative w-full bg-[#070e0c] text-[#fdfbf7] select-none border-b border-[#dfb86c]/20 py-16 sm:py-20 lg:py-24 overflow-hidden"
    >
      {/* Warm Ambient Halo Glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#7b1925]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#0a1e19]/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Header Bar: Editorial Title & Step Indicators */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#dfb86c]/25 pb-5 mb-8 sm:mb-12">
          <div>
            <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#e5c378] flex items-center gap-2 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#dfb86c]" />
              <span>{language === 'bn' ? 'জলছবির বিশেষ সিগনেচার জুটি' : 'Interactive Orbital Dish Showcase'}</span>
            </div>
            <h2 className="font-serif-brand text-2xl sm:text-4xl lg:text-5xl font-black text-[#f7e5b5] tracking-tight leading-tight">
              {language === 'bn' ? 'বাংলার বনেদি স্বাদ ও পানীয়' : 'The Signature Culinary Pairings'}
            </h2>
          </div>

          {/* Stepper Pill Selector Strip (Smooth touch pan & click) */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar touch-pan-x pb-1">
            {dishes.map((dish, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={dish.id}
                  onClick={() => {
                    soundFoley.playSwitchClick();
                    setActiveIndex(idx);
                  }}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 whitespace-nowrap min-h-[40px] ${
                    isActive
                      ? 'bg-gradient-to-r from-[#dfb86c] to-[#ebd08d] text-[#070e0c] shadow-lg shadow-[#dfb86c]/25 scale-105'
                      : 'bg-[#0e1b17]/90 text-[#8fa69d] hover:text-[#fdfbf7] border border-[#dfb86c]/20 hover:bg-[#14241f]'
                  }`}
                >
                  <span className="text-[10px] opacity-80 font-mono font-bold">{idx + 1}</span>
                  <span className="font-medium">{language === 'bn' ? dish.bengaliBadge : dish.badge}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Stage Grid: Left = Orbital Rotating Plate, Right = Fraunces Editorial Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT: 3D Orbital Plate Arena (7 Cols on desktop, full width on mobile) */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[260px] xs:min-h-[300px] sm:min-h-[400px] md:min-h-[460px]">
            {/* Dashed Orbital Compass Track with Slow Celestial Spin */}
            <div className="absolute w-[240px] h-[240px] xs:w-[280px] xs:h-[280px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] rounded-full border border-dashed border-[#dfb86c]/25 pointer-events-none animate-spin-slow">
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#dfb86c] border border-[#f7e5b5] shadow-sm flex items-center justify-center text-[8px] font-bold text-[#070e0c]">
                ✦
              </span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#0a1e19] border border-[#dfb86c]/50" />
            </div>

            {/* Central Amber Spotlight Glow */}
            <div className="absolute w-48 h-48 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-[#dfb86c]/25 via-transparent to-[#f7e5b5]/10 blur-2xl pointer-events-none" />

            {/* Central Animated Rotating Dish Plate */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDish.id}
                initial={{ opacity: 0, scale: 0.8, rotate: -35 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 35 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-20 flex items-center justify-center"
              >
                {/* Outer Dish Plate Disc with Ceramic Lip & Shimmer Border */}
                <div className="relative w-44 h-44 xs:w-56 xs:h-56 sm:w-72 sm:h-72 md:w-84 md:h-84 rounded-full p-2.5 sm:p-3.5 bg-gradient-to-tr from-[#14241f] via-[#0e1b17] to-[#dfb86c]/30 shadow-[0_25px_80px_rgba(0,0,0,0.85)] border-2 border-[#dfb86c]/40">
                  <div className="w-full h-full rounded-full overflow-hidden border border-[#dfb86c]/60 bg-[#070e0c] relative shadow-inner">
                    <img
                      src={currentDish.mainImage}
                      alt={currentDish.name}
                      className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 hover:scale-105"
                      loading="eager"
                    />
                    {/* Depth Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070e0c]/70 via-transparent to-[#f7e5b5]/10 pointer-events-none" />

                    {/* Badge Pill on Plate Top */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#070e0c]/90 backdrop-blur-md border border-[#dfb86c]/50 text-[9.5px] sm:text-[10.5px] font-bold text-[#f7e5b5] flex items-center gap-1.5 shadow-xl whitespace-nowrap">
                      <Award className="w-3 h-3 text-[#dfb86c]" />
                      <span>{language === 'bn' ? currentDish.bengaliBadge : currentDish.badge}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Paired Beverage Accent Card (Drifts on Bottom Right) */}
            <div className="absolute -bottom-2 right-1 sm:bottom-4 sm:right-6 md:bottom-8 md:right-10 w-22 h-30 sm:w-36 sm:h-48 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#dfb86c]/40 bg-[#070e0c] z-30 pointer-events-none">
              <img
                src={currentDish.beverageImage}
                alt={currentDish.beverageName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070e0c]/95 via-[#070e0c]/30 to-transparent" />
              <div className="absolute bottom-2 left-1.5 right-1.5 text-center">
                <span className="text-[7.5px] sm:text-[8.5px] uppercase font-bold tracking-wider text-[#dfb86c] block">
                  {language === 'bn' ? 'স্পেশাল পানীয়' : 'Paired Extract'}
                </span>
                <span className="text-[9.5px] sm:text-[11px] font-bold text-[#fdfbf7] truncate block">
                  {currentDish.beverageName}
                </span>
              </div>
            </div>

            {/* Navigation Arrows for Quick Thumb Tapping */}
            <div className="absolute inset-x-0 flex items-center justify-between pointer-events-none px-2 z-40">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous pairing"
                className="pointer-events-auto p-2 sm:p-3 rounded-full bg-[#0e1b17]/90 border border-[#dfb86c]/40 text-[#fdfbf7] hover:bg-[#dfb86c] hover:text-[#070e0c] transition-all cursor-pointer shadow-lg active:scale-95"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next pairing"
                className="pointer-events-auto p-2 sm:p-3 rounded-full bg-[#0e1b17]/90 border border-[#dfb86c]/40 text-[#fdfbf7] hover:bg-[#dfb86c] hover:text-[#070e0c] transition-all cursor-pointer shadow-lg active:scale-95"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* RIGHT: Synchronized Editorial Card & Direct Cart CTA (5 Cols on desktop) */}
          <div className="lg:col-span-5 relative flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDish.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="w-full space-y-3.5 sm:space-y-4 bg-[#0e1b17]/85 p-5 sm:p-7 rounded-3xl border border-[#dfb86c]/30 shadow-2xl backdrop-blur-md"
              >
                {/* Step & Savings Header */}
                <div className="flex items-center justify-between border-b border-[#dfb86c]/20 pb-2">
                  <span className="text-xs font-bold tracking-widest text-[#f7e5b5] uppercase flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-[#dfb86c]" />
                    <span>{currentDish.stepNumber}</span>
                  </span>
                  <span className="text-[11px] font-bold text-[#070e0c] bg-[#e5c378] px-3 py-0.5 rounded-full shadow-sm">
                    {language === 'bn' ? `সেভ ₹${currentDish.savings} জুটি অফার` : `Save ₹${currentDish.savings} as pairing`}
                  </span>
                </div>

                {/* Dish Title & Headline Quote */}
                <div>
                  <span className="text-[11px] uppercase font-bold tracking-wider text-[#dfb86c] block mb-1">
                    {language === 'bn' ? currentDish.bengaliBadge : currentDish.badge}
                  </span>
                  <h3 className="font-serif-brand text-xl sm:text-2xl lg:text-3xl font-black text-[#f7e5b5] leading-tight mb-1.5">
                    {language === 'bn' ? currentDish.bengaliName : currentDish.name}
                  </h3>
                  <p className="font-serif text-sm sm:text-base text-[#e5c378] italic leading-snug">
                    "{language === 'bn' ? currentDish.bengaliQuote : currentDish.quote}"
                  </p>
                </div>

                {/* Editorial Narrative */}
                <p className="text-xs sm:text-sm text-[#8fa69d] leading-relaxed">
                  {language === 'bn' ? currentDish.bengaliDescription : currentDish.description}
                </p>

                {/* Flavor Notes Tag Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentDish.flavors.map((flavor, fIdx) => (
                    <span
                      key={fIdx}
                      className="px-2.5 py-1 rounded-lg bg-[#14241f] border border-[#dfb86c]/25 text-[10.5px] font-medium text-[#f7e5b5]"
                    >
                      ✦ {flavor}
                    </span>
                  ))}
                </div>

                {/* Craft Benchmarks (Proof time & Cooking style) */}
                <div className="grid grid-cols-2 gap-2 py-2.5 border-y border-[#dfb86c]/20">
                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#dfb86c] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-[#fdfbf7] block">
                        {currentDish.proofTime}
                      </span>
                      <span className="text-[9.5px] text-[#8fa69d] font-medium">
                        {language === 'bn' ? 'রান্নার প্রস্তুতি' : 'Artisan Prep'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Flame className="w-3.5 h-3.5 text-[#dfb86c] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-[#fdfbf7] block">
                        {currentDish.cookingStyle}
                      </span>
                      <span className="text-[9.5px] text-[#8fa69d] font-medium">
                        {language === 'bn' ? 'রান্নার মাধ্যম' : 'Flame & Medium'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Benchmarks Detail Mini Grid (Desktop & Tablet) */}
                <div className="hidden sm:grid grid-cols-2 gap-2 text-[11px] text-[#8fa69d] bg-[#070e0c]/70 p-3 rounded-xl border border-[#dfb86c]/20">
                  {currentDish.benchmarks.map((bm, bIdx) => (
                    <div key={bIdx} className="flex flex-col">
                      <span className="text-[9px] uppercase tracking-wider text-[#dfb86c] font-bold">
                        {bm.label}
                      </span>
                      <span className="font-medium text-[#fdfbf7] truncate">{bm.value}</span>
                    </div>
                  ))}
                </div>

                {/* Pricing & Add to Order CTA */}
                <div className="pt-2">
                  <div className="flex items-baseline justify-between mb-2.5">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif-brand text-2xl sm:text-3xl font-black text-[#f7e5b5] tabular-nums">
                        ₹{currentDish.price}
                      </span>
                      <span className="text-xs text-[#8fa69d] line-through tabular-nums">
                        ₹{currentDish.originalPrice}
                      </span>
                      <span className="text-[10.5px] text-[#e5c378] font-medium">
                        {language === 'bn' ? '(খাবার + পানীয় কম্বো)' : '(Duo Pairing Special)'}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-[#070e0c] bg-[#dfb86c] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Chef Selected
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOrderDuo(currentDish)}
                    className="w-full py-3.5 sm:py-4 bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] hover:brightness-110 text-[#070e0c] font-bold text-xs sm:text-sm tracking-wider uppercase rounded-2xl shadow-xl shadow-[#dfb86c]/25 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
                  >
                    {addedItem === currentDish.id ? (
                      <>
                        <Check className="w-4 h-4 text-[#070e0c]" />
                        <span>{language === 'bn' ? 'অর্ডারে যোগ করা হয়েছে!' : 'Added to Order!'}</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 text-[#070e0c]" />
                        <span>
                          {language === 'bn'
                            ? `অর্ডার করুন ${currentDish.bengaliName.split(' ')[0]} — ₹${currentDish.price}`
                            : `Order ${currentDish.name.split(' ')[0]} Duo — ₹${currentDish.price}`}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
});
