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
const MOBILE = window.innerWidth < 768;
const COARSE = window.matchMedia('(pointer: coarse)').matches;

const INK = 0x0B0B0C;
const BONE = 0xF4F1EB;
const EMBER = 0xFF4D00;

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
const bloomPass = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.45, 0.8, 0.8);
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
setTimeout(startMaterialize, RM ? 50 : 2200);

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

    /* fog tint per chapter */
    const warmFog = new THREE.Color(0x100c0a);
    const coldFog = new THREE.Color(INK);
    const targetFog = currentChapter === 'flagship' ? warmFog : coldFog;
    scene.fog.color.lerp(targetFog, 0.04);

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

    renderer.render(scene, camera);
    composer.render();
}
animate();
