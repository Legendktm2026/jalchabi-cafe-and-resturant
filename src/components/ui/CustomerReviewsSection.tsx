import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RESTAURANT_DATA, CustomerReview } from '../../config/restaurantData';
import { useLanguage } from '../../context/LanguageContext';
import { soundFoley } from '../../utils/soundFoley';
import { AppleScrollReveal } from './AppleScrollReveal';
import { CardSpotlight } from './CardSpotlight';
import { ShimmerBadge } from './ShimmerBadge';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  MapPin, 
  PenLine, 
  X, 
  Send, 
  Heart
} from 'lucide-react';

export const CustomerReviewsSection: React.FC = React.memo(() => {
  const { language, t } = useLanguage();
  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem('jalchabi_user_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...RESTAURANT_DATA.reviews];
      }
    } catch {
      // fallback
    }
    return RESTAURANT_DATA.reviews;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [dish, setDish] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    soundFoley.playPorcelainClink();

    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: name,
      bengaliAuthor: name,
      location: location || 'Sarberia / Canning II',
      bengaliLocation: location || 'সারবেড়িয়া / ক্যানিং ২',
      rating,
      date: language === 'bn' ? 'অক্টোবর ২০২৬' : 'October 2026',
      comment,
      bengaliComment: comment,
      favoriteDish: dish || (language === 'bn' ? 'দার্জিলিং মোমো ও বিরিয়ানি' : 'Darjeeling Momos & Biryani'),
      verifiedVisit: true,
    };

    const updated = [newRev, ...reviews];
    setReviews(updated);

    try {
      const userOnly = updated.filter((r) => r.id.startsWith('rev-') && r.id.length > 10);
      localStorage.setItem('jalchabi_user_reviews', JSON.stringify(userOnly));
    } catch {
      // storage ignore
    }

    // Optional dispatch to WhatsApp
    const whatsappMsg = `*JALCHABI CAFE — NEW GUEST REVIEW*\n\n⭐ Rating: ${rating}/5 Stars\n👤 Name: ${name} (${location || 'Sarberia'})\n🍽️ Favorite Dish: ${dish}\n💬 Review: "${comment}"`;
    window.open(`https://wa.me/918918948730?text=${encodeURIComponent(whatsappMsg)}`, '_blank');

    setSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSubmitted(false);
      setName('');
      setLocation('');
      setDish('');
      setComment('');
    }, 1200);
  };

  return (
    <section
      id="reviews"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#070e0c] border-t border-[#dfb86c]/20 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <ShimmerBadge>
            <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-[#e5c378]">
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span>{t.reviews.badge}</span>
            </span>
          </ShimmerBadge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#fdfbf7] tracking-tight">
            {t.reviews.title}
          </h2>

          <p className="text-sm sm:text-base text-[#8fa69d] leading-relaxed">
            {t.reviews.subtitle}
          </p>

          {/* Social Proof Aggregate & Write Review Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0e1b17] border border-[#dfb86c]/30">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-mono text-sm font-bold text-[#fdfbf7]">
                {t.reviews.overallRating}
              </span>
              <span className="text-xs text-[#8fa69d] border-l border-[#dfb86c]/20 pl-3">
                {t.reviews.ratingCount}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                soundFoley.playSwitchClick();
                setIsModalOpen(true);
              }}
              className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] text-[#070e0c] hover:shadow-[0_0_20px_rgba(223,184,108,0.4)] transition-all flex items-center gap-2 cursor-pointer"
            >
              <PenLine className="w-3.5 h-3.5" />
              <span>{t.reviews.writeReviewBtn}</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.slice(0, 4).map((rev, idx) => (
            <AppleScrollReveal key={rev.id} delayMs={idx * 100}>
              <CardSpotlight className="h-full rounded-2xl bg-[#0e1b17]/90 border border-[#dfb86c]/20 p-6 flex flex-col justify-between space-y-4 hover:border-[#dfb86c]/50 transition-all">
                <div className="space-y-3">
                  {/* Stars & Quote */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="w-4 h-4 text-[#dfb86c]/40" />
                  </div>

                  {/* Comment */}
                  <p className="text-xs sm:text-sm text-[#fdfbf7] font-serif leading-relaxed italic">
                    "{language === 'bn' && rev.bengaliComment ? rev.bengaliComment : rev.comment}"
                  </p>
                </div>

                {/* Author & Footer */}
                <div className="pt-4 border-t border-[#dfb86c]/15 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-[#e5c378]">
                        {language === 'bn' && rev.bengaliAuthor ? rev.bengaliAuthor : rev.author}
                      </h4>
                      <p className="text-[11px] text-[#8fa69d] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#dfb86c]" />
                        <span>{language === 'bn' && rev.bengaliLocation ? rev.bengaliLocation : rev.location}</span>
                      </p>
                    </div>

                    {rev.verifiedVisit && (
                      <div className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{language === 'bn' ? 'যাচাইকৃত' : 'Verified'}</span>
                      </div>
                    )}
                  </div>

                  <div className="text-[11px] font-mono text-[#dfb86c] pt-1">
                    <span className="opacity-75">{t.reviews.favoriteLabel}</span>{' '}
                    <span className="font-medium text-[#fdfbf7]">{rev.favoriteDish}</span>
                  </div>
                </div>
              </CardSpotlight>
            </AppleScrollReveal>
          ))}
        </div>
      </div>

      {/* Write a Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#0e1b17] border border-[#dfb86c]/40 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 space-y-6 my-8"
            >
              <div className="flex items-start justify-between border-b border-[#dfb86c]/20 pb-4">
                <div>
                  <h3 className="text-xl font-serif text-[#fdfbf7]">
                    {t.reviews.leaveReviewTitle}
                  </h3>
                  <p className="text-xs text-[#8fa69d] mt-0.5">
                    {t.reviews.leaveReviewSub}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full bg-black/40 text-[#8fa69d] hover:text-[#fdfbf7]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h4 className="text-lg font-serif text-[#fdfbf7]">
                    {t.reviews.reviewSuccessMsg}
                  </h4>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Star Rating Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#dfb86c]">
                      {language === 'bn' ? 'আপনার রেটিং নির্বাচন করুন:' : 'Select Your Star Rating:'}
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => {
                            soundFoley.playSwitchClick();
                            setRating(star);
                          }}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-neutral-600'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder={t.reviews.namePlaceholder}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#070e0c] border border-[#dfb86c]/30 rounded-xl px-4 py-2.5 text-xs text-[#fdfbf7] focus:border-[#dfb86c] focus:outline-none"
                    />

                    <input
                      type="text"
                      placeholder={t.reviews.locationPlaceholder}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-[#070e0c] border border-[#dfb86c]/30 rounded-xl px-4 py-2.5 text-xs text-[#fdfbf7] focus:border-[#dfb86c] focus:outline-none"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder={t.reviews.dishPlaceholder}
                    value={dish}
                    onChange={(e) => setDish(e.target.value)}
                    className="w-full bg-[#070e0c] border border-[#dfb86c]/30 rounded-xl px-4 py-2.5 text-xs text-[#fdfbf7] focus:border-[#dfb86c] focus:outline-none"
                  />

                  <textarea
                    required
                    rows={3}
                    placeholder={t.reviews.commentPlaceholder}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-[#070e0c] border border-[#dfb86c]/30 rounded-xl p-4 text-xs text-[#fdfbf7] focus:border-[#dfb86c] focus:outline-none resize-none"
                  />

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] text-[#070e0c] hover:shadow-[0_0_20px_rgba(223,184,108,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{t.reviews.submitReviewBtn}</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
});
