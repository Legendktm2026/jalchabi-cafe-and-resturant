import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  Sparkles,
  CalendarCheck,
  UtensilsCrossed,
} from 'lucide-react';
import { soundFoley } from '../../utils/soundFoley';

interface RealWorldPortalExperienceProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection?: (sectionId: string) => void;
  videoSrc?: string;
  posterSrc?: string;
}

export const RealWorldPortalExperience: React.FC<RealWorldPortalExperienceProps> = ({
  isOpen,
  onClose,
  onNavigateSection = () => {},
  videoSrc = '/videos/jalchabi.mp4',
  posterSrc = '/images/gemini-real-cafe.jpg',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(10);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [doorSwingComplete, setDoorSwingComplete] = useState(false);
  const hideTimerRef = useRef<number | null>(null);

  // Auto-hide controls after 2.5s of inactivity
  const showControlsTemporarily = useCallback(() => {
    setIsControlsVisible(true);
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
    }
    hideTimerRef.current = window.setTimeout(() => {
      setIsControlsVisible(false);
    }, 2500);
  }, []);

  // Initiate playback and sound upon opening
  useEffect(() => {
    if (!isOpen) {
      setDoorSwingComplete(false);
      if (videoRef.current) {
        videoRef.current.pause();
      }
      return;
    }

    soundFoley.playDoorOpen();
    soundFoley.playPortalTransition();

    const doorTimer = setTimeout(() => {
      setDoorSwingComplete(true);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 600);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      } else if (e.key === 'f' || e.key === 'F') {
        handleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    showControlsTemporarily();

    return () => {
      clearTimeout(doorTimer);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, showControlsTemporarily]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    soundFoley.playSwitchClick();
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    showControlsTemporarily();
  }, [showControlsTemporarily]);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;
    soundFoley.playSwitchClick();
    const newMuted = !videoRef.current.muted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    if (!newMuted) {
      soundFoley.playLakeBreeze();
    }
    showControlsTemporarily();
  }, [showControlsTemporarily]);

  const seekTo = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(seconds, duration));
    showControlsTemporarily();
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    soundFoley.playSwitchClick();
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else if (containerRef.current.requestFullscreen) {
      containerRef.current.requestFullscreen().catch(() => {});
    }
  };

  const handleNavigate = (sectionId: string) => {
    soundFoley.playSwitchClick();
    onClose();
    setTimeout(() => {
      onNavigateSection(sectionId);
    }, 200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          ref={containerRef}
          onMouseMove={showControlsTemporarily}
          onClick={showControlsTemporarily}
          className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 select-none bg-black/95 overflow-hidden"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#070e0c]/95 backdrop-blur-xl cursor-pointer"
          />

          {/* =========================================================================
              TACTILE 3D FRENCH DOOR REVEAL (First 600ms)
              ========================================================================= */}
          {!doorSwingComplete && (
            <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
              {/* Left French Door */}
              <motion.div
                initial={{ rotateY: 0, x: 0 }}
                animate={{ rotateY: -90, x: '-35%' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'left center' }}
                className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#0e1b17] border-r-2 border-[#dfb86c]/60 shadow-[30px_0_70px_rgba(0,0,0,0.95)] flex items-center justify-end pr-10"
              >
                <div className="w-2 h-28 rounded-full bg-[#dfb86c]" />
              </motion.div>

              {/* Right French Door */}
              <motion.div
                initial={{ rotateY: 0, x: 0 }}
                animate={{ rotateY: 90, x: '35%' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'right center' }}
                className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#0e1b17] border-l-2 border-[#dfb86c]/60 shadow-[-30px_0_70px_rgba(0,0,0,0.95)] flex items-center justify-start pl-10"
              >
                <div className="w-2 h-28 rounded-full bg-[#dfb86c]" />
              </motion.div>

              {/* Atmospheric Sky Burst */}
              <motion.div
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 2.5, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55 }}
                className="w-96 h-96 rounded-full bg-gradient-radial from-[#7dd3fc]/80 via-[#dfb86c]/40 to-transparent blur-3xl"
              />
            </div>
          )}

          {/* =========================================================================
              CLEAN, PURE CINEMA CONTAINER (Zero Distracting Floating Boxes)
              ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-6xl h-full md:h-auto md:max-h-[88vh] flex flex-col items-center justify-center z-20"
          >
            {/* Ambient Blurred Video Glow Behind Video */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 rounded-3xl opacity-35 blur-3xl overflow-hidden pointer-events-none transform-gpu"
              style={{
                background: 'radial-gradient(circle, #38bdf8 0%, #dfb86c 50%, #070e0c 100%)',
              }}
            />

            {/* Video Canvas Stage */}
            <div className="relative w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden bg-black shadow-[0_0_90px_rgba(0,0,0,0.9),0_0_40px_rgba(223,184,108,0.25)] border border-[#dfb86c]/30 flex items-center justify-center group">
              <video
                ref={videoRef}
                src={videoSrc}
                poster={posterSrc}
                preload="auto"
                loop
                playsInline
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={togglePlay}
                className="w-full h-full object-contain cursor-pointer transform-gpu"
              />

              {/* Minimalist Floating Exit Button (Top Right) */}
              <div
                className={`absolute top-4 right-4 z-30 transition-opacity duration-300 ${
                  isControlsVisible || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-black/60 hover:bg-black/85 px-4 py-2 text-xs font-mono tracking-wider text-[#fdfbf7] backdrop-blur-md transition-all cursor-pointer shadow-lg hover:border-[#dfb86c]"
                  title="Return to 3D Sanctuary (Esc)"
                >
                  <span>Return to 3D</span>
                  <X className="w-3.5 h-3.5 text-[#dfb86c]" />
                </button>
              </div>

              {/* Center Play Icon when Paused */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label="Play video"
                  className="absolute p-6 rounded-full bg-[#dfb86c]/90 text-[#070e0c] shadow-[0_0_50px_#dfb86c] hover:scale-110 active:scale-95 transition-all cursor-pointer z-30"
                >
                  <Play className="w-9 h-9 fill-current translate-x-0.5" />
                </button>
              )}

              {/* =========================================================================
                  AUTOHIDING MINIMALIST CONTROLS BAR (Bottom)
                  Fades out after 2.5s of inactivity so the scenery is completely unobstructed
                  ========================================================================= */}
              <div
                className={`absolute bottom-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-2.5 transition-opacity duration-300 z-30 ${
                  isControlsVisible || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                {/* Thin, Precision Scrubber */}
                <div
                  className="w-full h-2 flex items-center cursor-pointer group/scrub"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const pct = Math.max(0, Math.min(1, clickX / rect.width));
                    seekTo(pct * duration);
                  }}
                >
                  <div className="w-full h-1 bg-white/20 group-hover/scrub:h-1.5 rounded-full overflow-hidden transition-all">
                    <div
                      className="h-full bg-gradient-to-r from-[#38bdf8] to-[#dfb86c]"
                      style={{ width: `${(currentTime / Math.max(1, duration)) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Single Bottom Bar with Controls */}
                <div className="flex items-center justify-between text-xs text-[#fdfbf7]">
                  {/* Left Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="p-1.5 rounded-md hover:bg-white/15 transition-colors cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      className="flex items-center gap-1.5 p-1.5 rounded-md hover:bg-white/15 transition-colors cursor-pointer"
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-4 h-4 text-[#dfb86c]" />
                          <span className="text-[11px] text-[#8fa69d] hidden sm:inline">Unmute</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4 text-[#38bdf8]" />
                          <span className="text-[11px] text-[#38bdf8] hidden sm:inline">Sound Active</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => seekTo(0)}
                      title="Replay from Beginning"
                      className="p-1.5 rounded-md hover:bg-white/15 text-[#8fa69d] hover:text-[#fdfbf7] transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>

                    <span className="font-mono text-[11px] text-[#fdfbf7] pl-1">
                      00:0{Math.floor(currentTime)} / 00:10
                    </span>
                  </div>

                  {/* Right Controls */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#dfb86c]/90 hidden sm:flex">
                      <Sparkles className="w-3 h-3 text-[#38bdf8]" />
                      <span>Gemini AI Cinematic Master</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleFullscreen}
                      title="Fullscreen"
                      className="p-1.5 rounded-md hover:bg-white/15 transition-colors cursor-pointer"
                    >
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle, Discrete Action Bar BELOW Video (Not Blocking Video) */}
            <div className="w-full mt-3 flex items-center justify-between px-2 gap-3 flex-wrap">
              <span className="text-xs text-[#8fa69d] font-serif hidden sm:inline">
                Jalchabi Lakeside Conservatory • South 24 Parganas, West Bengal
              </span>

              <div className="flex items-center gap-2.5 ml-auto">
                <button
                  type="button"
                  onClick={() => handleNavigate('reservations')}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] px-4 py-2 text-xs font-semibold text-[#070e0c] shadow-lg shadow-[#dfb86c]/20 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer font-serif"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Reserve Lakeside Gazebo</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigate('menu')}
                  className="flex items-center gap-2 rounded-xl border border-[#dfb86c]/30 bg-[#0e1b17] px-4 py-2 text-xs font-medium text-[#fdfbf7] hover:border-[#dfb86c] transition-all cursor-pointer font-serif"
                >
                  <UtensilsCrossed className="w-3.5 h-3.5 text-[#dfb86c]" />
                  <span>View Menu</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
