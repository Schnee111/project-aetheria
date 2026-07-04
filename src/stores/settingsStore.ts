import { create } from 'zustand';

export type TextSpeed = 'slow' | 'normal' | 'fast';
export type Language = 'en' | 'id';

interface SettingsState {
  textSpeed: TextSpeed;
  bgmVolume: number;
  sfxVolume: number;
  voiceEnabled: boolean;
  voiceVolume: number;
  autoPlay: boolean;
  language: Language;
  showTimeline: boolean;

  setTextSpeed: (speed: TextSpeed) => void;
  setBgmVolume: (volume: number) => void;
  setSfxVolume: (volume: number) => void;
  setVoiceEnabled: (enabled: boolean) => void;
  setVoiceVolume: (volume: number) => void;
  setAutoPlay: (autoPlay: boolean) => void;
  setLanguage: (language: Language) => void;
  setShowTimeline: (show: boolean) => void;
}

export const TEXT_SPEED_MS: Record<TextSpeed, number> = {
  slow: 70,
  normal: 30,
  fast: 15,
};

export const useSettingsStore = create<SettingsState>()((set) => ({
  textSpeed: 'normal',
  bgmVolume: 0.4,
  sfxVolume: 0.6,
  voiceEnabled: true,
  voiceVolume: 1.0,
  autoPlay: false,
  language: 'en',
  showTimeline: false,

  setTextSpeed: (textSpeed) => set({ textSpeed }),
  setBgmVolume: (bgmVolume) => set({ bgmVolume: Math.max(0, Math.min(1, bgmVolume)) }),
  setSfxVolume: (sfxVolume) => set({ sfxVolume: Math.max(0, Math.min(1, sfxVolume)) }),
  setVoiceEnabled: (voiceEnabled) => set({ voiceEnabled }),
  setVoiceVolume: (voiceVolume) => set({ voiceVolume: Math.max(0, Math.min(1, voiceVolume)) }),
  setAutoPlay: (autoPlay) => set({ autoPlay }),
  setLanguage: (language) => set({ language }),
  setShowTimeline: (showTimeline) => set({ showTimeline }),
}));
