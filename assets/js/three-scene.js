/* ============================================================
   ARCHIVE//01 — three-scene.js
   Obsidian artifact exhibit · cursor force field · chapters
   Three.js r170 ES module. No green. Ember horizon.
   ============================================================ */

import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = () => window.innerWidth < 768;
const MOBILE = isMobile();
const COARSE = window.matchMedia('(pointer: coarse)').matches;

const INK = 0x0B0B0C;
const BONE = 0xF4F1EB;
const EMBER = 0xFF4D00;

/* Helper: procedural radial glow dot texture */
let _dotTexCache = null;
function dotTexture() {
    if (_dotTexCache) return _dotTexCache;
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
    _dotTexCache = new THREE.CanvasTexture(c);
    return _dotTexCache;
}

/* ------------------------------------------------------------
   Renderer / scene / camera / composer
   ------------------------------------------------------------ */
const container = document.getElementById('webgl-container');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(INK, 0.028);

const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 200);
camera.position.set(2.2, 0.4, 9.5);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, MOBILE ? 1.5 : 2));
container.appendChild(renderer.domElement);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloomPass = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.4, 0.6, 0.15);
composer.addPass(bloomPass);

/* ------------------------------------------------------------
   Environment + lights
   ------------------------------------------------------------ */
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const keyLight = new THREE.DirectionalLight(BONE, 1.1);
keyLight.position.set(4, 8, 6);
scene.add(keyLight);

let emberBase = 6;
const emberLight = new THREE.PointLight(EMBER, emberBase, 30);
emberLight.position.set(0, -7, 2);
scene.add(emberLight);

const cursorLight = new THREE.PointLight(BONE, 3, 18);
cursorLight.position.set(0, 0, 4);
scene.add(cursorLight);

/* ------------------------------------------------------------
   Floor hint (catches the ember glow)
   ------------------------------------------------------------ */
const floor = new THREE.Mesh(
    new THREE.CircleGeometry(40, 48),
    new THREE.MeshStandardMaterial({ color: 0x0e0e10, roughness: .9, metalness: .1 })
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -6;
scene.add(floor);

/* ------------------------------------------------------------
   The artifact — obsidian torus knot
   ------------------------------------------------------------ */
const artifact = new THREE.Group();
const ART_POS = new THREE.Vector3(MOBILE ? 0 : 2.6, 0.2, MOBILE ? -3 : -1);
artifact.position.copy(ART_POS);

const knotGeo = new THREE.TorusKnotGeometry(1.9, 0.55, MOBILE ? 140 : 220, MOBILE ? 20 : 32);
const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x151517, metalness: .92, roughness: .22, envMapIntensity: 1.2,
});
const knotBody = new THREE.Mesh(knotGeo, bodyMat);
artifact.add(knotBody);

const wireMat = new THREE.MeshBasicMaterial({
    color: BONE, wireframe: true, transparent: true, opacity: .08,
});
const knotWire = new THREE.Mesh(knotGeo, wireMat);
artifact.add(knotWire);

scene.add(artifact);

/* Orbit rings */
function makeRing(radius) {
    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.015, 8, 128),
        new THREE.MeshBasicMaterial({ color: BONE, transparent: true, opacity: .35 })
    );
    ring.material.depthWrite = false;
    return ring;
}
const rings = [makeRing(3.1), makeRing(3.9)];
rings[0].rotation.set(Math.PI / 2.4, 0.3, 0);
rings[1].rotation.set(Math.PI / 1.8, -0.4, 0.2);
artifact.add(rings[0], rings[1]);

/* ------------------------------------------------------------
   Shard fleet
   ------------------------------------------------------------ */
const shardMats = [];
function makeShardMaterial() {
    const m = new THREE.MeshStandardMaterial({
        color: 0x131315, metalness: .9, roughness: .25,
        envMapIntensity: 1.0, transparent: true, opacity: 0,
    });
    shardMats.push(m);
    return m;
}
bodyMat.transparent = true; bodyMat.opacity = 0;
wireMat.opacity = 0;
rings.forEach((r) => { r.material.transparent = true; r.material.opacity = 0; });

const shards = [];
const SHARD_COUNT = (MOBILE || COARSE) ? 3 : 7;
for (let i = 0; i < SHARD_COUNT; i++) {
    let x = (Math.random() * 2 - 1) > 0 ? Math.random() * 14 + 4 : -(Math.random() * 16 + 5);
    let y = (Math.random() - 0.45) * 9;
    let z = -Math.random() * 12 - 2;
    if (Math.abs(x) < 3) z = -6 - Math.random() * 5; // corridor rule

    const geo = Math.random() > 0.5
        ? new THREE.OctahedronGeometry(0.5 + Math.random() * 0.6)
        : new THREE.TetrahedronGeometry(0.55 + Math.random() * 0.65);
    const mesh = new THREE.Mesh(geo, makeShardMaterial());
    mesh.position.set(x, y, z);
    scene.add(mesh);

    shards.push({
        mesh,
        home: new THREE.Vector3(x, y, z),
        vel: new THREE.Vector3(),
        phase: Math.random() * Math.PI * 2,
        spinAxis: new THREE.Vector3().randomDirection(),
        spinSpeed: 0.2 + Math.random() * 0.4,
    });
}

/* Dust */
const dotCanvas = document.createElement('canvas');
dotCanvas.width = dotCanvas.height = 64;
{
    const g = dotCanvas.getContext('2d');
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
}
const dustTex = new THREE.CanvasTexture(dotCanvas);

const DUST_COUNT = 300;
const dustPos = new Float32Array(DUST_COUNT * 3);
for (let i = 0; i < DUST_COUNT; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 44;
    dustPos[i * 3 + 1] = -8 + Math.random() * 18;
    dustPos[i * 3 + 2] = -Math.random() * 24;
}
const dustGeo = new THREE.BufferGeometry();
dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
const dustMat = new THREE.PointsMaterial({
    map: dustTex, size: .06, color: BONE, transparent: true,
    opacity: .35, depthWrite: false,
});
const dust = new THREE.Points(dustGeo, dustMat);
scene.add(dust);

