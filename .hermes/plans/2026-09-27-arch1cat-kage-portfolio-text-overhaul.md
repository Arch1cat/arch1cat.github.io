# ARCH1CAT Portfolio V8: Complete Content & Persona Overhaul for Kage Temple Theme

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan. Mark completed tasks with - [x].

**Goal:** Transform all textual copy on `https://arch1cat.github.io` from generic Kyoto temple monk prose into a 100% authentic, badass portfolio representation of **arch1cat (@Archi_____cat / Керя)** as **Chief System & UX Architect, Full-Stack Developer, and Creative Technologist**, while **STRICTLY PRESERVING** the award-winning ThreeUI Kage 3D scene, shaders, camera scroll choreography, and layout hierarchy without breaking a single visual element.

---

## 1. Safety Directives: How to Guarantee Zero Design Breakage

1. **Zero DOM Attribute Drift:**
   - Every `data-cam`, `data-rv`, `data-chip`, `data-view`, `data-frame`, `data-les`, and `data-fg` attribute must remain exactly in place.
   - `kage-engine.js` binds to:
     * `$$('[data-cam]')` (Camera waypoints)
     * `$$('[data-chip]')` (Hero chapter pills)
     * `$$('[data-view]')` (Interactive 3D camera peek frames)
     * `$$('[data-les]')` (Discipline cards)
     * `$$('[data-rv], .mask-line')` (Scroll-reveal transitions)
     * `$$('.card')` (Interactive project cards)
2. **Zero Class Drift:**
   - All classes (`display`, `h-hero`, `mask-line`, `eyebrow`, `chip`, `peek`, `sec`, `sec-head`, `gate-grid`, `gate-copy`, `cards`, `card`, `card-fr`, `glow`, `cur`, `les`, `fin`, `fg`, `fg-el`, etc.) must remain unchanged.
3. **Preserve Japanese Aesthetic Harmony:**
   - Keep Japanese kanji sub-labels (`山門`, `庭園`, `手業`, `残光`, `不動産`, `弾道学`, `諜報`, `影の道`) beside English titles to maintain the unique cyber-Kyoto aesthetic.

---

## 2. Content Mapping: Replacing Generic Prose with Real Engineering Portfolio

### A. Navigation & Top Header (`.nav`)
* **Brand Logo:** `ARCH1CAT` / `CHIEF SYSTEM ARCHITECT`
* **Radio Capsule:** Active Theory Radio Player (8 authentic tracks, live equalizer, play/pause, mute)
* **Nav Links:**
  - `Foundations` (`基盤`) `#gate`
  - `Works` (`作品`) `#pathways`
  - `Craft` (`手業`) `#lessons`
  - `Signal` (`連絡`) `#eternity`
  - External pills: `Yotei CRM`, `WARDOGS 3D`, `AI Matrix` (`ai-matrix.html`)

### B. Hero Section (`#hero`, `data-cam="0"`)
* **Eyebrow:** `<span class="dot"></span> Chapter 00 — The Architecture`
* **Display Headline:**
  ```html
  <span class="mask-line"><span>Where craft</span></span>
  <span class="mask-line"><span>reveals the</span></span>
  <span class="mask-line"><span>unseen.</span></span>
  ```
* **Hero Subtitle:**  
  *Software as craft & play. Portfolio of arch1cat — Chief System & UX Architect. Production proptech intelligence, sub-meter 3D WebGL engines, autonomous multi-agent AI ecosystems, and native Android systems.*
* **Hero Scroll Cue:** `Scroll down to enter the sanctuary`
* **The 4 Chapter Chips (`#chips`):**
  - `01 Systems`: Enterprise proptech & distributed cloud infrastructure (Yotei CRM).
  - `02 WebGL 3D`: Sub-meter DEM raymarching & tactical simulators (WARDOGS 3D).
  - `03 Autonomous AI`: Multi-agent orchestration, CoT planning & Hermes toolkits.
  - `04 Native Kotlin`: Jetpack Compose, RF diagnostics & Android security engines.
* **Interactive 3D Peek Badge (`.peek`):**
  - Kanji: `作品`
  - Title: `Yotei CRM — Proptech Core`

---

### C. Chapter 01: Foundations (`#gate`, `data-cam="1"`)
* **Section Header:** `01 — The Foundations` / `基盤`
* **Headline (`.h-sec`):** `Architectural rigor, zero-fluff code, systems built to endure.`
* **Lead Copy (`.lead`):**  
  *Architecture begins where noise stops: deterministic pipelines, strict domain taxonomies, and production reliability. No half-baked stubs or superficial prototypes. Every system is built to survive high load, edge latency, and relentless scale.*
