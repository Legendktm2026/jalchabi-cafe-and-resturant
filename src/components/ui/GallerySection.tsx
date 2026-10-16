import React, { useState } from 'react';
import { RESTAURANT_DATA, GalleryItem } from '../../config/restaurantData';
import { Image as ImageIcon, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { AppleScrollReveal } from './AppleScrollReveal';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Architecture', 'Brew Bar', 'Atmosphere', 'Culinary'];

  const filteredItems = selectedCategory === 'All'
    ? RESTAURANT_DATA.gallery
    : RESTAURANT_DATA.gallery.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => setActiveLightboxIndex(index);
  const closeLightbox = () => setActiveLightboxIndex(null);

  const nextLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevLightbox = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  const activeItem: GalleryItem | null =
    activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#120d09] relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AppleScrollReveal className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#c58b4b]/15 text-[#e6be8a] mb-4 border border-[#c58b4b]/30">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Visual Concept Gallery</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#f5efe6] mb-4 tracking-wide">
            Atmospheric Imagery &amp; Concept Renders
          </h2>

          <p className="text-sm sm:text-base text-[#c9bea9] max-w-xl mx-auto">
            A visual chronicle of our proposed architectural space, artisanal brew bar, and culinary craftsmanship for Kolkata.
          </p>
        </AppleScrollReveal>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#c58b4b] text-[#120d09] shadow-md'
                  : 'glass-panel text-[#c9bea9] hover:text-[#f5efe6] border border-[#c58b4b]/20 hover:border-[#c58b4b]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <AppleScrollReveal key={item.id} delayMs={(index % 3) * 100}>
              <div
                onClick={() => openLightbox(index)}
                className="group relative rounded-2xl overflow-hidden bg-[#1c1510] border border-[#c58b4b]/20 hover:border-[#c58b4b]/60 apple-card-hover cursor-pointer shadow-lg aspect-[4/3]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120d09] via-[#120d09]/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Badges & Description */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-[#120d09]/80 border border-[#c58b4b]/30 text-[#e6be8a] backdrop-blur-sm">
                      {item.category}
                    </span>

                    {item.isAiConcept && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#c58b4b] text-[#120d09] flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        Concept Render
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#f5efe6] group-hover:text-[#e6be8a] transition-colors mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#c9bea9] line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </AppleScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
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
            className="absolute top-6 right-6 z-20 p-3 rounded-full bg-[#18120d]/80 text-[#f5efe6] hover:bg-[#c58b4b] hover:text-[#120d09] transition-colors"
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
            className="absolute left-4 sm:left-8 z-20 p-3 rounded-full bg-[#18120d]/80 text-[#f5efe6] hover:bg-[#c58b4b] hover:text-[#120d09] transition-colors"
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
            className="absolute right-4 sm:right-8 z-20 p-3 rounded-full bg-[#18120d]/80 text-[#f5efe6] hover:bg-[#c58b4b] hover:text-[#120d09] transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Card */}
          <div
            className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-2xl glass-panel-elevated border border-[#c58b4b]/40 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-1 max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 bg-[#18120d]">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#c58b4b]">
                  {activeItem.category}
                </span>
                {activeItem.isAiConcept && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#c58b4b]/20 border border-[#c58b4b]/40 text-[#e6be8a]">
                    AI Concept Artwork
                  </span>
                )}
              </div>
              <h3 className="text-xl font-serif text-[#f5efe6] mb-1">{activeItem.title}</h3>
              <p className="text-sm text-[#c9bea9]">{activeItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
