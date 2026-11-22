/* ============================================================================
   ARCH1CAT HYDRA-V6 — scenes/work-detail-scene.js
   WorkDetail 3D Refractive Glass Chamber + Project-Colored Bokeh Particle Stream
   + Center Floating Interactive Showcase Plane (MouseFluid Frost-Wipe)
   ============================================================================ */

import * as THREE from 'three';
import { bus, fpsLerpAlpha } from '../core/state-bus.js';
import { GLSL_COMMON } from '../shaders/glsl-chunks.js';
import {
  WORK_DETAIL_CUBE_VERT,
  WORK_DETAIL_CUBE_FRAG,
  WORK_DETAIL_PARTICLE_VERT,
  WORK_DETAIL_PARTICLE_FRAG
} from '../shaders/detail-and-global-shaders.js';

const PREVIEW_PLANE_VERT = /* glsl */ `
varying vec2 vUv;
uniform sampler2D tFluid;
uniform float uTime;

void main() {
  vUv = uv;
  vec3 pos = position;
  vec2 flow = texture2D(tFluid, uv).xy * 2.0 - 1.0;
  pos.z += sin(uTime * 1.4 + uv.x * 4.0) * 0.04 + length(flow) * 0.14;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const PREVIEW_PLANE_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D tPreview;
uniform sampler2D tFluid;
uniform vec3 uColor;
uniform float uTime;
${GLSL_COMMON}

void main() {
  vec2 flow = texture2D(tFluid, vUv).xy * 2.0 - 1.0;
  vec2 uv = clamp(vUv - flow * 0.018, 0.004, 0.996);
  vec3 col = getRGB(tPreview, uv, 0.0, length(flow) * 0.006 + 0.0008).rgb;

  float border = smoothstep(0.478, 0.498, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
  col = mix(col, uColor * 1.35 + vec3(0.25), border * 0.85);

  float vig = smoothstep(0.85, 0.25, length(vUv - 0.5));
  col *= mix(0.75, 1.08, vig);
  gl_FragColor = vec4(col, 0.98);
}
`;

export class WorkDetailSceneController {
  constructor(renderer, sharedTextures, fluidSolver, workScene) {
    this.renderer = renderer;
    this.sharedTextures = sharedTextures;
    this.fluidSolver = fluidSolver;
    this.workScene = workScene;

    this.particleScene = new THREE.Scene();
    this.mainScene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(42, window.innerWidth / Math.max(1, window.innerHeight), 0.2, 60);
    this.camera.position.set(0, 0, 7.2);

    this.particlesRT = new THREE.WebGLRenderTarget(
      Math.max(2, Math.floor(window.innerWidth * 0.65)),
      Math.max(2, Math.floor(window.innerHeight * 0.65)),
      { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat }
    );

    this.resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
    this.pointer = new THREE.Vector2(0, 0);
    this.activeProject = null;

    this.buildParticles();
    this.buildGlassChamber();
    this.buildCenterShowcase();

    bus.on('work/project', (proj) => {
      if (proj) this.attachProject(proj);
    });
  }

