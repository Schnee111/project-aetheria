import type { Scene } from '../../../types';

export const s02: Scene = // SCENE 2: UNINVITED GUEST
{
  id: "CH1_S02",
  chapterId: "CH1",
  title: "Tamu Tak Diundang",
  titleEn: "The Uninvited Guest",
  location: "Aeterna's Magitech Fix",
  locationEn: "Aeterna's Magitech Fix",
  mode: "visual_novel",
  background: "ch1/bg_mechanic_shop_rain.webp",
  bgm: "/assets/audio/bgm/rain_loop.ogg",
  characters: [
    {
      characterId: "aeterna",
      position: "right",
      initialExpression: "neutral",
    },
    { characterId: "lysthea", position: "left", initialExpression: "hidden" },
  ],
  dialogues: [
    {
      id: "CH1_S02_D001",
      speaker: "system",
      expression: "neutral",
      text: "*BLAAARRR...*",
      textEn: "*RRRUMBLE...*",
      audioSrc: "/assets/audio/sfx/thunder.ogg",

      autoAdvance: true,
      unskippable: true,
      autoAdvanceDelay: 4500,
    },
    {
      id: "CH1_S02_D002",
      speaker: "system",
      expression: "neutral",
      text: "*TOK TOK TOK!* Terdengar ketukan keras dari luar, disusul suara bel bengkel yang berbunyi panik.",
      textEn:
        "*BANG BANG BANG!* Loud pounding from outside, followed by the frantic ring of the workshop bell.",
      audioSrc: "/assets/audio/sfx/shop_bell.ogg",

      autoAdvance: true,
      unskippable: true,
      autoAdvanceDelay: 8000,
    },
    {
      id: "CH1_S02_D003",
      speaker: "lysthea",
      expression: "hidden",
      text: "Permisi! Apakah ada mekanik di dalam?! Tolong buka pintunya!",
      textEn: "Hello! Is there a mechanic in there?! Please open the door!",

      autoAdvance: true,
      unskippable: true,
      autoAdvanceDelay: 5500,
    },
    {
      id: "CH1_S02_D004",
      speaker: "narrator",
      expression: "sigh",
      text: "Aku membuka pintu kayu bengkelku. Seorang wanita berjubah basah kuyup berdiri menggigil di bawah hujan. Wajahnya terlihat sangat panik.",
      textEn:
        "I opened the workshop's wooden door. A woman in a soaked robe stood shivering in the rain. Her face was sheer panic.",
      backgroundOverride: "ch1/cg_ch1_s03_lys_arrive.webp",
      characterOverrides: { aeterna: "none", lysthea: "none" },

      autoAdvance: true,
      unskippable: true,
      autoAdvanceDelay: 9000,
    },
    {
      id: "CH1_S02_D005",
      speaker: "lysthea",
      expression: "panicked",
      text: "Syukurlah... Maaf mengganggu selarut ini. Tapi bisakah kau melihat benda ini sebentar?!",
      textEn:
        "Thank goodness... Sorry to bother you this late. But could you take a look at this?!",
      backgroundOverride: "ch1/cg_ch1_s03_lys_arrive.webp",
      characterOverrides: { aeterna: "none", lysthea: "none" },

      autoAdvance: true,
      unskippable: true,
      autoAdvanceDelay: 7000,
    },
    {
      id: "CH1_S02_D006",
      speaker: "narrator",
      expression: "neutral",
      text: "Dia menyodorkan sebuah bola kristal logam ke atas meja. Intinya retak dan memancarkan kilatan energi biru yang sangat liar.",
      textEn:
        "She slammed a metal-cased crystal orb onto the table. Its core was cracked, shooting wild bursts of blue energy.",
      backgroundOverride: "ch1/cg_ch1_s03_core_slam.webp",
      characterOverrides: { aeterna: "none", lysthea: "none" },

      autoAdvance: true,
      unskippable: true,
      autoAdvanceDelay: 9000,
    },
    {
      id: "CH1_S02_D007",
      speaker: "lysthea",
      expression: "panicked",
      text: "Ini kristal core dari Defense Server distrik ketujuh. Pelindung distrik ini akan runtuh kalau sistemnya gagal me-reboot!",
      textEn:
        "This is the crystal core from the Seventh District's Defense Server. The district's barrier will collapse if the system fails to reboot!",
      backgroundOverride: "ch1/cg_ch1_s03_core_slam.webp",
      characterOverrides: { aeterna: "none", lysthea: "none" },

      autoAdvance: true,
      unskippable: true,
      autoAdvanceDelay: 9000,
    },
    {
      id: "CH1_S02_D008",
      speaker: "narrator",
      expression: "neutral",
      text: 'Aku mengambil kristal itu. Energinya bocor karena ada beberapa baris \"Rune\" yang mengalami konflik logika. Layaknya sebuah memory leak.',
      textEn:
        "I picked up the crystal. Energy was leaking because a few rune lines had logic conflicts. Basically a memory leak.",

      autoAdvance: true,
      unskippable: true,
      autoAdvanceDelay: 9000,
    },
    {
      id: "CH1_S02_D009",
      speaker: "narrator",
      expression: "neutral",
      text: "Hanya butuh sinkronisasi ulang. Aku menyentuh titik pusat sirkuitnya, mengeksekusi override command di kepalaku untuk menutup celah error tersebut.",
      textEn:
        "Just needs a resync. I touched the circuit's core point, executing an override command in my head to patch the error gap.",
      audioSrc: "/assets/audio/sfx/magic_repair.ogg",
      backgroundOverride: "ch1/cg_ch1_s02_casual_repair.webp",
      characterOverrides: { aeterna: "none", lysthea: "none" },

      autoAdvance: true,
      unskippable: true,
      autoAdvanceDelay: 9000,
    },
    {
      id: "CH1_S02_D010",
      speaker: "narrator",
      expression: "neutral",
      text: "Dalam beberapa detik, cahaya liar itu padam. Sirkuit sihir di dalamnya kembali tersambung dan berputar mulus.",
      textEn:
        "Within seconds, the wild light died down. The magic circuit inside reconnected and spun smoothly.",
      backgroundOverride: "ch1/cg_ch1_s02_casual_repair.webp",

      autoAdvance: true,
      unskippable: true,
      autoAdvanceDelay: 8500,
    },
    {
      id: "CH1_S02_D011",
      speaker: "aeterna",
      expression: "neutral",
      text: "Sudah ku-patch. Sistem pelindungnya seharusnya otomatis online lagi sekarang.",
      textEn: "Patched. The barrier system should be back online now.",
      backgroundOverride: "ch1/cg_ch1_s03_lys_shock.webp",
      characterOverrides: { aeterna: "none", lysthea: "none" },

      autoAdvance: true,
      unskippable: true,
      autoAdvanceDelay: 6500,
    },
    {
      id: "CH1_S02_D012",
      speaker: "lysthea",
      expression: "shocked",
      text: "...Hah?",
      textEn: "...What?",
      backgroundOverride: "ch1/cg_ch1_s03_lys_shock.webp",
      characterOverrides: { aeterna: "none", lysthea: "none" },

      autoAdvance: true,
      unskippable: true,
      autoAdvanceDelay: 4500,
    },
    {
      id: "CH1_S02_D013",
      speaker: "lysthea",
      expression: "shocked",
      text: "(Tidak mungkin... Menulis ulang konfigurasi Origin Rune tanpa merapal mantra?! Bahkan divisi elitku butuh waktu berhari-hari untuk kasus ini!)",
      textEn:
        "(Impossible... Rewriting an Origin Rune configuration without chanting?! Even my elite division takes days for something like this!)",
      backgroundOverride: "ch1/cg_ch1_s03_lys_shock.webp",
      characterOverrides: { aeterna: "none", lysthea: "none" },

      autoAdvance: true,
      unskippable: true,
      autoAdvanceDelay: 9000,
    },
    {
      id: "CH1_S02_D014",
      speaker: "aeterna",
      expression: "smug",
      text: "Biaya perbaikannya sepuluh Silver Coins. Bisa bayar tunai sekarang?",
      textEn: "That'll be ten Silver Coins. Cash is fine.",

      autoAdvance: true,
      unskippable: true,
      autoAdvanceDelay: 6000,
    },
  ],
  nextSceneId: "CH1_S03",
};
