/* ============================================================================
   ARCH1CAT HYDRA-V6 — shaders/detail-and-global-shaders.js
   Ported Active Theory V6 Post & Detail Shaders:
   - WorkComposite.fs (6-Octave FBM Radial Zoom + Chromatic Transition)
   - WorkDetailCube.glsl (Frosted Glass Chamber + MouseFluid Clear-Wipe)
   - WorkDetailParticleShader.glsl (Project-Colored Bokeh Stream)
   - FXScrollTransition.glsl (Diagonal Angle=0.7 Refractive World Wipe)
   - GlobalComposite.fs (Bloom + Corner Frost + Contact Frost + Grain)
   ============================================================================ */

import { GLSL_COMMON } from './glsl-chunks.js';

export const FULLSCREEN_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const WORK_COMPOSITE_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D tWork;
uniform sampler2D tDetail;
uniform float uTransition;
uniform vec2 uResolution;
${GLSL_COMMON}

void main() {
  if (uTransition <= 0.001) {
    gl_FragColor = texture2D(tWork, vUv);
    return;
  }
  if (uTransition >= 0.999) {
    gl_FragColor = texture2D(tDetail, vUv);
    return;
  }

  vec2 uv = vUv;
  vec2 aspect = uResolution.x > uResolution.y
    ? vec2(uResolution.x / max(1.0, uResolution.y), 1.0)
    : vec2(1.0, uResolution.y / max(1.0, uResolution.x));
  vec2 squareUv = (uv - 0.5) * aspect + 0.5;

  float trans = uTransition * 1.48;
  vec2 dir = normalize(uv - 0.5 + vec2(0.0001));
  float n = fbm6(dir * 3.2);
  squareUv += smoothstep(0.15, 0.45, trans) * n * dir * 0.22;

  float d = smoothstep(trans + 0.25, trans - 0.25, distance(squareUv, vec2(0.5)));
  d *= smoothstep(0.0, 0.45, uTransition);

  vec2 fromUv = scaleUV((uv - 0.5) / (1.0 + d) + 0.5, vec2(1.0 + uTransition * 0.1));
  vec2 toUv = (uv - 0.5) / (2.0 - d) + 0.5;

  vec3 fromCol = getRGB(tWork, fromUv, 0.2, 0.007 * uTransition).rgb * smoothstep(1.0, 0.45, uTransition) * mix(1.0, 1.85, d);
  vec3 toCol = getRGB(tDetail, toUv, 0.2, 0.005 * (1.0 - uTransition)).rgb * smoothstep(0.15, 0.62, uTransition) * mix(1.85, 1.0, d);

  gl_FragColor = vec4(mix(fromCol, toCol, d), 1.0);
}
`;

export const WORK_DETAIL_CUBE_VERT = /* glsl */ `
varying vec2 vUv;
varying vec3 vPos;
varying float vSide;