/* ------------------------------------------------------------
   THE DECK — 3D vinyl player (chapter 04)
   ------------------------------------------------------------ */
const playerGroup = new THREE.Group();
playerGroup.position.set(0.15, -0.55, 0);
scene.add(playerGroup);

const playerMats = [];
function pmat(opts) {
    const { opacity, ...rest } = opts;
    const m = new THREE.MeshStandardMaterial({ transparent: true, opacity: 0, ...rest });
    m.userData.baseO = opacity ?? 0.96;
    playerMats.push(m);
    return m;
}
const pbasic = [];
function pbasicMat(color, opacity = 1) {
    const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0 });
    m.userData.baseOp = opacity;
    pbasic.push(m);
    return m;
}

/* platter + disc */
const disc = new THREE.Group();
disc.rotation.x = 0;
const lamel = new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 1.5, 0.12, 48),
    pmat({ color: 0x14161f, metalness: .9, roughness: .32 })
);
disc.add(lamel);
const labelDisc = new THREE.Mesh(
    new THREE.CylinderGeometry(0.46, 0.46, 0.145, 32),
    pmat({ color: 0xFF4D00, metalness: .4, roughness: .5, emissive: 0xFF4D00, emissiveIntensity: .35 })
);
disc.add(labelDisc);
const accentColor = labelDisc.material.emissive; // shared, theme-lerped

[1.02, 1.22, 1.4].forEach((r) => {
    const groove = new THREE.Mesh(new THREE.TorusGeometry(r, 0.01, 6, 96), pbasicMat(BONE, .3));
    groove.rotation.x = Math.PI / 2;
    groove.position.y = 0.075;
    disc.add(groove);
});
disc.children.forEach((c) => { c.position.y -= 0.06; });
playerGroup.add(disc);

/* tone arm */
const armPivot = new THREE.Group();
armPivot.position.set(2.55, 0.15, -1.15);
const armMat = pmat({ color: 0xb9bcc9, metalness: .85, roughness: .35 });
const armCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-1.5, 0.08, 0.25),
    new THREE.Vector3(-2.35, 0.14, 0.72),
]);
const armTube = new THREE.Mesh(new THREE.TubeGeometry(armCurve, 24, 0.035, 8), armMat);
armPivot.add(armTube);
const counterweight = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 16), armMat);
counterweight.position.set(0.28, 0, -0.1);
armPivot.add(counterweight);
armPivot.rotation.y = -0.55; // rest position
playerGroup.add(armPivot);

/* spectrum ring — 64 reactive bars */
const BAR_COUNT = MOBILE ? 32 : 64;
const barGeo = new THREE.BoxGeometry(0.09, 1, 0.09);
barGeo.translate(0, 0.5, 0);
const barMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, toneMapped: false });
pbasic.push(barMat);
barMat.userData.baseOp = .92;
const bars = new THREE.InstancedMesh(barGeo, barMat, BAR_COUNT);
bars.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
const cLow = new THREE.Color(0x7C5CFF), cHigh = new THREE.Color(0xFFB454), cTmp = new THREE.Color();
for (let i = 0; i < BAR_COUNT; i++) {
    cTmp.copy(cLow).lerp(cHigh, i / (BAR_COUNT - 1));
    bars.setColorAt(i, cTmp);
}
playerGroup.add(bars);

const barHeights = new Float32Array(BAR_COUNT);
const freqData = new Uint8Array(128);
const dummy = new THREE.Object3D();

/* deck light pulses with RMS */
const deckLight = new THREE.PointLight(accentColor.getHex(), 0, 10);
deckLight.position.set(0, 2.2, 0);
playerGroup.add(deckLight);
const deckBaseIntensity = 2.2;

/* player visibility by chapter */
let deckVisT = 0;

/* drag-to-spin (inertia) */
let spinVel = 0;
let dragging = false, lastDragX = 0;
addEventListener('pointerdown', (e) => {
    if (e.target.closest('a, button, input, .plate, .player-console')) return;
    dragging = true; lastDragX = e.clientX;
});
addEventListener('pointermove', (e) => {
    if (!dragging || RM || COARSE) return;
    const dx = e.clientX - lastDragX;
    lastDragX = e.clientX;
    spinVel += dx * 0.00045;
});
addEventListener('pointerup', () => { dragging = false; });

/* click-the-disc test exposed for ui.js ripple handler */
window.__archiveDiscClick = (nx, ny) => {
    if (deckVisT < 0.5) return false;
    raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera);
    return raycaster.intersectObjects([lamel, labelDisc], false).length > 0;
};

/* ------------------------------------------------------------
   Theme palettes — scene recolors on themechange
   ------------------------------------------------------------ */
const SCENE_PALETTES = {
    archive: { fog: new THREE.Color(0x0B0B0C), key: new THREE.Color(0xF4F1EB), glow: new THREE.Color(0xFF4D00), cursor: new THREE.Color(0xF4F1EB), body: new THREE.Color(0x151517), floorC: new THREE.Color(0x0e0e10) },
    deck: { fog: new THREE.Color(0x080B14), key: new THREE.Color(0x9BE8FF), glow: new THREE.Color(0x7C5CFF), cursor: new THREE.Color(0x9BE8FF), body: new THREE.Color(0x11162A), floorC: new THREE.Color(0x0b101d) },
    workstation: { fog: new THREE.Color(0x07090E), key: new THREE.Color(0x00F0FF), glow: new THREE.Color(0xFF2E93), cursor: new THREE.Color(0x00FF9D), body: new THREE.Color(0x0E1320), floorC: new THREE.Color(0x05070C) },
};

let currentTheme = document.documentElement.getAttribute('data-theme') || 'archive';
let palMix = currentTheme === 'workstation' ? 2 : currentTheme === 'deck' ? 1 : 0;
let palTarget = palMix;
const fogWarm = new THREE.Color(0x100c0a), fogDeckWarm = new THREE.Color(0x0d1024), fogWorkstationWarm = new THREE.Color(0x0a1020);

