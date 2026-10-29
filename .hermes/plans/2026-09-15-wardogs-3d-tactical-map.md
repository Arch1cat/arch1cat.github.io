# WARDOGS 3D Tactical Map // Line of Sight, Viewshed & Combined Arms Simulator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-performance, standalone online 3D tactical map and Line of Sight (LOS) / Viewshed / Ballistics calculator for the game **WARDOGS** (Steam 1867240), with real-time terrain visibility raymarching, sniper/recon sightlines, artillery/mortar 3D trajectory collision & dead zone calculation, ПВО (Air Defense) radar envelope masking, and cross-section elevation profiling; create a dedicated GitHub repository (`wardogs-tactical-map`) and deploy to GitHub Pages.

**Architecture:** A client-side WebGL / Three.js r170 web application with a dual-viewport system: full 3D interactive terrain scene (orbit, pan, first-person observer scope view) and synchronized 2D tactical top-down minimap. Procedural heightfield generation for WARDOGS official maps (**Bakurani**, **Ozeti**, **Zestafona**) with sub-meter bilinear elevation sampling. Fast radial raymarching viewshed engine projecting dynamic 360° visibility heatmaps (Green = Visible, Red = Obstructed) onto 3D terrain; real-time 2D elevation cross-section drawer; 3D ballistic trajectory solver for L81 Mortar and SPH-2 Artillery with terrain collision detection; 3D ПВО radar coverage dome with terrain masking shadows; URL hash state serialization for squad sharing.

**Tech Stack:** Three.js (r170 ESM), HTML5 Canvas 2D (elevation profile & minimap), Tailwind CSS (CDN), Lucide Icons, Web Audio API (tactical clicks/chirps), Vanilla JS modular ESM architecture, GitHub Pages + Git SSH deployment.

---

## Global Constraints
- Target platform: Standalone WebGL web application hosted on GitHub Pages (`https://l2bote4game.github.io/wardogs-tactical-map/`).
- Local directory: `C:/Users/z/Desktop/wardogs-tactical-map`.
- Repository name: `wardogs-tactical-map` under GitHub user `l2bote4game`.
- Zero backend dependencies: 100% client-side, zero build step required, instant loading on desktop and mobile.
- Game fidelity: Calibrated to WARDOGS game mechanics (maps: Bakurani, Ozeti, Zestafona; 2x2km Control Zones; weapons: L81 81mm Mortar [1100–1500 MIL], SPH-2 155mm Howitzer [Low/High Arc], Snipers/Recon [Prone/Crouch/Standing/Mast], ПВО / Air Defense).
- Visual standard: Military C2 / OSINT tactical console aesthetic (deep graphite/obsidian `#090B10`, luminous tactical green `#10B981`, laser cyan `#00F2FE`, warning amber `#F59E0B`, hostile red `#EF4444`, NATO-style iconography, topographic contour overlays).
- All file paths must be absolute (`C:/Users/z/Desktop/wardogs-tactical-map/...`).

---

## File Structure

```
C:/Users/z/Desktop/wardogs-tactical-map/
├── index.html                   # Main tactical application markup, HUD overlays, toolbars, drawer
├── assets/
│   ├── css/
│   │   └── tactical.css         # Tactical military C2 styling, HUD panels, radar grid, crosshairs
│   └── js/
│       ├── config.js            # WARDOGS map configs (Bakurani, Ozeti, Zestafona), weapon ballistics tables
│       ├── terrain-engine.js    # Heightfield generation, LOD mesh, contour shaders, elevation queries
│       ├── viewshed-engine.js   # Line of Sight (LOS) raymarching, 360° visibility canvas, eye-level FPV
│       ├── ballistics-engine.js # L81 & SPH-2 3D trajectory curves, ridge collision, dead zones
│       ├── air-defense-engine.js# ПВО radar dome, terrain masking shadow projection, altitude floor
│       ├── elevation-profile.js # Real-time 2D cross-section graph between Observer and Target
│       ├── minimap.js           # Synchronized 2D tactical top-down minimap with player/target pings
│       ├── audio.js             # Web Audio API procedural tactical clicks, radio static, laser pings
│       └── app.js               # Application coordinator, tool switching, URL hash state sync
├── archive/
│   └── qa/                      # Headless screenshot verification scripts & captures
└── README.md                    # Documentation, tactical guide, features, GitHub Pages link
```

