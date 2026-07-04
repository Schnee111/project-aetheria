import { useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings } from 'lucide-react';
import {
  LandingScreen,
  StoryScreen,
  SettingsModal,
  ChapterCompleteScreen,
  CinematicMontageScreen,
} from './components/screens';
import { TimelineScrubber } from './components/visual-novel/TimelineScrubber';
import { chapter1 } from './data/chapter-1';
import { advanceScene } from './engines/storyEngine';
import { loadGame, saveGame } from './engines/saveEngine';
import { useGameStore } from './stores/gameStore';
import { useDialogStore } from './stores/dialogStore';
import { useDialog } from './hooks/useDialog';
import { useBgm, useVoice } from './hooks';
import { useSettingsStore } from './stores/settingsStore';
import { useScenePreloader } from './hooks/useScenePreloader';
import type { Screen, Scene } from './types';

const MODE_TO_SCREEN: Record<string, Screen> = {
  story: 'story',
  visual_novel: 'visual_novel',
  cinematic_montage: 'cinematic_montage',
};

function App() {
  const {
    screen,
    setScreen,
    progress,
    setProgress,
    startGame,
  } = useGameStore();

  const [showSettings, setShowSettings] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  // Reset settings modal when screen changes
  useEffect(() => {
    setShowSettings(false);
  }, [screen]);

  const currentScene: Scene | undefined = chapter1.scenes.find(
    (s) => s.id === progress.currentSceneId,
  ) || chapter1.scenes[0];

  // Prefetch assets for the next scene(s) in the background
  useScenePreloader(currentScene ?? null, chapter1, screen === 'visual_novel' || screen === 'story');

  // Memoize dialogues to prevent infinite loop
  const dialogues = useMemo(
    () => ((screen === 'story' || screen === 'visual_novel') ? currentScene?.dialogues ?? [] : []),
    [screen, currentScene]
  );
  const { currentLine, isComplete, handleTap, reset: resetDialog, advanceLine, previousLine, goToLine } = useDialog(dialogues);
  const { stop: stopBgm } = useBgm();
  const { stop: stopVoice } = useVoice();
  const showTimeline = useSettingsStore((s) => s.showTimeline);
  
  // Scene mode navigation helper
  const navigateFromScene = useCallback(
    (scene: Scene | undefined) => {
      if (scene) {
        setScreen(MODE_TO_SCREEN[scene.mode] ?? 'story');
      } else {
        setScreen('chapter_complete');
      }
    },
    [setScreen],
  );

  // Auto-advance when all dialog lines are done (no choices)
  useEffect(() => {
    if (!isComplete || (screen !== 'story' && screen !== 'visual_novel') || !currentScene) return;
    if (currentScene.choices && currentScene.choices.length > 0) return;

    const timer = setTimeout(() => {
      resetDialog();
      const newProgress = advanceScene(chapter1, useGameStore.getState().progress);
      setProgress(newProgress);

      const nextScene = chapter1.scenes.find(
        (s) => s.id === newProgress.currentSceneId,
      );

      navigateFromScene(nextScene);
    }, 0);

    return () => clearTimeout(timer);
  }, [isComplete, screen, currentScene, setProgress, navigateFromScene, setScreen]);

  // Keyboard shortcuts for timeline scrubbing
  useEffect(() => {
    if (screen !== 'visual_novel' && screen !== 'story') return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const state = useDialogStore.getState();
        const target = e.shiftKey ? Math.max(0, state.currentIndex - 5) : state.currentIndex - 1;
        if (target >= 0) {
          goToLine(target);
        } else {
          previousLine();
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const state = useDialogStore.getState();
        const target = e.shiftKey
          ? Math.min(state.dialogQueue.length - 1, state.currentIndex + 5)
          : state.currentIndex + 1;
        if (target < state.dialogQueue.length) {
          goToLine(target);
        } else {
          advanceLine();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screen, goToLine, advanceLine, previousLine]);

  // Immediately continue after selecting a choice
  const handleChoiceSelect = useCallback((choiceId: string) => {
    if (!currentScene) return;

    resetDialog();
    const newProgress = advanceScene(chapter1, progress, choiceId);
    setProgress(newProgress);

    const nextScene = chapter1.scenes.find(
      (s) => s.id === newProgress.currentSceneId,
    );
    navigateFromScene(nextScene);
  }, [currentScene, progress, setProgress, navigateFromScene, resetDialog]);

  // Auto-save everything except the landing screen state
  useEffect(() => {
    if (screen !== 'landing') {
      void saveGame({
        version: '1.0',
        timestamp: Date.now(),
        screen,
        progress,
      });
    }
  }, [screen, progress]);

  // Load game on mount to persist state through refreshes
  useEffect(() => {
    void loadGame().then((data) => {
      if (data) {
        setScreen(data.screen);
        setProgress(data.progress);
      }
      setIsInitializing(false);
    });
  }, [setScreen, setProgress]);

  // ---- Render based on screen ----

  let activeScreenComponent = null;

  if (isInitializing) {
    activeScreenComponent = (
      <div className="absolute inset-0 bg-[#09090B] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#E11D48] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  } else if (screen === 'landing') {
    return (
      <LandingScreen
        hasSave={progress.currentSceneId !== 'CH1_S00'} 
        onStart={() => {
          startGame();
        }}
        onContinue={() => {
          void loadGame().then((data) => {
            if (data && data.screen !== 'landing') {
              setScreen(data.screen);
            } else {
              setScreen('story');
            }
          });
        }}
      />
    );
  } else if (screen === 'chapter_complete') {
    activeScreenComponent = (
      <ChapterCompleteScreen />
    );
  } else if (screen === 'cinematic_montage') {
    // Calculate BGM offset from all scenes before montage
    const montageIdx = chapter1.scenes.findIndex(s => s.id === progress.currentSceneId);
    let bgmOffset = 0;
    for (let i = 0; i < montageIdx; i++) {
      const scene = chapter1.scenes[i];
      if (scene) {
        for (const line of scene.dialogues) {
          if (line.voiceDuration) {
            bgmOffset += 0.150 + line.voiceDuration + (line.postVoiceDelay ?? 1000) / 1000;
          } else if (line.voiceSrc) {
            bgmOffset += 0.150 + (line.autoAdvanceDelay || 1500) / 1000 + (line.postVoiceDelay ?? 1000) / 1000;
          } else {
            bgmOffset += (line.autoAdvanceDelay || 1500) / 1000;
          }
        }
      }
    }
    activeScreenComponent = (
      <CinematicMontageScreen
        scenes={chapter1.scenes}
        currentSceneId={progress.currentSceneId}
        onSceneJump={(sceneId) => {
          setProgress({ ...progress, currentSceneId: sceneId });
          const targetScene = chapter1.scenes.find(s => s.id === sceneId);
          if (targetScene) {
            setScreen(targetScene.mode === 'cinematic_montage' ? 'cinematic_montage' : 'visual_novel');
          }
        }}
        bgmOffset={bgmOffset}
      />
    );
  } else {
    activeScreenComponent = (
      <>
        <StoryScreen
          scene={currentScene!}
          currentLine={currentLine}
          onChoose={handleChoiceSelect}
          onTapDialog={handleTap}
          isDialogComplete={isComplete}
        />
        
        {/* Global Settings Button */}
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 rounded-full bg-[#09090B]/80 hover:bg-[#18181B] border border-[#27272A] hover:border-[#3F3F46] text-[#FAFAFA] transition-colors backdrop-blur-md shadow-lg flex items-center justify-center"
          >
            <Settings size={18} />
          </button>
        </div>

        {/* Screen-specific HUD overlays */}
        <div className="absolute top-4 left-4 z-40 pointer-events-none">
          <div className="text-[10px] px-4 py-2 rounded-full bg-[#09090B]/80 border border-[#27272A] text-[#A1A1AA] backdrop-blur-md font-bold tracking-widest uppercase shadow-lg inline-block">
            {currentScene?.title ?? 'Aetheria'}
          </div>
        </div>
        
        {/* Debug / Testplay Controls */}
        <div className="absolute top-16 left-4 z-50 flex gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); previousLine(); }}
            className="px-3 py-1 bg-black/50 border border-white/20 text-white text-[10px] uppercase font-bold tracking-widest rounded hover:bg-white/20"
          >
            Prev
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); advanceLine(); }}
            className="px-3 py-1 bg-black/50 border border-white/20 text-white text-[10px] uppercase font-bold tracking-widest rounded hover:bg-white/20"
          >
            Next
          </button>
        </div>

        {/* Timeline Scrubber (hidden by default, toggle in Settings) */}
        {showTimeline && (
          <TimelineScrubber
            lines={dialogues}
            onJump={(idx) => goToLine(idx)}
            bgmStartIndex={dialogues.findIndex(l => l.bgmOverride) >= 0 ? dialogues.findIndex(l => l.bgmOverride) : 0}
            scenes={chapter1.scenes}
            currentSceneId={currentScene?.id}
            onSceneJump={(sceneId) => {
              resetDialog();
              setProgress({ ...progress, currentSceneId: sceneId });
              const targetScene = chapter1.scenes.find(s => s.id === sceneId);
              if (targetScene) {
                setScreen(targetScene.mode === 'cinematic_montage' ? 'cinematic_montage' : 'visual_novel');
              }
            }}
          />
        )}
      </>
    );
  }

  return (
    <div className="w-full h-full text-[#FAFAFA] overflow-hidden bg-black font-sans selection:bg-[#E11D48]/30">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {activeScreenComponent}
        </motion.div>
      </AnimatePresence>
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} onGoHome={() => {
        setShowSettings(false);
        stopBgm();
        stopVoice();
        setScreen('landing');
      }} />
    </div>
  );
}

export default App;
