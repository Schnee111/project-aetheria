import { useCallback, useEffect } from 'react';
import { Howl } from 'howler';
import { useSettingsStore } from '../stores';
import { resolvePublicAssetSrc } from '../utils/assetResolver';

let globalBgm: Howl | null = null;
let currentBgmSrc: string | null = null;
let currentBgmScale: number = 0.5;

export function useBgm() {
  const bgmVolume = useSettingsStore((s) => s.bgmVolume);

  const play = useCallback((src: string) => {
    const resolvedSrc = resolvePublicAssetSrc(src);
    if (currentBgmSrc === resolvedSrc && globalBgm) return; // Already playing this track

    if (globalBgm) {
      globalBgm.fade(globalBgm.volume(), 0, 500);
      const oldBgm = globalBgm;
      setTimeout(() => {
        oldBgm.stop();
        oldBgm.unload();
      }, 500);
    }

    currentBgmSrc = resolvedSrc;
    globalBgm = new Howl({
      src: [resolvedSrc],
      loop: true,
      volume: 0,
    });
    globalBgm.play();
    globalBgm.fade(0, bgmVolume * currentBgmScale, 1000);
  }, [bgmVolume]);

  const stop = useCallback(() => {
    if (globalBgm) {
      globalBgm.fade(globalBgm.volume(), 0, 500);
      const oldBgm = globalBgm;
      setTimeout(() => {
        oldBgm.stop();
        oldBgm.unload();
      }, 500);
      globalBgm = null;
      currentBgmSrc = null;
      currentBgmScale = 0.5;
    }
  }, []);

  const seek = useCallback((seconds: number) => {
    if (globalBgm) {
      globalBgm.seek(seconds);
    }
  }, []);

  const setVolumeScale = useCallback((scale: number, fadeMs: number = 500) => {
    currentBgmScale = scale;
    if (globalBgm) {
      const currentVol = globalBgm.volume() as number;
      const targetVol = bgmVolume * scale;
      if (fadeMs > 0) {
        globalBgm.fade(currentVol, targetVol, fadeMs);
      } else {
        globalBgm.volume(targetVol);
      }
    }
  }, [bgmVolume]);

  useEffect(() => {
    if (globalBgm) {
      globalBgm.volume(bgmVolume * currentBgmScale);
    }
  }, [bgmVolume]);

  return { play, stop, seek, setVolumeScale };
}

export function useSfx() {
  const sfxVolume = useSettingsStore((s) => s.sfxVolume);

  const play = useCallback((src: string) => {
    const sfx = new Howl({
      src: [resolvePublicAssetSrc(src)],
      volume: sfxVolume * 0.5,
      onend: () => sfx.unload(),
    });
    sfx.play();
    return sfx;
  }, [sfxVolume]);

  return { play };
}

let globalVoice: Howl | null = null;

export function useVoice() {
  const voiceVolume = useSettingsStore((s) => s.voiceVolume);
  const voiceEnabled = useSettingsStore((s) => s.voiceEnabled);

  const play = useCallback((src: string, onEnd?: () => void) => {
    if (!voiceEnabled) {
      if (onEnd) setTimeout(onEnd, 100);
      return;
    }
    if (globalVoice) {
      const oldVoice = globalVoice;
      oldVoice.fade(oldVoice.volume(), 0, 100);
      setTimeout(() => oldVoice.unload(), 100);
    }
    globalVoice = new Howl({
      src: [resolvePublicAssetSrc(src)],
      volume: voiceVolume,
      onend: onEnd,
    });
    globalVoice.play();
  }, [voiceVolume, voiceEnabled]);

  const stop = useCallback(() => {
    if (globalVoice) {
      const oldVoice = globalVoice;
      oldVoice.fade(oldVoice.volume(), 0, 100);
      setTimeout(() => oldVoice.unload(), 100);
      globalVoice = null;
    }
  }, []);

  return { play, stop };
}
