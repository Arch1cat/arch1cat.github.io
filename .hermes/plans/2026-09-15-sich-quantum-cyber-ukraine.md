# SICH-QUANTUM // Kyiv Cybernetics 3D Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely scrap the old template and rebuild arch1cat's portfolio as an award-winning Ukrainian cybernetic 3D engineering rig (**"СІЧ-QUANTUM / KYIV CYBERNETICS"**) inspired by Glushkov's cybernetics, Antonov aerospace, Lusion WebXR physical object inspection, and brutalist-luxe editorial design.

**Architecture:**
1. **The 3D Engineering Rig (`three-scene.js`):** Replace the abstract ball with a multi-module **Cybernetic Dreadnought / Aerospace Satellite ("СІЧ-01")**:
   - Central Octagonal Plasma Fusion Core with glowing containment rods.
   - Deployable Carbon/Gold Solar Array Wings that extend/rotate on scroll.
   - Avionics Radar Dish with rotating scan beam.
   - 5 Spatial 3D HTML Hotspots (`vector.project(camera)`) anchored to physical modules:
     - `01 · OSINT RADAR` -> World Monitor
     - `02 · RF TELEMETRY` -> WiFi Scanner
     - `03 · CRYPTO PURGE` -> Metadata Cleaner
     - `04 · NEURAL ENGINE` -> Cats Match-3
     - `05 · KINETIC APPARATUS` -> openGym (APK v1.2.4)
     - `06 · ENTERPRISE GRID` -> Yotei Flagship CRM
   - **Interactive 3D Controls:** Orbit 360°, `[ DECONSTRUCT / РОЗБІР ]` (exploded view exploding modules outward along axes), `[ X-RAY ]` wireframe shader mode, and 3D module focus on click.
2. **Editorial Brutalist Layout (`index.html` & `style.css`):**
   - High-contrast cockpit & split-screen framing:
     - Top Navigation: Kyiv Coordinates `50.4501° N, 30.5234° E`, UTC+3 Station Clock, Audio Visualizer, 3D Mode Selector (`NORMAL` / `EXPLODED` / `X-RAY`), Theme Selector (`СІЧ COBALT-GOLD` / `CHROME VOID`).
     - Dynamic HUD Overlay: Module telemetry readouts, interactive 3D inspect controls, live hardware specs.
     - Dossier Drawer: Clicking any project (in 3D or in the works list) smoothly flies the camera to the module and slides open a high-tech engineering dossier with live specs, GitHub links, and APK downloads.
     - Flagship Yotei Enterprise Grid with architectural blueprints and real estate intelligence telemetry.
3. **Sound Architecture (`audio-engine.js`):**
   - Procedural Ukrainian Cyber-Carillon: resonant synthesized church bells / analog synthesizer drone in Ukrainian Dorian scale.
   - Physical mechanical SFX: hydraulic servo whoosh on exploded view, relay clicks, scanner telemetry beep, sub-bass pulse.

**Tech Stack:** Three.js r170 (ESM), EffectComposer, UnrealBloomPass, Web Audio API, CSS Grid / 3D Transforms, Vanilla JS.

---

### Task 1: 3D "СІЧ-01" Cybernetic Aerospace Rig Architecture (`assets/js/three-scene.js`)

**Files:**
- Modify: `assets/js/three-scene.js`

**Interfaces:**
- Consumes: Three.js r170, EffectComposer, RenderPass, UnrealBloomPass.
- Produces: `window.__setRigMode(mode)` (`'assembled'`, `'exploded'`, `'xray'`), `window.__focusModule(index)`, `window.__updateHotspots()`.

- [ ] **Step 1: Construct Modular Aerospace Rig Geometries**
  - Central Octagonal Fusion Chassis (`CylinderGeometry(1.2, 1.4, 2.2, 8)`) with carbon-composite panels and glowing fusion conduit coils.
  - Avionics Sensor Dish (`SphereGeometry(0.7, 16, 16, 0, Math.PI * 2, 0, Math.PI / 3)`) mounted on a pan-tilt hydraulic gimbal.
  - Dual Deployable Solar Array Wings (`BoxGeometry(2.6, 0.08, 1.1)`) with gold photovoltaic texture and carbon struts.
  - Lower Propulsion Thruster Nozzles (`CylinderGeometry(0.4, 0.65, 0.8, 16)`) with glowing cyan plasma plumes.
  - Communications Mast with laser telemetry array and beacon lights.
