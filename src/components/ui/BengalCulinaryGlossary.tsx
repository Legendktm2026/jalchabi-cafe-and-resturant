import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { AppleScrollReveal } from './AppleScrollReveal';
import { ShimmerBadge } from './ShimmerBadge';
import { Sparkles, UtensilsCrossed, Leaf, Flame, HeartHandshake } from 'lucide-react';

interface GlossaryEntry {
  id: string;
  termEn: string;
  termBn: string;
  taglineEn: string;
  taglineBn: string;
  descriptionEn: string;
  descriptionBn: string;
  icon: React.ReactNode;
}

const GLOSSARY_ITEMS: GlossaryEntry[] = [
  {
    id: 'biryani-aloo',
    termEn: 'The Golden Aloo & Meetha Attar in Kolkata Biryani',
    termBn: 'কলকাতা বিরিয়ানির তুলতুলে আলু ও মিঠা আতর',
    taglineEn: 'Royal Awadhi Exile Tradition (1856)',
    taglineBn: 'নবাব ওয়াজেদ আলী শাহের মেটিয়াবুরুজের রাজকীয় ঐতিহ্য',
    descriptionEn: 'When the exiled Nawab of Awadh arrived in Metiabruz (Kolkata), royal cooks slow-simmered whole golden potatoes in saffron stock. The potato absorbs the rich meat essence and fragrant meetha attar, making it the beloved soul of authentic Kolkata Biryani.',
    descriptionBn: '১৮৫৬ সালে অবধের শেষ নবাব ওয়াজেদ আলী শাহ মেটিয়াবুরুজে এসে বাসমতী ও জাফরানের সাথে গোটা আলু ধিমে আঁচে রান্না করেন। মাংসের নির্যাস ও সুগন্ধি ঘি টেনে নিয়ে এই তুলতুলে আলু কলকাতার বিরিয়ানিকে পৃথিবীর অন্যতম অনন্য স্বাদে রূপান্তর করেছে।',
    icon: <UtensilsCrossed className="w-5 h-5 text-[#dfb86c]" />,
  },
  {
    id: 'kasundi',
    termEn: 'Pungent Homemade Kasundi Mustard',
    termBn: 'ঐতিহ্যবাহী ঝাঁঝালো খাঁটি কাসুন্দি',
    taglineEn: "Bengal's Queen of Fermented Condiments",
    taglineBn: 'কাঁচা আম ও সরিষার ঝাঁঝালো বাঙালি সস',
    descriptionEn: 'An ancient Bengal culinary staple prepared from fermented whole black and yellow mustard seeds with sour raw mango and wild spices. Its nasal pungency perfectly balances crispy Bengal Bhetki fish fry and kathi rolls.',
    descriptionBn: 'বাঙালির অত্যন্ত প্রিয় ঐতিহ্যবাহী সস। কাঁচা আম, সর্ষে ও বিশেষ মশলায় তৈরি এর তীব্র ঝাঁঝ ও অম্ল স্বাদ মচমচে ভেটকি ফিশ ফ্রাই ও গরম রোলকে এনে দেয় অবিস্মরণীয় তৃপ্তি।',
    icon: <Flame className="w-5 h-5 text-amber-400" />,
  },
  {
    id: 'bhetki-paturi',
    termEn: 'Wood-Smoked Bhetki Paturi',
    termBn: 'কলাপাতায় মোড়া তাজা ভেটকি পাতুড়ি',
    taglineEn: 'Steam-Roasted in Charred Green Banana Leaf',
    taglineBn: 'সরষে-নারকেলের পেস্টে ভাপে সিদ্ধ তাজা মাছ',
    descriptionEn: 'Fresh succulent Bengal Bhetki fish fillets coated in freshly ground mustard paste, grated coconut, and fragrant green chilies, neatly parcelled in banana leaves and slow-cooked over low embers for smoky herbal aroma.',
    descriptionBn: 'টাটকা সুন্দরবন অঞ্চলের মিষ্টি জলের ভেটকি মাছ, খাঁটি সর্ষে-পোস্ত ও কাঁচালঙ্কায় মেখে কলাপাতায় সুতো দিয়ে বেঁধে ধিমে আঁচে ভাপে রান্না করা হয়। ধোঁয়াটে সুবাসে অনন্য এক পদ।',
    icon: <Leaf className="w-5 h-5 text-emerald-400" />,
  },
  {
    id: 'gondhoraj',
    termEn: 'Fragrant Gondhoraj Lime',
    termBn: 'রাজকীয় সুবাসের গন্ধরাজ লেবু',
    taglineEn: "'King of Aromas' Citrus Native to Bengal",
    taglineBn: 'বাঙালির নিজস্ব অতুলনীয় সাইট্রাস সুবাস',
    descriptionEn: 'Known as the Rangpur lime, its thick pebbled rind releases an intoxicating floral perfume that is refreshing rather than sour. We infuse it into our sparkling coolers and handcrafted artisanal beverages.',
    descriptionBn: 'বাংলার নিজস্ব জাতের সুগন্ধি লেবু, যার খোসার তেলে থাকে অপূর্ব রাজকীয় সুবাস। এটি সাধারণ লেবুর মতো অতিরিক্ত টক নয়, বরং মন ভালো করে দেওয়া সতেজ সুবাস এনে দেয় প্রতিটি পানীয়তে।',
    icon: <Sparkles className="w-5 h-5 text-sky-400" />,
  },
  {
    id: 'mishti-doi',
    termEn: 'Caramelized Mishti Doi in Porous Earthen Pot',
    termBn: 'মাটির খাঁটি ভাঁড়ে পাতা ক্ষীর মিষ্টি দই',
    taglineEn: 'Slowly Fermented in Clay for Velvet Texture',
    taglineBn: 'পোড়া মাটির পাত্রে জমাট বাঁধা গাঢ় মিষ্টান্ন',
    descriptionEn: 'Rich cow milk reduced slowly with jaggery or caramelized cane sugar, set inside unglazed clay pots (bhar). The porous baked earth naturally absorbs excess whey, producing an ultra-thick, silky, caramelized curd.',
    descriptionBn: 'ঘন দুধ ধিমে আঁচে ফুটিয়ে ক্যারামেল বা খাঁটি নলেন গুড়ে জ্বাল দিয়ে মাটির ভাঁড়ে পাতা হয়। মাটির ছিদ্র জলীয় অংশ শুষে নিয়ে দইকে করে তোলে ঘন, ক্রিমি ও স্বর্গীয় সুস্বাদু।',
    icon: <HeartHandshake className="w-5 h-5 text-rose-400" />,
  },
];