function applyThemeColors(tName) {
    const pal = SCENE_PALETTES[tName] || SCENE_PALETTES.archive;
    keyLight.color.copy(pal.key);
    cursorLight.color.copy(pal.cursor);
    emberLight.color.copy(pal.glow);
    bodyMat.color.copy(pal.body);
    floor.material.color.copy(pal.floorC);
    accentColor.copy(pal.glow);
    deckLight.color.copy(accentColor);
    scene.fog.color.copy(pal.fog);
}
applyThemeColors(currentTheme);

addEventListener('themechange', (e) => {
    currentTheme = e.detail?.theme || 'archive';
    palTarget = currentTheme === 'workstation' ? 2 : currentTheme === 'deck' ? 1 : 0;
    applyThemeColors(currentTheme);
});
let discSpin = 0;
let artFade = 1;

/* ------------------------------------------------------------
   CYBER WORKSTATION 3D (Theme 3: Ultrawide Monitor, Keyboard, Mascot, Holo-Tablets)
   ------------------------------------------------------------ */
const wsGroup = new THREE.Group();
wsGroup.position.set(MOBILE ? 0 : 3.8, -0.3, -0.2);
wsGroup.scale.setScalar(MOBILE ? 0.65 : 0.88);
scene.add(wsGroup);

/* Workstation Lights & Ambient */
const wsAmbient = new THREE.AmbientLight(0x4488ff, 1.2);
wsGroup.add(wsAmbient);

const wsLight1 = new THREE.PointLight(0x00F0FF, 25, 30);
wsLight1.position.set(0, 3.0, 2.5);
wsGroup.add(wsLight1);

const wsLight2 = new THREE.PointLight(0xFF2E93, 18, 25);
wsLight2.position.set(0, 0.5, -1.5);
wsGroup.add(wsLight2);

const wsMats = [];
function wsMat(opts) {
    const { opacity, ...rest } = opts;
    const baseO = opacity ?? 0.98;
    const m = new THREE.MeshStandardMaterial({ transparent: true, opacity: baseO, ...rest });
    m.userData.baseO = baseO;
    wsMats.push(m);
    return m;
}

/* 1. Desk Surface with Neon Edge */
const deskMesh = new THREE.Mesh(
    new THREE.BoxGeometry(4.8, 0.16, 2.4),
    wsMat({ color: 0x2d4470, roughness: 0.2, metalness: 0.5, emissive: 0x14254a, emissiveIntensity: 0.8 })
);
deskMesh.position.set(0, -1.5, 0);
wsGroup.add(deskMesh);

const deskWire = new THREE.Mesh(
    new THREE.BoxGeometry(4.82, 0.17, 2.42),
    new THREE.MeshBasicMaterial({ color: 0x00F0FF, wireframe: true, transparent: true, opacity: 0.4 })
);
deskWire.position.copy(deskMesh.position);
wsGroup.add(deskWire);
wsMats.push(deskWire.material);
deskWire.material.userData.baseO = 0.4;

/* 2. 3D Ultrawide Monitor & Screen Canvas */
const monitorGroup = new THREE.Group();
monitorGroup.position.set(0, 0.5, -0.4);

const monStand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.18, 1.4, 16),
    wsMat({ color: 0x00F0FF, metalness: 0.9, roughness: 0.1, emissive: 0x00F0FF, emissiveIntensity: 0.9 })
);
monStand.position.set(0, -0.7, -0.1);
monitorGroup.add(monStand);

const monBody = new THREE.Mesh(
    new THREE.BoxGeometry(3.8, 1.9, 0.18),
    wsMat({ color: 0x2b3e66, metalness: 0.6, roughness: 0.2, emissive: 0x00F0FF, emissiveIntensity: 0.4 })
);
monitorGroup.add(monBody);

const monWire = new THREE.Mesh(
    new THREE.BoxGeometry(3.84, 1.94, 0.2),
    new THREE.MeshBasicMaterial({ color: 0x00F0FF, wireframe: true, transparent: true, opacity: 0.4 })
);
monitorGroup.add(monWire);
wsMats.push(monWire.material);
monWire.material.userData.baseO = 0.4;

/* Screen Canvas & Texture */
const screenCanvas = document.createElement('canvas');
screenCanvas.width = 512; screenCanvas.height = 256;
const screenCtx = screenCanvas.getContext('2d');
const screenTex = new THREE.CanvasTexture(screenCanvas);

const screenMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(3.68, 1.78),
    new THREE.MeshBasicMaterial({ map: screenTex, transparent: true, opacity: 1.0, toneMapped: false })
);
screenMesh.position.z = 0.1;
monitorGroup.add(screenMesh);
wsMats.push(screenMesh.material);
screenMesh.material.userData.baseO = 1.0;

/* Soft Volumetric Glow Sprite behind Monitor */
const screenGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: dotTexture(),
    color: 0x00F0FF,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
}));
screenGlow.scale.set(6.2, 3.6, 1);
screenGlow.position.set(0, 0, -0.15);
monitorGroup.add(screenGlow);
wsMats.push(screenGlow.material);
screenGlow.material.userData.baseO = 0.55;

wsGroup.add(monitorGroup);

/* Live Monitor Drawing Function */
const codeSnippets = [
    "// ARCH1CAT CYBER OS v3.8 — SYSTEM ONLINE",
    "> agent.init({ provider: 'antigravity', model: 'gemini-3.7' })",
    "> webgl.render(3D_WORKSTATION_DEMO, { fps: 60 })",
    "> audio.stream('KYIV_NIGHTBUS', { bpm: 84 })",
    "> neural.query('build autonomous AI agent workflows')",
    "> status: ALL SYSTEMS OPERATIONAL [OK]",
];
function drawMonitorScreen(t) {
    screenCtx.fillStyle = "#060913";
    screenCtx.fillRect(0, 0, 512, 256);
    
    // Header Bar
    screenCtx.fillStyle = "#0e162a";
    screenCtx.fillRect(0, 0, 512, 28);
    screenCtx.fillStyle = "#00F0FF";
    screenCtx.font = "11px monospace";
    screenCtx.fillText("ARCH1CAT // CYBER WORKSTATION OS v3.8", 12, 18);
    
    screenCtx.fillStyle = "#FF2E93";
    screenCtx.beginPath();
    screenCtx.arc(492, 14, 4, 0, Math.PI * 2);
    screenCtx.fill();

    // Code Stream Lines
    screenCtx.fillStyle = "#8AA2D6";
    screenCtx.font = "10px monospace";
    for (let i = 0; i < 6; i++) {
        const line = codeSnippets[i];
        const y = 54 + i * 22;
        screenCtx.fillText(line, 14, y);
    }

    // Waveform Graphic at bottom of monitor
    screenCtx.strokeStyle = "#00FF9D";
    screenCtx.lineWidth = 2;
    screenCtx.beginPath();
    for (let x = 0; x < 484; x += 6) {
        const vy = 205 + Math.sin(t * 4 + x * 0.05) * 14 + Math.cos(t * 8 + x * 0.02) * 8;
        if (x === 0) screenCtx.moveTo(14 + x, vy);
        else screenCtx.lineTo(14 + x, vy);
    }
    screenCtx.stroke();
    screenTex.needsUpdate = true;
}