---

## Detailed Implementation Tasks

### Task 1: Repository Initialization & Project Scaffolding
**Files:**
- Create: `C:/Users/z/Desktop/wardogs-tactical-map/README.md`
- Create: `C:/Users/z/Desktop/wardogs-tactical-map/.gitignore`

**Interfaces:**
- Produces: Clean local git repository configured for `git@github.com:l2bote4game/wardogs-tactical-map.git`.

- [ ] **Step 1: Create directory and initialize git repository**
  Initialize `C:/Users/z/Desktop/wardogs-tactical-map` with git, default branch `main`.
- [ ] **Step 2: Create remote repository on GitHub via GitHub API**
  Create `l2bote4game/wardogs-tactical-map` on GitHub using the existing credential token.
- [ ] **Step 3: Commit initial scaffolding and push to GitHub**
  Push initial commit to `origin main`.

---

### Task 2: Tactical Map Configurations & Ballistics Data (`config.js`)
**Files:**
- Create: `C:/Users/z/Desktop/wardogs-tactical-map/assets/js/config.js`

**Interfaces:**
- Produces: `MAP_CONFIGS` (Bakurani, Ozeti, Zestafona bounds, size in meters, elevation range, choke points), `WEAPON_CONFIGS` (L81 Mortar, SPH-2 Howitzer, Precision Rifle, MANPADS/SAM ПВО specs).

- [ ] **Step 1: Define map specifications for Bakurani, Ozeti, Zestafona**
  Exact coordinates: 2000m x 2000m playable grid, 100m tactical cells, elevation ranges (e.g. 50m to 420m ASL for Bakurani mountains), major landmark coordinates (Bunker, Industrial Plant, Radio Tower, Valley Pass).
- [ ] **Step 2: Define weapon ballistic profiles**
  - **L81 81mm Mortar**: Min range 400m, max range 1800m, velocity 180 m/s, pitch 45°–85° (800–1500 mils), flight time formulas.
  - **SPH-2 155mm Howitzer**: Min range 800m, max range 3500m, high/low arc solutions.
  - **Recon / Sniper Rifle**: Muzzle velocity 850 m/s, bullet drop constants, zeroing increments (100m steps).
  - **Air Defense (ПВО)**: Radar search radius 2500m, engagement bubble 2000m, minimum radar floor 15m.
- [ ] **Step 3: Stance & Observer heights**
  Prone: 0.35m, Crouch: 1.05m, Standing: 1.75m, Light Vehicle: 2.4m, Armor/Mast: 3.8m, Observation Tower: 14.0m, Tactical Drone: 45.0m.

---

### Task 3: 3D Terrain Engine with Topographic Contours (`terrain-engine.js`)
**Files:**
- Create: `C:/Users/z/Desktop/wardogs-tactical-map/assets/js/terrain-engine.js`

**Interfaces:**
- Produces: `createTerrain(mapId)`, `getElevation(x, y)`, `worldToGrid(x, z)`, `gridToWorld(col, row)`, `setContourInterval(meters)`.

- [ ] **Step 1: Implement realistic multi-frequency fractal heightfield generation for each map**
  Generate customized topographic elevation matrices (256x256 / 512x512 grid):
  - **Bakurani**: High alpine ridges, steep jagged peaks, central river valley, fortified mountain saddle.
  - **Ozeti**: Rolling plateau hills, deep ravine choke point, stepped quarries, open agricultural basin.
  - **Zestafona**: Industrial highland, stepped terracing, rocky promontories, rail corridor depression.
- [ ] **Step 2: Build Three.js custom terrain mesh with elevation color ramp & topographic contours**
  Custom GLSL fragment shader displaying tactical terrain texture:
  - Base satellite/tactical elevation palette (dark slate in depressions, muted sage in valleys, weathered granite on ridges, snow/rock on high peaks).
  - Procedural topographic contour isolines (subtle line every 10m, prominent line every 50m with elevation numbers).
  - 100m military grid lines and 1km major grid lines.
- [ ] **Step 3: Implement sub-meter bilinear interpolation for `getElevation(x, y)`**
  Instant mathematical elevation lookups at any continuous coordinate for raymarching and trajectory collision checks.

