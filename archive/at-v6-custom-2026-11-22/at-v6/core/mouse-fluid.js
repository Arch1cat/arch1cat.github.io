/* ============================================================================
   ARCH1CAT HYDRA-V6 — core/mouse-fluid.js
   2D GPU Ping-Pong Fluid Velocity & Frost-Wipe Mask Solver (Port of MouseFluid)
   Safe across Hardware WebGL2 + Software/Mobile Renderers (RGBA8 / HalfFloat)
   ============================================================================ */

import * as THREE from 'three';
import { clamp, rangeMap } from './state-bus.js';

const BASE_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const ADVECT_SPLAT_VEL_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D tPrevVel;
uniform vec2 uTexel;
uniform vec2 uPointer;
uniform vec2 uDelta;
uniform float uRadius;
uniform float uAspect;
uniform float uHasSplat;

void main() {
  vec2 prev = texture2D(tPrevVel, vUv).xy * 2.0 - 1.0;
  vec2 backUv = clamp(vUv - prev * uTexel * 3.5, 0.002, 0.998);
  vec2 v = (texture2D(tPrevVel, backUv).xy * 2.0 - 1.0) * 0.972;

  // Curl-like rotational swirl from neighbor gradients
  vec2 n = texture2D(tPrevVel, vUv + vec2(0.0, uTexel.y)).xy * 2.0 - 1.0;
  vec2 s = texture2D(tPrevVel, vUv - vec2(0.0, uTexel.y)).xy * 2.0 - 1.0;
  vec2 e = texture2D(tPrevVel, vUv + vec2(uTexel.x, 0.0)).xy * 2.0 - 1.0;
  vec2 w = texture2D(tPrevVel, vUv - vec2(uTexel.x, 0.0)).xy * 2.0 - 1.0;
  float curl = (n.x - s.x) - (e.y - w.y);
  v += vec2(-curl, curl) * 0.06;

  if (uHasSplat > 0.5) {
    vec2 diff = vUv - uPointer;
    diff.x *= uAspect;
    float falloff = exp(-dot(diff, diff) / max(0.0002, uRadius * uRadius));
    v += uDelta * falloff * 1.45;
  }

  v = clamp(v, vec2(-1.0), vec2(1.0));
  gl_FragColor = vec4(v * 0.5 + 0.5, 0.0, 1.0);
}
`;

const DYE_MASK_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D tPrevDye;
uniform sampler2D tVel;
uniform vec2 uTexel;
uniform vec2 uPointer;
uniform float uRadius;
uniform float uAspect;
uniform float uHasSplat;

void main() {
  vec2 vel = texture2D(tVel, vUv).xy * 2.0 - 1.0;
  vec2 backUv = clamp(vUv - vel * uTexel * 4.0, 0.002, 0.998);
  float mask = texture2D(tPrevDye, backUv).r * 0.962;

  if (uHasSplat > 0.5) {
    vec2 diff = vUv - uPointer;
    diff.x *= uAspect;
    float falloff = exp(-dot(diff, diff) / max(0.00025, uRadius * uRadius * 1.35));
    mask = clamp(mask + falloff * 0.85, 0.0, 1.0);
  }

  gl_FragColor = vec4(mask, abs(vel.x), abs(vel.y), 1.0);
}
`;

function makeRT(size, clearByte = 128) {
  const data = new Uint8Array(size * size * 4);
  for (let i = 0; i < data.length; i += 4) {
    data[i] = clearByte;
    data[i + 1] = clearByte;
    data[i + 2] = 0;
    data[i + 3] = 255;
  }
  const rt = new THREE.WebGLRenderTarget(size, size, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
    type: THREE.UnsignedByteType,
    depthBuffer: false,
    stencilBuffer: false
  });
  const initTex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  initTex.needsUpdate = true;
  return { rt, initTex };
}

