import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';

interface MontageFrame {
  id: string;
  src: string;
  fadeIn: number; // in seconds
  hold: number;   // in seconds
  flash?: boolean; // if true, instant appear
  yearText?: number; // target year to count up to
  earthYear?: boolean; // toggle to earth 2026 text
  hideYear?: boolean;
}

// 150+ seconds total (Slower Pacing)
const MONTAGE_SEQUENCE: MontageFrame[] = [
  // FASE 1: THE GOLDEN AGE
  { id: '1', src: '/assets/cgs/ch1/cg_ch1_s05_01_void.png', fadeIn: 1, hold: 4, yearText: 0 },
  { id: '2', src: '/assets/cgs/ch1/cg_ch1_montage_02_komet.png', fadeIn: 1, hold: 4, yearText: 0 },
  { id: '3', src: '/assets/cgs/ch1/cg_ch1_montage_detail_1_hands.png', fadeIn: 0.5, hold: 3.5, yearText: 0 },
  { id: '4', src: '/assets/cgs/ch1/cg_ch1_montage_03_pantheon.png', fadeIn: 1, hold: 4, yearText: 0 },
  { id: '5', src: '/assets/cgs/ch1/cg_ch1_montage_04_sunrise.png', fadeIn: 1, hold: 5, yearText: 0 },
  
  // FASE 2: THE DEPARTURE
  { id: '6', src: '/assets/cgs/ch1/cg_ch1_montage_detail_2_halo.png', fadeIn: 1, hold: 3.5, yearText: 1 },
  { id: '7', src: '/assets/cgs/ch1/cg_ch1_s05_06_aeterna_tired.png', fadeIn: 1, hold: 4, yearText: 1 },
  { id: '8', src: '/assets/cgs/ch1/cg_ch1_s05_06b_cracking.png', fadeIn: 0.5, hold: 3.5, yearText: 1 },
  { id: '9', src: '/assets/cgs/ch1/cg_ch1_s05_07_handover_cube.png', fadeIn: 1, hold: 4, yearText: 1 },
  
  // FASE 3: THE LONELY MILLENNIA
  { id: '10', src: '/assets/cgs/ch1/cg_ch1_montage_08_guide.png', fadeIn: 1, hold: 4.5, yearText: 100 },
  { id: '11', src: '/assets/cgs/ch1/cg_ch1_montage_09_temple.png', fadeIn: 1, hold: 4.5, yearText: 1000 },
  { id: '12', src: '/assets/cgs/ch1/cg_ch1_montage_09b_statue_decay.png', fadeIn: 1, hold: 4, yearText: 1000 },
  
  // FASE 4: THE INVASION & AFTERMATH
  { id: '13', src: '/assets/cgs/ch1/cg_ch1_montage_10a_sky_crack.png', fadeIn: 0.2, hold: 4, yearText: 5000, flash: true },
  { id: '14', src: '/assets/cgs/ch1/cg_ch1_montage_10_abyssal.png', fadeIn: 0.5, hold: 4.5, yearText: 5000 },
  { id: '15', src: '/assets/cgs/ch1/cg_ch1_montage_10b_pantheon_seal.png', fadeIn: 0.5, hold: 4, yearText: 5000 },
  { id: '16', src: '/assets/cgs/ch1/cg_ch1_montage_10c_lys_lookup.png', fadeIn: 0.5, hold: 4.5, yearText: 5000 },
  { id: '17', src: '/assets/cgs/ch1/cg_ch1_montage_10d_wasteland.png', fadeIn: 1, hold: 5, yearText: 5000 },
  
  // FASE 5: THE ENDLESS WINTER
  { id: '18', src: '/assets/cgs/ch1/cg_ch1_montage_detail_3_eye.png', fadeIn: 1, hold: 3.5, yearText: 7000 },
  { id: '19', src: '/assets/cgs/ch1/cg_ch1_montage_11_snow.png', fadeIn: 1, hold: 5, yearText: 7000 },
  { id: '20', src: '/assets/cgs/ch1/cg_ch1_montage_11b_broken_sword.png', fadeIn: 1, hold: 4.5, yearText: 7000 },
  { id: '21', src: '/assets/cgs/ch1/cg_ch1_montage_detail_4_clock.png', fadeIn: 0.5, hold: 3.5, yearText: 8500 },
  { id: '22', src: '/assets/cgs/ch1/cg_ch1_montage_11d_oblivious_city_wide.png', fadeIn: 1, hold: 5, yearText: 8500 },
  { id: '23', src: '/assets/cgs/ch1/cg_ch1_montage_11c_oblivious_city_lys.png', fadeIn: 1, hold: 5, yearText: 8500 },
  { id: '24', src: '/assets/cgs/ch1/cg_ch1_montage_12_myth.png', fadeIn: 1, hold: 4.5, yearText: 8500 },
  
  // FASE 6: TWIN DESTINIES
  { id: '25', src: '/assets/cgs/ch1/cg_ch1_montage_detail_6_bus.png', fadeIn: 0.5, hold: 3.5, yearText: 9999, earthYear: true },
  { id: '26', src: '/assets/cgs/ch1/cg_ch1_montage_13b_lys_window.png', fadeIn: 0.5, hold: 3.5, yearText: 9999 },
  { id: '27', src: '/assets/cgs/ch1/cg_ch1_montage_13_earth.png', fadeIn: 0.5, hold: 3.5, yearText: 9999, earthYear: true },
  { id: '28', src: '/assets/cgs/ch1/cg_ch1_montage_14b_lys_walk.png', fadeIn: 0.5, hold: 3.5, yearText: 9999 },
  { id: '29', src: '/assets/cgs/ch1/cg_ch1_montage_detail_5_traffic.png', fadeIn: 0.1, hold: 1.5, yearText: 9999, earthYear: true, flash: true },
  { id: '30', src: '/assets/cgs/ch1/cg_ch1_montage_14_moon_earth.png', fadeIn: 0.5, hold: 3.5, yearText: 9999, earthYear: true },
  { id: '31', src: '/assets/cgs/ch1/cg_ch1_montage_15_moon_aetheria.png', fadeIn: 0.5, hold: 3.5, yearText: 9999 },
  
  // FASE 7: THE IMPACT
  { id: '32', src: '/assets/cgs/ch1/cg_ch1_montage_16_crosswalk.png', fadeIn: 0.3, hold: 2, hideYear: true, flash: true },
  { id: '33', src: '/assets/cgs/ch1/cg_ch1_montage_17_truck_hit.png', fadeIn: 0, hold: 0.3, hideYear: true, flash: true },
  
  // BLACK SCREEN
  { id: '34', src: 'black', fadeIn: 0, hold: 3, hideYear: true, flash: true }
];

export function CinematicMontageScreen() {
  const { setScreen, progress, setProgress } = useGameStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentYear, setCurrentYear] = useState(0);
  const targetYearRef = useRef(0);
  const [showEndText, setShowEndText] = useState(false);
  
  const frame = MONTAGE_SEQUENCE[currentIndex];
  
  // Handle advancing frames
  useEffect(() => {
    if (currentIndex >= MONTAGE_SEQUENCE.length) {
      // Transition to final text
      setShowEndText(true);
      const endTimer = setTimeout(() => {
        // We set to chapter complete
        setProgress({ ...progress, currentSceneId: 'CH1_END' });
        setScreen('chapter_complete');
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
