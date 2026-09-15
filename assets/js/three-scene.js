/* ============================================================
   ARCH1CAT — three-scene.js
   Lusion-grade interactive 3D WebGL centerpiece.
   Three.js r170 ES module + EffectComposer + UnrealBloomPass
   Features:
   - Procedural Kinetic Core with dynamic vertex wave deformation
   - Multi-axis gyroscopic gimbal rings with circuit lines
   - 6 Orbiting polyhedral crystal satellites + constellation lines
   - 3,500+ Volumetric particle nebula with cursor gravity field
   - Full 360° click-and-drag orbit controls with inertia damping
   - Double-click / trigger energy pulse shockwave
   - Scroll-driven cinematic camera choreography across 4 acts
   - Real-time dual-theme engine (Lusion Void <-> Super Chrome)
   ============================================================ */

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = () => window.innerWidth < 768;
const MOBILE = isMobile();

/* ------------------------------------------------------------
   Procedural Glow Dot Texture (Volumetric Particles)
   ------------------------------------------------------------ */
let _dotTexCache = null;
function getDotTexture() {
    if (_dotTexCache) return _dotTexCache;
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.85)');
    grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.25)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    _dotTexCache = new THREE.CanvasTexture(c);
    return _dotTexCache;
}

/* ------------------------------------------------------------
   Renderer / Scene / Camera / Post-Processing Setup
   ------------------------------------------------------------ */
const container = document.getElementById('webgl-container');
const scene = new THREE.Scene();

const THEME_PALETTES = {
    'lusion-void': {
        fog: new THREE.Color(0x05070B),
        keyLight: new THREE.Color(0xD8F5FF),
        coreEmissive: new THREE.Color(0x00F2FE),
        coreBody: new THREE.Color(0x0A1224),
        ring1: new THREE.Color(0x00F2FE),
        ring2: new THREE.Color(0x7C3AED),
        satellites: new THREE.Color(0x67E8F9),
        particlesA: new THREE.Color(0x00F2FE),
        particlesB: new THREE.Color(0x8A2387),
        bloom: 0.55
    },
    'super-chrome': {
        fog: new THREE.Color(0x08080A),
        keyLight: new THREE.Color(0xFFF3E0),
        coreEmissive: new THREE.Color(0xFF4D00),
        coreBody: new THREE.Color(0x181210),
        ring1: new THREE.Color(0xFF4D00),
        ring2: new THREE.Color(0xFFB800),
        satellites: new THREE.Color(0xFFD56B),
        particlesA: new THREE.Color(0xFF4D00),
        particlesB: new THREE.Color(0xFFB800),
        bloom: 0.65
    }
};

let currentTheme = document.documentElement.getAttribute('data-theme') || 'lusion-void';
if (!THEME_PALETTES[currentTheme]) currentTheme = 'lusion-void';

scene.fog = new THREE.FogExp2(THEME_PALETTES[currentTheme].fog, 0.024);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 300);
camera.position.set(0, 0, 8.8);

const renderer = new THREE.WebGLRenderer({
    antialias: !MOBILE,
    alpha: true,
    powerPreference: 'high-performance'
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, MOBILE ? 1.5 : 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
container.appendChild(renderer.domElement);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    THEME_PALETTES[currentTheme].bloom,
    0.5,
    0.18
);
composer.addPass(bloomPass);

/* PMREM Environment Reflections */
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.05).texture;

/* ------------------------------------------------------------
   Lights & Reflections
   ------------------------------------------------------------ */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(THEME_PALETTES[currentTheme].keyLight, 2.2);
keyLight.position.set(5, 8, 7);
scene.add(keyLight);

const rimLight = new THREE.DirectionalLight(THEME_PALETTES[currentTheme].ring2, 1.8);
rimLight.position.set(-6, -4, -5);
scene.add(rimLight);

const cursorLight = new THREE.PointLight(0xffffff, 3.5, 14);
cursorLight.position.set(0, 0, 5);
scene.add(cursorLight);

