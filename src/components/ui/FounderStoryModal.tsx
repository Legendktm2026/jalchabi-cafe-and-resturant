import React, { useEffect } from 'react';
import { X, MapPin, Award, Code2, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { RESTAURANT_DATA } from '../../config/restaurantData';

interface FounderStoryModalProps {
  onClose: () => void;
}

/**
 * Phase 5 — Founder Story Modal (Mobile only)
 *
 * A full-screen modal that lazy-loads the full FounderStorySection content
 * on mobile when the user taps "Read Full Story" on the teaser card.
 *
 * - Only rendered on demand (no JS bundle cost until opened)
 * - Locks body scroll while open
 * - Dismissible via X button or swipe intent
 * - Hidden on xl+ (lg+ shows the full inline section instead)
 */
export const FounderStoryModal: React.FC<FounderStoryModalProps> = ({ onClose }) => {
  const { language, t } = useLanguage();
  const f = t.founder;

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const milestones = [
    {
      num: '01',
      title: f.milestone1Title,
      desc: f.milestone1Desc,
      icon: <Compass className="w-4 h-4 text-[#dfb86c]" />,
    },
    {
      num: '02',
      title: f.milestone2Title,
      desc: f.milestone2Desc,
      icon: <ShieldCheck className="w-4 h-4 text-[#dfb86c]" />,
    },
    {
      num: '03',
      title: f.milestone3Title,
      desc: f.milestone3Desc,
      icon: <MapPin className="w-4 h-4 text-[#dfb86c]" />,
    },
    {
      num: '04',
      title: f.milestone4Title,
      desc: f.milestone4Desc,
      icon: <Sparkles className="w-4 h-4 text-[#dfb86c]" />,
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={language === 'bn' ? 'প্রতিষ্ঠাতার গল্প' : "Founder's Story"}
      className="fixed inset-0 z-50 flex flex-col bg-[#070e0c] xl:hidden"
    >
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-[#dfb86c]/20 shrink-0 bg-[#070e0c]/95 backdrop-blur-md pt-[max(1rem,env(safe-area-inset-top))]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full border border-[#dfb86c]/40 flex items-center justify-center">
            <span className="font-serif text-xs text-[#dfb86c]">J</span>
          </div>
          <span className="font-serif text-lg text-[#fdfbf7]">
            {language === 'bn' ? 'প্রতিষ্ঠাতার গল্প' : "Founder's Story"}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close story"
          className="p-2 rounded-full bg-[#0e1b17] border border-[#dfb86c]/30 text-[#e5c378] active:scale-95 transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* ── Scrollable content ───────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="px-4 py-6 space-y-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
          {/* Section badge + title */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#dfb86c] block mb-2">
              {f.badge}
            </span>
            <h2 className="font-serif text-2xl text-[#fdfbf7] leading-tight mb-1">
              {f.title}
            </h2>
            <p className="text-sm font-serif text-[#e5c378] tracking-wide">
              {f.bengaliSubtitle}
            </p>
          </div>

          {/* Location pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#14241f]/85 border border-[#dfb86c]/30 text-xs font-mono text-[#8fa69d]">
            <MapPin className="w-3 h-3 text-[#dfb86c] shrink-0" />
            <span>Sarberia, Atharobanki, Canning II (PIN: 743329)</span>
          </div>

          {/* Story narrative */}
          <div className="p-5 rounded-2xl bg-[#0e1b17]/95 border border-[#dfb86c]/25">
            <div className="space-y-4 text-sm text-[#8fa69d] leading-relaxed">
              <p className="first-letter:text-4xl first-letter:font-serif first-letter:text-[#dfb86c] first-letter:mr-2 first-letter:float-left">
                {f.storyP1}
              </p>
              <p>{f.storyP2}</p>
              <p className="text-[#fdfbf7] font-medium border-l-2 border-[#dfb86c] pl-4 italic">
                {f.storyP3}
              </p>
              <p>{f.storyP4}</p>
            </div>

            {/* Geographic callout */}
            <div className="mt-6 pt-4 border-t border-[#dfb86c]/20">
              <span className="text-xs uppercase tracking-wider text-[#dfb86c] font-mono block">
                {language === 'bn' ? 'ক্যাফের ভৌগোলিক অবস্থান' : 'Geographic Anchor'}
              </span>
              <span className="text-xs sm:text-sm text-[#fdfbf7] font-serif">
                {RESTAURANT_DATA.meta.exactLocation}
              </span>
            </div>
          </div>

          {/* Founder's quote */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0a1e19] via-[#0e1b17] to-[#14241f] border border-[#dfb86c]/40">
            <div className="text-xs uppercase tracking-widest text-[#dfb86c] font-mono font-semibold mb-3">
              {language === 'bn' ? 'প্রতিষ্ঠাতার মূল বাণী' : "Founder's Philosophy"}
            </div>
            <blockquote className="text-base font-serif text-[#fdfbf7] leading-relaxed italic">
              "{f.quote}"
            </blockquote>
            <footer className="mt-4 pt-3 border-t border-[#dfb86c]/30">
              <h4 className="text-base font-serif text-[#e5c378] font-medium">
                {f.quoteAuthor}
              </h4>
              <p className="text-xs text-[#8fa69d] mt-0.5 font-mono">{f.quoteRole}</p>
            </footer>
          </div>

          {/* Milestones */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#dfb86c] mb-3">
              {language === 'bn' ? 'যাত্রার মাইলফলক' : 'Journey Milestones'}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {milestones.map((m) => (
                <div
                  key={m.num}
                  className="p-4 rounded-2xl bg-[#0e1b17]/90 border border-[#dfb86c]/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xl font-bold text-[#dfb86c]/50">{m.num}</span>
                    <div className="p-1.5 rounded-lg bg-[#14241f] border border-[#dfb86c]/20">
                      {m.icon}
                    </div>
                  </div>
                  <h4 className="text-sm font-serif text-[#fdfbf7] mb-1">{m.title}</h4>
                  <p className="text-xs text-[#8fa69d] leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership cards */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#dfb86c] mb-3">
              {f.leadershipTitle}
            </h3>
            <div className="space-y-3">
              {/* Sabir Hossen Khan */}
              <div className="p-4 rounded-2xl bg-[#0e1b17] border border-[#dfb86c]/30 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#dfb86c]/20 border border-[#dfb86c] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-[#dfb86c]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-wider font-mono text-[#dfb86c] block">
                    {f.founderRole}
                  </span>
                  <h4 className="text-base font-serif text-[#fdfbf7] font-medium mt-0.5">
                    {f.founderName}
                  </h4>
                  <p className="text-xs text-[#8fa69d] mt-1 leading-relaxed">{f.founderBio}</p>
                </div>
              </div>

              {/* Rizwan Khan */}
              <div className="p-4 rounded-2xl bg-[#0e1b17] border border-[#dfb86c]/30 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#dfb86c]/20 border border-[#dfb86c] flex items-center justify-center shrink-0">
                  <Code2 className="w-5 h-5 text-[#dfb86c]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-wider font-mono text-[#dfb86c] block">
                    {f.devRole}
                  </span>
                  <h4 className="text-base font-serif text-[#fdfbf7] font-medium mt-0.5">
                    {f.devName}
                  </h4>
                  <p className="text-xs text-[#8fa69d] mt-1 leading-relaxed">{f.devBio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
