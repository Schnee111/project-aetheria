import type { Scene } from '../../../types';

export const s00: Scene = // SCENE 0: AETHERIA (Prologue Cinematic)
{
  id: "CH1_S00",
  chapterId: "CH1",
  title: "Dunia Baru",
  titleEn: "A New World",
  location: "Aetheria",
  locationEn: "Aetheria",
  mode: "visual_novel",
  background: "ch1/cg_ch1_s01_aetheria_planet.mp4",
  characters: [],
  dialogues: [
    // ── Video 1: Planet (7s) ──
    {
      id: "CH1_S00_D001",
      speaker: "narrator",
      expression: "neutral",
      text: "Aetheria... Sebuah dimensi di mana hukum fisika tunduk pada kehendak sihir.",
      autoAdvance: true,
      unskippable: true,
      autoAdvanceDelay: 7000,
      textEn:
        "Aetheria... A dimension where the laws of physics bow to the will of magic.",
      backgroundOverride: "ch1/cg_ch1_s01_aetheria_planet.mp4",
    },
    // ── Video 2: Metropolis (7s) ──
    {
      id: "CH1_S00_D002",
      speaker: "narrator",
      expression: "neutral",
      text: "Di sini, peradaban tidak dibangun dengan baja dan minyak, melainkan dengan sirkuit siber dan kristal mana.",
      autoAdvance: true,
      unskippable: true,
      autoAdvanceDelay: 7000,
      textEn:
        "Here, civilization is not built with steel and oil — but with cyber circuits and mana crystals.",
      backgroundOverride: "ch1/cg_ch1_s01_aetheria_metropolis.mp4",
    },
    // ── Video 3: Street (7s) ──
    {
      id: "CH1_S00_D003",
      speaker: "narrator",
      expression: "neutral",
      text: "Sihir bukan lagi dongeng mistis. Ia adalah teknologi. Ia adalah napas kehidupan sehari-hari.",
      autoAdvance: true,
      unskippable: true,
      autoAdvanceDelay: 7000,
      textEn:
        "Magic is no longer a mystical fairy tale. It is technology. It is the breath of everyday life.",
      backgroundOverride: "ch1/cg_ch1_s01_aetheria_street.mp4",
    },
    // ── Video 4: Baby (7s) ──
    {
      id: "CH1_S00_D004",
      speaker: "narrator",
      expression: "neutral",
      text: "Dan di dunia yang megah inilah... jiwaku yang terlempar entah dari mana menemukan wadah barunya.",
      autoAdvance: true,
      unskippable: true,
      autoAdvanceDelay: 7000,
      textEn:
        "And in this magnificent world... my soul, flung from nowhere, found its new vessel.",
      backgroundOverride: "ch1/cg_ch1_s01_isekai_baby.mp4",
    },
    // ── Parents (7s) ──
    {
      id: "CH1_S00_D005",
      speaker: "narrator",
      expression: "neutral",
      text: "Aku dilahirkan kembali. Menjalani masa kecil di bawah asuhan orang tua angkatku yang hangat...",
      autoAdvance: true,
      unskippable: true,
      autoAdvanceDelay: 7000,
      textEn:
        "I was reborn. Growing up under the care of my warm adoptive parents...",
      backgroundOverride: "ch1/cg_ch1_s02_parents_silhouette.webp",
    },
    // ── Workshop (7s) ──
    {
      id: "CH1_S00_D006",
      speaker: "narrator",
      expression: "neutral",
      text: "Di bengkel kecil milik merekalah, aku belajar merangkai sirkuit Magitech pertamaku, dan menemukan tujuan hidup baruku: hidup santai tanpa lembur.",
      autoAdvance: true,
      unskippable: true,
      autoAdvanceDelay: 7000,
      textEn:
        "It was in their small workshop that I learned to assemble my first Magitech circuit — and discovered my new life's purpose: living easy, no overtime.",
      backgroundOverride: "ch1/bg_magitech_learning.webp",
    },
  ],
  nextSceneId: "CH1_S01",
};
