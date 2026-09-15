# Complete Luxury Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completely replace the broken spacecraft/rocket prototype with an award-winning, ultra-polished luxury creative portfolio inspired by Lusion (lusion.co) and 404s.design. The site features a fluid, procedural 3D liquid chrome / iridescent glass morphing kinetic sculpture in Three.js r170, a functional and highly legible modern editorial layout with Bento-grid project showcases, dual luxury themes (Lusion Void vs Solar Titanium), and procedural Web Audio SFX.

**Architecture:**
1. **Procedural 3D Liquid Chrome Kinetic Core (`three-scene.js`):**
   - Scrap all primitive cylinder/box assemblies and rocket models.
   - Build a continuous, flowing mathematical form: a fluid deforming Torus Knot / Möbius ribbon with dynamic 3D vertex wave displacement.
   - PBR Liquid Metal Shader: high metalness (0.96), low roughness (0.12), clearcoat specular sheen catching room environment reflections and directional rim lights.
   - Volumetric Fluid Particle Flow: 3,000+ luminous micro-particles moving along curl-noise flow fields, gently parting and swirling with mouse velocity.
   - Interactive 360° mouse drag orbit with smooth inertial damping.
   - Scroll-driven camera choreography smoothly panning and framing the sculpture across chapters without obstructing content.
2. **Modern Editorial & Bento Grid Layout (`index.html` & `style.css`):**
   - Restore natural, buttery-smooth scrolling flow with sticky header and floating station telemetry.
   - Hero Section: Bold, crisp modern typography, live availability pill, concise value proposition, and magnetic CTA buttons.
   - Works Section: High-end Bento Grid featuring World Monitor, openGym (with direct APK download link), WiFi Scanner, Metadata Cleaner, and Cats Match-3.
   - Flagship Section: Dedicated luxury showcase plate for Yotei CRM.
   - Signal Section: Real-time GitHub telemetry metrics and contribution snake visualizer.
   - Two Refined Themes:
     - `lusion-void` (Default): Cosmic obsidian, iridescent cyan/violet, frosted glass.
     - `solar-titanium`: Deep onyx, mirror liquid chrome, radiant solar amber/gold.
3. **Procedural Web Audio Engine (`audio-engine.js`):**
   - Soft, pleasant UI micro-ticks on hover, glass click on buttons, cyber chord sweep on theme change, and sub-bass resonance on liquid pulse.
   - Optional ambient generative music scheduler toggled via header.

**Tech Stack:** Three.js r170 (ESM), EffectComposer, UnrealBloomPass, Web Audio API, Modern CSS (Glassmorphism, Bento Grid, 3D Transforms), Vanilla JS.

---

### Task 1: Procedural Liquid Chrome & Fluid Particle Scene (`assets/js/three-scene.js`)

**Files:**
- Modify: `assets/js/three-scene.js`

**Interfaces:**
- Consumes: Three.js r170, EffectComposer, UnrealBloomPass, RoomEnvironment.
- Produces: `window.__triggerLiquidPulse()`, theme switch hooks, smooth mouse drag orbit, scroll camera choreography.

- [ ] **Step 1: Clean out all rocket/satellite geometry completely**
- [ ] **Step 2: Build fluid morphing liquid chrome sculpture with procedural vertex wave displacement**
- [ ] **Step 3: Build 3,000+ volumetric curl-noise fluid particles reacting to mouse cursor**
- [ ] **Step 4: Implement 360° click-drag orbit with smooth inertial damping**
- [ ] **Step 5: Implement scroll-driven camera choreography across sections**
- [ ] **Step 6: Implement dual-theme lighting & materials (Lusion Void <-> Solar Titanium)**

---

### Task 2: Luxury Design System & Bento Grid CSS (`assets/css/style.css`)

**Files:**
- Modify: `assets/css/style.css`

**Interfaces:**
- Consumes: Theme tokens for `lusion-void` and `solar-titanium`.
- Produces: Clean editorial typography, glassmorphic Bento Grid cards, specular sheen mouse tracking, magnetic buttons, station HUD, and responsive layout.

- [ ] **Step 1: Define clean theme tokens for `lusion-void` and `solar-titanium`**
- [ ] **Step 2: Style responsive Bento Grid for Selected Works**
- [ ] **Step 3: Implement specular sheen highlight (`--mouse-x`, `--mouse-y`) and 3D card tilt**
- [ ] **Step 4: Style Yotei flagship plate, telemetry counters, and custom cursor**

---

### Task 3: Content Structure & User Interaction (`index.html` & `assets/js/ui.js`)

**Files:**
- Modify: `index.html`
- Modify: `assets/js/ui.js`

**Interfaces:**
- Consumes: Three.js liquid scene hooks, Audio SFX engine.
- Produces: Semantic HTML structure, working links, theme switcher, live GitHub telemetry, audio toggle, and tilt physics.

- [ ] **Step 1: Write clean, legible, modern semantic HTML in `index.html`**
  - Header: Brand, Navigation, Station Telemetry (Kyiv clock, FPS), Sound toggle, Theme toggle, Social links.
  - Hero: Editorial headline, status chip, concise subtitle, CTA row.
  - Works Bento Grid: World Monitor, openGym (with APK button), WiFi Scanner, Metadata Cleaner, Cats Match-3.
  - Flagship: Yotei CRM showcase.
  - Signal: GitHub stats and contribution snake.
- [ ] **Step 2: Wire theme switcher, sound effects, tilt physics, and telemetry in `ui.js`**
- [ ] **Step 3: Verify all links, APK downloads, and interactive buttons work 100%**

---

### Task 4: Verification, Visual Inspection & Deployment

**Files:**
- Run single-run Python verification script (starts server on port 8099, captures screenshots of both themes, verifies zero errors, cleanly stops server with 0 lingering processes).
- Inspect screenshots with `vision_analyze`.
- Commit and push to `origin main`.
