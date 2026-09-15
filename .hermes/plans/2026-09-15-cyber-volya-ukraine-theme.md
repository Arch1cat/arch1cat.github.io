# Cyber-Volya 3D Ukraine Theme Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a high-tech Ukrainian cyber-themed 3D experience (`cyber-volya`) featuring a procedural 3D holographic Trident (Tryzub) sculpture, electric azure & radiant solar wheat-gold palette, dual-stream particle galaxy, Kyiv telemetry HUD, and Ukrainian harmonic audio synthesis.

**Architecture:**
1. Add `html[data-theme="cyber-volya"]` in `assets/css/style.css` with electric azure (`#0072FF` / `#0057B8`), radiant wheat gold (`#FFD700` / `#FFC107`), deep Ukrainian night obsidian (`#030712`), and frosted glass HUD styling.
2. In `assets/js/three-scene.js`, construct a procedural 3D Tryzub (Trident) kinetic structure (faceted central spire, flared curved wings, and glowing base nodes) that manifests in the center of the gyroscopic rings when `cyber-volya` is active, alongside a dual-swirl azure/gold particle galaxy.
3. In `assets/js/audio-engine.js`, add a dedicated Kyiv carillon / Ukrainian folk Dorian track (`KYIV CARILLON & VOLYA PROTOCOL`) with procedural synth bells and thematic SFX.
4. In `assets/js/ui.js` and `index.html`, update the theme switcher to cycle across all 3 themes (`lusion-void` -> `super-chrome` -> `cyber-volya`), with a custom SVG Trident icon on the toggle button and Kyiv coordinates telemetry (`50.4501° N, 30.5234° E`).
5. Verify via headless Edge screenshot and `vision_analyze`, commit and push to `origin main`.

## Global Constraints
- Absolute paths only.
- Seamless 3-way theme cycling without breaking existing themes.
- Clean procedural 3D geometry without external heavy `.obj` / `.gltf` asset loading (100% instant load, zero 404 risk).
- 60 FPS performance budget across desktop and mobile.

---

### Task 1: Ukrainian Cyber Theme Design Tokens & CSS (`assets/css/style.css`)
- [ ] Define `html[data-theme="cyber-volya"]` with azure and golden amber tokens.
- [ ] Add specific hover glow, tag styling, and gold/azure border accents.

### Task 2: 3D Holographic Tryzub & Particle Galaxy (`assets/js/three-scene.js`)
- [ ] Create procedural 3D Tryzub geometry group with central spire and flared wings.
- [ ] Wire visibility and morphing scale to appear majestically in `cyber-volya` mode.
- [ ] Configure azure (`#0072FF`) and golden wheat (`#FFD700`) particle colors, lighting, and bloom.

### Task 3: Audio Track & Theme Switcher Update (`assets/js/audio-engine.js`, `ui.js`, `index.html`)
- [ ] Add Ukrainian Dorian synth track in `audio-engine.js`.
- [ ] Update theme toggle logic to cycle 3 themes with proper icons and toast notifications.
- [ ] Update ticker and station panel with Kyiv telemetry.

### Task 4: QA, Visual Inspection & Deploy
- [ ] Test page locally on HTTP server.
- [ ] Capture headless screenshot and run `vision_analyze` audit.
- [ ] Commit and push to GitHub Pages.
