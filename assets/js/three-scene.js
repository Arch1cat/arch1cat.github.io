/* ============================================================
   ARCH1CAT — three-scene.js
   "СІЧ-01" // KYIV CYBERNETICS & AEROSPACE ENGINEERING RIG
   Inspired by Glushkov's Cybernetics, Antonov Aerospace & Lusion WebXR.
   Features:
   - Modular Aerospace Rig: Octagonal Hull, Solar Wings, Radar, Ion Engines
   - Exploded View (Deconstruct Physics): Modules separate along XYZ axes
   - X-Ray / Holographic Matrix Shader Mode
   - Interactive 3D Hotspots projected onto 2D screen coordinates
   - Full 360° Orbit Drag with smooth inertial damping
   - Sub-bass energy shockwave & thruster bursts
   - Camera focus choreography for each engineering module
   ============================================================ */

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const isMobile = () => window.innerWidth < 768;
const MOBILE = isMobile();

/* ------------------------------------------------------------
   Procedural Dot Texture for Ion Plumes & Dust
   ------------------------------------------------------------ */
let _dotTex = null;
function getDotTexture() {
    if (_dotTex) return _dotTex;
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.25, 'rgba(255, 255, 255, 0.8)');
    grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.2)');
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
        accentAzure: new THREE.Color(0x0072FF),
        accentGold: new THREE.Color(0xFFB800),
        hullMetal: new THREE.Color(0x0B1220),
        bloom: 0.65,
        particlesA: new THREE.Color(0x0072FF),
        particlesB: new THREE.Color(0xFFB800)
    },
    'chrome-void': {
        fog: new THREE.Color(0x050608),
        keyLight: new THREE.Color(0xFFFFFF),
        accentAzure: new THREE.Color(0x00F2FE),
        accentGold: new THREE.Color(0xFF4D00),
        hullMetal: new THREE.Color(0x121418),
        bloom: 0.58,
        particlesA: new THREE.Color(0x00F2FE),
        particlesB: new THREE.Color(0x8A2387)
    }
};

let currentTheme = document.documentElement.getAttribute('data-theme') || 'cyber-sich';
if (!THEMES[currentTheme]) currentTheme = 'cyber-sich';

/* ------------------------------------------------------------
   Renderer / Camera / Scene Setup
   ------------------------------------------------------------ */
const container = document.getElementById('webgl-container');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(THEMES[currentTheme].fog, 0.022);

const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 400);
camera.position.set(0, 0.5, 9.2);