---

### Task 4: Real-time Line of Sight (LOS) & 360° Viewshed Engine (`viewshed-engine.js`)
**Files:**
- Create: `C:/Users/z/Desktop/wardogs-tactical-map/assets/js/viewshed-engine.js`

**Interfaces:**
- Produces: `computeLineOfSight(observer, target)`, `computeViewshed(observer, options)`, `updateViewshedTexture()`, `setObserverStance(height)`.

- [ ] **Step 1: Point-to-Point LOS Laser**
  Calculates clearance between Observer $(x_1, y_1, z_1)$ and Target $(x_2, y_2, z_2)$.
  Samples 200 points along the ray. If blocked by terrain, returns `{ visible: false, obstacleDistance: d, collisionPoint: {x,y,z}, clearance: -h }`. If clear, returns `{ visible: true, minClearance: h_min }`.
  Renders a 3D laser line (luminous green if clear, neon red with pulsating impact point if blocked).
- [ ] **Step 2: 360° Radial Viewshed Raymarcher**
  Radial sweep (360 rays, 1° angular resolution, 150 range steps per ray):
  Computes maximum horizon angle from the observer's eye. Points below the current horizon are in shadow (blocked); points reaching or exceeding the horizon are visible.
  Draws visibility mask to a high-speed 2D canvas texture:
  - Green / Cyan `#10B981` (100% visible).
  - Translucent Red `#EF4444` (blind / dead zone).
  - Directional FOV masking (cone limits, e.g. 60° sniper view vs 360° panoramic).
  Projects dynamically onto the 3D terrain surface.
- [ ] **Step 3: First-Person Observer Scope Mode (FPV)**
  Smooth camera flight directly into the observer's exact eye position.
  Overlays sniper reticle (MIL dots, range finder scales, zeroing indicator) and enables zoom magnification (1x, 4x, 10x, 20x) to preview actual in-game target visibility.

---

### Task 5: 3D Ballistics & Dead Zone Solver (`ballistics-engine.js`)
**Files:**
- Create: `C:/Users/z/Desktop/wardogs-tactical-map/assets/js/ballistics-engine.js`

**Interfaces:**
- Produces: `solveMortarTrajectory(gunPos, targetPos, weaponType)`, `checkRidgeClearance(trajectoryPoints)`, `renderTrajectory3D(solution)`.

- [ ] **Step 1: Parabolic ballistic trajectory solver with terrain elevation compensation**
  Solves flight equations taking into account gun altitude $Z_{gun}$ and target altitude $Z_{target}$.
  Calculates distance, azimuth (degrees and MIL: $0-6400$), elevation angle, flight time ($t_{flight}$), and apex altitude.
  Supports both **High Arc** (plunging fire for mortars/howitzers) and **Low Arc** (direct fire).
- [ ] **Step 2: 3D Trajectory curve & obstacle collision check**
  Samples 100 points along the parabolic curve against `getElevation(x, y)`.
  If the trajectory drops below terrain before reaching the target (e.g. hits a hill crest or ridge along the path), flags trajectory as **OBSTRUCTED** and marks the collision crest in bright red.
- [ ] **Step 3: Artillery Dead Zones Visualizer**
  Calculates steep mountain backslopes where the projectile's descent angle cannot clear the crest, highlighting "Safe from Artillery" shelters.

---

### Task 6: ПВО (Air Defense) Radar Envelope & Low-Altitude Masking (`air-defense-engine.js`)
**Files:**
- Create: `C:/Users/z/Desktop/wardogs-tactical-map/assets/js/air-defense-engine.js`

**Interfaces:**
- Produces: `createAirDefenseSite(position, systemType)`, `computeRadarShadows(sitePosition)`, `renderRadarDome3D()`.

- [ ] **Step 1: 3D Radar Coverage Dome**
  Renders a wireframe hemisphere dome showing max detection and engagement range with sweeping radar sweep beam animation.
- [ ] **Step 2: Terrain Masking & Radar Shadow Analysis**
  Calculates radar line of sight against low-flying aircraft/drones (NOE - Nap of the Earth flight paths).
  Highlights radar blind valleys (where helicopters and drones can fly behind mountain ridges without triggering radar lock).

---

