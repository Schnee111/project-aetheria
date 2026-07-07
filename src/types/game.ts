import type { Scene } from './scene';

export type Screen =
  | 'landing'
  | 'language_select'
  | 'disclaimer'
  | 'story'
  | 'visual_novel'
  | 'cinematic_montage'
  | 'chapter_complete';

export type PlayerState = Record<string, never>;

export type RelationshipState = Record<string, never>;

export interface GameProgress {
  currentSceneId: string;
  currentChapter: string;
  choices: string[];
  visitedSceneIds: string[];
}




export interface SaveData {
  version: string;
  timestamp: number;
  screen: Screen;
  progress: GameProgress;
}

export interface ChapterData {
  id: string;
  title: string;
  scenes: Scene[];
}

export const DEFAULT_PLAYER_STATE: PlayerState = {};

export const DEFAULT_RELATIONSHIPS: RelationshipState = {};

export const DEFAULT_PROGRESS: GameProgress = {
  currentSceneId: 'CH1_S00',
  currentChapter: 'CH1',
  choices: [],
  visitedSceneIds: [],
};
