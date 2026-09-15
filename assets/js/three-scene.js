/* ============================================================
   ARCH1CAT — three-scene.js
   "CYBER-SICH OS" // 3D SPATIAL HOLO-DECK ENGINE
   Full-Viewport Interactive 3D Stages (Zero generic vertical scroll)
   8 Distinct 3D Procedural Installations:
   - Stage 0: Prologue // СІЧ-01 Quantum Reactor & Tryzub Core
   - Stage 1: World Monitor // 3D Holographic Globe & Recon Satellite
   - Stage 2: WiFi Scanner // 3D RF Spectrum Bars & Antenna Mast
   - Stage 3: Metadata Cleaner // Encrypted Cube & Privacy Particle Dissolver
   - Stage 4: Cats Match-3 // Kinetic Gem Cascades & Cyber-Cat Mascot
   - Stage 5: openGym // Titanium Mobile Slate & Hydraulic Pistons
   - Stage 6: Yotei CRM // 3D Isometric Architectural Skyscraper Matrix
   - Stage 7: Telemetry // Planetary Signal Nebula & Audio Reactivity
   ============================================================ */

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const isMobile = () => window.innerWidth < 768;
const MOBILE = isMobile();

/* ------------------------------------------------------------
   Procedural Glow Dot Texture
   ------------------------------------------------------------ */
let _dotTex = null;
function getDotTexture() {
    if (_dotTex) return _dotTex;
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.85)');
    grad.addColorStop(0.55, 'rgba(255, 255, 255, 0.2)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    _dotTex = new THREE.CanvasTexture(c);
    return _dotTex;
}

/* ------------------------------------------------------------
   Theme Palettes
   ------------------------------------------------------------ */
const THEMES = {
    'cyber-sich': {
        fog: new THREE.Color(0x02050D),
        keyLight: new THREE.Color(0xFFE885),
        accent1: new THREE.Color(0x0072FF), // Azure
        accent2: new THREE.Color(0xFFB800), // Wheat Gold
        baseMetal: new THREE.Color(0x091224),
        bloom: 0.65
    },
    'chrome-titanium': {
        fog: new THREE.Color(0x060709),
        keyLight: new THREE.Color(0xFFFFFF),
        accent1: new THREE.Color(0xFF4D00), // Solar Orange
        accent2: new THREE.Color(0xFFB800), // Amber
        baseMetal: new THREE.Color(0x15161A),
        bloom: 0.62
    },
    'void-matrix': {
        fog: new THREE.Color(0x04060A),
        keyLight: new THREE.Color(0xD8F5FF),
        accent1: new THREE.Color(0x00F2FE), // Cyan
        accent2: new THREE.Color(0x7C3AED), // Violet
        baseMetal: new THREE.Color(0x08101E),
        bloom: 0.58
    }
};

let currentTheme = document.documentElement.getAttribute('data-theme') || 'cyber-sich';
if (!THEMES[currentTheme]) currentTheme = 'cyber-sich';

/* ------------------------------------------------------------
   Renderer / Scene / Camera Setup
   ------------------------------------------------------------ */
const container = document.getElementById('webgl-container');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(THEMES[currentTheme].fog, 0.02);

const camera = new THREE.PerspectiveCamera(46, window.innerWidth / window.innerHeight, 0.1, 400);
camera.position.set(0, 0.4, 8.8);