export class MouseFluidSolver {
  constructor(renderer) {
    this.renderer = renderer;
    this.simSize = 160;
    this.dyeSize = 256;

    this.velA = makeRT(this.simSize, 128);
    this.velB = makeRT(this.simSize, 128);
    this.dyeA = makeRT(this.dyeSize, 0);
    this.dyeB = makeRT(this.dyeSize, 0);
    this.seeded = false;

    this.pointer = new THREE.Vector2(0.5, 0.5);
    this.lastPointer = new THREE.Vector2(0.5, 0.5);
    this.hasMoved = false;

    this.orthoCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.quadGeo = new THREE.PlaneGeometry(2, 2);

    this.velMat = new THREE.ShaderMaterial({
      vertexShader: BASE_VERT,
      fragmentShader: ADVECT_SPLAT_VEL_FRAG,
      uniforms: {
        tPrevVel: { value: this.velA.initTex },
        uTexel: { value: new THREE.Vector2(1 / this.simSize, 1 / this.simSize) },
        uPointer: { value: new THREE.Vector2(0.5, 0.5) },
        uDelta: { value: new THREE.Vector2(0, 0) },
        uRadius: { value: 0.045 },
        uAspect: { value: window.innerWidth / Math.max(1, window.innerHeight) },
        uHasSplat: { value: 0 }
      },
      depthTest: false,
      depthWrite: false
    });

    this.dyeMat = new THREE.ShaderMaterial({
      vertexShader: BASE_VERT,
      fragmentShader: DYE_MASK_FRAG,
      uniforms: {
        tPrevDye: { value: this.dyeA.initTex },
        tVel: { value: this.velA.rt.texture },
        uTexel: { value: new THREE.Vector2(1 / this.dyeSize, 1 / this.dyeSize) },
        uPointer: { value: new THREE.Vector2(0.5, 0.5) },
        uRadius: { value: 0.055 },
        uAspect: { value: window.innerWidth / Math.max(1, window.innerHeight) },
        uHasSplat: { value: 0 }
      },
      depthTest: false,
      depthWrite: false
    });

    this.quad = new THREE.Mesh(this.quadGeo, this.velMat);
    this.scene = new THREE.Scene();
    this.scene.add(this.quad);
  }

  onPointerMove(normX, normY) {
    this.pointer.set(clamp(normX, 0, 1), clamp(1 - normY, 0, 1));
    if (!this.hasMoved) {
      this.lastPointer.copy(this.pointer);
      this.hasMoved = true;
    }
  }

  onResize(w, h) {
    const aspect = w / Math.max(1, h);
    this.velMat.uniforms.uAspect.value = aspect;
    this.dyeMat.uniforms.uAspect.value = aspect;
  }

  update() {
    const dx = this.pointer.x - this.lastPointer.x;
    const dy = this.pointer.y - this.lastPointer.y;
    const dist = Math.hypot(dx, dy);
    const hasSplat = dist > 0.0006 ? 1 : 0;
    const radius = rangeMap(dist, 0, 0.06, 0.032, 0.085, true);

    this.velMat.uniforms.tPrevVel.value = this.seeded ? this.velA.rt.texture : this.velA.initTex;
    this.velMat.uniforms.uPointer.value.copy(this.pointer);
    this.velMat.uniforms.uDelta.value.set(clamp(dx * 16, -1, 1), clamp(dy * 16, -1, 1));
    this.velMat.uniforms.uRadius.value = radius;
    this.velMat.uniforms.uHasSplat.value = hasSplat;

    this.quad.material = this.velMat;
    this.renderer.setRenderTarget(this.velB.rt);
    this.renderer.render(this.scene, this.orthoCam);
    [this.velA, this.velB] = [this.velB, this.velA];

    this.dyeMat.uniforms.tPrevDye.value = this.seeded ? this.dyeA.rt.texture : this.dyeA.initTex;
    this.dyeMat.uniforms.tVel.value = this.velA.rt.texture;
    this.dyeMat.uniforms.uPointer.value.copy(this.pointer);
    this.dyeMat.uniforms.uRadius.value = radius * 1.15;
    this.dyeMat.uniforms.uHasSplat.value = hasSplat;

    this.quad.material = this.dyeMat;
    this.renderer.setRenderTarget(this.dyeB.rt);
    this.renderer.render(this.scene, this.orthoCam);
    [this.dyeA, this.dyeB] = [this.dyeB, this.dyeA];

    this.renderer.setRenderTarget(null);
    this.lastPointer.copy(this.pointer);
    this.seeded = true;
  }

  get velocityTexture() {
    return this.velA.rt.texture;
  }

  get maskTexture() {
    return this.dyeA.rt.texture;
  }
}