const renderer = new THREE.WebGLRenderer({
    antialias: !MOBILE,
    alpha: true,
    powerPreference: 'high-performance'
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, MOBILE ? 1.5 : 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
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

/* ------------------------------------------------------------
   Lighting Rig
   ------------------------------------------------------------ */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
scene.add(ambientLight);

const mainKeyLight = new THREE.DirectionalLight(THEMES[currentTheme].keyLight, 2.5);
mainKeyLight.position.set(6, 10, 8);
scene.add(mainKeyLight);

const blueRimLight = new THREE.DirectionalLight(THEMES[currentTheme].accentAzure, 2.2);
blueRimLight.position.set(-8, -6, -6);
scene.add(blueRimLight);

const cursorSpotLight = new THREE.PointLight(0xffffff, 3.0, 15);
cursorSpotLight.position.set(0, 0, 5);
scene.add(cursorSpotLight);

/* Reflective Grid Base Plane */
const gridHelper = new THREE.GridHelper(40, 40, THEMES[currentTheme].accentAzure, 0x111c30);
gridHelper.position.y = -4.5;
gridHelper.material.opacity = 0.25;
gridHelper.material.transparent = true;
scene.add(gridHelper);

/* ------------------------------------------------------------
   "СІЧ-01" Cybernetic Rig Root Group & Modules
   ------------------------------------------------------------ */
const rigRoot = new THREE.Group();
rigRoot.position.set(MOBILE ? 0 : 2.2, 0, 0);
scene.add(rigRoot);

/* Rig Materials */
const hullMat = new THREE.MeshStandardMaterial({
    color: THEMES[currentTheme].hullMetal,
    metalness: 0.94,
    roughness: 0.18,
    envMapIntensity: 1.2
});

const goldSolarMat = new THREE.MeshStandardMaterial({
    color: 0x1a1200,
    emissive: THEMES[currentTheme].accentGold,
    emissiveIntensity: 0.95,
    metalness: 0.96,
    roughness: 0.12
});

const azureGlowMat = new THREE.MeshStandardMaterial({
    color: 0x03122b,
    emissive: THEMES[currentTheme].accentAzure,
    emissiveIntensity: 1.4,
    metalness: 0.85,
    roughness: 0.2
});

const wireframeMat = new THREE.MeshBasicMaterial({
    color: THEMES[currentTheme].accentAzure,
    wireframe: true,
    transparent: true,
    opacity: 0.25
});

/* List of all rig modules for Exploded View interpolation */
const rigModules = [];

function registerModule(name, group, restPos, explodedPos, restRot = [0, 0, 0]) {
    group.position.set(...restPos);
    group.rotation.set(...restRot);
    group.userData = {
        name,
        restPos: new THREE.Vector3(...restPos),
        explodedPos: new THREE.Vector3(...explodedPos),
        currentOffset: 0 // 0 = assembled, 1 = exploded
    };
    rigModules.push(group);
    rigRoot.add(group);
    return group;
}

/* ============================================================
   MODULE 01: Central Octagonal Fusion Reactor (Hull)
   ============================================================ */
const coreChassisGroup = new THREE.Group();
const octoHullGeo = new THREE.CylinderGeometry(1.3, 1.45, 2.4, 8);
const octoHullMesh = new THREE.Mesh(octoHullGeo, hullMat);
coreChassisGroup.add(octoHullMesh);

const octoWire = new THREE.Mesh(octoHullGeo, wireframeMat);
octoWire.scale.setScalar(1.01);
coreChassisGroup.add(octoWire);

// Inner pulsing fusion orb
const reactorOrbGeo = new THREE.IcosahedronGeometry(0.75, 4);
const reactorOrbMat = new THREE.MeshStandardMaterial({
    color: 0x001122,
    emissive: THEMES[currentTheme].accentAzure,
    emissiveIntensity: 1.8,
    metalness: 0.95,
    roughness: 0.1
});
const reactorOrbMesh = new THREE.Mesh(reactorOrbGeo, reactorOrbMat);
coreChassisGroup.add(reactorOrbMesh);

// Internal Reactor Point Light
const reactorLight = new THREE.PointLight(THEMES[currentTheme].accentAzure, 25, 20);
coreChassisGroup.add(reactorLight);

// Reactor cooling rings
for (let i = -1; i <= 1; i++) {
    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.48, 0.035, 12, 48),
        azureGlowMat
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = i * 0.7;
    coreChassisGroup.add(ring);
}

registerModule('CORE_CHASSIS', coreChassisGroup, [0, 0, 0], [0, 0, 0]);

/* ============================================================
   MODULE 02: Avionics & OSINT Radar Dish (World Monitor)
   ============================================================ */
const radarGroup = new THREE.Group();
const dishGeo = new THREE.SphereGeometry(0.75, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2.8);
const dishMesh = new THREE.Mesh(dishGeo, hullMat);
dishMesh.rotation.x = Math.PI;
radarGroup.add(dishMesh);

const dishRim = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.03, 12, 36), goldSolarMat);
dishRim.rotation.x = Math.PI / 2;
dishRim.position.y = -0.32;
radarGroup.add(dishRim);

// Feed horn
const feedMast = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.75, 8), azureGlowMat);
feedMast.position.y = -0.38;
radarGroup.add(feedMast);

const hornTip = new THREE.Mesh(new THREE.OctahedronGeometry(0.12, 0), goldSolarMat);
hornTip.position.y = -0.76;
radarGroup.add(hornTip);

registerModule('OSINT_RADAR', radarGroup, [0, 1.8, 0], [0, 3.4, 0], [0.3, 0, 0]);

