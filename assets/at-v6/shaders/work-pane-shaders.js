/* ============================================================================
   ARCH1CAT HYDRA-V6 — shaders/work-pane-shaders.js
   Frosted RadialBlur Glass Slab Shader (WorkItemShader) &
   Perspective-Locked Emblem/Title Layer with Edge Glitch (WorkItemUIShader)
   ============================================================================ */

import { GLSL_COMMON } from './glsl-chunks.js';

export const WORK_ITEM_VERT = /* glsl */ `
varying vec2 vUv;
varying vec3 vNormalView;
varying vec3 vViewDir;
varying vec3 vWorldPos;
varying float vSide;

uniform float uTime;
uniform float uHover;
uniform vec2 uMouse;
uniform float uPhone;

void main() {
  vUv = uv;
  vec3 pos = position;
  pos.z += sin(uTime * 0.65 + abs(pos.x) * 0.9) * 0.05 + uHover * 0.16;
  pos.y -= pos.x * mix(0.075, 0.12, uPhone);
  pos.x -= (uMouse.x - 0.5) * 0.04;

  vec4 wp = modelMatrix * vec4(pos, 1.0);
  vWorldPos = wp.xyz;
  vec4 mvPos = viewMatrix * wp;
  vViewDir = -mvPos.xyz;
  vNormalView = normalize(normalMatrix * normal);
  vSide = clamp(1.0 - abs(normal.z), 0.0, 1.0);
  gl_Position = projectionMatrix * mvPos;
}
`;

export const WORK_ITEM_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
varying vec3 vNormalView;
varying vec3 vViewDir;
varying vec3 vWorldPos;
varying float vSide;

uniform sampler2D tMap;
uniform sampler2D tRefraction;
uniform sampler2D tNormal;
uniform vec3 uColor;
uniform float uHover;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uTime;
uniform float uFocus;
${GLSL_COMMON}

void main() {
  vec2 nUv = vUv * 1.85 + vNormalView.xy * 0.03 + vec2(cnoise(vUv * 2.0 + uTime * 0.06) * 0.015);
  vec3 mapN = texture2D(tNormal, nUv).xyz * 2.0 - 1.0;

  vec3 viewDir = normalize(vViewDir);
  float fres = getFresnel(vNormalView, viewDir, 1.65);
  vec3 dispRainbow = rainbowColor(fres * 0.55 + vUv.x * 0.15);

  vec2 screenUV = gl_FragCoord.xy / max(uResolution, vec2(1.0));
  vec2 ruv = screenUV - 0.042 * vNormalView.xy - mapN.xy * (0.024 + uHover * 0.026);
  ruv = scaleUV(ruv, vec2(1.06 + uHover * 0.04));
  ruv += (uMouse - 0.5) * 0.018;

  vec3 refracted = pow(max(radialBlur(tRefraction, ruv, 6.5, 5.0).rgb, vec3(0.0)), vec3(1.22));

  vec2 artUV = scaleUV(vUv - mapN.xy * 0.024 * (1.0 - uHover * 0.5), vec2(0.96, 0.92));
  float edgeAberr = smoothstep(0.4, 4.5, abs(vViewDir.x)) * 0.004;
  vec3 art = getRGB(tMap, artUV, 0.0, edgeAberr).rgb;
  float artMask = smoothstep(0.5, 0.38, abs(vUv.x - 0.5)) * smoothstep(0.5, 0.38, abs(vUv.y - 0.5));
  art *= artMask * mix(0.22, 0.58, uFocus * 0.65 + uHover * 0.35);

  vec3 baseGlass = mix(vec3(0.052, 0.074, 0.105), vec3(0.082, 0.132, 0.165), vUv.x * 0.8 + uHover * 0.2);
  vec3 col = baseGlass + refracted * mix(1.18, 0.85, uHover);
  col = blendSoftLight(col, art * 1.45, 0.85);
  col += art * 0.56;

  vec2 glowOrigin = mix(vec2(0.5), vec2(uMouse.x, 1.0 - uMouse.y), uHover);
  float aura = smoothstep(0.75, -0.05, length(vUv - glowOrigin));
  col = blendAdd(col, uColor, mix(0.08, 0.28, uHover) * aura);

  float rimBorder = smoothstep(0.455, 0.498, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
  vec3 rimTint = mix(vec3(0.22, 0.56, 0.62), uColor * 1.2 + dispRainbow * 0.35, 0.45 + uHover * 0.4);
  col += rimTint * (vSide * 0.75 + rimBorder * (0.34 + fres * 0.45));

  float grain = hash21(vUv * 520.0 + fract(uTime * 0.37)) - 0.5;
  col += grain * 0.042;

  gl_FragColor = vec4(col, 0.94);
}
`;

export const WORK_ITEM_UI_VERT = /* glsl */ `
varying vec2 vUv;
varying vec3 vViewDir;
uniform float uHover;
uniform float uPhone;

void main() {
  vUv = uv;
  vec3 pos = position;
  pos.z += 0.08 + smoothstep(1.0, 0.0, abs(uv.x - 0.5)) * 0.11 + uHover * 0.16;
  pos.y -= pos.x * mix(0.075, 0.12, uPhone);
  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  vViewDir = -mvPos.xyz;
  gl_Position = projectionMatrix * mvPos;
}
`;

export const WORK_ITEM_UI_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
varying vec3 vViewDir;

uniform sampler2D tMap;
uniform vec3 uColor;
uniform float uHover;
uniform float uCamDistance;
${GLSL_COMMON}

void main() {
  vec2 uv = vUv;
  float edges = smoothstep(1.3 + uHover * 0.8, 6.2, abs(vViewDir.x));
  uv.x += fract(uv.y * 18.0) * edges * 0.035;

  vec4 tex = getRGB(tMap, uv, 0.0, edges * 0.012 + 0.0008);
  float distFade = crange(uCamDistance, 4.2, 13.8, 1.0, 0.18);
  vec3 col = mix(tex.rgb, tex.rgb * (vec3(0.78) + uColor * 0.55), 0.22 + uHover * 0.25);
  float alpha = tex.a * distFade * mix(0.88, 1.0, uHover);
  if (alpha < 0.01) discard;
  gl_FragColor = vec4(col, alpha);
}
`;