const renderer = new THREE.WebGLRenderer({
    antialias: !MOBILE,
    alpha: true,
    powerPreference: 'high-performance'
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, MOBILE ? 1.5 : 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;
container.appendChild(renderer.domElement);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    THEMES[currentTheme].bloom,
    0.45,
    0.15
);
composer.addPass(bloomPass);

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

/* Lights */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(THEMES[currentTheme].keyLight, 2.5);
keyLight.position.set(6, 9, 7);
scene.add(keyLight);

const rimLight = new THREE.DirectionalLight(THEMES[currentTheme].accent1, 2.2);
rimLight.position.set(-7, -5, -6);
scene.add(rimLight);

const cursorSpotLight = new THREE.PointLight(0xffffff, 3.5, 14);
cursorSpotLight.position.set(0, 0, 5);
scene.add(cursorSpotLight);

/* Shared Materials */
const metalMat = new THREE.MeshStandardMaterial({
    color: THEMES[currentTheme].baseMetal,
    metalness: 0.94,
    roughness: 0.18,
    envMapIntensity: 1.2
});

const accent1Mat = new THREE.MeshStandardMaterial({
    color: 0x021124,
    emissive: THEMES[currentTheme].accent1,
    emissiveIntensity: 1.4,
    metalness: 0.9,
    roughness: 0.15
});

const accent2Mat = new THREE.MeshStandardMaterial({
    color: 0x1a1200,
    emissive: THEMES[currentTheme].accent2,
    emissiveIntensity: 1.2,
    metalness: 0.95,
    roughness: 0.12
});

const wireMat = new THREE.MeshBasicMaterial({
    color: THEMES[currentTheme].accent1,
    wireframe: true,
    transparent: true,
    opacity: 0.35
});

/* Stage Master Root */
const stageMaster = new THREE.Group();
stageMaster.position.set(MOBILE ? 0 : 1.8, 0, 0);
scene.add(stageMaster);

/* ============================================================
   STAGE 0: PROLOGUE // СІЧ-01 Quantum Reactor & Tryzub Core
   ============================================================ */
const stage0 = new THREE.Group();
stageMaster.add(stage0);

// Octagonal reactor chassis
const s0Chassis = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.4, 2.3, 8), metalMat);
stage0.add(s0Chassis);

const s0Wire = new THREE.Mesh(new THREE.CylinderGeometry(1.22, 1.42, 2.32, 8), wireMat);
stage0.add(s0Wire);

// Inner pulsing fusion orb
const s0Orb = new THREE.Mesh(new THREE.IcosahedronGeometry(0.75, 4), accent1Mat);
stage0.add(s0Orb);

// Holographic Golden Tryzub
const s0Tryzub = new THREE.Group();
stage0.add(s0Tryzub);

const tStem = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.7, 0.12), accent2Mat);
tStem.position.y = 0.1;
s0Tryzub.add(tStem);

const tTip = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.55, 4), accent2Mat);
tTip.position.y = 1.15;
tTip.rotation.y = Math.PI / 4;
s0Tryzub.add(tTip);

// Tryzub Wings
for (let dir = -1; dir <= 1; dir += 2) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.12, 0.1), accent2Mat);
    bar.position.set(dir * 0.45, -0.3, 0);
    bar.rotation.z = dir * -0.25;
    s0Tryzub.add(bar);

    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.25, 0.1), accent2Mat);
    blade.position.set(dir * 0.72, 0.35, 0);
    s0Tryzub.add(blade);

    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.45, 4), accent2Mat);
    tip.position.set(dir * 0.72, 1.1, 0);
    tip.rotation.y = Math.PI / 4;
    s0Tryzub.add(tip);
}

// Gimbal Ring
const s0Ring = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.035, 12, 64), accent1Mat);
s0Ring.rotation.x = Math.PI / 2.5;
stage0.add(s0Ring);

/* ============================================================
   STAGE 1: WORLD MONITOR // 3D Holographic Globe & Recon Satellite
   ============================================================ */
const stage1 = new THREE.Group();
stageMaster.add(stage1);

const globeGeo = new THREE.SphereGeometry(1.8, 32, 24);
const globeMesh = new THREE.Mesh(globeGeo, wireMat);
stage1.add(globeMesh);

const globeInner = new THREE.Mesh(
    new THREE.SphereGeometry(1.75, 24, 18),
    new THREE.MeshStandardMaterial({
        color: 0x020818,
        roughness: 0.7,
        metalness: 0.3,
        transparent: true,
        opacity: 0.85
    })
);
stage1.add(globeInner);

// Equator & Latitude Data Rings
const eqRing = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.02, 8, 80), accent2Mat);
eqRing.rotation.x = Math.PI / 2;
stage1.add(eqRing);

