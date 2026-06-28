import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useSfx } from '../../hooks';
import { useSettingsStore } from '../../stores';
import type { DialogueLine } from '../../types';
import { Howl } from 'howler';
import { useMemo, useEffect } from 'react';

interface DialogBoxProps {
  line: DialogueLine;
  onTap: () => void;
}

export function DialogBox({ line, onTap }: DialogBoxProps) {
  const { displayedText, isComplete, skip } = useTypewriter(line.text);
  const { play: playSfx } = useSfx();
  const sfxVolume = useSettingsStore((s) => s.sfxVolume);

  const blip = useMemo(() => {
    let src = '/assets/audio/sfx/blip_mid.wav';
    if (line.speaker === 'lysthea') src = '/assets/audio/sfx/blip_high.wav';
    if (line.speaker === 'narrator' || line.speaker === 'system') src = '/assets/audio/sfx/blip_deep.wav';
    
    return new Howl({
      src: [src],
      volume: sfxVolume * 0.7,
    });
  }, [line.speaker, sfxVolume]);

  // Play blip occasionally during typing
  useEffect(() => {
    if (!isComplete && displayedText.length > 0) {
      const lastChar = displayedText[displayedText.length - 1];
      if ((lastChar ?? '').trim() && displayedText.length % 2 === 0) {
        blip.play();
      }
    }
  }, [displayedText, isComplete, blip]);

  // Play dialogue-specific SFX when the line starts
  useEffect(() => {
    if (line.audioSrc) {
      const sfx = playSfx(line.audioSrc);
      return () => {
        sfx?.stop();
      };
    }
  }, [line.id, line.audioSrc, playSfx]);


  const handleClick = useCallback(() => {
    if (!isComplete) {
      skip();
    } else {
      playSfx('/assets/audio/sfx/sfx_click.wav');
      onTap();
    }
  }, [isComplete, skip, onTap, playSfx]);

  const isNarrator = line.speaker === 'narrator';
  
  const speakerName = isNarrator || line.speaker === 'system'
    ? ''
    : line.speaker.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  // ── CINEMATIC NARRATOR LAYOUT ──
  if (isNarrator) {
    return (
      <div 
        className="absolute inset-0 flex items-end justify-center pb-[15vh] md:pb-[20vh] z-30 cursor-pointer bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-colors duration-500"
        onClick={handleClick}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-4xl px-8 text-center"
        >
          <p 
            className="text-2xl md:text-3xl leading-relaxed font-body font-medium text-white tracking-wide"
            style={{ textShadow: '0px 2px 4px rgba(0,0,0,0.9), 0px 8px 24px rgba(0,0,0,1)' }}
          >
            {displayedText}
            {!isComplete && (
              <span className="inline-block w-[3px] h-[1em] bg-white ml-2 align-text-bottom animate-pulse-slow drop-shadow-lg" />
            )}
          </p>
          
          <AnimatePresence>
            {isComplete && (
              <motion.div
                className="mt-12 text-xs font-bold text-gray-300 tracking-[0.3em] uppercase drop-shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Klik untuk lanjut
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  // ── CHARACTER DIALOGUE LAYOUT ──
  return (
    <div className="absolute inset-0 z-30 cursor-pointer" onClick={handleClick}>
      <motion.div
        className="absolute bottom-8 left-0 right-0 mx-auto w-[90%] max-w-5xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-6 md:p-8 pt-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] min-h-[160px]">
          
          {/* Speaker Name Tag */}
          <AnimatePresence>
            {speakerName && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                key={speakerName}
                className="inline-block mb-4 relative z-20"
              >
                <span className="text-sm font-semibold tracking-widest text-gray-300 uppercase border-b border-white/20 pb-1">
                  {speakerName}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
   
          {/* Dialog Text */}
          <div className="relative z-10">
            <p className="text-xl md:text-2xl leading-relaxed font-body font-medium text-gray-100 min-h-[72px] drop-shadow-md">
              {displayedText}
              {!isComplete && (
                <span className="inline-block w-[3px] h-[1em] bg-white/80 ml-2 align-text-bottom animate-pulse-slow shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              )}
            </p>
          </div>

          {/* Next Indicator */}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                className="absolute bottom-6 right-8 flex items-center gap-2 text-xs font-semibold text-gray-400 tracking-[0.2em] uppercase z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span>Lanjut</span>
                <motion.div
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronRight size={16} className="text-gray-300" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Subtle subtle edge highlight */}
          <div className="absolute inset-0 rounded-xl pointer-events-none border-t border-white/5 z-0" />
        </div>
      </motion.div>
    </div>
  );
}
