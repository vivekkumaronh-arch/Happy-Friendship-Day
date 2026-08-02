import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flower2, Sparkles, Heart, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';
import { formatName } from '../utils/friendHelper';

interface NameEntryCardProps {
  onNameSubmitted: (name: string) => void;
  setIsTransitioning: (val: boolean) => void;
}

export const NameEntryCard: React.FC<NameEntryCardProps> = ({
  onNameSubmitted,
  setIsTransitioning,
}) => {
  const [name, setName] = useState('');
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  const introLines = [
    'Oops! 🌸',
    'My heart remembers you,',
    'but my website is meeting you for the first time. 😊',
    "What's your beautiful name?",
  ];

  // Typewriter line-by-line reveal effect
  useEffect(() => {
    if (currentLineIndex < introLines.length) {
      const timer = setTimeout(() => {
        setTypedLines((prev) => [...prev, introLines[currentLineIndex]]);
        setCurrentLineIndex((prev) => prev + 1);
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex]);

  // Petal burst confetti helper
  const triggerPetalBurst = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 45,
      spread: 70,
      origin: { x, y },
      colors: ['#f472b6', '#e11d48', '#fb7185', '#fef08a', '#c084fc'],
      scalar: 1.2,
      shapes: ['circle'],
      ticks: 200,
      gravity: 0.8,
      drift: 0.1,
    });
  };

  const handleContinue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    soundFx.playTap();

    const trimmed = name.trim();
    if (!trimmed) {
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 3800);
      return;
    }

    // Valid name!
    triggerPetalBurst(e);
    soundFx.playChime();
    soundFx.playBloom();

    setIsSubmitting(true);
    setIsTransitioning(true);

    // Save in LocalStorage
    try {
      localStorage.setItem('friendship_user_name', trimmed);
    } catch {
      // Ignore local storage error in private browsing
    }

    // Wait 2.8 seconds for blooming animation & loading screen
    setTimeout(() => {
      onNameSubmitted(trimmed);
    }, 2800);
  };

  return (
    <div className="relative z-20 flex flex-col items-center justify-center min-h-[100dvh] px-4 py-8 w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {!isSubmitting ? (
          <motion.div
            key="entry-card"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full glass-card rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden shadow-2xl border border-white/60"
          >
            {/* Ambient Background Glow inside card */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-pink-300/40 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-purple-300/40 rounded-full blur-2xl pointer-events-none" />

            {/* Floating Sparkle Decoration */}
            <div className="absolute top-4 right-4 text-pink-400 animate-pulse">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="absolute bottom-4 left-4 text-purple-400 animate-pulse">
              <Heart className="w-4 h-4" />
            </div>

            {/* Main Heading */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-md border border-pink-200/60 shadow-sm mb-3">
                <Flower2 className="w-4 h-4 text-pink-500 animate-spin-slow" />
                <span className="text-xs uppercase tracking-widest text-pink-600 font-semibold">
                  A Gift For You
                </span>
                <Flower2 className="w-4 h-4 text-pink-500 animate-spin-slow" />
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold font-serif-display text-slate-800 tracking-tight leading-tight">
                🌸 Welcome 🌸
              </h1>
            </motion.div>

            {/* Animated Line-By-Line Introduction */}
            <div className="min-h-[110px] flex flex-col items-center justify-center space-y-1.5 mb-8 text-slate-700">
              {typedLines.map((line, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`text-sm sm:text-base leading-relaxed ${
                    idx === 0
                      ? 'font-bold text-pink-600 font-cursive text-xl'
                      : idx === 3
                      ? 'font-semibold text-purple-800 pt-1'
                      : 'font-medium'
                  }`}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Name Input Container */}
            <form onSubmit={(e) => e.preventDefault()} className="w-full space-y-6">
              <div className="relative text-left">
                {/* Floating Label */}
                <motion.label
                  animate={{
                    y: isFocused || name ? -24 : 14,
                    scale: isFocused || name ? 0.85 : 1,
                    color: isFocused ? '#db2777' : '#64748b',
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-10 pointer-events-none font-medium text-sm origin-left z-10"
                >
                  Your Beautiful Name
                </motion.label>

                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-pink-500 pointer-events-none">
                    <Flower2 className="w-5 h-5 animate-pulse" />
                  </div>

                  <motion.input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={isFocused ? '' : '✨ Type your beautiful name here...'}
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl glass-input text-slate-800 placeholder:text-slate-400 placeholder:text-xs sm:placeholder:text-sm font-semibold text-base outline-none transition-all duration-300"
                    maxLength={30}
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Validation Toast */}
              <AnimatePresence>
                {showErrorToast && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="p-3.5 rounded-2xl bg-rose-50/90 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-md flex items-center gap-2 text-left"
                  >
                    <span className="text-xl">🌸</span>
                    <div>
                      <p className="font-bold">Even flowers have names...</p>
                      <p className="text-rose-600 font-normal">Tell me yours first! 😊</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Continue Button */}
              <motion.button
                type="button"
                onClick={handleContinue}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-400 to-purple-600 text-white font-bold text-base sm:text-lg shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 flex items-center justify-center gap-2.5 relative overflow-hidden group cursor-pointer"
              >
                {/* Ripple Effect overlay */}
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <span>Let's Begin Our Journey</span>
                <span className="text-xl">💐</span>
              </motion.button>
            </form>

            <p className="text-[11px] text-slate-400 mt-5 font-medium">
              Made with love for Friendship Day • Designed as a digital gift
            </p>
          </motion.div>
        ) : (
          /* Blooming Flower & Personalized Loading State */
          <motion.div
            key="blooming-loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full glass-card rounded-3xl p-8 text-center flex flex-col items-center justify-center space-y-6 border border-white/80 shadow-2xl"
          >
            {/* Blooming Flower Animated Graphic */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Pulsing Aura */}
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-pink-300 rounded-full blur-xl"
              />

              {/* Blooming Petals Layer */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <motion.div
                  key={angle}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.9] }}
                  transition={{ delay: i * 0.08, duration: 0.8 }}
                  className="absolute w-8 h-12 bg-gradient-to-t from-pink-500 to-rose-300 rounded-full origin-bottom shadow-md"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-20px)`,
                  }}
                />
              ))}

              {/* Center Golden Pistil */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="relative z-10 w-10 h-10 bg-amber-300 rounded-full border-2 border-white shadow-inner flex items-center justify-center text-amber-800"
              >
                <HeartHandshake className="w-5 h-5 text-rose-600 animate-pulse" />
              </motion.div>
            </div>

            {/* Personalized Creating Message */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold font-serif-display text-slate-800">
                Creating something special just for{' '}
                <span className="text-pink-600 underline decoration-pink-300 decoration-wavy">
                  {formatName(name)}
                </span>
                ... 💖
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 animate-pulse">
                Unwrapping digital petals, memories, and friendship magic ✨
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
