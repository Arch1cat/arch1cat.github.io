/* ============================================================================
   ARCH1CAT HYDRA-V6 — shaders/ui-shaders.js
   Ported Active Theory V6 UI Shaders:
   - LoaderBGShader.glsl (Solar Cyan/Cobalt Arcs + Radial Bars)
   - NavBGShader.glsl (Scroll-Delta Elastic Capsule + Micro-Light Streaks)
   - NavAudioShader.glsl (3-Wave Rainbow Oscilloscope <-> Flat Line)
   ============================================================================ */

import { GLSL_COMMON } from './glsl-chunks.js';

export const SIMPLE_UI_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const LOADER_BG_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uProgress;
uniform float uVisible;
uniform float uAlpha;
uniform float uBars;
uniform float uMobile;
uniform vec2 uResolution;
${GLSL_COMMON}

float drawArcLine(vec2 uv, float offset) {
  vec2 circleUv = uv - 0.5;
  float r = 0.2;
  float thick = 0.0022;
  vec2 up = vec2(cos(offset), sin(-offset));
  float c = -0.38;
  float d1 = abs(length(circleUv) - r) - thick;
  float s1 = smoothstep(0.0035, -0.0035, d1);
  float d2 = dot(up, normalize(circleUv + vec2(0.00001))) - c;
  float s2 = smoothstep(0.03, -0.03, d2);
  return s1 * (1.0 - s2);
}

void main() {
  float t = uTime * 0.22 + uProgress * 4.0 + 1.6;
  vec2 uv = scaleUV(vUv, vec2(1.0, uResolution.x / max(1.0, uResolution.y)));
  uv = scaleUV(uv, vec2(mix(0.9, 1.45, uMobile) + (1.0 - uVisible) * 0.2));
  uv = rotateUV(uv, uVisible * 3.0);

  vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
  vec2 barUV = scaleUV(vUv, vec2(1.0 + sin(t * 0.5 - length(vUv - 0.5) * 30.0) * mix(0.1, 0.4, smoothstep(0.3, 0.1, length(uv - 0.5)))));
  barUV = rotateUV(barUV, radians(mix(0.0, 90.0, uMobile)));

  float bars = fract(barUV.x * uBars);
  bars *= (0.5 + sin(t * 2.0 + bars * 10.0 - length(uv - 0.5) * 30.0) * 0.5);

  vec3 rainbow = rgb2hsv(vec3(0.42, 0.78, 1.0));
  rainbow.x += (0.5 - bars) * 0.12 + 0.05 + sin(t - bars * 2.0) * 0.05 - length(uv - 0.5) * 0.18;
  rainbow.y *= 0.9;
  rainbow = hsv2rgb(rainbow);

  rainbow *= step(0.84, bars) * smoothstep(0.5, 0.28, length(uv - 0.5));
  rainbow = mix(rainbow, vec3(0.9, 0.98, 1.0), step(0.97, bars) - step(0.90, bars));

  float ringMask = step(0.02 * uProgress, length(uv - 0.5)) * step(0.08, length(uv - 0.5)) * (1.0 - step(0.42, length(uv - 0.5)));
  color.rgb += rainbow * ringMask * 0.95;

  vec3 grad = rgb2hsv(vec3(0.38, 0.72, 1.0));
  grad.x += cnoise(vUv * 2.5 - t * 0.04) * 0.05;
  grad = hsv2rgb(grad);

  color.rgb += grad * step(0.078, length(uv - 0.5)) * smoothstep(0.092, 0.078, length(uv - 0.5)) * (0.55 + sin(t * 4.0) * 0.3) * 0.85;
  color.rgb += drawArcLine(scaleUV(uv, vec2(0.42)), 0.0 + t * 0.35) * grad * 0.75;
  color.rgb += drawArcLine(scaleUV(uv, vec2(0.42)), 2.09 + t * 0.35) * grad * 0.65;
  color.rgb += drawArcLine(scaleUV(uv, vec2(0.42)), 4.18 + t * 0.35) * grad * 0.65;
  color.rgb += step(0.2, bars) * 0.055 * smoothstep(0.48, 0.0, length(uv - 0.5)) * step(0.08, length(uv - 0.5)) * vec3(0.35, 0.75, 1.0);

  color.rgb *= smoothstep(0.0, 0.25, max(uProgress, 0.18)) * uVisible;
  color.rgb -= hash21(uv * 300.0 + fract(t)) * 0.035;
  color.rgb *= smoothstep(0.46, 0.02, length(vUv - 0.5));
  gl_FragColor = vec4(max(color.rgb, vec3(0.0)), uAlpha);
}
`;

export const NAV_BG_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uScroll;
uniform float uScrollDelta;
uniform float uHeight;
uniform vec3 uColor;
uniform vec3 uUIColor;
uniform float uUIBlend;
uniform float uAlpha;
${GLSL_COMMON}

float innerRoundedRect(vec2 p, vec2 size, float radius, float stepper) {
  vec2 aspect = vec2(3.84, 1.0);
  vec2 q = abs((p - 0.5) * aspect) - (size * aspect) * 0.5 + radius;
  return step(stepper, length(max(q, 0.0)) - radius);
}

void main() {
  vec2 innerUV = vUv;
  innerUV.y += smoothstep(0.6, 0.0, abs(vUv.x - 0.5)) * 0.024 * uScrollDelta;

  vec2 pillSize = vec2(0.90, 0.52);
  float pillRadius = 0.25;
  float clipOuter = innerRoundedRect(innerUV, pillSize, pillRadius, 0.0);
  float clipRim = innerRoundedRect(innerUV, pillSize, pillRadius, 0.016);

  vec2 bgUV = scaleUV(innerUV, vec2(0.95, 0.45), vec2(0.5, 0.5 + uScrollDelta * 0.02));
  vec3 rainbow = rgb2hsv(vec3(0.52, 0.92, 0.88));
  rainbow.x += cnoise(-bgUV * 1.4 - uTime * 0.08 - uScroll * 0.25) * 0.18;
  rainbow = hsv2rgb(rainbow);
  rainbow = mix(rainbow, mix(uUIColor * 1.25, vec3(1.0), 0.2), uUIBlend * 0.85);

  vec4 color = vec4(0.0);
  color = mix(color, vec4(rainbow, 0.22), smoothstep(0.52, 0.08, length(bgUV - 0.5)));
  color = mix(color, vec4(rainbow, 0.55 + abs(uScrollDelta) * 0.08), (1.0 - clipRim) * clipOuter);

  // Authentic vertical micro-light streaks above & below NavUI capsule
  vec2 barUV = vUv;
  barUV.y -= uScroll * 0.18 - uTime * 0.025;
  float bars = sin(barUV.x * 380.0) * cnoise(barUV * 26.0 + uTime * 0.25 + abs(barUV.y - 0.5) * 4.0);
  float streakMask = step(0.86, bars) * clipRim * smoothstep(0.50, 0.14, length(bgUV - 0.5));
  color += vec4(mix(rainbow, vec3(1.0), 0.55), streakMask * (0.24 + abs(uScrollDelta) * 0.06));

  vec4 innerFill = vec4(uColor, 0.82);
  color = mix(color, innerFill, 1.0 - clipOuter);
  color.a *= uAlpha;
  gl_FragColor = color;
}
`;

