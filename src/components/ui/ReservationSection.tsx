import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ReservationFormData } from '../../types';
import { RESTAURANT_DATA } from '../../config/restaurantData';
import { Sparkles, CheckCircle2, AlertCircle, Calendar, Users, Clock, Armchair, Send } from 'lucide-react';
import { AppleScrollReveal } from './AppleScrollReveal';

interface ReservationSectionProps {
  onSuccessModal: (referenceId: string, data: ReservationFormData) => void;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({ onSuccessModal }) => {
  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    email: '',
    phone: '',
    guests: 2,
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '19:30',
    seatingArea: 'cozy-booth',
    specialRequests: '',
    dietaryNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate concierge dispatch delay
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedRef = `JAL-CC-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedRef(generatedRef);
      onSuccessModal(generatedRef, formData);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#c58b4b', '#e6be8a', '#1e2e26', '#f5efe6'],
        });
      } catch {
        // Silently ignore if canvas-confetti is unavailable
      }
    }, 700);
  };

  return (
    <section id="reservations" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#120d09] relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <AppleScrollReveal className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#c58b4b]/15 text-[#e6be8a] mb-4 border border-[#c58b4b]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Table Concierge &amp; Enquiries</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#f5efe6] mb-4 tracking-wide">
            Reserve Your Sanctuary
          </h2>

          <p className="text-sm sm:text-base text-[#c9bea9]">
            Whether for morning single-origin tastings, business luncheons, or twilight dinner in our walnut booths.
          </p>

          {/* Backend simulation disclosure */}
          <div className="mt-6 p-3 rounded-xl bg-[#281e17]/80 border border-[#c58b4b]/30 text-xs text-[#e6be8a] flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#c58b4b] shrink-0" />
            <span>{RESTAURANT_DATA.reservationEndpoint.notice}</span>
          </div>
        </AppleScrollReveal>

        {/* Confirmation Card if already submitted */}
        <AppleScrollReveal delayMs={150}>
          {submittedRef ? (
            <div className="p-8 rounded-2xl glass-panel-elevated border border-[#c58b4b]/50 text-center space-y-4 animate-scaleUp apple-card-hover">
              <div className="w-14 h-14 rounded-full bg-[#c58b4b]/20 border border-[#c58b4b] text-[#c58b4b] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-serif text-[#f5efe6]">
                Concierge Request Simulated
              </h3>

              <div className="inline-block px-4 py-2 rounded-lg bg-[#18120d] border border-[#c58b4b]/40 font-mono text-sm text-[#e6be8a]">
                Reference Code: <strong>{submittedRef}</strong>
              </div>

              <p className="text-sm text-[#c9bea9] max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. In a live production deployment, our concierge would confirm your table for {formData.guests} guests on {formData.date} at {formData.time}.
              </p>

              <button
                type="button"
                onClick={() => setSubmittedRef(null)}
                className="mt-4 px-6 py-2.5 rounded-full border border-[#c58b4b]/40 text-xs font-semibold uppercase tracking-wider text-[#e6be8a] hover:bg-[#c58b4b]/10 transition-colors"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            /* Booking Form */
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-10 rounded-2xl glass-panel border border-[#c58b4b]/30 shadow-2xl space-y-6 apple-card-hover"
            >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#c9bea9] mb-2 font-medium">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Satyajit Ray"
                  className="w-full px-4 py-3 rounded-xl bg-[#1a130e] border border-[#c58b4b]/25 text-[#f5efe6] placeholder-[#c9bea9]/40 focus:outline-none focus:border-[#c58b4b] transition-colors text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#c9bea9] mb-2 font-medium">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#1a130e] border border-[#c58b4b]/25 text-[#f5efe6] placeholder-[#c9bea9]/40 focus:outline-none focus:border-[#c58b4b] transition-colors text-sm"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#c9bea9] mb-2 font-medium">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98300 XXXXX"
                  className="w-full px-4 py-3 rounded-xl bg-[#1a130e] border border-[#c58b4b]/25 text-[#f5efe6] placeholder-[#c9bea9]/40 focus:outline-none focus:border-[#c58b4b] transition-colors text-sm"
                />
              </div>

              {/* Guests Count */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#c9bea9] mb-2 font-medium">
                  Number of Guests
                </label>
                <div className="relative">
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1a130e] border border-[#c58b4b]/25 text-[#f5efe6] focus:outline-none focus:border-[#c58b4b] transition-colors text-sm appearance-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                      <option key={num} value={num} className="bg-[#1a130e]">
                        {num} {num === 1 ? 'Guest (Solo)' : 'Guests'}
                      </option>
                    ))}
                  </select>
                  <Users className="w-4 h-4 text-[#c58b4b] absolute right-4 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#c9bea9] mb-2 font-medium">
                  Preferred Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1a130e] border border-[#c58b4b]/25 text-[#f5efe6] focus:outline-none focus:border-[#c58b4b] transition-colors text-sm"
                  />
                  <Calendar className="w-4 h-4 text-[#c58b4b] absolute right-4 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#c9bea9] mb-2 font-medium">
                  Service Time
                </label>
                <div className="relative">
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1a130e] border border-[#c58b4b]/25 text-[#f5efe6] focus:outline-none focus:border-[#c58b4b] transition-colors text-sm appearance-none"
                  >
                    <option value="08:30" className="bg-[#1a130e]">08:30 AM — Morning Brew &amp; Brioche</option>
                    <option value="11:30" className="bg-[#1a130e]">11:30 AM — Artisanal Brunch</option>
                    <option value="13:30" className="bg-[#1a130e]">01:30 PM — Afternoon Luncheon</option>
                    <option value="16:30" className="bg-[#1a130e]">04:30 PM — Twilight Tea Service</option>
                    <option value="19:30" className="bg-[#1a130e]">07:30 PM — Evening Hearth Dinner</option>
                    <option value="21:00" className="bg-[#1a130e]">09:00 PM — Late Night Bistro</option>
                  </select>
                  <Clock className="w-4 h-4 text-[#c58b4b] absolute right-4 top-3.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Seating Area Preference */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#c9bea9] mb-2 font-medium">
                Seating Atmosphere Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { id: 'lakeside-edge', label: '4+4 Lakeside Edge Tables', icon: <Sparkles className="w-4 h-4" /> },
                  { id: 'lawn-tent', label: 'Lawn Cabana Tent (1 of 5)', icon: <Users className="w-4 h-4" /> },
                  { id: 'restaurant-se', label: 'Restaurant & SE Room', icon: <Armchair className="w-4 h-4" /> },
                  { id: 'rooftop-deck', label: 'Rooftop Stargazing Deck', icon: <Calendar className="w-4 h-4" /> },
                  { id: 'lakeside-tent', label: 'Lakeside Cabana Tent', icon: <Sparkles className="w-4 h-4" /> },
                  { id: 'espresso-bar', label: 'Hearth & Specialty Brew Bar', icon: <Clock className="w-4 h-4" /> },
                ].map((seat) => (
                  <button
                    key={seat.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, seatingArea: seat.id as ReservationFormData['seatingArea'] })}
                    className={`p-3 rounded-xl border text-xs font-medium tracking-wide flex items-center gap-2.5 transition-all text-left cursor-pointer ${
                      formData.seatingArea === seat.id
                        ? 'bg-[#c58b4b]/20 border-[#c58b4b] text-[#f5efe6] shadow-sm'
                        : 'bg-[#1a130e] border-[#c58b4b]/20 text-[#c9bea9] hover:border-[#c58b4b]/40'
                    }`}
                  >
                    <span className="text-[#c58b4b]">{seat.icon}</span>
                    <span>{seat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#c9bea9] mb-2 font-medium">
                Dietary Requirements or Special Occasion Notes
              </label>
              <textarea
                rows={3}
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                placeholder="Please share any food allergies, dietary preferences, or anniversary details..."
                className="w-full px-4 py-3 rounded-xl bg-[#1a130e] border border-[#c58b4b]/25 text-[#f5efe6] placeholder-[#c9bea9]/40 focus:outline-none focus:border-[#c58b4b] transition-colors text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#c58b4b] to-[#dfb15b] hover:brightness-110 text-[#120d09] font-semibold text-xs tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(197,139,75,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Simulating Concierge Dispatch...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Request Table Reservation</span>
                </>
              )}
            </button>
          </form>
        )}
        </AppleScrollReveal>
      </div>
    </section>
  );
};
