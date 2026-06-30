import type { Scene } from '../../types';

export const scenes: Scene[] = [
  // SCENE 0: BUMI (Ruang Kerja / Kantor)
  {
    id: 'CH1_S00',
    chapterId: 'CH1',
    title: 'Kehidupan sebagai Engineer',
    location: 'Bumi - Kantor IT',
    mode: 'visual_novel',
    background: 'ch1/bg_earth_office.jpg',
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
    background: 'ch1/bg_earth_street.jpg',
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
    background: 'ch1/cg_truck_hit.jpg',
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
    background: 'ch1/bg_black.jpg',
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
    background: 'ch1/cg_aetheria_planet.mp4', // Default background
    characters: [],
    dialogues: [
      { id: 'CH1_S01D_D001', speaker: 'narrator', expression: 'neutral', text: 'Aetheria... Sebuah dimensi di mana hukum fisika tunduk pada kehendak sihir.', backgroundOverride: 'ch1/cg_aetheria_planet.mp4', autoAdvance: true, autoAdvanceDelay: 2500 },
      { id: 'CH1_S01D_D002', speaker: 'narrator', expression: 'neutral', text: 'Di sini, peradaban tidak dibangun dengan baja dan minyak, melainkan dengan sirkuit siber dan kristal mana.', backgroundOverride: 'ch1/cg_aetheria_metropolis.mp4', autoAdvance: true, autoAdvanceDelay: 3000 },
      { id: 'CH1_S01D_D003', speaker: 'narrator', expression: 'neutral', text: 'Sihir bukan lagi dongeng mistis. Ia adalah teknologi. Ia adalah napas kehidupan sehari-hari.', backgroundOverride: 'ch1/cg_aetheria_street.mp4', autoAdvance: true, autoAdvanceDelay: 3000 },
      { id: 'CH1_S01D_D004', speaker: 'aeterna', expression: 'neutral', text: 'Dan di dunia yang megah inilah... jiwaku yang terlempar dari Bumi menemukan wadah barunya.', backgroundOverride: 'ch1/cg_isekai_baby.mp4', autoAdvance: true, autoAdvanceDelay: 3000 },
      { id: 'CH1_S01D_D005', speaker: 'aeterna', expression: 'neutral', text: 'Aku dilahirkan kembali. Menjalani masa kecil di bawah asuhan orang tua angkatku yang hangat...', backgroundOverride: 'ch1/cg_parents_silhouette.png', autoAdvance: true, autoAdvanceDelay: 3000 },
      { id: 'CH1_S01D_D006', speaker: 'aeterna', expression: 'neutral', text: 'Di bengkel kecil milik merekalah, aku belajar merangkai sirkuit Magitech pertamaku, dan menemukan tujuan hidup baruku: hidup santai tanpa lembur.', backgroundOverride: 'ch1/bg_magitech_learning.png', autoAdvance: true, autoAdvanceDelay: 3500 }
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
    background: 'ch1/bg_mechanic_shop_corner.png',
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
    background: 'ch1/bg_mechanic_shop_door.png',
    characters: [
      { characterId: 'aeterna', position: 'right', initialExpression: 'neutral' },
      { characterId: 'elf_neighbor', position: 'left', initialExpression: 'panicked' },
    ],
    dialogues: [
      { id: 'CH1_S02B_D001', speaker: 'system', expression: 'neutral', text: '*KRING!*', autoAdvance: true, autoAdvanceDelay: 1000, audioSrc: '/assets/audio/sfx/shop_bell.ogg' },
      { id: 'CH1_S02B_D002', speaker: 'elf_neighbor', expression: 'panicked', text: 'Aeterna! Tolong aku! Ibuku akan mengamuk kalau "Mana Rice Cooker" ini tidak selesai sebelum jam makan malam!' },
      { id: 'CH1_S02B_D002b', speaker: 'elf_neighbor', expression: 'panicked', text: 'Sirkuit pemanasnya terbakar total. Butuh berapa hari untuk membongkar dan merangkai ulang Rune-nya?!' },
      { id: 'CH1_S02B_D003', speaker: 'aeterna', expression: 'sigh', text: 'Aku menghela napas, meletakkan ujung telunjukku langsung pada kristal sirkuit mana yang hangus itu.', backgroundOverride: 'ch1/bg_mechanic_shop_door_pov.png' },
      { id: 'CH1_S02B_D004', speaker: 'aeterna', expression: 'neutral', text: '*BEEP... ZZZT!* Aku menata ulang baris algoritma Rune-nya langsung dari luar, menyambung kabel-kabel mana yang putus hanya dengan kendali pikiranku. Tanpa obeng. Tanpa tang.', audioSrc: '/assets/audio/sfx/magic_repair.ogg', backgroundOverride: 'ch1/bg_mechanic_shop_door_pov.png' },
      { id: 'CH1_S02B_D005', speaker: 'aeterna', expression: 'neutral', text: 'Tiga detik. Bawa pulang.', backgroundOverride: 'ch1/bg_mechanic_shop_door_pov.png' },
      { id: 'CH1_S02B_D006', speaker: 'elf_neighbor', expression: 'relieved', text: 'H-Hah?! Tiga detik?! Demi para Dewa... kau memang penyelamat hidupku, Aeterna!' },
      { id: 'CH1_S02B_D007', speaker: 'aeterna', expression: 'neutral', text: 'Dia melongo keheranan, menaruh beberapa keping koin perunggu di meja, lalu buru-buru berlari pulang sambil berteriak terima kasih.', audioSrc: '/assets/audio/sfx/coins.ogg' },
      { id: 'CH1_S02B_D008', speaker: 'aeterna', expression: 'smug', text: 'Menjadi Arsitek Sistem di Bumi ternyata memberiku semacam "Cheat Skill" di dunia ini. Logika pemrograman dan sirkuit sihir pada dasarnya adalah hal yang sama.', backgroundOverride: 'ch1/bg_mechanic_shop_corner.png', characterOverrides: { elf_neighbor: 'leave' } },
      { id: 'CH1_S02B_D009', speaker: 'aeterna', expression: 'lazy', text: 'Tapi menggunakannya untuk hal-hal besar terlalu merepotkan. Aku hanya ingin hidup santai, jauh dari drama lembur.', backgroundOverride: 'ch1/bg_mechanic_shop_corner.png' }
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
    background: 'ch1/bg_mechanic_shop_rain.png',
    bgm: '/assets/audio/bgm/rain_loop.ogg',
    characters: [
      { characterId: 'aeterna', position: 'right', initialExpression: 'neutral' },
      { characterId: 'lysthea', position: 'left', initialExpression: 'hidden' },
    ],
    dialogues: [
      { id: 'CH1_S03_D001', speaker: 'system', expression: 'neutral', text: '*BLAAARRR...*', autoAdvance: true, autoAdvanceDelay: 1500, audioSrc: '/assets/audio/sfx/thunder.ogg' },
      { id: 'CH1_S03_D002', speaker: 'system', expression: 'neutral', text: '*TOK TOK TOK!* Terdengar ketukan keras dari luar, disusul suara bel bengkel yang berbunyi panik.', audioSrc: '/assets/audio/sfx/shop_bell.ogg' },
      { id: 'CH1_S03_D003', speaker: 'lysthea', expression: 'hidden', text: 'Permisi! Apakah ada mekanik di dalam?! Tolong buka pintunya!' },
      { id: 'CH1_S03_D004', speaker: 'aeterna', expression: 'sigh', text: 'Aku membuka pintu kayu bengkelku. Seorang wanita berjubah basah kuyup berdiri menggigil di bawah hujan. Wajahnya terlihat sangat panik.', backgroundOverride: 'ch1/cg_ch1_s03_lys_arrive.png', characterOverrides: { aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S03_D005', speaker: 'lysthea', expression: 'panicked', text: 'Syukurlah... Maaf mengganggu selarut ini. Tapi bisakah kau melihat benda ini sebentar?!', backgroundOverride: 'ch1/cg_ch1_s03_lys_arrive.png', characterOverrides: { aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S03_D006', speaker: 'aeterna', expression: 'neutral', text: 'Dia menyodorkan sebuah bola kristal logam ke atas meja. Intinya retak dan memancarkan kilatan energi biru yang sangat liar.', backgroundOverride: 'ch1/cg_core_slam.png', characterOverrides: { aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S03_D007', speaker: 'lysthea', expression: 'panicked', text: 'Ini kristal core dari Defense Server distrik ketujuh. Pelindung distrik ini akan runtuh kalau sistemnya gagal me-reboot!', backgroundOverride: 'ch1/cg_core_slam.png', characterOverrides: { aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S03_D008', speaker: 'aeterna', expression: 'neutral', text: 'Aku mengambil kristal itu. Energinya bocor karena ada beberapa baris "Rune" yang mengalami konflik logika. Layaknya sebuah memory leak.' },
      { id: 'CH1_S03_D009', speaker: 'aeterna', expression: 'neutral', text: 'Hanya butuh sinkronisasi ulang. Aku menyentuh titik pusat sirkuitnya, mengeksekusi override command di kepalaku untuk menutup celah error tersebut.', audioSrc: '/assets/audio/sfx/magic_repair.ogg', backgroundOverride: 'ch1/cg_casual_repair.png', characterOverrides: { aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S03_D010', speaker: 'aeterna', expression: 'neutral', text: 'Dalam beberapa detik, cahaya liar itu padam. Sirkuit sihir di dalamnya kembali tersambung dan berputar mulus.', backgroundOverride: 'ch1/cg_casual_repair.png' },
      { id: 'CH1_S03_D011', speaker: 'aeterna', expression: 'neutral', text: 'Sudah ku-patch. Sistem pelindungnya seharusnya otomatis online lagi sekarang.', backgroundOverride: 'ch1/cg_ch1_s03_lys_shock.png', characterOverrides: { aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S03_D012', speaker: 'lysthea', expression: 'shocked', text: '...Hah?', backgroundOverride: 'ch1/cg_ch1_s03_lys_shock.png', characterOverrides: { aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S03_D013', speaker: 'lysthea', expression: 'shocked', text: '(Tidak mungkin... Menulis ulang konfigurasi Origin Rune tanpa merapal mantra?! Bahkan divisi elitku butuh waktu berhari-hari untuk kasus ini!)', backgroundOverride: 'ch1/cg_ch1_s03_lys_shock.png', characterOverrides: { aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S03_D014', speaker: 'aeterna', expression: 'smug', text: 'Biaya perbaikannya sepuluh Silver Coins. Bisa bayar tunai sekarang?' }
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
    background: 'ch1/bg_mechanic_shop_rain.png',
    characters: [
      { characterId: 'aeterna', position: 'right', initialExpression: 'neutral' },
      { characterId: 'lysthea', position: 'left', initialExpression: 'cool' },
      { characterId: 'abyssal_assassin', position: 'center', initialExpression: 'menacing' },
    ],
    dialogues: [
      { id: 'CH1_S04_D001', speaker: 'system', expression: 'neutral', text: '*CRASH!!!* Kaca jendela khusus bengkel pecah berkeping-keping.', autoAdvance: true, autoAdvanceDelay: 1000, backgroundOverride: 'ch1/cg_ch1_s04_assassin_entry.png', characterOverrides: { aeterna: 'none', lysthea: 'none', abyssal_assassin: 'none' } },
      { id: 'CH1_S04_D002', speaker: 'abyssal_assassin', expression: 'menacing', text: 'Ketemu kau... Relik itu... Hancurlah bersamanya!', backgroundOverride: 'ch1/cg_ch1_s04_assassin_entry.png', characterOverrides: { aeterna: 'none', lysthea: 'none', abyssal_assassin: 'none' } },
      { id: 'CH1_S04_D003', speaker: 'lysthea', expression: 'cool', text: 'Awas! Mundur, Engineer! Biar aku yang menanganinya!', backgroundOverride: 'ch1/cg_ch1_s04_lys_protect.png', characterOverrides: { aeterna: 'none', lysthea: 'none', abyssal_assassin: 'none' } },
      { id: 'CH1_S04_D004', speaker: 'aeterna', expression: 'sigh', text: '(Dalam hati) Kalau kubiarkan dia bertarung, bengkel ini akan rata dengan tanah. Kaca jendela itu saja sudah merugikanku tiga puluh Gold Coins...', characterOverrides: { aeterna: 'sigh', lysthea: 'cool' } },
      { id: 'CH1_S04_D005', speaker: 'aeterna', expression: 'neutral', text: '(Dalam hati) Lebih baik aku cabut saja root access iblis ini secara manual.', backgroundOverride: 'ch1/cg_ch1_s04_aeterna_authority.png', characterOverrides: { aeterna: 'none', lysthea: 'none', abyssal_assassin: 'none' } },
      { id: 'CH1_S04_D006', speaker: 'narrator', expression: 'neutral', text: 'Tanpa beranjak, Aeterna mengangkat tangannya dengan santai dan menjentikkan jari. Sebuah denyut tak kasat mata menyapu seluruh ruangan.', backgroundOverride: 'ch1/cg_ch1_s04_aeterna_authority.png', characterOverrides: { abyssal_assassin: 'none', aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S04_D007', speaker: 'abyssal_assassin', expression: 'terrified', text: 'T-Tekanan ini... Root Access?! Tidak mungkin... Kau—', backgroundOverride: 'ch1/cg_dust_snap.png', characterOverrides: { abyssal_assassin: 'none', aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S04_D008', speaker: 'narrator', expression: 'neutral', text: 'Sebelum iblis itu menyelesaikan kalimatnya, tubuhnya terurai menjadi untaian kode cahaya, lalu hancur sepenuhnya menjadi debu merah.', backgroundOverride: 'ch1/cg_dust_snap.png', characterOverrides: { abyssal_assassin: 'none', aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S04_D009', speaker: 'lysthea', expression: 'crying', text: 'Hak Akses Mutlak ini... Otoritas dari inti penciptaan...', backgroundOverride: 'ch1/cg_ch1_s04_lys_crying.png', characterOverrides: { abyssal_assassin: 'leave', aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S04_D010', speaker: 'lysthea', expression: 'crying', text: 'Anda... Anda adalah The Weaver of Fate? Sang Arsitek Utama yang merancang dunia ini sepuluh ribu tahun yang lalu?', backgroundOverride: 'ch1/cg_ch1_s04_lys_crying.png', characterOverrides: { abyssal_assassin: 'leave', aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S04_D011', speaker: 'aeterna', expression: 'neutral', text: 'Aku menghela napas, menatap wanita di depanku. Pancaran energinya yang murni dan terstruktur... tidak salah lagi.', backgroundOverride: 'ch1/cg_ch1_s04_lys_crying.png', characterOverrides: { abyssal_assassin: 'leave', aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S04_D012', speaker: 'aeterna', expression: 'smile', text: 'Bangunlah. Lantainya kotor dan penuh pecahan kaca. Lama tidak berjumpa... Goddess of Order.', backgroundOverride: 'ch1/cg_ch1_s04_aeterna_smile.png', characterOverrides: { abyssal_assassin: 'leave', aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S04_D013', speaker: 'lysthea', expression: 'shocked', text: 'Anda... mengenali saya?', backgroundOverride: 'ch1/cg_ch1_s04_aeterna_smile.png', characterOverrides: { aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S04_D014', speaker: 'aeterna', expression: 'lazy', text: 'Tentu saja aku ingat. Kau yang menanggung beban sebagai Administrator sistem ini setelah aku pergi berlibur panjang, kan?' },
      { id: 'CH1_S04_D015', speaker: 'aeterna', expression: 'neutral', text: 'Terima kasih sudah menjaga server-nya tetap online selama sepuluh ribu tahun, Lysthea. Kerja yang bagus.' },
      { id: 'CH1_S04_D016', speaker: 'lysthea', expression: 'crying', text: 'Mendengar pujian sederhana itu, pertahanan emosi sang Grand Saintess runtuh sepenuhnya.', characterOverrides: { aeterna: 'neutral', lysthea: 'crying' } }
    ],
    unlockEvidenceIds: [],
  }
];
