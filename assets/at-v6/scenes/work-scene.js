/* ============================================================================
   ARCH1CAT HYDRA-V6 — scenes/work-scene.js
   Core /work 3D World:
   - 40-Vertebra Anatomical SpineInstancer (Oil-Slick Iridescent Bone)
   - 80-Link Helical ChainInstancer (Electric Cobalt Conduit)
   - 36,000 Double-Helix & Planetary Bokeh Particles (FlowerParticleShader)
   - Two-Pass WorkRefraction FBO + WorkItemsHelix + CursorTubeTrails
   ============================================================================ */

import * as THREE from 'three';
import { bus, tween } from '../core/state-bus.js';
import { buildVertebraGeometry, buildChainLinkGeometry } from '../geometries/bio-geometries.js';
import { CursorTubeTrails } from '../geometries/tube-trails.js';
import {
  SPINE_VERT,
  SPINE_FRAG,
  CHAIN_VERT,
  CHAIN_FRAG,
  FLOWER_PARTICLE_VERT,
  FLOWER_PARTICLE_FRAG
} from '../shaders/work-shaders.js';
import { WorkItemsHelix } from './work-items-helix.js';

export class WorkSceneController {
  constructor(renderer, sharedTextures, fluidSolver) {
    this.renderer = renderer;
    this.sharedTextures = sharedTextures;
    this.fluidSolver = fluidSolver;

    this.scene = new THREE.Scene();
    const isMobile = window.innerWidth < 768 && window.innerHeight > window.innerWidth;
    this.camera = new THREE.PerspectiveCamera(isMobile ? 54 : 35, window.innerWidth / Math.max(1, window.innerHeight), 0.2, 85);
    this.camera.position.set(8.75, 1.9, 0);
    this.camera.lookAt(0, 1.75, 0.42);

    this.refractionRT = new THREE.WebGLRenderTarget(
      Math.max(2, Math.floor(window.innerWidth * 0.75)),
      Math.max(2, Math.floor(window.innerHeight * 0.75)),
      { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat }
    );

    this.coreGroup = new THREE.Group();
    this.scene.add(this.coreGroup);

    this.buildSpine();
    this.buildChain();
    this.buildFlowerParticles();

    this.trails = new CursorTubeTrails();
    this.scene.add(this.trails.points);

    this.helix = new WorkItemsHelix(sharedTextures, this.refractionRT);
    this.scene.add(this.helix.group);

    this.flowerAnim = { rotate: 0 };
    bus.listen('work/helixRebuilt', () => {
      const sp = bus.get('work/scrollProgress', 0.06);
      const nextRot = this.flowerAnim.rotate + (0.6 + sp * 1.4) * Math.PI * 2;
      tween(this.flowerAnim, { rotate: nextRot }, 950, 'workInOut', 0, () => {
        this.particleMat.uniforms.uRotate.value = this.flowerAnim.rotate;
      });
    });
  }

  buildSpine() {
    const count = 44;
    const geo = buildVertebraGeometry();
    this.spineMat = new THREE.ShaderMaterial({
      vertexShader: SPINE_VERT,
      fragmentShader: SPINE_FRAG,
      uniforms: {
        tMatcap: { value: this.sharedTextures.oilMatcap },
        tNormal: { value: this.sharedTextures.roadNormal },
        uTime: { value: 0 },
        uTint: { value: new THREE.Vector3(1.0, 1.04, 1.12) }
      }
    });

    this.spineMesh = new THREE.InstancedMesh(geo, this.spineMat, count);
    const dummy = new THREE.Object3D();
    for (let i = 0; i < count; i++) {
      dummy.position.set(0, 5.2 - i * 0.62, 0);
      dummy.rotation.set(Math.sin(i * 0.25) * 0.06, i * 0.38, Math.cos(i * 0.2) * 0.05);
      const sc = 1.05 - Math.abs(i - 16) * 0.006;
      dummy.scale.setScalar(Math.max(0.76, sc));
      dummy.updateMatrix();
      this.spineMesh.setMatrixAt(i, dummy.matrix);
    }
    this.spineMesh.instanceMatrix.needsUpdate = true;
    this.spineMesh.frustumCulled = false;
    this.coreGroup.add(this.spineMesh);
  }

  buildChain() {
    const count = 88;
    const geo = buildChainLinkGeometry();
    this.chainMat = new THREE.ShaderMaterial({
      vertexShader: CHAIN_VERT,
      fragmentShader: CHAIN_FRAG,
      uniforms: {
        tMatcap: { value: this.sharedTextures.oilMatcap },
        uTime: { value: 0 },
        uScroll: { value: 0 }
      }
    });

    this.chainMesh = new THREE.InstancedMesh(geo, this.chainMat, count);
    this.chainDummy = new THREE.Object3D();
    this.updateChainMatrices(0);
    this.chainMesh.frustumCulled = false;
    this.coreGroup.add(this.chainMesh);
  }

