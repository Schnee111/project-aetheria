<div align="center">

# Project Aetheria

**A high-performance browser-based magitech visual novel engine built on modern web primitives.**

[![CI Quality Gate](https://github.com/Schnee111/project-aetheria/actions/workflows/ci.yml/badge.svg)](https://github.com/Schnee111/project-aetheria/actions/workflows/ci.yml)
[![Live Demo](https://img.shields.io/badge/Demo-aeteria.biz.id-8b5cf6.svg?style=flat&logo=vercel)](https://aeteria.biz.id/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7_Strict-3178C6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![React 18](https://img.shields.io/badge/React-18.3-61DAFB.svg?style=flat&logo=react)](https://react.dev/)
[![Vite 6](https://img.shields.io/badge/Vite-6.0-646CFF.svg?style=flat&logo=vite)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

<br />

<a href="https://aeteria.biz.id/">
  <img src="public/thumbnail.png" alt="Project Aetheria Preview" width="100%" style="border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.4);" />
</a>

<br />

[**Explore Live Demo**](https://aeteria.biz.id/) • [**Game Design Document**](docs/GDD_Project_Aetheria.md) • [**Style Guide**](docs/STYLE_GUIDE.md) • [**Architecture**](#system-architecture)

</div>

---

## Overview

**Project Aetheria** is a cinematic, web-native visual novel and narrative investigation engine. Set in an ethereal magitech world, it combines rich multi-screen branching narrative with an interactive **Evidence & Deduction Board**, high-fidelity typewriter dialog, dynamic BGM/SFX audio cross-fading, and intelligent connection-aware asset preloading.

Built with a modular frontend architecture, Aetheria guarantees zero-latency scene transitions, automatic state persistence, and responsive mobile/desktop visual immersion without bulky third-party game runtimes.

---

## Key Features

- **Decoupled Screen State Machine:** Full lifecycle state flow across Landing, Story, Visual Novel, Smartphone/Social Overlay, Investigation Board, Confrontation, and Reflection screens.
- **Evidence & Deduction System:** Collect documents, testimonies, and magitech artifacts. Form logical graph links between disparate clues to unlock narrative confrontations.
- **Connection-Aware Asset Preloader:** Adaptive multi-tier preloading (`4G` vs `2G` / `Save-Data`) to pre-fetch upcoming character expressions, backgrounds, and audio clips seamlessly.
- **Dual-Engine Audio Pipeline:** Powered by Howler.js with dedicated BGM ducking, position loops, line-level voice triggers, and auto-cleanup.
- **Zero-Loss Game State Persistence:** Asynchronous serialization with `localforage` preserving scene position, collected clues, board graph edges, and player choices.
- **Strict Schema Enforcement:** All scenes, dialogues, clues, and deduction rules are validated at compile and runtime using `Zod` schemas.

---

## System Architecture

```text
+-------------------------------------------------------------------------+
|                              Browser DOM                                |
|  [ LandingScreen ]  [ StoryScreen ]  [ BoardScreen ]  [ SmartphoneUI ]  |
+------------------------------------+------------------------------------+
                                     |
               +---------------------v---------------------+
               |              Game Loop Router             |
               |                 (App.tsx)                 |
               +----------+---------------------+----------+
                          |                     |
        +-----------------v---+             +---v-----------------+
        |    Story Engine     |             |   Preload Engine    |
        |  (advanceScene.ts)  |             | (useScenePreloader) |
        +---------+-----------+             +----------+----------+
                  |                                    |
+-----------------v-----------------+      +-----------v------------------+
|          Zustand Stores           |      |        Audio Engine          |
|  - useGameStore (scene, progress) |      |          (Howler.js)         |
|  - useEvidenceStore (clues, board)|      | - Spatial BGM & Crossfade    |
|  - useSettingsStore (vol, speed)  |      | - Line-Synced Voice & SFX    |
+-----------------+-----------------+      +------------------------------+
                  |
        +---------v-----------+
        | Persistence Layer   |
        |  (saveEngine.ts)    |
        |  - IndexedDB        |
        |  - LocalStorage     |
        +---------------------+
```

---

## Tech Stack

- **Framework & Build:** React 18, Vite 6, TypeScript 5 (Strict Mode)
- **State Management:** Zustand 5 (Atomic selectors, zero unnecessary re-renders)
- **Animation & Motion:** Framer Motion 11
- **Styling:** Tailwind CSS 3 with custom magitech typography and color tokens
- **Audio Engine:** Howler.js (Spatial audio, web audio fallback, preloading pool)
- **Data Validation:** Zod 3 (Contract-driven narrative schemas)
- **Testing & Quality:** Vitest 4, Testing Library, ESLint 9 (Flat Config), Prettier
- **CI/CD & SemVer:** GitHub Actions, Google Release Please

---

## Quickstart

### Prerequisites

- **Node.js:** v20.x or v22.x LTS
- **Package Manager:** npm (v10+)

### Local Development

```bash
# Clone the repository
git clone https://github.com/Schnee111/project-aetheria.git
cd project-aetheria

# Install dependencies cleanly
npm ci

# Start the local development server (with host exposure for mobile testing)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Scripts & Quality Commands

| Command | Description |
|---|---|
| `npm run dev` | Start the local Vite development server with HMR |
| `npm run build` | Verify types (`tsc -b`) and compile optimized production bundle |
| `npm run preview` | Spin up a local server previewing the `dist/` production output |
| `npm test` | Execute the Vitest test suite once |
| `npm run test:watch`| Run Vitest in interactive watch mode for TDD |
| `npm run lint` | Run ESLint across the codebase |
| `npm run format` | Enforce repository formatting rules using Prettier |

---

## Project Structure

```text
project-aetheria/
|-- .github/workflows/          # GitHub Actions CI & Release Please workflows
|-- docs/                       # GDD, Narrative Script, Character Persona specs
|-- public/assets/
|   |-- backgrounds/            # Story backgrounds (WebP)
|   |-- cgs/                    # High-res CG illustrations and WebM/MP4 loops
|   |-- characters/             # Layered character sprite sheets by emotion
|   `-- audio/                  # BGM tracks, SFX, and dialogue voice lines
|-- src/
|   |-- components/
|   |   |-- screens/            # Screen views (Landing, Story, Board, Disclaimer)
|   |   |-- visual-novel/       # Sprite rendering, Dialog box, Choice panels
|   |   `-- evidence/           # Clue inspection cards and relationship connectors
|   |-- data/chapter-1/         # Structured scene graphs, clues, and rules
|   |-- engines/                # Pure deterministic game logic (Story, Save)
|   |-- hooks/                  # Audio hooks, typewriter effect, scene preloader
|   |-- schemas/                # Zod contracts for runtime validation
|   |-- stores/                 # Zustand state stores
|   `-- types/                  # Shared TypeScript interfaces
`-- vitest.config.ts            # Test runner configuration
```

---

## Continuous Integration & Release Strategy

- **Automated Verification:** Every Pull Request and commit to `master` triggers `.github/workflows/ci.yml` across multiple Node.js environments (linting, typechecking, full Vitest suite, and production build).
- **Semantic Versioning:** Versioning and changelog generation are governed by **Google Release Please** following the [Conventional Commits](https://www.conventionalcommits.org/) specification (`feat:`, `fix:`, `perf:`).

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Developed with care by [Muhammad Daffa Ma'arif (Schnee111)](https://github.com/Schnee111).
