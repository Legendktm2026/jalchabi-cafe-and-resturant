import React from 'react';
import { InfiniteMovingCards, MarqueeItem } from './InfiniteMovingCards';
import { ShimmerBadge } from './ShimmerBadge';
import { Award } from 'lucide-react';

const MARQUEE_ITEMS: MarqueeItem[] = [
  {
    quote: "A poetic twilight sanctuary in South Kolkata where moving water and architectural serenity meet exceptional estate roasts.",
    name: "Architectural Digest India",
    title: "Design & Spatial Living",
    badge: "CRITICAL ACCLAIM",
  },
  {
    quote: "High-grown micro-lot Arabica cultivated at 1,100 meters in the Eastern Ghats, extracted with delicate jasmine and dried fig notes.",
    name: "Araku Highlands Estate",
    title: "Andhra Pradesh • Single Origin",
    badge: "ESTATE PROVENANCE",
  },
  {
    quote: "Kolkata's most atmospheric waterside hideaway. The 4+4 lakeside veranda tables at golden hour are unforgettable.",
    name: "Condé Nast Traveller",
    title: "Culinary Escapes Guide",
    badge: "TRAVEL HONOUR",
  },
  {
    quote: "Pulped sun-dried heirloom beans from the Biligirirangana Hills, roasted light-medium for a syrupy dark-honey body.",
    name: "Attikan Estate Micro-Lot",
    title: "Karnataka • High Elevation",
    badge: "ESTATE PROVENANCE",
  },
  {
    quote: "The art of unhurried conversation reimagined through Kolkata heritage architecture, custom brass hardware, and hearth dining.",
    name: "The Telegraph Metro",
    title: "Culture & Gastronomy",
    badge: "HERITAGE FEATURE",
  },
  {
    quote: "Single-estate high mountain Arabica with crisp citrus acidity, black tea tannins, and sweet elderflower finish.",
    name: "Nilgiri Blue Mountain Reserve",
    title: "Tamil Nadu • Estate Roasts",
    badge: "ESTATE PROVENANCE",
  },
];

export const ProvenanceMarqueeSection: React.FC = React.memo(() => {
  return (
    <section className="py-20 bg-[#070e0c] border-y border-[#dfb86c]/15 relative overflow-hidden select-none">
      {/* Ambient center radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-48 bg-[#dfb86c]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center relative z-10">
        <div className="flex justify-center mb-3">
          <ShimmerBadge icon={<Award className="w-3.5 h-3.5 text-[#dfb86c]" />}>
            Terroir Provenance &amp; Critical Praise
          </ShimmerBadge>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#fdfbf7] tracking-wide">
          Esteemed Estate Partners &amp; Literary Acclaim
        </h3>
        <p className="font-serif italic text-xs sm:text-sm text-[#8fa69d] max-w-md mx-auto mt-1">
          Honoring the agricultural hands and cultural storytellers who shape Jalchabi.
        </p>
      </div>

      {/* Infinite Moving Cards Ribbon */}
      <InfiniteMovingCards
        items={MARQUEE_ITEMS}
        direction="left"
        speed="normal"
        pauseOnHover={true}
      />
    </section>
  );
});
