import { describe, expect, it } from 'vitest';
import {
  isAudioAsset,
  isImageAsset,
  isVideoAsset,
  resolveBackgroundSrc,
  resolveCharacterSrc,
  resolvePublicAssetSrc,
} from './assetResolver';

describe('assetResolver', () => {
  it('keeps public, remote, data, and blob sources stable', () => {
    expect(resolvePublicAssetSrc('/assets/audio/sfx/click.ogg')).toBe('/assets/audio/sfx/click.ogg');
    expect(resolvePublicAssetSrc('assets/audio/sfx/click.ogg')).toBe('/assets/audio/sfx/click.ogg');
    expect(resolvePublicAssetSrc('https://cdn.example.com/a.mp3')).toBe('https://cdn.example.com/a.mp3');
    expect(resolvePublicAssetSrc('data:image/png;base64,abc')).toBe('data:image/png;base64,abc');
    expect(resolvePublicAssetSrc('blob:http://localhost/id')).toBe('blob:http://localhost/id');
  });

  it('resolves backgrounds with the current CG/background folder rules', () => {
    expect(resolveBackgroundSrc('ch1/bg_black')).toBe('/assets/backgrounds/ch1/bg_black.webp');
    expect(resolveBackgroundSrc('ch1/bg_black.webp')).toBe('/assets/backgrounds/ch1/bg_black.webp');
    expect(resolveBackgroundSrc('ch1/cg_ch1_s01_aetheria_street.mp4')).toBe(
      '/assets/cgs/ch1/cg_ch1_s01_aetheria_street.mp4',
    );
    expect(resolveBackgroundSrc('/assets/cgs/ch1/custom.webp')).toBe('/assets/cgs/ch1/custom.webp');
  });

  it('aliases missing character expressions to available sprite assets', () => {
    expect(resolveCharacterSrc('aeterna', 'smile')).toBe('/assets/characters/aeterna/aeterna_smug.webp');
    expect(resolveCharacterSrc('lysthea', 'shocked')).toBe('/assets/characters/lysthea/lysthea_cool.webp');
    expect(resolveCharacterSrc('abyssal_assassin', 'neutral')).toBe(
      '/assets/characters/abyssal_assassin/abyssal_assassin_menacing.webp',
    );
  });

  it('detects media types even with query strings', () => {
    expect(isImageAsset('/assets/cgs/ch1/frame.webp?v=1')).toBe(true);
    expect(isVideoAsset('/assets/cgs/ch1/loop.mp4#t=0.1')).toBe(true);
    expect(isAudioAsset('/assets/audio/voice/line.mp3?v=2')).toBe(true);
  });
});