/* Ground reflective plane */
const floorMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(60, 60),
    new THREE.MeshStandardMaterial({
        color: 0x030508,
        roughness: 0.85,
        metalness: 0.2
    })
);
floorMesh.rotation.x = -Math.PI / 2;
floorMesh.position.y = -5.5;
scene.add(floorMesh);

/* ------------------------------------------------------------
   Central Kinetic Sculpture (Lusion Core Group)
   ------------------------------------------------------------ */
const sculptureGroup = new THREE.Group();
sculptureGroup.position.set(MOBILE ? 0 : 2.0, 0, 0);
scene.add(sculptureGroup);

const corePointLight = new THREE.PointLight(THEME_PALETTES[currentTheme].coreEmissive, 22, 25);
sculptureGroup.add(corePointLight);

const rimPointLight = new THREE.PointLight(THEME_PALETTES[currentTheme].ring2, 16, 20);
rimPointLight.position.set(2, 2, 2);
sculptureGroup.add(rimPointLight);

/* 1. Inner Morphing Plasma Core */
const CORE_RADIUS = 1.45;
const coreGeo = new THREE.IcosahedronGeometry(CORE_RADIUS, MOBILE ? 3 : 5);
const coreBasePos = coreGeo.attributes.position.clone();
const corePosAttr = coreGeo.attributes.position;

const coreMat = new THREE.MeshStandardMaterial({
    color: THEME_PALETTES[currentTheme].coreBody,
    emissive: THEME_PALETTES[currentTheme].coreEmissive,
    emissiveIntensity: 0.55,
    metalness: 0.94,
    roughness: 0.16,
    wireframe: false
});
const coreMesh = new THREE.Mesh(coreGeo, coreMat);
sculptureGroup.add(coreMesh);

/* Wireframe outer glow cage */
const coreWireMat = new THREE.MeshBasicMaterial({
    color: THEME_PALETTES[currentTheme].ring1,
    wireframe: true,
    transparent: true,
    opacity: 0.22
});
const coreWireMesh = new THREE.Mesh(coreGeo, coreWireMat);
sculptureGroup.add(coreWireMesh);

