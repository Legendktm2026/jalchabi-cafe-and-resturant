import React, { useState, useEffect } from 'react';
import { RESTAURANT_DATA } from '../../config/restaurantData';
import { useLanguage } from '../../context/LanguageContext';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Wifi,
  Accessibility,
  Coffee,
  Sparkles,
  SunMedium,
  Compass,
  Navigation,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import { AppleScrollReveal } from './AppleScrollReveal';
import { BentoGrid, BentoGridItem } from './BentoGrid';
import { ShimmerBadge } from './ShimmerBadge';

export const VisitSection: React.FC = React.memo(() => {
  const { language, t } = useLanguage();
  const [kolkataTime, setKolkataTime] = useState<string>('');
  const [currentShift, setCurrentShift] = useState<string>('Evening Fast Food & Coffee');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setKolkataTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );

      const hour = parseInt(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: 'numeric',
          hour12: false,
        }),
        10
      );

      if (hour >= 9 && hour < 12) {
        setCurrentShift(language === 'bn' ? 'সকালের তাজা চা ও কফি' : 'Morning Fresh Tea & Coffee');
      } else if (hour >= 12 && hour < 16) {
        setCurrentShift(language === 'bn' ? 'দুপুরের লাঞ্চ ও শাহি দম বিরিয়ানি' : 'Afternoon Lunch & Biryani Handi');
      } else if (hour >= 16 && hour < 20) {
        setCurrentShift(language === 'bn' ? 'গরম মোমো ও ক্রিস্পি ড্রামস অফ হেভেন' : 'Hot Momos & Sizzling Drums of Heaven');
      } else if (hour >= 20 && hour < 23) {
        setCurrentShift(language === 'bn' ? 'সন্ধ্যার আড্ডা ও কাঠি রোল স্পেশাল' : 'Evening Adda & Kathi Roll Specials');
      } else {
        setCurrentShift(language === 'bn' ? 'ক্যাফে বিশ্রামরত • সকাল ১০টায় উন্মুক্ত' : 'Sanctuary at Rest • Opening 10:00 AM');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [language]);

  return (
    <section id="visit" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070e0c] relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <AppleScrollReveal className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-3">
            <ShimmerBadge icon={<MapPin className="w-3.5 h-3.5 text-[#dfb86c]" />}>
              {t.visit.badge}
            </ShimmerBadge>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#fdfbf7] mb-4 tracking-wide">
            {t.visit.title}
          </h2>

          <p className="text-sm sm:text-base text-[#8fa69d] max-w-xl mx-auto">
            {t.visit.subtitle}
          </p>
        </AppleScrollReveal>

        {/* Skiper-UI Inspired Bento Grid: Atmospheric & Telemetry Cards */}
        <AppleScrollReveal delayMs={100}>
          <BentoGrid className="mb-16">
            {/* Bento Card 1 (Span 2): Live Kolkata IST Clock & Solar Rhythms */}
            <BentoGridItem
              className="md:col-span-2 bg-gradient-to-br from-[#0a1e19] via-[#0e1b17] to-[#070e0c]"
              badge={language === 'bn' ? 'লাইভ সময় ও শিফট ট্র্যাকার' : 'LIVE SANCTUARY TELEMETRY'}
              icon={<Clock className="w-4 h-4 text-[#dfb86c]" />}
              title={language === 'bn' ? 'পশ্চিমবঙ্গ স্ট্যান্ডার্ড টাইম (IST)' : 'Kolkata Standard Time & Service Shift'}
              description={language === 'bn' ? 'জলছবি ক্যাফের আলো ও সাউন্ড ট্র্যাক ক্যানিং ২-এর প্রাকৃতিক সন্ধ্যার সাথে তাল মিলিয়ে পরিবর্তিত হয়।' : 'Jalchabi automatically tunes interior warm illumination, ambient sounds, and kitchen stoves in synchrony with rural Canning sunset.'}
              header={
                <div className="flex h-full w-full min-h-[7.5rem] flex-col justify-between rounded-xl border border-[#dfb86c]/20 bg-[#070e0c]/90 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono tracking-widest text-[#dfb86c] uppercase flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      IST Clock (UTC +5:30)
                    </span>
                    <span className="text-xs text-[#8fa69d] font-mono">CANNING II / 743329</span>
                  </div>

                  <div className="py-2 flex items-baseline gap-3">
                    <span className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-[#fdfbf7] drop-shadow-md">
                      {kolkataTime || '10:00:00 AM'}
                    </span>
                    <span className="text-xs text-[#dfb86c] font-medium uppercase tracking-wider">
                      Live
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#dfb86c]/15 pt-2 text-xs">
                    <span className="text-[#8fa69d]">{language === 'bn' ? 'চলমান সার্ভিস:' : 'Active Service:'}</span>
                    <span className="font-serif text-[#e5c378] font-medium">{currentShift}</span>
                  </div>
                </div>
              }
            />

            {/* Bento Card 2: Rural Microclimate */}
            <BentoGridItem
              className="bg-gradient-to-br from-[#0e1b17] to-[#070e0c]"
              badge={language === 'bn' ? 'ভৌগোলিক পরিবেশ' : 'RURAL WATERFRONT'}
              icon={<Compass className="w-4 h-4 text-[#dfb86c]" />}
              title={language === 'bn' ? 'সারবেড়িয়া ও আঠারোবাঁকি' : 'Sarberia & Atharobanki'}
              description={language === 'bn' ? 'সারবেড়িয়া বাজার সংলগ্ন গ্রামীণ সবুজ ও শান্ত পুকুরের পাড়ে অবস্থিত মনোরম পরিবেশ।' : 'Peaceful rural landscape in Sarberia, offering unhurried tranquility away from congested highways.'}
              header={
                <div className="flex h-full w-full min-h-[7.5rem] flex-col justify-between rounded-xl border border-[#dfb86c]/20 bg-[#070e0c]/90 p-4 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#dfb86c] font-mono uppercase text-[10px]">PIN Code</span>
                    <span className="font-mono text-emerald-400 font-bold">743329</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[#8fa69d] text-[10px] uppercase block">Community Block</span>
                    <span className="text-sm font-serif text-[#fdfbf7] font-semibold">Canning II, South 24 Parganas</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#e5c378] text-[11px]">
                    <SunMedium className="w-3.5 h-3.5" />
                    <span>{language === 'bn' ? 'সুন্দরবনের প্রবেশদ্বার' : 'Gateway to Sundarbans'}</span>
                  </div>
                </div>
              }
            />

            {/* Bento Card 3: Fresh Culinary Standard */}
            <BentoGridItem
              className="bg-gradient-to-br from-[#0e1b17] to-[#070e0c]"
              badge={language === 'bn' ? 'রন্ধন মান' : 'CULINARY STANDARD'}
              icon={<Coffee className="w-4 h-4 text-[#dfb86c]" />}
              title={language === 'bn' ? 'মোমো ও ফাস্ট ফুড স্পেশাল' : 'Momos & Fast Food Craft'}
              description={language === 'bn' ? 'প্রতিটি মোমো ও ড্রামস অফ হেভেন তাজা উপাদানে কড়া স্বাদে তৈরি হয়।' : 'Steaming dumplings, crispy schezwan chicken, and Kolkata kathi rolls prepared with fresh herbs.'}
              header={
                <div className="flex h-full w-full min-h-[7.5rem] flex-col justify-between rounded-xl border border-[#dfb86c]/20 bg-[#070e0c]/90 p-4 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#dfb86c] font-mono uppercase text-[10px]">Kitchen Specialty</span>
                    <span className="text-emerald-400 font-mono text-[10px]">Fresh Daily</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-center pt-2">
                    <div className="p-1.5 rounded-lg bg-[#0e1b17] border border-[#dfb86c]/15">
                      <span className="text-[9px] text-[#8fa69d] block">Momos</span>
                      <span className="text-xs font-semibold text-[#fdfbf7]">Steamed</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#0e1b17] border border-[#dfb86c]/15">
                      <span className="text-[9px] text-[#8fa69d] block">Lollipops</span>
                      <span className="text-xs font-semibold text-[#fdfbf7]">Crispy</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#0e1b17] border border-[#dfb86c]/15">
                      <span className="text-[9px] text-[#8fa69d] block">Biryani</span>
                      <span className="text-xs font-semibold text-[#fdfbf7]">Handi</span>
                    </div>
                  </div>
                </div>
              }
            />
          </BentoGrid>
        </AppleScrollReveal>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Location & Verification Notice Card */}
          <AppleScrollReveal delayMs={100} className="lg:col-span-6">
            <div className="p-8 rounded-2xl glass-panel border border-[#dfb86c]/30 space-y-6 apple-card-hover">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#dfb86c] font-medium block mb-2 font-mono">
                  {t.visit.addressLabel}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#fdfbf7] mb-2">
                  {language === 'bn' ? 'সারবেড়িয়া, ক্যানিং ২' : 'Sarberia, Canning II'}
                </h3>
                <p className="text-sm text-[#8fa69d] leading-relaxed">
                  {language === 'bn'
                    ? 'সুন্দরবনের প্রবেশদ্বার সংলগ্ন মনোরম গ্রামীণ শান্ত পরিবেশে নির্মিত ক্যাফে ও রেস্তোরাঁ।'
                    : 'A serene waterside sanctuary built on ancestral land to serve the people of Canning II with genuine warmth.'}
                </p>
              </div>

              {/* Official Notice on Address & Contacts */}
              <div className="p-4 rounded-xl bg-[#14241f] border border-[#dfb86c]/40">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e5c378] mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#dfb86c]" />
                  <span>{language === 'bn' ? 'ঠিকানা ও পিন কোড তথ্য' : 'Address & PIN Information'}</span>
                </div>
                <p className="text-xs text-[#8fa69d] leading-relaxed">
                  {t.visit.addressVal}
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 pt-4 border-t border-[#dfb86c]/20">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-full bg-[#dfb86c]/10 text-[#dfb86c] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[#e5c378] font-medium">
                      {t.visit.landmarkLabel}
                    </h4>
                    <p className="text-sm text-[#fdfbf7]">{t.visit.landmarkVal}</p>
                    <p className="text-xs text-[#8fa69d]">PIN: 743329, South 24 Parganas</p>
                    <a
                      href={RESTAURANT_DATA.contact.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#dfb86c] hover:underline mt-1 font-mono font-medium"
                    >
                      <span>📍 {language === 'bn' ? 'গুগল ম্যাপে দেখুন' : 'Google Map Point'}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-full bg-[#dfb86c]/10 text-[#dfb86c] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[#e5c378] font-medium">
                      {language === 'bn' ? 'যোগাযোগ নম্বর' : 'Inquiries & Table Booking'}
                    </h4>
                    <p className="text-sm text-[#fdfbf7]">{RESTAURANT_DATA.contact.phoneDisplay}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-full bg-[#dfb86c]/10 text-[#dfb86c] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-[#e5c378] font-medium">
                      {language === 'bn' ? 'ইমেইল' : 'Email Address'}
                    </h4>
                    <p className="text-sm text-[#fdfbf7]">{RESTAURANT_DATA.contact.email}</p>
                  </div>
                </div>
              </div>

              {/* Features Row */}
              <div className="pt-4 border-t border-[#dfb86c]/20 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 text-xs text-[#8fa69d]">
                  <Wifi className="w-3.5 h-3.5 text-[#dfb86c]" />
                  <span>Wi-Fi Available</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8fa69d]">
                  <Accessibility className="w-3.5 h-3.5 text-[#dfb86c]" />
                  <span>Accessible</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8fa69d]">
                  <Coffee className="w-3.5 h-3.5 text-[#dfb86c]" />
                  <span>Lake Veranda</span>
                </div>
              </div>
            </div>
          </AppleScrollReveal>

          {/* Right Column: Proposed Operating Hours */}
          <AppleScrollReveal delayMs={200} className="lg:col-span-6">
            <div className="p-8 rounded-2xl glass-panel border border-[#dfb86c]/30 space-y-6 apple-card-hover">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-[#dfb86c]/10 text-[#dfb86c]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#dfb86c] font-medium block">
                    {language === 'bn' ? 'সময়সূচি' : 'Visiting Hours'}
                  </span>
                  <h3 className="text-2xl font-serif text-[#fdfbf7]">
                    {t.visit.hoursLabel}
                  </h3>
                </div>
              </div>

              <div className="divide-y divide-[#dfb86c]/15">
                {RESTAURANT_DATA.hours.map((schedule, idx) => (
                  <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="font-serif text-base text-[#fdfbf7] block font-medium">
                        {schedule.days}
                      </span>
                      {schedule.notes && (
                        <span className="text-xs text-[#8fa69d] block mt-0.5">
                          {schedule.notes}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-sm font-semibold text-[#e5c378] shrink-0">
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#0e1b17] border border-[#dfb86c]/20 text-xs text-[#8fa69d] leading-relaxed">
                <strong className="text-[#e5c378]">
                  {language === 'bn' ? 'বিশেষ বার্তা:' : 'A Warm Welcome:'}
                </strong>{' '}
                {language === 'bn'
                  ? 'আমরা যেকোনো সময়ে পরিবার, বন্ধুবান্ধব ও শুভাকাঙ্ক্ষীদের স্বাগত জানাই। অগ্রিম টেবিল বুকিং বা যেকোনো বিশেষ অনুষ্ঠানের জন্য আমাদের ফর্মের মাধ্যমে যোগাযোগ করতে পারেন।'
                  : 'We warmly welcome walk-ins for coffee, snacks, and gatherings, as well as reserved tables for family celebrations.'}
              </div>
            </div>
          </AppleScrollReveal>
        </div>

        {/* Highway Travel & Free Valet Parking Guide for Kolkata & Highway Diners (Persona 2) */}
        <AppleScrollReveal delayMs={150}>
          <div className="rounded-3xl glass-panel border border-[#dfb86c]/40 p-6 sm:p-10 relative overflow-hidden bg-gradient-to-br from-[#0e1b17] via-[#0a1e19] to-[#070e0c] shadow-2xl">
            {/* Ambient gold background glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#dfb86c]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-b border-[#dfb86c]/20 pb-8 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfb86c]/15 border border-[#dfb86c]/30 text-xs font-semibold uppercase tracking-wider text-[#e5c378] mb-3">
                  <Navigation className="w-3.5 h-3.5 text-[#dfb86c]" />
                  <span>{language === 'bn' ? 'কলকাতা থেকে রোড ট্রিপ ও পার্কিং' : 'Kolkata Weekend Drive & Transit'}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#fdfbf7] font-light">
                  {language === 'bn' ? 'কলকাতা ও সুন্দরবন হাইওয়ে ভ্রমণ নির্দেশিকা' : 'Highway Transit & Free Dedicated Parking'}
                </h3>
                <p className="text-sm text-[#8fa69d] max-w-2xl mt-1 leading-relaxed">
                  {language === 'bn'
                    ? 'বাসন্তী হাইওয়ে ধরে কলকাতা থেকে মাত্র ১ ঘণ্টা ৪৫ মিনিটের চমৎকার ড্রাইভ। সাথে পাচ্ছেন জলছবির নিজস্ব সুরক্ষিত ফ্রি পার্কিং।'
                    : 'A scenic 65 km weekend drive from Science City via Basanti Highway. Enjoy secured on-site parking for cars and two-wheelers.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href={RESTAURANT_DATA.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] text-[#070e0c] font-bold text-xs tracking-wider uppercase shadow-lg shadow-[#dfb86c]/25 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-[#070e0c]" />
                  <span>{language === 'bn' ? 'গুগল ম্যাপে পিন খুলুন' : 'Open Google Map Pin'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={RESTAURANT_DATA.contact.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full border border-[#dfb86c]/40 bg-[#070e0c] text-[#e5c378] hover:text-[#fdfbf7] hover:border-[#dfb86c] text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2"
                >
                  <Navigation className="w-4 h-4 text-[#dfb86c]" />
                  <span>{language === 'bn' ? 'রুট ডিরেকশন' : 'Get Directions'}</span>
                </a>
              </div>
            </div>

            {/* 3 Practical Highway Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Basanti Highway Route */}
              <div className="p-5 rounded-2xl bg-[#070e0c]/90 border border-[#dfb86c]/20 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#dfb86c]">
                  <span className="uppercase tracking-widest">{language === 'bn' ? 'রুট ও দূরত্ব' : 'Route & Distance'}</span>
                  <span className="text-emerald-400 font-bold">~65 km</span>
                </div>
                <h4 className="font-serif text-lg text-[#fdfbf7] font-medium">
                  {language === 'bn' ? 'সায়েন্স সিটি ➔ বাসন্তী হাইওয়ে ➔ সারবেড়িয়া' : 'Science City ➔ Basanti Highway'}
                </h4>
                <p className="text-xs text-[#8fa69d] leading-relaxed">
                  {language === 'bn'
                    ? 'ইস্টার্ন মেট্রোপলিটন বাইপাস থেকে বাসন্তী হাইওয়ে ধরুন। ঘটকপুকুর ও মালঞ্চ পার হয়ে সোজা সারবেড়িয়া মোড়ে জলছবি ক্যাফে।'
                    : 'Smooth tarmac highway through lush rural wetlands. Turn off via Malancha straight to Sarberia waterfront in ~1h 45m.'}
                </p>
                <div className="text-[11px] font-mono text-[#e5c378] pt-1">
                  ⏱️ {language === 'bn' ? 'ড্রাইভ সময়: প্রায় ১ ঘণ্টা ৪৫ মিনিট' : 'Est. Drive Time: 1 hr 45 min'}
                </div>
              </div>

              {/* Card 2: Sundarbans Gateway */}
              <div className="p-5 rounded-2xl bg-[#070e0c]/90 border border-[#dfb86c]/20 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#dfb86c]">
                  <span className="uppercase tracking-widest">{language === 'bn' ? 'সুন্দরবন সংযোগ' : 'Sundarbans Stop'}</span>
                  <span className="text-emerald-400 font-bold">30 mins to Ghat</span>
                </div>
                <h4 className="font-serif text-lg text-[#fdfbf7] font-medium">
                  {language === 'bn' ? 'গদখালি ফেরিঘাটের নিখুঁত বিরতি' : 'Gateway to Godkhali & Dhamakhali'}
                </h4>
                <p className="text-xs text-[#8fa69d] leading-relaxed">
                  {language === 'bn'
                    ? 'সুন্দরবন ভ্রমণের আগে পরিবার নিয়ে গরম মোমো, কোল্ড কফি ও লাঞ্চ করার সেরা নির্ভরযোগ্য পরিচ্ছন্ন ক্যাফে রেস্তোরাঁ।'
                    : 'The ultimate hygienic food and restroom stopover for tourists boarding Sundarbans riverboat safaris.'}
                </p>
                <div className="text-[11px] font-mono text-[#e5c378] pt-1">
                  🚤 {language === 'bn' ? 'গদখালি জেটি: মাত্র ৩০ মিনিট ড্রাইভ' : 'To Godkhali Ferry: ~30 min drive'}
                </div>
              </div>

              {/* Card 3: Free Protected Parking */}
              <div className="p-5 rounded-2xl bg-[#070e0c]/90 border border-[#dfb86c]/20 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#dfb86c]">
                  <span className="uppercase tracking-widest">{language === 'bn' ? 'ফ্রি সুবিধা' : 'Complimentary'}</span>
                  <span className="text-emerald-400 font-bold">100% Free</span>
                </div>
                <h4 className="font-serif text-lg text-[#fdfbf7] font-medium flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>{language === 'bn' ? '৩০+ গাড়ি ও বাইকের নিরাপদ পার্কিং' : '30+ Dedicated Parking Spots'}</span>
                </h4>
                <p className="text-xs text-[#8fa69d] leading-relaxed">
                  {language === 'bn'
                    ? 'ছায়াঘেরা প্রশস্ত অন-সাইট পার্কিং স্পেস। সার্বক্ষণিক নিরাপত্তারক্ষী ও সিসিটিভি নজরদারি যুক্ত, যাতে পরিবার নিশ্চিন্তে খেতে পারেন।'
                    : 'Spacious on-premises parking with 24/7 security attendant. Ample shade and space for SUVs, sedans, and motorbikes.'}
                </p>
                <div className="text-[11px] font-mono text-[#e5c378] pt-1">
                  🛡️ {language === 'bn' ? 'সুরক্ষিত পার্কিং ও ওয়াশরুম সুবিধা' : 'Secured Parking & Clean Restrooms'}
                </div>
              </div>
            </div>
          </div>
        </AppleScrollReveal>

        {/* =========================================================================
            OFFICIAL GOOGLE MAPS INTERACTIVE CARD & POINT EMBED
            ========================================================================= */}
        <AppleScrollReveal delayMs={200}>
          <div className="rounded-3xl glass-panel border border-[#dfb86c]/40 p-6 sm:p-8 relative overflow-hidden bg-gradient-to-br from-[#0a1e19] via-[#0e1b17] to-[#070e0c] shadow-2xl">
            {/* Ambient Gold Radial Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#dfb86c]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header with verified badge and action buttons */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#dfb86c]/20 mb-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfb86c]/15 border border-[#dfb86c]/30 text-xs font-semibold uppercase tracking-wider text-[#e5c378]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <MapPin className="w-3.5 h-3.5 text-[#dfb86c]" />
                  <span>{language === 'bn' ? 'অফিসিয়াল গুগল ম্যাপ পিন' : 'Official Google Maps Verified Pin'}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#fdfbf7] font-semibold tracking-wide">
                  {language === 'bn' ? 'জলছবি ক্যাফে ও রেস্তোরাঁ — গুগল ম্যাপ লোকেশন' : 'Jalchabi Cafe & Restaurant — Google Maps'}
                </h3>
                <p className="text-xs sm:text-sm text-[#8fa69d] max-w-2xl leading-relaxed">
                  {language === 'bn'
                    ? 'সারবেড়িয়া মেইন রোড, আঠারোবাঁকি সংলগ্ন, ক্যানিং ২, দক্ষিণ ২৪ পরগনা, পশ্চিমবঙ্গ — ৭৪৩৩২৯'
                    : 'Sarberia Main Road, Near Atharobanki, Canning II, South 24 Parganas, West Bengal — 743329'}
                </p>
              </div>

              {/* Direct Buttons */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href={RESTAURANT_DATA.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] text-[#070e0c] font-bold text-xs tracking-wider uppercase shadow-lg shadow-[#dfb86c]/25 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-[#070e0c]" />
                  <span>{language === 'bn' ? 'গুগল ম্যাপে খুলুন' : 'Open in Google Maps'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={RESTAURANT_DATA.contact.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full border border-[#dfb86c]/40 bg-[#070e0c] text-[#e5c378] hover:text-[#fdfbf7] hover:border-[#dfb86c] text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2"
                >
                  <Navigation className="w-4 h-4 text-[#dfb86c]" />
                  <span>{language === 'bn' ? 'টার্ন-বাই-টার্ন রুট' : 'Turn-by-Turn GPS'}</span>
                </a>
              </div>
            </div>

            {/* Interactive Embedded Map Frame */}
            <div className="relative w-full h-80 sm:h-[420px] rounded-2xl overflow-hidden border border-[#dfb86c]/30 shadow-2xl bg-[#070e0c]">
              <iframe
                title="Jalchabi Cafe & Restaurant Google Map Point"
                src={RESTAURANT_DATA.contact.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'contrast(1.04) saturate(1.08)' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Floating Verified Pin Pill */}
              <div className="absolute top-4 left-4 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#070e0c]/90 backdrop-blur-md border border-[#dfb86c]/50 text-xs text-[#fdfbf7] shadow-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-serif font-medium">Jalchabi Cafe &amp; Restaurant • 743329</span>
              </div>

              {/* Direct Link Tag in Bottom Right */}
              <div className="absolute bottom-4 right-4 z-10 hidden sm:flex items-center">
                <a
                  href={RESTAURANT_DATA.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#070e0c]/95 backdrop-blur-md border border-[#dfb86c]/70 text-xs font-mono text-[#dfb86c] hover:text-[#fdfbf7] hover:border-[#dfb86c] shadow-2xl transition-all flex items-center gap-2"
                >
                  <span>📍 share.google/YxnV3K2qeoJCWx2Ua</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Verification Footer Note */}
            <div className="mt-4 pt-4 border-t border-[#dfb86c]/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8fa69d]">
              <div className="flex items-center gap-2 text-center sm:text-left">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {language === 'bn'
                    ? 'অফিসিয়াল গুগল ম্যাপস শেয়ার পয়েন্ট সংযুক্ত। স্মার্টফোনে সরাসরি ক্লিক করলে গুগল ম্যাপস অ্যাপে নেভিগেশন শুরু হবে।'
                    : 'Official Google Maps verified pin connected. Tapping opens real-time GPS navigation directly in your Google Maps app.'}
                </span>
              </div>
              <a
                href={RESTAURANT_DATA.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[#dfb86c] hover:underline font-semibold shrink-0"
              >
                https://share.google/YxnV3K2qeoJCWx2Ua ↗
              </a>
            </div>
          </div>
        </AppleScrollReveal>
      </div>
    </section>
  );
});
