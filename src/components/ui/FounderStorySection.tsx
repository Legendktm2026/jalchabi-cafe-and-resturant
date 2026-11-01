import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { RESTAURANT_DATA } from '../../config/restaurantData';
import { AppleScrollReveal } from './AppleScrollReveal';
import { ShimmerBadge } from './ShimmerBadge';
import { BengaliAudioNarrator } from './BengaliAudioNarrator';
import { Heart, Compass, ShieldCheck, MapPin, Award, Code2, Sparkles, ArrowRight } from 'lucide-react';
import { FounderStoryModal } from './FounderStoryModal';

export const FounderStorySection: React.FC = React.memo(() => {
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const { language, t } = useLanguage();
  const f = t.founder;

  const milestones = [
    {
      num: '01',
      title: f.milestone1Title,
      desc: f.milestone1Desc,
      icon: <Compass className="w-5 h-5 text-[#dfb86c]" />,
    },
    {
      num: '02',
      title: f.milestone2Title,
      desc: f.milestone2Desc,
      icon: <ShieldCheck className="w-5 h-5 text-[#dfb86c]" />,
    },
    {
      num: '03',
      title: f.milestone3Title,
      desc: f.milestone3Desc,
      icon: <MapPin className="w-5 h-5 text-[#dfb86c]" />,
    },
    {
      num: '04',
      title: f.milestone4Title,
      desc: f.milestone4Desc,
      icon: <Sparkles className="w-5 h-5 text-[#dfb86c]" />,
    },
  ];

  return (
    <section id="founder-story" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070e0c] via-[#0a1512] to-[#070e0c] relative overflow-hidden">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#dfb86c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#dfb86c]/10 rounded-full blur-3xl pointer-events-none" />

      {/* ── Phase 5: Mobile-only teaser card (lg+ shows full section below) ── */}
      <div className="lg:hidden max-w-lg mx-auto mb-0 relative z-10">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#14241f] via-[#0e1b17] to-[#070e0c] border border-[#dfb86c]/40 p-6 shadow-2xl">
          {/* Decorative ambient glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#dfb86c]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#dfb86c] block mb-2">
              {language === 'bn' ? 'প্রতিষ্ঠাতার গল্প' : "Founder's Story"}
            </span>
            <h2 className="font-serif text-2xl text-[#fdfbf7] mb-3 leading-tight">
              {f.title}
            </h2>
            <p className="text-sm text-[#8fa69d] leading-relaxed mb-5 line-clamp-3">
              {f.storyP1}
            </p>
            <button
              type="button"
              onClick={() => setIsStoryModalOpen(true)}
              className="w-full py-3 rounded-xl bg-[#dfb86c]/20 border border-[#dfb86c]/50 text-[#e5c378] text-sm font-medium flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
            >
              <span>📖</span>
              <span>{language === 'bn' ? 'পূর্ণ গল্প পড়ুন' : 'Read Full Story'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Full story content — desktop & tablet only ── */}
      <div className="hidden lg:block">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
        <AppleScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="mb-4 flex justify-center">
            <ShimmerBadge icon={<Heart className="w-3.5 h-3.5 text-[#dfb86c]" />}>
              {f.badge}
            </ShimmerBadge>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#fdfbf7] mb-4 tracking-wide leading-tight">
            {f.title}
          </h2>

          <p className="text-sm sm:text-base font-serif text-[#e5c378] tracking-wide mb-6">
            {f.bengaliSubtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0e1b17]/80 border border-[#dfb86c]/30 text-xs font-mono text-[#8fa69d]">
              <MapPin className="w-3.5 h-3.5 text-[#dfb86c]" />
              <span>Sarberia, Atharobanki, Canning II (PIN: 743329)</span>
            </div>

            {/* Voice Storytelling for Rural Visitors & Elders */}
            <BengaliAudioNarrator />
          </div>
        </AppleScrollReveal>

        {/* Narrative & Quote Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Main Story Narrative Card */}
          <AppleScrollReveal delayMs={100} className="lg:col-span-7 flex">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0e1b17]/90 border border-[#dfb86c]/30 shadow-2xl backdrop-blur-md flex flex-col justify-between">
              <div className="space-y-4 text-sm sm:text-base text-[#8fa69d] leading-relaxed">
                <p className="first-letter:text-4xl first-letter:font-serif first-letter:text-[#dfb86c] first-letter:mr-2 first-letter:float-left">
                  {f.storyP1}
                </p>
                <p>
                  {f.storyP2}
                </p>
                <p className="text-[#fdfbf7] font-medium border-l-2 border-[#dfb86c] pl-4 italic">
                  {f.storyP3}
                </p>
                <p>
                  {f.storyP4}
                </p>
              </div>

              {/* Geographic Callout */}
              <div className="mt-8 pt-6 border-t border-[#dfb86c]/20 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#dfb86c] font-mono block">
                    {language === 'bn' ? 'ক্যাফের ভৌগোলিক অবস্থান' : 'Geographic Anchor'}
                  </span>
                  <span className="text-xs sm:text-sm text-[#fdfbf7] font-serif">
                    {RESTAURANT_DATA.meta.exactLocation}
                  </span>
                </div>

                <a
                  href="#visit"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#e5c378] hover:text-[#fdfbf7] transition-colors font-semibold"
                >
                  <span>{language === 'bn' ? 'রুট ম্যাপ দেখুন' : 'Get Directions'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </AppleScrollReveal>

          {/* Founder's Emotional Quote & Portrait Plinth */}
          <AppleScrollReveal delayMs={200} className="lg:col-span-5 flex">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#14241f] via-[#0e1b17] to-[#070e0c] border border-[#dfb86c]/40 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              {/* Background Watermark */}
              <div className="absolute -top-10 -right-10 text-[160px] font-serif text-[#dfb86c]/5 select-none pointer-events-none">
                “
              </div>

              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#dfb86c]/15 border border-[#dfb86c]/40 flex items-center justify-center mb-6">
                  <Award className="w-6 h-6 text-[#dfb86c]" />
                </div>

                <span className="text-xs uppercase tracking-widest text-[#dfb86c] font-mono font-semibold block mb-3">
                  {language === 'bn' ? 'প্রতিষ্ঠাতার মূল বাণী' : "Founder's Philosophy"}
                </span>

                <blockquote className="text-base sm:text-lg font-serif text-[#fdfbf7] leading-relaxed italic">
                  "{f.quote}"
                </blockquote>
              </div>

              <div className="mt-8 pt-6 border-t border-[#dfb86c]/30">
                <h4 className="text-xl font-serif text-[#e5c378] font-medium">
                  {f.quoteAuthor}
                </h4>
                <p className="text-xs text-[#8fa69d] mt-0.5 font-mono">
                  {f.quoteRole}
                </p>
              </div>
            </div>
          </AppleScrollReveal>
        </div>

        {/* Milestone Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {milestones.map((m, idx) => (
            <AppleScrollReveal key={m.num} delayMs={idx * 100}>
              <div className="p-6 rounded-2xl bg-[#0e1b17]/80 border border-[#dfb86c]/20 hover:border-[#dfb86c]/50 transition-all group h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-bold text-[#dfb86c]/50 group-hover:text-[#dfb86c] transition-colors">
                      {m.num}
                    </span>
                    <div className="p-2 rounded-xl bg-[#14241f] border border-[#dfb86c]/20 group-hover:border-[#dfb86c]/40 transition-colors">
                      {m.icon}
                    </div>
                  </div>

                  <h3 className="text-base font-serif text-[#fdfbf7] font-medium mb-2 group-hover:text-[#e5c378] transition-colors">
                    {m.title}
                  </h3>

                  <p className="text-xs text-[#8fa69d] leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>
            </AppleScrollReveal>
          ))}
        </div>

        {/* Leadership & Digital Craftsmanship Recognition Card */}
        <AppleScrollReveal delayMs={300}>
          <div className="p-8 rounded-3xl bg-[#0e1b17] border border-[#dfb86c]/40 shadow-xl relative overflow-hidden">
            <div className="max-w-2xl mx-auto text-center mb-8">
              <h3 className="text-2xl font-serif text-[#fdfbf7] mb-2">
                {f.leadershipTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#8fa69d]">
                {language === 'bn'
                  ? 'সারবেড়িয়ার স্বপ্নদ্রষ্টা ও ডিজিটাল রূপকারদের আন্তরিক মেলবন্ধন'
                  : 'The visionaries uniting grassroots community hospitality with world-class digital craft.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Sabir Hossen Khan */}
              <div className="p-6 rounded-2xl bg-[#14241f] border border-[#dfb86c]/30 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#dfb86c]/20 border border-[#dfb86c] flex items-center justify-center shrink-0 text-[#dfb86c]">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-mono text-[#dfb86c] block">
                    {f.founderRole}
                  </span>
                  <h4 className="text-lg font-serif text-[#fdfbf7] font-medium mt-0.5">
                    {f.founderName}
                  </h4>
                  <p className="text-xs text-[#8fa69d] mt-2 leading-relaxed">
                    {f.founderBio}
                  </p>
                </div>
              </div>

              {/* Rizwan Khan */}
              <div className="p-6 rounded-2xl bg-[#14241f] border border-[#dfb86c]/30 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#dfb86c]/20 border border-[#dfb86c] flex items-center justify-center shrink-0 text-[#dfb86c]">
                  <Code2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-mono text-[#dfb86c] block">
                    {f.devRole}
                  </span>
                  <h4 className="text-lg font-serif text-[#fdfbf7] font-medium mt-0.5">
                    {f.devName}
                  </h4>
                  <p className="text-xs text-[#8fa69d] mt-2 leading-relaxed">
                    {f.devBio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AppleScrollReveal>
        </div>
      </div>

      {/* Phase 5: Lazy founder story modal for mobile */}
      {isStoryModalOpen && (
        <FounderStoryModal onClose={() => setIsStoryModalOpen(false)} />
      )}
    </section>
  );
});