// Orbiting Recon Satellite
const satGroup = new THREE.Group();
const satBody = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.25, 0.25), metalMat);
satGroup.add(satBody);

const satWingL = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.02, 0.28), accent2Mat);
satWingL.position.x = -0.45;
satGroup.add(satWingL);

const satWingR = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.02, 0.28), accent2Mat);
satWingR.position.x = 0.45;
satGroup.add(satWingR);

satGroup.position.set(2.4, 0.8, 0);
stage1.add(satGroup);

/* ============================================================
   STAGE 2: WIFI SCANNER // 3D RF Spectrum Bars & Antenna Mast
   ============================================================ */
const stage2 = new THREE.Group();
stageMaster.add(stage2);

// Central Antenna Tower
const towerMast = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.16, 3.2, 8), metalMat);
towerMast.position.y = 0.2;
stage2.add(towerMast);

const towerBeacon = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), accent1Mat);
towerBeacon.position.y = 1.85;
stage2.add(towerBeacon);

// 20 Spectrum Waveform Bars
const BAR_COUNT = 20;
const spectrumBars = [];
const barGeo = new THREE.BoxGeometry(0.12, 1.0, 0.12);

for (let i = 0; i < BAR_COUNT; i++) {
    const angle = ((i - BAR_COUNT / 2) / BAR_COUNT) * Math.PI * 0.9;
    const radius = 2.0;
    const bar = new THREE.Mesh(barGeo, i % 2 === 0 ? accent1Mat : accent2Mat);
    bar.position.set(Math.sin(angle) * radius, -0.6, Math.cos(angle) * radius - 0.5);
    bar.userData = { basePhase: i * 0.4, speed: 2.2 + (i % 4) * 0.5 };
    stage2.add(bar);
    spectrumBars.push(bar);
}

/* ============================================================
   STAGE 3: METADATA CLEANER // Encrypted Cube & Privacy Matrix
   ============================================================ */
const stage3 = new THREE.Group();
stageMaster.add(stage3);

const cubeMesh = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.6, 1.6), metalMat);
stage3.add(cubeMesh);

const cubeWire = new THREE.Mesh(new THREE.BoxGeometry(1.68, 1.68, 1.68), wireMat);
stage3.add(cubeWire);

const cubeCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.8, 0), accent2Mat);
stage3.add(cubeCore);

// Disintegrating Privacy Particle Cloud
const PURGE_COUNT = 400;
const purgeGeo = new THREE.BufferGeometry();
const purgePos = new Float32Array(PURGE_COUNT * 3);
const purgeOrigPos = new Float32Array(PURGE_COUNT * 3);

for (let i = 0; i < PURGE_COUNT; i++) {
    const i3 = i * 3;
    const r = 1.8 + Math.random() * 2.2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    purgePos[i3] = purgeOrigPos[i3] = r * Math.sin(phi) * Math.cos(theta);
    purgePos[i3 + 1] = purgeOrigPos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    purgePos[i3 + 2] = purgeOrigPos[i3 + 2] = r * Math.cos(phi);
}
purgeGeo.setAttribute('position', new THREE.BufferAttribute(purgePos, 3));
const purgeMat = new THREE.PointsMaterial({
    size: 0.1,
    map: getDotTexture(),
    color: THEMES[currentTheme].accent1,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending
});
const purgeParticles = new THREE.Points(purgeGeo, purgeMat);
stage3.add(purgeParticles);

/* ============================================================
   STAGE 4: CATS MATCH-3 // Kinetic Gem Cascades & Cyber-Cat Mascot
   ============================================================ */
const stage4 = new THREE.Group();
stageMaster.add(stage4);

// Central Cyber Cat Silhouette Prism
const catPrism = new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 1), accent2Mat);
stage4.add(catPrism);

const catWire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.25, 1), wireMat);
stage4.add(catWire);

