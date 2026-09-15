# "CYBER-SICH OS" // Interactive 3D Spatial Holo-Deck Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely replace the generic vertical scroll card layout with **"CYBER-SICH OS"** — a full-viewport interactive 3D spatial holo-deck inspired by Lusion WebXR and cutting-edge 3D experiential sites. The site operates as an interactive 3D stage where each project is a distinct procedural 3D holographic artifact (3D Holographic Globe, RF Spectrum Waveform, Encrypted Quantum Core, Architectural City Grid, Kinetic Mobile Rig) navigated via a bottom cybernetic dock, keyboard arrows, and mouse drag.

**Architecture:**
1. **Full-Viewport 3D Spatial Canvas (`three-scene.js`):**
   - The 3D world is the primary stage with dynamic camera choreography transitioning between 8 distinct 3D procedural installations:
     - `Stage 0: PROLOGUE` — Cyber-Sich Fusion Reactor & Quantum Tryzub Energy Core.
     - `Stage 1: WORLD MONITOR` — Interactive 3D Holographic Globe with geospatial nodes and orbital recon rings.
     - `Stage 2: WIFI SCANNER` — 3D Radio Frequency Spectrum Analyzer with oscillating neon wave bars.
     - `Stage 3: METADATA CLEANER` — Encrypted Quantum Cube with disintegrating privacy particle matrix.
     - `Stage 4: CATS MATCH-3` — Floating kinetic cyber-cat gem prism with physics bounce.
     - `Stage 5: OPENGYM` — 3D Titanium Mobile Device / Piston Apparatus with holographic WebAuthn rings.
     - `Stage 6: YOTEI CRM` — Procedural 3D Isometric Architectural Skyscraper Matrix with pulsing lead pipelines.
     - `Stage 7: SIGNAL` — Real-time telemetry planetary nebula with live GitHub stats.
   - Smooth 360° mouse/touch drag orbit for every stage.
2. **Cybernetic HUD & Holographic Dossier Drawer (`index.html` & `style.css`):**
   - Perimeter HUD:
     - Top Cockpit: Kyiv coordinates `50.4501° N, 30.5234° E`, UTC+3 Station Clock, 60 FPS meter, Theme Switcher (`🇺🇦 CYBER VOLYA` / `⚡ CHROME TITANIUM` / `💎 VOID MATRIX`), Sound synthesizer visualizer.
     - Left Floating Dossier Card: Glassmorphic tactical specification sheet displaying project details, tech stack badges, live metrics, and direct action links (`LAUNCH ↗`, `DOWNLOAD APK ↗`).
     - Bottom Interactive Cyber-Dock: Sleek horizontal module selector allowing one-click navigation between all 8 stages, with active indicator, stage counter (`01 / 07`), and navigation arrows (`←` / `→`).
   - Mobile Responsive: Adapts effortlessly to touch gestures (swipe left/right to change stage, drag to orbit 3D).
3. **Procedural Web Audio Engine (`audio-engine.js`):**
   - Stage transition whoosh, cybernetic relay clicks, sonar radar ping, and generative Ukrainian Dorian ambient chord progressions.

---

### Task 1: 3D Spatial Holo-Deck Engine (`assets/js/three-scene.js`)

**Files:**
- Modify: `assets/js/three-scene.js`

**Interfaces:**
- Consumes: Three.js r170, EffectComposer, UnrealBloomPass, RoomEnvironment.
- Produces: `window.__goToStage(index)`, `window.__getStageCount()`, `window.__triggerStagePulse()`.

- [ ] **Step 1: Build the 8 Distinct 3D Procedural Stage Groups**
  - Group 0: Fusion Reactor & Quantum Tryzub.
  - Group 1: Holographic Wireframe Earth with orbital rings.
  - Group 2: 3D RF Spectrum Bars Analyzer.
  - Group 3: Encrypted Quantum Cube.
  - Group 4: Kinetic Gem Prism.
  - Group 5: Titanium Smartphone / Piston Device.
  - Group 6: Isometric Architectural Skyscraper Matrix.
  - Group 7: Planetary Telemetry Constellation.
- [ ] **Step 2: Implement Smooth Stage Transitions & Camera Choreography**
  - Smoothly interpolate camera position, lookAt target, and object scales when changing stages.
- [ ] **Step 3: Implement Universal 360° Orbit Drag & Inertial Damping**
  - Dragging anywhere on the canvas rotates the active 3D object smoothly.

---

### Task 2: Cyber-Sich OS HUD, Dock & Dossier Styling (`assets/css/style.css`)

**Files:**
- Modify: `assets/css/style.css`

**Interfaces:**
- Consumes: Themes tokens (`cyber-sich`, `chrome-titanium`, `void-matrix`).
- Produces: Full-bleed canvas styling, perimeter HUD cockpit, floating glassmorphic dossier card, interactive bottom cyber-dock, keyboard hint badges.

- [ ] **Step 1: Overhaul Layout to Full-Viewport Holo-Deck**
  - Remove vertical document scrolling; establish zero-scroll 100vh spatial viewport.
- [ ] **Step 2: Style Floating Holographic Dossier Card**
  - Glassmorphic backdrop blur (28px), hairline neon borders, micro-metrics grid, animated entering transition.
- [ ] **Step 3: Style Cyber-Dock & Stage Switcher**
  - Horizontal dock with module pills, active indicator, arrow triggers, and status LED.

---

### Task 3: DOM Restructuring & Navigation Controller (`index.html` & `assets/js/ui.js`)

**Files:**
- Modify: `index.html`
- Modify: `assets/js/ui.js`

**Interfaces:**
- Consumes: Three.js stage engine, Audio SFX engine.
- Produces: Seamless stage switching via Dock clicks, arrow keys (`ArrowLeft`, `ArrowRight`), mouse wheel, and touch swipes.

- [ ] **Step 1: Restructure `index.html` for Spatial Holo-Deck**
  - Replace vertical sections with Top Cockpit, Left Holographic Dossier Drawer, and Bottom Cyber-Dock.
- [ ] **Step 2: Implement Stage Switcher Controller in `ui.js`**
  - Manage active stage index (0 to 7).
  - Update dossier content, badges, and links dynamically on stage change.
  - Bind arrow keys, mouse wheel, and touch gestures.
- [ ] **Step 3: Wire Audio SFX to Stage Transitions**

---

### Task 4: Testing, Verification & Deployment

**Files:**
- Inspect with Headless Edge (`screenshot_stage_0.png`, `screenshot_stage_1_globe.png`, `screenshot_stage_6_yotei.png`).
- Audit with `vision_analyze`.
- Commit and push to `origin main`.
