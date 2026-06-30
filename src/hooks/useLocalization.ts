import { useSettingsStore } from '../stores/settingsStore';
import type { DialogueLine, Scene } from '../types';
import {
  getDialogueText,
  getSceneTitle,
  getSceneLocation,
  getSpeakerName,
  getUIString,
} from '../i18n/localization';

/**
 * Hook for accessing localization functions.
 * Reads the current language from settings store.
 */
export function useLocalization() {
  const language = useSettingsStore((s) => s.language);

  return {
    language,
    t: (key: string) => getUIString(key, language),
    getDialogueText: (line: DialogueLine) => getDialogueText(line, language),
    getSceneTitle: (scene: Scene) => getSceneTitle(scene, language),
    getSceneLocation: (scene: Scene) => getSceneLocation(scene, language),
    getSpeakerName: (speakerId: string) => getSpeakerName(speakerId, language),
  };
}
