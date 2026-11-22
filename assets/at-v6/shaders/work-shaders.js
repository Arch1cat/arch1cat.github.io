/* ============================================================================
   ARCH1CAT HYDRA-V6 — shaders/work-shaders.js
   Ported Active Theory V6 Work Scene Shaders:
   - SpineShader (Instanced Oil-Slick Iridescent Bone + Screen Refraction)
   - ChainShader (Instanced Helical Electric-Cobalt Chain Links)
   - FlowerParticleShader (Double-Helix + Planetary Dust + Bokeh Matcap)
   - WorkItemShader (Frosted RadialBlur Glass Slab + Inner Preview + Rim)
   - WorkItemUIShader (Perspective-Locked Emblem/Title + Frustum Slice Glitch)
   ============================================================================ */

import { GLSL_COMMON } from './glsl-chunks.js';

export const SPINE_VERT = /* glsl */ `
varying vec2 vUv;
varying vec3 vNormalView;
varying vec3 vViewDir;
varying vec3 vWorldPos;

void main() {
  vUv = uv;
  #ifdef USE_INSTANCING
    vec4 wp = modelMatrix * instanceMatrix * vec4(position, 1.0);
    mat3 nMat = mat3(modelViewMatrix * instanceMatrix);
  #else
    vec4 wp = modelMatrix * vec4(position, 1.0);
    mat3 nMat = normalMatrix;
  #endif
  vWorldPos = wp.xyz;
  vec4 mvPos = viewMatrix * wp;
  vViewDir = -mvPos.xyz;
  vNormalView = normalize(nMat * normal);
  gl_Position = projectionMatrix * mvPos;
}
`;

export const SPINE_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
varying vec3 vNormalView;
varying vec3 vViewDir;
varying vec3 vWorldPos;

uniform sampler2D tMatcap;
uniform sampler2D tNormal;
uniform float uTime;
uniform vec3 uTint;
${GLSL_COMMON}

void main() {
  vec2 nUv = vUv * 2.8 + vec2(vWorldPos.x * 0.15, vWorldPos.y * 0.12);
  vec3 mapN = texture2D(tNormal, nUv).xyz * 2.0 - 1.0;
  vec3 n = normalize(vNormalView + mapN * 0.34);

  vec3 viewDir = normalize(vViewDir);
  vec3 x = normalize(vec3(viewDir.z, 0.0, -viewDir.x) + vec3(0.0001));
  vec3 y = cross(viewDir, x);
  vec2 mUv = vec2(dot(x, n), dot(y, n)) * 0.49 + 0.5;

  vec3 matcapCol = texture2D(tMatcap, mUv).rgb;
  float fres = getFresnel(n, viewDir, 2.3);
  vec3 irid = rainbowColor(fres * 0.55 + vWorldPos.y * 0.045 - uTime * 0.03);

  vec3 baseObsidian = vec3(0.032, 0.042, 0.068);
  vec3 col = mix(baseObsidian, matcapCol * 0.92, 0.72);
  col += irid * fres * 0.38;
  col *= uTint;

  float depthFade = smoothstep(26.0, 5.0, length(vViewDir));
  gl_FragColor = vec4(clamp(col * mix(0.28, 0.88, depthFade), 0.0, 0.88), 1.0);
}
`;

export const CHAIN_VERT = /* glsl */ `
varying vec2 vUv;
varying vec3 vNormalView;
varying vec3 vViewDir;
varying float vDist;
uniform float uScroll;

void main() {
  vUv = uv;
  vec4 instPos = instanceMatrix * vec4(position, 1.0);
  instPos.y -= 12.0 * uScroll;
  instPos.x -= cos(-instPos.y * 0.42) * 0.85;
  instPos.z -= sin(-instPos.y * 0.42) * 0.85;

  vec4 wp = modelMatrix * instPos;
  vec4 mvPos = viewMatrix * wp;
  vViewDir = -mvPos.xyz;
  vDist = length(mvPos.xyz);
  vNormalView = normalize(mat3(modelViewMatrix * instanceMatrix) * normal);
  gl_Position = projectionMatrix * mvPos;
}
`;

export const CHAIN_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
varying vec3 vNormalView;
varying vec3 vViewDir;
varying float vDist;
uniform sampler2D tMatcap;
uniform float uTime;
${GLSL_COMMON}

void main() {
  vec3 n = normalize(vNormalView);
  vec3 vd = normalize(vViewDir);
  vec3 x = normalize(vec3(vd.z, 0.0, -vd.x) + vec3(0.0001));
  vec3 y = cross(vd, x);
  vec2 mUv = vec2(dot(x, n), dot(y, n)) * 0.49 + 0.5;

  vec3 mc = texture2D(tMatcap, mUv).rgb;
  float fres = getFresnel(n, vd, 1.8);
  vec3 electric = mix(vec3(0.08, 0.32, 0.95), vec3(0.24, 0.96, 1.0), fres);
  vec3 col = mc * 0.65 + electric * (0.55 + fres * 0.95);
  col *= mix(0.25, 1.25, smoothstep(22.0, 4.0, vDist));
  gl_FragColor = vec4(pow(max(col, vec3(0.0)), vec3(1.15)), 1.0);
}
`;

