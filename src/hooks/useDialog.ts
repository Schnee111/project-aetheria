import { useCallback, useEffect } from 'react';
import { useDialogStore } from '../stores';
import type { DialogueLine } from '../types';

export function useDialog(lines: DialogueLine[]) {
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
    return () => reset();
  }, [lines, setDialogQueue, reset]);

  const handleTap = useCallback(() => {
    advanceLine();
  }, [advanceLine]);

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