/* 2. Gyroscopic Gimbal Rings */
function createGyroRing(radius, tube, color, rotSpeedX, rotSpeedY) {
    const geo = new THREE.TorusGeometry(radius, tube, 16, 120);
    const mat = new THREE.MeshStandardMaterial({
        color: 0x111622,
        emissive: color,
        emissiveIntensity: 0.8,
        metalness: 0.92,
        roughness: 0.2
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData = { rotSpeedX, rotSpeedY };
    return mesh;
}

const ring1 = createGyroRing(2.3, 0.035, THEME_PALETTES[currentTheme].ring1, 0.4, 0.6);
const ring2 = createGyroRing(3.1, 0.03, THEME_PALETTES[currentTheme].ring2, -0.5, 0.3);
const ring3 = createGyroRing(3.9, 0.02, THEME_PALETTES[currentTheme].ring1, 0.25, -0.45);

ring1.rotation.set(Math.PI / 3, 0.2, 0);
ring2.rotation.set(0.3, Math.PI / 4, 0.5);
ring3.rotation.set(-Math.PI / 5, -0.4, 0.2);

sculptureGroup.add(ring1);
sculptureGroup.add(ring2);
sculptureGroup.add(ring3);

/* 3. Orbiting Polyhedral Satellites & Constellation Lines */
const SATELLITE_COUNT = 6;
const satellites = [];
const satelliteGroup = new THREE.Group();
sculptureGroup.add(satelliteGroup);

const satGeo1 = new THREE.OctahedronGeometry(0.24, 0);
const satGeo2 = new THREE.IcosahedronGeometry(0.18, 0);

for (let i = 0; i < SATELLITE_COUNT; i++) {
    const geo = i % 2 === 0 ? satGeo1 : satGeo2;
    const mat = new THREE.MeshStandardMaterial({
        color: 0x162032,
        emissive: THEME_PALETTES[currentTheme].satellites,
        emissiveIntensity: 1.1,
        metalness: 0.95,
        roughness: 0.15
    });
    const satMesh = new THREE.Mesh(geo, mat);
    satMesh.userData = {
        orbitRadius: 2.2 + i * 0.4,
        speed: 0.4 + (i * 0.12),
        phase: (i * Math.PI * 2) / SATELLITE_COUNT,
        inclination: (i - 2.5) * 0.35,
        spinSpeed: 0.8 + Math.random() * 0.8
    };
    satellites.push(satMesh);
    satelliteGroup.add(satMesh);
}

/* Constellation Line Segments */
const MAX_LINES = 30;
const linePositions = new Float32Array(MAX_LINES * 2 * 3);
const lineGeo = new THREE.BufferGeometry();
lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
const lineMat = new THREE.LineBasicMaterial({
    color: THEME_PALETTES[currentTheme].ring1,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending
});
const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
sculptureGroup.add(lineSegments);

/* 4. Volumetric Particle Nebula with Mouse Gravity */
const PARTICLE_COUNT = MOBILE ? 1600 : 3600;
const particleGeo = new THREE.BufferGeometry();
const particlePos = new Float32Array(PARTICLE_COUNT * 3);
const particleOrigPos = new Float32Array(PARTICLE_COUNT * 3);
const particleVel = new Float32Array(PARTICLE_COUNT * 3);
const particleColors = new Float32Array(PARTICLE_COUNT * 3);

const colA = THEME_PALETTES[currentTheme].particlesA;
const colB = THEME_PALETTES[currentTheme].particlesB;

for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    const isAccretion = i % 3 === 0;

    let x, y, z;
    if (isAccretion) {
        // Accretion disk flat belt
        const r = 2.4 + Math.random() * 4.8;
        const theta = Math.random() * Math.PI * 2;
        x = Math.cos(theta) * r;
        z = Math.sin(theta) * r;
        y = (Math.random() - 0.5) * 0.85;
    } else {
        // Spherical volumetric halo
        const r = 1.6 + Math.pow(Math.random(), 0.7) * 5.2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta);
        z = r * Math.cos(phi);
    }

    particlePos[i3] = particleOrigPos[i3] = x;
    particlePos[i3 + 1] = particleOrigPos[i3 + 1] = y;
    particlePos[i3 + 2] = particleOrigPos[i3 + 2] = z;

    particleVel[i3] = 0;
    particleVel[i3 + 1] = 0;
    particleVel[i3 + 2] = 0;

    // Color gradient
    const mixRatio = Math.random();
    const c = new THREE.Color().copy(colA).lerp(colB, mixRatio);
    particleColors[i3] = c.r;
    particleColors[i3 + 1] = c.g;
    particleColors[i3 + 2] = c.b;
}

particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

const particleMat = new THREE.PointsMaterial({
    size: MOBILE ? 0.12 : 0.09,
    map: getDotTexture(),
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

const particleSystem = new THREE.Points(particleGeo, particleMat);
sculptureGroup.add(particleSystem);

/* ------------------------------------------------------------
   Interactive Orbit Controls (360° Click & Drag with Inertia)
   ------------------------------------------------------------ */
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
        orbitVelY = deltaX * 0.005;
        orbitVelX = deltaY * 0.005;
        targetOrbitY += orbitVelY;
        targetOrbitX += orbitVelX;
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;
    }
}, { passive: true });

window.addEventListener('pointerdown', (e) => {
    // Only drag if not clicking interactive UI links or buttons
    if (e.target.closest('a, button, input, .plate, nav, header')) return;
    isDragging = true;
    previousPointerX = e.clientX;
    previousPointerY = e.clientY;
});

window.addEventListener('pointerup', () => {
    isDragging = false;
});

