import { describe, expect, it } from 'vitest';
import { SceneSchema, DialogueLineSchema, ChoiceSchema } from './scene.schema';

describe('SceneSchema validation', () => {
  it('validates a correct dialogue line schema', () => {
    const validDialogue = {
      id: 'd1',
      speaker: 'lysthea',
      expression: 'smile',
      text: 'Greetings, Traveler.',
      speakerLabel: 'Lysthea',
      autoAdvance: true,
      autoAdvanceDelay: 500,
    };

    const parsed = DialogueLineSchema.safeParse(validDialogue);
    expect(parsed.success).toBe(true);
  });

  it('rejects an empty dialogue text', () => {
    const invalidDialogue = {
      id: 'd2',
      speaker: 'aeterna',
      expression: 'lazy',
      text: '',
    };

    const parsed = DialogueLineSchema.safeParse(invalidDialogue);
    expect(parsed.success).toBe(false);
  });

  it('validates choice schema with optional stateChanges', () => {
    const validChoice = {
      id: 'choice_inspect',
      text: 'Inspect the crystal',
      effect: 'Learn more about the anomaly',
      stateChanges: {
        curiosityScore: 10,
      },
    };

    const parsed = ChoiceSchema.safeParse(validChoice);
    expect(parsed.success).toBe(true);
  });

  it('validates a complete Scene object according to regex and fields', () => {
    const validScene = {
      id: 'CH01_S01',
      chapterId: 'CH01',
      title: 'Workshop Awakening',
      location: 'Workshop',
      mode: 'visual_novel',
      background: 'ch1/bg_workshop.webp',
      characters: [
        {
          characterId: 'aeterna',
          position: 'center',
          initialExpression: 'neutral',
        },
      ],
      dialogues: [
        {
          id: 'd10',
          speaker: 'aeterna',
          expression: 'neutral',
          text: 'The morning ether is cold.',
        },
      ],
      unlockEvidenceIds: ['EV_CH01_001'],
      nextSceneId: 'CH01_S02',
    };

    const parsed = SceneSchema.safeParse(validScene);
    expect(parsed.success).toBe(true);
  });

  it('rejects scene id with invalid naming pattern', () => {
    const invalidScene = {
      id: 'invalid-scene-id',
      chapterId: 'CH01',
      title: 'Invalid',
      location: 'Void',
      mode: 'visual_novel',
      background: 'bg.webp',
      characters: [],
      dialogues: [
        {
          id: 'd1',
          speaker: 'narrator',
          expression: 'neutral',
          text: 'Void text',
        },
      ],
      unlockEvidenceIds: [],
    };

    const parsed = SceneSchema.safeParse(invalidScene);
    expect(parsed.success).toBe(false);
  });
});
