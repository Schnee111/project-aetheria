# Asset Checklist - Chapter 1: The Reincarnated Architect

Dokumen ini berisi daftar seluruh aset *placeholder* / final yang dibutuhkan untuk menjalankan Scene 1 hingga 4 secara visual di dalam engine React kita.

Semua gambar harus diletakkan di `public/assets/` sesuai strukturnya.

## 1. Backgrounds (`public/assets/backgrounds/`)
| Filename | Keterangan / Deskripsi | Status |
|----------|-------------------------|--------|
| `bg_earth_office.jpg` | Ruang kerja/kantor IT Aeterna di Bumi, banyak monitor dengan baris kode pemrograman. | [ ] Todo |
| `bg_earth_street.jpg` | Trotoar kota modern di Bumi, sore hari yang cerah. | [ ] Todo |
| `cg_truck_hit.jpg` | CG layar penuh: Truk sayur melaju kencang ke arah pemain / efek blur tabrakan. | [ ] Todo |
| `bg_black.jpg` | Gambar hitam murni solid untuk efek mati/kegelapan. | [ ] Todo |
| `bg_mechanic_shop.jpg` | Interior bengkel Aeterna. Berantakan tapi hangat. Ada jendela melihatkan kota masa depan. | [ ] Todo |
| `bg_mechanic_shop_rain.jpg` | Bengkel Aeterna saat di luar hujan deras (pencahayaan lebih gelap, dramatis). | [ ] Todo |
| `bg_mechanic_shop_broken.jpg` | Bengkel Aeterna setelah kaca/pintu dihancurkan oleh Iblis. Berantakan. | [ ] Todo |

## 2. Character Sprites (`public/assets/characters/`)
*Catatan: Engine otomatis mencari path `/assets/characters/[id]/[id]_[expression].png`.*

### Aeterna (`/aeterna/`)
| Expression / Filename | Deskripsi | Status |
|-----------------------|-----------|--------|
| `aeterna_neutral.png` | Berdiri biasa (tangan di saku, tanpa memegang apa pun). Digunakan di seluruh adegan Aetheria. | [ ] Todo |
| `aeterna_matcha.png`  | Berdiri biasa, memegang cup matcha plastik di tangan kanannya. Khusus Scene Bumi. | [ ] Todo |

### Lysthea (`/lysthea/`)
| Expression / Filename | Deskripsi | Status |
|-----------------------|-----------|--------|
| `lysthea_hidden.png` | Memakai jubah/tudung abu-abu menutupi wajahnya. | [ ] Todo |
| `lysthea_shocked.png` | Masih berjubah, tapi tangannya sedikit gemetar kaget. | [ ] Todo |
| `lysthea_cool.png` | Tudung lepas. *Battle mode*, wajah cantik namun dingin. | [ ] Todo |
| `lysthea_crying.png` | Menangis terharu, wajah suci, berlutut / pose hormat. | [ ] Todo |

### Tetangga Elf (`/elf_neighbor/`)
| Expression / Filename | Deskripsi | Status |
|-----------------------|-----------|--------|
| `elf_neighbor_panicked.png`| Panik membawa *Mana Rice Cooker* rusak. | [ ] Todo |

### Abyssal Assassin (`/abyssal_assassin/`)
| Expression / Filename | Deskripsi | Status |
|-----------------------|-----------|--------|
| `abyssal_assassin_menacing.png`| Bayangan hitam besar berduri, menyeramkan. | [ ] Todo |
| `abyssal_assassin_terrified.png`| Membeku ketakutan di udara, melotot ngeri. | [ ] Todo |

## 3. Audio & SFX (`public/assets/audio/`)
*(Opsional: Bisa ditambahkan ke dalam scenes.ts jika menggunakan Howler.js)*

* **BGM:**
  * Bossa Nova (Earth)
  * Lazy Acoustic (Aetheria Shop)
  * Mysterious Cello (Lysthea enters)
  * Battle Theme (Abyssal Assassin)
  * Holy/Melancholy Harp (The Revelation)
* **SFX:**
  * Klakson Truk & Suara Tabrakan Kartun (*Honk / BAM*)
  * Bel Pintu Bengkel (*Kring!*)
  * Suara Kaca Pecah (*Crash!*)
