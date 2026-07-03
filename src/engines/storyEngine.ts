import type { ChapterData, GameProgress } from '../types';

export function advanceScene(
  chapter: ChapterData,
  currentProgress: GameProgress,
  choiceId?: string
): GameProgress {
  const currentScene = chapter.scenes.find((s) => s.id === currentProgress.currentSceneId);
  if (!currentScene) return currentProgress;

  const newProgress = { ...currentProgress };
  
  if (!newProgress.visitedSceneIds.includes(currentScene.id)) {
    newProgress.visitedSceneIds.push(currentScene.id);
  }

  if (choiceId && currentScene.choices) {
    const choice = currentScene.choices.find((c) => c.id === choiceId);
    if (choice && choice.nextSceneId) {
      newProgress.currentSceneId = choice.nextSceneId;
    }
  } else if (currentScene.nextSceneId) {
    newProgress.currentSceneId = currentScene.nextSceneId;
  }

  return newProgress;
}
