# Project Aetheria

> Web visual novel tentang Aeterna, seorang magitech engineer pemalas yang ternyata adalah Prime Deity, dan Lysthea, Grand Saintess yang telah menjaga dunia selama 10.000 tahun.

**Working title:** The Prime Deity Just Wants to Slack Off  
**Genre:** Isekai, urban fantasy, cozy fantasy, slice of life, comedy, light romance  
**Platform:** Web browser

---

## Overview

Project Aetheria adalah game visual novel berbasis React yang menggabungkan dialog bercabang, eksplorasi lokasi, evidence board, autosave, audio, dan transisi sinematik. Chapter 1 mengikuti kehidupan baru Aeterna sebagai teknisi artefak sihir biasa sampai kedatangan Lysthea membongkar identitas kosmisnya.

Repo ini berisi implementasi game, data Chapter 1, aset visual/audio, dokumentasi worldbuilding, persona karakter, style guide, serta skrip bantu untuk membuat/mengolah aset.

---

## Current Features

- Visual novel flow dengan dialog typewriter, pilihan, sprite karakter, background, BGM, dan SFX.
- Multi-screen game loop: landing, story, visual novel, hub, exploration, board, inspection, confrontation, decision, reflection, dan isekai transition.
- Chapter data berbasis TypeScript untuk scenes, evidences, rules, dan editorial outcomes.
- State management dengan Zustand untuk game progress, dialog, evidence, board, dan settings.
- Autosave/load berbasis localforage, termasuk penyimpanan posisi scene dan board state.
- Evidence inventory, evidence toast, dan detective board untuk menghubungkan informasi.
- Unit tests untuk engine dan validasi data.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Build tool | Vite 6 |
| UI | React 18 + TypeScript 5 |
| Styling | Tailwind CSS 3 |
| State | Zustand 5 |
| Animation | Framer Motion 11 |
| Icons | Lucide React |
| Audio | Howler.js |
| Persistence | localforage |
| Validation | Zod |
| Test runner | Vitest + Testing Library |

---

## Getting Started

### Prerequisites

- Node.js 20+ recommended
- npm

### Install and Run

```bash
npm install
npm run dev
```

Vite runs with `--host`, so the dev server can be opened from the local machine or LAN address printed in the terminal.

### Build

```bash
npm run build
npm run preview
```

### Test

```bash
npm test
```

Use watch mode while iterating:

```bash
npm run test:watch
```

---

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite development server |
| `npm run build` | Type-check with `tsc -b` and build production assets |
| `npm run preview` | Preview production build |
| `npm test` | Run Vitest once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run lint` | Run ESLint |
| `npm run format` | Format repository with Prettier |

---

## Project Structure

```text
aetheria/
|-- docs/                         Project docs, GDD, style guide, personas
|-- public/
|   `-- assets/
|       |-- backgrounds/           Scene backgrounds and CG images
|       |-- characters/            Character sprites by character/expression
|       `-- audio/                 BGM, SFX, and dialog voice files
|-- scripts/                       Asset generation and image/audio helpers
|-- src/
|   |-- App.tsx                    Main screen router and game loop
|   |-- components/
|   |   |-- screens/               Full-screen game states
|   |   |-- visual-novel/          Dialog, background, sprite, choices
|   |   |-- evidence/              Evidence inventory/card UI
|   |   |-- board/                 Evidence board nodes and edges
|   |   `-- smartphone/            In-game phone/social overlay
|   |-- data/chapter-1/            Chapter 1 scenes, evidence, rules, outcomes
|   |-- engines/                   Pure game logic and persistence helpers
|   |-- hooks/                     Dialog, audio, typewriter hooks
|   |-- schemas/                   Zod schemas for content validation
|   |-- stores/                    Zustand stores
|   |-- tests/                     Engine tests and test setup
|   |-- types/                     Shared TypeScript contracts
|   `-- utils/                     Small helpers
`-- dist/                         Production build output
```

---

## Runtime Flow

1. `src/App.tsx` loads `chapter1` from `src/data/chapter-1`.
2. `useGameStore`, `useEvidenceStore`, and `useDialogStore` hold current screen, scene progress, collected evidence, board edges, and dialog index.
3. `advanceScene()` in `src/engines/storyEngine.ts` applies scene unlocks, choices, ticker changes, visited scenes, and next-scene routing.
4. The active scene mode maps to a screen component, for example `visual_novel`, `hub`, `exploration`, `board`, or `reflection`.
5. `saveGame()` in `src/engines/saveEngine.ts` persists progress to localforage after gameplay changes.

---

## Content Workflow

Most story changes happen in `src/data/chapter-1/`.

| File | Use |
| --- | --- |
| `scenes.ts` | Scene order, dialogue lines, choices, backgrounds, characters, unlocks |
| `evidences.ts` | Collectible evidence metadata and learning points |
| `rules.ts` | Evidence relationship rules for the board |
| `editorials.ts` | Final decisions and reflection outcomes |
| `index.ts` | Chapter manifest exported to the app |

When adding a new scene:

1. Add the scene object to `scenes.ts`.
2. Set `id`, `mode`, `background`, `characters`, `dialogues`, and `nextSceneId`.
3. Add any new evidence to `evidences.ts`.
4. Put required assets under `public/assets`.
5. Run `npm test` and `npm run build`.

---

## Assets

Asset conventions are documented in [docs/STYLE_GUIDE.md](docs/STYLE_GUIDE.md).

Common paths:

| Asset Type | Path |
| --- | --- |
| Backgrounds | `public/assets/backgrounds/` |
| Character sprites | `public/assets/characters/{character_id}/` |
| BGM | `public/assets/audio/bgm/` |
| SFX | `public/assets/audio/sfx/` |
| Dialog voice | `public/assets/audio/dialog/` |

Character sprites are referenced by character id and expression, for example `aeterna_lazy.png` or `lysthea_shocked.png`.

---

## Documentation

| Document | Description |
| --- | --- |
| [docs/GDD_Project_Aetheria.md](docs/GDD_Project_Aetheria.md) | Core premise, genre, and character profiles |
| [docs/Chapter_1_Outline.md](docs/Chapter_1_Outline.md) | Chapter 1 story outline |
| [docs/Script_Chapter_1.md](docs/Script_Chapter_1.md) | Chapter 1 script draft |
| [docs/Worldbuilding_Aetheria.md](docs/Worldbuilding_Aetheria.md) | Worldbuilding notes |
| [docs/Persona_Aeterna.md](docs/Persona_Aeterna.md) | Aeterna character reference |
| [docs/Persona_Lysthea.md](docs/Persona_Lysthea.md) | Lysthea character reference |
| [docs/Character_Visuals.md](docs/Character_Visuals.md) | Character visual direction |
| [docs/Character_Voices.md](docs/Character_Voices.md) | Voice direction |
| [docs/ASSET_CHECKLIST.md](docs/ASSET_CHECKLIST.md) | Asset production checklist |
| [docs/STYLE_GUIDE.md](docs/STYLE_GUIDE.md) | Visual style guide and Tailwind tokens |

---

## Analysis Notes

- The current game content and docs are Project Aetheria, while a few legacy identifiers still use `sebelum-viral`, including the npm package name and localforage save key.
- Several type fields still reflect an older investigation/literacy prototype, such as rumor, evidence quality, and relationship names. They are still used by the engine/UI and can be renamed later in a focused refactor.
- `claimRules` is currently empty in Chapter 1, so the inspection flow exists but has limited active content.
- `dist/` and `node_modules/` are present locally; generated folders usually should not be edited by hand.

---

## License

TBD.
