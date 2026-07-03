export type SceneMode =
  | 'visual_novel'
  | 'cinematic_montage';

export interface DialogueLine {
  id: string;
  speaker: string;
  expression: string;
  text: string;
  textEn?: string; // English translation (if omitted, falls back to `text`)
  audioSrc?: string;
  autoAdvance?: boolean;
  unskippable?: boolean;
  autoAdvanceDelay?: number;
  backgroundOverride?: string;
  bgmOverride?: string;
  characterOverrides?: Record<string, string>;
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
  characters: CharacterInScene[];
  dialogues: DialogueLine[];
  choices?: Choice[];
  nextSceneId?: string;
}
