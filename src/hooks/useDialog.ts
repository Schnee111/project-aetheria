import { useCallback, useEffect } from 'react';
import { useDialogStore } from '../stores';
import type { DialogueLine } from '../types';

export function useDialog(lines: DialogueLine[], onSceneComplete?: () => void) {
  const {
    currentLine,
    isTyping,
    isComplete,
    setDialogQueue,
    advanceLine,
    previousLine,
    reset,
  } = useDialogStore();

  useEffect(() => {
    if (lines.length > 0) {
      setDialogQueue(lines);
    }
  }, [lines, setDialogQueue]);

  const handleTap = useCallback(() => {
    const state = useDialogStore.getState();
    const isLastLine = state.currentIndex >= state.dialogQueue.length - 1;

    if (isLastLine && onSceneComplete) {
      onSceneComplete();
    } else {
      advanceLine();
    }
  }, [advanceLine, onSceneComplete]);

  return {
    currentLine,
    isTyping,
    isComplete,
    handleTap,
    advanceLine,
    previousLine,
    reset,
  };
}
