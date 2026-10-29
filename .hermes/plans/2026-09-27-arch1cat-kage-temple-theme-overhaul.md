# ARCH1CAT Portfolio V7: Complete ThreeUI "Kage" Temple Theme Overhaul & Active Theory Radio Integration

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan. Mark completed tasks with - [x].

**Goal:** Overhaul `https://arch1cat.github.io` (repo at `C:/Users/z/Desktop/arch1cat_site`) by adopting the full **ThreeUI "Kage" Temple Landing Page architecture** (`https://threeui.com/landing-pages/kage.html`): a true scroll-driven Three.js camera journey through a Kyoto mountain temple after dark (charred cypress, lantern light, vermilion moon, procedural architecture, zero external 3D models), combined with arch1cat's flagship engineering portfolio and the stolen Active Theory Radio player.

---

## 1. Architectural & Aesthetic Analysis

### A. The ThreeUI "Kage" Design System
* **Atmospheric Zen-Gothic Nocturne:**
  - Background: Deep matte ink black (`#05070a` / `#0a0e12`).
  - Accent colors: Sacred vermilion (`#e0231c`), lantern ember (`#ff5a3c`), antique gold (`#c9a24a`), pale sage bone white (`#dfe7e0`).
  - Typography: Minimalist modern grotesque (`Onest`) paired with authentic Japanese kanji typography (`NotoJP` / Mincho).
* **Scroll-Choreographed Three.js Camera Travel:**
  - The entire page responds directly to vertical page scroll:
    * As the user scrolls down, the virtual camera glides along a 3D Bezier curve through the mountain sanctuary.
    * Real-time parallax depth: foreground stone lanterns with warm amber point lights, glowing shōji lattice screens, charred yakisugi wood, autumn maple branches, and the rising vermilion moon.
    * 100% runtime procedural: generated from scratch using Three.js buffer geometries, canvas-procedural textures, and custom GLSL shaders (zero external gltf files to download).
* **5-Chapter Narrative Portfolio Structure:**
  1. **Prologue / Hero (影の道):** *"Where stillness reveals the unseen."* — arch1cat brand, philosophy, threshold indicators.
  2. **Chapter 01 (山門 The Sanmon):** *"Charred cypress, worn stone, one gate left open."* — Architectural principles, craft philosophy, system architecture.
  3. **Chapter 02 (庭園 Still Gardens):** *"Approach, Lanterns, Moonwater."* — Interactive 3D field notes showcasing flagship engineering: **Yotei CRM**, **WARDOGS 3D**, **World Monitor**, **openGym**, **WiFi Scanner**.
  4. **Chapter 03 (焼杉 Sacred Craft):** *"Yakisugi: burning a board black so the weather will let it live."* — Autonomous AI agents, multi-agent orchestration, and high-throughput privacy systems.
  5. **Chapter 04 (朱月 Night Rituals):** *"The Vermilion Moon."* — Continuous contribution telemetry, GitHub activity stream, public repositories.
  6. **Chapter 05 (余光 Afterlight):** *"The gate does not close behind you."* — Direct communication channels (Telegram `@Archi_____cat`, X, GitHub), colophon.

### B. Preserving the Stolen Active Theory Radio
* We preserve the **8 authentic Active Theory radio tracks** (`Sergey Azbel - Themis`, `nuer self - Dusk`, etc.) in an elegant, minimal audio capsule docked inside Kage's header pill, complete with playback toggle, animated equalizer bars, and track navigation.

---

## 2. File Organization

| File | Purpose |
| :--- | :--- |
| `index.html` | Complete Kage landing page markup: header, 5 chapters, interactive garden field notes, radio dock, and colophon. |
| `assets/kage/three.min.js` | Local Three.js runtime (downloaded from ThreeUI). |
| `assets/kage/fonts.css` | Local font declarations (`Onest`, `NotoJP`, `Wordmark`). |
| `assets/kage/kage-engine.js` | Extracted & adapted procedural 3D Kyoto temple engine: camera spline choreographer, procedural wood/stone/shoji shaders, stone lanterns, vermilion moon. |
| `assets/css/kage-style.css` | Kage CSS design tokens, scroll-driven reveal transitions, glass cards, and typography. |
| `assets/js/audio-engine.js` | Active Theory Radio streaming engine with Web Audio graph. |

---

## 3. Implementation Steps

### Phase 1: Local Engine & Asset Assembly
- [ ] **Task 1.1:** Verify `assets/kage/three.min.js` and `assets/kage/fonts.css` are intact.
- [ ] **Task 1.2:** Extract Script 2 from `kage_full.html` into `assets/kage/kage-engine.js`, refactoring it into a clean, modern ES module that binds to `#webgl` canvas and listens to window scroll.

### Phase 2: HTML Structure & Content Adaptation
- [ ] **Task 2.1:** Overhaul `index.html` with Kage's exact semantic markup:
  - Header with Kage emblem, chapter navigation, and Active Theory Radio dock.
  - Hero section with Japanese kanji calligraphy and chapter cards.
  - Section 01 (Sanmon Gate) with architectural craft statement.
  - Section 02 (Still Gardens) with the 3 interactive field note cards for **Yotei CRM**, **WARDOGS 3D**, and **World Monitor**.
  - Section 03 (Sacred Craft) with engineering principles.
  - Section 04 (Night Rituals) with GitHub snake contribution grid and telemetry.
  - Section 05 (Afterlight) with contact links and colophon.

### Phase 3: CSS Styling & Responsive Design
- [ ] **Task 3.1:** Extract and adapt Kage's CSS styles into `assets/css/kage-style.css`.
- [ ] **Task 3.2:** Style the radio player capsule to harmonize with Kage's `--ink` and `--vermilion` palette.
- [ ] **Task 3.3:** Ensure responsive layouts for mobile and desktop screens.

### Phase 4: Local QA & Headless Edge Verification
- [ ] **Task 4.1:** Launch local test server via python script.
- [ ] **Task 4.2:** Capture screenshots at:
  - Scroll Y = 0 (Hero & Sanmon Gate)
  - Scroll Y = 1200 (Chapter 01 - The Sanmon)
  - Scroll Y = 2400 (Chapter 02 - Still Gardens & Field Notes)
  - Scroll Y = 4000 (Vermilion Moon & Telemetry)
- [ ] **Task 4.3:** Verify with `vision_analyze` to ensure 1:1 visual perfection, procedural 3D temple rendering, and smooth scroll response.

### Phase 5: Production Deployment & Live Audit
- [ ] **Task 5.1:** Commit changes: `feat(theme): Kage Kyoto mountain temple 3D experience with Active Theory radio`.
- [ ] **Task 5.2:** Push to `origin/main` (`github.com/Arch1cat/arch1cat.github.io`).
- [ ] **Task 5.3:** Verify live production URL `https://arch1cat.github.io/` via curl and headless Edge screenshot.
- [ ] **Task 5.4:** Create `threeui-architecture` skill documenting ThreeUI's procedural 3D landing page patterns.
