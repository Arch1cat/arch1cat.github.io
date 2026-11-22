/* ============================================================================
   ARCH1CAT HYDRA-V6 — scenes/world-chapters.js
   Surrounding FXScroll Worlds (Scroll Up / Down from /work):
   - home (Refractive A1C Monogram + Columns + Volumetric God-Rays + Vortex)
   - about (ARCHITECTURAL DIGITAL EXPERIENCES + Iridescent Torus Knot)
   - tree (Cyber-Organic Subterranean Neural Tree + Glowing Cables + Water)
   - lab (Brutalist CleanRoom Monolith + // THE LAB -> Portal)
   - footer (Descending Vortex Finale + Inverted Emblem)
   ============================================================================ */

import * as THREE from 'three';
import { bus } from '../core/state-bus.js';
import { UI_I18N } from '../data/ui-i18n.js';
import { SPINE_VERT, SPINE_FRAG } from '../shaders/work-shaders.js';

function makeBillboardTexture(drawFn, w = 1024, h = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  drawFn(canvas.getContext('2d'), w, h);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return { canvas, tex };
}

export class WorldChaptersController {
  constructor(renderer, sharedTextures) {
    this.renderer = renderer;
    this.sharedTextures = sharedTextures;
    this.camera = new THREE.PerspectiveCamera(42, window.innerWidth / Math.max(1, window.innerHeight), 0.2, 90);

    this.iridMat = new THREE.ShaderMaterial({
      vertexShader: SPINE_VERT,
      fragmentShader: SPINE_FRAG,
      uniforms: {
        tMatcap: { value: sharedTextures.oilMatcap },
        tNormal: { value: sharedTextures.roadNormal },
        uTime: { value: 0 },
        uTint: { value: new THREE.Vector3(1.05, 1.12, 1.25) }
      }
    });

    this.scenes = {
      home: this.buildHomeScene(),
      about: this.buildAboutScene(),
      tree: this.buildTreeScene(),
      lab: this.buildLabScene(),
      footer: this.buildFooterScene()
    };

    bus.on('ui/lang', (lang) => this.refreshCopy(lang || 'en'));
  }

  makeVortexPoints(count = 4500, radiusMax = 9, heightSpan = 10, colorHex = '#48cae4') {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const a = t * 44.0 + Math.random() * 0.8;
      const r = 0.8 + Math.pow(t, 0.75) * radiusMax;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = (t - 0.5) * heightSpan;
      pos[i * 3 + 2] = Math.sin(a) * r;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color: new THREE.Color(colorHex),
      size: 0.065,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    return new THREE.Points(geo, mat);
  }

