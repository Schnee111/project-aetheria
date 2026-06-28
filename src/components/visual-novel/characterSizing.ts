export const DEFAULT_CHARACTER_IMAGE_SIZE_CLASS =
  'h-[78vh] max-h-[700px] min-h-[350px] w-auto sm:h-[80vh] sm:max-h-[760px] md:h-[92vh] md:max-h-[930px]';

export const DEFAULT_CHARACTER_IMAGE_OFFSET_CLASS =
  'translate-y-[10%] md:translate-y-[12%]';

const CHARACTER_IMAGE_SIZE_CLASS: Record<string, string> = {
  abyssal_assassin:
    'h-[92vh] max-h-[800px] min-h-[400px] w-auto sm:h-[96vh] sm:max-h-[880px] md:h-[106vh] md:max-h-[1020px]',
};

const CHARACTER_IMAGE_OFFSET_CLASS: Record<string, string> = {
  abyssal_assassin: 'translate-y-[18%] md:translate-y-[20%]',
};

export function getCharacterImageSizeClass(characterId: string) {
  return CHARACTER_IMAGE_SIZE_CLASS[characterId] ?? DEFAULT_CHARACTER_IMAGE_SIZE_CLASS;
}

export function getCharacterImageOffsetClass(characterId: string) {
  return CHARACTER_IMAGE_OFFSET_CLASS[characterId] ?? DEFAULT_CHARACTER_IMAGE_OFFSET_CLASS;
}
