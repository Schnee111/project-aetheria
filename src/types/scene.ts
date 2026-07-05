export type SceneMode =
  | 'visual_novel'
  | 'cinematic_montage';

export interface DialogueLine {
  id: string;
  speaker: string;
  expression: string;
  text: string;
  textEn?: string; // English translation (if omitted, falls back to `text`)
  speakerLabel?: string; // Optional display name override for spoiler-safe character labels.
  speakerLabelEn?: string;
  voiceTextEn?: string; // Optional spoken English override for TTS timing/performance.
  voiceSpeaker?: string; // Optional TTS speaker override for cinematic narration.
  audioSrc?: string;
  voiceSrc?: string;
  autoAdvance?: boolean;
  unskippable?: boolean;
  /** Delay (in ms) to wait before auto-advancing (if autoAdvance is true) */
  autoAdvanceDelay?: number;
  /** Delay (in ms) to wait AFTER the voice finishes before auto-advancing. Defaults to 800ms. */
  postVoiceDelay?: number;
  /** Actual voice file duration in seconds (for accurate timeline/BGM sync) */
  voiceDuration?: number;
  ignoreVoiceDuration?: boolean;
  backgroundOverride?: string;
  bgmOverride?: string;
  characterOverrides?: Record<string, string>;
  hideDialogBox?: boolean;
}

export interface Choice {
  id: string;
  text: string;
  effect: string;
  stateChanges?: Partial<{
    curiosityScore: number;
    cautionScore: number;
    reputation: number;
    credibilityScore: number;
    rumorSpread: number;
    evidenceQuality: number;
  }>;
  tickerDelta?: number;
  nextSceneId?: string;
}

export interface CharacterInScene {
  characterId: string;
  position: 'left' | 'center' | 'right';
  initialExpression: string;
}

export interface Scene {
  id: string;
  chapterId: string;
  title: string;
  titleEn?: string;
  location: string;
  locationEn?: string;
  mode: SceneMode;
  background: string;
  bgm?: string;
  /** Volume scale for BGM (0-1). Default: 1.0. Set lower for voice scenes, higher for montage. */
  bgmVolumeScale?: number;
  characters: CharacterInScene[];
  dialogues: DialogueLine[];
  choices?: Choice[];
  nextSceneId?: string;
}
