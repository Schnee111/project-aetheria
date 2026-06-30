import { useEffect, useRef } from 'react';
import type { Scene, ChapterData } from '../types';

/**
 * Collects all asset URLs that a scene will need.
 */
function collectSceneAssets(scene: Scene): string[] {
  const assets: Set<string> = new Set();

  // Background
  if (scene.background) {
    const isCg = scene.background.includes('cg_');
    const basePath = isCg ? '/assets/cgs' : '/assets/backgrounds';
    const hasExt = /\.(webp|png|jpg|mp4|webm)$/i.test(scene.background);
    assets.add(hasExt ? `${basePath}/${scene.background}` : `${basePath}/${scene.background}.webp`);
  }

  // Character sprites
  for (const char of scene.characters) {
    assets.add(`/assets/characters/${char.characterId}/${char.characterId}_${char.initialExpression}.webp`);
    // Also prefetch neutral fallback
    assets.add(`/assets/characters/${char.characterId}/${char.characterId}_neutral.webp`);
  }

  // Background overrides and character overrides from dialogues
  for (const line of scene.dialogues) {
    if (line.backgroundOverride) {
      const isCg = line.backgroundOverride.includes('cg_');
      const basePath = isCg ? '/assets/cgs' : '/assets/backgrounds';
      const hasExt = /\.(webp|png|jpg|mp4|webm)$/i.test(line.backgroundOverride);
      assets.add(hasExt ? `${basePath}/${line.backgroundOverride}` : `${basePath}/${line.backgroundOverride}.webp`);
    }
    if (line.characterOverrides) {
      for (const [charId, expr] of Object.entries(line.characterOverrides)) {
        if (expr && expr !== 'none' && expr !== 'leave' && expr !== 'exit') {
          assets.add(`/assets/characters/${charId}/${charId}_${expr}.webp`);
        }
      }
    }
  }

  // BGM
  if (scene.bgm) {
    assets.add(scene.bgm);
  }

  return Array.from(assets);
}

/**
 * Prefetches a list of asset URLs by creating hidden DOM elements.
 * Images use <link rel="prefetch"> for browser-level caching.
 * Videos/audio use fetch() with low priority.
 */
function prefetchAssets(urls: string[]) {
  const cleanup: HTMLElement[] = [];

  for (const url of urls) {
    // Skip if already prefetched (check existing link tags)
    if (document.querySelector(`link[href="${url}"]`)) continue;

    if (url.match(/\.(mp4|webm)$/i)) {
      // Video: use fetch with low priority to warm the cache
      fetch(url, { priority: 'low' } as RequestInit).catch(() => {});
    } else if (url.match(/\.(ogg|mp3|wav)$/i)) {
      // Audio: prefetch via link
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      link.as = 'audio';
      document.head.appendChild(link);
      cleanup.push(link);
    } else {
      // Image: prefetch via link
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      link.as = 'image';
      document.head.appendChild(link);
      cleanup.push(link);
    }
  }

  return () => {
    for (const el of cleanup) {
      el.remove();
    }
  };
}

/**
 * Hook that prefetches assets for the next scene(s).
 * Call this in StoryScreen or wherever the current scene is rendered.
 *
 * @param currentScene - The currently active scene
 * @param chapter - The full chapter data (to resolve nextSceneId)
 * @param enabled - Whether preloading is active (default: true)
 */
export function useScenePreloader(
  currentScene: Scene | null,
  chapter: ChapterData | null,
  enabled = true,
) {
  const prefetchedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!enabled || !currentScene || !chapter) return;

    // Determine which scene(s) to preload
    const nextSceneIds: string[] = [];

    if (currentScene.nextSceneId) {
      nextSceneIds.push(currentScene.nextSceneId);
    }

    // Also preload conditional next scenes
    if (currentScene.conditionalNext) {
      for (const cond of currentScene.conditionalNext) {
        nextSceneIds.push(cond.nextSceneId);
      }
    }

    // Also preload choice-target scenes
    if (currentScene.choices) {
      for (const choice of currentScene.choices) {
        if (choice.nextSceneId) {
          nextSceneIds.push(choice.nextSceneId);
        }
      }
    }

    // Collect and prefetch assets for all candidate next scenes
    const allAssets: string[] = [];
    for (const sceneId of nextSceneIds) {
      const nextScene = chapter.scenes.find((s) => s.id === sceneId);
      if (!nextScene) continue;

      const assets = collectSceneAssets(nextScene);
      for (const url of assets) {
        if (!prefetchedRef.current.has(url)) {
          prefetchedRef.current.add(url);
          allAssets.push(url);
        }
      }
    }

    if (allAssets.length > 0) {
      // Small delay to not compete with current scene rendering
      const timer = setTimeout(() => {
        prefetchAssets(allAssets);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [currentScene?.id, chapter, enabled]);
}
