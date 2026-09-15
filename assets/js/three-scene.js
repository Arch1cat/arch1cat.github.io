/* ============================================================
   ARCH1CAT — three-scene.js
   Procedural Liquid Chrome & Fluid Kinetic Sculpture
   Inspired by Lusion (lusion.co) and award-winning WebGL experiences.
   Features:
   - Fluid Torus Knot with dynamic 3D vertex wave deformation
   - Mirror Liquid Chrome & Iridescent PBR Material
   - Volumetric Fluid Particle Nebula reacting to mouse cursor
   - Full 360° Click-and-Drag Orbit with inertial damping
   - Scroll-driven camera and kinetic sculpture choreography
   - Dual Luxury Themes: Lusion Void <-> Solar Titanium
   ============================================================ */

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const isMobile = () => window.innerWidth < 768;
const MOBILE = isMobile();

/* ------------------------------------------------------------
   Procedural Glow Dot Texture (Volumetric Particles)
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
    'lusion-void': {
        fog: new THREE.Color(0x05070B),
        keyLight: new THREE.Color(0xD8F5FF),
        accent1: new THREE.Color(0x00F2FE), // Cyan
        accent2: new THREE.Color(0x7C3AED), // Violet
        liquidBody: new THREE.Color(0x0B1120),
        bloom: 0.52,
        particlesA: new THREE.Color(0x00F2FE),
        particlesB: new THREE.Color(0x7C3AED)
    },
    'solar-titanium': {
        fog: new THREE.Color(0x060709),
        keyLight: new THREE.Color(0xFFF3E5),
        accent1: new THREE.Color(0xFFB800), // Solar Gold
        accent2: new THREE.Color(0xFF4D00), // Vermilion
        liquidBody: new THREE.Color(0x13151A),
        bloom: 0.58,
        particlesA: new THREE.Color(0xFFB800),
        particlesB: new THREE.Color(0xFF4D00)
    }
};

let currentTheme = document.documentElement.getAttribute('data-theme') || 'lusion-void';
if (!THEMES[currentTheme]) currentTheme = 'lusion-void';

/* ------------------------------------------------------------
   Renderer / Scene / Camera Setup
   ------------------------------------------------------------ */
const container = document.getElementById('webgl-container');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(THEMES[currentTheme].fog, 0.024);

const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 400);
camera.position.set(0, 0, 9.0);

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
    0.16
);
composer.addPass(bloomPass);

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

/* ------------------------------------------------------------
   Lighting Rig
   ------------------------------------------------------------ */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const mainKeyLight = new THREE.DirectionalLight(THEMES[currentTheme].keyLight, 2.5);
mainKeyLight.position.set(6, 9, 8);
scene.add(mainKeyLight);

const rimLight = new THREE.DirectionalLight(THEMES[currentTheme].accent1, 2.2);
rimLight.position.set(-7, -5, -6);
scene.add(rimLight);

const cursorSpotLight = new THREE.PointLight(0xffffff, 3.5, 14);
cursorSpotLight.position.set(0, 0, 5);
scene.add(cursorSpotLight);

/* ------------------------------------------------------------
   Sculpture Group & Procedural Liquid Chrome Core
   ------------------------------------------------------------ */
const sculptureGroup = new THREE.Group();
const DEFAULT_POS = new THREE.Vector3(MOBILE ? 0 : 2.5, 0.1, 0);
sculptureGroup.position.copy(DEFAULT_POS);
scene.add(sculptureGroup);

// Liquid Torus Knot Geometry
const knotGeo = new THREE.TorusKnotGeometry(1.85, 0.54, MOBILE ? 120 : 200, MOBILE ? 24 : 32, 2, 3);
const knotBasePos = knotGeo.attributes.position.clone();
const knotPosAttr = knotGeo.attributes.position;

