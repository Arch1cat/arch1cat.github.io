# ARCH1CAT Portfolio V6: Exact Active Theory Scroll Physics, Distinctive Worlds & 1:1 Showcase Parity

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan. Mark completed tasks with - [x].

**Goal:** Transform `https://arch1cat.github.io` into a 1:1 authentic replica of **Active Theory's Work Experience** (`activetheory.net/work`): implement smooth **vertical inertial scroll physics** where the 3D anatomical spine undulates and travels vertically while project cards glide and snap along a 3D orbital track; deliver **7 distinctive project worlds** with dynamic background palettes, lighting and fog morphing; implement the **exact frosted-glass card anatomy** with spine see-through, and wire up the **interactive right-edge scroll scrubber**.

---

## 1. Root Cause Analysis of User Feedback

| User Feedback | Root Cause in Current Build | 1:1 Active Theory Solution |
| :--- | :--- | :--- |
| **"Оно вниз не двигается"** *(It does not move down)* | The previous build was a static horizontal carousel without vertical travel. Active Theory's entire site is driven by **virtual vertical inertial scroll**: scrolling down translates the spine vertically, glides project cards along a 3D spline from depth into focus, and advances the scrollbar down. | Implement a **virtual momentum scroll engine** (`wheel`, `touch`, `drag`, `scrollbar`) that drives camera/spine vertical travel, card transitions, and scrollbar progress. |
| **"Нет других фонов бро"** *(No other backgrounds)* | The previous build had a single static black void. In Active Theory, each project represents a **distinctive World** with its own color temperature, volumetric fog, rim lights, and particle hue. | Implement **7 dynamic World environments**: each project smoothly cross-fades the scene background, fog color, lighting rig, and iridescent spine caustics. |
| **"Не те же элементы"** *(Not the same elements)* | Cards were flat opaque panels instead of **frosted glass viewports** that let the spine and particles shine through; lacked the exact Active Theory card hierarchy (index + category, centered project glyph/logo, glowing typography, receding side card, and draggable right-edge scroll scrubber). | Redesign 3D cards as **refractive frosted glass placards** with transparent backing, exact Active Theory typography, angled receding side cards, and an interactive draggable vertical scrollbar scrubber. |

---

## 2. 7 Distinctive Project Worlds (Dynamic Atmospheric Morphing)

| World Index | Project Title | Category | Dominant Tone | Background Gradient / Fog | Particle & Spine Rim Colors |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **World 01** | **YOTEI CRM** | WEBSITES & CRM | Cyan / Oceanic | Fog: `#020813`, Ambient: `#00f2fe` | Electric Cyan (`#00f2fe`), Sky Blue (`#0ea5e9`) |
| **World 02** | **WARDOGS 3D** | 3D EXPERIENCES & WEBGL | Tactical Emerald | Fog: `#011009`, Ambient: `#10b981` | Night-Vision Green (`#10b981`), Mint (`#34d399`) |
| **World 03** | **WORLD MONITOR** | REALTIME GIS & TELEMETRY | OSINT Amber Gold | Fog: `#120a02`, Ambient: `#f59e0b` | Warm Gold (`#f59e0b`), Solar Amber (`#d97706`) |
| **World 04** | **OPENGYM** | MOBILE APPS (KOTLIN) | Biometric Neon Pink | Fog: `#14030d`, Ambient: `#ec4899` | Hot Magenta (`#ec4899`), Rose (`#f43f5e`) |
| **World 05** | **WIFI SCANNER** | MOBILE APPS (KOTLIN) | Quantum Violet | Fog: `#0c0418`, Ambient: `#8b5cf6` | Deep Violet (`#8b5cf6`), Indigo (`#6366f1`) |
| **World 06** | **METADATA CLEANER**| AUTONOMOUS AI AGENTS | Matrix Stealth Teal | Fog: `#010e12`, Ambient: `#06b6d4` | Cyber Cyan (`#06b6d4`), Ice Blue (`#38bdf8`) |
| **World 07** | **CATS MATCH-3** | 3D EXPERIENCES & WEBGL | Electric Crimson | Fog: `#140306`, Ambient: `#f43f5e` | Crimson Sparkle (`#f43f5e`), Sunset Orange (`#fb923c`) |

As the user scrolls vertically, the `currentWorld` index interpolates continuously:
$$ \text{Scene Background, FogExp2 Color, Light Colors} \leftarrow \text{lerp}(\text{World}_A, \text{World}_B, \text{fract}(\text{scrollProgress})) $$

