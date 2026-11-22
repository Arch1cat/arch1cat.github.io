/* ============================================================================
   ARCH1CAT HYDRA-V6 — geometries/tube-trails.js
   3D Cursor-Projected Iridescent Ribbon/Particle Trail (Port of TubePlayer)
   ============================================================================ */

import * as THREE from 'three';

const TRAIL_COUNT = 56;

const TRAIL_VERT = /* glsl */ `
attribute float aLife;
attribute vec3 aColor;
varying float vLife;
varying vec3 vColor;
uniform float uDPR;

void main() {
  vLife = aLife;
  vColor = aColor;
  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
  float dist = max(1.0, -mvPos.z);
  gl_PointSize = clamp((18.0 * uDPR * sin(aLife * 3.14159)) / dist, 0.0, 26.0);
  gl_Position = projectionMatrix * mvPos;
}
`;

const TRAIL_FRAG = /* glsl */ `
precision highp float;
varying float vLife;
varying vec3 vColor;

void main() {
  if (vLife <= 0.01) discard;
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float glow = smoothstep(0.5, 0.04, d) * sin(vLife * 3.14159);
  gl_FragColor = vec4(vColor * 1.35, glow * 0.72);
}
`;

export class CursorTubeTrails {
  constructor() {
    this.positions = new Float32Array(TRAIL_COUNT * 3);
    this.velocities = new Float32Array(TRAIL_COUNT * 3);
    this.lives = new Float32Array(TRAIL_COUNT);
    this.colors = new Float32Array(TRAIL_COUNT * 3);
    this.head = 0;

    this.geo = new THREE.BufferGeometry();
    this.geo.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geo.setAttribute('aLife', new THREE.BufferAttribute(this.lives, 1));
    this.geo.setAttribute('aColor', new THREE.BufferAttribute(this.colors, 3));
    this.geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 500);

    this.mat = new THREE.ShaderMaterial({
      vertexShader: TRAIL_VERT,
      fragmentShader: TRAIL_FRAG,
      uniforms: {
        uDPR: { value: Math.min(window.devicePixelRatio || 1, 2) }
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: true
    });

    this.points = new THREE.Points(this.geo, this.mat);
    this.points.frustumCulled = false;

    this.lastWorld = new THREE.Vector3();
    this.tmpVec = new THREE.Vector3();
    this.tmpDir = new THREE.Vector3();
    this.tmpColor = new THREE.Color();
    this.initialized = false;
  }

  emitAtCursor(normX, normY, camera, timeSec) {
    const ndcX = normX * 2 - 1;
    const ndcY = -(normY * 2 - 1);
    this.tmpVec.set(ndcX, ndcY, 0.5).unproject(camera);
    this.tmpDir.subVectors(this.tmpVec, camera.position).normalize();
    const worldPos = this.tmpVec.copy(camera.position).addScaledVector(this.tmpDir, 7.2);

    if (!this.initialized) {
      this.lastWorld.copy(worldPos);
      this.initialized = true;
      return;
    }

    const dist = worldPos.distanceTo(this.lastWorld);
    if (dist < 0.08) return;

    const idx = this.head;
    this.head = (this.head + 1) % TRAIL_COUNT;

    this.positions[idx * 3] = worldPos.x;
    this.positions[idx * 3 + 1] = worldPos.y;
    this.positions[idx * 3 + 2] = worldPos.z;

    this.velocities[idx * 3] = (worldPos.x - this.lastWorld.x) * 0.32;
    this.velocities[idx * 3 + 1] = (worldPos.y - this.lastWorld.y) * 0.32 + 0.015;
    this.velocities[idx * 3 + 2] = (worldPos.z - this.lastWorld.z) * 0.32;

    this.lives[idx] = 1.0;
    this.tmpColor.setHSL((timeSec * 0.08 + idx * 0.015) % 1.0, 0.85, 0.65);
    this.colors[idx * 3] = this.tmpColor.r;
    this.colors[idx * 3 + 1] = this.tmpColor.g;
    this.colors[idx * 3 + 2] = this.tmpColor.b;

    this.lastWorld.copy(worldPos);
  }

  update(dtSec) {
    const decay = Math.min(0.1, dtSec) * 1.35;
    for (let i = 0; i < TRAIL_COUNT; i++) {
      if (this.lives[i] <= 0) continue;
      this.lives[i] = Math.max(0, this.lives[i] - decay);
      this.positions[i * 3] += this.velocities[i * 3];
      this.positions[i * 3 + 1] += this.velocities[i * 3 + 1];
      this.positions[i * 3 + 2] += this.velocities[i * 3 + 2];
      this.velocities[i * 3] *= 0.94;
      this.velocities[i * 3 + 1] *= 0.94;
      this.velocities[i * 3 + 2] *= 0.94;
    }
    this.geo.attributes.position.needsUpdate = true;
    this.geo.attributes.aLife.needsUpdate = true;
    this.geo.attributes.aColor.needsUpdate = true;
  }
}
