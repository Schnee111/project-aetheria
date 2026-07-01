import type { Scene } from '../../types';

export const scenes: Scene[] = [
  // SCENE 0: EARTH (Office)
  {
    id: 'CH1_S00',
    chapterId: 'CH1',
    title: 'Kehidupan sebagai Engineer',
    titleEn: 'Life as an Engineer',
    location: 'Bumi - Kantor IT',
    locationEn: 'Earth - IT Office',
    mode: 'visual_novel',
    background: 'ch1/bg_earth_office.webp',
    characters: [],
    dialogues: [
      { id: 'CH1_S00_D001', speaker: 'system', expression: 'neutral', text: '*TAP TAP TAP TAP TAP...*', textEn: '*TAP TAP TAP TAP TAP...*', autoAdvance: true, autoAdvanceDelay: 1200, audioSrc: '/assets/audio/sfx/keyboard_typing.mp3' },
      { id: 'CH1_S00_D002', speaker: 'aeterna', expression: 'neutral', text: 'Kenapa production server-nya crash? Padahal di local environment semuanya berjalan mulus...', textEn: 'Why is the production server crashing? Everything ran perfectly in the local environment...' },
      { id: 'CH1_S00_D003', speaker: 'aeterna', expression: 'neutral', text: 'Ah. Ada typo di baris 402... null pointer exception. Pantas saja pipeline CI/CD di monitor ini merah membara.', textEn: 'Ah. A typo on line 402... null pointer exception. No wonder the CI/CD pipeline on this monitor is burning red.' },
      { id: 'CH1_S00_D004', speaker: 'system', expression: 'neutral', text: '*TAP!*', textEn: '*TAP!*', autoAdvance: true, autoAdvanceDelay: 800, audioSrc: '/assets/audio/sfx/keyboard_press.mp3' },
      { id: 'CH1_S00_D005', speaker: 'aeterna', expression: 'neutral', text: 'Commit, push, lalu merge pull request ke main branch... Oke, status deploy di server berubah hijau. Selesai juga tugas sprint minggu ini.', textEn: 'Commit, push, merge the pull request to main... Okay, deploy status just went green. That wraps up this week\'s sprint.' },
      { id: 'CH1_S00_D006', speaker: 'aeterna', expression: 'neutral', text: 'Sudah jam 6 sore. Waktunya pulang, mampir ke minimarket untuk membeli matcha latte dingin kesukaanku.', textEn: 'It\'s already 6 PM. Time to head home — maybe swing by the convenience store for an iced matcha latte.' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_S01A',
  },

  // SCENE 1A: EARTH (Normal Life)
  {
    id: 'CH1_S01A',
    chapterId: 'CH1',
    title: 'Kehidupan yang Terlalu Normal',
    titleEn: 'A Life Too Ordinary',
    location: 'Bumi - Trotoar Kota',
    locationEn: 'Earth - City Sidewalk',
    mode: 'visual_novel',
    background: 'ch1/bg_earth_street.webp',
    characters: [
      { characterId: 'aeterna', position: 'center', initialExpression: 'matcha' },
    ],
    dialogues: [
      { id: 'CH1_S01A_D001', speaker: 'aeterna', expression: 'matcha', text: 'Berjalan kaki menyusuri trotoar di bawah langit senja kota Bumi setelah jam lembur kerja keras itu rasanya menenangkan.', textEn: 'Walking along the sidewalk under the evening sky after a long overtime shift... it\'s oddly peaceful.' },
      { id: 'CH1_S01A_D002', speaker: 'aeterna', expression: 'matcha', text: 'Meskipun lelah seharian menatap monitor, setidaknya gajiku sangat stabil. Cukup untuk langganan streaming, bayar sewa apartemen kecil, dan menikmati segelas matcha latte dingin ini.', textEn: 'Exhausting as it is staring at a screen all day, at least the paycheck is steady. Enough for streaming subscriptions, a tiny apartment, and this iced matcha latte.' },
      { id: 'CH1_S01A_D003', speaker: 'aeterna', expression: 'matcha', text: 'Bisa dibilang rutinitas harianku berjalan damai dan terjadwal secara logis.', textEn: 'You could say my daily routine runs peacefully — logical, well-scheduled.' },
      { id: 'CH1_S01A_D004', speaker: 'aeterna', expression: 'matcha', text: 'Satu-satunya kekurangannya adalah, tidak ada magic di dunia ini.', textEn: 'The only downside is... there\'s no magic in this world.' },
      { id: 'CH1_S01A_D005', speaker: 'aeterna', expression: 'matcha', text: 'Seandainya aku bisa memprogram sirkuit mana agar matcha latte di genggamanku ini menyeduh dirinya sendiri secara otomatis, pasti hidup ini jauh lebih efisien.', textEn: 'If only I could program a mana circuit to brew this matcha latte automatically... now that would make life infinitely more efficient.' },
      { id: 'CH1_S01A_D006', speaker: 'aeterna', expression: 'matcha', text: 'Aku melangkahkan kakiku ke zebra cross, menyeberang jalanan sepi yang biasanya aman ini.', textEn: 'I stepped onto the crosswalk, crossing this quiet street that\'s usually safe.' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_S01B',
  },

  // SCENE 1B: EARTH (Truck Hit)
  {
    id: 'CH1_S01B',
    chapterId: 'CH1',
    title: 'The Truck',
    titleEn: 'The Truck',
    location: 'Bumi - Jalan Raya',
    locationEn: 'Earth - Main Road',
    mode: 'visual_novel',
    background: 'ch1/cg_truck_hit.webp',
    characters: [],
    dialogues: [
      { id: 'CH1_S01B_D001', speaker: 'system', expression: 'neutral', text: '*HONK!!!*', textEn: '*HONK!!!*', audioSrc: '/assets/audio/sfx/car_horn.ogg' },
      { id: 'CH1_S01B_D002', speaker: 'system', expression: 'neutral', text: '*CRASH!!!*', textEn: '*CRASH!!!*', audioSrc: '/assets/audio/sfx/car_crash.ogg' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_S01C',
  },

  // SCENE 1C: EARTH (Black Screen / Game Over)
  {
    id: 'CH1_S01C',
    chapterId: 'CH1',
    title: 'Cuti Panjang',
    titleEn: 'Extended Leave',
    location: 'Bumi - ?',
    locationEn: 'Earth - ?',
    mode: 'visual_novel',
    background: 'ch1/bg_black.webp',
    characters: [],
    dialogues: [
      { id: 'CH1_S01C_D001', speaker: 'aeterna', expression: 'neutral', text: 'Truk? Serius?', textEn: 'A truck? Seriously?' },
      { id: 'CH1_S01C_D002', speaker: 'aeterna', expression: 'neutral', text: 'Mati ditabrak truk di tengah senja seindah ini adalah metode perpindahan dunia yang sangat klise dan tidak kreatif.', textEn: 'Getting hit by a truck on a sunset this beautiful — what a cliché, uncreative way to get isekai\'d.' },
      { id: 'CH1_S01C_D003', speaker: 'aeterna', expression: 'neutral', text: 'Yah, sudahlah. Anggap saja aku mengambil cuti panjang tak berbayar.', textEn: 'Well, whatever. Consider it an extended unpaid leave.' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_S01D',
  },

  // SCENE 1D: AETHERIA (Reincarnation Cinematic)
  {
    id: 'CH1_S01D',
    chapterId: 'CH1',
    title: 'Dunia Baru',
    titleEn: 'A New World',
    location: 'Aetheria',
    locationEn: 'Aetheria',
    mode: 'visual_novel',
    background: 'ch1/cg_aetheria_planet.mp4',
    characters: [],
    dialogues: [
      // ── Video 1: Planet (8s) ──
      { id: 'CH1_S01D_D001', speaker: 'narrator', expression: 'neutral', text: 'Aetheria.', textEn: 'Aetheria.', backgroundOverride: 'ch1/cg_aetheria_planet.mp4', audioSrc: '/assets/audio/sfx/ethereal_chime.ogg', autoAdvance: true, unskippable: true, autoAdvanceDelay: 3000 },
      { id: 'CH1_S01D_D002', speaker: 'narrator', expression: 'neutral', text: 'Sebuah dimensi di mana hukum fisika tunduk pada kehendak sihir.', textEn: 'A dimension where the laws of physics bow to the will of magic.', autoAdvance: true, unskippable: true, autoAdvanceDelay: 5000 },
      // ── Video 2: Metropolis (8s) ──
      { id: 'CH1_S01D_D003', speaker: 'narrator', expression: 'neutral', text: 'Di sini, peradaban tidak dibangun dengan baja dan minyak.', textEn: 'Here, civilization is not built with steel and oil.', backgroundOverride: 'ch1/cg_aetheria_metropolis.mp4', autoAdvance: true, unskippable: true, autoAdvanceDelay: 4000 },
      { id: 'CH1_S01D_D004', speaker: 'narrator', expression: 'neutral', text: 'Melainkan dengan sirkuit siber dan kristal mana yang berdenyut energi.', textEn: 'But with cyber circuits and mana crystals pulsing with energy.', autoAdvance: true, unskippable: true, autoAdvanceDelay: 4000 },
      // ── Video 3: Street (8s) ──
      { id: 'CH1_S01D_D005', speaker: 'narrator', expression: 'neutral', text: 'Sihir bukan lagi dongeng mistis.', textEn: 'Magic is no longer a mystical fairy tale.', backgroundOverride: 'ch1/cg_aetheria_street.mp4', autoAdvance: true, unskippable: true, autoAdvanceDelay: 3500 },
      { id: 'CH1_S01D_D006', speaker: 'narrator', expression: 'neutral', text: 'Ia adalah teknologi. Ia adalah napas kehidupan sehari-hari.', textEn: 'It is technology. It is the breath of everyday life.', autoAdvance: true, unskippable: true, autoAdvanceDelay: 4500 },
      // ── Video 4: Baby (8s) ──
      { id: 'CH1_S01D_D007', speaker: 'narrator', expression: 'neutral', text: 'Dan di dunia yang megah inilah... jiwaku yang terlempar dari Bumi menemukan wadah barunya.', textEn: 'And in this magnificent world... my soul, flung from Earth, found its new vessel.', backgroundOverride: 'ch1/cg_isekai_baby.mp4', autoAdvance: true, unskippable: true, autoAdvanceDelay: 5000 },
      { id: 'CH1_S01D_D008', speaker: 'narrator', expression: 'neutral', text: 'Seorang anak kecil. Keluarga baru. Kehidupan kedua yang baru saja dimulai.', textEn: 'A small child. A new family. A second life, just beginning.', autoAdvance: true, unskippable: true, autoAdvanceDelay: 3000 }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_S02A',
  },

  // SCENE 2A: AETHERIA (Magitech Workshop - Aeterna's Monologue)
  {
    id: 'CH1_S02A',
    chapterId: 'CH1',
    title: 'Aetheria - Bengkel Magitech',
    titleEn: 'Aetheria - Magitech Workshop',
    location: 'Aeterna\'s Magitech Fix',
    locationEn: 'Aeterna\'s Magitech Fix',
    mode: 'visual_novel',
    background: 'ch1/bg_mechanic_shop_corner.webp',
    characters: [
      { characterId: 'aeterna', position: 'center', initialExpression: 'neutral' },
    ],
    dialogues: [
      { id: 'CH1_S02A_D001', speaker: 'aeterna', expression: 'neutral', text: '23 tahun telah berlalu sejak kecelakaan konyol di Bumi itu.', textEn: 'Twenty-three years have passed since that ridiculous accident on Earth.' },
      { id: 'CH1_S02A_D002', speaker: 'aeterna', expression: 'neutral', text: 'Di bawah bimbingan orang tuaku di kehidupan baru ini, aku belajar menguasai Magitech dan meneruskan bengkel tua peninggalan mereka.', textEn: 'Under the guidance of my parents in this new life, I mastered Magitech and inherited their old workshop.' },
      { id: 'CH1_S02A_D003', speaker: 'aeterna', expression: 'neutral', text: 'Aku tidak punya keluhan. Tidak ada ramalan pahlawan atau kewajiban mengalahkan Raja Iblis.', textEn: 'No complaints here. No hero prophecy, no obligation to defeat the Demon King.' },
      { id: 'CH1_S02A_D004', speaker: 'aeterna', expression: 'neutral', text: 'Hanya hari-hari tenang sebagai Low-class Magitech Engineer, dan aku sangat menyukai fakta itu.', textEn: 'Just quiet days as a low-class Magitech Engineer — and I love that for myself.' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_S02B',
  },

  // SCENE 2B: AETHERIA (Doorbell Rings - Elf Arrives)
  {
    id: 'CH1_S02B',
    chapterId: 'CH1',
    title: 'Tetangga Berisik',
    titleEn: 'The Noisy Neighbor',
    location: 'Aeterna\'s Magitech Fix',
    locationEn: 'Aeterna\'s Magitech Fix',
    mode: 'visual_novel',
    background: 'ch1/bg_mechanic_shop_door.webp',
    characters: [
      { characterId: 'aeterna', position: 'right', initialExpression: 'neutral' },
      { characterId: 'elf_neighbor', position: 'left', initialExpression: 'panicked' },
    ],
    dialogues: [
      { id: 'CH1_S02B_D001', speaker: 'system', expression: 'neutral', text: '*KRING!*', textEn: '*DING!*', autoAdvance: true, autoAdvanceDelay: 1000, audioSrc: '/assets/audio/sfx/shop_bell.ogg' },
      { id: 'CH1_S02B_D002', speaker: 'elf_neighbor', expression: 'panicked', text: 'Aeterna! Tolong aku! Ibuku akan mengamuk kalau \"Mana Rice Cooker\" ini tidak selesai sebelum jam makan malam!', textEn: 'Aeterna! Please help! My mom will lose it if this Mana Rice Cooker isn\'t fixed by dinnertime!' },
      { id: 'CH1_S02B_D002b', speaker: 'elf_neighbor', expression: 'panicked', text: 'Sirkuit pemanasnya terbakar total. Butuh berapa hari untuk membongkar dan merangkai ulang Rune-nya?!', textEn: 'The heating circuit is completely fried. How many days to disassemble and rebuild the runes?!' },
      { id: 'CH1_S02B_D003', speaker: 'narrator', expression: 'sigh', text: 'Aku menghela napas, meletakkan ujung telunjukku langsung pada kristal sirkuit mana yang hangus itu.', textEn: 'I let out a sigh, placing my index finger directly on the charred mana circuit crystal.', backgroundOverride: 'ch1/bg_mechanic_shop_door_pov.webp' },
      { id: 'CH1_S02B_D004', speaker: 'narrator', expression: 'neutral', text: '*BEEP... ZZZT!* Aku menata ulang baris algoritma Rune-nya langsung dari luar, menyambung kabel-kabel mana yang putus hanya dengan kendali pikiranku. Tanpa obeng. Tanpa tang.', textEn: '*BEEP... ZZZT!* I rewrote the rune algorithm lines from the outside — reconnecting severed mana cables with nothing but thought. No screwdriver. No pliers.', audioSrc: '/assets/audio/sfx/magic_repair.ogg', backgroundOverride: 'ch1/bg_mechanic_shop_door_pov.webp' },
      { id: 'CH1_S02B_D005', speaker: 'aeterna', expression: 'neutral', text: 'Tiga detik. Bawa pulang.', textEn: 'Three seconds. Take it home.', backgroundOverride: 'ch1/bg_mechanic_shop_door_pov.webp' },
      { id: 'CH1_S02B_D006', speaker: 'elf_neighbor', expression: 'relieved', text: 'H-Hah?! Tiga detik?! Demi para Dewa... kau memang penyelamat hidupku, Aeterna!', textEn: 'W-What?! Three seconds?! By the gods... you\'re a lifesaver, Aeterna!' },
      { id: 'CH1_S02B_D007', speaker: 'narrator', expression: 'neutral', text: 'Dia melongo keheranan, menaruh beberapa keping koin perunggu di meja, lalu buru-buru berlari pulang sambil berteriak terima kasih.', textEn: 'She gawked in disbelief, dropped a few bronze coins on the table, then dashed home shouting her thanks.', audioSrc: '/assets/audio/sfx/coins.ogg' },
      { id: 'CH1_S02B_D008', speaker: 'aeterna', expression: 'smug', text: 'Menjadi Arsitek Sistem di Bumi ternyata memberiku semacam \"Cheat Skill\" di dunia ini. Logika pemrograman dan sirkuit sihir pada dasarnya adalah hal yang sama.', textEn: 'Turns out being a Systems Architect on Earth gave me something like a cheat skill in this world. Programming logic and magic circuits are basically the same thing.', backgroundOverride: 'ch1/bg_mechanic_shop_corner.webp', characterOverrides: { elf_neighbor: 'leave' } },
      { id: 'CH1_S02B_D009', speaker: 'aeterna', expression: 'lazy', text: 'Tapi menggunakannya untuk hal-hal besar terlalu merepotkan. Aku hanya ingin hidup santai, jauh dari drama lembur.', textEn: 'But using it for anything big is way too much trouble. I just want a chill life — far from overtime drama.', backgroundOverride: 'ch1/bg_mechanic_shop_corner.webp' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_S03',
  },

  // SCENE 3: UNINVITED GUEST
  {
    id: 'CH1_S03',
    chapterId: 'CH1',
    title: 'Tamu Tak Diundang',
    titleEn: 'The Uninvited Guest',
    location: 'Aeterna\'s Magitech Fix',
    locationEn: 'Aeterna\'s Magitech Fix',
    mode: 'visual_novel',
    background: 'ch1/bg_mechanic_shop_rain.webp',
    bgm: '/assets/audio/bgm/rain_loop.ogg',
    characters: [
      { characterId: 'aeterna', position: 'right', initialExpression: 'neutral' },
      { characterId: 'lysthea', position: 'left', initialExpression: 'hidden' },
    ],
    dialogues: [
      { id: 'CH1_S03_D001', speaker: 'system', expression: 'neutral', text: '*BLAAARRR...*', textEn: '*RRRUMBLE...*', autoAdvance: true, autoAdvanceDelay: 1500, audioSrc: '/assets/audio/sfx/thunder.ogg' },
      { id: 'CH1_S03_D002', speaker: 'system', expression: 'neutral', text: '*TOK TOK TOK!* Terdengar ketukan keras dari luar, disusul suara bel bengkel yang berbunyi panik.', textEn: '*BANG BANG BANG!* Loud pounding from outside, followed by the frantic ring of the workshop bell.', audioSrc: '/assets/audio/sfx/shop_bell.ogg' },
      { id: 'CH1_S03_D003', speaker: 'lysthea', expression: 'hidden', text: 'Permisi! Apakah ada mekanik di dalam?! Tolong buka pintunya!', textEn: 'Hello! Is there a mechanic in there?! Please open the door!' },
      { id: 'CH1_S03_D004', speaker: 'narrator', expression: 'sigh', text: 'Aku membuka pintu kayu bengkelku. Seorang wanita berjubah basah kuyup berdiri menggigil di bawah hujan. Wajahnya terlihat sangat panik.', textEn: 'I opened the workshop\'s wooden door. A woman in a soaked robe stood shivering in the rain. Her face was sheer panic.', backgroundOverride: 'ch1/cg_ch1_s03_lys_arrive.webp', characterOverrides: { aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S03_D005', speaker: 'lysthea', expression: 'panicked', text: 'Syukurlah... Maaf mengganggu selarut ini. Tapi bisakah kau melihat benda ini sebentar?!', textEn: 'Thank goodness... Sorry to bother you this late. But could you take a look at this?!', backgroundOverride: 'ch1/cg_ch1_s03_lys_arrive.webp', characterOverrides: { aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S03_D006', speaker: 'narrator', expression: 'neutral', text: 'Dia menyodorkan sebuah bola kristal logam ke atas meja. Intinya retak dan memancarkan kilatan energi biru yang sangat liar.', textEn: 'She slammed a metal-cased crystal orb onto the table. Its core was cracked, shooting wild bursts of blue energy.', backgroundOverride: 'ch1/cg_core_slam.webp', characterOverrides: { aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S03_D007', speaker: 'lysthea', expression: 'panicked', text: 'Ini kristal core dari Defense Server distrik ketujuh. Pelindung distrik ini akan runtuh kalau sistemnya gagal me-reboot!', textEn: 'This is the crystal core from the Seventh District\'s Defense Server. The district\'s barrier will collapse if the system fails to reboot!', backgroundOverride: 'ch1/cg_core_slam.webp', characterOverrides: { aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S03_D008', speaker: 'narrator', expression: 'neutral', text: 'Aku mengambil kristal itu. Energinya bocor karena ada beberapa baris \"Rune\" yang mengalami konflik logika. Layaknya sebuah memory leak.', textEn: 'I picked up the crystal. Energy was leaking because a few rune lines had logic conflicts. Basically a memory leak.' },
      { id: 'CH1_S03_D009', speaker: 'narrator', expression: 'neutral', text: 'Hanya butuh sinkronisasi ulang. Aku menyentuh titik pusat sirkuitnya, mengeksekusi override command di kepalaku untuk menutup celah error tersebut.', textEn: 'Just needs a resync. I touched the circuit\'s core point, executing an override command in my head to patch the error gap.', audioSrc: '/assets/audio/sfx/magic_repair.ogg', backgroundOverride: 'ch1/cg_casual_repair.webp', characterOverrides: { aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S03_D010', speaker: 'narrator', expression: 'neutral', text: 'Dalam beberapa detik, cahaya liar itu padam. Sirkuit sihir di dalamnya kembali tersambung dan berputar mulus.', textEn: 'Within seconds, the wild light died down. The magic circuit inside reconnected and spun smoothly.', backgroundOverride: 'ch1/cg_casual_repair.webp' },
      { id: 'CH1_S03_D011', speaker: 'aeterna', expression: 'neutral', text: 'Sudah ku-patch. Sistem pelindungnya seharusnya otomatis online lagi sekarang.', textEn: 'Patched. The barrier system should be back online now.', backgroundOverride: 'ch1/cg_ch1_s03_lys_shock.webp', characterOverrides: { aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S03_D012', speaker: 'lysthea', expression: 'shocked', text: '...Hah?', textEn: '...What?', backgroundOverride: 'ch1/cg_ch1_s03_lys_shock.webp', characterOverrides: { aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S03_D013', speaker: 'lysthea', expression: 'shocked', text: '(Tidak mungkin... Menulis ulang konfigurasi Origin Rune tanpa merapal mantra?! Bahkan divisi elitku butuh waktu berhari-hari untuk kasus ini!)', textEn: '(Impossible... Rewriting an Origin Rune configuration without chanting?! Even my elite division takes days for something like this!)', backgroundOverride: 'ch1/cg_ch1_s03_lys_shock.webp', characterOverrides: { aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S03_D014', speaker: 'aeterna', expression: 'smug', text: 'Biaya perbaikannya sepuluh Silver Coins. Bisa bayar tunai sekarang?', textEn: 'That\'ll be ten Silver Coins. Cash is fine.' }
    ],
    unlockEvidenceIds: [],
    nextSceneId: 'CH1_S04',
  },

  // SCENE 4: THE REVELATION
  {
    id: 'CH1_S04',
    chapterId: 'CH1',
    title: 'The Revelation',
    titleEn: 'The Revelation',
    location: 'Aeterna\'s Magitech Fix',
    locationEn: 'Aeterna\'s Magitech Fix',
    mode: 'visual_novel',
    background: 'ch1/bg_mechanic_shop_rain.webp',
    characters: [
      { characterId: 'aeterna', position: 'right', initialExpression: 'neutral' },
      { characterId: 'lysthea', position: 'left', initialExpression: 'cool' },
      { characterId: 'abyssal_assassin', position: 'center', initialExpression: 'menacing' },
    ],
    dialogues: [
      { id: 'CH1_S04_D001', speaker: 'system', expression: 'neutral', text: '*CRASH!!!* Kaca jendela khusus bengkel pecah berkeping-keping.', textEn: '*CRASH!!!* The workshop\'s reinforced window shattered into pieces.', autoAdvance: true, autoAdvanceDelay: 1000, backgroundOverride: 'ch1/cg_ch1_s04_assassin_entry.webp', characterOverrides: { aeterna: 'none', lysthea: 'none', abyssal_assassin: 'none' } },
      { id: 'CH1_S04_D002', speaker: 'abyssal_assassin', expression: 'menacing', text: 'Ketemu kau... Relik itu... Hancurlah bersamanya!', textEn: 'Found you... That relic... perish with it!', backgroundOverride: 'ch1/cg_ch1_s04_assassin_entry.webp', characterOverrides: { aeterna: 'none', lysthea: 'none', abyssal_assassin: 'none' } },
      { id: 'CH1_S04_D003', speaker: 'lysthea', expression: 'cool', text: 'Awas! Mundur, Engineer! Biar aku yang menanganinya!', textEn: 'Look out! Back away, Engineer! I\'ll handle this!', backgroundOverride: 'ch1/cg_ch1_s04_lys_protect.webp', characterOverrides: { aeterna: 'none', lysthea: 'none', abyssal_assassin: 'none' } },
      { id: 'CH1_S04_D004', speaker: 'aeterna', expression: 'sigh', text: '(Dalam hati) Kalau kubiarkan dia bertarung, bengkel ini akan rata dengan tanah. Kaca jendela itu saja sudah merugikanku tiga puluh Gold Coins...', textEn: '(If I let her fight, this workshop will be leveled. That window alone already cost me thirty Gold Coins...)', characterOverrides: { aeterna: 'sigh', lysthea: 'cool' } },
      { id: 'CH1_S04_D005', speaker: 'aeterna', expression: 'neutral', text: '(Dalam hati) Lebih baik aku cabut saja root access iblis ini secara manual.', textEn: '(Might as well rip this demon\'s root access out manually.)', backgroundOverride: 'ch1/cg_ch1_s04_aeterna_authority.webp', characterOverrides: { aeterna: 'none', lysthea: 'none', abyssal_assassin: 'none' } },
      { id: 'CH1_S04_D006', speaker: 'narrator', expression: 'neutral', text: 'Tanpa beranjak, Aeterna mengangkat tangannya dengan santai dan menjentikkan jari. Sebuah denyut tak kasat mata menyapu seluruh ruangan.', textEn: 'Without even standing, Aeterna raised her hand casually and snapped her fingers. An invisible pulse swept the entire room.', backgroundOverride: 'ch1/cg_ch1_s04_aeterna_authority.webp', characterOverrides: { abyssal_assassin: 'none', aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S04_D007', speaker: 'abyssal_assassin', expression: 'terrified', text: 'T-Tekanan ini... Root Access?! Tidak mungkin... Kau—', textEn: 'T-This pressure... Root Access?! Impossible... You—', backgroundOverride: 'ch1/cg_dust_snap.webp', characterOverrides: { abyssal_assassin: 'none', aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S04_D008', speaker: 'narrator', expression: 'neutral', text: 'Sebelum iblis itu menyelesaikan kalimatnya, tubuhnya terurai menjadi untaian kode cahaya, lalu hancur sepenuhnya menjadi debu merah.', textEn: 'Before the demon could finish, its body unraveled into strands of light code — then disintegrated completely into red dust.', backgroundOverride: 'ch1/cg_dust_snap.webp', characterOverrides: { abyssal_assassin: 'none', aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S04_D009', speaker: 'lysthea', expression: 'crying', text: 'Hak Akses Mutlak ini... Otoritas dari inti penciptaan...', textEn: 'This Absolute Access... Authority from the core of creation...', backgroundOverride: 'ch1/cg_ch1_s04_lys_crying.webp', characterOverrides: { abyssal_assassin: 'leave', aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S04_D010', speaker: 'lysthea', expression: 'crying', text: 'Anda... Anda adalah The Weaver of Fate? Sang Arsitek Utama yang merancang dunia ini sepuluh ribu tahun yang lalu?', textEn: 'You... you\'re the Weaver of Fate? The Grand Architect who designed this world ten thousand years ago?', backgroundOverride: 'ch1/cg_ch1_s04_lys_crying.webp', characterOverrides: { abyssal_assassin: 'leave', aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S04_D011', speaker: 'narrator', expression: 'neutral', text: 'Aku menghela napas, menatap wanita di depanku. Pancaran energinya yang murni dan terstruktur... tidak salah lagi.', textEn: 'I sighed, gazing at the woman before me. That pure, structured energy signature... unmistakable.', backgroundOverride: 'ch1/cg_ch1_s04_lys_crying.webp', characterOverrides: { abyssal_assassin: 'leave', aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S04_D012', speaker: 'aeterna', expression: 'smile', text: 'Bangunlah. Lantainya kotor dan penuh pecahan kaca. Lama tidak berjumpa... Goddess of Order.', textEn: 'Stand up. The floor is filthy — covered in glass shards. It\'s been a while... Goddess of Order.', backgroundOverride: 'ch1/cg_ch1_s04_aeterna_smile.webp', characterOverrides: { abyssal_assassin: 'leave', aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S04_D013', speaker: 'lysthea', expression: 'shocked', text: 'Anda... mengenali saya?', textEn: 'You... know who I am?', backgroundOverride: 'ch1/cg_ch1_s04_aeterna_smile.webp', characterOverrides: { aeterna: 'none', lysthea: 'none' } },
      { id: 'CH1_S04_D014', speaker: 'aeterna', expression: 'lazy', text: 'Tentu saja aku ingat. Kau yang menanggung beban sebagai Administrator sistem ini setelah aku pergi berlibur panjang, kan?', textEn: 'Of course I remember. You\'re the one who took on the burden of System Administrator after I went on my... extended vacation, right?' },
      { id: 'CH1_S04_D015', speaker: 'aeterna', expression: 'neutral', text: 'Terima kasih sudah menjaga server-nya tetap online selama sepuluh ribu tahun, Lysthea. Kerja yang bagus.', textEn: 'Thank you for keeping the server online for ten thousand years, Lysthea. Good work.' },
      { id: 'CH1_S04_D016', speaker: 'lysthea', expression: 'crying', text: 'Mendengar pujian sederhana itu, pertahanan emosi sang Grand Saintess runtuh sepenuhnya.', textEn: 'Hearing that simple praise, the Grand Saintess\'s emotional defenses crumbled completely.', characterOverrides: { aeterna: 'neutral', lysthea: 'crying' } }
    ],
    unlockEvidenceIds: [],
  }
];
