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
              A Contemporary Sanctuary in the City of Joy
            </h3>
            <p>
              In Bengali, <span className="text-[#e6be8a] font-serif italic">Jalchobi</span> refers to delicate watercolor paintings or fleeting silhouettes that ripple across moving water. For generations, Kolkata has been defined by its unhurried intellectual culture — an enduring appreciation for quiet literature, spirited conversation (<span className="italic">adda</span>), and artisanal craftsmanship.
            </p>
            <p>
              Jalchobi was conceived as an ode to this cultural soul. We sought to design an architectural haven where the relentless tempo of urban life softly yields to amber lighting, warm walnut timber, and the rhythmic hiss of extracting espresso.
            </p>
            <p>
              Every material inside our 3D space reflects intention: reclaimed dark timber beams from historic Bengal river barges, custom hammered brass accents, and fluted deep green acoustic paneling designed so that intimate whispers remain sacred.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-[#c58b4b]/20">
              <div>
                <span className="block text-2xl font-serif text-[#e6be8a]">100%</span>
                <span className="text-xs uppercase tracking-wider text-[#c9bea9]">Direct-Trade Indian Estates</span>
              </div>
              <div>
                <span className="block text-2xl font-serif text-[#e6be8a]">32+ Seats</span>
                <span className="text-xs uppercase tracking-wider text-[#c9bea9]">Acoustic Banquette Alcoves</span>
              </div>
            </div>
          </AppleScrollReveal>
        </div>

        {/* Three Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AppleScrollReveal delayMs={100}>
            <div className="p-8 rounded-2xl glass-panel border border-[#c58b4b]/20 hover:border-[#c58b4b]/50 apple-card-hover group h-full">
              <div className="w-12 h-12 rounded-full bg-[#c58b4b]/15 flex items-center justify-center text-[#c58b4b] mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-serif text-[#f5efe6] mb-3">Artisanal Extraction</h4>
              <p className="text-sm text-[#c9bea9] leading-relaxed">
                Curated single-origin coffees sourced from high-altitude estates in Araku Valley, Chikmagalur, and the Nilgiris, extracted via custom dual-group brass machinery and Kalita drippers.
              </p>
            </div>
          </AppleScrollReveal>

          <AppleScrollReveal delayMs={200}>
            <div className="p-8 rounded-2xl glass-panel border border-[#c58b4b]/20 hover:border-[#c58b4b]/50 apple-card-hover group h-full">
              <div className="w-12 h-12 rounded-full bg-[#c58b4b]/15 flex items-center justify-center text-[#c58b4b] mb-6 group-hover:scale-110 transition-transform">
                <Feather className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-serif text-[#f5efe6] mb-3">Hearthside Baking</h4>
              <p className="text-sm text-[#c9bea9] leading-relaxed">
                Wild mushroom sourdough tartines, flaky saffron brioche, and bronte pistachio mille-feuille baked fresh every dawn in our hearth stone oven.
              </p>
            </div>
          </AppleScrollReveal>

          <AppleScrollReveal delayMs={300}>
            <div className="p-8 rounded-2xl glass-panel border border-[#c58b4b]/20 hover:border-[#c58b4b]/50 apple-card-hover group h-full">
              <div className="w-12 h-12 rounded-full bg-[#c58b4b]/15 flex items-center justify-center text-[#c58b4b] mb-6 group-hover:scale-110 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-serif text-[#f5efe6] mb-3">Sanctuary of Time</h4>
              <p className="text-sm text-[#c9bea9] leading-relaxed">
                A deliberate hospitality ethos. Whether lingering alone with an essay at twilight or sharing seasonal plates with friends, you are never rushed.
              </p>
            </div>
          </AppleScrollReveal>
        </div>
      </div>
    </section>
  );
};