export const FLOWER_PARTICLE_VERT = /* glsl */ `
attribute vec4 aRandom;
attribute vec3 aColor;

varying vec3 vColor;
varying vec4 vRandom;
varying float vAlpha;

uniform float uTime;
uniform float uScroll;
uniform float uRotate;
uniform float uDPR;
uniform float uSizeBias;
uniform sampler2D tFluid;

void main() {
  vec3 pos = position;
  vRandom = aRandom;
  vColor = aColor;

  // Double-strand DNA spiral + Planetary Dust Ring (exact FlowerParticleShader math)
  float topFloat = smoothstep(0.45, 0.0, uScroll) * pow(aRandom.x, 18.0) * 5.0;
  pos.y += topFloat * (0.8 + sin(pos.y * 0.25 + uTime * 0.35 + aRandom.z * 6.28) * 0.2);

  float spiralWave = uScroll * 5.0 + length(pos.xz) * 0.65 + pos.y * 0.42 + uRotate * 1.4;
  pos.x -= cos(spiralWave) * 0.45;
  pos.z -= sin(spiralWave) * 0.45;

  // Outer sweeping planetary dust arc (5% of particles)
  if (aRandom.y > 0.92) {
    float ang = aRandom.z * 6.28318 + uTime * 0.04 - uRotate * 0.25;
    float rad = mix(7.5, 18.0, aRandom.x);
    pos.x = cos(ang) * rad;
    pos.z = sin(ang) * rad * 0.65 - 2.0;
    pos.y = mix(-8.0, 3.5, aRandom.w) + sin(ang * 2.0) * 1.4;
  }

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  vec4 clipPos = projectionMatrix * mvPosition;

  // Screen-space MouseFluid repulsion
  vec2 ndc = clipPos.xy / max(0.001, clipPos.w);
  vec2 sUv = ndc * 0.5 + 0.5;
  if (sUv.x > 0.0 && sUv.x < 1.0 && sUv.y > 0.0 && sUv.y < 1.0) {
    vec2 flow = texture2D(tFluid, sUv).xy * 2.0 - 1.0;
    mvPosition.xy += flow * 1.35 * aRandom.w;
    clipPos = projectionMatrix * mvPosition;
  }

  float dist = max(1.2, -mvPosition.z);
  float bokehBoost = step(0.86, aRandom.w) * 1.9 + 1.0;
  gl_PointSize = clamp((24.0 * uDPR * uSizeBias * bokehBoost * mix(0.45, 1.45, aRandom.x)) / dist, 1.2, 42.0);
  vAlpha = smoothstep(32.0, 4.5, dist) * mix(0.38, 0.95, aRandom.w);
  gl_Position = clipPos;
}
`;

export const FLOWER_PARTICLE_FRAG = /* glsl */ `
precision highp float;
varying vec3 vColor;
varying vec4 vRandom;
varying float vAlpha;
uniform sampler2D tBokeh;
uniform float uTime;
${GLSL_COMMON}

void main() {
  vec2 uv = gl_PointCoord;
  float r = length(uv - 0.5);
  if (r > 0.5) discard;

  vec2 rotUv = rotateUV(uv, sin(uTime * 0.8 + vRandom.z * 12.0) * 0.5);
  vec4 bok = texture2D(tBokeh, rotUv);
  float ring = smoothstep(0.5, 0.34, r) * (0.65 + smoothstep(0.28, 0.46, r) * 0.55);
  float twinkle = 0.78 + 0.22 * sin(uTime * 2.6 + vRandom.x * 30.0);

  vec3 col = vColor * bok.rgb * 1.35 * twinkle;
  gl_FragColor = vec4(col, ring * vAlpha * bok.a);
}
`;

export {
  WORK_ITEM_VERT,
  WORK_ITEM_FRAG,
  WORK_ITEM_UI_VERT,
  WORK_ITEM_UI_FRAG
} from './work-pane-shaders.js';