const liquidMat = new THREE.MeshStandardMaterial({
    color: THEMES[currentTheme].liquidBody,
    emissive: THEMES[currentTheme].accent1,
    emissiveIntensity: 0.45,
    metalness: 0.95,
    roughness: 0.14,
    envMapIntensity: 1.35
});
const liquidMesh = new THREE.Mesh(knotGeo, liquidMat);
sculptureGroup.add(liquidMesh);

// Fine wireframe overlay
const wireMat = new THREE.MeshBasicMaterial({
    color: THEMES[currentTheme].accent1,
    wireframe: true,
    transparent: true,
    opacity: 0.12
});
const wireMesh = new THREE.Mesh(knotGeo, wireMat);
wireMesh.scale.setScalar(1.006);
sculptureGroup.add(wireMesh);

// Internal glowing energy point light
const coreLight = new THREE.PointLight(THEMES[currentTheme].accent1, 16, 20);
sculptureGroup.add(coreLight);

// Outer Floating Orbital Halo Rings
function createHaloRing(radius, tube, color) {
    const geo = new THREE.TorusGeometry(radius, tube, 12, 100);
    const mat = new THREE.MeshStandardMaterial({
        color: 0x111624,
        emissive: color,
        emissiveIntensity: 0.8,
        metalness: 0.92,
        roughness: 0.2
    });
    return new THREE.Mesh(geo, mat);
}

const haloRing1 = createHaloRing(3.1, 0.025, THEMES[currentTheme].accent1);
haloRing1.rotation.set(Math.PI / 2.8, 0.3, 0);
sculptureGroup.add(haloRing1);

const haloRing2 = createHaloRing(3.8, 0.018, THEMES[currentTheme].accent2);
haloRing2.rotation.set(-Math.PI / 4, -0.4, 0.3);
sculptureGroup.add(haloRing2);

/* ------------------------------------------------------------
   Volumetric Fluid Particle Swarm (Reacting to Mouse)
   ------------------------------------------------------------ */
const PARTICLE_COUNT = MOBILE ? 1500 : 3200;
const particleGeo = new THREE.BufferGeometry();
const particlePos = new Float32Array(PARTICLE_COUNT * 3);
const particleOrigPos = new Float32Array(PARTICLE_COUNT * 3);
const particleVel = new Float32Array(PARTICLE_COUNT * 3);
const particleColors = new Float32Array(PARTICLE_COUNT * 3);

const pColA = THEMES[currentTheme].particlesA;
const pColB = THEMES[currentTheme].particlesB;

for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    const r = 2.0 + Math.pow(Math.random(), 0.7) * 5.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    particlePos[i3] = particleOrigPos[i3] = x;
    particlePos[i3 + 1] = particleOrigPos[i3 + 1] = y;
    particlePos[i3 + 2] = particleOrigPos[i3 + 2] = z;

    particleVel[i3] = 0;
    particleVel[i3 + 1] = 0;
    particleVel[i3 + 2] = 0;

    const mix = Math.random();
    const c = new THREE.Color().copy(pColA).lerp(pColB, mix);
    particleColors[i3] = c.r;
    particleColors[i3 + 1] = c.g;
    particleColors[i3 + 2] = c.b;
}

particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

const particleMat = new THREE.PointsMaterial({
    size: MOBILE ? 0.1 : 0.08,
    map: getDotTexture(),
    vertexColors: true,
    transparent: true,
    opacity: 0.82,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});

const particleSystem = new THREE.Points(particleGeo, particleMat);
sculptureGroup.add(particleSystem);

