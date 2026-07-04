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
  background: "ch1/bg_black",
  characters: [],
  dialogues: [
    // Hidden technical pause before the first spoken line.
    {
      id: "CH1_S00_INTRO_PAUSE",
      speaker: "system",
      expression: "neutral",
      text: "",
      textEn: "",
      autoAdvance: true,
      unskippable: true,
      autoAdvanceDelay: 2000,
      hideDialogBox: true,
      backgroundOverride: "ch1/bg_black",
    },
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
      voiceSrc: "/assets/audio/voice/chapter-1/scene-00/CH1_S00_D001.mp3",
      backgroundOverride: "ch1/cg_ch1_s01_aetheria_planet.mp4",
    },
    {
      id: "CH1_S00_D002",
      speaker: "narrator",
      expression: "neutral",
      text: "Di sini, peradaban tidak dibangun dengan baja dan minyak, melainkan dengan sirkuit siber dan kristal mana.",
      autoAdvance: true,
      unskippable: true,
      autoAdvanceDelay: 7000,
      postVoiceDelay: 300,
      textEn:
        "Here, civilization is not built with steel and oil - but with cyber circuits and mana crystals.",
      voiceSrc: "/assets/audio/voice/chapter-1/scene-00/CH1_S00_D002.mp3",
      backgroundOverride: "ch1/cg_ch1_s01_aetheria_metropolis.mp4",
    },
    {
      id: "CH1_S00_D003",
      speaker: "narrator",
      expression: "neutral",
      text: "Sihir bukan lagi dongeng mistis. Ia adalah teknologi. Ia adalah napas kehidupan sehari-hari.",
      autoAdvance: true,
      unskippable: true,
      autoAdvanceDelay: 7000,
      postVoiceDelay: 300,
      textEn:
        "Magic is no longer a mystical fairy tale. It is technology. It is the breath of everyday life.",
      voiceSrc: "/assets/audio/voice/chapter-1/scene-00/CH1_S00_D003.mp3",
      backgroundOverride: "ch1/cg_ch1_s01_aetheria_street.mp4",
    },
    // Hidden technical pause before entering Scene 1.
    {
      id: "CH1_S00_OUTRO_PAUSE",
      speaker: "system",
      expression: "neutral",
      text: "",
      textEn: "",
      autoAdvance: true,
      unskippable: true,
      autoAdvanceDelay: 1500,
      hideDialogBox: true,
      backgroundOverride: "ch1/bg_black",
    },
  ],
  nextSceneId: "CH1_S01",
};