### Task 7: Real-time Elevation Cross-Section HUD Drawer (`elevation-profile.js`)
**Files:**
- Create: `C:/Users/z/Desktop/wardogs-tactical-map/assets/js/elevation-profile.js`

**Interfaces:**
- Produces: `renderElevationProfile(observer, target, canvasElement)`.

- [ ] **Step 1: 2D Canvas cross-section renderer**
  Extracts 120 elevation samples along the straight line from Observer to Target.
  Draws clean vector profile:
  - Solid filled terrain curve with gradient.
  - Observer icon with height offset ($+1.75$m).
  - Target icon with height offset.
  - Direct Sightline laser (green or red).
  - Ballistic mortar/artillery flight arc superimposed over terrain profile.
  - Critical metrics overlay: Distance (m), Elevation Delta $\Delta h$ (m), Sightline Angle (° / MIL), Obstacle Crest clearance.

---

### Task 8: Synchronized 2D Minimap & Tactical Symbology (`minimap.js`)
**Files:**
- Create: `C:/Users/z/Desktop/wardogs-tactical-map/assets/js/minimap.js`

**Interfaces:**
- Produces: `initMinimap(container)`, `updateMinimap(camera, markers, viewshedData)`.

- [ ] **Step 1: 2D Top-down orthographic tactical radar display**
  Displays full map overview with military grid coordinates (Alpha-Numeric e.g. A1 - K10).
  Shows camera frustum field-of-view cone in real time.
- [ ] **Step 2: Draggable tactical markers & 2x2km Control Zone**
  Standard NATO-inspired tactical icons:
  - Observer / Sniper position.
  - Target ping (Hostile vehicle, infantry squad, bunker).
  - Artillery / Mortar battery.
  - ПВО / SAM launcher.
  - Randomized 2x2km Control Zone square with rotation and score indicator (inspired by WARDOGS King-of-the-Hill mechanic).

---

### Task 9: Tactical User Interface, HUD, Audio & State Management (`index.html`, `tactical.css`, `app.js`, `audio.js`)
**Files:**
- Create: `C:/Users/z/Desktop/wardogs-tactical-map/index.html`
- Create: `C:/Users/z/Desktop/wardogs-tactical-map/assets/css/tactical.css`
- Create: `C:/Users/z/Desktop/wardogs-tactical-map/assets/js/audio.js`
- Create: `C:/Users/z/Desktop/wardogs-tactical-map/assets/js/app.js`

**Interfaces:**
- Full tactical interface layout: Top bar (Map selector, Coordinates, Compass, Grid toggle, Elevation toggle), Left Tool Rail (Observer, Target, Mortar, Air Defense, Control Zone, Ruler), Bottom Drawer (Elevation Cross-Section & Firing Solution), Right Panel (Viewshed settings: Radius, FOV, Stance, Camera Modes: Orbit / Top-Down / FPV Scope).
- Web Audio procedural sound effects (click, ping, lock, sweep).
- URL hash serialization (`#map=bakurani&obs=1024,850,1.75&tgt=1450,1120&wpn=l81`) for instant squad link sharing.

---

### Task 10: Headless Verification, Visual QA Audit & GitHub Pages Deployment
**Files:**
- Create: `C:/Users/z/Desktop/wardogs-tactical-map/archive/qa/verify_wardogs_map.py`
- Test: Multi-angle screenshots (3D Orbit, Viewshed Active, Elevation Profile Open, Mortar Ballistics Arc, ПВО Radar Dome).
- Push to GitHub: Deploy to `main` branch and verify live URL.

- [ ] **Step 1: Run local server and capture headless Edge screenshots**
  Verify 3D terrain rendering, viewshed projection, elevation profile, and tactical HUD.
- [ ] **Step 2: Visual inspection with `vision_analyze`**
  Ensure zero visual clipping, high readability, military aesthetic, crisp icons.
- [ ] **Step 3: Push to GitHub & enable GitHub Pages**
  Push repository to `git@github.com:l2bote4game/wardogs-tactical-map.git`.

---

## Execution Handoff

Plan complete and saved to `C:/Users/z/Desktop/arch1cat_site/.hermes/plans/2026-09-15-wardogs-3d-tactical-map.md`. Two execution options:

1. **Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration
2. **Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