  updateChainMatrices(scrollProgress) {
    const rotOffset = scrollProgress * Math.PI * 8;
    for (let i = 0; i < this.chainMesh.count; i++) {
      this.chainDummy.position.set(0.35, 5.4 - i * 0.22, -0.15);
      this.chainDummy.rotation.set(0.12, (Math.PI * 0.5) * i - rotOffset, 0.08);
      this.chainDummy.scale.setScalar(1.0);
      this.chainDummy.updateMatrix();
      this.chainMesh.setMatrixAt(i, this.chainDummy.matrix);
    }
    this.chainMesh.instanceMatrix.needsUpdate = true;
  }

  buildFlowerParticles() {
    const isMobile = window.innerWidth < 768;
    const isSoft = bus.get('gpu/software', false);
    const count = isSoft ? 8500 : (isMobile ? 14000 : 28000);
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    const colors = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#f7dfba'), // champagne gold bokeh
      new THREE.Color('#f28db8'), // soft rose-coral bokeh
      new THREE.Color('#8e9aff'), // luminous periwinkle
      new THREE.Color('#a855f7'), // electric violet
      new THREE.Color('#48e5ff')  // ice cyan
    ];

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const strand = i % 2 === 0 ? 0 : Math.PI;
      const y = 5.8 - t * 23.5 + (Math.random() - 0.5) * 0.7;
      const r = 0.55 + Math.pow(Math.random(), 1.6) * 2.35;
      const ang = y * 0.95 + strand + (Math.random() - 0.5) * 0.85;

      positions[i * 3] = Math.cos(ang) * r;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(ang) * r;

      randoms[i * 4] = Math.random();
      randoms[i * 4 + 1] = Math.random();
      randoms[i * 4 + 2] = Math.random();
      randoms[i * 4 + 3] = Math.random();

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 4));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));

    this.particleMat = new THREE.ShaderMaterial({
      vertexShader: FLOWER_PARTICLE_VERT,
      fragmentShader: FLOWER_PARTICLE_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uRotate: { value: 0 },
        uDPR: { value: Math.min(window.devicePixelRatio || 1, 2) },
        uSizeBias: { value: isMobile ? 0.85 : 1.0 },
        tFluid: { value: this.fluidSolver.velocityTexture },
        tBokeh: { value: this.sharedTextures.bokehMatcap }
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(geo, this.particleMat);
    this.particles.frustumCulled = false;
    this.coreGroup.add(this.particles);
  }

  onPointerMove(normX, normY, timeSec) {
    this.helix.onPointerMove(normX, normY);
    if (bus.get('router/chapter') === 'work' && !bus.get('work/project')) {
      this.trails.emitAtCursor(normX, normY, this.camera, timeSec);
    }
  }

  onClick() {
    return this.helix.onClick();
  }

  onResize(w, h, dpr) {
    const isPortraitMobile = w < 768 && h > w;
    this.camera.fov = isPortraitMobile ? 54 : 35;
    this.camera.aspect = w / Math.max(1, h);
    this.camera.updateProjectionMatrix();
    this.refractionRT.setSize(Math.max(2, Math.floor(w * 0.75)), Math.max(2, Math.floor(h * 0.75)));
    this.particleMat.uniforms.uDPR.value = dpr;
    this.helix.onResize(w, h, dpr);
  }

  renderToTarget(targetRT, scrollProgress, timeSec, dtSec) {
    this.spineMat.uniforms.uTime.value = timeSec;
    this.chainMat.uniforms.uTime.value = timeSec;
    this.chainMat.uniforms.uScroll.value = scrollProgress * 0.45;
    this.updateChainMatrices(scrollProgress);

    this.particleMat.uniforms.uTime.value = timeSec;
    this.particleMat.uniforms.uScroll.value = scrollProgress;
    this.particleMat.uniforms.tFluid.value = this.fluidSolver.velocityTexture;

    this.trails.update(dtSec);
    this.helix.updateCameraAndItems(this.camera, scrollProgress, timeSec, dtSec);

    // Pass 1: Background Spine + Chain + Particles into WorkRefraction FBO
    this.helix.group.visible = false;
    this.renderer.setRenderTarget(this.refractionRT);
    this.renderer.setClearColor(0x020306, 1);
    this.renderer.clear(true, true, false);
    this.renderer.render(this.scene, this.camera);

    // Pass 2: Full /work scene with Frosted Glass Refraction slabs into targetRT
    this.helix.group.visible = true;
    this.renderer.setRenderTarget(targetRT);
    this.renderer.setClearColor(0x010204, 1);
    this.renderer.clear(true, true, false);
    this.renderer.render(this.scene, this.camera);
  }
}
