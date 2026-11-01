import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Radio } from 'lucide-react';
import { soundFoley } from '../../utils/soundFoley';

interface BengaliAudioNarratorProps {
  className?: string;
}

export const BengaliAudioNarrator: React.FC<BengaliAudioNarratorProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
    }
  }, []);

  const storyText = 
    "নমস্কার! সুন্দরবনের প্রবেশদ্বার ক্যানিং ২ ব্লকের সারবেড়িয়া আঠারোবাঁকিতে জলছবি ক্যাফে ও রেস্তোরাঁয় আপনাকে স্বাগতম। " +
    "প্রতিষ্ঠাতা সাবির হোসেন খানের বহু বছরের লালিত স্বপ্ন এবং অক্লান্ত পরিশ্রমে নিজের পৈতৃক ভিটায় গড়ে উঠেছে এই ক্যাফে। " +
    "শহরের আভিজাত্য আর আমাদের পল্লীবাংলার মাটির টানকে এক সুতোয় গেঁথেছে জলছবি। " +
    "আমাদের রান্নাঘরে তৈরি হয় দার্জিলিংয়ের আসল স্টিমড মোমো, ঝাল রসুন চাটনি, ক্রিস্পি ড্রামস অফ হেভেন, স্পেশাল কাঠি রোল এবং খাঁটি শাহী দম বিরিয়ানি। " +
    "পরিবার আর বন্ধুদের সাথে শান্ত মনোরম পরিবেশে আড্ডা দিন। সরাসরি হোয়াটসঅ্যাপে অর্ডার করুন বা সাবির ভাইকে কল করুন। " +
    "জলছবিতে আপনার পদার্পণ আমাদের আন্তরিক আনন্দ। ধন্যবাদ!";

  const toggleNarrator = () => {
    if (!isSupported) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      soundFoley.playSwitchClick();
    } else {
      window.speechSynthesis.cancel(); // Stop any pending
      soundFoley.playPorcelainClink();

      const utterance = new SpeechSynthesisUtterance(storyText);
      utterance.lang = 'bn-IN';
      utterance.rate = 0.92; // Natural, calm cadence for clear storytelling
      utterance.pitch = 1.0;

      // Try to find a Bengali voice if installed
      const voices = window.speechSynthesis.getVoices();
      const bengaliVoice = voices.find((v) => v.lang.includes('bn') || v.name.includes('Bangla') || v.name.includes('Bengali'));
      if (bengaliVoice) {
        utterance.voice = bengaliVoice;
      }

      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isSupported) return null;

  return (
    <div className={`inline-flex items-center ${className}`}>
      <button
        type="button"
        onClick={toggleNarrator}
        className={`group relative flex items-center gap-2.5 px-4 py-2 rounded-full border transition-all cursor-pointer shadow-lg active:scale-95 ${
          isPlaying
            ? 'bg-gradient-to-r from-[#dfb86c] via-[#ebd08d] to-[#c99e52] border-[#fdfbf7] text-[#070e0c] shadow-[0_0_25px_rgba(223,184,108,0.5)] animate-pulse'
            : 'bg-[#0e1b17]/90 hover:bg-[#14241f] border-[#dfb86c]/40 hover:border-[#dfb86c] text-[#e5c378]'
        }`}
        title="বাংলায় সাবিরের কণ্ঠে ক্যাফের গল্প শুনুন"
        aria-label="Listen to the story in Bengali"
      >
        {isPlaying ? (
          <>
            <Radio className="w-4 h-4 animate-spin text-[#070e0c]" />
            <span className="text-xs font-semibold font-serif tracking-wide">
              গল্প শুনছেন... (বিরতি দিন)
            </span>
            <VolumeX className="w-3.5 h-3.5 text-[#070e0c]" />
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 text-[#dfb86c] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium font-serif tracking-wide">
              বাংলায় শুনুন (অডিও গল্প)
            </span>
            <Sparkles className="w-3 h-3 text-[#dfb86c]" />
          </>
        )}
      </button>
    </div>
  );
};
