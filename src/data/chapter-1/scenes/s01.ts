import type { Scene } from '../../../types';

export const s01: Scene = // SCENE 1: AETHERIA (Magitech Workshop - Aeterna's Monologue)
{
  id: "CH1_S01",
  chapterId: "CH1",
  title: "Aetheria - Bengkel Magitech",
  titleEn: "Aetheria - Magitech Workshop",
  location: "Aeterna's Magitech Fix",
  locationEn: "Aeterna's Magitech Fix",
  mode: "visual_novel",
  background: "ch1/bg_mechanic_shop_corner.webp",
  characters: [
    {
      characterId: "aeterna",
      position: "center",
      initialExpression: "neutral",
    },
  ],
  dialogues: [
    {
      id: "CH1_S01_D001",
      speaker: "aeterna",
      expression: "neutral",
      text: "23 tahun telah berlalu sejak kecelakaan konyol di Bumi itu.",
      textEn:
        "Twenty-three years have passed since that ridiculous accident on Earth.",
    },
    {
      id: "CH1_S01_D002",
      speaker: "aeterna",
      expression: "neutral",
      text: "Di bawah bimbingan orang tuaku di kehidupan baru ini, aku belajar menguasai Magitech dan meneruskan bengkel tua peninggalan mereka.",
      textEn:
        "Under the guidance of my parents in this new life, I mastered Magitech and inherited their old workshop.",
    },
    {
      id: "CH1_S01_D003",
      speaker: "aeterna",
      expression: "neutral",
      text: "Aku tidak punya keluhan. Tidak ada ramalan pahlawan atau kewajiban mengalahkan Raja Iblis.",
      textEn:
        "No complaints here. No hero prophecy, no obligation to defeat the Demon King.",
    },
    {
      id: "CH1_S01_D004",
      speaker: "aeterna",
      expression: "neutral",
      text: "Hanya hari-hari tenang sebagai Low-class Magitech Engineer, dan aku sangat menyukai fakta itu.",
      textEn:
        "Just quiet days as a low-class Magitech Engineer — and I love that for myself.",
    },
  ],
  nextSceneId: "CH1_S02",
};
