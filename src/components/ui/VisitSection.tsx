import React from 'react';
import { RESTAURANT_DATA } from '../../config/restaurantData';
import { MapPin, Clock, Phone, Mail, Wifi, Accessibility, Coffee, Sparkles } from 'lucide-react';
import { AppleScrollReveal } from './AppleScrollReveal';

export const VisitSection: React.FC = () => {
  return (
    <section id="visit" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#16100b] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AppleScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#c58b4b]/15 text-[#e6be8a] mb-4 border border-[#c58b4b]/30">
            <MapPin className="w-3.5 h-3.5" />
            <span>Kolkata City Context</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#f5efe6] mb-4 tracking-wide">
            A Place to Linger in Kolkata
          </h2>

          <p className="text-sm sm:text-base text-[#c9bea9] max-w-xl mx-auto">
            Our proposed architectural sanctuary is situated within the cultural fabric of Kolkata.
          </p>
        </AppleScrollReveal>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Location & Verification Notice Card */}
          <AppleScrollReveal delayMs={100} className="lg:col-span-6">
            <div className="p-8 rounded-2xl glass-panel border border-[#c58b4b]/30 space-y-6 apple-card-hover">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#c58b4b] font-medium block mb-2">
                City of Presence
              </span>
              <h3 className="text-3xl font-serif text-[#f5efe6] mb-2">
                Kolkata, West Bengal
              </h3>
              <p className="text-sm text-[#c9bea9] leading-relaxed">
                Conceived as an urban haven honoring the city’s literary tradition, river reflections, and deep affection for slow-paced hospitality.
              </p>
            </div>

            {/* Official Notice on Address & Contacts */}
            <div className="p-4 rounded-xl bg-[#281e17]/90 border border-[#c58b4b]/40">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e6be8a] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#c58b4b]" />
                <span>Launch &amp; Address Notice</span>
              </div>
              <p className="text-xs text-[#c9bea9] leading-relaxed">
                {RESTAURANT_DATA.contact.notice}
              </p>
            </div>

            {/* Configurable Contact Information */}
            <div className="space-y-4 pt-4 border-t border-[#c58b4b]/20">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-full bg-[#c58b4b]/10 text-[#c58b4b] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#e6be8a] font-medium">Flagship Quarters</h4>
                  <p className="text-sm text-[#f5efe6]">{RESTAURANT_DATA.contact.addressLine1}</p>
                  <p className="text-xs text-[#c9bea9]">{RESTAURANT_DATA.contact.addressLine2}, Kolkata, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-full bg-[#c58b4b]/10 text-[#c58b4b] shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#e6be8a] font-medium">Concierge Inquiries</h4>
                  <p className="text-sm text-[#f5efe6]">{RESTAURANT_DATA.contact.phoneDisplay}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-full bg-[#c58b4b]/10 text-[#c58b4b] shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#e6be8a] font-medium">Electronic Dispatch</h4>
                  <p className="text-sm text-[#f5efe6]">{RESTAURANT_DATA.contact.email}</p>
                </div>
              </div>
            </div>

            {/* Features Row */}
            <div className="pt-4 border-t border-[#c58b4b]/20 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-xs text-[#c9bea9]">
                <Wifi className="w-3.5 h-3.5 text-[#c58b4b]" />
                <span>High-Speed Wi-Fi</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#c9bea9]">
                <Accessibility className="w-3.5 h-3.5 text-[#c58b4b]" />
                <span>Accessible Design</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#c9bea9]">
                <Coffee className="w-3.5 h-3.5 text-[#c58b4b]" />
                <span>Terrace Seating</span>
              </div>
            </div>
            </div>
          </AppleScrollReveal>

          {/* Right Column: Proposed Operating Hours */}
          <AppleScrollReveal delayMs={200} className="lg:col-span-6">
            <div className="p-8 rounded-2xl glass-panel border border-[#c58b4b]/30 space-y-6 apple-card-hover">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-full bg-[#c58b4b]/10 text-[#c58b4b]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#c58b4b] font-medium block">
                    Weekly Rhythm
                  </span>
                  <h3 className="text-2xl font-serif text-[#f5efe6]">
                    Proposed Service Hours
                  </h3>
                </div>
              </div>

              <div className="divide-y divide-[#c58b4b]/15">
                {RESTAURANT_DATA.hours.map((schedule, idx) => (
                  <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="font-serif text-base text-[#f5efe6] block font-medium">
                        {schedule.days}
                      </span>
                      {schedule.notes && (
                        <span className="text-xs text-[#c9bea9] block mt-0.5">
                          {schedule.notes}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-sm font-semibold text-[#e6be8a] shrink-0">
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#1c1510] border border-[#c58b4b]/20 text-xs text-[#c9bea9] leading-relaxed">
                <strong className="text-[#e6be8a]">A Note on Reservations:</strong> We welcome both walk-in guests seeking quiet coffee moments and reserved banquette bookings for group dining and evening acoustic gatherings.
              </div>
            </div>
          </AppleScrollReveal>
        </div>
      </div>
    </section>
  );
};
