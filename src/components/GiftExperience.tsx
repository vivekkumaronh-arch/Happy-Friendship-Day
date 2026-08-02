import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gift,
  Heart,
  Sparkles,
  Volume2,
  VolumeX,
  Share2,
  RefreshCw,
  BookOpen,
  Flower2,
  PhoneCall,
  HeartHandshake,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audio';
import { formatName, getFriendNickname } from '../utils/friendHelper';
import { WovenBracelet } from './WovenBracelet';

interface GiftExperienceProps {
  userName: string;
  onResetName: () => void;
}

export const GiftExperience: React.FC<GiftExperienceProps> = ({
  userName,
  onResetName,
}) => {
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [isMuted, setIsMuted] = useState(soundFx.getMuted());
  const [activeTab, setActiveTab] = useState<'letter' | 'band' | 'promise'>('letter');
  const [copiedLink, setCopiedLink] = useState(false);

  // Band color options
  const [bandTheme, setBandTheme] = useState<'pink' | 'rainbow' | 'sunset' | 'ocean' | 'purple'>('pink');

  // Emotional Ending Step state
  const [endingStep, setEndingStep] = useState(0);

  const formattedName = formatName(userName);
  const friendNickname = getFriendNickname(userName);

  // Band Embroidery Text requirement: "VVK ❤️ FriendNickname"
  const bandEmbroideryText = `VVK ❤️ ${friendNickname}`;

  const handleOpenGift = () => {
    soundFx.playChime();
    soundFx.playBloom();
    setIsGiftOpened(true);

    // Flower confetti explosion
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#e11d48', '#fb7185', '#fef08a', '#c084fc', '#38bdf8'],
      ticks: 300,
      scalar: 1.2,
    });
  };

  const handleToggleMute = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const handleShare = () => {
    soundFx.playTap();
    if (navigator.share) {
      navigator.share({
        title: `Friendship Day Gift for ${formattedName}`,
        text: `A special Friendship Day gift created for ${formattedName}! 🌸❤️`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Progressive Emotional Ending reveal sequence
  useEffect(() => {
    if (isGiftOpened) {
      const t1 = setTimeout(() => setEndingStep(1), 1000);
      const t2 = setTimeout(() => setEndingStep(2), 3500);
      const t3 = setTimeout(() => setEndingStep(3), 6500);
      const t4 = setTimeout(() => {
        setEndingStep(4);
        // Bloom confetti burst for finale
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.8 },
          colors: ['#f472b6', '#e11d48', '#fef08a', '#a855f7'],
        });
      }, 9500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, [isGiftOpened]);

  return (
    <div className="relative z-20 min-h-[100dvh] w-full px-4 py-8 max-w-lg mx-auto flex flex-col items-center">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between mb-6 glass-card px-4 py-3 rounded-2xl border border-white/80 shadow-md">
        <button
          onClick={onResetName}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-pink-600 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Change Name</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleMute}
            className="p-2 rounded-xl bg-white/70 hover:bg-white text-slate-700 transition-all cursor-pointer shadow-sm"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-pink-500" />}
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white transition-all cursor-pointer shadow-md"
            title="Share Gift"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {copiedLink && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mb-4 text-xs font-semibold text-pink-600 bg-pink-50 border border-pink-200 px-4 py-1.5 rounded-full shadow-sm"
        >
          ✨ Gift link copied to clipboard!
        </motion.div>
      )}

      {/* Main Greeting Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <span className="inline-block px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider mb-2 border border-pink-200">
          Happy Friendship Day 2026
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif-display text-slate-800 leading-snug">
          A Digital Gift For{' '}
          <span className="text-pink-600 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {formattedName}
          </span>{' '}
          🌸
        </h1>
      </motion.div>

      {/* UNOPENED GIFT BOX */}
      {!isGiftOpened ? (
        <motion.div
          key="unopened-gift-box"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full flex flex-col items-center justify-center my-6"
        >
          <p className="text-sm font-semibold text-slate-700 mb-6 text-center animate-pulse">
            Tap the magic gift box below to unwrap your surprise! 👇
          </p>

          <motion.div
            onClick={handleOpenGift}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="relative cursor-pointer group flex flex-col items-center"
          >
            {/* Soft background aura */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity" />

            {/* Gift Box Container */}
            <div className="relative w-52 h-52 sm:w-60 sm:h-60 glass-card rounded-3xl p-6 flex flex-col items-center justify-center border-2 border-white/90 shadow-2xl bg-gradient-to-br from-pink-500/80 via-rose-400/80 to-purple-500/80 text-white">
              {/* Gold Ribbon Graphic */}
              <div className="absolute top-0 bottom-0 w-9 bg-amber-300/90 shadow-md border-x border-amber-200" />
              <div className="absolute left-0 right-0 h-9 bg-amber-300/90 shadow-md border-y border-amber-200" />

              {/* Bow Icon */}
              <div className="absolute -top-7 text-amber-300 drop-shadow-lg z-10">
                <Gift className="w-16 h-16 animate-bounce" />
              </div>

              <div className="relative z-10 text-center mt-6">
                <Sparkles className="w-8 h-8 text-amber-200 mx-auto mb-2 animate-spin-slow" />
                <span className="font-bold text-lg sm:text-xl font-serif-display drop-shadow">
                  Open {formattedName}'s Gift
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        /* OPENED GIFT CONTENT & NAVIGATION */
        <motion.div
          key="opened-gift-body"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full space-y-6"
        >
          {/* Navigation Tabs (3 Sections) */}
          <div className="flex items-center justify-around bg-white/70 p-1.5 rounded-2xl backdrop-blur-md border border-white/90 shadow-sm text-xs sm:text-sm font-bold">
            {[
              { id: 'letter', label: 'Letter 💌', icon: BookOpen },
              { id: 'band', label: 'Friendship Band 🎗️', icon: HeartHandshake },
              { id: 'promise', label: 'My Promise 💖', icon: Heart },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  soundFx.playTap();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`py-2.5 px-3.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-pink-500 text-white shadow-md'
                    : 'text-slate-700 hover:text-pink-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* SECTION 1: LETTER */}
          {activeTab === 'letter' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-3xl p-6 sm:p-8 space-y-4 text-left border border-white/90 shadow-xl relative overflow-hidden"
            >
              {/* Corner Rose Accent */}
              <div className="absolute top-2 right-2 text-2xl opacity-40 select-none">🌹</div>
              <div className="absolute bottom-2 left-2 text-2xl opacity-40 select-none">🌸</div>

              <div className="flex items-center justify-between border-b border-pink-200/60 pb-3">
                <h3 className="font-cursive text-2xl sm:text-3xl font-bold text-pink-600 flex items-center gap-2">
                  <span>My Dear {formattedName} 💌</span>
                </h3>
                <span className="text-xs text-slate-500 font-semibold">Friendship Day 2026</span>
              </div>

              <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                <p>
                  Some people enter our lives like a gentle breeze, bringing warmth, comfort, and unexpected joy. You are one of those rare souls, <strong className="text-pink-600 font-bold">{formattedName}</strong>.
                </p>
                <p>
                  Thank you for being someone I can trust, laugh with, and share moments both big and small. True friends don't just share smiles — they illuminate every path they walk together.
                </p>
                <p className="font-cursive text-xl sm:text-2xl text-purple-700 pt-2 text-center">
                  "A single rose can be my garden... a single friend, my world."
                </p>
              </div>

              <div className="pt-4 border-t border-pink-200/60 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 font-bold text-pink-600">
                  <Flower2 className="w-4 h-4" /> Always & Forever
                </span>
                <span className="italic font-semibold">— VVK</span>
              </div>
            </motion.div>
          )}

          {/* SECTION 2: HANDMADE REALISTIC FRIENDSHIP BAND */}
          {activeTab === 'band' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 text-center border border-white/90 shadow-xl relative overflow-hidden"
            >
              <div>
                <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-slate-800 mb-1">
                  Handmade Friendship Band 🎗️
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  A realistic handcrafted woven bracelet embroidered specially for {formattedName}
                </p>
              </div>

              {/* Realistic Woven Bracelet Rendering matching photo */}
              <WovenBracelet
                myInitials="VVK"
                friendNickname={friendNickname}
                theme={bandTheme}
                onThemeChange={(newTheme) => {
                  soundFx.playTap();
                  setBandTheme(newTheme);
                }}
              />
            </motion.div>
          )}

          {/* SECTION 3: MY PROMISE TO YOU (EXACT PROMPT REQUIREMENTS) */}
          {activeTab === 'promise' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-3xl p-6 sm:p-8 space-y-5 text-left border border-white/90 shadow-2xl relative overflow-hidden"
            >
              {/* Corner Roses */}
              <div className="absolute top-3 left-3 text-2xl select-none">🌹</div>
              <div className="absolute top-3 right-3 text-2xl select-none">🌹</div>
              <div className="absolute bottom-3 left-3 text-2xl select-none">🌸</div>
              <div className="absolute bottom-3 right-3 text-2xl select-none">🌸</div>

              <div className="text-center pb-2 border-b border-pink-200/60">
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-slate-800 flex items-center justify-center gap-2">
                  <span>💖 My Promise To You</span>
                </h3>
              </div>

              {/* Exact Promise Text Line-By-Line Typewriter Animation */}
              <div className="space-y-4 text-slate-700 text-sm sm:text-base font-medium leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  I don't promise to be the perfect friend.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-bold text-pink-700"
                >
                  I promise to be a real one.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  I promise to stay honest, to respect you, to support your dreams, and to stand beside you when life gets difficult.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  I might not always say it, and I might not always show it in the best way...
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="font-semibold"
                >
                  But one thing will never change—
                </motion.p>

                {/* HIGHLIGHTED GLOWING PHONE CALL AWAY CALLOUT */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="p-4 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-rose-500/10 border-2 border-pink-400/60 text-center my-3 shadow-md"
                >
                  <div className="flex items-center justify-center gap-2 mb-1 text-pink-600">
                    <PhoneCall className="w-5 h-5 animate-bounce" />
                    <span className="text-lg sm:text-xl font-extrabold glowing-callout text-pink-600">
                      "I'm just one phone call away. ❤️"
                    </span>
                  </div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                >
                  Whether it's 2 PM or 2 AM, whether you're celebrating your biggest achievement or going through your toughest battle, don't hesitate to call me.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                >
                  If you ever need me, no matter the time or the reason, I'll always try my best to be there.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7 }}
                  className="font-semibold text-purple-800"
                >
                  That's my Friendship Day promise to you. 🌸💙
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9 }}
                  className="text-right font-cursive text-2xl font-bold text-pink-600 pt-2"
                >
                  — VVK
                </motion.p>
              </div>
            </motion.div>
          )}

          {/* SECTION 4: EMOTIONAL ENDING (PROGRESSIVE UNVEILING) */}
          <div className="w-full glass-card rounded-3xl p-6 sm:p-8 text-center space-y-4 border border-white/90 shadow-xl mt-8">
            <div className="space-y-3 font-medium text-slate-800">
              <p className="text-sm sm:text-base font-semibold text-slate-700">
                Thank you for opening this little surprise.
              </p>

              {endingStep >= 1 && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-sm sm:text-base text-slate-600 italic"
                >
                  "I may not always be the best at expressing my feelings..."
                </motion.p>
              )}

              {endingStep >= 2 && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-base sm:text-lg font-bold text-pink-600"
                >
                  "But I'm really grateful that you're a part of my life."
                </motion.p>
              )}

              {endingStep >= 3 && (
                <motion.p
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-xl sm:text-2xl font-bold font-serif-display text-purple-800 pt-2"
                >
                  Happy Friendship Day, {formattedName}. ❤️
                </motion.p>
              )}
            </div>

            {/* Final Signature */}
            {endingStep >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 border-t border-pink-200/60 flex flex-col items-center justify-center space-y-1"
              >
                <p className="text-xs text-slate-500 font-semibold">
                  Made with ❤️ by
                </p>
                <p className="text-lg font-bold text-pink-600 tracking-wider">
                  VVK
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};
