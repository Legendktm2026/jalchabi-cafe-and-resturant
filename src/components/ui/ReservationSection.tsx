import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { ReservationFormData } from '../../types';
import { RESTAURANT_DATA } from '../../config/restaurantData';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, CheckCircle2, AlertCircle, Calendar, Users, Clock, Armchair, Send, MessageSquare } from 'lucide-react';
import { AppleScrollReveal } from './AppleScrollReveal';
import { AuroraBackground } from './AuroraBackground';
import { MagneticButton } from './MagneticButton';
import { ShimmerBadge } from './ShimmerBadge';

interface ReservationSectionProps {
  onSuccessModal: (referenceId: string, data: ReservationFormData) => void;
  selectedSeatingId?: string;
}

export const ReservationSection: React.FC<ReservationSectionProps> = React.memo(({
  onSuccessModal,
  selectedSeatingId,
}) => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    email: '',
    phone: '',
    guests: 2,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '19:30',
    seatingArea: (selectedSeatingId as ReservationFormData['seatingArea']) || 'cozy-booth',
    specialRequests: '',
    dietaryNotes: '',
  });

  useEffect(() => {
    if (selectedSeatingId) {
      setFormData((prev) => ({
        ...prev,
        seatingArea: selectedSeatingId as ReservationFormData['seatingArea'],
      }));
    }
  }, [selectedSeatingId]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate concierge dispatch delay
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedRef = `JAL-CAN-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedRef(generatedRef);
      onSuccessModal(generatedRef, formData);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#dfb86c', '#e5c378', '#0a1e19', '#fdfbf7'],
        });
      } catch {
        // Silently ignore if canvas-confetti is unavailable
      }
    }, 700);
  };

  const seatingOptions = [
    { 
      id: 'lakeside-edge', 
      label: language === 'bn' ? '৪+৪ লেক ভিউ টেবিল' : '4+4 Lakeside Edge Tables', 
      icon: <Sparkles className="w-4 h-4" /> 
    },
    { 
      id: 'cozy-booth', 
      label: language === 'bn' ? 'আখরোট কাঠের ব্যাংকুয়েট বুথ' : 'Walnut Banquette Booth', 
      icon: <Armchair className="w-4 h-4" /> 
    },
    { 
      id: 'lawn-tent', 
      label: language === 'bn' ? 'লন ক্যাবানা তাঁবু' : 'Lawn Cabana Tent (1 of 5)', 
      icon: <Users className="w-4 h-4" /> 
    },
    { 
      id: 'restaurant-se', 
      label: language === 'bn' ? 'রেস্তোরাঁ ও এসই রুম' : 'Restaurant & SE Room', 
      icon: <Armchair className="w-4 h-4" /> 
    },
    { 
      id: 'rooftop-deck', 
      label: language === 'bn' ? 'রুফটপ ওপেন ডেক' : 'Rooftop Stargazing Deck', 
      icon: <Calendar className="w-4 h-4" /> 
    },
    { 
      id: 'espresso-bar', 
      label: language === 'bn' ? 'ক্যাফে অ্যান্ড ব্রু বার' : 'Hearth & Specialty Brew Bar', 
      icon: <Clock className="w-4 h-4" /> 
    },
  ];

  return (
    <section id="reservations" className="relative overflow-hidden bg-[#070e0c]">
      <AuroraBackground className="py-24 px-4 sm:px-6 lg:px-8" showRadialGradient={true}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <AppleScrollReveal className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center mb-3">
              <ShimmerBadge icon={<Sparkles className="w-3.5 h-3.5 text-[#dfb86c]" />}>
                {t.reservation.badge}
              </ShimmerBadge>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#fdfbf7] mb-4 tracking-wide">
              {t.reservation.title}
            </h2>

            <p className="text-sm sm:text-base text-[#8fa69d]">
              {t.reservation.subtitle}
            </p>

            {/* Location Notice with Google Map Point */}
            <div className="mt-6 p-3 rounded-xl bg-[#14241f]/85 border border-[#dfb86c]/30 text-xs text-[#e5c378] flex flex-wrap items-center justify-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#dfb86c] shrink-0" />
              <span>{RESTAURANT_DATA.contact.notice}</span>
              <a
                href={RESTAURANT_DATA.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#fdfbf7] font-semibold text-[#dfb86c] ml-1"
              >
                📍 {language === 'bn' ? 'গুগল ম্যাপে দেখুন' : 'View Google Map'}
              </a>
            </div>
          </AppleScrollReveal>

          {/* Confirmation Card if already submitted */}
          <AppleScrollReveal delayMs={150}>
            {submittedRef ? (
              <div className="p-8 rounded-2xl glass-panel-elevated border border-[#dfb86c]/50 text-center space-y-4 animate-scaleUp apple-card-hover">
                <div className="w-14 h-14 rounded-full bg-[#dfb86c]/20 border border-[#dfb86c] text-[#dfb86c] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <h3 className="text-2xl font-serif text-[#fdfbf7]">
                  {language === 'bn' ? 'বুকিং অনুরোধ গ্রহণ করা হয়েছে' : 'Concierge Request Received'}
                </h3>

                <div className="inline-block px-4 py-2 rounded-lg bg-[#0e1b17] border border-[#dfb86c]/40 font-mono text-sm text-[#e5c378]">
                  Reference Code: <strong>{submittedRef}</strong>
                </div>

                <p className="text-sm text-[#8fa69d] max-w-md mx-auto leading-relaxed">
                  {language === 'bn'
                    ? `ধন্যবাদ, ${formData.name}! জলছবি ক্যাফেতে ${formData.date} তারিখে ${formData.time} এর সময় ${formData.guests} জনের টেবিলের অনুরোধ নথিভুক্ত করা হয়েছে।`
                    : `Thank you, ${formData.name}. Our concierge at Jalchabi (Canning II) has logged your reservation for ${formData.guests} guests on ${formData.date} at ${formData.time}.`}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 max-w-md mx-auto">
                  <a
                    href={`https://wa.me/918918948730?text=${encodeURIComponent(
                      `Hello Jalchabi Cafe & Restaurant, I have submitted a table reservation inquiry.\n\n` +
                      `📋 Reference: ${submittedRef}\n` +
                      `👤 Name: ${formData.name}\n` +
                      `👥 Guests: ${formData.guests}\n` +
                      `📅 Date: ${formData.date}\n` +
                      `⏰ Time: ${formData.time}\n` +
                      `🪑 Seating: ${formData.seatingArea}\n` +
                      `${formData.specialRequests ? `📝 Notes: ${formData.specialRequests}\n` : ''}\n` +
                      `Please confirm table availability with Sabir Hossen Khan. Thank you!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer min-h-[44px]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{language === 'bn' ? 'হোয়াটসঅ্যাপে বুকিং পাঠান' : 'Dispatch via WhatsApp'}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setSubmittedRef(null)}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#dfb86c]/40 text-xs font-semibold uppercase tracking-wider text-[#e5c378] hover:bg-[#dfb86c]/10 transition-colors cursor-pointer min-h-[44px]"
                  >
                    {language === 'bn' ? 'আরেকটি বুকিং করুন' : 'Submit Another Inquiry'}
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Form */
              <form
                onSubmit={handleSubmit}
                className="p-6 sm:p-10 rounded-2xl glass-panel border border-[#dfb86c]/30 shadow-2xl space-y-6 apple-card-hover"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="reservation-name" className="block text-xs uppercase tracking-wider text-[#8fa69d] mb-2 font-medium">
                      {t.reservation.nameLabel}
                    </label>
                    <input
                      id="reservation-name"
                      name="name"
                      autoComplete="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sabir Hossen Khan"
                      className="w-full px-4 py-3 rounded-xl bg-[#0e1b17] border border-[#dfb86c]/25 text-[#fdfbf7] placeholder-[#8fa69d]/40 focus:outline-none focus:border-[#dfb86c] transition-colors text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="reservation-email" className="block text-xs uppercase tracking-wider text-[#8fa69d] mb-2 font-medium">
                      {t.reservation.emailLabel}
                    </label>
                    <input
                      id="reservation-email"
                      name="email"
                      autoComplete="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#0e1b17] border border-[#dfb86c]/25 text-[#fdfbf7] placeholder-[#8fa69d]/40 focus:outline-none focus:border-[#dfb86c] transition-colors text-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="reservation-phone" className="block text-xs uppercase tracking-wider text-[#8fa69d] mb-2 font-medium">
                      {t.reservation.phoneLabel}
                    </label>
                    <input
                      id="reservation-phone"
                      name="phone"
                      autoComplete="tel"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 89189 48730"
                      className="w-full px-4 py-3 rounded-xl bg-[#0e1b17] border border-[#dfb86c]/25 text-[#fdfbf7] placeholder-[#8fa69d]/40 focus:outline-none focus:border-[#dfb86c] transition-colors text-sm"
                    />
                  </div>

                  {/* Guests Count */}
                  <div>
                    <label htmlFor="reservation-guests" className="block text-xs uppercase tracking-wider text-[#8fa69d] mb-2 font-medium">
                      {t.reservation.guestsLabel}
                    </label>
                    <div className="relative">
                      <select
                        id="reservation-guests"
                        name="guests"
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0e1b17] border border-[#dfb86c]/25 text-[#fdfbf7] focus:outline-none focus:border-[#dfb86c] transition-colors text-sm appearance-none"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                          <option key={num} value={num} className="bg-[#0e1b17]">
                            {num} {num === 1 ? (language === 'bn' ? 'জন অতিথি' : 'Guest') : (language === 'bn' ? 'জন অতিথি' : 'Guests')}
                          </option>
                        ))}
                      </select>
                      <Users className="w-4 h-4 text-[#dfb86c] absolute right-4 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label htmlFor="reservation-date" className="block text-xs uppercase tracking-wider text-[#8fa69d] mb-2 font-medium">
                      {t.reservation.dateLabel}
                    </label>
                    <div className="relative">
                      <input
                        id="reservation-date"
                        name="date"
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0e1b17] border border-[#dfb86c]/25 text-[#fdfbf7] focus:outline-none focus:border-[#dfb86c] transition-colors text-sm"
                      />
                      <Calendar className="w-4 h-4 text-[#dfb86c] absolute right-4 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Time */}
                  <div>
                    <label htmlFor="reservation-time" className="block text-xs uppercase tracking-wider text-[#8fa69d] mb-2 font-medium">
                      {t.reservation.timeLabel}
                    </label>
                    <div className="relative">
                      <select
                        id="reservation-time"
                        name="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#0e1b17] border border-[#dfb86c]/25 text-[#fdfbf7] focus:outline-none focus:border-[#dfb86c] transition-colors text-sm appearance-none"
                      >
                        <option value="11:30" className="bg-[#0e1b17]">11:30 AM — {language === 'bn' ? 'সকালের স্ন্যাক্স ও চা' : 'Morning Snacks & Tea'}</option>
                        <option value="13:30" className="bg-[#0e1b17]">01:30 PM — {language === 'bn' ? 'দুপুরের স্পেশাল দম বিরিয়ানি' : 'Afternoon Lunch & Biryani'}</option>
                        <option value="16:30" className="bg-[#0e1b17]">04:30 PM — {language === 'bn' ? 'বিকালের মোমো ও কফি' : 'Afternoon Momos & Coffee'}</option>
                        <option value="18:30" className="bg-[#0e1b17]">06:30 PM — {language === 'bn' ? 'সন্ধ্যার ড্রামস অফ হেভেন ও আড্ডা' : 'Twilight Drums of Heaven & Adda'}</option>
                        <option value="20:00" className="bg-[#0e1b17]">08:00 PM — {language === 'bn' ? 'রাত্রিকালীন ডিনার ও কাঠি রোল' : 'Night Dinner & Kathi Rolls'}</option>
                      </select>
                      <Clock className="w-4 h-4 text-[#dfb86c] absolute right-4 top-3.5 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Seating Area Preference */}
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#8fa69d] mb-2 font-medium">
                    {t.reservation.seatingLabel}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {seatingOptions.map((seat) => (
                      <button
                        key={seat.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, seatingArea: seat.id as ReservationFormData['seatingArea'] })}
                        className={`p-3 rounded-xl border text-xs font-medium tracking-wide flex items-center gap-2.5 transition-all text-left cursor-pointer min-h-[44px] ${
                          formData.seatingArea === seat.id
                            ? 'bg-[#dfb86c]/20 border-[#dfb86c] text-[#fdfbf7] shadow-sm'
                            : 'bg-[#0e1b17] border-[#dfb86c]/20 text-[#8fa69d] hover:border-[#dfb86c]/40'
                        }`}
                      >
                        <span className="text-[#dfb86c]">{seat.icon}</span>
                        <span>{seat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label htmlFor="reservation-notes" className="block text-xs uppercase tracking-wider text-[#8fa69d] mb-2 font-medium">
                    {t.reservation.notesLabel}
                  </label>
                  <textarea
                    id="reservation-notes"
                    name="specialRequests"
                    rows={3}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    placeholder={language === 'bn' ? 'জন্মদিন, বিশেষ অনুষ্ঠান বা খাবারের কোনো বিশেষ পছন্দের কথা লিখুন...' : 'Please share any birthday details, seating preference, or dietary notes...'}
                    className="w-full px-4 py-3 rounded-xl bg-[#0e1b17] border border-[#dfb86c]/25 text-[#fdfbf7] placeholder-[#8fa69d]/40 focus:outline-none focus:border-[#dfb86c] transition-colors text-sm"
                  />
                </div>

                {/* Submit Button with Magnetic Physics */}
                <div className="w-full pt-2">
                  <MagneticButton className="w-full" magneticStrength={0.18}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] hover:brightness-110 text-[#070e0c] font-semibold text-xs tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(223,184,108,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>{t.reservation.submitting}</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{t.reservation.submitBtn}</span>
                        </>
                      )}
                    </button>
                  </MagneticButton>
                </div>
              </form>
            )}
          </AppleScrollReveal>
        </div>
      </AuroraBackground>
    </section>
  );
});
