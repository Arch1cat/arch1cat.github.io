# Lusion-Grade 3D WebGL Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform arch1cat's portfolio into an award-winning interactive 3D web experience inspired by Lusion (webxr-sneakers.lusion.co), Three.js showcases, and 404s.design, replacing both themes with two ultra-slick aesthetics (Lusion Void vs Super Chrome), building a procedural kinetic 3D core with orbit controls, interactive energy pulses, glassmorphic UI, and Web Audio SFX.

**Architecture:** 
1. Replace themes with `lusion-void` (iridescent dark space, cosmic cyan/violet, frosted glass) and `super-chrome` (liquid mercury, brutalist-luxe, solar acid orange/amber).
2. Upgrade `three-scene.js` to a multi-layered procedural kinetic sculpture (morphing vertex plasma core, gyroscopic orbital rings, 6 polyhedral satellites, dynamic constellation lines, 3,500+ volumetric particles with mouse gravity field, full 360° click-drag orbit controls, and scroll-driven chapter camera choreography).
3. Redesign `index.html` and `style.css` with Lusion-grade glassmorphic cards, 3D mouse tilt, kinetic typography, telemetry HUD, and interactive sound design via `audio-engine.js`.

**Tech Stack:** Three.js r170 (ESM via unpkg/jsdelivr), EffectComposer (UnrealBloomPass, RenderPass, RoomEnvironment), Web Audio API, Vanilla JS, Modern CSS (CSS custom properties, glassmorphism, 3D transforms).

## Global Constraints
- **Zero build step:** Pure ESM importmap and native browser standards.
- **Two distinct themes:** `lusion-void` (default) and `super-chrome`, hot-swappable with smooth transition.
- **Performant WebGL:** Maintain 60 FPS across desktop and mobile, adaptive pixel ratios, instanced and buffer geometries, procedural radial glow textures.
- **No broken links or regressions:** Preserve all project links (World Monitor, WiFi Scanner, Metadata Cleaner, Cats Match-3, openGym, Yotei), GitHub telemetry, and SEO meta tags.

---

### Task 1: Design System & Two Themes Overhaul (`assets/css/style.css`)

**Files:**
- Modify: `assets/css/style.css`

**Interfaces:**
- Consumes: CSS variables `--ink`, `--surface`, `--plate`, `--accent`, `--line`, `--text-primary`, `--text-muted`.
- Produces: Complete theme styling for `html[data-theme="lusion-void"]` and `html[data-theme="super-chrome"]`, including frosted glass panels, glowing borders, 3D tilt card reflections, kinetic typography, and HUD styling.

- [ ] **Step 1: Define root variables & dual-theme tokens in `style.css`**
- [ ] **Step 2: Implement modern glassmorphism, glowing borders, and card sheen**
- [ ] **Step 3: Implement kinetic typography, tag pills, and HUD styling**
- [ ] **Step 4: Verify CSS syntax and test theme variable cascade**

---

### Task 2: Procedural 3D Master Scene (`assets/js/three-scene.js`)

**Files:**
- Modify: `assets/js/three-scene.js`

**Interfaces:**
- Consumes: Three.js r170, EffectComposer, UnrealBloomPass, RoomEnvironment.
- Produces: `window.__triggerEnergyPulse()`, theme swap hooks, 360° orbit drag controls, dynamic constellation lines, 3,500+ reactive particles, and chapter camera choreography.

- [ ] **Step 1: Refactor scene setup, camera, lights, and tone mapping**
- [ ] **Step 2: Build procedural kinetic core with dynamic vertex deformation**
- [ ] **Step 3: Build dual-axis gyroscopic rings, 6 satellites, and constellation line segments**
- [ ] **Step 4: Build 3,500+ volumetric particle nebula with mouse repel/attract**
- [ ] **Step 5: Implement 360° click-drag orbit controls with inertia damping**
- [ ] **Step 6: Implement chapter camera interpolation and energy pulse trigger**
- [ ] **Step 7: Implement dual-theme shader/color transition (`lusion-void` <-> `super-chrome`)**

---

### Task 3: Interactive Web Audio SFX & Feedback (`assets/js/audio-engine.js`)

**Files:**
- Modify: `assets/js/audio-engine.js`

**Interfaces:**
- Consumes: Web Audio API AudioContext.
- Produces: `window.__playSfx(type)` for `'click'`, `'hover'`, `'theme'`, `'pulse'`, and ambient audio toggle.

- [ ] **Step 1: Add procedural SFX synthesizer (click, hover, theme toggle, 3D pulse boom)**
- [ ] **Step 2: Wire header sound toggle button and state emission**
- [ ] **Step 3: Verify audio context lifecycle (user gesture unlock, visibility pause)**

---

### Task 4: Layout & Micro-Interactions Overhaul (`index.html` & `assets/js/ui.js`)

**Files:**
- Modify: `index.html`
- Modify: `assets/js/ui.js`

**Interfaces:**
- Consumes: Theme tokens, SFX engine, 3D energy pulse, tilt-plate physics.
- Produces: Modern Lusion-grade hero, interactive 3D drag hint badge, glass project plates with 3D tilt and specular gleam, sound toggle in header, flagship Yotei showcase, and telemetry cockpit.

- [ ] **Step 1: Update `index.html` structure with modern semantic elements and badges**
- [ ] **Step 2: Wire theme switcher to `lusion-void` and `super-chrome` in `ui.js`**
- [ ] **Step 3: Wire 3D tilt physics and specular sheen on project cards**
- [ ] **Step 4: Wire sound effects to buttons, cards, and theme switcher**
- [ ] **Step 5: Wire 3D energy pulse button and canvas click**

---

### Task 5: Live Verification & QA Audit

**Files:**
- Inspect: `http://localhost:3000` / local HTTP server via headless browser / curl / scripts
- Verify: Zero console errors, smooth 60 FPS, responsive layout, theme switching, 3D interactivity, sound effects.

- [ ] **Step 1: Run local HTTP server and inspect page**
- [ ] **Step 2: Verify both themes render correctly without missing styles**
- [ ] **Step 3: Verify Three.js scene initializes without WebGL warnings or errors**
- [ ] **Step 4: Commit changes and verify git status**
