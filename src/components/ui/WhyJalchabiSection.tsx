import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { RESTAURANT_DATA } from '../../config/restaurantData';
import { AppleScrollReveal } from './AppleScrollReveal';
import { ShimmerBadge } from './ShimmerBadge';
import { 
  ShieldCheck, 
  PhoneCall, 
  HeartHandshake, 
  CheckCircle2, 
  XCircle
} from 'lucide-react';

export const WhyJalchabiSection: React.FC = React.memo(() => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  const comparisons = [
    {
      feature: isBn ? 'উপাদানের গুণমান ও স্বাস্থ্যবিধি' : 'Ingredients & Food Purity',
      jalchabi: isBn ? 'প্রতিদিন সকালের ১০০% তাজা চিকেন ও খাঁটি রিফাইন্ড তেল' : '100% daily-sourced fresh poultry & branded light refined oil',
      competitors: isBn ? 'ফ্রোজেন বা আগের দিনের বাসি খাবার ও নিম্নমানের তেল' : 'Frozen or re-heated meat and reused palm/dalda oils',
      badge: isBn ? '১০০% তাজা' : 'Daily Fresh'
    },
    {
      feature: isBn ? 'পরিবেশ ও আতিথেয়তা' : 'Ambience & Atmosphere',
      jalchabi: isBn ? 'শীতাতপ নিয়ন্ত্রিত শান্ত পরিবার ও কাপল-বান্ধব প্রিমিয়াম জোন' : 'Air-conditioned peaceful, family & couple-friendly aesthetic sanctuary',
      competitors: isBn ? 'ভিড়ভাট্টা, ধোঁয়া ও অস্বস্তিকর সাধারণ রাস্তার দোকান' : 'Noisy, congested, smoky, lack of private family seating',
      badge: isBn ? 'শান্তিময় পরিবেশ' : 'Aesthetic'
    },
    {
      feature: isBn ? 'দার্জিলিং মোমো ও সস' : 'Darjeeling Momos & Dips',
      jalchabi: isBn ? 'পাতলা চামড়ার রসালো হ্যান্ডমেড মোমো, পাহাড়ি লঙ্কা চাটনি ও গরম স্যুপ' : 'Authentic hill-style paper-thin crust with homemade garlic chili dip & soup',
      competitors: isBn ? 'মোটা ময়দার লেচি ও কৃত্রিম রঙের সাধারণ চাটনি' : 'Thick doughy skins with artificial food-color dips',
      badge: isBn ? 'আসল স্বাদ' : 'Original Recipe'
    },
    {
      feature: isBn ? 'অর্ডার ও পেমেন্ট সুবিধা' : 'Ordering & Digital Payments',
      jalchabi: isBn ? '১-ক্লিকে হোয়াটসঅ্যাপে অর্ডার, ফোনপে/গুগলপে QR ও দ্রুত হোম ডেলিভারি' : '1-click WhatsApp ordering, instant PhonePe/GPay QR & speedy parcel service',
      competitors: isBn ? 'শুধুমাত্র নগদ টাকা ও দীর্ঘক্ষণ দাঁড়িয়ে অপেক্ষা' : 'Cash only, long chaotic counter waits without tracking',
      badge: isBn ? 'সহজ ও ডিজিটাল' : 'Digital Fast'
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#070e0c] relative overflow-hidden border-t border-b border-[#dfb86c]/20">
      {/* Subtle Glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#dfb86c]/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-[#0a1e19]/30 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <AppleScrollReveal className="text-center max-w-3xl mx-auto mb-14">
          <div className="mb-4 flex justify-center">
            <ShimmerBadge icon={<ShieldCheck className="w-4 h-4 text-[#dfb86c]" />}>
              {isBn ? 'গুণমানের অঙ্গীকার' : 'The Jalchabi Standard'}
            </ShimmerBadge>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#fdfbf7] mb-3 leading-tight">
            {isBn ? 'কেন জলছবি ক্যানিং ২-এর সেরা ক্যাফে?' : 'Why Jalchabi is Canning II’s Finest Sanctuary'}
          </h2>

          <p className="text-xs sm:text-sm font-mono text-[#dfb86c] uppercase tracking-widest mb-4">
            {isBn ? 'সারবেড়িয়া ও আঠারোবাঁকির বুকে নির্ভরযোগ্য স্বাদের ঠিকানা' : 'Sarberia & Atharobanki’s Benchmark of Hospitality'}
          </p>

          <p className="text-sm sm:text-base text-[#8fa69d] max-w-2xl mx-auto leading-relaxed">
            {isBn
              ? 'আমাদের লক্ষ্য কেবল খাবার পরিবেশন নয়—আমাদের গ্রামীণ এলাকার মানুষ যাতে কলকাতার শ্রেষ্ঠ ক্যাফের সমতুল্য আতিথেয়তা ও খাঁটি খাবারের স্বাদ পান, সেটাই সাবির হোসেন খানের আজীবনের অঙ্গীকার।'
              : 'Our mission transcends ordinary fast food. Founder Sabir Hossain Khan built Jalchabi so rural Canning can relish world-class hospitality, purity of ingredients, and tranquil dining right at home.'}
          </p>
        </AppleScrollReveal>

        {/* Feature Cards Grid (Mobile 1-col, Desktop 2-col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {comparisons.map((c, idx) => (
            <AppleScrollReveal key={idx} delayMs={idx * 80}>
              <div className="p-6 sm:p-7 rounded-2xl bg-[#0e1b17] border border-[#dfb86c]/30 shadow-xl hover:border-[#dfb86c]/60 transition-all flex flex-col justify-between h-full group">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4 border-b border-[#dfb86c]/15 pb-3">
                    <span className="text-sm font-serif text-[#fdfbf7] font-medium tracking-wide">
                      {c.feature}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#dfb86c]/20 text-[#e5c378] border border-[#dfb86c]/40">
                      {c.badge}
                    </span>
                  </div>

                  {/* Jalchabi Standard */}
                  <div className="p-3.5 rounded-xl bg-[#14241f]/80 border border-emerald-500/30 mb-3 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider block">
                        {isBn ? 'জলছবি ক্যাফে ও রেস্তোরাঁ' : 'At Jalchabi'}
                      </span>
                      <p className="text-xs sm:text-sm text-[#fdfbf7] font-serif mt-1 leading-relaxed">
                        {c.jalchabi}
                      </p>
                    </div>
                  </div>

                  {/* Competitor / Common Street Food */}
                  <div className="p-3 rounded-xl bg-[#070e0c]/80 border border-red-500/20 flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-red-400/70 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] font-mono text-red-400/80 uppercase tracking-wider block">
                        {isBn ? 'সাধারণ আশেপাশের দোকান' : 'Ordinary Local Outlets'}
                      </span>
                      <p className="text-xs text-[#8fa69d] mt-0.5 leading-relaxed">
                        {c.competitors}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AppleScrollReveal>
          ))}
        </div>

        {/* Direct Connect with Owner Sabir Card */}
        <AppleScrollReveal delayMs={250}>
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0a1e19] via-[#0e1b17] to-[#14241f] border border-[#dfb86c]/50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-full bg-[#dfb86c]/20 border-2 border-[#dfb86c] flex items-center justify-center shrink-0 shadow-lg text-[#e5c378]">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#dfb86c] block">
                  {isBn ? 'সরাসরি মালিকের আন্তরিক প্রতিশ্রুতি' : 'Direct Founder Hospitality'}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#fdfbf7] font-light mt-0.5">
                  {isBn ? 'যেকোনো বিষয়ে কথা বলুন সাবির হোসেন খানের সাথে' : 'Speak Directly with Sabir Hossain Khan'}
                </h3>
                <p className="text-xs text-[#8fa69d] mt-1">
                  {isBn
                    ? 'টেবিল বুকিং, কোনো স্পেশাল মেনু অনুরোধ বা হোম ডেলিভারির জন্য সরাসরি ফোন করুন।'
                    : 'Call directly for special orders, family event arrangements, or instant WhatsApp parcels.'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto shrink-0">
              <a
                href={RESTAURANT_DATA.contact.phoneHref}
                className="flex-1 sm:flex-initial px-6 py-3 rounded-full bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] text-[#070e0c] font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap min-h-[48px]"
              >
                <PhoneCall className="w-4 h-4 text-[#070e0c]" />
                <span>{isBn ? 'সরাসরি কল: ৮৯১৮৯৪৮৭৩০' : 'Call Sabir Now'}</span>
              </a>

              <a
                href={RESTAURANT_DATA.contact.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-initial px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap min-h-[48px]"
              >
                <span>{isBn ? 'হোয়াটসঅ্যাপ মেসেজ' : 'WhatsApp'}</span>
              </a>
            </div>
          </div>
        </AppleScrollReveal>
      </div>
    </section>
  );
});