// 3 Orbiting Gem Crystals
const gems = [];
const gemGeos = [new THREE.OctahedronGeometry(0.35), new THREE.DodecahedronGeometry(0.3), new THREE.TetrahedronGeometry(0.4)];
for (let g = 0; g < 3; g++) {
    const gem = new THREE.Mesh(gemGeos[g], g === 1 ? accent1Mat : accent2Mat);
    gem.userData = { angle: (g * Math.PI * 2) / 3, radius: 2.2, speed: 1.2 + g * 0.3 };
    stage4.add(gem);
    gems.push(gem);
}

/* ============================================================
   STAGE 5: OPENGYM // Titanium Mobile Slate & Hydraulic Pistons
   ============================================================ */
const stage5 = new THREE.Group();
stageMaster.add(stage5);

// Mobile Device Frame
const phoneFrame = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.5, 0.14), metalMat);
stage5.add(phoneFrame);

const phoneScreen = new THREE.Mesh(new THREE.BoxGeometry(1.24, 2.34, 0.15), accent1Mat);
stage5.add(phoneScreen);

// Dual Hydraulic Pistons
for (let s = -1; s <= 1; s += 2) {
    const pistonCylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.0, 12), metalMat);
    pistonCylinder.position.set(s * 1.3, 0, 0);
    stage5.add(pistonCylinder);

    const pistonRod = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.2, 8), accent2Mat);
    pistonRod.position.set(s * 1.3, 0.2, 0);
    stage5.add(pistonRod);
}

/* ============================================================
   STAGE 6: YOTEI CRM // 3D Isometric Architectural Skyscraper Matrix
   ============================================================ */
const stage6 = new THREE.Group();
stageMaster.add(stage6);
stage6.rotation.x = 0.45;

const cityGrid = new THREE.GridHelper(6, 12, THEMES[currentTheme].accent2, 0x162440);
cityGrid.position.y = -1.2;
stage6.add(cityGrid);

// 9 Skyscraper Towers
const towers = [];
for (let x = -1; x <= 1; x++) {
    for (let z = -1; z <= 1; z++) {
        const height = (x === 0 && z === 0) ? 2.8 : 1.2 + Math.abs(x + z * 2) * 0.5;
        const tower = new THREE.Mesh(
            new THREE.BoxGeometry(0.55, height, 0.55),
            (x === 0 && z === 0) ? accent2Mat : metalMat
        );
        tower.position.set(x * 1.1, -1.2 + height / 2, z * 1.1);
        stage6.add(tower);

        const wire = new THREE.Mesh(new THREE.BoxGeometry(0.56, height + 0.01, 0.56), wireMat);
        wire.position.copy(tower.position);
        stage6.add(wire);
        towers.push(tower);
    }
}

/* ============================================================
   STAGE 7: TELEMETRY // Planetary Signal Nebula & Audio Visualizer
   ============================================================ */
const stage7 = new THREE.Group();
stageMaster.add(stage7);

const nebGeo = new THREE.IcosahedronGeometry(1.6, 2);
const nebMesh = new THREE.Mesh(nebGeo, wireMat);
stage7.add(nebMesh);

const nebCore = new THREE.Mesh(new THREE.IcosahedronGeometry(1.0, 3), accent1Mat);
stage7.add(nebCore);

/* Shared Cosmic Dust Nebula in Background */
const COSMIC_COUNT = MOBILE ? 1200 : 2500;
const cosmicGeo = new THREE.BufferGeometry();
const cosmicPos = new Float32Array(COSMIC_COUNT * 3);
const cosmicColors = new Float32Array(COSMIC_COUNT * 3);

for (let i = 0; i < COSMIC_COUNT; i++) {
    const i3 = i * 3;
    const r = 3.0 + Math.random() * 8.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    cosmicPos[i3] = r * Math.sin(phi) * Math.cos(theta);
    cosmicPos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    cosmicPos[i3 + 2] = r * Math.cos(phi);

    const c = (i % 2 === 0) ? THEMES[currentTheme].accent1 : THEMES[currentTheme].accent2;
    cosmicColors[i3] = c.r;
    cosmicColors[i3 + 1] = c.g;
    cosmicColors[i3 + 2] = c.b;
}

