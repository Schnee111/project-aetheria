const ASSET_EXTENSIONS = ['.webp', '.png', '.jpg', '.jpeg', '.mp4', '.webm'] as const;
const IMAGE_EXTENSIONS = ['.webp', '.png', '.jpg', '.jpeg'] as const;
const VIDEO_EXTENSIONS = ['.mp4', '.webm'] as const;
const AUDIO_EXTENSIONS = ['.mp3', '.ogg', '.wav', '.m4a'] as const;
const CHARACTER_EXPRESSION_ALIASES: Record<string, Record<string, string>> = {
  abyssal_assassin: {
    neutral: 'menacing',
  },
  aeterna: {
    smile: 'smug',
  },
  lysthea: {
    neutral: 'cool',
    panicked: 'cool',
    shocked: 'cool',
    sad: 'cool',
    smile: 'cool',
  },
};

function hasExtension(src: string, extensions: readonly string[]): boolean {
  const lower = src.toLowerCase().split(/[?#]/, 1)[0] ?? '';
  return extensions.some((ext) => lower.endsWith(ext));
}

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

function ensureLeadingSlash(value: string): string {
  return value.startsWith('/') ? value : `/${value}`;
}

export function resolvePublicAssetSrc(src: string): string {
  if (!src) return src;
  if (/^(https?:)?\/\//.test(src) || src.startsWith('data:') || src.startsWith('blob:')) {
    return src;
  }

  const assetBaseUrl = trimTrailingSlash(import.meta.env.VITE_ASSET_BASE_URL ?? '');
  const normalizedSrc = ensureLeadingSlash(src);

  if (!assetBaseUrl) {
    return normalizedSrc;
  }

  return `${assetBaseUrl}${normalizedSrc}`;
}

export function resolveBackgroundSrc(background: string): string {
  if (background.startsWith('/assets/') || /^(https?:)?\/\//.test(background)) {
    return resolvePublicAssetSrc(background);
  }

  const hasKnownExtension = hasExtension(background, ASSET_EXTENSIONS);
  const filename = hasKnownExtension ? background : `${background}.webp`;
  const basePath = filename.includes('cg_') ? '/assets/cgs' : '/assets/backgrounds';
  return resolvePublicAssetSrc(`${basePath}/${filename}`);
}

export function resolveCharacterSrc(characterId: string, expression: string): string {
  const resolvedExpression = CHARACTER_EXPRESSION_ALIASES[characterId]?.[expression] ?? expression;
  return resolvePublicAssetSrc(`/assets/characters/${characterId}/${characterId}_${resolvedExpression}.webp`);
}

export function isImageAsset(src: string): boolean {
  return hasExtension(src, IMAGE_EXTENSIONS);
}

export function isVideoAsset(src: string): boolean {
  return hasExtension(src, VIDEO_EXTENSIONS);
}

export function isAudioAsset(src: string): boolean {
  return hasExtension(src, AUDIO_EXTENSIONS);
}
