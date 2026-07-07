import { useEffect } from 'react';
import { preloadHowlAudio } from './useAudio';
import type { ChapterData, DialogueLine, Scene } from '../types';
import { useDialogStore } from '../stores/dialogStore';
import {
  isImageAsset,
  isVideoAsset,
  resolveBackgroundSrc,
  resolveCharacterSrc,
  resolvePublicAssetSrc,
} from '../utils/assetResolver';

const DIALOGUE_PRELOAD_AHEAD = 5;
const NEXT_SCENE_PRELOAD_COUNT = 5;
const LOW_DATA_DIALOGUE_PRELOAD_AHEAD = 2;
const LOW_DATA_NEXT_SCENE_PRELOAD_COUNT = 2;
const LOW_DATA_EFFECTIVE_TYPES = new Set(['slow-2g', '2g']);

const preloadedAssets = new Set<string>();
const warnedAssets = new Set<string>();

interface NetworkInformationLike {
  effectiveType?: string;
  saveData?: boolean;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformationLike;
}

export interface PreloadProfile {
  dialogueAhead: number;
  nextSceneLineCount: number;
  montageInitialFrames: number;
  montageAheadFrames: number;
  staggerMs: number;
}

export function getPreloadProfile(): PreloadProfile {
  if (typeof navigator === 'undefined') {
    return {
      dialogueAhead: DIALOGUE_PRELOAD_AHEAD,
      nextSceneLineCount: NEXT_SCENE_PRELOAD_COUNT,
      montageInitialFrames: 5,
      montageAheadFrames: 3,
      staggerMs: 35,
    };
  }

  const connection = (navigator as NavigatorWithConnection).connection;
  const isLowData =
    connection?.saveData === true ||
    (connection?.effectiveType ? LOW_DATA_EFFECTIVE_TYPES.has(connection.effectiveType) : false);

  if (isLowData) {
    return {
      dialogueAhead: LOW_DATA_DIALOGUE_PRELOAD_AHEAD,
      nextSceneLineCount: LOW_DATA_NEXT_SCENE_PRELOAD_COUNT,
      montageInitialFrames: 3,
      montageAheadFrames: 1,
      staggerMs: 90,
    };
  }

  return {
    dialogueAhead: DIALOGUE_PRELOAD_AHEAD,
    nextSceneLineCount: NEXT_SCENE_PRELOAD_COUNT,
    montageInitialFrames: 5,
    montageAheadFrames: 3,
    staggerMs: 35,
  };
}

function warnPreloadFailure(src: string, error?: unknown): void {
  if (!import.meta.env.DEV || warnedAssets.has(src)) return;
  warnedAssets.add(src);
  console.warn('[preload] failed', src, error);
}

function rememberPreload(src: string, preload: () => Promise<void>): void {
  if (!src || preloadedAssets.has(src)) return;
  preloadedAssets.add(src);
  preload().catch((error) => warnPreloadFailure(src, error));
}

function preloadImage(src: string): void {
  rememberPreload(src, () => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  }));
}

function preloadAudio(src: string): void {
  rememberPreload(src, () => preloadHowlAudio(src));
}

function preloadVideo(src: string): void {
  rememberPreload(src, () => new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    video.playsInline = true;
    video.oncanplaythrough = () => resolve();
    video.onerror = reject;
    video.src = src;
    video.load();
  }));
}

export function preloadAsset(src: string): void {
  if (isVideoAsset(src)) {
    preloadVideo(src);
  } else if (isImageAsset(src)) {
    preloadImage(src);
  } else {
    preloadAudio(src);
  }
}

export function schedulePreloadAssets(assets: Iterable<string>, staggerMs = getPreloadProfile().staggerMs): void {
  Array.from(assets).forEach((src, index) => {
    if (index === 0) {
      preloadAsset(src);
      return;
    }
    globalThis.setTimeout(() => preloadAsset(src), index * staggerMs);
  });
}

function collectLineAssets(line: DialogueLine, scene: Scene, assets: Set<string>): void {
  if (line.backgroundOverride) {
    assets.add(resolveBackgroundSrc(line.backgroundOverride));
  }

  if (line.voiceSrc) {
    assets.add(resolvePublicAssetSrc(line.voiceSrc));
  }

  if (line.audioSrc) {
    assets.add(resolvePublicAssetSrc(line.audioSrc));
  }

  if (line.bgmOverride) {
    assets.add(resolvePublicAssetSrc(line.bgmOverride));
  }

  if (line.speaker && line.speaker !== 'narrator' && line.speaker !== 'system') {
    assets.add(resolveCharacterSrc(line.speaker, line.expression));
  }

  if (line.characterOverrides) {
    for (const [characterId, expression] of Object.entries(line.characterOverrides)) {
      if (expression !== 'leave' && expression !== 'none' && expression !== 'exit') {
        assets.add(resolveCharacterSrc(characterId, expression));
      }
    }
  }

  for (const character of scene.characters) {
    if (character.initialExpression !== 'leave' && character.initialExpression !== 'none' && character.initialExpression !== 'exit') {
      assets.add(resolveCharacterSrc(character.characterId, character.initialExpression));
    }
  }
}

function collectSceneLeadAssets(scene: Scene, assets: Set<string>, lineCount: number): void {
  assets.add(resolveBackgroundSrc(scene.background));

  if (scene.bgm) {
    assets.add(resolvePublicAssetSrc(scene.bgm));
  }

  scene.dialogues.slice(0, lineCount).forEach((line) => {
    collectLineAssets(line, scene, assets);
  });
}

export function useScenePreloader(
  currentScene: Scene | null,
  chapterData: ChapterData,
  isActive: boolean = true
) {
  const currentIndex = useDialogStore((s) => s.currentIndex);

  useEffect(() => {
    if (!isActive || !currentScene) return;
    const preloadProfile = getPreloadProfile();

    const assets = new Set<string>();
    assets.add(resolveBackgroundSrc(currentScene.background));

    if (currentScene.bgm) {
      assets.add(resolvePublicAssetSrc(currentScene.bgm));
    }

    currentScene.dialogues
      .slice(currentIndex, currentIndex + preloadProfile.dialogueAhead + 1)
      .forEach((line) => collectLineAssets(line, currentScene, assets));

    const nextSceneIds = new Set<string>();
    if (currentScene.nextSceneId) {
      nextSceneIds.add(currentScene.nextSceneId);
    }
    currentScene.choices?.forEach((choice) => {
      if (choice.nextSceneId) {
        nextSceneIds.add(choice.nextSceneId);
      }
    });

    nextSceneIds.forEach((sceneId) => {
      const scene = chapterData.scenes.find((candidate) => candidate.id === sceneId);
      if (scene) {
        collectSceneLeadAssets(scene, assets, preloadProfile.nextSceneLineCount);
      }
    });

    schedulePreloadAssets(assets, preloadProfile.staggerMs);
  }, [chapterData.scenes, currentIndex, currentScene, isActive]);
}