  buildParticles() {
    const isSoft = bus.get('gpu/software', false);
    const count = isSoft ? 4500 : (window.innerWidth < 768 ? 8000 : 14000);
    const positions = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 4);
    for (let i = 0; i < count; i++) {
      randoms[i * 4] = Math.random();
      randoms[i * 4 + 1] = Math.random();
      randoms[i * 4 + 2] = Math.random();
      randoms[i * 4 + 3] = Math.random();
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 4));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 100);

    this.particleMat = new THREE.ShaderMaterial({
      vertexShader: WORK_DETAIL_PARTICLE_VERT,
      fragmentShader: WORK_DETAIL_PARTICLE_FRAG,
      uniforms: {
        uTime: { value: 0 },
        uDPR: { value: Math.min(window.devicePixelRatio || 1, 2) },
        tPreview: { value: this.sharedTextures.oilMatcap },
        tBokeh: { value: this.sharedTextures.bokehMatcap },
        uColor: { value: new THREE.Color('#00f2fe') }
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const pts = new THREE.Points(geo, this.particleMat);
    pts.frustumCulled = false;
    this.particleScene.add(pts);
  }

  buildGlassChamber() {
    const boxGeo = new THREE.BoxGeometry(18, 11, 18);
    this.cubeMat = new THREE.ShaderMaterial({
      vertexShader: WORK_DETAIL_CUBE_VERT,
      fragmentShader: WORK_DETAIL_CUBE_FRAG,
      uniforms: {
        tParticles: { value: this.particlesRT.texture },
        tNormal: { value: this.sharedTextures.woodNormal },
        tFluid: { value: this.fluidSolver.velocityTexture },
        tFluidMask: { value: this.fluidSolver.maskTexture },
        uColor: { value: new THREE.Color('#00f2fe') },
        uResolution: { value: this.resolution },
        uTime: { value: 0 }
      },
      side: THREE.BackSide,
      depthWrite: false
    });
    this.cubeMesh = new THREE.Mesh(boxGeo, this.cubeMat);
    this.mainScene.add(this.cubeMesh);
  }

  buildCenterShowcase() {
    const geo = new THREE.PlaneGeometry(4.9, 3.05, 28, 18);
    this.showcaseMat = new THREE.ShaderMaterial({
      vertexShader: PREVIEW_PLANE_VERT,
      fragmentShader: PREVIEW_PLANE_FRAG,
      uniforms: {
        tPreview: { value: this.sharedTextures.oilMatcap },
        tFluid: { value: this.fluidSolver.velocityTexture },
        uColor: { value: new THREE.Color('#00f2fe') },
        uTime: { value: 0 }
      },
      transparent: true
    });
    this.showcaseMesh = new THREE.Mesh(geo, this.showcaseMat);
    this.showcaseMesh.position.set(0.85, 0.12, 0.0);
    this.mainScene.add(this.showcaseMesh);
  }

  attachProject(proj) {
    this.activeProject = proj;
    const found = this.workScene.helix.items.find((it) => it.proj.id === proj.id);
    const tex = found ? found.previewTex : this.sharedTextures.oilMatcap;
    const col = new THREE.Color(`#${proj.uiColor || '00f2fe'}`);

    this.particleMat.uniforms.tPreview.value = tex;
    this.particleMat.uniforms.uColor.value.copy(col);
    this.cubeMat.uniforms.uColor.value.copy(col);
    this.showcaseMat.uniforms.tPreview.value = tex;
    this.showcaseMat.uniforms.uColor.value.copy(col);
  }

  onPointerMove(normX, normY) {
    this.pointer.set(normX * 2 - 1, -(normY * 2 - 1));
  }

  onResize(w, h, dpr) {
    const isPortrait = w < 768 && h > w;
    this.camera.fov = isPortrait ? 56 : 42;
    this.camera.aspect = w / Math.max(1, h);
    this.camera.updateProjectionMatrix();
    this.showcaseMesh.position.x = isPortrait ? 0.0 : 0.85;
    this.showcaseMesh.position.y = isPortrait ? 1.05 : 0.12;
    this.showcaseMesh.scale.setScalar(isPortrait ? 0.72 : 1.0);
    this.particlesRT.setSize(Math.max(2, Math.floor(w * 0.65)), Math.max(2, Math.floor(h * 0.65)));
    this.resolution.set(w * dpr, h * dpr);
    this.particleMat.uniforms.uDPR.value = dpr;
  }

  renderToTarget(targetRT, timeSec, dtSec) {
    this.particleMat.uniforms.uTime.value = timeSec;
    this.cubeMat.uniforms.uTime.value = timeSec;
    this.cubeMat.uniforms.tFluid.value = this.fluidSolver.velocityTexture;
    this.cubeMat.uniforms.tFluidMask.value = this.fluidSolver.maskTexture;
    this.showcaseMat.uniforms.uTime.value = timeSec;
    this.showcaseMat.uniforms.tFluid.value = this.fluidSolver.velocityTexture;

    const alpha = fpsLerpAlpha(0.08, dtSec);
    this.showcaseMesh.rotation.y += (this.pointer.x * 0.16 - this.showcaseMesh.rotation.y) * alpha;
    this.showcaseMesh.rotation.x += (-this.pointer.y * 0.11 - this.showcaseMesh.rotation.x) * alpha;

    // Pass 1: Bokeh stream into particlesRT
    this.renderer.setRenderTarget(this.particlesRT);
    this.renderer.setClearColor(0x020308, 1);
    this.renderer.clear(true, true, false);
    this.renderer.render(this.particleScene, this.camera);

    // Pass 2: Frosted glass room + floating preview into targetRT
    this.renderer.setRenderTarget(targetRT);
    this.renderer.setClearColor(0x020308, 1);
    this.renderer.clear(true, true, false);
    this.renderer.render(this.mainScene, this.camera);
  }
}
