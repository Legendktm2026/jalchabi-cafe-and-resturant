import React from 'react';
import { Sparkles, Compass, Feather, MapPin } from 'lucide-react';
import { RESTAURANT_DATA } from '../../config/restaurantData';
import { AppleScrollReveal } from './AppleScrollReveal';
import { TracingBeam } from './TracingBeam';
import { LampContainer } from './LampContainer';
import { FlipWords } from './FlipWords';
import { WaterRippleCanvas } from './WaterRippleCanvas';

export const ConceptStorySection: React.FC = React.memo(() => {
  return (
    <section id="story" className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#070e0c] relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#dfb86c]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#0a1e19]/25 rounded-full blur-3xl pointer-events-none" />

      {/* Aceternity Lamp Section Entrance */}
      <LampContainer glowColor="#dfb86c">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#14241f] text-[#e5c378] mb-4 border border-[#dfb86c]/30">
          <Feather className="w-3.5 h-3.5" />
          <span>The Spirit of Jalchabi</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#fdfbf7] mb-3 tracking-wide leading-tight">
          A Sanctuary for{' '}
          <FlipWords
            words={[
              'watercolor reflections',
              'liquid memories',
              'quiet conversation',
              'artisanal hearth',
              'twilight tranquility',
            ]}
          />
        </h2>

        <p className="text-base sm:text-lg text-[#8fa69d] font-serif italic max-w-xl mx-auto">
          {RESTAURANT_DATA.meta.storyHeadline}
        </p>
      </LampContainer>

      {/* Aceternity Tracing Beam Wrapper */}
      <TracingBeam>
        <div className="max-w-7xl mx-auto mt-6">
          {/* Two-Column Editorial Narrative with Concept Art & Gemini Render */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            {/* Left Column: Architectural Imagery Showcase with Animmaster Water Ripple */}
            <AppleScrollReveal delayMs={100} className="lg:col-span-6 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-[#dfb86c]/30 shadow-2xl group">
                <WaterRippleCanvas
                  imageSrc="/images/jalchabi-hero.png"
                  alt="Jalchabi Lakeside Sanctuary Golden Dusk Concept"
                  aspectRatio="aspect-[16/10]"
                />

                <div className="p-4 rounded-b-2xl glass-panel border-t border-[#dfb86c]/20">
                  <span className="text-[10px] uppercase tracking-widest text-[#dfb86c] font-medium flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3 h-3" />
                    Lakeside Dusk Sanctuary • Kolkata
                  </span>
                  <p className="text-xs text-[#fdfbf7] font-serif">
                    Hover to ripple the water reflections. Serene lake vistas, open lawns, and 4+4 waterside veranda seating.
                  </p>
                </div>
              </div>
            </AppleScrollReveal>

            {/* Right Column: Editorial Copy */}
            <AppleScrollReveal delayMs={200} className="lg:col-span-6 space-y-6 text-[#8fa69d] text-base leading-relaxed">
              <h3 className="text-2xl sm:text-3xl font-serif text-[#fdfbf7] font-normal">
                A Lakeside Sanctuary in the Heart of Bengal
              </h3>
              <p>
                In Bengali, <span className="text-[#e5c378] font-serif italic">Jalchabi</span> (জলছবি) signifies the mesmerizing watercolor reflections and fleeting silhouettes that shimmer upon moving water. For generations, Kolkata has celebrated unhurried cultural contemplation — quiet literature, spirited conversation (<span className="italic">adda</span>), and reverence for nature.
              </p>
              <p>
                In its physical essence, Jalchabi unfolds around an intimate, tranquil lake. On both water’s edges rests a <span className="text-[#fdfbf7] font-medium">4+4 waterside seating arrangement</span>, where guests sip pour-overs while watching ripples catch the golden dusk.
              </p>
              <p>
                To the left sits our full-service <span className="text-[#fdfbf7] font-medium">Heritage Restaurant</span> and an enclosed, private <span className="text-[#fdfbf7] font-medium">SE Room</span> for intimate salon gatherings. To the right lies an expansive, pristine green lawn hosting <span className="text-[#fdfbf7] font-medium">five beautiful private dining tents</span>, complemented by waterside cabanas and an open-air <span className="text-[#fdfbf7] font-medium">rooftop experience</span> overlooking the entire starlit sanctuary.
              </p>

              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#dfb86c]/20">
                <div>
                  <span className="block text-2xl font-serif text-[#e5c378]">4 + 4</span>
                  <span className="text-[11px] uppercase tracking-wider text-[#8fa69d]">Lakeside Edges</span>
                </div>
                <div>
                  <span className="block text-2xl font-serif text-[#e5c378]">5 Tents</span>
                  <span className="text-[11px] uppercase tracking-wider text-[#8fa69d]">Lawn Cabanas</span>
                </div>
                <div>
                  <span className="block text-2xl font-serif text-[#e5c378]">SE Room</span>
                  <span className="text-[11px] uppercase tracking-wider text-[#8fa69d]">Private Dining</span>
                </div>
                <div>
                  <span className="block text-2xl font-serif text-[#e5c378]">Rooftop</span>
                  <span className="text-[11px] uppercase tracking-wider text-[#8fa69d]">Stargazing Deck</span>
                </div>
              </div>
            </AppleScrollReveal>
          </div>

          {/* Real Cafe Four Architectural Havens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AppleScrollReveal delayMs={100}>
              <div className="p-7 rounded-2xl glass-panel border border-[#dfb86c]/20 hover:border-[#dfb86c]/50 apple-card-hover group h-full">
                <div className="w-11 h-11 rounded-full bg-[#dfb86c]/15 flex items-center justify-center text-[#dfb86c] mb-5 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-serif text-[#fdfbf7] mb-2">The 4+4 Lakeside Edge</h4>
                <p className="text-xs text-[#8fa69d] leading-relaxed">
                  Positioned directly on both banks of the serene lake. Four intimate tables per side offer front-row water reflections, ripples, and cool twilight breezes.
                </p>
              </div>
            </AppleScrollReveal>

            <AppleScrollReveal delayMs={150}>
              <div className="p-7 rounded-2xl glass-panel border border-[#dfb86c]/20 hover:border-[#dfb86c]/50 apple-card-hover group h-full">
                <div className="w-11 h-11 rounded-full bg-[#dfb86c]/15 flex items-center justify-center text-[#dfb86c] mb-5 group-hover:scale-110 transition-transform">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-serif text-[#fdfbf7] mb-2">Clean Lawn &amp; 5 Tents</h4>
                <p className="text-xs text-[#8fa69d] leading-relaxed">
                  The open right-wing meadow features five bespoke luxury dining tents designed for diverse audiences — families, friend reunions, and romantic rendezvous.
                </p>
              </div>
            </AppleScrollReveal>

            <AppleScrollReveal delayMs={200}>
              <div className="p-7 rounded-2xl glass-panel border border-[#dfb86c]/20 hover:border-[#dfb86c]/50 apple-card-hover group h-full">
                <div className="w-11 h-11 rounded-full bg-[#dfb86c]/15 flex items-center justify-center text-[#dfb86c] mb-5 group-hover:scale-110 transition-transform">
                  <Feather className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-serif text-[#fdfbf7] mb-2">Restaurant &amp; SE Room</h4>
                <p className="text-xs text-[#8fa69d] leading-relaxed">
                  The left wing anchors the artisanal culinary hearth and an exclusive Special Enclosed (SE Room) suite for private celebrations and executive banquets.
                </p>
              </div>
            </AppleScrollReveal>

            <AppleScrollReveal delayMs={250}>
              <div className="p-7 rounded-2xl glass-panel border border-[#dfb86c]/20 hover:border-[#dfb86c]/50 apple-card-hover group h-full">
                <div className="w-11 h-11 rounded-full bg-[#dfb86c]/15 flex items-center justify-center text-[#dfb86c] mb-5 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-serif text-[#fdfbf7] mb-2">Rooftop Experience</h4>
                <p className="text-xs text-[#8fa69d] leading-relaxed">
                  An elevated open-air rooftop deck commanding unobstructed panoramic vistas across the lake, illuminated lawn tents, and Kolkata’s evening sky.
                </p>
              </div>
            </AppleScrollReveal>
          </div>
        </div>
      </TracingBeam>
    </section>
  );
});
