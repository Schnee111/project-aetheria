import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useSfx, useVoice } from '../../hooks';
import { useSettingsStore } from '../../stores';
import { useLocalization } from '../../hooks/useLocalization';
import type { DialogueLine } from '../../types';
import { Howl } from 'howler';
import { useMemo, useEffect, useRef } from 'react';
import { resolvePublicAssetSrc } from '../../utils/assetResolver';

interface DialogBoxProps {
  line: DialogueLine;
  onTap: () => void;
}

export function DialogBox({ line, onTap }: DialogBoxProps) {
  const { getDialogueText, getSpeakerName, language, t } = useLocalization();
  const localizedText = getDialogueText(line);
  const isInstant = line.speaker === 'system' || line.speaker === 'narrator';
  const { play: playSfx } = useSfx();
  const { play: playVoice } = useVoice();
  const sfxVolume = useSettingsStore((s) => s.sfxVolume);

  // ── Auto-advance timer management ──
  const autoTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const onTapRef = useRef(onTap);
  onTapRef.current = onTap;

  // Cancel pending auto-advance when line changes
  useEffect(() => {
    if (line.autoAdvance && line.unskippable && (!line.voiceSrc || line.ignoreVoiceDuration)) {
      const delay = line.autoAdvanceDelay || 1500;
      autoTimerRef.current = setTimeout(() => {
        onTapRef.current();
      }, delay);
    }
    return () => {
      if (autoTimerRef.current) {
        clearTimeout(autoTimerRef.current);
        autoTimerRef.current = undefined;
      }
    };
  }, [
    line.id,
    line.autoAdvance,
    line.unskippable,
    line.autoAdvanceDelay,
    line.voiceSrc,
    line.ignoreVoiceDuration,
  ]);

  const handleTypewriterComplete = useCallback(() => {
    if (line.autoAdvance && !line.unskippable) {
      const delay = line.autoAdvanceDelay || 1500;
      autoTimerRef.current = setTimeout(() => {
        onTapRef.current();
      }, delay);
    }
  }, [line.autoAdvance, line.unskippable, line.autoAdvanceDelay]);

  const { displayedText, isComplete, skip } = useTypewriter(
    localizedText,
    handleTypewriterComplete,
    isInstant,
    undefined
  );

  // ── Audio ──
  const blip = useMemo(() => {
    const src = resolvePublicAssetSrc('/assets/audio/sfx/blip_mid.ogg');
    return new Howl({ src: [src], volume: sfxVolume * 0.3 });
  }, [sfxVolume]);

  useEffect(() => {
    if (!isComplete && displayedText.length > 0) {
      const lastChar = displayedText[displayedText.length - 1];
      if ((lastChar ?? '').trim() && displayedText.length % 2 === 0) {
        blip.play();
      }
    }
  }, [displayedText, isComplete, blip]);

  useEffect(() => {
    if (line.audioSrc) {
      playSfx(line.audioSrc);
      // Don't stop SFX on cleanup — let it play to completion
      // so ambient SFX (resonance, glass shards) carry across lines
    }
  }, [line.id, line.audioSrc, playSfx]);

  useEffect(() => {
    let playTimer: ReturnType<typeof setTimeout>;
    if (line.voiceSrc) {
      const voiceSrc = line.voiceSrc;
      playTimer = setTimeout(() => {
        playVoice(voiceSrc, () => {
          if (line.autoAdvance && !line.ignoreVoiceDuration) {
            autoTimerRef.current = setTimeout(() => {
              onTapRef.current();
            }, line.postVoiceDelay ?? 1000);
          }
        });
      }, 150); // Wait 150ms for fade-in transition (tuned for BGM sync)
      
      return () => {
        clearTimeout(playTimer);
        // DO NOT call stopVoice() here. It will cut off audio spanning multiple dialogues.
        // useVoice.play() automatically stops the old voice when a new one is played.
      };
    }
  }, [
    line.id,
    line.voiceSrc,
    line.autoAdvance,
    line.ignoreVoiceDuration,
    line.postVoiceDelay,
    playVoice,
  ]);

  // ── Interaction ──
  const handleClick = useCallback(() => {
    if (line.unskippable) return;
    if (!isComplete) {
      skip();
    } else {
      playSfx('/assets/audio/sfx/sfx_click.ogg');
      onTap();
    }
  }, [line.unskippable, isComplete, skip, onTap, playSfx]);

  const isNarrator = line.speaker === 'narrator';
  const speakerName = isNarrator || line.speaker === 'system'
    ? ''
    : language === 'en' && line.speakerLabelEn
      ? line.speakerLabelEn
      : line.speakerLabel ?? getSpeakerName(line.speaker);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 30 }}>
      <AnimatePresence mode="wait">
        {isNarrator ? (
          // ── NARRATOR LAYOUT ──
          <motion.div
            key={'narrator-' + line.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-end justify-center pb-[4vh] md:pb-[12vh] cursor-pointer bg-gradient-to-t from-black/50 via-black/10 to-transparent"
            onClick={handleClick}
          >
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="max-w-4xl px-2 md:px-8 text-center"
            >
              <p
                className="text-base md:text-xl lg:text-3xl leading-relaxed font-body font-medium text-white tracking-wide"
                style={{ textShadow: '0px 2px 4px rgba(0,0,0,0.9), 0px 8px 24px rgba(0,0,0,1)' }}
              >
                {displayedText}
                {!isComplete && (
                  <span className="inline-block w-[3px] h-[1em] bg-white ml-2 align-text-bottom animate-pulse-slow drop-shadow-lg" />
                )}
              </p>
              <AnimatePresence>
                {isComplete && !line.unskippable && !line.autoAdvance && (
                  <motion.div
                    className="mt-4 md:mt-12 text-xs font-bold text-gray-300 tracking-[0.3em] uppercase drop-shadow-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {t('common.clickToContinue')}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ) : (
          // ── CHARACTER DIALOGUE LAYOUT ──
          <motion.div key="dialog" className="absolute inset-0 cursor-pointer" onClick={handleClick}>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute bottom-2 left-0 right-0 mx-auto w-[96%] max-w-5xl md:bottom-8 md:w-[90%] transform-gpu"
            >
              <div className="relative w-full bg-black/30 backdrop-blur-md border border-white/5 rounded-lg p-2 shadow-[0_8px_32px_rgba(0,0,0,0.5)] md:min-h-[140px] md:p-8 md:pt-6">
                <AnimatePresence>
                  {speakerName && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={speakerName}
                      className="inline-block mb-0.5 md:mb-4 relative z-20"
                    >
                      <span className="text-[10px] md:text-xs font-semibold tracking-widest text-gray-300 uppercase border-b border-white/20 pb-1">
                        {speakerName}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="relative z-10">
                  <p className="text-xs leading-snug font-body font-medium text-gray-100 min-h-[32px] drop-shadow-md md:min-h-[60px] md:text-base lg:text-xl md:leading-relaxed">
                    {displayedText}
                    {!isComplete && (
                      <span className="inline-block w-[3px] h-[1em] bg-white/80 ml-2 align-text-bottom animate-pulse-slow shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                    )}
                  </p>
                </div>
                <AnimatePresence>
                  {isComplete && !line.unskippable && !line.autoAdvance && (
                    <motion.div
                      className="absolute bottom-4 right-5 flex items-center gap-2 text-[10px] font-semibold text-gray-400 tracking-[0.2em] uppercase z-20 md:bottom-6 md:right-8 md:text-xs"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <span>{t('common.continue')}</span>
                      <motion.div
                        animate={{ x: [0, 6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ChevronRight size={16} className="text-gray-300" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div className="absolute inset-0 rounded-xl pointer-events-none border-t border-white/5 z-0" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
