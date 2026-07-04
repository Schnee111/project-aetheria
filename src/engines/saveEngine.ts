import type { SaveData } from '../types';

const SAVE_KEY = 'aetheria_save';

export function saveGame(data: SaveData): Promise<void> {
  return new Promise((resolve) => {
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    resolve();
  });
}

export function loadGame(): Promise<SaveData | null> {
  return new Promise((resolve) => {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return resolve(null);
    try {
      const parsed = JSON.parse(raw);
      resolve(parsed);
    } catch {
      resolve(null);
    }
  });
}
