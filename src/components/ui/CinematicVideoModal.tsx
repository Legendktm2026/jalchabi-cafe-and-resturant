import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Sparkles } from 'lucide-react';

interface CinematicVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
  posterSrc?: string;
}

export const CinematicVideoModal: React.FC<CinematicVideoModalProps> = ({
  isOpen,
  onClose,
  videoSrc = '/videos/jalchabi.mp4',
  posterSrc = '/images/jalchabi-hero.png',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      // Autoplay when modal opens
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().catch(() => {});
            }
          });
        }
      }, 150);
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [isOpen, onClose]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          {/* Backdrop: Solid high-contrast black overlay without GPU-stalling blur filter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 cursor-pointer"
          />

          {/* Modal Content Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-5xl bg-[#070e0c] border border-[#dfb86c]/50 rounded-2xl sm:rounded-3xl shadow-[0_0_60px_rgba(223,184,108,0.25)] overflow-hidden z-10 flex flex-col transform-gpu"
          >
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-3.5 bg-[#0e1b17] border-b border-[#dfb86c]/20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#dfb86c] animate-ping" />
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#e5c378] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Jalchabi Cinematic Experience • Kolkata
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close video"
                className="p-1.5 rounded-full bg-[#14241f] text-[#8fa69d] hover:text-[#fdfbf7] border border-[#dfb86c]/30 hover:border-[#dfb86c]/60 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden group">
              <video
                ref={videoRef}
                src={videoSrc}
                poster={posterSrc}
                preload="auto"
                loop
                playsInline
                className="w-full h-full object-contain cursor-pointer transform-gpu"
                onClick={togglePlay}
              />

              {/* Center Play Overlay when paused */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={togglePlay}
                  className="absolute p-5 rounded-full bg-[#dfb86c]/90 text-[#070e0c] shadow-2xl hover:scale-110 transition-transform cursor-pointer"
                >
                  <Play className="w-8 h-8 fill-current translate-x-0.5" />
                </button>
              )}

              {/* Bottom Control Bar */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#fdfbf7] transition-colors cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#fdfbf7] transition-colors cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-[#dfb86c]" /> : <Volume2 className="w-4 h-4 text-[#e5c378]" />}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#8fa69d] hidden sm:inline">
                    Artisanal Sanctuary Visuals
                  </span>
                  <button
                    type="button"
                    onClick={handleFullscreen}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-[#fdfbf7] transition-colors cursor-pointer"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
