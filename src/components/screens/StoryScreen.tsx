import { useState, useEffect } from 'react';
import { Background } from '../visual-novel/Background';
import { CharacterSprite } from '../visual-novel/CharacterSprite';
import { DialogBox } from '../visual-novel/DialogBox';
import { ChoicePanel } from '../visual-novel/ChoicePanel';
import { useBgm } from '../../hooks';
import { resolveBackgroundSrc } from '../../utils/assetResolver';
import type { Scene, DialogueLine } from '../../types';

interface StoryScreenProps {
  scene: Scene;
  currentLine: DialogueLine | null;
  onChoose: (choiceId: string) => void;
  onTapDialog: () => void;
  isDialogComplete: boolean;
}

export function StoryScreen({
  scene,
  currentLine,
  onChoose,
  onTapDialog,
  isDialogComplete,
}: StoryScreenProps) {
  const showChoices = isDialogComplete && scene.choices && scene.choices.length > 0;
  const { play: playBgm } = useBgm();
  const [charStates, setCharStates] = useState<Record<string, string>>({});

  useEffect(() => {
    const currentBgm = currentLine?.bgmOverride || scene.bgm;
    if (currentBgm) {
      playBgm(currentBgm);
    }
    const initial: Record<string, string> = {};
    scene.characters.forEach((c) => {
      initial[c.characterId] = c.initialExpression;
    });
    setCharStates(initial);
  }, [scene.id, scene.bgm, currentLine?.bgmOverride, scene.characters, playBgm]);

  useEffect(() => {
    if (currentLine) {
      setCharStates((prev) => {
        const next = { ...prev };
        if (currentLine.speaker && currentLine.speaker !== 'narrator' && currentLine.speaker !== 'system') {
          next[currentLine.speaker] = currentLine.expression;
        }
        if (currentLine.characterOverrides) {
          Object.assign(next, currentLine.characterOverrides);
        }
        return next;
      });
    }
  }, [currentLine]);

  return (
    <div className="absolute inset-0 overflow-hidden font-body">
      {/* Background */}
      {(() => {
        const bg = currentLine?.backgroundOverride || scene.background;
        return <Background src={resolveBackgroundSrc(bg)} />;
      })()}

      {/* Characters */}
      {scene.characters.map((char) => {
        const shouldShowCharacter =
          currentLine &&
          currentLine.speaker !== 'narrator' &&
          currentLine.speaker !== 'system' &&
          currentLine.speaker === char.characterId;

        if (!shouldShowCharacter) return null;

        const expr = charStates[char.characterId] || char.initialExpression;
        if (expr === 'leave' || expr === 'none' || expr === 'exit') return null;

        return (
          <CharacterSprite
            key={char.characterId}
            characterId={char.characterId}
            expression={expr}
            position={char.position}
          />
        );
      })}

      {/* Dialog */}
      {currentLine && !isDialogComplete && (
        <div className={currentLine.hideDialogBox ? "opacity-0 pointer-events-none" : ""}>
          <DialogBox line={currentLine} onTap={onTapDialog} />
        </div>
      )}

      {/* Choices */}
      {showChoices && (
        <ChoicePanel
          choices={scene.choices!}
          onSelect={onChoose}
        />
      )}
    </div>
  );
}
