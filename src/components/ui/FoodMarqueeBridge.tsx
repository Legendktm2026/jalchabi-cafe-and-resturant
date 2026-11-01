import React from 'react';
import { Sparkles, ArrowDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const FoodMarqueeBridge: React.FC = React.memo(() => {
  const { language } = useLanguage();

  const marqueeItems = [
    language === 'bn' ? 'শাহি দম বিরিয়ানি' : 'Royal Mughlai Dum Biryani',
    '✦',
    language === 'bn' ? 'বাসন্তী পোলাও ও কষা মাংস' : 'Basanti Pulao & Kosha Mangsho',
    '✦',
    language === 'bn' ? 'কলকাতা ক্রিস্পি ভেটকি ফ্রাই' : 'Crispy Bhetki Fish Fry & Kasundi',
    '✦',
    language === 'bn' ? 'ট্যাংরা স্পেশাল ড্রামস অফ হেভেন' : 'Tangra Drums of Heaven',
    '✦',
    language === 'bn' ? 'আর্টিসানাল কলিতা পোরওভার কফি' : 'Artisanal Kalita Pourover Coffee',
    '✦',
    language === 'bn' ? 'মাটির ভাঁড়ের স্পেশাল মিষ্টি দই' : 'Clay-Pot Heritage Mishti Doi',
    '✦',
    language === 'bn' ? 'দার্জিলিং স্টিমড চিকেন মোমো' : 'Darjeeling Steamed Momos',
    '✦',
    language === 'bn' ? '১০০% খাঁটি সরিষার তেলে রান্না' : 'Pure Kachi Ghani Mustard & Cow Ghee',
    '✦',
  ];

  return (
    <div className="relative w-full bg-[#070e0c] text-[#f7e5b5] border-y border-[#dfb86c]/30 overflow-hidden py-3.5 z-20 select-none">
      {/* Background glow strip */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#7b1925]/25 via-transparent to-[#0a1e19]/30 pointer-events-none" />

      {/* Smooth continuous marquee */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {/* Sequence 1 */}
        <div className="flex items-center gap-6 sm:gap-8 px-4 shrink-0">
          {marqueeItems.map((text, i) => (
            <span
              key={`m1-${i}`}
              className={`text-xs sm:text-sm font-semibold tracking-wider uppercase whitespace-nowrap ${
                text === '✦' ? 'text-[#dfb86c]' : 'text-[#fdfbf7] font-serif-brand'
              }`}
            >
              {text}
            </span>
          ))}
        </div>

        {/* Duplicate Sequence 2 for seamless loop */}
        <div className="flex items-center gap-6 sm:gap-8 px-4 shrink-0" aria-hidden="true">
          {marqueeItems.map((text, i) => (
            <span
              key={`m2-${i}`}
              className={`text-xs sm:text-sm font-semibold tracking-wider uppercase whitespace-nowrap ${
                text === '✦' ? 'text-[#dfb86c]' : 'text-[#fdfbf7] font-serif-brand'
              }`}
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Floating Scroll Cue Hint for Desktop */}
      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#14241f]/90 border border-[#dfb86c]/30 text-[10px] font-bold tracking-wider text-[#f7e5b5] backdrop-blur-md shadow-lg">
        <Sparkles className="w-3 h-3 text-[#dfb86c]" />
        <span>{language === 'bn' ? 'জলছবির বিশেষ খাবারসমূহ' : 'SIGNATURE ARTISAN PAIRINGS'}</span>
        <ArrowDown className="w-3 h-3 text-[#dfb86c] animate-bounce" />
      </div>
    </div>
  );
});
