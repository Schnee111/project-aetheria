import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';

const CREDITS = [
  { role: 'Original Story & Concept', name: 'Schnee & Aeterna' },
  { role: 'Game Director', name: 'Schnee' },
  { role: 'Lead Programmer', name: 'Aeterna (Antigravity)' },
  { role: 'Engine Architecture', name: 'Aeterna Engine Framework' },
  { role: 'World Building', name: 'Schnee' },
  { role: 'Lead Character Designer', name: 'DALL-E AI' },
  { role: 'Background & Environment Art', name: 'DALL-E AI' },
  { role: 'UI / UX Design', name: 'Schnee & Aeterna' },
  { role: 'Visual Effects (VFX)', name: 'Aeterna' },
  { role: 'Animation Programming', name: 'Aeterna (Antigravity)' },
  { role: 'Theme Song', name: 'Last Song by supercell' },
  { role: 'Music Coordination', name: 'Schnee' },
  { role: 'Audio Mixing & Mastering', name: 'Aetheria Sound Team' },
  { role: 'Sound Effects (SFX)', name: 'Aetheria Sound Team' },
  { role: 'Scriptwriter', name: 'Schnee' },
  { role: 'English Localization', name: 'Aeterna' },
  { role: 'Quality Assurance', name: 'Schnee' },
  { role: 'Playtesting', name: 'Schnee' },
  { role: 'Project Management', name: 'Schnee' },
  { role: 'Special Thanks', name: 'The Weaver of Fate' },
  { role: 'And To You', name: 'Thank you for playing' },
];

export function ChapterCompleteScreen() {
  const setScreen = useGameStore((state) => state.setScreen);
  const [showTitle, setShowTitle] = useState(true);
  const [showCredits, setShowCredits] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Show title for 5 seconds, then transition to credits
    if (showTitle) {
      const timer = setTimeout(() => {
        setShowTitle(false);
        setTimeout(() => setShowCredits(true), 2000);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showTitle]);

  useEffect(() => {
    // 100 seconds for credits
    if (showCredits) {
      const timer = setTimeout(() => {
        setShowCredits(false);
        setTimeout(() => setIsDone(true), 2000);
      }, 100000);
      return () => clearTimeout(timer);
    }
  }, [showCredits]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-black overflow-hidden cursor-pointer"
      onClick={() => {
        // Skip logic
        if (showTitle) {
          setShowTitle(false);
          setShowCredits(true);
        } else if (showCredits) {
          setShowCredits(false);
          setIsDone(true);
        } else if (isDone) {
          setScreen('landing');
        }
      }}
    >
      <AnimatePresence>
        {showTitle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="text-center absolute inset-0 flex flex-col items-center justify-center"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 3 }}
              className="text-4xl md:text-5xl font-bold tracking-[0.2em] text-white mb-6 uppercase"
              style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}
            >
              Chapter 1: Complete
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 2 }}
              className="text-gray-400 text-lg tracking-widest uppercase"
            >
              To Be Continued...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCredits && (
          <motion.div
            initial={{ y: '80vh' }}
            animate={{ y: '-150%' }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            transition={{ duration: 100, ease: 'linear' }}
            className="absolute flex flex-col items-center w-full top-0"
          >
            {CREDITS.map((credit, idx) => (
              <div key={idx} className="mb-20 text-center">
                <h3 className="text-gray-400 text-sm tracking-[0.3em] uppercase mb-3">
                  {credit.role}
                </h3>
                <h2 className="text-white text-2xl md:text-3xl font-light tracking-wider">
                  {credit.name}
                </h2>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDone && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center absolute inset-0 flex flex-col items-center justify-center"
          >
             <h2 className="text-white text-3xl font-light tracking-[0.3em] uppercase mb-12">
               Thank You For Playing
             </h2>
             <p className="text-gray-600 text-sm tracking-widest animate-pulse">
               Click anywhere to return to main menu
             </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}