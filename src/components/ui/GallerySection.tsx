import React, { useState } from 'react';
import { RESTAURANT_DATA } from '../../config/restaurantData';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AppleScrollReveal } from './AppleScrollReveal';
import { FluidTabs, TabItem } from './FluidTabs';
import { FocusCards, FocusCardData } from './FocusCards';

interface GallerySectionProps {
  onOpenVideoModal?: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = React.memo(({ onOpenVideoModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories: TabItem<string>[] = [
    { key: 'All', label: 'All Impressions' },
    { key: 'Architecture', label: 'Architecture' },
    { key: 'Brew Bar', label: 'Brew Bar' },
    { key: 'Atmosphere', label: 'Atmosphere' },
    { key: 'Culinary', label: 'Culinary' },
  ];

  // Base gallery items supplemented with Google Gemini generated media
  const allCards: FocusCardData[] = [
    {
      id: 'gemini-video-card',
      title: 'Cinematic Sanctuary Tour',
      category: 'Architecture',
      image: '/images/jalchabi-hero.png',
      description: 'An unhurried visual film of our lakeside sanctuary, dining tents, and heritage brew bar.',
      isVideo: true,
    },
    {
      id: 'gemini-photo-card',
      title: 'Lakeside Golden Dusk',
      category: 'Atmosphere',
      image: '/images/jalchabi-hero.png',
      description: 'Tranquil water ripples, 4+4 waterside veranda seating, and warm ambient evening reflections.',
    },
    ...RESTAURANT_DATA.gallery.map((g) => ({
      id: g.id,
      title: g.title,
      category: g.category,
      image: g.image,
      description: g.description,
    })),
  ];

  const filteredCards = selectedCategory === 'All'
    ? allCards
    : allCards.filter((card) => card.category === selectedCategory);

  const handleCardClick = (index: number, card: FocusCardData) => {
    if (card.isVideo && onOpenVideoModal) {
      onOpenVideoModal();
    } else {
      setActiveLightboxIndex(index);
    }
  };

  const closeLightbox = () => setActiveLightboxIndex(null);

  const nextLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredCards.length);
    }
  };

  const prevLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + filteredCards.length) % filteredCards.length
      );
    }
  };

  const activeCard: FocusCardData | null =
    activeLightboxIndex !== null ? filteredCards[activeLightboxIndex] : null;

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#070e0c] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AppleScrollReveal className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#14241f] text-[#e5c378] mb-4 border border-[#dfb86c]/30">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Visual Concept Gallery</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#fdfbf7] mb-4 tracking-wide">
            Atmospheric Imagery &amp; Concept Renders
          </h2>

          <p className="text-sm sm:text-base text-[#8fa69d] max-w-xl mx-auto">
            A visual chronicle of our proposed architectural space, artisanal brew bar, and culinary craftsmanship for Kolkata.
          </p>
        </AppleScrollReveal>

        {/* Skiper Fluid Category Filter Tabs */}
        <div className="flex justify-center pb-4 mb-10">
          <FluidTabs
            tabs={categories}
            activeTab={selectedCategory}
            onChange={(key) => setSelectedCategory(key)}
          />
        </div>

        {/* Aceternity Focus Cards Grid */}
        <FocusCards
          cards={filteredCards}
          onCardClick={handleCardClick}
        />
      </div>

      {/* Lightbox Modal */}
      {activeCard && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close image lightbox"
            className="absolute top-6 right-6 z-20 p-3 rounded-full bg-[#0e1b17]/80 text-[#fdfbf7] hover:bg-[#dfb86c] hover:text-[#070e0c] transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevLightbox();
            }}
            aria-label="Previous image"
            className="absolute left-4 sm:left-8 z-20 p-3 rounded-full bg-[#0e1b17]/80 text-[#fdfbf7] hover:bg-[#dfb86c] hover:text-[#070e0c] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextLightbox();
            }}
            aria-label="Next image"
            className="absolute right-4 sm:right-8 z-20 p-3 rounded-full bg-[#0e1b17]/80 text-[#fdfbf7] hover:bg-[#dfb86c] hover:text-[#070e0c] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Card */}
          <div
            className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-2xl glass-panel-elevated border border-[#dfb86c]/40 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-1 max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeCard.image}
                alt={activeCard.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 bg-[#0e1b17]">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#dfb86c]">
                  {activeCard.category}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#dfb86c]/20 border border-[#dfb86c]/40 text-[#e5c378]">
                  Sanctuary Concept
                </span>
              </div>
              <h3 className="text-xl font-serif text-[#fdfbf7] mb-1">{activeCard.title}</h3>
              <p className="text-sm text-[#8fa69d]">{activeCard.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});
