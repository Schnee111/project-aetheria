import { useCallback, useEffect, useRef } from 'react';
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

  const advanceRef = useRef(advanceLine);
  advanceRef.current = advanceLine;

  useEffect(() => {
    if (lines.length > 0) {
      setDialogQueue(lines);
    }
    return () => reset();
  }, [lines, setDialogQueue, reset]);

  // Auto-advance for lines with autoAdvance flag
  // This runs at the hook level so it survives DialogBox unmount/remount
  const typewriterCompleteRef = useRef(false);

  const handleTypewriterComplete = useCallback(() => {
    typewriterCompleteRef.current = true;
  }, []);

  useEffect(() => {
    if (!currentLine?.autoAdvance) return;
    if (!typewriterCompleteRef.current) return;

    const delay = currentLine.autoAdvanceDelay || 1500;
    const timer = setTimeout(() => {
      typewriterCompleteRef.current = false;
      advanceRef.current();
    }, delay);

    return () => clearTimeout(timer);
  }, [currentLine, typewriterCompleteRef.current]);

  const handleTap = useCallback(() => {
    advanceLine();
  }, [advanceLine]);

  return {
    currentLine,
    isTyping,
    isComplete,
    handleTap,
    handleTypewriterComplete,
    advanceLine,
    previousLine,
    reset,
  };
}