/* 3. 3D Mechanical Keyboard */
const kbGroup = new THREE.Group();
kbGroup.position.set(0, -1.38, 0.5);
kbGroup.rotation.x = -0.08;

const kbBase = new THREE.Mesh(
    new THREE.BoxGeometry(2.6, 0.08, 0.95),
    wsMat({ color: 0x101626, metalness: 0.7, roughness: 0.4 })
);
kbGroup.add(kbBase);

/* 3D Keycaps */
const keyMeshes = [];
const KEY_ROWS = 5, KEY_COLS = 12;
for (let r = 0; r < KEY_ROWS; r++) {
    for (let c = 0; c < KEY_COLS; c++) {
        const isAccent = (r === 2 && c === 11) || (r === 4 && c >= 4 && c <= 7);
        const col = isAccent ? 0xFF2E93 : (r === 0 ? 0x00F0FF : 0x222b42);
        const kMat = wsMat({ color: col, metalness: 0.5, roughness: 0.4, emissive: col, emissiveIntensity: 0.1 });
        const kw = (r === 4 && c >= 4 && c <= 7) ? 0.6 : 0.16;
        if (r === 4 && c > 4 && c <= 7) continue;
        
        const kMesh = new THREE.Mesh(new THREE.BoxGeometry(kw, 0.06, 0.14), kMat);
        const kx = -1.1 + c * 0.2 + (kw > 0.2 ? 0.2 : 0);
        const kz = -0.36 + r * 0.18;
        kMesh.position.set(kx, 0.06, kz);
        kMesh.userData = { homeY: 0.06, pressT: 0 };
        kbGroup.add(kMesh);
        keyMeshes.push(kMesh);
    }
}
wsGroup.add(kbGroup);

/* Keyboard Sparkles */
const sparkGeo = new THREE.BufferGeometry();
const SPARK_COUNT = 40;
const sparkPos = new Float32Array(SPARK_COUNT * 3);
const sparkVel = new Float32Array(SPARK_COUNT * 3);
sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
for (let i = 0; i < SPARK_COUNT * 3; i++) sparkPos[i] = 0;
const sparkMat = new THREE.PointsMaterial({ color: 0x00F0FF, size: 0.12, transparent: true, opacity: 0 });
const sparkSystem = new THREE.Points(sparkGeo, sparkMat);
kbGroup.add(sparkSystem);

function emitKeyboardSparks(originPos) {
    const p = sparkGeo.attributes.position.array;
    for (let i = 0; i < SPARK_COUNT; i++) {
        p[i * 3] = originPos.x + (Math.random() - 0.5) * 0.2;
        p[i * 3 + 1] = originPos.y + 0.1;
        p[i * 3 + 2] = originPos.z + (Math.random() - 0.5) * 0.2;
        sparkVel[i * 3] = (Math.random() - 0.5) * 0.08;
        sparkVel[i * 3 + 1] = 0.08 + Math.random() * 0.12;
        sparkVel[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
    }
    sparkGeo.attributes.position.needsUpdate = true;
    sparkMat.opacity = 1.0;
}

window.addEventListener('keydown', (e) => {
    if (document.documentElement.getAttribute('data-theme') !== 'workstation') return;
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    const randIdx = Math.floor(Math.random() * keyMeshes.length);
    const k = keyMeshes[randIdx];
    if (k) {
        k.userData.pressT = 1.0;
        emitKeyboardSparks(k.position);
    }
});

/* 4. 3D Cyber Cat Mascot on Monitor */
const catGroup = new THREE.Group();
catGroup.position.set(0.9, 1.55, -0.35);

const catHead = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.36, 0.38),
    wsMat({ color: 0x121726, metalness: 0.8, roughness: 0.3 })
);
catGroup.add(catHead);

const ear1 = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.22, 4), wsMat({ color: 0xFF2E93, emissive: 0xFF2E93, emissiveIntensity: 0.4 }));
ear1.position.set(-0.14, 0.26, 0);
const ear2 = ear1.clone(); ear2.position.x = 0.14;
catGroup.add(ear1, ear2);

const eyeMat = new THREE.MeshBasicMaterial({ color: 0x00FF9D, transparent: true, opacity: 1.0 });
wsMats.push(eyeMat); eyeMat.userData.baseO = 1.0;
const eye1 = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), eyeMat);
eye1.position.set(-0.11, 0.04, 0.2);
const eye2 = eye1.clone(); eye2.position.x = 0.11;
catGroup.add(eye1, eye2);

const tailCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.18, -0.1, -0.1),
    new THREE.Vector3(0.35, -0.05, -0.3),
    new THREE.Vector3(0.45, 0.18, -0.45),
]);
const catTail = new THREE.Mesh(new THREE.TubeGeometry(tailCurve, 16, 0.03, 8), wsMat({ color: 0x00F0FF, emissive: 0x00F0FF, emissiveIntensity: 0.3 }));
catGroup.add(catTail);

let catPurrT = 0;
catGroup.userData.click = () => {
    catPurrT = 1.0;
    eyeMat.color.setHex(0xFF2E93);
    setTimeout(() => eyeMat.color.setHex(0x00FF9D), 1200);
};
wsGroup.add(catGroup);

