# Project Aetheria

> A browser-based visual novel set in a cozy magitech fantasy world.

**Genre:** Isekai, urban fantasy, cozy fantasy, slice of life, comedy, light romance  
**Platform:** Web browser

---

## Overview

Project Aetheria is a React-powered visual novel prototype with branching dialogue, scene-based progression, exploration screens, evidence-style information tracking, autosave, audio playback, and cinematic transitions.

This repository contains the game implementation, Chapter 1 content data, visual/audio assets, worldbuilding notes, character references, style documentation, and helper scripts for asset production.

The README is intentionally spoiler-safe. Story-specific reveals and character details live in the internal documents under `docs/`.

---

## Current Features

- Visual novel flow with typewriter dialogue, choices, character sprites, backgrounds, BGM, and SFX.
- Multi-screen game loop covering landing, story, visual novel, hub, exploration, board, inspection, confrontation, decision, reflection, and transition screens.
- Chapter content stored as TypeScript data for scenes, evidence entries, board rules, and outcomes.
- Zustand stores for game progress, dialogue state, evidence state, board state, and settings.
- Autosave/load through localforage, including current scene and board state.
- Evidence inventory, unlock notifications, and a board interface for connecting collected information.
- Unit tests for core engines and data validation.

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

Vite runs with `--host`, so the development server can be opened from the local machine or a LAN address printed in the terminal.

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
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check with `tsc -b` and build production assets |
| `npm run preview` | Preview the production build |
| `npm test` | Run Vitest once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run lint` | Run ESLint |
| `npm run format` | Format the repository with Prettier |

---

## Project Structure

```text
aetheria/
|-- docs/                         Internal design docs, style guide, references
|-- public/
|   `-- assets/
|       |-- backgrounds/           Scene backgrounds and CG images
|       |-- characters/            Character sprites by character/expression
|       `-- audio/                 BGM, SFX, and dialogue voice files
|-- scripts/                       Asset generation and image/audio helpers
|-- src/
|   |-- App.tsx                    Main screen router and game loop
|   |-- components/
|   |   |-- screens/               Full-screen game states
|   |   |-- visual-novel/          Dialogue, background, sprite, choices
|   |   |-- evidence/              Evidence inventory/card UI
|   |   |-- board/                 Information board nodes and edges
|   |   `-- smartphone/            In-game phone/social overlay
|   |-- data/chapter-1/            Chapter 1 scenes, evidence, rules, outcomes
|   |-- engines/                   Pure game logic and persistence helpers
|   |-- hooks/                     Dialogue, audio, and typewriter hooks
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
2. `useGameStore`, `useEvidenceStore`, and `useDialogStore` hold current screen, scene progress, collected evidence, board edges, and dialogue index.
3. `advanceScene()` in `src/engines/storyEngine.ts` applies scene unlocks, choices, ticker changes, visited scenes, and next-scene routing.
4. The active scene mode maps to a screen component, such as `visual_novel`, `hub`, `exploration`, `board`, or `reflection`.
5. `saveGame()` in `src/engines/saveEngine.ts` persists progress to localforage after gameplay changes.

---

## Content Workflow

Most story changes happen in `src/data/chapter-1/`.

| File | Use |
| --- | --- |
| `scenes.ts` | Scene order, dialogue lines, choices, backgrounds, characters, unlocks |
| `evidences.ts` | Collectible information metadata and learning points |
| `rules.ts` | Relationship rules for board connections |
| `editorials.ts` | Final decisions and reflection outcomes |
| `index.ts` | Chapter manifest exported to the app |

When adding a new scene:

1. Add the scene object to `scenes.ts`.
2. Set `id`, `mode`, `background`, `characters`, `dialogues`, and `nextSceneId`.
3. Add any new collectible information to `evidences.ts`.
4. Place required assets under `public/assets`.
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
| Dialogue voice | `public/assets/audio/dialog/` |

Character sprites are referenced by character id and expression, for example `aeterna_lazy.png` or `lysthea_shocked.png`.

---

## Documentation

Some documents may contain story spoilers. Open them only if you are working on narrative, content, or asset production.

| Document | Description |
| --- | --- |
| [docs/GDD_Project_Aetheria.md](docs/GDD_Project_Aetheria.md) | Internal game design reference |
| [docs/Chapter_1_Outline.md](docs/Chapter_1_Outline.md) | Chapter 1 planning outline |
| [docs/Script_Chapter_1.md](docs/Script_Chapter_1.md) | Chapter 1 script draft |
| [docs/Worldbuilding_Aetheria.md](docs/Worldbuilding_Aetheria.md) | Worldbuilding notes |
| [docs/Persona_Aeterna.md](docs/Persona_Aeterna.md) | Character reference |
| [docs/Persona_Lysthea.md](docs/Persona_Lysthea.md) | Character reference |
| [docs/Character_Visuals.md](docs/Character_Visuals.md) | Character visual direction |
| [docs/Character_Voices.md](docs/Character_Voices.md) | Voice direction |
| [docs/ASSET_CHECKLIST.md](docs/ASSET_CHECKLIST.md) | Asset production checklist |
| [docs/STYLE_GUIDE.md](docs/STYLE_GUIDE.md) | Visual style guide and Tailwind tokens |

---

## Maintenance Notes

- Some legacy identifiers still use `sebelum-viral`, including the npm package name and localforage save key.
- Several type fields still reflect an earlier investigation prototype. They are still used by the engine/UI and can be renamed later in a focused refactor.
- `claimRules` is currently empty in Chapter 1, so the inspection flow exists but has limited active content.
- `dist/` and `node_modules/` may exist locally but are ignored by Git and should not be edited by hand.

---

## License

TBD.