---

## 3. Architecture & File Breakdown

| File | Responsibilities |
| :--- | :--- |
| `assets/js/three-scene.js` | **Vertical Inertial Scroll & 3D Spline Path:**<br>• Intercept vertical wheel & drag momentum with silky damping.<br>• Move 3D anatomical spine vertically with organic S-curve undulation.<br>• Position project cards along a 3D orbital curve: active card snaps centered in front of spine, previous card floats up/fades out, next card angles in from depth on the right.<br>• Frosted glass material with transparency so the spine and particle cloud are visible through the cards.<br>• Smooth World color interpolation for fog, lights, and background. |
| `assets/js/ui.js` | **Interactive Controls & Scrubber Sync:**<br>• Right-edge draggable scrollbar scrubber that tracks and controls scroll progress.<br>• Category menu clicks (`-> WEBSITES`, `-> 3D EXPERIENCES`, etc.) smoothly scroll to target project world.<br>• World switcher button (`<< IM WORLD >> 5.`) steps projects.<br>• Project inspection drawer with Active Theory lowpass muffled sound trigger ($480\text{Hz}$).<br>• Active Theory Radio marquee ticker and visualizer updates. |
| `index.html` | **Exact Active Theory V6 Layout:**<br>• Top bar: brand mark, stolen Active Theory radio capsule, `WORK — CONTACT` with cyan glow, world switcher `<< IM WORLD >>` and `⚡ AI UNIVERSE`.<br>• Left sidebar: `WHAT ARE YOU LOOKING FOR?` and category filters.<br>• Right edge: interactive vertical scroll track with draggable thumb.<br>• Bottom bar: search prompt `ASK ME ANYTHING...`, pagination index, social links. |
| `assets/css/style.css` | **Styling & Glassmorphism:**<br>• Frosted glassmorphic card styles, ambient glow bleed, vertical scrollbar scrubber styling, monospace cyberpunk telemetry typography. |

---

## 4. Implementation Steps

### Phase 1: 3D Scene Vertical Inertial Scroll & World Shading (`assets/js/three-scene.js`)
- [ ] Implement `VirtualScrollManager`: smooth momentum physics (`velocity`, `friction: 0.92`, `lerpSpeed: 0.08`).
- [ ] Define the 7 Project Worlds with distinct background, fog, and light color vectors.
- [ ] Link scroll progress to vertical spine translation ($Y$ travel) and organic sinusoidal breathing.
- [ ] Link scroll progress to 3D card spline trajectory:
  * Current active card sits at $(X: 0.8, Y: 0.0, Z: 2.8)$ with high opacity and frosted glass see-through.
  * Upcoming card sits at $(X: 6.2, Y: -0.4, Z: -1.5)$ angled at $25^\circ$.
  * Trailing card floats up to $(X: -5.0, Y: 1.8, Z: -2.5)$ and fades out.
- [ ] Cross-fade scene fog and lighting between worlds on each animation frame.

### Phase 2: Interactive Scrubber & UI Orchestration (`assets/js/ui.js` & `index.html`)
- [ ] Make the right-edge vertical scrollbar thumb draggable: dragging directly scrubs scroll progress.
- [ ] Connect category filter clicks to trigger smooth animated scroll to the target world index.
- [ ] Connect `world-prev-btn` and `world-next-btn` to step between worlds.
- [ ] Update `#world-index-num` and pagination indicator.
- [ ] Ensure project drawer opens on card click and triggers `radio.setMuffled(true)`.

### Phase 3: High-Resolution Frosted Glass Visuals
- [ ] Generate high-contrast, semi-transparent frosted card textures so that the iridescent spine is visible behind the cards.
- [ ] Ensure text typography matches Active Theory (index, logo/glyph, large title, tech tags, prompt).

### Phase 4: Local QA & Headless Edge Verification
- [ ] Capture screenshots at World 01 (Yotei / Cyan), World 02 (WARDOGS / Emerald), and World 03 (World Monitor / Gold).
- [ ] Test vertical scrolling behavior and scrubber positioning.
- [ ] Run `vision_analyze` on captured screenshots to confirm exact parity.

### Phase 5: Production Deployment & Verification
- [ ] Commit with semantic message: `feat(activetheory): v6 vertical inertial scroll, 7 distinctive project worlds, and frosted 3D glass viewports`.
- [ ] Push to `origin/main`.
- [ ] Verify live site on `https://arch1cat.github.io/` via curl and headless Edge screenshot.
