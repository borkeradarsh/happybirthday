"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import MusicPlayer from './components/MusicPlayer';


export default function BirthdaySurprise() {
  const [currentStep, setCurrentStep] = useState(0);
  const [lightsOn, setLightsOn] = useState(false);
  const [flowersFlying, setFlowersFlying] = useState(false);
  const [showCake, setShowCake] = useState(false);
  const [cakeCandles, setCakeCandles] = useState(true);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [sparklesActive, setSparklesActive] = useState(false);
  const [heartsPulsing, setHeartsPulsing] = useState(false);
  const [showLoveNote, setShowLoveNote] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showMemoryGallery, setShowMemoryGallery] = useState(false);


  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  // Auto-progress for mood setting
  useEffect(() => {
    if (currentStep === 2) {
      const timer = setTimeout(() => setCurrentStep(3), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleBouquetClick = () => {
    setFlowersFlying(true);
    setSparklesActive(true);
    setHeartsPulsing(true);
    setTimeout(() => {
      setShowLoveNote(true);
    }, 2000);
  };

  const handleLoveNoteClick = () => {
    setShowMemoryGallery(true);
    setMusicPlaying(true);
  };

  const blowCandles = () => {
    setCakeCandles(false);
    setCandlesBlown(true);
    setTimeout(() => {
      setShowLoveNote(true);
      nextStep();
    }, 2000);
  };


  const steps = [
    'Welcome to the Magic',
    'Turn on the Lights',
    'Setting the Perfect Mood',
    'Time for Balloons',
    'Birthday Banner Time',
    'Special Birthday Cake',
    'Love Note',
    'Memory Gallery',
    'Final Surprise'
  ];

  // Realistic Balloon Component
  const RealisticBalloon = ({ color, delay = 0, position }: { color: string, delay?: number, position: { x: string | number, y: number } }) => (
    <motion.div
      initial={{ y: typeof window !== 'undefined' ? window.innerHeight + 100 : 800, opacity: 0 }}
      animate={{ y: position.y, opacity: 1 }}
      transition={{
        duration: 3,
        delay,
        ease: "easeOut"
      }}
      className="absolute"
      style={{ left: position.x }}
    >
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [-3, 3, -3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Balloon Body */}
        <div className="relative">
          <div
            className="w-16 h-20 rounded-full shadow-lg relative"
            style={{
              background: `linear-gradient(135deg, ${color} 0%, ${color}dd 50%, ${color}aa 100%)`,
              boxShadow: `0 8px 32px ${color}40, inset -8px -8px 16px ${color}60`
            }}
          >
            {/* Highlight */}
            <div
              className="absolute top-2 left-3 w-4 h-6 rounded-full opacity-40 bg-white"
              style={{ filter: 'blur(2px)' }}
            />
            {/* Balloon knot */}
            <div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-2 h-3 rounded-b-full"
              style={{ backgroundColor: color }}
            />
          </div>
          {/* String */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-24 bg-gray-400 opacity-80" />
          {/* String bottom weight */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-500 rounded-full"
               style={{ top: '6.5rem' }} />
        </div>
      </motion.div>
    </motion.div>
  );

  // Sparkles Component
  const Sparkles = () => (
    <AnimatePresence>
      {sparklesActive && (
        <div className="absolute inset-0 pointer-events-none z-60">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600),
                scale: 0,
                opacity: 0
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: 360
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 3,
                repeat: Infinity,
                repeatDelay: Math.random() * 2
              }}
              className="absolute text-yellow-300"
            >
              ✨
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );

  // Floating Hearts
  const FloatingHearts = () => (
    <AnimatePresence>
      {heartsPulsing && (
        <div className="absolute inset-0 pointer-events-none z-55">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
                y: typeof window !== 'undefined' ? window.innerHeight : 600,
                scale: 0
              }}
              animate={{
                y: -100,
                scale: [0, 1.5, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 4,
                delay: i * 0.2,
                ease: "easeOut"
              }}
              className="absolute text-pink-500 text-2xl"
            >
              💖
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  );

  // Memory Gallery Images
  const memories = [
    { 
      src: '/memory1.jpg', 
      caption: 'cuttuuuu🥰',
    },
    { 
      src: '/memory2.jpg', 
      caption: 'hot🥵',
    },
    { 
      src: '/memory3.jpg', 
      caption: 'gorgeousss😍',
    },
    { 
      src: '/memory4.jpg', 
      caption: 'wifeyyy😘',
    },
    { 
      src: '/memory5.jpg', 
      caption: 'FAV PLACEEEE WITH YOUUUU🌊',
    },
    { 
      src: '/memory6.jpg', 
      caption: 'my fav girl💖',
    }
  ];

  // New Love Note Component
  const LoveNote = () => (
    <motion.div
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      className="max-w-md mx-auto bg-pink-50 p-8 rounded-lg shadow-xl relative transform paper-texture"
    >
      <motion.div
        className="absolute -top-4 -left-4 w-8 h-8"
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        💝
      </motion.div>
      <h3 className="text-2xl font-handwriting text-pink-600 mb-4">My babyyy,</h3>
      <p className="text-gray-700 leading-relaxed font-handwriting">
        On your 20th birthday, I want you to know how much joy and love you bring to my life.
        Every moment with you is a treasure, and Im so grateful to be with you.
        You make my world brighter just by being in it.
      </p>
      <p className="text-right mt-4 font-handwriting text-pink-600">
        Forever Yours ❤️
      </p>
      <motion.button
        onClick={handleLoveNoteClick}
        className="mt-6 px-6 py-2 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Open Memory Gallery 📸
      </motion.button>
    </motion.div>
  );

  // Memory Gallery Component
  const MemoryGallery = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-8 overflow-y-auto"
    >
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 max-w-2xl w-full">
        <h2 className="text-4xl font-fancy text-white text-center mb-8 glow">USSSSSS AND YOUUUU</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((memory, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group relative aspect-square rounded-xl overflow-hidden"
            >
              <Image
                src={memory.src}
                alt={memory.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-handwriting text-white mb-2">{memory.caption}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <motion.button
            onClick={() => {
              setShowMemoryGallery(false);
              // Add a delay before showing the final message
              setTimeout(() => {
                setCurrentStep(8); // Move to final step
              }, 500);
            }}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold text-lg hover:from-pink-600 hover:to-purple-600 transform transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Continue to Final Surprise 💝
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${
      lightsOn ? 'bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50' : 'bg-gray-900'
    }`}>
      {/* Elegant Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div
          className="h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-rose-400 transition-all duration-700 ease-out"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }} 
        />
        <div className="text-center py-3 text-sm font-medium text-gray-700 bg-white/20">
          <span className="bg-white/40 px-3 py-1 rounded-full backdrop-blur-sm">
            {steps[currentStep] || 'Complete! 🎉'}
          </span>
        </div>
      </div>

      {/* Realistic Ceiling Lights */}
      <div className="absolute top-0 left-0 right-0 flex justify-evenly pt-12 z-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -100 }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: lightsOn ? i * 0.2 : 0,
              duration: 0.5
            }}
            className="relative"
          >
            {/* Ceiling Mount */}
            <div className="w-6 h-4 bg-gray-700 rounded-b-lg mx-auto shadow-md" />
            {/* Cord */}
            <div className="w-1 h-8 bg-gray-500 mx-auto" />
            {/* Light Bulb */}
            <div className={`relative w-14 h-16 mx-auto transition-all duration-500 ${
              lightsOn ? 'drop-shadow-2xl' : ''
            }`}>
              {/* Bulb Glass */}
              <div className={`w-14 h-16 rounded-full transition-all duration-500 relative ${
                lightsOn
                  ? 'bg-gradient-to-b from-yellow-200 to-yellow-300 shadow-yellow-300'
                  : 'bg-gradient-to-b from-gray-300 to-gray-400'
              }`}
                style={{
                  boxShadow: lightsOn
                    ? '0 0 40px rgba(252, 211, 77, 0.8), 0 0 80px rgba(252, 211, 77, 0.4)'
                    : 'none'
                }}
              >
                {/* Filament */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-8 h-8">
                  <div className={`w-full h-0.5 transform rotate-45 ${
                    lightsOn ? 'bg-orange-600' : 'bg-gray-600'
                  }`} style={{ top: '14px', position: 'absolute' }} />
                  <div className={`w-full h-0.5 transform -rotate-45 ${
                    lightsOn ? 'bg-orange-600' : 'bg-gray-600'
                  }`} style={{ top: '14px', position: 'absolute' }} />
                </div>
                {/* Highlight */}
                {lightsOn && (
                  <div className="absolute top-2 left-2 w-3 h-4 bg-white rounded-full opacity-60 blur-sm" />
                )}
              </div>
              {/* Bulb Base */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-gray-600 rounded-b-lg" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Realistic Balloons */}
      <AnimatePresence>
        {currentStep >= 3 && (
          <div className="absolute inset-0 pointer-events-none">
            <RealisticBalloon
              color="#ff6b9d"
              delay={0}
              position={{ x: '10%', y: 120 }}
            />
            <RealisticBalloon
              color="#4ecdc4"
              delay={0.3}
              position={{ x: '85%', y: 140 }}
            />
            <RealisticBalloon
              color="#45b7d1"
              delay={0.6}
              position={{ x: '25%', y: 100 }}
            />
            <RealisticBalloon
              color="#f9ca24"
              delay={0.9}
              position={{ x: '75%', y: 110 }}
            />
            <RealisticBalloon
              color="#6c5ce7"
              delay={1.2}
              position={{ x: '50%', y: 130 }}
            />
            <RealisticBalloon
              color="#a55eea"
              delay={1.5}
              position={{ x: '15%', y: 160 }}
            />
            <RealisticBalloon
              color="#26de81"
              delay={1.8}
              position={{ x: '65%', y: 90 }}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Birthday Banner */}
      <AnimatePresence>
        {currentStep >= 4 && (
          <motion.div
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 2,
              ease: "easeOut",
              type: "spring",
              stiffness: 100
            }}
            className="absolute top-24 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-3xl text-center"
          >
            <Image
              src="/banner.png"
              alt="Happy Birthday Banner"
              width={800}
              height={200}
              className="w-full h-auto object-contain"
              priority
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-4"
            >
              <h1 className="text-4xl md:text-6xl font-fancy text-pink-600 glow animate-float">
                PAKHEEEEEEE
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-2 text-xl md:text-2xl font-handwriting text-purple-600"
              >
                May your 20th year be as beautiful as you! 💖
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Banner to Cake Transition */}
      <AnimatePresence>
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 text-center z-30"
          >
            <motion.button
              onClick={() => {
                setShowCake(true);
                nextStep();
              }}
              className="px-12 py-5 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-pink-300/50 transform transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              Time for Cake! 🎂
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Birthday Cake */}
      <AnimatePresence>
        {showCake && (
          <motion.div
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 100 }}
            className="fixed bottom-32 left-1/2 transform -translate-x-1/2 z-30"
          >
            <div className="relative cursor-pointer" onClick={blowCandles}>
              {/* Cake Base */}
              <div className="w-48 h-32 bg-gradient-to-b from-pink-200 to-pink-400 rounded-t-3xl relative border-4 border-pink-600">
                {/* Cake Layers */}
                <div className="absolute top-2 left-2 right-2 h-4 bg-white rounded-full opacity-80" />
                <div className="absolute top-8 left-4 right-4 h-3 bg-purple-300 rounded-full" />
                <div className="absolute top-14 left-3 right-3 h-2 bg-yellow-300 rounded-full" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="font-handwriting text-white text-xl">Pakhee&apos;s Cake</span>
                </div>
                
                {/* Candles */}
                {cakeCandles && (
                  <div className="absolute -top-8 left-0 right-0 flex justify-center items-end">
                    {/* Number 2 */}
                    <div className="mx-2">
                      <div className="w-3 h-12 bg-gradient-to-b from-purple-400 to-purple-600 rounded-t-full" />
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute -top-3 w-4 h-6 bg-gradient-to-t from-orange-400 to-yellow-300 rounded-full"
                        style={{ filter: 'blur(2px)' }}
                      />
                    </div>
                    {/* Number 0 */}
                    <div className="mx-2">
                      <div className="w-3 h-12 bg-gradient-to-b from-pink-400 to-pink-600 rounded-t-full" />
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute -top-3 w-4 h-6 bg-gradient-to-t from-orange-400 to-yellow-300 rounded-full"
                        style={{ filter: 'blur(2px)' }}
                      />
                    </div>
                  </div>
                )}

                {/* Blown candles effect */}
                {candlesBlown && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl"
                  >
                    💨✨
                  </motion.div>
                )}
              </div>

              {/* Cake Plate */}
              <div className="w-56 h-6 bg-gradient-to-r from-gray-200 to-gray-400 rounded-full mx-auto -mt-3 shadow-2xl border-2 border-gray-300" />
              
              {/* Click instruction */}
              {!candlesBlown && (
                <motion.p
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center text-pink-600 font-medium whitespace-nowrap"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click to blow out the candles! 💨
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti Animation */}
      <AnimatePresence>
        {currentStep >= 5 && (
          <div className="absolute inset-0 pointer-events-none z-40">
            {[...Array(150)].map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                initial={{
                  y: -100,
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800),
                  rotate: 0,
                  opacity: 1
                }}
                animate={{
                  y: (typeof window !== 'undefined' ? window.innerHeight : 600) + 100,
                  rotate: 360 * 5,
                  opacity: 0
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  delay: Math.random() * 3,
                  ease: "linear"
                }}
                className="absolute w-3 h-6 rounded-sm"
                style={{
                  backgroundColor: ['#ff6b9d', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#26de81', '#ff9ff3', '#54a0ff'][i % 8]
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Flying Flowers */}
      <AnimatePresence>
        {flowersFlying && (
          <div className="absolute inset-0 pointer-events-none z-50">
            {[...Array(40)].map((_, i) => {
              const startX = typeof window !== 'undefined' ? window.innerWidth / 2 : 400;
              const startY = typeof window !== 'undefined' ? window.innerHeight / 2 : 300;
              const endX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 800);
              const endY = Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 600);
              
              return (
                <motion.div
                  key={`flower-${i}`}
                  initial={{
                    x: startX,
                    y: startY,
                    scale: 0,
                    rotate: 0,
                    opacity: 0
                  }}
                  animate={{
                    x: endX,
                    y: endY,
                    scale: [0, 2, 1.2],
                    rotate: 360 * 4,
                    opacity: [0, 1, 0.9, 0]
                  }}
                  transition={{
                    duration: 5,
                    delay: i * 0.05,
                    ease: "easeOut"
                  }}
                  className="absolute text-4xl"
                >
                  {['🌸', '🌺', '🌻', '🌷', '🌹', '💐', '🏵️', '🌼', '💮'][i % 9]}
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Sparkles */}
      <Sparkles />
      
      {/* Floating Hearts */}
      <FloatingHearts />

      {/* Love Note */}
      <AnimatePresence>
        {showLoveNote && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 flex items-center justify-center z-40 p-4 backdrop-blur-sm bg-black/50"
          >
            <LoveNote />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Player */}
      <MusicPlayer
        isPlaying={musicPlaying}
        onTogglePlay={() => setMusicPlaying(!musicPlaying)}
      />

      {/* Memory Gallery */}
      <AnimatePresence>
        {showMemoryGallery && <MemoryGallery />}
      </AnimatePresence>

      {/* Final Message */}
      <AnimatePresence>
        {currentStep === 8 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm bg-black/50"
          >
            <div className="bg-white/90 rounded-2xl p-8 max-w-2xl mx-auto text-center shadow-2xl border-4 border-pink-200">
              <motion.h2
                className="text-4xl font-fancy text-pink-600 mb-6 glow"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Happy 20th Birthday, Pakhee! 🎂
              </motion.h2>
              <p className="text-xl font-handwriting text-gray-700 mb-6 leading-relaxed">
                As you step into your 20s, I want you to know that you&apos;re the most amazing person I&apos;ve ever met.
                Your smile lights up my world, and every moment with you is a treasure I&apos;ll always cherish.
                Here&apos;s to many more years of love, laughter, and beautiful memories together! 💖
              </p>
              <p className="text-2xl font-handwriting text-pink-500 mt-8">
                With all my love, adarsh❤️
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex items-center justify-center min-h-screen relative z-10 px-4">
        <AnimatePresence mode="wait">
          {/* Welcome Screen */}
          {currentStep === 0 && (
            <motion.div
              key="welcome"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 bg-clip-text text-transparent">
                  ✨ SURPRISEEEEEEEEEE ✨
                </h1>
                <p className="text-2xl text-gray-600 mb-8">
                  for the most amazing person in the world 💕
                </p>
              </motion.div>
              <motion.button
                onClick={nextStep}
                className="px-12 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-pink-300/50 transform transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  boxShadow: '0 15px 50px rgba(236, 72, 153, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset'
                }}
              >
                Magiccccccc 🪄✨
              </motion.button>
            </motion.div>
          )}

          {/* Lights Control */}
          {currentStep === 1 && (
            <motion.div
              key="lights"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="text-center"
            >
              <motion.h2
                className="text-5xl font-bold mb-6 text-gray-700"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Let&apos;s brighten up, like you do to my lifeeeeee! 💡
              </motion.h2>
              <p className="text-xl text-gray-600 mb-8">
                Every celebration needs the perfect lighting...
              </p>
              <motion.button
                onClick={() => {
                  setLightsOn(true);
                  setTimeout(nextStep, 1500);
                }}
                className="px-12 py-5 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-yellow-300/50 transform transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  boxShadow: '0 15px 50px rgba(251, 191, 36, 0.5), 0 0 0 1px rgba(255,255,255,0.1) inset'
                }}
              >
                Turn On the Lights ✨💡
              </motion.button>
            </motion.div>
          )}

          {/* Mood Setting */}
          {currentStep === 2 && (
            <motion.div
              key="mood"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="text-center"
            >
              <motion.h2
                className="text-5xl font-bold text-pink-600 mb-4"
                animate={{
                  scale: [1, 1.05, 1],
                  textShadow: ['0 0 20px rgba(236, 72, 153, 0.5)', '0 0 40px rgba(236, 72, 153, 0.8)', '0 0 20px rgba(236, 72, 153, 0.5)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Perfecttttttt! ✨🌟
              </motion.h2>
              <motion.p
                className="text-xl text-gray-600"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Now lets add some colorrrrrrrrrrrrrrrrrrrrrrrrrrr...
              </motion.p>
            </motion.div>
          )}

          {/* Balloons Display */}
          {currentStep === 3 && (
            <motion.div
              key="balloons"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="text-center"
            >
              <motion.h2
                className="text-5xl font-bold text-purple-600 mb-6"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                BALLOOONNNNSSSSSSS🎈
              </motion.h2>
              <p className="text-xl text-gray-600 mb-8">
                Each balloon carries a wish for your happiness baby!
              </p>
              <motion.button
                onClick={nextStep}
                className="px-12 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-purple-300/50 transform transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2 }}
                style={{
                  boxShadow: '0 15px 50px rgba(168, 85, 247, 0.5), 0 0 0 1px rgba(255,255,255,0.1) inset'
                }}
              >
                Add Birthday Banner 🎊
              </motion.button>
            </motion.div>
          )}

          {/* New Love Note Step */}
          {currentStep === 6 && !showLoveNote && (
            <motion.div
              key="love-note-intro"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="text-center"
            >
              <motion.h2
                className="text-5xl font-bold text-pink-600 mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💌 A Special Message for You 💝
              </motion.h2>
              <motion.button
                onClick={handleBouquetClick}
                className="px-12 py-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-pink-300/50 transform transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  boxShadow: '0 15px 50px rgba(236, 72, 153, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset'
                }}
              >
                Open Love Note 💌
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}