/* ============================================================
   MODULE 03: Left & Right Deployable Solar Array Wings (Yotei Grid)
   ============================================================ */
function createSolarWing(isLeft = true) {
    const wingGroup = new THREE.Group();
    const wingX = isLeft ? -1.8 : 1.8;

    // Carbon fiber main spar
    const spar = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 0.12), hullMat);
    spar.position.x = isLeft ? -1.2 : 1.2;
    wingGroup.add(spar);

    // Solar panels (3 segments per wing)
    for (let s = 0; s < 3; s++) {
        const panel = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.03, 1.35), goldSolarMat);
        panel.position.set(isLeft ? -(0.5 + s * 0.75) : (0.5 + s * 0.75), 0, 0);
        wingGroup.add(panel);

        const panelBorder = new THREE.Mesh(
            new THREE.BoxGeometry(0.72, 0.04, 1.37),
            wireframeMat
        );
        panelBorder.position.copy(panel.position);
        wingGroup.add(panelBorder);
    }

    // Wingtip Telemetry Beacon
    const beacon = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 12, 12),
        new THREE.MeshBasicMaterial({ color: isLeft ? 0x00FF88 : 0xFF0055 })
    );
    beacon.position.set(isLeft ? -2.8 : 2.8, 0, 0);
    wingGroup.add(beacon);

    return wingGroup;
}

const leftWing = createSolarWing(true);
const rightWing = createSolarWing(false);

registerModule('SOLAR_WING_L', leftWing, [-1.4, 0.2, 0], [-3.8, 0.2, 0], [0, 0.2, 0.1]);
registerModule('SOLAR_WING_R', rightWing, [1.4, 0.2, 0], [3.8, 0.2, 0], [0, -0.2, -0.1]);

/* ============================================================
   MODULE 04: Lower Propulsion & Ion Thrusters (openGym)
   ============================================================ */
const thrusterGroup = new THREE.Group();
const nozzleGeo = new THREE.CylinderGeometry(0.32, 0.55, 0.75, 16);

for (let x = -1; x <= 1; x += 2) {
    for (let z = -1; z <= 1; z += 2) {
        const nozzle = new THREE.Mesh(nozzleGeo, hullMat);
        nozzle.position.set(x * 0.55, -0.4, z * 0.55);
        thrusterGroup.add(nozzle);

        const glowRing = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.04, 8, 24), azureGlowMat);
        glowRing.rotation.x = Math.PI / 2;
        glowRing.position.set(x * 0.55, -0.75, z * 0.55);
        thrusterGroup.add(glowRing);
    }
}

registerModule('ION_PROPULSION', thrusterGroup, [0, -1.5, 0], [0, -3.2, 0]);

/* ============================================================
   MODULE 05: Cryptographic Purge Core (Metadata Cleaner)
   ============================================================ */
const cryptoGroup = new THREE.Group();
const cryptoCubeGeo = new THREE.BoxGeometry(0.65, 0.65, 0.65);
const cryptoCube = new THREE.Mesh(cryptoCubeGeo, goldSolarMat);
cryptoGroup.add(cryptoCube);

const cryptoCage = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.72, 0.72), wireframeMat);
cryptoGroup.add(cryptoCage);

registerModule('CRYPTO_PURGE', cryptoGroup, [0, 0, 1.4], [0, 0, 2.8], [0.4, 0.4, 0]);

/* ============================================================
   MODULE 06: RF Scanner & Antennas (WiFi Scanner)
   ============================================================ */
const rfGroup = new THREE.Group();
for (let a = -1; a <= 1; a += 2) {
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.06, 1.6, 8), hullMat);
    mast.position.set(a * 0.6, 0.8, -1.2);
    mast.rotation.x = -0.3;
    rfGroup.add(mast);

    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), azureGlowMat);
    tip.position.set(a * 0.6, 1.6, -1.4);
    rfGroup.add(tip);
}
registerModule('RF_SCANNER', rfGroup, [0, 0, -1.3], [0, 0, -2.6]);

