import { describe, expect, it } from 'vitest';
import { advanceScene } from './storyEngine';
import type { ChapterData, GameProgress } from '../types';

describe('storyEngine', () => {
  const dummyChapter: ChapterData = {
    id: 'CH01',
    title: 'Echoes of Aetheria',
    scenes: [
      {
        id: 'CH01_S01',
        chapterId: 'CH01',
        title: 'Morning in the Workshop',
        location: 'Workshop',
        mode: 'visual_novel',
        background: 'ch1/bg_workshop',
        characters: [],
        dialogues: [
          { id: 'd1', speaker: 'narrator', expression: 'neutral', text: 'Dawn breaks.' },
        ],
        nextSceneId: 'CH01_S02',
      },
      {
        id: 'CH01_S02',
        chapterId: 'CH01',
        title: 'The Crossroads',
        location: 'Crossroads',
        mode: 'visual_novel',
        background: 'ch1/bg_crossroads',
        characters: [],
        dialogues: [
          { id: 'd2', speaker: 'narrator', expression: 'neutral', text: 'Choose your path.' },
        ],
        choices: [
          { id: 'choice_market', text: 'Go to Market', effect: 'Explore town', nextSceneId: 'CH01_S03' },
          { id: 'choice_library', text: 'Go to Library', effect: 'Read tomes', nextSceneId: 'CH01_S04' },
        ],
      },
      {
        id: 'CH01_S03',
        chapterId: 'CH01',
        title: 'Bustling Market',
        location: 'Market',
        mode: 'visual_novel',
        background: 'ch1/bg_market',
        characters: [],
        dialogues: [
          { id: 'd3', speaker: 'narrator', expression: 'neutral', text: 'Voices echo.' },
        ],
      },
      {
        id: 'CH01_S04',
        chapterId: 'CH01',
        title: 'Grand Library',
        location: 'Library',
        mode: 'visual_novel',
        background: 'ch1/bg_library',
        characters: [],
        dialogues: [
          { id: 'd4', speaker: 'narrator', expression: 'neutral', text: 'Quiet dust.' },
        ],
      },
    ],
  };

  const initialProgress: GameProgress = {
    currentSceneId: 'CH01_S01',
    currentChapter: 'CH01',
    choices: [],
    visitedSceneIds: [],
  };

  it('advances linear scenes and tracks visited history', () => {
    const updated = advanceScene(dummyChapter, initialProgress);
    expect(updated.currentSceneId).toBe('CH01_S02');
    expect(updated.visitedSceneIds).toContain('CH01_S01');
  });

  it('does not duplicate visited scene IDs if revisited', () => {
    const progressWithVisited: GameProgress = {
      ...initialProgress,
      visitedSceneIds: ['CH01_S01'],
    };
    const updated = advanceScene(dummyChapter, progressWithVisited);
    expect(updated.visitedSceneIds.filter((id) => id === 'CH01_S01').length).toBe(1);
  });

  it('navigates to branching scene based on choiceId', () => {
    const atCrossroads: GameProgress = {
      ...initialProgress,
      currentSceneId: 'CH01_S02',
      visitedSceneIds: ['CH01_S01'],
    };

    const choseMarket = advanceScene(dummyChapter, atCrossroads, 'choice_market');
    expect(choseMarket.currentSceneId).toBe('CH01_S03');
    expect(choseMarket.visitedSceneIds).toContain('CH01_S02');

    const choseLibrary = advanceScene(dummyChapter, atCrossroads, 'choice_library');
    expect(choseLibrary.currentSceneId).toBe('CH01_S04');
  });

  it('returns current progress unmodified if scene is not found in chapter', () => {
    const unknownProgress: GameProgress = {
      ...initialProgress,
      currentSceneId: 'UNKNOWN_SCENE',
    };
    const result = advanceScene(dummyChapter, unknownProgress);
    expect(result).toEqual(unknownProgress);
  });
});
