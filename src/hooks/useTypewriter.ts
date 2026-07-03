import { useState, useEffect, useRef, useCallback } from 'react';
import { TEXT_SPEED_MS, useSettingsStore } from '../stores';

export function useTypewriter(text: string, onComplete?: () => void, instant = false, forceSpeed?: 'slow' | 'normal' | 'fast') {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const textSpeed = useSettingsStore((s) => s.textSpeed);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const indexRef = useRef(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const skip = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayedText(text);
    setIsComplete(true);
    onCompleteRef.current?.();
  }, [text]);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    indexRef.current = 0;

    // Instant mode: show full text immediately
    if (instant) {
      setDisplayedText(text);
      setIsComplete(true);
      onCompleteRef.current?.();
      return;
    }

    const speed = forceSpeed ? TEXT_SPEED_MS[forceSpeed] : TEXT_SPEED_MS[textSpeed];
    const initialDelay = 150;

    const timeout = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        indexRef.current++;
        if (indexRef.current >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setDisplayedText(text);
          setIsComplete(true);
          onCompleteRef.current?.();
        } else {
          setDisplayedText(text.slice(0, indexRef.current));
        }
      }, speed);
    }, initialDelay);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, textSpeed, instant, forceSpeed]);

  return { displayedText, isComplete, skip };
}