* **Body Copy (`.body`):**  
  *Pair programming with frontier AI and human intuition. Full-stack engineering spanning Cloudflare Workers, Next.js, Three.js WebGL 2.0, and native Android Kotlin. From enterprise CRM pipelines syncing thousands of properties to sub-millisecond tactical ballistics simulators.*
* **CTA Link (`.arrowlink`):** `Inspect the systems ->`
* **Metrics Grid (`.gate-stats`):**
  - `08` / `Core Systems`
  - `100M+` / `Tokens Reasoned Daily`
  - `1,611` / `Production Commits`
  - `60 FPS` / `Real-Time WebGL`

---

### D. Chapter 02: Flagship Works (`#pathways`, `data-cam="2"`)
* **Section Header:** `02 — Flagship Works` / `作品`
* **The 3 Interactive 3D Garden Cards (`.cards`):**
  - **Card 01 (`data-view="0"`):**
    * Label: `Yotei CRM`
    * Kanji: `不動産`
    * Meta: `Enterprise Proptech Core` / `yotei.com.ua ↗`
  - **Card 02 (`data-view="1"`):**
    * Label: `WARDOGS 3D`
    * Kanji: `弾道学`
    * Meta: `Tactical GIS & Ballistics` / `Live WebGL ↗`
  - **Card 03 (`data-view="2"`):**
    * Label: `World Monitor`
    * Kanji: `諜報`
    * Meta: `Global OSINT Telemetry` / `GitHub ↗`

---

### E. Chapter 03: Engineering Disciplines (`#lessons`, `data-cam="3"`)
* **Section Header:** `03 — Sacred Craft` / `手業`
* **Headline:** `Five disciplines. Relentless execution. One quiet mind.`
* **Sub-lead:** `A philosophy forged through production delivery: deep domain correctness, automated verification gates, and relentless doubt of unverified assumptions.`
* **The 5 Disciplines (`.cur .les`):**
  1. `01 Clean Architecture 山門`: Strict domain boundaries, bidirectional sync, zero-leak state management. (Tag: `Architecture`)
  2. `02 Real-Time WebGL 3D 借景`: Sub-meter DEM raymarching, custom GLSL shaders, 60 FPS performance without heavy external assets. (Tag: `Three.js`)
  3. `03 Autonomous Multi-Agent AI 焼杉`: Hermes orchestration, high-context CoT reasoning, automated verification gates, and agentic toolkits. (Tag: `AI Agents`)
  4. `04 Native Android & RF Systems 灯籠`: Kotlin, Jetpack Compose, 2.4/5GHz RF spectrum graphing, and WebAuthn passkeys. (Tag: `Kotlin`)
  5. `05 Edge Infrastructure & Cloud 朱月`: Cloudflare Workers, D1 distributed SQL, R2 object storage, KV caching, and sub-30ms global response. (Tag: `Cloudflare`)

---

### F. Chapter 04: Direct Signal (`#eternity`, `data-cam="4"`)
* **Eyebrow:** `Chapter 04 — Direct Signal & Collaboration`
* **Display Headline:** `Afterlight`
* **Body Copy:**  
  *The gate does not close behind you. Open to high-stakes 3D WebGL architectures, enterprise SaaS systems, and autonomous multi-agent engineering. Pair programming, consulting, and frontier tech.*
* **Direct Action Buttons:**
  - `Telegram @Archi_____cat ↗`
  - `X (Twitter) @Archi_____cat ↗`
  - `GitHub @l2bote4game ↗`

---

### G. Footer (`.foot`, `data-cam="5"`)
* **Brand Statement:** *arch1cat — Chief System Architect & Creative Technologist. Software as craft & play. Real-time WebGL, multi-agent AI ecosystems, and distributed edge systems.*
* **Navigation Links:** Foundations, Works, Craft, Signal.
* **Core Systems Links:** Yotei CRM, WARDOGS 3D, World Monitor, openGym, WiFi Scanner, Metadata Cleaner, Cats Match-3, AI Matrix.
* **Direct Channels:** Telegram, X, GitHub.
* **Colophon Base:** `© 2026 arch1cat — All systems operational. 影の道`

---

## 3. Step-by-Step Execution Plan

1. **Step 1:** Patch `index.html` with the new copy, maintaining 100% exact DOM structure and classes.
2. **Step 2:** Test locally with Python HTTP server (`scripts/serve_bg.py`).
3. **Step 3:** Use `browser_exec` to scroll through all 5 sections and capture screenshots.
4. **Step 4:** Run `vision_analyze` to verify that all copy is updated and the 3D scene/design is 100% intact.
5. **Step 5:** Commit and push to `origin/main`.
6. **Step 6:** Verify live production on `https://arch1cat.github.io/`.
