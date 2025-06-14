import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface MusicPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export default function MusicPlayer({ isPlaying, onTogglePlay }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-4 right-4 music-player rounded-xl p-4 z-50"
    >
      <audio
        ref={audioRef}
        src="/birthday-music.mp3"
        loop
      />
      <div className="flex items-center gap-4">
        <button
          onClick={onTogglePlay}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-colors"
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
          )}
        </button>
        
        <div className="flex flex-col">
          <span className="text-white text-sm font-medium">Birthday Song</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24 h-1 mt-2"
          />
        </div>

        {isPlaying && (
          <div className="flex items-center gap-1">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-pink-500"
                animate={{
                  height: [4, 12, 4],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
} 