export const NAV_AUDIO_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uScroll;
uniform float uAmplitude;
uniform float uHover;
uniform float uAlpha;
${GLSL_COMMON}

float waveLine(vec2 uv, float t) {
  vec2 wuv = uv;
  wuv.y += sin(wuv.x * 6.5 + t * 4.2) * mix(0.11, 0.17, uHover) * uAmplitude;
  float w = smoothstep(0.055 * smoothstep(0.52, 0.12, abs(uv.x - 0.5)) + 0.018, 0.0, abs(wuv.y - 0.5)) * mix(0.65, 0.92, uHover);
  float flatLine = smoothstep(0.028, 0.0, abs(uv.y - 0.5)) * step(abs(uv.x - 0.5), 0.42);
  return mix(flatLine * 0.85, w * step(abs(uv.x - 0.5), 0.46), uAmplitude);
}

void main() {
  vec3 rainbow = rgb2hsv(vec3(0.62, 0.82, 1.0));
  rainbow.x += sin(vUv.x * 5.0 + uTime * 3.0) * 0.09;
  rainbow = hsv2rgb(rainbow);

  float t = uTime * 0.85 + uScroll * 0.3;
  float a = 0.0;
  a += waveLine(vUv, t);
  a += waveLine(vUv, t + sin(t * 2.0 + vUv.x) * 0.45) * uAmplitude * 0.75;
  a += waveLine(vUv, t + cos(t * 2.0 + vUv.x) * 0.45) * uAmplitude * 0.75;
  a = clamp(a, 0.0, 1.0) * uAlpha;

  vec3 col = mix(vec3(0.92, 0.96, 1.0), rainbow, uAmplitude * 0.65);
  gl_FragColor = vec4(col, a);
}
`;
