import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { useBgm } from '../../hooks';
import { useSettingsStore } from '../../stores/settingsStore';
import { MontageRegistry } from '../../data/montages';
import { chapter1 } from '../../data/chapter-1';
import type { Scene } from '../../types';
import { getPreloadProfile, schedulePreloadAssets } from '../../hooks/useScenePreloader';
import { resolvePublicAssetSrc } from '../../utils/assetResolver';

interface MontageScrubberProps {
  scenes?: Scene[];
  currentSceneId?: string;
  onSceneJump?: (sceneId: string) => void;
  bgmOffset?: number; // seconds elapsed before montage starts
}

export function CinematicMontageScreen({ scenes = [], currentSceneId, onSceneJump, bgmOffset = 0 }: MontageScrubberProps) {
  const { setScreen, progress, setProgress } = useGameStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentYear, setCurrentYear] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const targetYearRef = useRef(0);
  const scrubberRef = useRef<HTMLDivElement>(null);

  const currentMontageId = progress.currentSceneId;
  const MONTAGE_SEQUENCE = useMemo(
    () => MontageRegistry[currentMontageId] ?? [],
    [currentMontageId],
  );
  
  // Find next scene id
  const currentSceneData = chapter1.scenes.find(s => s.id === currentMontageId);
  const nextSceneId = currentSceneData?.nextSceneId || 'CH1_END';


  const frame = MONTAGE_SEQUENCE[currentIndex];
  const frameSrc = frame && frame.src !== 'black' ? resolvePublicAssetSrc(frame.src) : frame?.src;

  useEffect(() => {
    const preloadProfile = getPreloadProfile();
    const assets = MONTAGE_SEQUENCE
      .slice(0, preloadProfile.montageInitialFrames)
      .filter((montageFrame) => montageFrame.src !== 'black')
      .map((montageFrame) => resolvePublicAssetSrc(montageFrame.src));
    schedulePreloadAssets(assets, preloadProfile.staggerMs);
  }, [MONTAGE_SEQUENCE]);

  useEffect(() => {
    const preloadProfile = getPreloadProfile();
    const assets = MONTAGE_SEQUENCE
      .slice(currentIndex + 1, currentIndex + preloadProfile.montageAheadFrames + 1)
      .filter((montageFrame) => montageFrame.src !== 'black')
      .map((montageFrame) => resolvePublicAssetSrc(montageFrame.src));
    schedulePreloadAssets(assets, preloadProfile.staggerMs);
  }, [MONTAGE_SEQUENCE, currentIndex]);

  // Handle advancing frames
  useEffect(() => {
    if (isPaused) return;
    if (currentIndex >= MONTAGE_SEQUENCE.length) {
      const endTimer = setTimeout(() => {
        setProgress({ ...progress, currentSceneId: nextSceneId });
        if (nextSceneId === 'CHAPTER_END' || nextSceneId === 'CH1_END') {
          setScreen('chapter_complete');
        } else {
          setScreen('visual_novel');
        }
      }, 1000); // Wait 1s on black screen before transitioning
      return () => clearTimeout(endTimer);
    }
    
    const currentFrame = MONTAGE_SEQUENCE[currentIndex];
    if (!currentFrame) return;
    const durationMs = (currentFrame.fadeIn + currentFrame.hold) * 1000;
    
    const timer = setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, durationMs);
    
    return () => clearTimeout(timer);
  }, [MONTAGE_SEQUENCE, currentIndex, setScreen, setProgress, progress, isPaused, nextSceneId]);

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
  const totalFrames = MONTAGE_SEQUENCE.length;

  // BGM seek on jump
  const { seek: seekBgm, setVolumeScale } = useBgm();

  // Apply montage scene BGM volume scale (smooth transition)
  useEffect(() => {
    const scale = currentSceneData?.bgmVolumeScale ?? 1.0;
    setVolumeScale(scale, 3500); // 3.5s smooth fade into montage
  }, [currentSceneData?.bgmVolumeScale, setVolumeScale]);

  // Cumulative times for scrubber
  const cumulativeTimes = useMemo(() => {
    const times: number[] = [0];
    for (let i = 1; i < MONTAGE_SEQUENCE.length; i++) {
      const prev = MONTAGE_SEQUENCE[i - 1];
      const previousTime = times[i - 1] ?? 0;
      times.push(previousTime + (prev ? prev.fadeIn + prev.hold : 0));
    }
    return times;
  }, [MONTAGE_SEQUENCE]);

  const lastFrame = MONTAGE_SEQUENCE[MONTAGE_SEQUENCE.length - 1];
  const totalDuration = cumulativeTimes.length > 0
    ? (cumulativeTimes[cumulativeTimes.length - 1] ?? 0) + (lastFrame ? lastFrame.fadeIn + lastFrame.hold : 0)
    : 0;

  const handleFrameJump = useCallback((index: number) => {
    if (index < 0 || index >= totalFrames) return;
    setCurrentIndex(index);
    setCurrentYear(0);
    targetYearRef.current = 0;
    // Seek BGM: offset from previous scenes + montage elapsed
    const montageElapsed = cumulativeTimes[index] || 0;
    seekBgm(bgmOffset + montageElapsed);
  }, [totalFrames, cumulativeTimes, seekBgm, bgmOffset]);

  const handleSceneJump = useCallback((sceneId: string) => {
    onSceneJump?.(sceneId);
    // Seek BGM to the start of the target scene
    if (scenes.length > 0) {
      const targetIdx = scenes.findIndex(s => s.id === sceneId);
      let offset = 0;
      for (let i = 0; i < targetIdx; i++) {
        const scene = scenes[i];
        if (scene) {
          for (const line of scene.dialogues) {
            if (line.voiceDuration) {
              offset += 0.150 + line.voiceDuration + (line.postVoiceDelay ?? 1000) / 1000;
            } else if (line.voiceSrc) {
              offset += 0.150 + (line.autoAdvanceDelay || 1500) / 1000 + (line.postVoiceDelay ?? 1000) / 1000;
            } else {
              offset += (line.autoAdvanceDelay || 1500) / 1000;
            }
          }
        }
      }
      seekBgm(offset);
    }
  }, [onSceneJump, scenes, seekBgm]);

  const handleScrubberClick = useCallback((e: React.MouseEvent) => {
    const track = scrubberRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const idx = Math.round((x / rect.width) * (totalFrames - 1));
    handleFrameJump(idx);
    setIsPaused(true);
  }, [totalFrames, handleFrameJump]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="absolute inset-0 bg-black overflow-hidden pointer-events-none select-none">
      
      <AnimatePresence mode="popLayout">
        {!isComplete && frame && frameSrc && frameSrc !== 'black' && (
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
              style={{ backgroundImage: `url('${frameSrc}')` }}
            />
            {/* Slow scale effect (Ken Burns) */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center origin-center"
              style={{ backgroundImage: `url('${frameSrc}')` }}
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
            initial={{ opacity: 0, x: frame.earthYear ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className={`absolute bottom-12 z-50 ${frame.earthYear ? 'right-12' : 'left-12'}`}
          >
            <div className={frame.earthYear ? "text-right" : "text-left"}>
              {frame.earthYear ? (
                <motion.div
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

      {/* Montage Timeline Scrubber (hidden by default) */}
      {useSettingsStore.getState().showTimeline && (
        <div className="absolute bottom-0 left-0 right-0 z-50 pointer-events-auto">
        {/* Info bar */}
        <div className="flex items-center justify-between px-4 py-1 bg-black/70 backdrop-blur-sm border-t border-white/5">
        <div className="flex items-center gap-3">
          {/* Scene nav */}
          {scenes.length > 0 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  const idx = scenes.findIndex(s => s.id === currentSceneId);
                  const previousScene = scenes[idx - 1];
                  if (previousScene) handleSceneJump(previousScene.id);
                }}
                className="text-[10px] text-gray-400 hover:text-white"
              >
                ◀
              </button>
              <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase px-1">
                {currentSceneId || '—'}
              </span>
              <button
                onClick={() => {
                  const idx = scenes.findIndex(s => s.id === currentSceneId);
                  const nextScene = scenes[idx + 1];
                  if (nextScene) handleSceneJump(nextScene.id);
                }}
                className="text-[10px] text-gray-400 hover:text-white"
              >
                ▶
              </button>
            </div>
          )}

          <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            FRAME {currentIndex + 1}/{totalFrames}
          </span>
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider">
              {formatTime(bgmOffset + (cumulativeTimes[currentIndex] || 0))} / {formatTime(bgmOffset + totalDuration)}
            </span>
            {frame?.yearText !== undefined && !frame?.hideYear && (
              <span className="text-[10px] font-bold text-amber-400 tracking-wider">
                YEAR {String(currentYear).padStart(4, '0')}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isPaused && (
              <button
                onClick={() => setIsPaused(false)}
                className="text-[9px] font-bold text-green-400 tracking-wider uppercase hover:text-green-300"
              >
                ▶ RESUME
              </button>
            )}
          </div>
        </div>

        {/* Track */}
        <div
          ref={scrubberRef}
          className="relative h-6 bg-black/80 backdrop-blur-sm cursor-pointer select-none"
          onClick={handleScrubberClick}
        >
          {/* Frame markers */}
          {MONTAGE_SEQUENCE.map((f, i) => {
            const x = totalFrames > 1 ? (i / (totalFrames - 1)) * 100 : 0;
            const isActive = i === currentIndex;
            const isTruck = f.id === '33';

            return (
              <div
                key={f.id}
                className="absolute top-0 bottom-0 flex items-center"
                style={{ left: `${x}%`, transform: 'translateX(-50%)' }}
              >
                <div
                  className="rounded-full transition-all duration-75"
                  style={{
                    width: isActive ? 4 : isTruck ? 3 : 2,
                    height: isActive ? '100%' : isTruck ? '80%' : '50%',
                    backgroundColor: isActive ? '#FAFAFA' : isTruck ? '#EF4444' : '#6B7280',
                    opacity: isActive ? 1 : 0.5,
                    boxShadow: isActive ? '0 0 6px white' : isTruck ? '0 0 4px #EF4444' : 'none',
                  }}
                />
              </div>
            );
          })}

          {/* Progress */}
          <div
            className="absolute top-0 bottom-0 left-0 bg-white/5 pointer-events-none"
            style={{ width: `${totalFrames > 1 ? (currentIndex / (totalFrames - 1)) * 100 : 0}%` }}
          />

          {/* Playhead */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none"
            style={{
              left: `${totalFrames > 1 ? (currentIndex / (totalFrames - 1)) * 100 : 0}%`,
              boxShadow: '0 0 8px rgba(255,255,255,0.5)',
            }}
          />
        </div>
      </div>
      )}

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
