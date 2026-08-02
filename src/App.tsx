import { useState, useEffect } from 'react';
import { PetalCanvas } from './components/PetalCanvas';
import { NameEntryCard } from './components/NameEntryCard';
import { GiftExperience } from './components/GiftExperience';

export default function App() {
  const [userName, setUserName] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Check localStorage for saved name
  useEffect(() => {
    try {
      const saved = localStorage.getItem('friendship_user_name');
      if (saved && saved.trim()) {
        setUserName(saved.trim());
      }
    } catch {
      // Ignore storage errors
    }
    setIsLoaded(true);
  }, []);

  const handleNameSubmitted = (name: string) => {
    setUserName(name);
    setIsTransitioning(false);
  };

  const handleResetName = () => {
    try {
      localStorage.removeItem('friendship_user_name');
    } catch {
      // Ignore
    }
    setUserName(null);
    setIsTransitioning(false);
  };

  if (!isLoaded) return null;

  return (
    <main className="relative min-h-[100dvh] w-full animated-gradient-bg overflow-x-hidden flex flex-col items-center justify-center font-sans">
      {/* 60fps Falling Petals, Butterflies, and Sparkles Layer */}
      <PetalCanvas
        density={userName ? 'normal' : 'dense'}
        isTransitioning={isTransitioning}
      />

      {/* Main Content Area */}
      <div className="relative z-20 w-full min-h-[100dvh] flex flex-col items-center justify-center">
        {!userName ? (
          <NameEntryCard
            onNameSubmitted={handleNameSubmitted}
            setIsTransitioning={setIsTransitioning}
          />
        ) : (
          <GiftExperience
            userName={userName}
            onResetName={handleResetName}
          />
        )}
      </div>
    </main>
  );
}
