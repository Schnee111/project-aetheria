import { useRef, useCallback, useEffect } from 'react';
import { Howl } from 'howler';
import { useSettingsStore } from '../stores';

let globalBgm: Howl | null = null;
let currentBgmSrc: string | null = null;

export function useBgm() {
  const bgmVolume = useSettingsStore((s) => s.bgmVolume);

  const play = useCallback((src: string) => {
    if (currentBgmSrc === src && globalBgm) return; // Already playing this track

    if (globalBgm) {
      globalBgm.fade(globalBgm.volume(), 0, 500);
      const oldBgm = globalBgm;
      setTimeout(() => oldBgm.stop(), 500);
    }
    
    currentBgmSrc = src;
    globalBgm = new Howl({
      src: [src],
      loop: true,
      volume: 0,
    });
    globalBgm.play();
    globalBgm.fade(0, bgmVolume, 1000);
  }, [bgmVolume]);

  const stop = useCallback(() => {
    if (globalBgm) {
      globalBgm.fade(globalBgm.volume(), 0, 500);
      const oldBgm = globalBgm;
      setTimeout(() => {
        oldBgm.stop();
      }, 500);
      globalBgm = null;
      currentBgmSrc = null;
    }
  }, []);

  useEffect(() => {
    if (globalBgm) {
      globalBgm.volume(bgmVolume);
    }
  }, [bgmVolume]);

  return { play, stop };
}

export function useSfx() {
  const sfxVolume = useSettingsStore((s) => s.sfxVolume);

  const play = useCallback((src: string) => {
    const sfx = new Howl({ src: [src], volume: sfxVolume });
    sfx.play();
    return sfx;
  }, [sfxVolume]);

  return { play };
}

export function useVoice() {
  const voiceRef = useRef<Howl | null>(null);
  const sfxVolume = useSettingsStore((s) => s.sfxVolume); // voice tied to sfx volume or specific voice volume

  const play = useCallback((src: string) => {
    if (voiceRef.current) {
      voiceRef.current.stop();
    }
    voiceRef.current = new Howl({
      src: [src],
      volume: sfxVolume,
    });
    voiceRef.current.play();
  }, [sfxVolume]);

  const stop = useCallback(() => {
    if (voiceRef.current) {
      voiceRef.current.stop();
      voiceRef.current = null;
    }
  }, []);

  return { play, stop };
}
