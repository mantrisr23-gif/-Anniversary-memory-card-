'use client';

import { useState, useRef, useEffect } from 'react';

export const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Playback prevented:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} loop>
        <source src="/audio/main-theme.mp3" type="audio/mpeg" />
      </audio>
      
      <button 
        onClick={togglePlay}
        className="bg-cream/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-aged/50 transition-transform hover:scale-110"
      >
        {isPlaying ? '♪ Playing' : '○ Muted'}
      </button>
    </div>
  );
};