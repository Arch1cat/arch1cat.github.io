# ARCH1CAT Portfolio V5: Full Active Theory V6 Work Redesign & Active Theory Radio Steal

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan. Mark completed tasks with - [x].

**Goal:** Transform `https://arch1cat.github.io` (repo at `C:/Users/z/Desktop/arch1cat_site`) into an award-level portfolio modeled directly after **Active Theory's flagship Work showcase** (`https://activetheory.net/work`), complete with their signature **ASCII-matrix preloader sphere**, **crystalline fluid spine WebGL scene**, **swarming volumetric particle clouds**, **floating 3D frosted glass project cards**, **technical cyberpunk typography**, and a fully stolen **Active Theory Radio & Sound Design engine** (8 original streaming tracks, animated marquee ticker, audio spectrum bars, and the iconic acoustic muffled low-pass filter on project focus).

---

## 1. Architectural & Design Analysis

### A. Active Theory V6 Visual System (Dissected from Live Production)
1. **Background & Atmosphere:**
   - Deep Pitch Void (`#000000` / `#05070a`) with real-time digital film grain and subtle chromatic aberration.
   - Edge vignetting and depth-of-field blurring in WebGL z-space.
2. **Signature ASCII Preloader Sphere:**
   - The iconic circular terminal matrix composed of monospaced slashes (`/`), scattered glitch digits (`7`, `5`), and a glowing cyan percentage readout (`/75/` $\to$ `/100/`) that dissolves into the 3D scene.
3. **Central Crystalline Spine & Fluid Sculpture (Three.js WebGL):**
   - An organic, segmented biomechanical vertebrae column / liquid crystal ribbon at the center of the viewport.
   - Iridescent PBR Fresnel shader with rainbow dispersion (magenta, electric cyan, deep violet, gold) reacting to cursor light and inertia.
   - Swarming volumetric point cloud particles (4,000+ colored micro-spheres in magenta, teal, violet) orbiting the central structure and swirling on pointer drag / scroll.
4. **Spatial 3D Carousel & Frosted Glass Project Plates:**
   - Projects floating in 3D perspective with realistic frosted glass transmission, specular rim lights, fresnel edge lighting, and depth tilt.
   - Project roster featuring arch1cat's flagship engineering:
     * **Yotei CRM** (Real Estate Intelligence & CRM, 3-level taxonomy, Mapbox GL clustering)
     * **WARDOGS 3D Tactical Map** (WebGL DEM terrain, 3D viewshed raymarching, ballistic solver)
     * **World Monitor** (Real-time geopolitical, cyber defense & OSINT infrastructure telemetry)
     * **openGym** (Production Android APK, WebAuthn passkeys, bodyweight progression engine)
     * **WiFi Scanner** (Native Android Kotlin, 2.4/5GHz RF graphing & subnet scanner)
     * **Metadata Cleaner** (Multi-threaded privacy stripping CLI & GUI)
     * **Cats Match-3 Quest** (Kotlin casual game engine, cascade physics & particle FX)
5. **Active Theory Navigation & UI Layout:**
   - **Top Right Navigation Capsule:** Frosted glass pill with `WORK — CONTACT` and downward ambient cyan light bleed.
   - **Left Category Navigator:** `WHAT ARE YOU LOOKING FOR?` with interactive terminal prompt pointers:
     * `-> WEBSITES & CRM`
     * `-> 3D EXPERIENCES & WEBGL`
     * `-> AUTONOMOUS AI AGENTS`
     * `-> REALTIME GIS & TELEMETRY`
     * `-> MOBILE APPS (KOTLIN)`
   - **Bottom Left Prompt Capsule:** `[ ASK ME ANYTHING... ]` interactive terminal filter.
   - **Typography:** Technical monospace (`JetBrains Mono` / `Space Grotesk`) with uppercase tracking and holographic cyan glow.

---