/* ------------------------------------------------------------
   Interactive 360° Drag Orbit with Inertial Damping
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
        orbitVelY = deltaX * 0.0055;
        orbitVelX = deltaY * 0.0055;
        targetOrbitY += orbitVelY;
        targetOrbitX += orbitVelX;
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;
    }
}, { passive: true });

window.addEventListener('pointerdown', (e) => {
    if (e.target.closest('a, button, input, .plate, nav, header')) return;
    isDragging = true;
    previousPointerX = e.clientX;
    previousPointerY = e.clientY;
});

window.addEventListener('pointerup', () => {
    isDragging = false;
});

/* Energy pulse trigger */
let pulseIntensity = 0.0;
window.__triggerLiquidPulse = function () {
    pulseIntensity = 1.0;
    if (window.__playSfx) window.__playSfx('pulse');

    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = '⚡ 3D LIQUID PULSE TRIGGERED';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 1800);
    }
};

window.addEventListener('dblclick', (e) => {
    if (e.target.closest('a, button, input')) return;
    window.__triggerLiquidPulse();
});

/* ------------------------------------------------------------
   Scroll-Driven Camera & Sculpture Choreography
   ------------------------------------------------------------ */
const CHAPTER_CONFIGS = {
    about: {
        camPos: new THREE.Vector3(0, 0, 9.0),
        targetPos: new THREE.Vector3(MOBILE ? 0 : 2.5, 0.1, 0),
        scale: MOBILE ? 0.75 : 1.0
    },
    projects: {
        camPos: new THREE.Vector3(-1.4, 0.4, 9.4),
        targetPos: new THREE.Vector3(MOBILE ? 0 : 3.4, 0.3, -1.0),
        scale: MOBILE ? 0.65 : 0.88
    },
    flagship: {
        camPos: new THREE.Vector3(0, -1.0, 8.4),
        targetPos: new THREE.Vector3(MOBILE ? 0 : 2.6, 0.6, -0.6),
        scale: MOBILE ? 0.7 : 0.95
    },
    activity: {
        camPos: new THREE.Vector3(1.4, 0.6, 9.2),
        targetPos: new THREE.Vector3(MOBILE ? 0 : -2.6, 0.1, -0.4),
        scale: MOBILE ? 0.7 : 0.92
    }
};

let activeChapter = 'about';
let camTargetPos = CHAPTER_CONFIGS.about.camPos.clone();
let targetSculpturePos = CHAPTER_CONFIGS.about.targetPos.clone();
let targetScale = CHAPTER_CONFIGS.about.scale;