void main() {
  vUv = uv;
  vPos = position;
  vSide = clamp(abs(normal.x) + abs(normal.y), 0.0, 1.0);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const WORK_DETAIL_CUBE_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
varying vec3 vPos;
varying float vSide;

uniform sampler2D tParticles;
uniform sampler2D tNormal;
uniform sampler2D tFluid;
uniform sampler2D tFluidMask;
uniform vec3 uColor;
uniform vec2 uResolution;
uniform float uTime;
${GLSL_COMMON}

void main() {
  vec2 screenUV = gl_FragCoord.xy / max(uResolution, vec2(1.0));
  vec2 fluidVel = texture2D(tFluid, screenUV).xy * 2.0 - 1.0;
  float fluidClear = smoothstep(0.03, 0.52, texture2D(tFluidMask, screenUV).r);

  // Seamless spherical coordinates eliminate BoxGeometry 50% X/Y cross-seams
  vec3 dir = normalize(vPos);
  vec2 seamlessUv = vec2(atan(dir.z, dir.x) * 0.3183 + 0.5, dir.y * 0.5 + 0.5);
  vec3 mapN = texture2D(tNormal, seamlessUv * 3.2 + fluidVel * 0.08).xyz * 2.0 - 1.0;

  float frostAmt = smoothstep(0.06, 0.72, length(screenUV - 0.5)) * (1.0 - fluidClear * 0.88);
  vec2 ruv = screenUV + mapN.xy * 0.032 * frostAmt + fluidVel * 0.015;
  vec3 refr = radialBlur(tParticles, ruv, 3.8 * (1.0 - fluidClear * 0.72), 5.0).rgb;

  vec3 chamberTint = mix(vec3(0.018, 0.026, 0.042), uColor * 0.11, 0.48);
  vec3 col = chamberTint + refr * mix(1.25, 1.75, fluidClear);
  col += uColor * fluidClear * 0.08;

  gl_FragColor = vec4(col, 1.0);
}
`;

export const WORK_DETAIL_PARTICLE_VERT = /* glsl */ `
attribute vec4 aRandom;
varying vec2 vSampleUv;
varying vec4 vRandom;
varying float vAlpha;

uniform float uTime;
uniform float uDPR;

void main() {
  vRandom = aRandom;
  float t = fract(aRandom.x + uTime * mix(0.035, 0.075, aRandom.y));
  float ang = t * 6.28318 * 2.0 + aRandom.z * 6.28;
  float rad = mix(1.4, 7.2, aRandom.w);
  vec3 pos = vec3(
    cos(ang) * rad + sin(uTime * 0.5 + aRandom.y * 8.0) * 0.8,
    mix(-4.6, 4.6, t) + cos(ang * 1.5) * 0.65,
    sin(ang) * rad * 0.55 - 2.0
  );

  vSampleUv = clamp(vec2(pos.x / 13.0 + 0.5, pos.y / 9.0 + 0.5), 0.02, 0.98);
  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
  float dist = max(1.5, -mvPos.z);
  gl_PointSize = clamp((44.0 * uDPR * mix(0.65, 1.85, aRandom.w)) / dist, 2.5, 36.0);
  vAlpha = smoothstep(0.0, 0.12, t) * smoothstep(1.0, 0.86, t);
  gl_Position = projectionMatrix * mvPos;
}
`;

export const WORK_DETAIL_PARTICLE_FRAG = /* glsl */ `
precision highp float;
varying vec2 vSampleUv;
varying vec4 vRandom;
varying float vAlpha;

uniform sampler2D tPreview;
uniform sampler2D tBokeh;
uniform vec3 uColor;
uniform float uTime;
${GLSL_COMMON}

void main() {
  vec2 uv = gl_PointCoord;
  if (length(uv - 0.5) > 0.5) discard;

  vec3 artCol = texture2D(tPreview, vSampleUv).rgb;
  vec4 bok = texture2D(tBokeh, rotateUV(uv, uTime * 0.6 + vRandom.z * 10.0));
  vec3 col = mix(artCol + uColor * 0.45, rainbowColor(vRandom.x + uTime * 0.05), 0.38) * bok.rgb;
  gl_FragColor = vec4(col * 2.1, bok.a * vAlpha * 0.92);
}
`;

export const FX_SCROLL_TRANSITION_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D tMap1;
uniform sampler2D tMap2;
uniform sampler2D tNormal;
uniform float uTransition;
uniform float uAngle;
uniform float uRatio;
${GLSL_COMMON}

void main() {
  if (uTransition <= 0.001) {
    gl_FragColor = texture2D(tMap1, vUv);
    return;
  }
  if (uTransition >= 0.999) {
    gl_FragColor = texture2D(tMap2, vUv);
    return;
  }

  vec2 uv = vUv;
  vec2 normalUV = scaleUV(vUv, vec2(0.32, 0.32 * uRatio));
  normalUV.y -= uTransition;
  vec3 normal = texture2D(tNormal, normalUV).xyz * 2.0 - 1.0;

  float inclination = -0.2 * uAngle * uRatio;
  float seamLine = uv.y + uv.x * inclination;
  float thresh = mix(inclination - 0.08, 1.08, uTransition);
  float band = smoothstep(0.22, 0.0, abs(seamLine - thresh));

  uv += normal.xy * 0.032 * band;
  vec3 c1 = getRGB(tMap1, uv, 0.4, 0.004 * band).rgb;
  vec3 c2 = getRGB(tMap2, uv, 0.4, 0.004 * band).rgb;
  float cut = smoothstep(thresh - 0.035, thresh + 0.035, seamLine);
  vec3 mixed = mix(c1, c2, cut) + vec3(0.22, 0.72, 0.95) * band * 0.14;
  gl_FragColor = vec4(mixed, 1.0);
}
`;

export const GLOBAL_COMPOSITE_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform sampler2D tBloom;
uniform sampler2D tNormal;
uniform sampler2D tFluid;
uniform sampler2D tFluidMask;
uniform vec2 uResolution;
uniform float uTime;
uniform float uScroll;
uniform float uScrollDelta;
uniform float uContact;
uniform float uChatOpen;
uniform float uVisible;
uniform vec3 uUIColor;
uniform float uUIBlend;
${GLSL_COMMON}

void main() {
  float aspect = uResolution.x / max(1.0, uResolution.y);
  vec2 squareUV = scaleUV(vUv, vec2(1.35, aspect));
  vec2 uv = scaleUV(vUv, vec2(1.0 + uContact * 0.06 * smoothstep(1.0, 0.1, length(squareUV - 0.5))));

  vec2 fluidVel = texture2D(tFluid, uv).xy * 2.0 - 1.0;
  float fluidMask = smoothstep(0.02, 0.75, texture2D(tFluidMask, uv).r);
  float fluidMag = length(fluidVel);

  vec3 mapN = texture2D(tNormal, vUv * vec2(2.6 * aspect, 2.6)).xyz * 2.0 - 1.0;

  // Corner frost + Contact modal heavy road-normal frost (melted by MouseFluid!)
  float cornerFrost = smoothstep(0.34, 0.0, length(vUv - vec2(1.0, 1.0))) * 0.012;
  cornerFrost += smoothstep(0.38, 0.0, length(vUv)) * uChatOpen * 0.008;
  float contactFrost = pow(uContact, 2.2) * 0.065 * (1.0 - fluidMask * 0.82);
  uv += mapN.xy * (cornerFrost + contactFrost) + fluidVel * 0.012 * (0.35 + uContact * 0.65);

  float rgbShift = 0.0007 * abs(uScrollDelta) + 0.0035 * uContact * (1.0 - fluidMask) + fluidMag * 0.002;
  vec3 color = getRGB(tDiffuse, uv, radians(120.0), rgbShift).rgb;

  // Add Half-Res Bloom
  vec3 bloom = texture2D(tBloom, uv).rgb;
  color += pow(max(bloom, vec3(0.0)), vec3(1.35)) * 0.72;

  // Dim scene cleanly when ContactUI is open
  color *= mix(1.0, 0.15, pow(uContact, 1.4));

  // Signature Active Theory atmospheric corner mists (top-left slate-teal & bottom-left indigo)
  float tlMist = smoothstep(0.85, 0.0, length((vUv - vec2(0.05, 0.96)) * vec2(aspect * 0.75, 1.1)));
  float blMist = smoothstep(0.75, 0.0, length((vUv - vec2(0.06, 0.06)) * vec2(aspect * 0.8, 1.0)));
  float mistNoise = 0.65 + 0.35 * cnoise(vUv * 2.4 + uTime * 0.05 + uScroll * 0.1);
  vec3 topTint = mix(vec3(0.07, 0.16, 0.20), uUIColor * 0.24, uUIBlend * 0.7);
  vec3 botTint = mix(vec3(0.08, 0.05, 0.18), uUIColor * 0.20, uUIBlend * 0.75);
  color += topTint * tlMist * mistNoise * 0.65;
  color += botTint * blMist * uChatOpen * 0.62;

  // Fine film dithering grain + intro fade
  float grain = (hash21(vUv * uResolution * 0.5 + fract(uTime * 0.73)) - 0.5) * 0.032;
  color += grain;
  color *= smoothstep(0.0, 0.65, uVisible);

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;