/* 5. 3D Project Holo-Tablets */
const holoGroup = new THREE.Group();
const HOLO_PROJECTS = [
    { title: 'World Monitor', tag: 'OSINT', stars: '★ 00', url: 'https://github.com/l2bote4game/world-monitor' },
    { title: 'WiFi Scanner', tag: 'KOTLIN', stars: '★ 00', url: 'https://github.com/l2bote4game/wifiscaner' },
    { title: 'Metadata Cleaner', tag: 'PYTHON', stars: '★ 00', url: 'https://github.com/l2bote4game/media-meta-cleaner' },
    { title: 'Cats Match-3', tag: 'GAME', stars: '★ 00', url: 'https://github.com/l2bote4game/cats-match3-game' },
    { title: 'openGym v1.2', tag: 'APK', stars: '★ 00', url: 'https://github.com/l2bote4game/openGym' },
];

const holoPlates = [];
HOLO_PROJECTS.forEach((proj, idx) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 128;
    const ctx2 = canvas.getContext('2d');
    ctx2.fillStyle = '#0a1020'; ctx2.fillRect(0, 0, 256, 128);
    ctx2.strokeStyle = '#00F0FF'; ctx2.lineWidth = 3; ctx2.strokeRect(2, 2, 252, 124);
    ctx2.fillStyle = '#00FF9D'; ctx2.font = 'bold 11px monospace'; ctx2.fillText(`// 00${idx + 1} — ${proj.tag}`, 12, 24);
    ctx2.fillStyle = '#E4EBFF'; ctx2.font = 'bold 16px sans-serif'; ctx2.fillText(proj.title, 12, 54);
    ctx2.fillStyle = '#FF2E93'; ctx2.font = '12px monospace'; ctx2.fillText(proj.stars, 12, 90);

    const tex = new THREE.CanvasTexture(canvas);
    const pMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.9 });
    wsMats.push(pMat); pMat.userData.baseO = 0.9;
    
    const plateMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 0.8), pMat);
    const ang = (idx / 5) * Math.PI - Math.PI / 2;
    const rx = Math.sin(ang) * 3.8;
    const rz = -Math.cos(ang) * 1.5 - 1.2;
    plateMesh.position.set(rx, 0.4 + (idx % 2) * 0.6, rz);
    plateMesh.rotation.y = -ang * 0.6;
    plateMesh.userData = { homePos: plateMesh.position.clone(), projUrl: proj.url };
    holoGroup.add(plateMesh);
    holoPlates.push(plateMesh);
});
wsGroup.add(holoGroup);

/* 6. Dynamic Constellation Node Graph around Workstation */
const NODE_COUNT = 14;
const nodeGeo = new THREE.SphereGeometry(0.06, 8, 8);
const nodeMat = wsMat({ color: 0x00F0FF, emissive: 0x00F0FF, emissiveIntensity: 0.8 });
const nodeMeshes = [];
const nodePositions = [];
const nodeVelocities = [];

for (let i = 0; i < NODE_COUNT; i++) {
    const m = new THREE.Mesh(nodeGeo, nodeMat);
    const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 7.5,
        -1.0 + Math.random() * 3.2,
        -1.5 + (Math.random() - 0.5) * 2.5
    );
    m.position.copy(pos);
    wsGroup.add(m);
    nodeMeshes.push(m);
    nodePositions.push(pos.clone());
    nodeVelocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.006,
        (Math.random() - 0.5) * 0.006,
        (Math.random() - 0.5) * 0.006
    ));
}

/* Constellation Lines Geometry */
const MAX_LINES = NODE_COUNT * (NODE_COUNT - 1);
const constLineGeo = new THREE.BufferGeometry();
const constLinePos = new Float32Array(MAX_LINES * 6);
constLineGeo.setAttribute('position', new THREE.BufferAttribute(constLinePos, 3));
const constLineMat = new THREE.LineBasicMaterial({
    color: 0x7C5CFF,
    transparent: true,
    opacity: 0,
});
wsMats.push(constLineMat);
constLineMat.userData.baseO = 0.35;
const constLineSegments = new THREE.LineSegments(constLineGeo, constLineMat);
wsGroup.add(constLineSegments);

function updateConstellation(t) {
    let lineIdx = 0;
    const posArr = constLineGeo.attributes.position.array;
    for (let i = 0; i < NODE_COUNT; i++) {
        const p1 = nodeMeshes[i].position;
        const v = nodeVelocities[i];
        p1.x += v.x; p1.y += v.y; p1.z += v.z;
        if (Math.abs(p1.x - nodePositions[i].x) > 0.8) v.x *= -1;
        if (Math.abs(p1.y - nodePositions[i].y) > 0.8) v.y *= -1;
        if (Math.abs(p1.z - nodePositions[i].z) > 0.8) v.z *= -1;

        for (let j = i + 1; j < NODE_COUNT; j++) {
            const p2 = nodeMeshes[j].position;
            const dist = p1.distanceTo(p2);
            if (dist < 2.3) {
                posArr[lineIdx * 6] = p1.x; posArr[lineIdx * 6 + 1] = p1.y; posArr[lineIdx * 6 + 2] = p1.z;
                posArr[lineIdx * 6 + 3] = p2.x; posArr[lineIdx * 6 + 4] = p2.y; posArr[lineIdx * 6 + 5] = p2.z;
                lineIdx++;
            }
        }
    }
    constLineGeo.setDrawRange(0, lineIdx * 2);
    constLineGeo.attributes.position.needsUpdate = true;
}

/* ------------------------------------------------------------
   Materialization (archive:ready event or timeout fallback)
   ------------------------------------------------------------ */
let materialized = false;
const materializeTargets = { bodyOpacity: .96, wireOpacity: .08, ringOpacity: .35 };