function updateChapterOnScroll() {
    const chapters = ['about', 'projects', 'flagship', 'activity'];
    const sections = chapters.map(id => document.getElementById(id));
    const scrollMid = window.scrollY + window.innerHeight * 0.45;

    for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollMid) {
            const chName = chapters[i];
            if (chName !== activeChapter) {
                activeChapter = chName;
                const cfg = CHAPTER_CONFIGS[activeChapter] || CHAPTER_CONFIGS.about;
                camTargetPos.copy(cfg.camPos);
                targetSculpturePos.copy(cfg.targetPos);
                targetScale = cfg.scale;
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
    const pal = THEMES[themeName] || THEMES['lusion-void'];
    currentTheme = themeName;

    scene.fog.color.copy(pal.fog);
    mainKeyLight.color.copy(pal.keyLight);
    rimLight.color.copy(pal.accent1);
    coreLight.color.copy(pal.accent1);

    liquidMat.color.copy(pal.liquidBody);
    liquidMat.emissive.copy(pal.accent1);
    wireMat.color.copy(pal.accent1);

    haloRing1.material.emissive.copy(pal.accent1);
    haloRing2.material.emissive.copy(pal.accent2);

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
   Animation Loop
   ------------------------------------------------------------ */
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

    camera.position.lerp(camTargetPos, 0.05);
    camera.position.x += pointerNDC.x * 0.35;
    camera.position.y += pointerNDC.y * 0.25;
    camera.lookAt(0, 0, 0);

    cursorSpotLight.position.set(pointerNDC.x * 6, pointerNDC.y * 4, 4.5);

    // 2. Sculpture Transform & Scale
    sculptureGroup.position.lerp(targetSculpturePos, 0.06);
    const curScale = sculptureGroup.scale.x;
    const finalTargetScale = targetScale * (1 + pulseIntensity * 0.15);
    sculptureGroup.scale.setScalar(curScale + (finalTargetScale - curScale) * 0.08);

    sculptureGroup.rotation.y = orbitRotationY + elapsedTime * 0.16;
    sculptureGroup.rotation.x = orbitRotationX + Math.sin(elapsedTime * 0.5) * 0.06;

    // 3. Dynamic 3D Vertex Wave Deformation
    const timeSpeed = elapsedTime * 1.8 + pulseIntensity * 3.5;
    const positions = knotPosAttr.array;
    const basePositions = knotBasePos.array;
    const count = knotPosAttr.count;

    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const bx = basePositions[i3];
        const by = basePositions[i3 + 1];
        const bz = basePositions[i3 + 2];

        const wave = Math.sin(bx * 2.2 + timeSpeed) *
                     Math.cos(by * 2.2 + timeSpeed * 0.8) *
                     Math.sin(bz * 2.2 + timeSpeed * 1.2);

        const disp = 1.0 + wave * (0.16 + pulseIntensity * 0.3);

        positions[i3] = bx * disp;
        positions[i3 + 1] = by * disp;
        positions[i3 + 2] = bz * disp;
    }
    knotPosAttr.needsUpdate = true;
    knotGeo.computeVertexNormals();

    // 4. Halo Rings Rotation
    haloRing1.rotation.x += delta * 0.45;
    haloRing1.rotation.y += delta * 0.65;
    haloRing2.rotation.x -= delta * 0.5;
    haloRing2.rotation.y += delta * 0.35;

    // 5. Particle Dynamics & Cursor Repulsion
    const pos = particleGeo.attributes.position.array;
    const baseP = particleOrigPos;
    const mouseSphere = new THREE.Vector3(pointerNDC.x * 5, pointerNDC.y * 4, 1.5);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        let px = pos[i3];
        let py = pos[i3 + 1];
        let pz = pos[i3 + 2];

        // Orbit rotation
        const ox = baseP[i3];
        const oz = baseP[i3 + 2];
        const speed = (0.12 + (i % 6) * 0.04) * (1 + pulseIntensity * 2.0);
        const cosT = Math.cos(delta * speed);
        const sinT = Math.sin(delta * speed);

        baseP[i3] = ox * cosT - oz * sinT;
        baseP[i3 + 2] = ox * sinT + oz * cosT;

        // Cursor repulsion
        const dx = px - mouseSphere.x;
        const dy = py - mouseSphere.y;
        const dz = pz - mouseSphere.z;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < 3.8 && distSq > 0.001) {
            const force = (1.0 - distSq / 3.8) * 0.12;
            particleVel[i3] += (dx / Math.sqrt(distSq)) * force;
            particleVel[i3 + 1] += (dy / Math.sqrt(distSq)) * force;
            particleVel[i3 + 2] += (dz / Math.sqrt(distSq)) * force;
        }

        // Return to base position
        particleVel[i3] += (baseP[i3] - px) * 0.04;
        particleVel[i3 + 1] += (baseP[i3 + 1] - py) * 0.04;
        particleVel[i3 + 2] += (baseP[i3 + 2] - pz) * 0.04;

        particleVel[i3] *= 0.88;
        particleVel[i3 + 1] *= 0.88;
        particleVel[i3 + 2] *= 0.88;

        pos[i3] += particleVel[i3];
        pos[i3 + 1] += particleVel[i3 + 1];
        pos[i3 + 2] += particleVel[i3 + 2];
    }
    particleGeo.attributes.position.needsUpdate = true;

    // 6. Pulse Decay
    if (pulseIntensity > 0) {
        pulseIntensity = Math.max(0, pulseIntensity - delta * 1.6);
        coreLight.intensity = 16 + pulseIntensity * 45;
        bloomPass.strength = THEMES[currentTheme].bloom + pulseIntensity * 0.6;
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
