import React from 'react';
import { Sparkles, Compass, Feather } from 'lucide-react';
import { RESTAURANT_DATA } from '../../config/restaurantData';
import { AppleScrollReveal } from './AppleScrollReveal';

export const ConceptStorySection: React.FC = () => {
  return (
    <section id="story" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#120d09] relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#c58b4b]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#1e2e26]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <AppleScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#c58b4b]/15 text-[#e6be8a] mb-4 border border-[#c58b4b]/30">
            <Feather className="w-3.5 h-3.5" />
            <span>The Spirit of Jalchobi</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#f5efe6] mb-4 tracking-wide leading-tight">
            Mirrored Reflections, <br className="hidden sm:inline" />
            Unhurried Conversations.
          </h2>

          <p className="text-base sm:text-lg text-[#c9bea9] font-serif italic max-w-xl mx-auto">
            {RESTAURANT_DATA.meta.storyHeadline}
          </p>
        </AppleScrollReveal>

        {/* Two-Column Editorial Narrative with Concept Art */}
        {/* Two-Column Editorial Narrative with Concept Art */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Column: Architectural Imagery */}
          <AppleScrollReveal delayMs={100} className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#c58b4b]/30 shadow-2xl apple-card-hover">
              <img
                src="/images/jalchobi-interior-concept.jpg"
                alt="Jalchobi Interior Architectural Concept"
                className="w-full h-[450px] object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#120d09]/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-[#c58b4b]/20">
                <span className="text-[10px] uppercase tracking-widest text-[#c58b4b] font-medium block mb-1">
                  Concept Architecture • Kolkata
                </span>
                <p className="text-xs text-[#f5efe6] font-serif">
                  A fluted dark walnut brew bar, antique brass fittings, and curved forest green banquette niches.
                </p>
              </div>
            </div>
          </AppleScrollReveal>

          {/* Right Column: Editorial Copy */}
          <AppleScrollReveal delayMs={200} className="lg:col-span-6 space-y-6 text-[#c9bea9] text-base leading-relaxed">
            <h3 className="text-2xl sm:text-3xl font-serif text-[#f5efe6] font-normal">
              A Lakeside Sanctuary in the Heart of Bengal
            </h3>
            <p>
              In Bengali, <span className="text-[#e6be8a] font-serif italic">Jalchobi</span> (জলছবি) signifies the mesmerizing watercolor reflections and fleeting silhouettes that shimmer upon moving water. For generations, Kolkata has celebrated unhurried cultural contemplation — quiet literature, spirited conversation (<span className="italic">adda</span>), and reverence for nature.
            </p>
            <p>
              In its physical essence, Jalchobi unfolds around an intimate, tranquil lake. On both water’s edges rests a <span className="text-[#f5efe6] font-medium">4+4 waterside seating arrangement</span>, where guests sip pour-overs while watching ripples catch the golden dusk.
            </p>
            <p>
              To the left sits our full-service <span className="text-[#f5efe6] font-medium">Heritage Restaurant</span> and an enclosed, private <span className="text-[#f5efe6] font-medium">SE Room</span> for intimate salon gatherings. To the right lies an expansive, pristine green lawn hosting <span className="text-[#f5efe6] font-medium">five beautiful private dining tents</span>, complemented by waterside cabanas and an open-air <span className="text-[#f5efe6] font-medium">rooftop experience</span> overlooking the entire starlit sanctuary.
            </p>

            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#c58b4b]/20">
              <div>
                <span className="block text-2xl font-serif text-[#e6be8a]">4 + 4</span>
                <span className="text-[11px] uppercase tracking-wider text-[#c9bea9]">Lakeside Edges</span>
              </div>
              <div>
                <span className="block text-2xl font-serif text-[#e6be8a]">5 Tents</span>
                <span className="text-[11px] uppercase tracking-wider text-[#c9bea9]">Lawn Cabanas</span>
              </div>
              <div>
                <span className="block text-2xl font-serif text-[#e6be8a]">SE Room</span>
                <span className="text-[11px] uppercase tracking-wider text-[#c9bea9]">Private Dining</span>
              </div>
              <div>
                <span className="block text-2xl font-serif text-[#e6be8a]">Rooftop</span>
                <span className="text-[11px] uppercase tracking-wider text-[#c9bea9]">Stargazing Deck</span>
              </div>
            </div>
          </AppleScrollReveal>
        </div>

        {/* Real Cafe Four Architectural Havens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AppleScrollReveal delayMs={100}>
            <div className="p-7 rounded-2xl glass-panel border border-[#c58b4b]/20 hover:border-[#c58b4b]/50 apple-card-hover group h-full">
              <div className="w-11 h-11 rounded-full bg-[#c58b4b]/15 flex items-center justify-center text-[#c58b4b] mb-5 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif text-[#f5efe6] mb-2">The 4+4 Lakeside Edge</h4>
              <p className="text-xs text-[#c9bea9] leading-relaxed">
                Positioned directly on both banks of the serene lake. Four intimate tables per side offer front-row water reflections, ripples, and cool twilight breezes.
              </p>
            </div>
          </AppleScrollReveal>

          <AppleScrollReveal delayMs={150}>
            <div className="p-7 rounded-2xl glass-panel border border-[#c58b4b]/20 hover:border-[#c58b4b]/50 apple-card-hover group h-full">
              <div className="w-11 h-11 rounded-full bg-[#c58b4b]/15 flex items-center justify-center text-[#c58b4b] mb-5 group-hover:scale-110 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif text-[#f5efe6] mb-2">Clean Lawn &amp; 5 Tents</h4>
              <p className="text-xs text-[#c9bea9] leading-relaxed">
                The open right-wing meadow features five bespoke luxury dining tents designed for diverse audiences — families, friend reunions, and romantic rendezvous.
              </p>
            </div>
          </AppleScrollReveal>

          <AppleScrollReveal delayMs={200}>
            <div className="p-7 rounded-2xl glass-panel border border-[#c58b4b]/20 hover:border-[#c58b4b]/50 apple-card-hover group h-full">
              <div className="w-11 h-11 rounded-full bg-[#c58b4b]/15 flex items-center justify-center text-[#c58b4b] mb-5 group-hover:scale-110 transition-transform">
                <Feather className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif text-[#f5efe6] mb-2">Restaurant &amp; SE Room</h4>
              <p className="text-xs text-[#c9bea9] leading-relaxed">
                The left wing anchors the artisanal culinary hearth and an exclusive Special Enclosed (SE Room) suite for private celebrations and executive banquets.
              </p>
            </div>
          </AppleScrollReveal>

          <AppleScrollReveal delayMs={250}>
            <div className="p-7 rounded-2xl glass-panel border border-[#c58b4b]/20 hover:border-[#c58b4b]/50 apple-card-hover group h-full">
              <div className="w-11 h-11 rounded-full bg-[#c58b4b]/15 flex items-center justify-center text-[#c58b4b] mb-5 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-serif text-[#f5efe6] mb-2">Rooftop Experience</h4>
              <p className="text-xs text-[#c9bea9] leading-relaxed">
                An elevated open-air rooftop deck commanding unobstructed panoramic vistas across the lake, illuminated lawn tents, and Kolkata’s evening sky.
              </p>
            </div>
          </AppleScrollReveal>
        </div>
      </div>
    </section>
  );
};