function startMaterialize() {
    if (materialized) return;
    materialized = true;
    const t0 = performance.now();
    const DUR = 800;
    shards.forEach((s, i) => {
        s.mesh.scale.setScalar(.6);
        setTimeout(() => {
            const st = performance.now();
            (function grow(now) {
                const p = Math.min((now - st) / DUR, 1);
                const e = 1 - Math.pow(1 - p, 3);
                const back = 1 + 0.08 * Math.sin(p * Math.PI);
                s.mesh.scale.setScalar((.6 + .4 * e) * back);
                if (p < 1) requestAnimationFrame(grow);
                else s.mesh.scale.setScalar(1);
            })(st);
        }, i * 60);
    });

    (function fade(now) {
        const p = Math.min((now - t0) / DUR, 1);
        const e = 1 - Math.pow(1 - p, 3);
        bodyMat.opacity = materializeTargets.bodyOpacity * e;
        wireMat.opacity = materializeTargets.wireOpacity * e;
        rings.forEach((r) => { r.material.opacity = materializeTargets.ringOpacity * e; });
        shardMats.forEach((m) => { m.opacity = .96 * e; });
        if (p < 1) requestAnimationFrame(fade);
    })(t0);
}
window.addEventListener('archive:ready', startMaterialize);
setTimeout(startMaterialize, RM ? 50 : 1200);
if (currentTheme === 'workstation') startMaterialize();

/* ------------------------------------------------------------
   Cursor → 3D
   ------------------------------------------------------------ */
const ndc = new THREE.Vector2(0, 0);
const cursor3 = new THREE.Vector3(999, 999, 0); // offscreen until first move
const planeZ0 = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const raycaster = new THREE.Raycaster();

addEventListener('pointermove', (e) => {
    ndc.x = (e.clientX / innerWidth) * 2 - 1;
    ndc.y = -(e.clientY / innerHeight) * 2 + 1;
}, { passive: true });

/* Hover focus on the artifact */
let focusT = 0, focusTarget = 0;

/* Click wave state */
let waveT = -1;
const WAVE_DUR = 0.6;
function triggerWave(strength = 1) {
    waveT = 0;
    shards.forEach((s) => {
        const d = s.mesh.position.distanceTo(cursor3);
        if (d < 8) {
            dir.copy(s.mesh.position).sub(cursor3).normalize()
               .multiplyScalar((8 - d) * 0.5 * strength);
            s.vel.add(dir);
        }
    });
}

window.__archive = {
    scene, camera, composer, bloomPass,
    forceChapter(name) {
        if (!CHAPTERS[name]) return;
        currentChapter = name;
        camTarget.set(...CHAPTERS[name].pos);
        lookTarget.set(...CHAPTERS[name].look);
        emberChapter = CHAPTERS[name].ember;
    },
    surge() {
        triggerWave(2);
        emberFlash = 1.5; // +150% decaying to 0 over 900ms
    },
};

addEventListener('pointerdown', (e) => {
    if (!materialized) return;
    // update cursor3 for this click even before a move happens nearby
    raycaster.setFromCamera(ndc, camera);
    raycaster.ray.intersectPlane(planeZ0, tmpV);
    cursor3.copy(tmpV);
    triggerWave(1);
    emberFlash = Math.max(emberFlash, 0.3);
});

const dir = new THREE.Vector3();
const tmpV = new THREE.Vector3();
let emberFlash = 0;

/* ------------------------------------------------------------
   Chapters — camera keys via scroll observer
   ------------------------------------------------------------ */
const CHAPTERS = {
    prologue: { pos: [2.2, 0.4, 9.5], look: [1.2, 0, 0], ember: 6 },
    works: { pos: [-2, -0.6, 10.5], look: [0, -0.4, 0], ember: 7 },
    flagship: { pos: [3, 1.2, 8], look: [0, 0.2, 0], ember: 4 },
    'deck-transmission': { pos: [0.05, 0.9, 7.2], look: [0, -0.35, 0], ember: 7 },
    signal: { pos: [0, -2.4, 11], look: [0, -1, 0], ember: 8 },
};
let camTarget = new THREE.Vector3(...CHAPTERS.prologue.pos);
let lookTarget = new THREE.Vector3(...CHAPTERS.prologue.look);
let emberChapter = CHAPTERS.prologue.ember;
let currentChapter = 'prologue';

const chapterIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const name = entry.target.dataset.chapter;
        if (!CHAPTERS[name]) return;
        currentChapter = name;
        camTarget.set(...CHAPTERS[name].pos);
        lookTarget.set(...CHAPTERS[name].look);
        emberChapter = CHAPTERS[name].ember;
        window.dispatchEvent(new CustomEvent('chapterchange', { detail: { name } }));
    });
}, { rootMargin: '-45% 0px -45% 0px' });
document.querySelectorAll('[data-chapter]').forEach((el) => chapterIO.observe(el));

/* Mouse parallax */
const parallax = new THREE.Vector2(0, 0);

/* ------------------------------------------------------------
   FPS governor
   ------------------------------------------------------------ */
let frameTimes = [];
let govStep = 0;
function govern(dt) {
    frameTimes.push(dt);
    if (frameTimes.length < 60) return;
    const avg = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
    frameTimes = [];
    const fps = 1 / avg;
    if (fps >= 32 || govStep > 2) return;
    if (govStep === 0) {
        renderer.setPixelRatio(1.25);
    } else if (govStep === 1) {
        bloomPass.enabled = false;
        knotWire.material.opacity = Math.max(wireMat.opacity, .14);
        dustMat.opacity = .5;
    } else {
        dust.visible = false;
    }
    console.info(`[perf] degraded to step ${govStep + 1} (fps ${fps.toFixed(1)})`);
    govStep++;
}

/* Resize + visibility */
addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    composer.setSize(innerWidth, innerHeight);
});

document.addEventListener('visibilitychange', () => {
    clock.getDelta(); // swallow accumulated time on return
});

/* ------------------------------------------------------------
   Main loop
   ------------------------------------------------------------ */
const lookAtVec = new THREE.Vector3(...CHAPTERS.prologue.look);
const clock = new THREE.Clock();
let elapsed = 0;

