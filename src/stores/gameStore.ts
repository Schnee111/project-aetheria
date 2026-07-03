import { create } from 'zustand';
import type { Screen, GameProgress } from '../types';
import { DEFAULT_PROGRESS } from '../types';

interface GameState {
  screen: Screen;
  progress: GameProgress;
  isPlaying: boolean;

  setScreen: (screen: Screen) => void;
  setProgress: (progress: GameProgress) => void;
  updateProgress: (updates: Partial<GameProgress>) => void;
  addChoice: (choiceId: string) => void;
  startGame: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  screen: 'landing',
  progress: { ...DEFAULT_PROGRESS },
  isPlaying: false,

  setScreen: (screen) => set({ screen }),

  setProgress: (progress) => set({ progress }),

  updateProgress: (updates) =>
    set((state) => ({
      progress: { ...state.progress, ...updates },
    })),

  addChoice: (choiceId) =>
    set((state) => {
      if (state.progress.choices.includes(choiceId)) return state;
      return {
        progress: {
          ...state.progress,
          choices: [...state.progress.choices, choiceId],
        },
      };
    }),

  startGame: () =>
    set({
      screen: 'visual_novel',
      progress: { ...DEFAULT_PROGRESS },
      isPlaying: true,
    }),

  resetGame: () =>
    set({
      screen: 'landing',
      progress: { ...DEFAULT_PROGRESS },
      isPlaying: false,
    }),
}));
