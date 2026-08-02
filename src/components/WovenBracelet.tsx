import React from 'react';
import { motion } from 'motion/react';

interface WovenBraceletProps {
  myInitials?: string;
  friendNickname: string;
  theme?: 'pink' | 'rainbow' | 'sunset' | 'ocean' | 'purple';
  onThemeChange?: (theme: 'pink' | 'rainbow' | 'sunset' | 'ocean' | 'purple') => void;
}

export const WovenBracelet: React.FC<WovenBraceletProps> = ({
  myInitials = 'VVK',
  friendNickname,
  theme = 'pink',
  onThemeChange,
}) => {
  const themeConfigs = {
    pink: {
      name: 'Classic Pink',
      bgGradient: 'from-pink-500 via-rose-400 to-pink-500',
      knotColors: 'from-pink-600 via-white to-rose-500',
      tasselPink: '#f472b6',
      tasselWhite: '#ffffff',
      borderBg: 'bg-[repeating-linear-gradient(90deg,#fff,#fff_6px,#fda4af_6px,#fda4af_12px)]',
    },
    rainbow: {
      name: 'Colorful Rainbow',
      bgGradient: 'from-red-500 via-yellow-400 via-green-400 via-blue-500 to-purple-600',
      knotColors: 'from-purple-600 via-yellow-300 to-pink-500',
      tasselPink: '#f43f5e',
      tasselWhite: '#fef08a',
      borderBg: 'bg-[repeating-linear-gradient(90deg,#fff,#fff_6px,#38bdf8_6px,#38bdf8_12px)]',
    },
    sunset: {
      name: 'Sunset Glow',
      bgGradient: 'from-amber-500 via-rose-500 to-purple-600',
      knotColors: 'from-amber-600 via-white to-purple-600',
      tasselPink: '#fb7185',
      tasselWhite: '#fef3c7',
      borderBg: 'bg-[repeating-linear-gradient(90deg,#fff,#fff_6px,#fbbf24_6px,#fbbf24_12px)]',
    },
    ocean: {
      bgGradient: 'from-cyan-500 via-teal-400 to-blue-600',
      knotColors: 'from-teal-600 via-white to-blue-600',
      tasselPink: '#38bdf8',
      tasselWhite: '#ffffff',
      borderBg: 'bg-[repeating-linear-gradient(90deg,#fff,#fff_6px,#22d3ee_6px,#22d3ee_12px)]',
    },
    purple: {
      name: 'Violet Dream',
      bgGradient: 'from-purple-600 via-pink-500 to-rose-500',
      knotColors: 'from-purple-700 via-white to-pink-500',
      tasselPink: '#c084fc',
      tasselWhite: '#ffffff',
      borderBg: 'bg-[repeating-linear-gradient(90deg,#fff,#fff_6px,#e879f9_6px,#e879f9_12px)]',
    },
  };

  const current = themeConfigs[theme] || themeConfigs.pink;

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-6">
      {/* Bracelet 3D Card Container */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative w-full max-w-md mx-auto py-6 px-1 flex flex-col items-center select-none"
      >
        {/* Soft realistic drop shadow under bracelet */}
        <div className="absolute bottom-4 w-[82%] h-5 bg-black/20 rounded-full blur-md" />

        <div className="relative w-full flex items-center justify-center">
          {/* LEFT TIED THREAD KNOT & FAN TASSEL */}
          <div className="relative z-20 flex items-center -mr-2 sm:-mr-3">
            {/* Left Frayed Thread Tassel Fan */}
            <div className="relative flex flex-col items-end transform -rotate-12">
              <svg width="48" height="34" viewBox="0 0 48 34" className="drop-shadow-sm">
                <path
                  d="M48,17 Q30,4 0,2 M48,17 Q25,9 0,9 M48,17 Q20,17 0,17 M48,17 Q25,25 0,25 M48,17 Q30,30 0,32"
                  stroke={current.tasselWhite}
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M48,17 Q32,2 2,0 M48,17 Q28,12 2,13 M48,17 Q22,20 2,21 M48,17 Q28,27 2,29"
                  stroke={current.tasselPink}
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Left Tied Wrapped Knot Ring */}
            <div
              className={`w-5 h-12 sm:w-6 sm:h-14 rounded-lg bg-gradient-to-r ${current.knotColors} border-2 border-white shadow-md flex flex-col justify-around py-1 px-0.5 z-20`}
            >
              <div className="w-full h-1 bg-white/90 rounded-full shadow-xs" />
              <div className="w-full h-1 bg-rose-300/80 rounded-full shadow-xs" />
              <div className="w-full h-1 bg-white/90 rounded-full shadow-xs" />
            </div>
          </div>

          {/* MAIN WOVEN BAND BODY */}
          <div
            className={`relative flex-1 h-16 sm:h-20 rounded-2xl bg-gradient-to-r ${current.bgGradient} shadow-2xl border-y-[3px] border-amber-100/90 flex items-center justify-between px-3 sm:px-6 overflow-hidden woven-band-texture`}
          >
            {/* Top Crocheted Border Trim */}
            <div className={`absolute top-0 left-0 right-0 h-2 sm:h-2.5 ${current.borderBg} shadow-xs border-b border-amber-200/50`} />

            {/* Embroidered Thread Text & Red Heart */}
            <div className="w-full flex items-center justify-center gap-2 sm:gap-4 relative z-10 font-bold text-white tracking-widest my-auto">
              {/* VVK */}
              <span className="text-xl sm:text-2xl font-black uppercase drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)] tracking-wider font-mono text-white">
                {myInitials}
              </span>

              {/* Embroidered Red Heart Symbol */}
              <div className="relative flex items-center justify-center transform hover:scale-110 transition-transform">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  className="w-7 h-7 sm:w-9 sm:h-9 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
                >
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="#e11d48"
                    stroke="#ffffff"
                    strokeWidth="1.8"
                  />
                </svg>
              </div>

              {/* Friend Nickname */}
              <span className="text-xl sm:text-2xl font-black uppercase drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)] tracking-wider font-mono text-white">
                {friendNickname}
              </span>
            </div>

            {/* Bottom Crocheted Border Trim */}
            <div className={`absolute bottom-0 left-0 right-0 h-2 sm:h-2.5 ${current.borderBg} shadow-xs border-t border-amber-200/50`} />
          </div>

          {/* RIGHT TIED THREAD KNOT & FAN TASSEL */}
          <div className="relative z-20 flex items-center -ml-2 sm:-ml-3">
            {/* Right Tied Wrapped Knot Ring */}
            <div
              className={`w-5 h-12 sm:w-6 sm:h-14 rounded-lg bg-gradient-to-r ${current.knotColors} border-2 border-white shadow-md flex flex-col justify-around py-1 px-0.5 z-20`}
            >
              <div className="w-full h-1 bg-white/90 rounded-full shadow-xs" />
              <div className="w-full h-1 bg-rose-300/80 rounded-full shadow-xs" />
              <div className="w-full h-1 bg-white/90 rounded-full shadow-xs" />
            </div>

            {/* Right Frayed Thread Tassel Fan */}
            <div className="relative flex flex-col items-start transform rotate-12">
              <svg width="48" height="34" viewBox="0 0 48 34" className="drop-shadow-sm scale-x-[-1]">
                <path
                  d="M48,17 Q30,4 0,2 M48,17 Q25,9 0,9 M48,17 Q20,17 0,17 M48,17 Q25,25 0,25 M48,17 Q30,30 0,32"
                  stroke={current.tasselWhite}
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M48,17 Q32,2 2,0 M48,17 Q28,12 2,13 M48,17 Q22,20 2,21 M48,17 Q28,27 2,29"
                  stroke={current.tasselPink}
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 mt-5 font-semibold italic text-center">
          ✨ Handcrafted cotton yarn • Embroidered stitching • Tied thread tassels
        </p>
      </motion.div>

      {/* Colorful Theme Selector */}
      {onThemeChange && (
        <div className="w-full max-w-sm text-left space-y-2 glass-card p-3 rounded-2xl border border-white/80 shadow-sm">
          <span className="text-xs font-bold text-slate-700 block">
            Choose Band Color & Pattern:
          </span>
          <div className="grid grid-cols-5 gap-2">
            {(
              [
                { id: 'pink', bg: 'bg-pink-500', name: 'Classic Pink' },
                { id: 'rainbow', bg: 'bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 to-blue-500', name: 'Rainbow' },
                { id: 'sunset', bg: 'bg-gradient-to-r from-amber-500 to-purple-600', name: 'Sunset' },
                { id: 'ocean', bg: 'bg-gradient-to-r from-cyan-400 to-blue-600', name: 'Ocean' },
                { id: 'purple', bg: 'bg-gradient-to-r from-purple-500 to-pink-500', name: 'Violet' },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => onThemeChange(t.id)}
                className={`h-8 rounded-xl ${t.bg} border-2 transition-all cursor-pointer ${
                  theme === t.id ? 'border-slate-800 scale-110 shadow-md ring-2 ring-pink-300' : 'border-white/90 opacity-80 hover:opacity-100'
                }`}
                title={t.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