export const BengalCulinaryGlossary: React.FC = React.memo(() => {
  const { language } = useLanguage();

  return (
    <section id="glossary" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070e0c] border-t border-[#dfb86c]/20 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-64 bg-[#dfb86c]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-14 relative z-10">
        <AppleScrollReveal className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex justify-center">
            <ShimmerBadge icon={<Sparkles className="w-3.5 h-3.5 text-[#dfb86c]" />}>
              {language === 'bn' ? 'বাঙালি স্বাদের ঐতিহ্য ও গল্প' : 'BENGAL CULINARY HERITAGE GLOSSARY'}
            </ShimmerBadge>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#fdfbf7] tracking-tight">
            {language === 'bn' ? 'যেসব স্বাদে জলছবি অনন্য' : 'The Secrets of Kolkata & Bengal Terroir'}
          </h2>

          <p className="text-sm sm:text-base text-[#8fa69d] leading-relaxed">
            {language === 'bn'
              ? 'প্রথমবার এলে জেনে নিন কেন কলকাতার বিরিয়ানিতে আলু থাকে এবং কেন কাসুন্দি ও গন্ধরাজ বাংলার গর্ব।'
              : 'New to Bengal culinary traditions? Discover why Kolkata biryani includes potato, how Kasundi elevates crisp fries, and why Gondhoraj is the King of Aromas.'}
          </p>
        </AppleScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GLOSSARY_ITEMS.map((item, idx) => (
            <AppleScrollReveal key={item.id} delayMs={idx * 80}>
              <div className="h-full rounded-2xl bg-[#0e1b17]/90 border border-[#dfb86c]/25 p-6 sm:p-7 flex flex-col justify-between hover:border-[#dfb86c]/60 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(223,184,108,0.15)] group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-[#14241f] border border-[#dfb86c]/25 group-hover:scale-105 transition-transform">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#dfb86c]">
                      Heritage #{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-medium text-[#fdfbf7] group-hover:text-[#e5c378] transition-colors leading-snug">
                      {language === 'bn' ? item.termBn : item.termEn}
                    </h3>
                    <p className="text-xs font-mono text-[#dfb86c] mt-1 tracking-wide">
                      {language === 'bn' ? item.taglineBn : item.taglineEn}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#8fa69d] leading-relaxed">
                    {language === 'bn' ? item.descriptionBn : item.descriptionEn}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#dfb86c]/15 flex items-center justify-between text-[11px] font-mono text-[#e5c378]">
                  <span>{language === 'bn' ? 'জলছবিতে তাজা পরিবেশন' : 'Served fresh at Jalchabi'}</span>
                  <span>✨</span>
                </div>
              </div>
            </AppleScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
});
