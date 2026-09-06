import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { loadGame, saveGame } from './saveEngine';
import type { SaveData } from '../types';

describe('saveEngine', () => {
  const dummySaveData: SaveData = {
    version: '1.0.0',
    timestamp: 1726000000000,
    screen: 'story',
    progress: {
      currentSceneId: 'CH1_S01',
      currentChapter: 'CH1',
      choices: ['choice_a'],
      visitedSceneIds: ['CH1_S00', 'CH1_S01'],
    },
  };

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('returns null when no saved state exists', async () => {
    const loaded = await loadGame();
    expect(loaded).toBeNull();
  });

  it('saves game data to localStorage and retrieves it accurately', async () => {
    await saveGame(dummySaveData);
    const loaded = await loadGame();
    expect(loaded).toEqual(dummySaveData);
  });

  it('handles corrupted localStorage payload gracefully without throwing', async () => {
    localStorage.setItem('aetheria_save', 'invalid{json-corrupted');
    const loaded = await loadGame();
    expect(loaded).toBeNull();
  });
});