/* ------------------------------------------------------------
   Energy Pulse Shockwave Mechanism
   ------------------------------------------------------------ */
let pulseIntensity = 0;
let pulseTimer = 0;

window.__triggerEnergyPulse = function () {
    pulseIntensity = 1.0;
    pulseTimer = 0;
    if (window.__playSfx) window.__playSfx('pulse');

    // Visual feedback on toast
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = '⚡ 3D ENERGY PULSE TRIGGERED';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 1800);
    }
};

// Double-click canvas triggers energy pulse
window.addEventListener('dblclick', (e) => {
    if (e.target.closest('a, button, input')) return;
    window.__triggerEnergyPulse();
});

/* ------------------------------------------------------------
   Scroll-Driven Chapter Camera Choreography
   ------------------------------------------------------------ */
const CHAPTER_CONFIGS = {
    prologue: {
        camPos: new THREE.Vector3(0, 0, 8.8),
        targetPos: new THREE.Vector3(MOBILE ? 0 : 2.0, 0, 0),
        sculptureScale: MOBILE ? 0.7 : 1.0
    },
    works: {
        camPos: new THREE.Vector3(-1.2, 0.4, 9.4),
        targetPos: new THREE.Vector3(MOBILE ? 0 : 3.2, 0.2, -1.0),
        sculptureScale: MOBILE ? 0.6 : 0.88
    },
    flagship: {
        camPos: new THREE.Vector3(0, -1.2, 8.2),
        targetPos: new THREE.Vector3(MOBILE ? 0 : 2.5, 0.8, -0.5),
        sculptureScale: MOBILE ? 0.65 : 0.95
    },
    signal: {
        camPos: new THREE.Vector3(1.4, 0.8, 9.2),
        targetPos: new THREE.Vector3(MOBILE ? 0 : -2.6, 0.1, -0.2),
        sculptureScale: MOBILE ? 0.65 : 0.9
    }
};

let activeChapter = 'prologue';
let camTargetPos = CHAPTER_CONFIGS.prologue.camPos.clone();
let sculptureTargetPos = CHAPTER_CONFIGS.prologue.targetPos.clone();
let sculptureTargetScale = CHAPTER_CONFIGS.prologue.sculptureScale;

function updateChapterOnScroll() {
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
                const cfg = CHAPTER_CONFIGS[activeChapter] || CHAPTER_CONFIGS.prologue;
                camTargetPos.copy(cfg.camPos);
                sculptureTargetPos.copy(cfg.targetPos);
                sculptureTargetScale = cfg.sculptureScale;
                window.dispatchEvent(new CustomEvent('chapterchange', { detail: { name: activeChapter } }));
            }
            break;
        }
    }
}
window.addEventListener('scroll', updateChapterOnScroll, { passive: true });
updateChapterOnScroll();

/* ------------------------------------------------------------
   Theme Transition Engine
   ------------------------------------------------------------ */
function applyTheme(themeName) {
    const pal = THEME_PALETTES[themeName] || THEME_PALETTES['lusion-void'];
    currentTheme = themeName;

    scene.fog.color.copy(pal.fog);
    keyLight.color.copy(pal.keyLight);
    rimLight.color.copy(pal.ring2);
    corePointLight.color.copy(pal.coreEmissive);

    coreMat.color.copy(pal.coreBody);
    coreMat.emissive.copy(pal.coreEmissive);
    coreWireMat.color.copy(pal.ring1);

    ring1.material.emissive.copy(pal.ring1);
    ring2.material.emissive.copy(pal.ring2);
    ring3.material.emissive.copy(pal.ring1);

    satellites.forEach(s => s.material.emissive.copy(pal.satellites));
    lineMat.color.copy(pal.ring1);

    bloomPass.strength = pal.bloom;

    // Update particle colors
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
    const next = e.detail?.theme || 'lusion-void';
    applyTheme(next);
});