cosmicGeo.setAttribute('position', new THREE.BufferAttribute(cosmicPos, 3));
cosmicGeo.setAttribute('color', new THREE.BufferAttribute(cosmicColors, 3));
const cosmicMat = new THREE.PointsMaterial({
    size: 0.08,
    map: getDotTexture(),
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});
const cosmicSystem = new THREE.Points(cosmicGeo, cosmicMat);
scene.add(cosmicSystem);

/* ============================================================
   Stage Controller & Transitions
   ============================================================ */
const STAGES = [stage0, stage1, stage2, stage3, stage4, stage5, stage6, stage7];
let currentStageIndex = 0;
let targetStageIndex = 0;
let pulseIntensity = 0.0;

// Initialize stages (only stage 0 visible initially)
STAGES.forEach((stg, idx) => {
    stg.scale.setScalar(idx === 0 ? 1.0 : 0.001);
    stg.visible = (idx === 0);
});

window.__goToStage = function (index) {
    if (index < 0 || index >= STAGES.length) return;
    targetStageIndex = index;
    currentStageIndex = index;

    if (window.__playSfx) window.__playSfx('theme');
};

window.__getStageCount = function () {
    return STAGES.length;
};

window.__triggerStagePulse = function () {
    pulseIntensity = 1.0;
    if (window.__playSfx) window.__playSfx('pulse');
};

/* ============================================================
   360° Drag Orbit Interaction with Inertia
   ============================================================ */
let isDragging = false;
let previousPointerX = 0;
let previousPointerY = 0;
let orbitRotationY = 0;
let orbitRotationX = 0;
let targetOrbitY = 0;
let targetOrbitX = 0;
let orbitVelY = 0;
let orbitVelX = 0;

let pointerNDC = new THREE.Vector2(0, 0);
let targetPointerNDC = new THREE.Vector2(0, 0);

window.addEventListener('pointermove', (e) => {
    targetPointerNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
    targetPointerNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;

    if (isDragging) {
        const deltaX = e.clientX - previousPointerX;
        const deltaY = e.clientY - previousPointerY;
        orbitVelY = deltaX * 0.006;
        orbitVelX = deltaY * 0.006;
        targetOrbitY += orbitVelY;
        targetOrbitX += orbitVelX;
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;
    }
}, { passive: true });

window.addEventListener('pointerdown', (e) => {
    if (e.target.closest('a, button, input, .dossier-card, .dock-container, header, nav')) return;
    isDragging = true;
    previousPointerX = e.clientX;
    previousPointerY = e.clientY;
});

window.addEventListener('pointerup', () => {
    isDragging = false;
});

/* ============================================================
   Theme Switcher Handler
   ============================================================ */
function applyTheme(themeName) {
    const pal = THEMES[themeName] || THEMES['cyber-sich'];
    currentTheme = themeName;

    scene.fog.color.copy(pal.fog);
    keyLight.color.copy(pal.keyLight);
    rimLight.color.copy(pal.accent1);

    metalMat.color.copy(pal.baseMetal);
    accent1Mat.emissive.copy(pal.accent1);
    accent2Mat.emissive.copy(pal.accent2);
    wireMat.color.copy(pal.accent1);

    bloomPass.strength = pal.bloom;

    // Recoloring particles
    const colors = cosmicGeo.attributes.color.array;
    for (let i = 0; i < COSMIC_COUNT; i++) {
        const i3 = i * 3;
        const c = (i % 2 === 0) ? pal.accent1 : pal.accent2;
        colors[i3] = c.r;
        colors[i3 + 1] = c.g;
        colors[i3 + 2] = c.b;
    }
    cosmicGeo.attributes.color.needsUpdate = true;
}

window.addEventListener('themechange', (e) => {
    const next = e.detail?.theme || 'cyber-sich';
    applyTheme(next);
});

