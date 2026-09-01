'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Radio } from 'lucide-react';

export const AmbientAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.5;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn('Audio play restricted by browser policy:', e);
      });
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50 pointer-events-auto">
      <audio
        ref={audioRef}
        src="/audio/forest-ambient.mp3"
        loop
        preload="auto"
      />
      <button
        onClick={toggleAudio}
        className="flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-white/20 bg-[#080C0A]/70 backdrop-blur-md text-[#E5ECE4] text-xs font-mono tracking-wider hover:border-[#D97736]/60 transition-all shadow-lg group cursor-pointer"
        title="Toggle Ambient Rainforest Soundscape"
      >
        {isPlaying ? (
          <>
            <div className="relative flex items-center justify-center">
              <Volume2 className="w-3.5 h-3.5 text-[#D97736]" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#D97736] animate-ping" />
            </div>
            <span className="text-[#E5ECE4] group-hover:text-[#D97736] transition-colors">
              SOUNDSCAPE ON
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-[#E5ECE4]/50 group-hover:text-[#E5ECE4]" />
            <span className="text-[#E5ECE4]/70 group-hover:text-[#E5ECE4] transition-colors">
              SOUNDSCAPE
            </span>
          </>
        )}
      </button>
    </div>
  );
};