function animate() {
    requestAnimationFrame(animate);
    const rawDt = clock.getDelta();
    if (document.hidden) return;
    const dt = Math.min(rawDt, 0.05);
    govern(rawDt);

    if (!RM) elapsed += dt;
    const t = elapsed;

    /* cursor world position + light */
    raycaster.setFromCamera(ndc, camera);
    if (raycaster.ray.intersectPlane(planeZ0, tmpV)) cursor3.copy(tmpV);
    cursorLight.position.lerp(
        new THREE.Vector3(cursor3.x, cursor3.y, 4),
        0.12
    );

    /* hover raycast against artifact body */
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObject(knotBody, false);
    focusTarget = hit.length ? 1 : 0;
    focusT += (focusTarget - focusT) * 0.08;

    /* artifact breathing + rotation */
    artifact.position.y = ART_POS.y + (RM ? 0 : Math.sin(t * .6) * .25);
    artifact.rotation.y += RM ? 0 : 0.08 * dt * 60 * 0.016;
    artifact.rotation.y += 0; // (kept explicit)
    artifact.rotation.z = Math.sin(t * .3) * 0.05;

    /* rings precession + click wave scale */
    let ringScale = 1;
    if (waveT >= 0) {
        waveT += dt;
        const p = waveT / WAVE_DUR;
        if (p >= 1) waveT = -1;
        else {
            const pulse = Math.sin(p * Math.PI);
            ringScale = 1 + pulse * 0.35;
        }
    }
    const ringSpeed = 0.15 + focusT * 0.38;
    rings[0].rotation.x += ringSpeed * dt;
    rings[1].rotation.y -= ringSpeed * dt * 0.7;
    rings.forEach((r) => r.scale.setScalar(ringScale));

    /* shards spring physics + repulsion */
    for (const s of shards) {
        dir.copy(s.home).sub(s.mesh.position).multiplyScalar(2.2 * dt);
        s.vel.add(dir);
        if (!RM && !COARSE) {
            const d = s.mesh.position.distanceTo(cursor3);
            if (d < 4.5) {
                dir.copy(s.mesh.position).sub(cursor3)
                   .setLength((4.5 - d) * 6 * dt);
                s.vel.add(dir);
            }
        }
        if (!RM) s.vel.y += Math.sin(t * 0.8 + s.phase) * 0.02 * dt * 60;
        s.vel.multiplyScalar(0.90);
        s.mesh.position.addScaledVector(s.vel, dt * 60);
        s.mesh.rotateOnAxis(s.spinAxis, s.spinSpeed * dt);
    }

    /* dust drift up */
    if (!RM && dust.visible) {
        const pos = dustGeo.attributes.position.array;
        for (let i = 1; i < DUST_COUNT * 3; i += 3) {
            pos[i] += 0.004 * dt * 60;
            if (pos[i] > 10) pos[i] = -8;
        }
        dustGeo.attributes.position.needsUpdate = true;
    }

    /* hover focus effects */
    const ringOp = materialized ? (.35 + focusT * .25) : 0;
    rings.forEach((r) => { if (waveT < 0) r.material.opacity = ringOp; });
    wireMat.opacity = materialized ? .08 + focusT * .08 : 0;
    const emberNow = (emberChapter * (1 + focusT * .66)) * (1 + emberFlash);
    emberLight.intensity = emberNow;

    /* ember flash decay */
    if (emberFlash > 0) emberFlash = Math.max(0, emberFlash - dt * (emberFlash / 0.9 + 0.2));

    /* fog tint per chapter (theme-aware warm variants) */
    const warmFog = palMix > 1.5 ? fogWorkstationWarm : (palMix > 0.5 ? fogDeckWarm : fogWarm);
    const coldFog = palMix > 1.5 
        ? SCENE_PALETTES.deck.fog.clone().lerp(SCENE_PALETTES.workstation.fog, palMix - 1)
        : SCENE_PALETTES.archive.fog.clone().lerp(SCENE_PALETTES.deck.fog, palMix);
    const targetFog = currentChapter === 'flagship' ? warmFog : coldFog;
    scene.fog.color.lerp(targetFog, 0.04);

    /* theme palette lerp — colors glide between archive (0), deck (1), workstation (2) */
    if (Math.abs(palMix - palTarget) > 0.01) {
        palMix += (palTarget - palMix) * 0.08;
        const A = SCENE_PALETTES.archive, D = SCENE_PALETTES.deck, W = SCENE_PALETTES.workstation;
        let cKey, cGlow, cBody, cFloor, cCur;
        if (palMix <= 1) {
            cKey = A.key.clone().lerp(D.key, palMix);
            cGlow = A.glow.clone().lerp(D.glow, palMix);
            cBody = A.body.clone().lerp(D.body, palMix);
            cFloor = A.floorC.clone().lerp(D.floorC, palMix);
            cCur = A.cursor.clone().lerp(D.cursor, palMix);
        } else {
            const p2 = palMix - 1;
            cKey = D.key.clone().lerp(W.key, p2);
            cGlow = D.glow.clone().lerp(W.glow, p2);
            cBody = D.body.clone().lerp(W.body, p2);
            cFloor = D.floorC.clone().lerp(W.floorC, p2);
            cCur = D.cursor.clone().lerp(W.cursor, p2);
        }
        keyLight.color.copy(cKey);
        cursorLight.color.copy(cCur);
        emberLight.color.copy(cGlow);
        bodyMat.color.copy(cBody);
        floor.material.color.copy(cFloor);
        accentColor.copy(cGlow);
        deckLight.color.copy(accentColor);
    }

    /* ---- CYBER WORKSTATION 3D ANIMATIONS & VISIBILITY ---- */
    const isWorkstation = (currentTheme === 'workstation');
    const mob = isMobile();
    wsGroup.position.set(mob ? 0 : 3.8, -0.3, mob ? -2.0 : -0.2);
    wsGroup.scale.setScalar(mob ? 0.65 : 0.88);
    const wsVisTarget = isWorkstation ? 1 : 0;
    wsGroup.visible = wsVisTarget > 0.01 || (palMix > 1.05);

    /* Abstract artifact torus knot & shards hide in workstation theme to give full stage to 3D workstation */
    artifact.visible = !isWorkstation;
    shards.forEach((s) => { s.mesh.visible = !isWorkstation; });

    if (wsGroup.visible) {
        const wsOpacity = Math.max(0, Math.min(1, palMix > 1 ? (palMix - 1) : wsVisTarget));
        wsMats.forEach((m) => { m.opacity = (m.userData.baseO ?? 0.96) * wsOpacity; });
        
        if (!RM) {
            drawMonitorScreen(t);
            // Cat Mascot tail & head purr
            catTail.rotation.z = Math.sin(t * 2.2) * 0.25;
            if (catPurrT > 0) {
                catPurrT = Math.max(0, catPurrT - dt);
                catHead.rotation.x = Math.sin(t * 12) * 0.08;
            } else {
                catHead.rotation.x = 0;
            }
            // Cat eye blink
            const blink = Math.sin(t * 0.8) > 0.95 ? 0.1 : 1.0;
            eye1.scale.y = eye2.scale.y = blink;

            // Keyboard keys animation
            keyMeshes.forEach((k) => {
                if (k.userData.pressT > 0) {
                    k.userData.pressT = Math.max(0, k.userData.pressT - dt * 4);
                    k.position.y = k.userData.homeY - 0.035 * k.userData.pressT;
                } else {
                    k.position.y = k.userData.homeY;
                }
            });

            // Keyboard Sparks physics
            if (sparkMat.opacity > 0) {
                sparkMat.opacity = Math.max(0, sparkMat.opacity - dt * 2.5);
                const sp = sparkGeo.attributes.position.array;
                for (let i = 0; i < SPARK_COUNT; i++) {
                    sp[i * 3] += sparkVel[i * 3];
                    sp[i * 3 + 1] += sparkVel[i * 3 + 1];
                    sp[i * 3 + 2] += sparkVel[i * 3 + 2];
                    sparkVel[i * 3 + 1] -= 0.005; // gravity
                }
                sparkGeo.attributes.position.needsUpdate = true;
            }

            // Holo-Plates floating bob
            holoPlates.forEach((p, idx) => {
                p.position.y = p.userData.homePos.y + Math.sin(t * 1.2 + idx) * 0.08;
            });

            // Constellation Lines update
            updateConstellation(t);
        }
    }

    /* ---- THE DECK: visibility, spin, spectrum ---- */
    const deckVisTarget = (currentChapter === 'deck-transmission' || currentTheme === 'deck') ? 1 : 0;
    deckVisT += (deckVisTarget - deckVisT) * 0.06;
    /* artifact yields the stage to the deck during chapter 04 or workstation theme */
    const artFadeTarget = (currentChapter === 'deck-transmission' || isWorkstation) ? 0.0 : 1;
    artFade += (artFadeTarget - artFade) * 0.05;
    if (!isWorkstation) {
        bodyMat.opacity = materialized ? 0.96 * artFade : 0;
        wireMat.opacity = materialized ? (0.08 + focusT * .08) * Math.max(artFade, .35) : 0;
        const artScale = (MOBILE ? .75 : 1) * (0.82 + 0.18 * artFade);
        artifact.scale.setScalar(artScale);
    }
    playerGroup.visible = deckVisT > 0.01;
    if (playerGroup.visible) {
        playerMats.forEach((m) => { m.opacity = m.userData.baseO * deckVisT; });
        pbasic.forEach((m) => { m.opacity = m.userData.baseOp * deckVisT; });

        // inertia spin of whole group
        if (!RM) {
            playerGroup.rotation.y += spinVel * 8;
            spinVel *= 0.94;
            // vinyl rotation while playing
            const analyserNow = window.__deckAudio?.getAnalyser?.();
            const isPlaying = window.__deckAudio?.isPlaying?.() || false;
            discSpin += isPlaying ? dt * 2.2 : (discSpin % (Math.PI * 2)) > 0.01 ? -Math.min(dt * 3, discSpin % (Math.PI * 2)) : 0;
            disc.rotation.y = discSpin;
            armPivot.rotation.y += (((isPlaying ? 0.12 : -0.55)) - armPivot.rotation.y) * 0.08;

            // spectrum
            let rms = 0;
            if (analyserNow && isPlaying) {
                analyserNow.getByteFrequencyData(freqData);
            }
            for (let i = 0; i < BAR_COUNT; i++) {
                const bin = Math.floor(Math.pow(i / BAR_COUNT, 1.6) * 100) + 1;
                const v = isPlaying && analyserNow ? freqData[bin] / 255 : 0;
                barHeights[i] += ((0.05 + v * 1.5) - barHeights[i]) * 0.25;
                rms += v;
                dummy.position.set(
                    Math.cos((i / BAR_COUNT) * Math.PI * 2) * 3.1,
                    0,
                    Math.sin((i / BAR_COUNT) * Math.PI * 2) * 3.1
                );
                dummy.rotation.y = -(i / BAR_COUNT) * Math.PI * 2;
                dummy.scale.set(1, Math.max(barHeights[i], .02), 1);
                dummy.updateMatrix();
                bars.setMatrixAt(i, dummy.matrix);
            }
            bars.instanceMatrix.needsUpdate = true;
            const rmsAvg = rms / BAR_COUNT;
            deckLight.intensity = deckBaseIntensity * deckVisT * (0.5 + rmsAvg * 2.4);

            // gentle idle bob for the whole deck
            playerGroup.position.y = -0.5 + Math.sin(t * .7) * .12;
        } else {
            playerMats.forEach((m) => { m.opacity = m.userData.baseO; });
            pbasic.forEach((m) => { m.opacity = m.userData.baseOp; });
            deckLight.intensity = deckBaseIntensity;
        }
    }

    /* camera choreography */
    if (!RM) {
        camera.position.lerp(
            new THREE.Vector3(
                camTarget.x + parallax.x,
                camTarget.y + parallax.y,
                camTarget.z
            ),
            0.035
        );
        lookAtVec.lerp(lookTarget, 0.035);
        parallax.x += ((ndc.x * 0.8) - parallax.x) * 0.04;
        parallax.y += ((ndc.y * 0.8) - parallax.y) * 0.04;
    } else {
        camera.position.copy(camTarget);
        lookAtVec.copy(lookTarget);
    }
    camera.lookAt(lookAtVec);

    composer.render();
}
animate();
