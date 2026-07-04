import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';

const CREDITS = [
  // ── Cast ──
  { section: true, label: 'Cast' },
  { role: 'The Architect', name: 'Aeterna' },
  { role: 'Goddess of Order', name: 'Lysthea' },

  // ── Direction ──
  { section: true, label: 'Direction' },
  { role: 'Original Story & Concept', name: 'Schnee & Shorekeeper' },
  { role: 'Game Director', name: 'Schnee' },
  { role: 'Scriptwriter', name: 'Schnee' },
  { role: 'World Building', name: 'Schnee' },

  // ── Engineering ──
  { section: true, label: 'Engineering' },
  { role: 'Lead Programmer', name: 'Shorekeeper' },
  { role: 'Engine Architecture', name: 'Shorekeeper Engine Framework' },
  { role: 'Animation Programming', name: 'Shorekeeper' },
  { role: 'Visual Effects (VFX)', name: 'Shorekeeper' },

  // ── Art ──
  { section: true, label: 'Art' },
  { role: 'Lead Character Designer', name: 'DALL-E' },
  { role: 'Background & Environment Art', name: 'DALL-E' },
  { role: 'UI / UX Design', name: 'Schnee & Shorekeeper' },

  // ── Audio ──
  { section: true, label: 'Audio' },
  { role: 'Theme Song', name: '"Last Song" by supercell' },
  { role: 'Voice Direction', name: 'Schnee' },
  { role: 'Voice of Aeterna', name: 'Shorekeeper (MiMo TTS seed 7)' },
  { role: 'Voice of Lysthea', name: 'MiMo TTS (seed 21)' },
  { role: 'Music Coordination', name: 'Schnee' },
  { role: 'Audio Mixing & Mastering', name: 'Aetheria Sound Team' },
  { role: 'Sound Effects (SFX)', name: 'Aetheria Sound Team' },

  // ── Production ──
  { section: true, label: 'Production' },
  { role: 'English Localization', name: 'Shorekeeper' },
  { role: 'Quality Assurance', name: 'Schnee' },
  { role: 'Playtesting', name: 'Schnee' },
  { role: 'Project Management', name: 'Schnee' },

  // ── Special Thanks ──
  { section: true, label: 'Special Thanks' },
  { role: 'The Weaver of Fate', name: 'For dreaming a world into existence' },
  { role: 'Goddess of Order', name: 'For guarding it alone for ten thousand years' },
  { role: 'The Abyss', name: 'For reminding us that even code can break' },
  { role: 'You', name: 'For playing' },
];

export function ChapterCompleteScreen() {
  const setScreen = useGameStore((state) => state.setScreen);
  const [phase, setPhase] = useState<'title' | 'credits' | 'done'>('title');

  useEffect(() => {
    // Title → credits → done
    if (phase === 'title') {
      const t = setTimeout(() => setPhase('credits'), 6000);
      return () => clearTimeout(t);
    }
    if (phase === 'credits') {
      const t = setTimeout(() => setPhase('done'), 305000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className={`absolute inset-0 z-50 bg-black overflow-hidden ${phase === 'done' ? 'cursor-pointer' : ''}`}
      onClick={() => {
        if (phase === 'done') setScreen('landing');
      }}
    >
      {/* ── Title Card ── */}
      <AnimatePresence>
        {phase === 'title' && (
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

      {/* ── Credits Roll ── */}
      <AnimatePresence>
        {phase === 'credits' && (
          <motion.div
            initial={{ y: '100vh' }}
            animate={{ y: '-200%' }}
            transition={{ duration: 300, ease: 'linear' }}
            className="absolute left-0 right-0 flex flex-col items-center"
            style={{ top: 0 }}
          >
            {/* Small spacer */}
            <div className="h-[5vh]" />

            {CREDITS.map((credit, idx) => {
              if ('section' in credit && credit.section) {
                return (
                  <div key={idx} className="mt-24 mb-10 text-center">
                    <div className="flex items-center justify-center gap-4 mb-2">
                      <div className="w-12 h-px bg-white/20" />
                      <h3 className="text-gray-500 text-[10px] tracking-[0.5em] uppercase font-bold">
                        {credit.label}
                      </h3>
                      <div className="w-12 h-px bg-white/20" />
                    </div>
                  </div>
                );
              }
              return (
                <div key={idx} className="mb-16 text-center">
                  <h3 className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-2">
                    {credit.role}
                  </h3>
                  <h2 className="text-white text-xl md:text-2xl font-light tracking-wider">
                    {credit.name}
                  </h2>
                </div>
              );
            })}

            {/* End spacer */}
            <div className="h-[60vh]" />

            <div className="mb-32 text-center">
              <h2 className="text-white/80 text-3xl md:text-4xl font-light tracking-[0.3em] uppercase">
                Aetheria
              </h2>
              <p className="text-gray-600 text-sm tracking-widest mt-4">
                Chapter 1 — The Awakening
              </p>
            </div>

            <div className="h-[50vh]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Thank You (post-credits) ── */}
      <AnimatePresence>
        {phase === 'done' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
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

      {/* Skip Button */}
      <AnimatePresence>
        {phase === 'credits' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 15 }}
            className="absolute bottom-12 right-12 z-[60]"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setScreen('landing');
              }}
              className="text-gray-500 hover:text-white transition-colors duration-300 text-sm tracking-[0.2em] uppercase cursor-pointer flex items-center gap-2 group"
            >
              <span>Main Menu</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
