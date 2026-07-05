import { useCallback, useRef, useEffect, useState, useMemo } from 'react';
import { useDialogStore } from '../../stores';
import { useBgm } from '../../hooks';
import type { DialogueLine, Scene } from '../../types';

const SPEAKER_COLORS: Record<string, string> = {
  aeterna: '#3B82F6',
  lysthea: '#A78BFA',
  narrator: '#FBBF24',
  system: '#6B7280',
  abyssal_assassin: '#EF4444',
};

const VOICE_START_MS = 150;
const DEFAULT_POST_VOICE_MS = 1000;

interface TimelineScrubberProps {
  lines: DialogueLine[];
  onJump: (index: number) => void;
  bgmStartIndex?: number;
  // Scene navigation
  scenes?: Scene[];
  currentSceneId?: string;
  onSceneJump?: (sceneId: string) => void;
}

function estimateLineDuration(line: DialogueLine): number {
  // Use actual voice duration if available
  if (line.voiceDuration) {
    const postVoice = line.postVoiceDelay ?? DEFAULT_POST_VOICE_MS;
    return (VOICE_START_MS / 1000) + line.voiceDuration + (postVoice / 1000);
  }
  const delay = line.autoAdvanceDelay || 1500;
  return delay / 1000;
}

export function TimelineScrubber({
  lines, onJump, bgmStartIndex = 0,
  scenes = [], currentSceneId, onSceneJump,
}: TimelineScrubberProps) {
  const { currentIndex } = useDialogStore();
  const { seek } = useBgm();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [showSceneList, setShowSceneList] = useState(false);

  const totalLines = lines.length;
  const progress = totalLines > 1 ? currentIndex / (totalLines - 1) : 0;

  const cumulativeTimes = useMemo(() => {
    const times: number[] = [0];
    for (let i = 1; i < lines.length; i++) {
      const prev = lines[i - 1];
      const previousTime = times[i - 1] ?? 0;
      times.push(previousTime + (prev ? estimateLineDuration(prev) : 1.5));
    }
    return times;
  }, [lines]);

  const bgmElapsedAtLine = useMemo(() => {
    const bgmStartTime = cumulativeTimes[bgmStartIndex] || 0;
    return cumulativeTimes.map(t => Math.max(0, t - bgmStartTime));
  }, [cumulativeTimes, bgmStartIndex]);

  const currentElapsed = (currentIndex < bgmElapsedAtLine.length ? bgmElapsedAtLine[currentIndex] : 0) || 0;

  const getIndexFromEvent = useCallback((e: React.MouseEvent | MouseEvent) => {
    const track = trackRef.current;
    if (!track) return 0;
    const rect = track.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    return Math.round((x / rect.width) * (totalLines - 1));
  }, [totalLines]);

  const handleJump = useCallback((index: number) => {
    onJump(index);
    const bgmTime = bgmElapsedAtLine[index];
    if (bgmTime !== undefined && bgmTime >= 0) {
      seek(bgmTime);
    }
  }, [onJump, bgmElapsedAtLine, seek]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    handleJump(getIndexFromEvent(e));
  }, [getIndexFromEvent, handleJump]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    handleJump(getIndexFromEvent(e));
  }, [isDragging, getIndexFromEvent, handleJump]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Handle scene jump with BGM seek
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
      seek(offset);
    }
  }, [onSceneJump, scenes, seek]);

  const currentLine = currentIndex < lines.length ? lines[currentIndex] : undefined;
  const speaker = currentLine?.speaker || currentLine?.voiceSpeaker || 'narrator';
  const lineId = currentLine?.id || '—';

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const currentSceneIndex = scenes.findIndex(s => s.id === currentSceneId);

  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 pointer-events-auto">
      {/* Scene selector dropdown */}
      {showSceneList && scenes.length > 0 && (
        <div className="absolute bottom-full left-0 right-0 mb-1 mx-2 bg-black/90 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden max-h-64 overflow-y-auto">
          {scenes.map((scene) => (
            <button
              key={scene.id}
              onClick={() => {
                handleSceneJump(scene.id);
                setShowSceneList(false);
              }}
              className={`w-full text-left px-3 py-1.5 text-[10px] tracking-wider border-b border-white/5 hover:bg-white/10 transition-colors flex items-center justify-between ${
                scene.id === currentSceneId ? 'bg-white/5 text-white' : 'text-gray-400'
              }`}
            >
              <span className="font-bold uppercase">
                {scene.id}
                <span className="ml-2 text-gray-500 normal-case">{scene.title || scene.titleEn}</span>
              </span>
              <span className="text-[9px] text-gray-600">{scene.mode}</span>
            </button>
          ))}
        </div>
      )}

      {/* Info bar */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-black/70 backdrop-blur-sm border-t border-white/5">
        <div className="flex items-center gap-3">
          {/* Scene nav */}
          {scenes.length > 0 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  const previousScene = scenes[currentSceneIndex - 1];
                  if (previousScene) handleSceneJump(previousScene.id);
                }}
                disabled={currentSceneIndex <= 0}
                className="text-[10px] text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ◀
              </button>
              <button
                onClick={() => setShowSceneList(!showSceneList)}
                className="text-[10px] font-bold tracking-widest text-emerald-400 hover:text-emerald-300 uppercase px-1"
              >
                {currentSceneId || '—'}
              </button>
              <button
                onClick={() => {
                  const nextScene = scenes[currentSceneIndex + 1];
                  if (nextScene) handleSceneJump(nextScene.id);
                }}
                disabled={currentSceneIndex >= scenes.length - 1}
                className="text-[10px] text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ▶
              </button>
            </div>
          )}

          <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            {currentIndex + 1}/{totalLines}
          </span>
          <span className="text-[10px] font-mono text-cyan-400 tracking-wider">
            {formatTime(currentElapsed)}
          </span>
          <span className="text-[10px] font-bold tracking-wider text-gray-300">
            {lineId}
          </span>
          <span
            className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded"
            style={{
              color: SPEAKER_COLORS[speaker] || '#9CA3AF',
              backgroundColor: `${SPEAKER_COLORS[speaker] || '#9CA3AF'}15`,
            }}
          >
            {speaker}
          </span>
        </div>
        {hoverIndex !== null && hoverIndex !== currentIndex && (
          <span className="text-[9px] text-gray-500 tracking-wider">
            → {lines[hoverIndex]?.id || ''} @ {formatTime((hoverIndex !== null && hoverIndex < bgmElapsedAtLine.length ? bgmElapsedAtLine[hoverIndex] : 0) || 0)}
          </span>
        )}
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-7 bg-black/80 backdrop-blur-sm cursor-pointer select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={(e) => {
          if (!isDragging) {
            setHoverIndex(getIndexFromEvent(e));
          }
        }}
        onMouseLeave={() => setHoverIndex(null)}
      >
        {lines.map((line, i) => {
          const lineSpeaker = line.speaker || line.voiceSpeaker || 'narrator';
          const color = SPEAKER_COLORS[lineSpeaker] || '#9CA3AF';
          const x = totalLines > 1 ? (i / (totalLines - 1)) * 100 : 0;
          const isActive = i === currentIndex;
          const isHovered = i === hoverIndex;
          const isBgmStart = i === bgmStartIndex;

          return (
            <div
              key={line.id || i}
              className="absolute top-0 bottom-0 flex items-center"
              style={{ left: `${x}%`, transform: 'translateX(-50%)' }}
            >
              <div
                className="rounded-full transition-all duration-75"
                style={{
                  width: isActive ? 4 : isBgmStart ? 3 : isHovered ? 3 : 2,
                  height: isActive ? '100%' : isHovered || isBgmStart ? '70%' : '50%',
                  backgroundColor: isActive ? '#FAFAFA' : isBgmStart ? '#22D3EE' : color,
                  opacity: isActive ? 1 : isHovered ? 0.8 : 0.4,
                  boxShadow: isActive ? `0 0 6px ${color}` : isBgmStart ? '0 0 6px #22D3EE' : 'none',
                }}
              />
            </div>
          );
        })}

        <div
          className="absolute top-0 bottom-0 left-0 bg-white/5 pointer-events-none"
          style={{ width: `${progress * 100}%` }}
        />

        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none"
          style={{
            left: `${progress * 100}%`,
            boxShadow: '0 0 8px rgba(255,255,255,0.5)',
          }}
        />
      </div>
    </div>
  );
}