### B. The Stolen Active Theory Radio & Sound Engine (Dissected from `app_bundle.js`)
We extracted the exact production tracklist and audio mechanics from Active Theory's bundle:
* **The 8 Authentic Active Theory Radio Tracks:**
  1. `Sergey Azbel - Themis`
  2. `nuer self - Dusk`
  3. `Flint - Fly up High`
  4. `Hotham - To the Stars`
  5. `Jozeque - Sultans of Streams`
  6. `Downtown Binary - Other Worlds`
  7. `Magiksolo - Quantum World`
  8. `BXRDVJA - Ghost Cities`
* **Radio Mechanics:**
  - **Docked Top Capsule:** `<<` `[ 01. Sergey Azbel - Themis ]` `>>` with animated marquee ticker.
  - **Live Web Audio Equalizer:** Real-time frequency bars driven by an `AnalyserNode`.
  - **The Signature Active Theory "Muffled Acoustic" Effect:**
    * When a user opens project details or modals, audio is routed through a `BiquadFilterNode` (`type: 'lowpass'`, frequency smoothly sweeping down from `20000Hz` to `480Hz`), creating that famous "underwater / behind closed club doors" spatial effect.
    * Closing project details opens the filter back up to `20000Hz`.
  - **Active Theory SFX:** High-tech UI click chirps, laser hover ticks, and smooth volume crossfading.

---

## 2. File Modification & Architecture Plan

| File | Purpose & Changes |
| :--- | :--- |
| `assets/js/audio-engine.js` | Complete rewrite: Active Theory Radio player with 8 authentic streaming tracks, Web Audio pipeline, lowpass acoustic muffle filter, visualizer analyzer, track ticker, and SFX. |
| `assets/js/three-scene.js` | Complete overhaul: Active Theory iridescent crystalline spine / vertebrae, 4000+ volumetric swarming particle clouds, 3D spatial carousel of floating frosted glass cards with depth-of-field, inertia drag & momentum. |
| `index.html` | Restructure to Active Theory V6 Work layout: ASCII preloader sphere, top-right `WORK — CONTACT` pill with cyan light bleed, left `WHAT ARE YOU LOOKING FOR?` category navigation, bottom-left `ASK ME ANYTHING...` prompt, Active Theory radio capsule, and 3D card templates. |
| `assets/css/style.css` | Active Theory design system: pitch black `#000000` void, frosted glassmorphism, marquee ticker animations, cyan bloom glows, custom precision cursor, responsive mobile layout. |
| `assets/js/ui.js` | Controller: ASCII preloader sequence, category filtering, search prompt interactions, project detail drawer with acoustic muffle trigger, keyboard navigation (Space = play/pause, Left/Right = prev/next song). |

---

## 3. Step-by-Step Implementation Roadmap

### Phase 1: Active Theory Radio & Sound Design Engine
- [ ] **Task 1.1:** Build `assets/js/audio-engine.js` with the 8 authentic Active Theory tracks:
  - Configure track array with titles and direct CDN URLs (`https://activetheory.net/assets/music/...`).
  - Set up Web Audio graph: `AudioElementSource` $\to$ `BiquadFilterNode (lowpass)` $\to$ `GainNode (master)` $\to$ `AnalyserNode` $\to$ `Destination`.
  - Implement `setMuffled(boolean)` with smooth exponential ramp ($20000\text{Hz} \leftrightarrow 480\text{Hz}$).
  - Implement `nextTrack()`, `prevTrack()`, `togglePlay()`, `setVolume()`, and `shuffle()`.
  - Implement real-time frequency data extraction for UI equalizer bars.
  - Implement procedural UI sound effects (click chirp, hover tick, modal thud).

### Phase 2: Active Theory 3D WebGL Scene
- [ ] **Task 2.1:** Overhaul `assets/js/three-scene.js` using Three.js r170:
  - **Iridescent Crystalline Spine:** Generate segmented parametric vertebrae column with custom GLSL PBR shader featuring Fresnel chromatic dispersion (rainbow iridescent sheen on specular highlights).
  - **Volumetric Swarming Particle Cloud:** 4,000+ instanced colored point particles (magenta `#f43f5e`, cyan `#00f2fe`, violet `#8b5cf6`, amber `#f59e0b`) with curl-noise orbital trajectories reacting to mouse delta and scroll speed.
  - **3D Spatial Project Carousel:** Position floating frosted glass mesh planes in 3D arc space with subtle tilt, specular reflection borders, and smooth mouse-inertia navigation.
  - **Post-Processing:** UnrealBloomPass (subtle 0.35 bloom), film grain pass, and camera depth-of-field responsiveness.

