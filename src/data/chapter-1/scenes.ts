import type { Scene } from '../../types';

export const scenes: Scene[] = [
  // SCENE 0: BUMI (Ruang Kerja / Kantor)
  {
    id: 'CH1_S00',
    chapterId: 'CH1',
    title: 'Kehidupan sebagai Engineer',
    location: 'Bumi - Kantor IT',
    mode: 'visual_novel',
    background: 'bg_earth_office.jpg',
    characters: [],
    dialogues: [
      { id: 'CH1_S00_D001', speaker: 'system', expression: 'neutral', text: '*TAP TAP TAP TAP TAP...*', autoAdvance: true, autoAdvanceDelay: 1200, audioSrc: '/assets/audio/sfx/keyboard_typing.mp3' },
      { id: 'CH1_S00_D002', speaker: 'aeterna', expression: 'neutral', text: 'Kenapa production server-nya crash? Padahal di local environment semuanya berjalan mulus...' },
      { id: 'CH1_S00_D003', speaker: 'aeterna', expression: 'neutral', text: 'Ah. Ada typo di baris 402... null pointer exception. Pantas saja pipeline CI/CD di monitor ini merah membara.' },
      { id: 'CH1_S00_D004', speaker: 'system', expression: 'neutral', text: '*TAP!*', autoAdvance: true, autoAdvanceDelay: 800, audioSrc: '/assets/audio/sfx/keyboard_press.mp3' },
      { id: 'CH1_S00_D005', speaker: 'aeterna', expression: 'neutral', text: 'Commit, push, lalu merge pull request ke main branch... Oke, status deploy di server berubah hijau. Selesai juga tugas sprint minggu ini.' },
      { id: 'CH1_S00_D006', speaker: 'aeterna', expression: 'neutral', text: 'Sudah jam 6 sore. Waktunya pulang, mampir ke minimarket untuk membeli matcha latte dingin kesukaanku.' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_S01A',
  },

  // SCENE 1A: BUMI (Kehidupan Normal)
  {
    id: 'CH1_S01A',
    chapterId: 'CH1',
    title: 'Kehidupan yang Terlalu Normal',
    location: 'Bumi - Trotoar Kota',
    mode: 'visual_novel',
    background: 'bg_earth_street.jpg',
    characters: [
      { characterId: 'aeterna', position: 'center', initialExpression: 'matcha' },
    ],
    dialogues: [
      { id: 'CH1_S01A_D001', speaker: 'aeterna', expression: 'matcha', text: 'Berjalan kaki menyusuri trotoar di bawah langit senja kota Bumi setelah jam lembur kerja keras itu rasanya menenangkan.' },
      { id: 'CH1_S01A_D002', speaker: 'aeterna', expression: 'matcha', text: 'Meskipun lelah seharian menatap monitor, setidaknya gajiku sangat stabil. Cukup untuk langganan streaming, bayar sewa apartemen kecil, dan menikmati segelas matcha latte dingin ini.' },
      { id: 'CH1_S01A_D003', speaker: 'aeterna', expression: 'matcha', text: 'Bisa dibilang rutinitas harianku berjalan damai dan terjadwal secara logis.' },
      { id: 'CH1_S01A_D004', speaker: 'aeterna', expression: 'matcha', text: 'Satu-satunya kekurangannya adalah, tidak ada magic di dunia ini.' },
      { id: 'CH1_S01A_D005', speaker: 'aeterna', expression: 'matcha', text: 'Seandainya aku bisa memprogram sirkuit mana agar matcha latte di genggamanku ini menyeduh dirinya sendiri secara otomatis, pasti hidup ini jauh lebih efisien.' },
      { id: 'CH1_S01A_D006', speaker: 'aeterna', expression: 'matcha', text: 'Aku melangkahkan kakiku ke zebra cross, menyeberang jalanan sepi yang biasanya aman ini.' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_S01B',
  },

  // SCENE 1B: BUMI (Truck Hit)
  {
    id: 'CH1_S01B',
    chapterId: 'CH1',
    title: 'The Truck',
    location: 'Bumi - Jalan Raya',
    mode: 'visual_novel',
    background: 'cg_truck_hit.jpg',
    characters: [],
    dialogues: [
      { id: 'CH1_S01B_D001', speaker: 'system', expression: 'neutral', text: '*HONK!!!*', audioSrc: '/assets/audio/sfx/car_horn.wav' },
      { id: 'CH1_S01B_D002', speaker: 'system', expression: 'neutral', text: '*CRASH!!!*', audioSrc: '/assets/audio/sfx/car_crash.wav' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_S01C',
  },

  // SCENE 1C: BUMI (Black Screen / Game Over)
  {
    id: 'CH1_S01C',
    chapterId: 'CH1',
    title: 'Cuti Panjang',
    location: 'Bumi - ?',
    mode: 'visual_novel',
    background: 'bg_black.jpg',
    characters: [],
    dialogues: [
      { id: 'CH1_S01C_D001', speaker: 'aeterna', expression: 'neutral', text: 'Truk? Serius?' },
      { id: 'CH1_S01C_D002', speaker: 'aeterna', expression: 'neutral', text: 'Mati ditabrak truk di tengah senja seindah ini adalah metode perpindahan dunia yang sangat klise dan tidak kreatif.' },
      { id: 'CH1_S01C_D003', speaker: 'aeterna', expression: 'neutral', text: 'Yah, sudahlah. Anggap saja aku mengambil cuti panjang tak berbayar.' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_S01D',
  },

  // SCENE 1D: AETHERIA (Reincarnation Slideshow)
  {
    id: 'CH1_S01D',
    chapterId: 'CH1',
    title: 'Dunia Baru',
    location: 'Aetheria',
    mode: 'visual_novel',
    background: 'bg_aetheria_planet.png', // Default background
    characters: [],
    dialogues: [
      { id: 'CH1_S01D_D001', speaker: 'narrator', expression: 'neutral', text: 'Aetheria... Sebuah dimensi di mana hukum fisika tunduk pada kehendak sihir.', backgroundOverride: 'bg_aetheria_planet.png', autoAdvance: true, autoAdvanceDelay: 2500 },
      { id: 'CH1_S01D_D002', speaker: 'narrator', expression: 'neutral', text: 'Di sini, peradaban tidak dibangun dengan baja dan minyak, melainkan dengan sirkuit siber dan kristal mana.', backgroundOverride: 'bg_aetheria_metropolis.png', autoAdvance: true, autoAdvanceDelay: 3000 },
      { id: 'CH1_S01D_D003', speaker: 'narrator', expression: 'neutral', text: 'Sihir bukan lagi dongeng mistis. Ia adalah teknologi. Ia adalah napas kehidupan sehari-hari.', backgroundOverride: 'bg_aetheria_street.png', autoAdvance: true, autoAdvanceDelay: 3000 },
      { id: 'CH1_S01D_D004', speaker: 'aeterna', expression: 'neutral', text: 'Dan di dunia yang megah inilah... jiwaku yang terlempar dari Bumi menemukan wadah barunya.', backgroundOverride: 'bg_isekai_baby.png', autoAdvance: true, autoAdvanceDelay: 3000 },
      { id: 'CH1_S01D_D005', speaker: 'aeterna', expression: 'neutral', text: 'Aku dilahirkan kembali. Menjalani masa kecil di bawah asuhan orang tua angkatku yang hangat...', backgroundOverride: 'bg_magitech_learning.png', autoAdvance: true, autoAdvanceDelay: 3000 },
      { id: 'CH1_S01D_D006', speaker: 'aeterna', expression: 'neutral', text: 'Di bengkel kecil milik merekalah, aku belajar merangkai sirkuit Magitech pertamaku, dan menemukan tujuan hidup baruku: hidup santai tanpa lembur.', backgroundOverride: 'bg_magitech_learning.png', autoAdvance: true, autoAdvanceDelay: 3500 }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_S02A',
  },

  // SCENE 2A: AETHERIA (Bengkel Magitech - Monolog Aeterna)
  {
    id: 'CH1_S02A',
    chapterId: 'CH1',
    title: 'Aetheria - Bengkel Magitech',
    location: 'Aeterna\'s Magitech Fix',
    mode: 'visual_novel',
    background: 'bg_mechanic_shop_corner.png',
    characters: [
      { characterId: 'aeterna', position: 'center', initialExpression: 'neutral' },
    ],
    dialogues: [
      { id: 'CH1_S02A_D001', speaker: 'aeterna', expression: 'neutral', text: '23 tahun telah berlalu sejak kecelakaan konyol di Bumi itu.' },
      { id: 'CH1_S02A_D002', speaker: 'aeterna', expression: 'neutral', text: 'Di bawah bimbingan orang tuaku di kehidupan baru ini, aku belajar menguasai Magitech dan meneruskan bengkel tua peninggalan mereka.' },
      { id: 'CH1_S02A_D003', speaker: 'aeterna', expression: 'neutral', text: 'Aku tidak punya keluhan. Tidak ada ramalan pahlawan atau kewajiban mengalahkan Raja Iblis.' },
      { id: 'CH1_S02A_D004', speaker: 'aeterna', expression: 'neutral', text: 'Hanya hari-hari tenang sebagai Low-class Magitech Engineer, dan aku sangat menyukai fakta itu.' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_S02B',
  },

  // SCENE 2B: AETHERIA (Bel Berbunyi - Kedatangan Elf)
  {
    id: 'CH1_S02B',
    chapterId: 'CH1',
    title: 'Tetangga Berisik',
    location: 'Aeterna\'s Magitech Fix',
    mode: 'visual_novel',
    background: 'bg_mechanic_shop_door.png',
    characters: [
      { characterId: 'aeterna', position: 'right', initialExpression: 'neutral' },
      { characterId: 'elf_neighbor', position: 'left', initialExpression: 'panicked' },
    ],
    dialogues: [
      { id: 'CH1_S02B_D001', speaker: 'system', expression: 'neutral', text: '*KRING!*', autoAdvance: true, autoAdvanceDelay: 1000, audioSrc: '/assets/audio/sfx/shop_bell.ogg' },
      { id: 'CH1_S02B_D002', speaker: 'elf_neighbor', expression: 'panicked', text: 'Aeterna! Tolong aku! Ibuku akan mengamuk kalau "Mana Rice Cooker" ini tidak selesai sebelum jam makan malam!' },
      { id: 'CH1_S02B_D002b', speaker: 'elf_neighbor', expression: 'panicked', text: 'Sirkuit pemanasnya terbakar total. Butuh berapa hari untuk membongkar dan merangkai ulang Rune-nya?!' },
      { id: 'CH1_S02B_D003', speaker: 'aeterna', expression: 'sigh', text: 'Aku menghela napas, meletakkan ujung telunjukku langsung pada kristal sirkuit mana yang hangus itu.', backgroundOverride: 'bg_mechanic_shop_door_pov.png' },
      { id: 'CH1_S02B_D004', speaker: 'aeterna', expression: 'neutral', text: '*BEEP... ZZZT!* Aku menata ulang baris algoritma Rune-nya langsung dari luar, menyambung kabel-kabel mana yang putus hanya dengan kendali pikiranku. Tanpa obeng. Tanpa tang.', audioSrc: '/assets/audio/sfx/magic_repair.ogg', backgroundOverride: 'bg_mechanic_shop_door_pov.png' },
      { id: 'CH1_S02B_D005', speaker: 'aeterna', expression: 'neutral', text: 'Tiga detik. Bawa pulang.', backgroundOverride: 'bg_mechanic_shop_door_pov.png' },
      { id: 'CH1_S02B_D006', speaker: 'elf_neighbor', expression: 'relieved', text: 'H-Hah?! Tiga detik?! Demi para Dewa... kau memang penyelamat hidupku, Aeterna!' },
      { id: 'CH1_S02B_D007', speaker: 'aeterna', expression: 'neutral', text: 'Dia melongo keheranan, menaruh beberapa keping koin perunggu di meja, lalu buru-buru berlari pulang sambil berteriak terima kasih.', audioSrc: '/assets/audio/sfx/coins.ogg' },
      { id: 'CH1_S02B_D008', speaker: 'aeterna', expression: 'smug', text: 'Menjadi Arsitek Sistem di Bumi ternyata memberiku semacam "Cheat Skill" di dunia ini. Logika pemrograman dan sirkuit sihir pada dasarnya adalah hal yang sama.', backgroundOverride: 'bg_mechanic_shop_corner.png', characterOverrides: { elf_neighbor: 'leave' } },
      { id: 'CH1_S02B_D009', speaker: 'aeterna', expression: 'lazy', text: 'Tapi menggunakannya untuk hal-hal besar terlalu merepotkan. Aku hanya ingin hidup santai, jauh dari drama lembur.', backgroundOverride: 'bg_mechanic_shop_corner.png' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_S03',
  },

  // SCENE 3: TAMU TAK DIUNDANG
  {
    id: 'CH1_S03',
    chapterId: 'CH1',
    title: 'Tamu Tak Diundang',
    location: 'Aeterna\'s Magitech Fix',
    mode: 'visual_novel',
    background: 'bg_mechanic_shop_rain.png',
    bgm: '/assets/audio/bgm/rain_loop.ogg',
    characters: [
      { characterId: 'aeterna', position: 'right', initialExpression: 'neutral' },
      { characterId: 'lysthea', position: 'left', initialExpression: 'hidden' },
    ],
    dialogues: [
      { id: 'CH1_S03_D001', speaker: 'system', expression: 'neutral', text: '*BLAAARRR...*', autoAdvance: true, autoAdvanceDelay: 1500, audioSrc: '/assets/audio/sfx/thunder.ogg' },
      { id: 'CH1_S03_D002', speaker: 'system', expression: 'neutral', text: 'Hujan badai tiba-tiba turun dengan lebatnya. Tak lama, pintu bengkel terbuka paksa dengan kasar.', audioSrc: '/assets/audio/sfx/door_kick.ogg' },
      { id: 'CH1_S03_D003', speaker: 'lysthea', expression: 'hidden', text: '*Hah... hah...* Apakah ini tempatnya? Bengkel tanpa nama di ujung distrik ketujuh...' },
      { id: 'CH1_S03_D004', speaker: 'aeterna', expression: 'sigh', text: 'Sudah tutup. Mesin kasirnya rusak.' },
      { id: 'CH1_S03_D005', speaker: 'lysthea', expression: 'hidden', text: 'Aku tidak peduli. Lihat relik ini!' },
      { id: 'CH1_S03_D006', speaker: 'aeterna', expression: 'neutral', text: 'Wanita berjubah basah kuyup itu membanting sebuah bola kristal logam ke mejaku. Energinya bocor liar.', backgroundOverride: 'cg_core_slam.jpg', characterOverrides: { aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S03_D007', speaker: 'lysthea', expression: 'hidden', text: 'Ini kristal core dari Defense Server distrik ketujuh! Retak parah karena serangan mendadak Abyss!', characterOverrides: { aeterna: 'neutral', lysthea: 'hidden' } },
      { id: 'CH1_S03_D008', speaker: 'lysthea', expression: 'hidden', text: 'Pelindung distrik ini akan runtuh dalam hitungan menit kalau benda ini mati, dan Abyss sudah mencium baunya! Bisakah kau menstabilkannya setidaknya selama satu jam?!' },
      { id: 'CH1_S03_D009', speaker: 'aeterna', expression: 'lazy', text: 'Sambil mengunyah roti lapis, aku menyentuhkan ibu jariku ke atas kristal yang retak itu tanpa mengalihkan pandangan dari majalah.', audioSrc: '/assets/audio/sfx/magic_repair.ogg', backgroundOverride: 'cg_casual_repair.jpg', characterOverrides: { aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S03_D010', speaker: 'aeterna', expression: 'neutral', text: 'Aku mengeksekusi override command di kepalaku. Dalam sekejap mata, cahaya liar itu padam. Sirkuit kembali tersambung sempurna.', backgroundOverride: 'cg_casual_repair.jpg' },
      { id: 'CH1_S03_D011', speaker: 'aeterna', expression: 'smug', text: 'Selesai. Sepuluh Silver Coins.', characterOverrides: { aeterna: 'smug', lysthea: 'hidden' } },
      { id: 'CH1_S03_D012', speaker: 'lysthea', expression: 'shocked', text: '...Apa?', characterOverrides: { lysthea: 'shocked' } },
      { id: 'CH1_S03_D013', speaker: 'lysthea', expression: 'shocked', text: '(Tidak mungkin... Menulis ulang Origin Rune tanpa casting?! Bahkan aku butuh waktu seminggu membedah Rune sekompleks ini! Siapa mekanik pemalas ini sebenarnya?!)' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_S04',
  },

  // SCENE 4: THE REVELATION
  {
    id: 'CH1_S04',
    chapterId: 'CH1',
    title: 'The Revelation',
    location: 'Aeterna\'s Magitech Fix',
    mode: 'visual_novel',
    background: 'bg_mechanic_shop_rain.png',
    characters: [
      { characterId: 'aeterna', position: 'right', initialExpression: 'neutral' },
      { characterId: 'lysthea', position: 'left', initialExpression: 'cool' },
      { characterId: 'abyssal_assassin', position: 'center', initialExpression: 'menacing' },
    ],
    dialogues: [
      { id: 'CH1_S04_D001', speaker: 'system', expression: 'neutral', text: '*CRASH!!!*', autoAdvance: true, autoAdvanceDelay: 1000 },
      { id: 'CH1_S04_D002', speaker: 'abyssal_assassin', expression: 'menacing', text: 'Aku menemukanmu... Matilah bersama relik itu!' },
      { id: 'CH1_S04_D003', speaker: 'lysthea', expression: 'cool', text: 'Mundur, Engineer! Dia melacak relik ini. Aku yang akan menanganinya!' },
      { id: 'CH1_S04_D004', speaker: 'aeterna', expression: 'smug', text: 'Tiga puluh Gold Coins.' },
      { id: 'CH1_S04_D005', speaker: 'lysthea', expression: 'cool', text: 'Apa?' },
      { id: 'CH1_S04_D006', speaker: 'aeterna', expression: 'sigh', text: 'Harga pintu dan jendelaku yang baru saja kau hancurkan. Dan kau mengotori lantainya.' },
      { id: 'CH1_S04_D007', speaker: 'narrator', expression: 'neutral', text: 'Tanpa beranjak dari kursinya, Aeterna menjentikkan jarinya malas. Seketika, Aura of the Prime (Otoritas Mutlak) menekan seluruh ruangan.' },
      { id: 'CH1_S04_D008', speaker: 'abyssal_assassin', expression: 'terrified', text: 'T-Tekanan ini... Otoritas Mutlak... Tidak mungkin... The Weaver of—' },
      { id: 'CH1_S04_D009', speaker: 'narrator', expression: 'neutral', text: 'Sebelum iblis itu menyelesaikan kalimatnya, jentikan jari Aeterna mengubahnya menjadi partikel debu halus.', backgroundOverride: 'cg_dust_snap.jpg', characterOverrides: { abyssal_assassin: 'leave', aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S04_D010', speaker: 'lysthea', expression: 'crying', text: 'Otoritas Mutlak ini... Anda adalah The Weaver of Fate? The Prime Deity?!', characterOverrides: { aeterna: 'neutral', lysthea: 'crying' } },
      { id: 'CH1_S04_D011', speaker: 'lysthea', expression: 'crying', text: 'Saya... saya telah menjaga Magic System yang Anda bangun selama sepuluh ribu tahun... menunggu kepulangan Anda.' },
      { id: 'CH1_S04_D012', speaker: 'aeterna', expression: 'lazy', text: 'Terima kasih atas kerja kerasmu. Tapi tolong jangan panggil aku dengan sebutan chuunibyou begitu. Aku cuma menggunakan trik administrator.' },
      { id: 'CH1_S04_D013', speaker: 'aeterna', expression: 'smug', text: 'Anggap saja aku tidak pernah ada di sini. Kalau kau tutup mulut, aku akan membetulkan sisa server-mu secara gratis. Sepakat?' }
    ],
    unlockEvidenceIds: [],
  }
];