/* ------------------------------------------------------------
   Main Render Loop & Physics Animation
   ------------------------------------------------------------ */
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // 1. Inertia & Cursor tracking
    pointerNDC.lerp(targetPointerNDC, 0.08);

    if (!isDragging) {
        orbitVelY *= 0.94;
        orbitVelX *= 0.94;
        targetOrbitY += orbitVelY;
        targetOrbitX += orbitVelX;
    }
    orbitRotationY += (targetOrbitY - orbitRotationY) * 0.1;
    orbitRotationX += (targetOrbitX - orbitRotationX) * 0.1;

    // 2. Camera & Sculpture interpolation
    camera.position.lerp(camTargetPos, 0.05);
    camera.position.x += pointerNDC.x * 0.35;
    camera.position.y += pointerNDC.y * 0.25;
    camera.lookAt(0, 0, 0);

    sculptureGroup.position.lerp(sculptureTargetPos, 0.06);
    const curScale = sculptureGroup.scale.x;
    const targetScale = sculptureTargetScale * (1 + pulseIntensity * 0.15);
    const newScale = curScale + (targetScale - curScale) * 0.08;
    sculptureGroup.scale.setScalar(newScale);

    // Sculpture manual orbit + base idle rotation
    sculptureGroup.rotation.y = orbitRotationY + elapsedTime * 0.15;
    sculptureGroup.rotation.x = orbitRotationX + Math.sin(elapsedTime * 0.5) * 0.08;

    // Move cursor light
    cursorLight.position.set(pointerNDC.x * 6, pointerNDC.y * 4, 4.5);

    // 3. Dynamic Vertex Deformation on Inner Core
    if (!RM) {
        const timeSpeed = elapsedTime * 1.8 + pulseIntensity * 4.0;
        const positions = corePosAttr.array;
        const basePositions = coreBasePos.array;
        const count = corePosAttr.count;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const bx = basePositions[i3];
            const by = basePositions[i3 + 1];
            const bz = basePositions[i3 + 2];

            const wave = Math.sin(bx * 2.8 + timeSpeed) *
                         Math.cos(by * 2.8 + timeSpeed * 0.8) *
                         Math.sin(bz * 2.8 + timeSpeed * 1.2);

            const disp = 1.0 + wave * (0.18 + pulseIntensity * 0.35);

            positions[i3] = bx * disp;
            positions[i3 + 1] = by * disp;
            positions[i3 + 2] = bz * disp;
        }
        corePosAttr.needsUpdate = true;
        coreGeo.computeVertexNormals();
    }

    // 4. Gyroscopic Rings Rotation
    const ringSpeedMultiplier = 1.0 + pulseIntensity * 3.5;
    ring1.rotation.x += ring1.userData.rotSpeedX * delta * ringSpeedMultiplier;
    ring1.rotation.y += ring1.userData.rotSpeedY * delta * ringSpeedMultiplier;

    ring2.rotation.x += ring2.userData.rotSpeedX * delta * ringSpeedMultiplier;
    ring2.rotation.y += ring2.userData.rotSpeedY * delta * ringSpeedMultiplier;

    ring3.rotation.x += ring3.userData.rotSpeedX * delta * ringSpeedMultiplier;
    ring3.rotation.y += ring3.userData.rotSpeedY * delta * ringSpeedMultiplier;

    // 5. Orbiting Satellites & Constellation Lines
    let lineIdx = 0;
    const lPos = lineGeo.attributes.position.array;

    for (let i = 0; i < SATELLITE_COUNT; i++) {
        const sat = satellites[i];
        const u = sat.userData;
        const angle = elapsedTime * u.speed + u.phase;
        const r = u.orbitRadius * (1 + pulseIntensity * 0.3);

        sat.position.x = Math.cos(angle) * r;
        sat.position.z = Math.sin(angle) * r;
        sat.position.y = Math.sin(angle * 2) * u.inclination;

        sat.rotation.x += delta * u.spinSpeed;
        sat.rotation.y += delta * u.spinSpeed * 1.2;

        // Connect satellite to core center
        if (lineIdx < MAX_LINES * 6) {
            lPos[lineIdx++] = 0;
            lPos[lineIdx++] = 0;
            lPos[lineIdx++] = 0;
            lPos[lineIdx++] = sat.position.x;
            lPos[lineIdx++] = sat.position.y;
            lPos[lineIdx++] = sat.position.z;
        }

        // Connect satellite to adjacent satellite
        const nextSat = satellites[(i + 1) % SATELLITE_COUNT];
        if (lineIdx < MAX_LINES * 6) {
            lPos[lineIdx++] = sat.position.x;
            lPos[lineIdx++] = sat.position.y;
            lPos[lineIdx++] = sat.position.z;
            lPos[lineIdx++] = nextSat.position.x;
            lPos[lineIdx++] = nextSat.position.y;
            lPos[lineIdx++] = nextSat.position.z;
        }
    }
    lineGeo.attributes.position.needsUpdate = true;

    // 6. Particle Nebula Dynamics & Cursor Repulsion
    const pos = particleGeo.attributes.position.array;
    const baseP = particleOrigPos;
    const mouseSphere = new THREE.Vector3(pointerNDC.x * 5, pointerNDC.y * 4, 1.5);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        let px = pos[i3];
        let py = pos[i3 + 1];
        let pz = pos[i3 + 2];

        // Orbit rotation around center
        const ox = baseP[i3];
        const oz = baseP[i3 + 2];
        const speed = (0.15 + (i % 5) * 0.05) * (1 + pulseIntensity * 2.0);
        const cosT = Math.cos(delta * speed);
        const sinT = Math.sin(delta * speed);

        baseP[i3] = ox * cosT - oz * sinT;
        baseP[i3 + 2] = ox * sinT + oz * cosT;

        // Cursor repulsion
        const dx = px - mouseSphere.x;
        const dy = py - mouseSphere.y;
        const dz = pz - mouseSphere.z;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < 4.0 && distSq > 0.001) {
            const force = (1.0 - distSq / 4.0) * 0.15;
            particleVel[i3] += (dx / Math.sqrt(distSq)) * force;
            particleVel[i3 + 1] += (dy / Math.sqrt(distSq)) * force;
            particleVel[i3 + 2] += (dz / Math.sqrt(distSq)) * force;
        }

        // Pulse explosion burst
        if (pulseIntensity > 0.05) {
            particleVel[i3] += px * pulseIntensity * 0.025;
            particleVel[i3 + 1] += py * pulseIntensity * 0.025;
            particleVel[i3 + 2] += pz * pulseIntensity * 0.025;
        }

        // Spring back to base position
        particleVel[i3] += (baseP[i3] - px) * 0.04;
        particleVel[i3 + 1] += (baseP[i3 + 1] - py) * 0.04;
        particleVel[i3 + 2] += (baseP[i3 + 2] - pz) * 0.04;

        // Damping
        particleVel[i3] *= 0.88;
        particleVel[i3 + 1] *= 0.88;
        particleVel[i3 + 2] *= 0.88;

        pos[i3] += particleVel[i3];
        pos[i3 + 1] += particleVel[i3 + 1];
        pos[i3 + 2] += particleVel[i3 + 2];
    }
    particleGeo.attributes.position.needsUpdate = true;

    // 7. Energy Pulse decay
    if (pulseIntensity > 0) {
        pulseIntensity = Math.max(0, pulseIntensity - delta * 1.6);
        corePointLight.intensity = 18 + pulseIntensity * 45;
        bloomPass.strength = (THEME_PALETTES[currentTheme].bloom) + pulseIntensity * 0.6;
    }

    // Render pass through bloom composer
    composer.render();
}

animate();

/* ------------------------------------------------------------
   Window Resize Handler
   ------------------------------------------------------------ */
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile() ? 1.5 : 2));

    composer.setSize(width, height);
});