/* ============================================================
   Render Loop
   ============================================================ */
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // 1. Inertia & Parallax
    pointerNDC.lerp(targetPointerNDC, 0.08);

    if (!isDragging) {
        orbitVelY *= 0.93;
        orbitVelX *= 0.93;
        targetOrbitY += orbitVelY;
        targetOrbitX += orbitVelX;
    }
    orbitRotationY += (targetOrbitY - orbitRotationY) * 0.12;
    orbitRotationX += (targetOrbitX - orbitRotationX) * 0.12;

    camera.position.x = pointerNDC.x * 0.35;
    camera.position.y = 0.4 + pointerNDC.y * 0.25;
    camera.lookAt(0, 0, 0);

    cursorSpotLight.position.set(pointerNDC.x * 6, pointerNDC.y * 4, 4.5);

    // 2. Stage Scale & Visibility Transitions
    STAGES.forEach((stg, idx) => {
        const isTarget = (idx === targetStageIndex);
        const curScale = stg.scale.x;
        const targetScale = isTarget ? 1.0 : 0.001;
        const nextScale = curScale + (targetScale - curScale) * 0.1;
        stg.scale.setScalar(nextScale);
        stg.visible = nextScale > 0.01;
    });

    // 3. Stage Master Rotation
    stageMaster.rotation.y = orbitRotationY + elapsedTime * 0.15;
    stageMaster.rotation.x = orbitRotationX + Math.sin(elapsedTime * 0.5) * 0.05;

    // 4. Kinetic Sub-Module Animations
    // Stage 0: Tryzub floating & Ring spin
    s0Tryzub.rotation.y = elapsedTime * 0.5;
    s0Tryzub.position.y = Math.sin(elapsedTime * 1.8) * 0.1;
    s0Ring.rotation.z += delta * 0.4;
    s0Orb.rotation.y = elapsedTime * 1.2;

    // Stage 1: Globe & Orbiting satellite
    if (stage1.visible) {
        globeMesh.rotation.y = elapsedTime * 0.25;
        satGroup.rotation.y = elapsedTime * 0.8;
        satGroup.position.x = Math.cos(elapsedTime * 0.8) * 2.5;
        satGroup.position.z = Math.sin(elapsedTime * 0.8) * 2.5;
    }

    // Stage 2: Spectrum bars oscillation
    if (stage2.visible) {
        spectrumBars.forEach((bar) => {
            const h = 0.3 + Math.abs(Math.sin(elapsedTime * bar.userData.speed + bar.userData.basePhase)) * 1.8;
            bar.scale.y = h;
        });
    }

    // Stage 3: Crypto Cube rotation & particle pulse
    if (stage3.visible) {
        cubeMesh.rotation.x = elapsedTime * 0.5;
        cubeMesh.rotation.y = elapsedTime * 0.7;
        cubeCore.rotation.y = -elapsedTime * 0.9;
    }

    // Stage 4: Cats match gems
    if (stage4.visible) {
        catPrism.rotation.y = elapsedTime * 0.6;
        gems.forEach((gem) => {
            const u = gem.userData;
            const a = elapsedTime * u.speed + u.angle;
            gem.position.set(Math.cos(a) * u.radius, Math.sin(a * 2) * 0.4, Math.sin(a) * u.radius);
            gem.rotation.x += delta;
            gem.rotation.y += delta;
        });
    }

    // Stage 5: Pistons
    if (stage5.visible) {
        phoneFrame.rotation.y = Math.sin(elapsedTime * 0.8) * 0.2;
    }

    // Stage 6: Yotei City
    if (stage6.visible) {
        stage6.rotation.y = elapsedTime * 0.2;
    }

    // Stage 7: Telemetry
    if (stage7.visible) {
        nebMesh.rotation.y = elapsedTime * 0.3;
        nebCore.rotation.x = elapsedTime * 0.5;
    }

    // 5. Energy Pulse Decay
    if (pulseIntensity > 0) {
        pulseIntensity = Math.max(0, pulseIntensity - delta * 1.8);
        bloomPass.strength = THEMES[currentTheme].bloom + pulseIntensity * 0.7;
    }

    composer.render();
}

animate();

/* Resize */
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile() ? 1.5 : 2));
    composer.setSize(width, height);
});