/* ============================================================
   Volumetric Cosmic Dust & Ion Plume Particles
   ============================================================ */
const PARTICLE_COUNT = MOBILE ? 1200 : 2800;
const particleGeo = new THREE.BufferGeometry();
const particlePos = new Float32Array(PARTICLE_COUNT * 3);
const particleOrigPos = new Float32Array(PARTICLE_COUNT * 3);
const particleVel = new Float32Array(PARTICLE_COUNT * 3);
const particleColors = new Float32Array(PARTICLE_COUNT * 3);

const pColA = THEMES[currentTheme].particlesA;
const pColB = THEMES[currentTheme].particlesB;

for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    const isPlume = i < 300;

    let x, y, z;
    if (isPlume) {
        // Ion exhaust stream below thrusters
        x = (Math.random() - 0.5) * 1.2;
        z = (Math.random() - 0.5) * 1.2;
        y = -2.0 - Math.random() * 4.5;
    } else {
        // Broad cosmic sphere
        const r = 2.5 + Math.random() * 7.5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        z = r * Math.cos(phi);
    }

    particlePos[i3] = particleOrigPos[i3] = x;
    particlePos[i3 + 1] = particleOrigPos[i3 + 1] = y;
    particlePos[i3 + 2] = particleOrigPos[i3 + 2] = z;

    const mix = Math.random();
    const c = new THREE.Color().copy(pColA).lerp(pColB, mix);
    particleColors[i3] = c.r;
    particleColors[i3 + 1] = c.g;
    particleColors[i3 + 2] = c.b;
}

particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

const particleMat = new THREE.PointsMaterial({
    size: MOBILE ? 0.11 : 0.08,
    map: getDotTexture(),
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

const cosmicParticles = new THREE.Points(particleGeo, particleMat);
rigRoot.add(cosmicParticles);

/* ============================================================
   Interactive Modes: Assembled / Exploded (Deconstruct) / X-Ray
   ============================================================ */
let rigMode = 'assembled'; // 'assembled' | 'exploded' | 'xray'
let targetExplodedFactor = 0.0;
let currentExplodedFactor = 0.0;
let pulseIntensity = 0.0;

window.__setRigMode = function (mode) {
    rigMode = mode;
    targetExplodedFactor = (mode === 'exploded') ? 1.0 : 0.0;

    const isXray = (mode === 'xray');
    hullMat.wireframe = isXray;
    hullMat.opacity = isXray ? 0.35 : 1.0;
    hullMat.transparent = isXray;

    if (window.__playSfx) {
        window.__playSfx(mode === 'exploded' ? 'pulse' : 'click');
    }

    // Toast readout
    const toast = document.getElementById('toast');
    if (toast) {
        const labels = {
            assembled: '⚙ RIG STATUS: FULLY ASSEMBLED',
            exploded: '💥 DECONSTRUCT: EXPLODED VIEW ONLINE',
            xray: '👁 OPTICAL MATRIX: X-RAY WIREFRAME ENGAGED'
        };
        toast.textContent = labels[mode] || labels.assembled;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    }
};

window.__triggerEnergyPulse = function () {
    pulseIntensity = 1.0;
    if (window.__playSfx) window.__playSfx('pulse');

    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = '⚡ PLASMA SURGE INITIATED';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 1800);
    }
};

/* ============================================================
   360° Orbit Drag Interaction with Inertial Damping
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
        orbitVelY = deltaX * 0.0055;
        orbitVelX = deltaY * 0.0055;
        targetOrbitY += orbitVelY;
        targetOrbitX += orbitVelX;
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;
    }
}, { passive: true });

window.addEventListener('pointerdown', (e) => {
    if (e.target.closest('a, button, input, .hotspot-badge, header, nav, .dossier-card')) return;
    isDragging = true;
    previousPointerX = e.clientX;
    previousPointerY = e.clientY;
});

window.addEventListener('pointerup', () => {
    isDragging = false;
});

/* ============================================================
   3D-to-2D Projected Interactive Hotspots
   ============================================================ */
