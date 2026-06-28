# Project Aetheria — Visual Style Guide & Design Tokens

> **Art Direction:** Cozy Magitech Fantasy, Slice of Life.
> **Visual Ambiance:** Dark Mode Indigo Night, Glowing Mana Lines, Warm Golden Accents, Glassmorphism.

---

## 1. Color Palette & Design Tokens

Semua token warna didefinisikan di dalam `tailwind.config.ts` dan diimplementasikan secara konsisten menggunakan kelas utility Tailwind.

### 1.1 Cozy Indigo Night Backgrounds

Latar belakang menggunakan spektrum warna ungu gelap malam untuk menciptakan nuansa dunia magis yang hangat dan misterius.

| Token Tailwind | Hex | Penggunaan / Elemen |
| :--- | :--- | :--- |
| `navy-900` | `#0B0914` | Latar belakang layar utama / Obsidian Night |
| `navy-800` | `#131124` | Latar belakang Card, Panel Dialog / Midnight Violet |
| `navy-700` | `#1D1A39` | Panel sekunder, border tombol / Dark Mana Purple |
| `navy-600` | `#342F5E` | Garis tepi (*border*) default, divider |
| `navy-500` | `#524C8C` | Label tersier, ornamen redup |
| `navy-400` | `#948ECA` | Teks sekunder, label status |
| `navy-100` | `#F5F3FF` | Teks utama, kontras tinggi |

### 1.2 Magical Accent Colors

Warna aksen merepresentasikan energi magis, kekuatan artefak, dan interaktivitas sistem visual novel.

| Token Tailwind | Hex | Representasi Sihir / Penggunaan |
| :--- | :--- | :--- |
| `game-accent` | `#EC4899` | **Magic Pink/Rose**: Efek glow sihir, hover tombol utama, highlight interaktif |
| `game-warm` | `#F59E0B` | **Magitech Gold**: Tag nama pembicara, obeng stylus kuno, kursor bersinar |
| `game-weak` | `#A78BFA` | **Mana Violet**: Pendaran partikel mana, status daya rendah |

### 1.3 Character Speaker Colors

Pewarnaan nama pembicara dalam kotak dialog untuk diferensiasi visual yang cepat.

| Karakter | Hex | Token Tailwind | Deskripsi Karakteristik |
| :--- | :--- | :--- | :--- |
| **Aeterna** | `#F59E0B` | `game-warm` | Emas Logam / Arsitek Utama |
| **Lysthea** | `#A78BFA` | `game-weak` | Ungu Mana / Suci & Dingin |
| **Elf Neighbor**| `#10B981` | `emerald-500` | Hijau Daun / Tetangga Hutan |
| **Assassin** | `#EF4444` | `red-500` | Merah Crimson / Ancaman Abyssal |
| **System/Narrator**| `#948ECA` | `navy-400` | Lavender Muted / Teks Narasi |

---

## 2. Typography

Gaya huruf dirancang kontras antara tulisan berkelas (*heading*) dan kejelasan membaca dialog yang sangat nyaman (*body*).

### 2.1 Font Stack

*   **Heading / Title:** `Playfair Display` (Serif elegan untuk judul bab, menu utama, dan tajuk kartu).
*   **Body / Dialog / UI:** `Plus Jakarta Sans` (Sans-serif modern dengan keterbacaan tinggi untuk dialog teks panjang).

```css
--font-heading: 'Playfair Display', serif;
--font-body:    'Plus Jakarta Sans', sans-serif;
```

---

## 3. Component Design Patterns

### 3.1 Dialog Box (Visual Novel)

Kotak dialog menggunakan pola *glassmorphism* dengan latar belakang transparan gelap dan efek pendaran magis tipis.

```
Posisi:          Bagian bawah layar (bottom-6)
Lebar:           90% dari lebar layar (max-w-5xl)
Latar Belakang:  navy-800 (opasitas 80%) + backdrop-blur (md)
Border:          1px solid navy-600 (opasitas 50%)
Sisi Sudut:      16px (rounded-2xl)
```

*   **Speaker Tag**: Pojok kiri atas dialog box, dibingkai dengan `border-game-warm/50` berlatar belakang `bg-navy-900/95` padat untuk kenyamanan membaca.
*   **Typewriter Cursor**: Garis vertikal 3px berkedip lambat berwarna **Magitech Gold** dengan bayangan pendaran (`shadow-[0_0_8px_rgba(245,158,11,0.8)]`).

### 3.2 Choice Buttons (Tombol Pilihan)

Tombol interaktif saat menentukan dialog/tindakan.

*   **Default State:** `bg-navy-800/80` dengan `border-navy-600/50`.
*   **Selected / Hover State:** `bg-game-accent/20` dengan pinggiran `border-game-accent` dan bayangan cahaya Rose lembut (`shadow-[0_0_15px_rgba(236,72,153,0.3)]`).
*   **Hover Shine Effect:** Kilatan gradasi putih tipis menyapu tombol secara linear secara terus menerus selama di-hover.

---

## 4. Animations & Transitions

| Peristiwa (Event) | Properti | Durasi | Easing |
| :--- | :--- | :--- | :--- |
| Transisi Layar / Cut | `opacity` | 500ms | `ease-in-out` |
| Karakter Masuk (Sprite) | `translateY` (20px -> 0px) | 300ms | `ease-out` |
| Dialog Box Muncul | `opacity` + `translateY` | 400ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Kecepatan Typewriter | delay per karakter | 40ms | — |
| Kedipan Kursor (Cursor) | `opacity` | 530ms | `ease-in-out` |
| Tombol Pilihan Pilihan | `opacity` + `translateX` | 300ms (staggered 100ms) | `ease-out` |
| Efek Gemetar (Screen Shake)| `translateX` | 300ms | kustom bergetar (komedik) |

---

## 5. Konvensi Penamaan Aset (Asset Naming)

*   **Backgrounds (`/assets/backgrounds/`):** `bg_{location}_{variant}.jpg` (Contoh: `bg_mechanic_shop_rain.jpg`).
*   **Character Sprites (`/assets/characters/`):** `/characters/{id}/{id}_{expression}.png` (Contoh: `/characters/aeterna/aeterna_lazy.png`).
*   **Audio BGM/SFX (`/assets/audio/`):** `bgm_{chapter/scene}.mp3` atau `sfx_{action}.wav`.