- [ ] **Step 2: Implement Exploded View (Deconstruct) Physics**
  - Store resting offsets (`posRest`, `rotRest`) and exploded offsets (`posExploded`) for each modular component.
  - Smoothly interpolate parts along their component vectors using `lerp` when `rigMode === 'exploded'`.
- [ ] **Step 3: Implement Projected 3D-to-2D Hotspots**
  - Calculate screen coordinates for 5 module anchor points using `vector.clone().project(camera)`.
  - Position interactive DOM marker badges (`#hotspot-1`, etc.) over the 3D parts in real time.
- [ ] **Step 4: Camera Choreography & Module Focus**
  - Clicking a project/hotspot orbits camera smoothly to target module with precision framing.

---

### Task 2: Cyber-Kyiv Visual Design System & Themes (`assets/css/style.css`)

**Files:**
- Modify: `assets/css/style.css`

**Interfaces:**
- Consumes: CSS variables for `cyber-sich` (Dnipro Azure `#0066FF`, Wheat Solar Gold `#FFB800`, Stealth Obsidian `#05070D`) and `chrome-void`.
- Produces: Cockpit UI layout, 3D viewport framing, exploded view toggle controls, projected hotspot tags, dossier slide-out drawer.

- [ ] **Step 1: Define Ukrainian Cybernetic Design Tokens**
  - Azure laser borders, golden solar highlights, technical crosshairs, metric scales.
- [ ] **Step 2: Style 3D Viewport Controls & HUD Overlay**
  - Viewport mode switch buttons: `[ ⊙ ASSEMBLED ]`, `[ ☩ EXPLODED ]`, `[ ◬ X-RAY ]`.
  - Floating 3D Hotspot badges with pulsing radar dots and connecting callout lines.
- [ ] **Step 3: Build Interactive Engineering Dossier Drawer**
  - High-tech modular card sliding from the side/bottom when a project is selected.

---

### Task 3: Content, Structure & 3D Interactive Hotspots (`index.html` & `assets/js/ui.js`)

**Files:**
- Modify: `index.html`
- Modify: `assets/js/ui.js`

**Interfaces:**
- Consumes: Three.js rig hooks, audio engine SFX.
- Produces: Revamped editorial DOM, interactive 3D control deck, live Kyiv telemetry, project dossiers.

- [ ] **Step 1: Structure New Cockpit & Editorial Layout in `index.html`**
  - Kyiv Aerospace & Cybernetics branding: `ARCH1CAT // СІЧ-01 CYBERNETICS`.
  - Replace generic hero with interactive 3D aerospace rig controller, live specs, and module breakdown.
  - Interactive project catalog: World Monitor, WiFi Scanner, Metadata Cleaner, Cats Match-3, openGym, Yotei CRM.
- [ ] **Step 2: Wire 3D Rig Mode Toggles in `ui.js`**
  - Buttons for Assembled, Exploded, and X-Ray with mechanical SFX triggers.
- [ ] **Step 3: Wire Hotspots & Module Selection**
  - Clicking hotspot or list item focuses 3D camera on module and opens engineering specs.

---

### Task 4: Ukrainian Cybernetic Web Audio Engine (`assets/js/audio-engine.js`)

**Files:**
- Modify: `assets/js/audio-engine.js`

**Interfaces:**
- Consumes: Web Audio API.
- Produces: Mechanical hydraulic whoosh, radar ping, Kyiv carillon drone.

- [ ] **Step 1: Add Hydraulic Servo & Mechanical Deconstruct SFX**
- [ ] **Step 2: Add Kyiv Glushkov Cybernetic Synthesizer Sequence**

---

### Task 5: Verification, Playwright Headless Audit & Deployment

**Files:**
- Test with Headless Edge (`screenshot_sich_assembled.png`, `screenshot_sich_exploded.png`).
- Audit with `vision_analyze`.
- Commit and push to `origin main`.