  buildHomeScene() {
    const scene = new THREE.Scene();
    const emblem = new THREE.Group();
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.45, 0.08, 16, 64), this.iridMat);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.06, 16, 56), this.iridMat);
    ring2.rotation.x = Math.PI * 0.35;
    const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.68, 1), this.iridMat);
    emblem.add(ring1, ring2, core);
    scene.add(emblem);

    for (const side of [-1, 1]) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 11, 20), this.iridMat);
      col.position.set(side * 3.8, 0, -2.2);
      scene.add(col);
    }

    const rayMat = new THREE.MeshBasicMaterial({
      color: 0x1a4f6e,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const rayCone = new THREE.Mesh(new THREE.ConeGeometry(5.5, 12, 24, 1, true), rayMat);
    rayCone.position.set(0, 2.2, -3.5);
    scene.add(rayCone);

    const vortex = this.makeVortexPoints(5000, 8.5, 11, '#56cfe1');
    scene.add(vortex);

    const { tex } = makeBillboardTexture((ctx, w, h) => {
      ctx.fillStyle = '#ffffff';
      ctx.font = '700 62px "Space Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('ARCH1CAT', w * 0.5, 220);
      ctx.font = '500 22px "Space Mono", monospace';
      ctx.fillStyle = 'rgba(140, 220, 255, 0.8)';
      ctx.fillText('SCROLL DOWN TO /WORK  ↓', w * 0.5, 290);
    });
    const label = new THREE.Mesh(
      new THREE.PlaneGeometry(5.2, 2.6),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    label.position.set(0, -1.95, 1.2);
    scene.add(label);

    scene.userData = { emblem, vortex };
    return scene;
  }

  buildAboutScene() {
    const scene = new THREE.Scene();
    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.35, 0.28, 128, 24), this.iridMat);
    knot.position.set(2.35, 0.1, -1.2);
    scene.add(knot);

    this.aboutBoard = makeBillboardTexture((ctx, w, h) => this.drawAboutCopy(ctx, w, h, 'en'), 1024, 640);
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(6.4, 4.0),
      new THREE.MeshBasicMaterial({ map: this.aboutBoard.tex, transparent: true, depthWrite: false })
    );
    plane.position.set(-1.1, 0.1, 0.5);
    scene.add(plane);
    scene.userData = { knot };
    return scene;
  }

  drawAboutCopy(ctx, w, h, lang) {
    const d = UI_I18N[lang] || UI_I18N.en;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 58px "Space Mono", monospace';
    d.aboutHead.split('\n').forEach((ln, i) => ctx.fillText(ln, 64, 130 + i * 70));

    ctx.fillStyle = '#5ec4e8';
    ctx.fillRect(64, 315, 160, 3);

    ctx.fillStyle = 'rgba(210, 224, 242, 0.88)';
    ctx.font = '400 24px "Space Mono", monospace';
    const words = d.aboutCopy.split(' ');
    let line = '';
    let y = 374;
    for (const word of words) {
      if ((line + word).length > 48) {
        ctx.fillText(line, 64, y);
        line = `${word} `;
        y += 38;
      } else {
        line += `${word} `;
      }
    }
    if (line) ctx.fillText(line, 64, y);
  }

  buildTreeScene() {
    const scene = new THREE.Scene();
    const treeGroup = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.65, 5.2, 16), this.iridMat);
    trunk.position.y = -0.4;
    treeGroup.add(trunk);

    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      const br = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.14, 3.2, 10), this.iridMat);
      br.position.set(Math.cos(a) * 1.1, 1.5 + (i % 3) * 0.35, Math.sin(a) * 1.1);
      br.rotation.set(Math.sin(a) * 0.65, 0, -Math.cos(a) * 0.65);
      treeGroup.add(br);
    }
    scene.add(treeGroup);

    const canopy = this.makeVortexPoints(5500, 4.6, 3.2, '#3be8b0');
    canopy.position.y = 2.2;
    scene.add(canopy);

    const water = new THREE.Mesh(
      new THREE.CircleGeometry(14, 48),
      new THREE.MeshBasicMaterial({ color: 0x071923, transparent: true, opacity: 0.85 })
    );
    water.rotation.x = -Math.PI * 0.5;
    water.position.y = -3.0;
    scene.add(water);
    scene.userData = { treeGroup, canopy };
    return scene;
  }

  buildLabScene() {
    const scene = new THREE.Scene();
    const monolith = new THREE.Mesh(new THREE.BoxGeometry(2.4, 4.2, 0.35), this.iridMat);
    scene.add(monolith);

    this.labBoard = makeBillboardTexture((ctx, w, h) => this.drawLabCopy(ctx, w, h, 'en'), 1024, 512);
    const label = new THREE.Mesh(
      new THREE.PlaneGeometry(6.6, 3.3),
      new THREE.MeshBasicMaterial({ map: this.labBoard.tex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    label.position.set(0, -0.1, 0.85);
    scene.add(label);
    scene.userData = { monolith };
    return scene;
  }

  drawLabCopy(ctx, w, h, lang) {
    const d = UI_I18N[lang] || UI_I18N.en;
    ctx.clearRect(0, 0, w, h);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#3df5ff';
    ctx.font = '700 64px "Space Mono", monospace';
    ctx.fillText(d.labHead, w * 0.5, 220);
    ctx.fillStyle = 'rgba(225, 238, 255, 0.85)';
    ctx.font = '500 21px "Space Mono", monospace';
    ctx.fillText(d.labCopy, w * 0.5, 290);
  }

  buildFooterScene() {
    const scene = new THREE.Scene();
    const funnel = this.makeVortexPoints(5200, 7.5, 10, '#8b5cf6');
    const gem = new THREE.Mesh(new THREE.IcosahedronGeometry(1.15, 1), this.iridMat);
    scene.add(funnel, gem);
    scene.userData = { funnel, gem };
    return scene;
  }

  refreshCopy(lang) {
    this.drawAboutCopy(this.aboutBoard.canvas.getContext('2d'), 1024, 640, lang);
    this.aboutBoard.tex.needsUpdate = true;
    this.drawLabCopy(this.labBoard.canvas.getContext('2d'), 1024, 512, lang);
    this.labBoard.tex.needsUpdate = true;
  }

  onResize(w, h) {
    this.camera.aspect = w / Math.max(1, h);
    this.camera.updateProjectionMatrix();
  }

  renderChapter(id, targetRT, localProgress, timeSec) {
    const scene = this.scenes[id] || this.scenes.home;
    this.iridMat.uniforms.uTime.value = timeSec;

    if (id === 'home') {
      scene.userData.emblem.rotation.y = timeSec * 0.45 + localProgress * 2.5;
      scene.userData.emblem.rotation.x = Math.sin(timeSec * 0.3) * 0.25;
      scene.userData.vortex.rotation.y = -timeSec * 0.12 - localProgress * 1.6;
      this.camera.position.set(0, 1.4 - localProgress * 2.8, 8.8 - localProgress * 2.4);
      this.camera.lookAt(0, -0.2, 0);
    } else if (id === 'about') {
      scene.userData.knot.rotation.set(timeSec * 0.35, timeSec * 0.5, 0);
      this.camera.position.set(0, 0.4 - localProgress * 0.8, 7.8);
      this.camera.lookAt(0, 0, 0);
    } else if (id === 'tree') {
      scene.userData.treeGroup.rotation.y = timeSec * 0.15 + localProgress * 1.2;
      scene.userData.canopy.rotation.y = -timeSec * 0.18;
      this.camera.position.set(Math.sin(localProgress * 1.2) * 1.8, 1.2 - localProgress * 1.6, 8.6 - localProgress * 1.5);
      this.camera.lookAt(0, 0.4, 0);
    } else if (id === 'lab') {
      scene.userData.monolith.rotation.y = Math.sin(timeSec * 0.5) * 0.28;
      this.camera.position.set(0, 0.2 - localProgress * 0.4, 7.2 - localProgress * 1.1);
      this.camera.lookAt(0, 0, 0);
    } else {
      scene.userData.gem.rotation.set(timeSec * 0.4, -timeSec * 0.6, 0);
      scene.userData.funnel.rotation.y = timeSec * 0.25 + localProgress * 2.2;
      this.camera.position.set(0, 2.5 - localProgress * 4.2, 8.2 - localProgress * 2.0);
      this.camera.lookAt(0, 0, 0);
    }

    this.renderer.setRenderTarget(targetRT);
    this.renderer.setClearColor(0x020307, 1);
    this.renderer.clear(true, true, false);
    this.renderer.render(scene, this.camera);
  }
}
