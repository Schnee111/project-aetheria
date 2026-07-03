import { useEffect } from 'react';
import type { Scene, ChapterData } from '../types';

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

function preloadAudio(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.oncanplaythrough = () => resolve();
    audio.onerror = reject;
    audio.src = src;
  });
}

export function useScenePreloader(
  currentScene: Scene | null,
  chapterData: ChapterData,
  isActive: boolean = true
) {
  useEffect(() => {
    if (!isActive || !currentScene) return;

    const assetsToPreload = new Set<string>();

    // Determine next scene
    let nextSceneId = currentScene.nextSceneId;
    
    // Also look at choices
    if (currentScene.choices) {
      currentScene.choices.forEach((choice) => {
        if (choice.nextSceneId) {
          assetsToPreload.add(choice.nextSceneId);
        }
      });
    }

    if (nextSceneId) {
      assetsToPreload.add(nextSceneId);
    }

    // Preload assets for identified scenes
    assetsToPreload.forEach((sceneId) => {
      const scene = chapterData.scenes.find((s) => s.id === sceneId);
      if (!scene) return;

      if (scene.background) {
        const bg = scene.background;
        const hasExt = bg.endsWith('.png') || bg.endsWith('.jpg') || bg.endsWith('.webp') || bg.endsWith('.mp4') || bg.endsWith('.webm');
        const isCg = bg.includes('cg_');
        const basePath = isCg ? '/assets/cgs' : '/assets/backgrounds';
        const src = hasExt ? `${basePath}/${bg}` : `${basePath}/${bg}.webp`;
        preloadImage(src).catch(() => {});
      }

      if (scene.bgm) {
        preloadAudio(scene.bgm).catch(() => {});
      }
    });
  }, [currentScene, chapterData, isActive]);
}
