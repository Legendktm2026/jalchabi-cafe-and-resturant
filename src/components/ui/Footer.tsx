import React from 'react';
import { RESTAURANT_DATA } from '../../config/restaurantData';
import { useLanguage } from '../../context/LanguageContext';
import { SlidersHorizontal, ArrowUp, Heart, Code2, Award, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  onOpenAccessibility: () => void;
}

export const Footer: React.FC<FooterProps> = React.memo(({ onOpenAccessibility }) => {
  const { language, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050a09] border-t border-[#dfb86c]/20 pt-16 pb-[calc(7rem+env(safe-area-inset-bottom,0px))] xl:pb-12 px-4 sm:px-6 lg:px-8 text-[#8fa69d]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-[#dfb86c] flex items-center justify-center bg-[#0e1b17]">
                <span className="font-serif text-base text-[#dfb86c]">J</span>
              </div>
              <span className="font-serif text-2xl tracking-wider text-[#fdfbf7]">
                {language === 'bn' ? 'জলছবি' : 'JALCHABI'}
              </span>
            </div>

            <p className="text-sm font-serif italic text-[#8fa69d] max-w-sm leading-relaxed">
              {t.footer.tagline}
            </p>

            <div className="pt-2 space-y-1.5">
              <div className="flex items-start gap-2 text-xs text-[#e5c378]">
                <MapPin className="w-4 h-4 text-[#dfb86c] shrink-0 mt-0.5" />
                <span>{RESTAURANT_DATA.meta.exactLocation}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#8fa69d]">
                <Phone className="w-4 h-4 text-[#dfb86c] shrink-0" />
                <a href="tel:+918918948730" className="hover:text-[#e5c378]">
                  +91 8918948730 (WhatsApp & UPI)
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#fdfbf7] mb-4">
              {language === 'bn' ? 'অনুসন্ধান' : 'Exploration'}
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider uppercase">
              <li>
                <a href="#experience" className="hover:text-[#e5c378] transition-colors">
                  {t.nav.experience3d}
                </a>
              </li>
              <li>
                <a href="#founder-story" className="hover:text-[#e5c378] transition-colors text-[#e5c378] font-medium">
                  {t.nav.founderStory}
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#e5c378] transition-colors">
                  {t.nav.concept}
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#e5c378] transition-colors">
                  {t.nav.menu}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#e5c378] transition-colors">
                  {t.nav.gallery}
                </a>
              </li>
            </ul>
          </div>

          {/* Hospitality & Visiting */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#fdfbf7] mb-4">
              {language === 'bn' ? 'আতিথেয়তা' : 'Hospitality'}
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider uppercase">
              <li>
                <a href="#visit" className="hover:text-[#e5c378] transition-colors">
                  {t.nav.visit}
                </a>
              </li>
              <li>
                <a href="#reservations" className="hover:text-[#e5c378] transition-colors">
                  {t.nav.reservations}
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenAccessibility}
                  className="hover:text-[#e5c378] transition-colors uppercase cursor-pointer flex items-center gap-1.5"
                >
                  <SlidersHorizontal className="w-3 h-3 text-[#dfb86c]" />
                  <span>3D Settings</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Socials & Dispatch */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#fdfbf7] mb-4">
              {language === 'bn' ? 'সামাজিক যোগাযোগ' : 'Socials'}
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider uppercase">
              {RESTAURANT_DATA.socials.map((soc) => (
                <li key={soc.platform}>
                  <a
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#e5c378] transition-colors"
                  >
                    {soc.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Prominent Leadership & Developer Credits Plaque */}
        <div className="py-6 px-6 rounded-2xl bg-[#0e1b17] border border-[#dfb86c]/30 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#dfb86c]/20 border border-[#dfb86c] flex items-center justify-center text-[#dfb86c]">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#dfb86c] font-mono block">
                {language === 'bn' ? 'ক্যাফের প্রতিষ্ঠাতা ও সিইও' : 'Founder & CEO'}
              </span>
              <strong className="text-sm font-serif text-[#fdfbf7]">
                {RESTAURANT_DATA.meta.founder}
              </strong>
            </div>
          </div>

          <div className="hidden md:block w-px h-8 bg-[#dfb86c]/20" />

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#dfb86c]/20 border border-[#dfb86c] flex items-center justify-center text-[#dfb86c]">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#dfb86c] font-mono block">
                {language === 'bn' ? 'ওয়েবসাইট রূপকল্প ও বিকাশ' : 'Website Architect & Lead Developer'}
              </span>
              <strong className="text-sm font-serif text-[#fdfbf7]">
                {RESTAURANT_DATA.meta.developer}
              </strong>
            </div>
          </div>

          <div className="hidden md:block w-px h-8 bg-[#dfb86c]/20" />

          <div className="text-center md:text-right text-[11px] text-[#8fa69d]">
            <span className="block font-mono text-[#e5c378]">PIN: 743329</span>
            <span className="block">{language === 'bn' ? 'সারবেড়িয়া, ক্যানিং ২' : 'Sarberia, Canning II'}</span>
            <a href="tel:+918918948730" className="text-[#dfb86c] font-mono hover:underline block mt-0.5">
              +91 8918948730
            </a>
          </div>
        </div>

        {/* Legal & Top Navigation */}
        <div className="pt-6 border-t border-[#dfb86c]/15 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8fa69d]/70">
          <p className="max-w-2xl leading-relaxed text-center md:text-left flex items-center gap-1.5 justify-center md:justify-start">
            <span>© {new Date().getFullYear()} Jalchabi Cafe &amp; Restaurant. {t.footer.rights}</span>
            <Heart className="w-3 h-3 text-[#dfb86c] inline" />
            <span>Built with love for Canning II.</span>
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-2.5 rounded-full border border-[#dfb86c]/30 text-[#e5c378] hover:bg-[#dfb86c]/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="text-[11px] font-medium uppercase tracking-wider">Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
});
