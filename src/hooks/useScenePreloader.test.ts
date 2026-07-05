import { afterEach, describe, expect, it } from 'vitest';
import { getPreloadProfile } from './useScenePreloader';

function setConnection(connection: { effectiveType?: string; saveData?: boolean } | undefined): void {
  Object.defineProperty(window.navigator, 'connection', {
    configurable: true,
    value: connection,
  });
}

describe('getPreloadProfile', () => {
  afterEach(() => {
    setConnection(undefined);
  });

  it('uses the full preload window on normal connections', () => {
    setConnection({ effectiveType: '4g', saveData: false });

    expect(getPreloadProfile()).toEqual({
      dialogueAhead: 5,
      nextSceneLineCount: 5,
      montageInitialFrames: 5,
      montageAheadFrames: 3,
      staggerMs: 35,
    });
  });

  it('uses a lighter profile when save-data is enabled', () => {
    setConnection({ effectiveType: '4g', saveData: true });

    expect(getPreloadProfile()).toEqual({
      dialogueAhead: 2,
      nextSceneLineCount: 2,
      montageInitialFrames: 3,
      montageAheadFrames: 1,
      staggerMs: 90,
    });
  });

  it('uses a lighter profile on 2g connections', () => {
    setConnection({ effectiveType: '2g', saveData: false });

    expect(getPreloadProfile().dialogueAhead).toBe(2);
    expect(getPreloadProfile().montageAheadFrames).toBe(1);
  });
});
