import { create } from 'zustand';
import type { DialogueLine } from '../types';

interface DialogState {
  currentLine: DialogueLine | null;
  isTyping: boolean;
  isComplete: boolean;
  dialogQueue: DialogueLine[];
  currentIndex: number;

  setDialogQueue: (lines: DialogueLine[]) => void;
  setCurrentLine: (line: DialogueLine | null) => void;
  setIsTyping: (isTyping: boolean) => void;
  advanceLine: () => DialogueLine | null;
  previousLine: () => DialogueLine | null;
  skipTypewriter: () => void;
  goToLine: (index: number) => DialogueLine | null;
  reset: () => void;
}

export const useDialogStore = create<DialogState>((set, get) => ({
  currentLine: null,
  isTyping: false,
  isComplete: false,
  dialogQueue: [],
  currentIndex: 0,

  setDialogQueue: (lines) =>
    set({
      dialogQueue: lines,
      currentIndex: 0,
      currentLine: lines[0] ?? null,
      isTyping: true,
      isComplete: false,
    }),

  setCurrentLine: (line) => set({ currentLine: line }),

  setIsTyping: (isTyping) => set({ isTyping }),

  advanceLine: () => {
    const { dialogQueue, currentIndex } = get();
    const nextIndex = currentIndex + 1;
    if (nextIndex >= dialogQueue.length) {
      set({ isComplete: true, isTyping: false });
      return null;
    }
    const nextLine = dialogQueue[nextIndex]!;
    set({
      currentIndex: nextIndex,
      currentLine: nextLine,
      isTyping: true,
      isComplete: false,
    });
    return nextLine;
  },

  previousLine: () => {
    const { dialogQueue, currentIndex } = get();
    const prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      return null; // Cannot go back further
    }
    const prevLine = dialogQueue[prevIndex]!;
    set({
      currentIndex: prevIndex,
      currentLine: prevLine,
      isTyping: true,
      isComplete: false,
    });
    return prevLine;
  },

  skipTypewriter: () => set({ isTyping: false }),

  goToLine: (index) => {
    const { dialogQueue } = get();
    if (index < 0 || index >= dialogQueue.length) return null;
    const line = dialogQueue[index]!;
    set({
      currentIndex: index,
      currentLine: line,
      isTyping: true,
      isComplete: false,
    });
    return line;
  },

  reset: () =>
    set({
      currentLine: null,
      isTyping: false,
      isComplete: false,
      dialogQueue: [],
      currentIndex: 0,
    }),
}));