### Phase 3: HTML Markup & Active Theory V6 Layout
- [ ] **Task 3.1:** Update `index.html`:
  - Embed the **ASCII Preloader Sphere** with animated digits and `/ / / 75 / / /` matrix.
  - Top header with brand mark, radio player ticker (`<<` `01. Sergey Azbel - Themis` `>>`), audio visualizer bars, and `WORK — CONTACT` pill.
  - Left column: `WHAT ARE YOU LOOKING FOR?` with interactive terminal links (`-> WEBSITES & CRM`, `-> 3D EXPERIENCES`, `-> AI AGENTS`, `-> REALTIME GIS`, `-> MOBILE APPS`).
  - Center 3D stage with spatial project carousel.
  - Bottom left: `[ ASK ME ANYTHING... ]` search / AI prompt input.
  - Project detail slide-out drawer with rich metadata, tech stacks, live links, and GitHub sources.

### Phase 4: CSS Architecture & Active Theory Design Tokens
- [ ] **Task 4.1:** Overhaul `assets/css/style.css`:
  - Pure `#000000` void theme with frosted glassmorphism (`backdrop-filter: blur(24px)`).
  - Marquee ticker CSS animation for song titles.
  - Ambient cyan light bleed underneath navigation pills.
  - Terminal typography styling with glowing cyan accents (`#00f2fe`) and muted bone text (`#e2e8f0`).
  - Responsive mobile breakpoints ensuring cards and radio player collapse seamlessly on iOS/Android.

### Phase 5: UI Controller & Interactivity
- [ ] **Task 5.1:** Update `assets/js/ui.js`:
  - Hook up ASCII preloader dismissal once WebGL shaders compile.
  - Connect radio ticker buttons (`<<`, `>>`, play/pause) to `audio-engine.js`.
  - Connect category filter clicks to 3D carousel focus.
  - Connect project clicks to detail drawer and trigger `setMuffled(true)`.
  - Connect drawer close to trigger `setMuffled(false)`.
  - Support keyboard shortcuts: `Space` (Play/Pause Radio), `[` / `]` (Prev/Next track), `M` (Mute).

### Phase 6: Local Verification & Visual QA
- [ ] **Task 6.1:** Run local test server via python script.
- [ ] **Task 6.2:** Capture headless Edge screenshots in both normal state, radio playing state, and project drawer open state.
- [ ] **Task 6.3:** Verify with `vision_analyze` to ensure 1:1 Active Theory visual fidelity, typography alignment, and zero graphical glitches.

### Phase 7: Deployment to GitHub Pages & Live Production Audit
- [ ] **Task 7.1:** Commit changes with descriptive semantic message:  
  `feat(activetheory): v5 full Active Theory V6 work redesign, 3D crystalline spine, and Active Theory Radio integration`.
- [ ] **Task 7.2:** Push to `main` (`github.com/l2bote4game/arch1cat_site`).
- [ ] **Task 7.3:** Verify live deployment on `https://arch1cat.github.io/` via curl and headless Edge screenshot.

---

## 4. Verification Criteria & Proof Commands
1. **Audio Engine Verification:**  
   Node / headless browser verifies that all 8 tracks load with status 200 and Web Audio `AudioContext` initializes without errors.
2. **WebGL Scene Verification:**  
   Screenshot confirms the 3D crystalline spine, colored particle clouds, and floating project cards render smoothly without console exceptions.
3. **Radio & Ticker Verification:**  
   Marquee song ticker displays the active song, equalizer bars animate, and clicking `<<` / `>>` changes the track.
4. **Muffled Audio Verification:**  
   Opening a project drawer clamps low-pass filter frequency to $480\text{Hz}$; closing it smoothly restores $20000\text{Hz}$.
5. **Live Production Audit:**  
   `https://arch1cat.github.io/` captured via Edge headless, verified via `vision_analyze`.
