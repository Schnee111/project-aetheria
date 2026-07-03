import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { MontageRegistry } from '../../data/montages';
import { chapter1 } from '../../data/chapter-1';



export function CinematicMontageScreen() {
  const { setScreen, progress, setProgress } = useGameStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentYear, setCurrentYear] = useState(0);
  const targetYearRef = useRef(0);
  const [showEndText, setShowEndText] = useState(false);

  const currentMontageId = progress.currentSceneId;
  const MONTAGE_SEQUENCE = MontageRegistry[currentMontageId] || [];
  
  // Find next scene id
  const currentSceneData = chapter1.scenes.find(s => s.id === currentMontageId);
  const nextSceneId = currentSceneData?.nextSceneId || 'CH1_END';

  
  const frame = MONTAGE_SEQUENCE[currentIndex];
  
  // Handle advancing frames
  useEffect(() => {
    if (currentIndex >= MONTAGE_SEQUENCE.length) {
      // Transition to final text
      setShowEndText(true);

      const endTimer = setTimeout(() => {
        setProgress({ ...progress, currentSceneId: nextSceneId });
        if (nextSceneId === 'CH1_END') {
          setScreen('chapter_complete');
        } else {
          setScreen('visual_novel');
        }
      }, 5000); // Wait 5s for the text
      return () => clearTimeout(endTimer);
    }
    
    const currentFrame = MONTAGE_SEQUENCE[currentIndex];
    if (!currentFrame) return;
    const durationMs = (currentFrame.fadeIn + currentFrame.hold) * 1000;
    
    const timer = setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, durationMs);
    
    return () => clearTimeout(timer);
  }, [currentIndex, setScreen, setProgress, progress]);

  // Handle year counting animation
  useEffect(() => {
    if (!frame || frame.hideYear || frame.earthYear) return;
    
    if (frame.yearText !== undefined && frame.yearText > targetYearRef.current) {
      // Speed up the count: exactly 1 second (1000ms) for instant feel
      const durationMs = 1000;
      const startYear = targetYearRef.current;
      const endYear = frame.yearText;
      targetYearRef.current = endYear; // lock the target immediately
      
      let startTimestamp: number | null = null;
      let animationFrameId: number;
      
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const elapsed = timestamp - startTimestamp;
        const p = Math.min(elapsed / durationMs, 1);
        
        // Linear ease for snappy speed
        const nextYear = Math.floor(startYear + (endYear - startYear) * p);
        
        setCurrentYear(nextYear);
        
        if (p < 1) {
          animationFrameId = window.requestAnimationFrame(step);
        } else {
          setCurrentYear(endYear);
        }
      };
      
      animationFrameId = window.requestAnimationFrame(step);
      
      return () => {
        if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
      };
    }
  }, [currentIndex, frame]);

  // Render logic
  const isComplete = currentIndex >= MONTAGE_SEQUENCE.length;

  return (
    <div className="absolute inset-0 bg-black overflow-hidden pointer-events-none select-none">
      
      <AnimatePresence mode="popLayout">
        {!isComplete && frame && frame.src !== 'black' && (
          <motion.div
            key={frame.id}
            initial={{ opacity: frame.flash ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: frame.flash ? 0 : frame.fadeIn,
              ease: "linear",
              exit: { duration: 0.5 } // overlap slightly
            }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${frame.src}')` }}
            />
            {/* Slow scale effect (Ken Burns) */}
            <motion.div 
              className="absolute inset-0 bg-cover bg-center origin-center"
              style={{ backgroundImage: `url('${frame.src}')` }}
              initial={{ scale: 1 }}
              animate={{ scale: frame.flash ? 1 : 1.05 }}
              transition={{ duration: (frame.fadeIn + frame.hold) * 1.5, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Teks Tahun */}
      <AnimatePresence>
        {!isComplete && frame && !frame.hideYear && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-12 left-12 z-50"
          >
            <div className="text-left">
              {frame.earthYear ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="font-sans text-[#E11D48] text-5xl md:text-6xl tracking-[0.3em] font-semibold uppercase drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]"
                >
                  EARTH: 2026
                </motion.div>
              ) : (
                <div 
                  className="font-sans text-[#FAFAFA] text-5xl md:text-6xl tracking-[0.3em] font-semibold uppercase drop-shadow-[0_4px_15px_rgba(0,0,0,0.9)]"
                >
                  YEAR {String(currentYear).padStart(4, '0')}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Black Screen Hit / End Text */}
      <AnimatePresence>
        {showEndText && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black"
          >
            <div className="text-white text-center">
              <h1 className="text-3xl md:text-5xl font-serif tracking-[0.4em] text-white/90 uppercase drop-shadow-2xl">
                Chapter 1
              </h1>
              <p className="mt-4 text-xl md:text-2xl font-serif tracking-[0.5em] text-[#E11D48] uppercase drop-shadow-[0_0_10px_rgba(225,29,72,0.8)]">
                Cleared
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .glitch-effect {
          animation: glitch 0.2s linear infinite;
        }
        @keyframes glitch {
          2%, 64% { transform: translate(2px,0) skew(0deg); }
          4%, 60% { transform: translate(-2px,0) skew(0deg); }
          62% { transform: translate(0,0) skew(5deg); }
        }
      `}</style>
    </div>
  );
}
