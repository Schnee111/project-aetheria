export type SceneMode =
  | 'visual_novel'
  | 'phone'
  | 'hub'
  | 'board'
  | 'inspection'
  | 'decision'
  | 'reflection'
  | 'confrontation'
  | 'cinematic'
  | 'exploration';

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

export interface ConditionalNext {
  condition: string;
  requiredInsightIds?: string[];
  requiredChoices?: string[];
  nextSceneId: string;
}

export interface ExplorationOptions {
  characterId: string;
  talkSceneId: string;
  interrogationScenes?: {
    soft: string;
    hard: string;
    psychological?: string;
  };
  investigationSceneId?: string;
  presentEvidenceRoutes?: Record<string, string>;
  defaultPresentSceneId?: string;
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
  unlockEvidenceIds: string[];
  unlockLocationIds?: string[];
  nextSceneId?: string;
  conditionalNext?: ConditionalNext[];
  exploration?: ExplorationOptions;
}