const HOTSPOT_ANCHORS = {
    'hotspot-radar': new THREE.Vector3(0, 2.3, 0),
    'hotspot-solar': new THREE.Vector3(2.5, 0.4, 0),
    'hotspot-crypto': new THREE.Vector3(0, 0, 1.8),
    'hotspot-rf': new THREE.Vector3(0.6, 1.4, -1.3),
    'hotspot-thruster': new THREE.Vector3(0, -1.8, 0)
};

function updateProjectedHotspots() {
    for (const [id, localVec] of Object.entries(HOTSPOT_ANCHORS)) {
        const el = document.getElementById(id);
        if (!el) continue;

        // Transform local rig coordinate to world space
        const worldPos = localVec.clone().applyMatrix4(rigRoot.matrixWorld);
        const screenPos = worldPos.project(camera);

        // Check if behind camera
        if (screenPos.z > 1.0) {
            el.style.opacity = '0';
            el.style.pointerEvents = 'none';
            continue;
        }

        const x = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-screenPos.y * 0.5 + 0.5) * window.innerHeight;

        el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%)`;
        el.style.opacity = '1';
        el.style.pointerEvents = 'auto';
    }
}

/* ============================================================
   Scroll Choreography Across Chapters
   ============================================================ */
const CHAPTER_RIG_SETTINGS = {
    prologue: {
        camPos: new THREE.Vector3(0, 0.5, 9.2),
        rigPos: new THREE.Vector3(MOBILE ? 0 : 2.2, 0, 0),
        rigScale: MOBILE ? 0.7 : 1.0
    },
    works: {
        camPos: new THREE.Vector3(-1.2, 0.8, 9.6),
        rigPos: new THREE.Vector3(MOBILE ? 0 : 3.0, 0.3, -0.6),
        rigScale: MOBILE ? 0.65 : 0.88
    },
    flagship: {
        camPos: new THREE.Vector3(0, -1.0, 8.4),
        rigPos: new THREE.Vector3(MOBILE ? 0 : 2.4, 0.6, -0.4),
        rigScale: MOBILE ? 0.65 : 0.95
    },
    signal: {
        camPos: new THREE.Vector3(1.5, 0.6, 9.4),
        rigPos: new THREE.Vector3(MOBILE ? 0 : -2.5, 0.2, -0.2),
        rigScale: MOBILE ? 0.65 : 0.9
    }
};

let activeChapter = 'prologue';
let camTargetPos = CHAPTER_RIG_SETTINGS.prologue.camPos.clone();
let rigTargetPos = CHAPTER_RIG_SETTINGS.prologue.rigPos.clone();
let rigTargetScale = CHAPTER_RIG_SETTINGS.prologue.rigScale;

function updateChapter() {
    const chapters = ['prologue', 'works', 'flagship', 'signal'];
    const sections = [
        document.getElementById('about'),
        document.getElementById('projects'),
        document.getElementById('flagship'),
        document.getElementById('activity')
    ];

    const scrollMid = window.scrollY + window.innerHeight * 0.45;

    for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollMid) {
            const chName = chapters[i];
            if (chName !== activeChapter) {
                activeChapter = chName;
                const cfg = CHAPTER_RIG_SETTINGS[activeChapter] || CHAPTER_RIG_SETTINGS.prologue;
                camTargetPos.copy(cfg.camPos);
                rigTargetPos.copy(cfg.rigPos);
                rigTargetScale = cfg.rigScale;
                window.dispatchEvent(new CustomEvent('chapterchange', { detail: { name: activeChapter } }));
            }
            break;
        }
    }
}
window.addEventListener('scroll', updateChapter, { passive: true });
updateChapter();

/* ============================================================
   Theme Transition Engine
   ============================================================ */
function applyTheme(themeName) {
    const pal = THEMES[themeName] || THEMES['cyber-sich'];
    currentTheme = themeName;

    scene.fog.color.copy(pal.fog);
    mainKeyLight.color.copy(pal.keyLight);
    blueRimLight.color.copy(pal.accentAzure);
    reactorLight.color.copy(pal.accentAzure);

    hullMat.color.copy(pal.hullMetal);
    goldSolarMat.emissive.copy(pal.accentGold);
    azureGlowMat.emissive.copy(pal.accentAzure);
    wireframeMat.color.copy(pal.accentAzure);

    bloomPass.strength = pal.bloom;

    // Particle colors
    const colors = particleGeo.attributes.color.array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const mix = Math.random();
        const c = new THREE.Color().copy(pal.particlesA).lerp(pal.particlesB, mix);
        colors[i3] = c.r;
        colors[i3 + 1] = c.g;
        colors[i3 + 2] = c.b;
    }
    particleGeo.attributes.color.needsUpdate = true;
}

window.addEventListener('themechange', (e) => {
    const next = e.detail?.theme || 'cyber-sich';
    applyTheme(next);
});

/* ============================================================
   Main Animation & Physics Loop
   ============================================================ */
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // 1. Inertial Orbit Drag
    pointerNDC.lerp(targetPointerNDC, 0.08);

    if (!isDragging) {
        orbitVelY *= 0.93;
        orbitVelX *= 0.93;
        targetOrbitY += orbitVelY;
        targetOrbitX += orbitVelX;
    }
    orbitRotationY += (targetOrbitY - orbitRotationY) * 0.12;
    orbitRotationX += (targetOrbitX - orbitRotationX) * 0.12;

    // 2. Camera & Rig Transform
    camera.position.lerp(camTargetPos, 0.05);
    camera.position.x += pointerNDC.x * 0.35;
    camera.position.y += pointerNDC.y * 0.25;
    camera.lookAt(0, 0, 0);

    rigRoot.position.lerp(rigTargetPos, 0.06);
    const curScale = rigRoot.scale.x;
    const targetScale = rigTargetScale * (1 + pulseIntensity * 0.12);
    rigRoot.scale.setScalar(curScale + (targetScale - curScale) * 0.08);

    // Idle rotation + drag rotation
    rigRoot.rotation.y = orbitRotationY + elapsedTime * 0.12;
    rigRoot.rotation.x = orbitRotationX + Math.sin(elapsedTime * 0.6) * 0.06;

    // 3. Exploded View (Deconstruct Physics)
    currentExplodedFactor += (targetExplodedFactor - currentExplodedFactor) * 0.08;

    for (const mod of rigModules) {
        const u = mod.userData;
        mod.position.lerpVectors(u.restPos, u.explodedPos, currentExplodedFactor);
    }

    // 4. Kinetic Sub-Module Rotations
    radarGroup.rotation.y = elapsedTime * 0.8;
    cryptoGroup.rotation.x = elapsedTime * 0.6;
    cryptoGroup.rotation.y = elapsedTime * 0.9;
    reactorOrbMesh.rotation.y = elapsedTime * 1.4;

    // 5. Particle Dynamics (Cosmic & Exhaust)
    const pos = particleGeo.attributes.position.array;
    for (let i = 0; i < 300; i++) {
        const i3 = i * 3;
        // Ion thruster plume accelerates downward
        pos[i3 + 1] -= delta * (3.5 + Math.random() * 4.0);
        if (pos[i3 + 1] < -6.5) {
            pos[i3 + 1] = -1.8;
            pos[i3] = (Math.random() - 0.5) * 1.2;
            pos[i3 + 2] = (Math.random() - 0.5) * 1.2;
        }
    }
    particleGeo.attributes.position.needsUpdate = true;

    // 6. Pulse Decay
    if (pulseIntensity > 0) {
        pulseIntensity = Math.max(0, pulseIntensity - delta * 1.8);
        reactorLight.intensity = 25 + pulseIntensity * 60;
        bloomPass.strength = THEMES[currentTheme].bloom + pulseIntensity * 0.6;
    }

    // 7. Update 3D-to-2D Screen Hotspots
    updateProjectedHotspots();

    // 8. Render
    composer.render();
}

animate();

/* Resize Handler */
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile() ? 1.5 : 2));
    composer.setSize(width, height);
});
