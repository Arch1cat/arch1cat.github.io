/* ============================================================================
   ARCH1CAT HYDRA-V6 — shaders/glsl-chunks.js
   Verbatim Active Theory V6 GLSL Math, Perlin/FBM, HSV, RadialBlur & Blends
   ============================================================================ */

export const GLSL_COMMON = /* glsl */ `
const float PI = 3.14159265358979323846;

float crange(float oldValue, float oldMin, float oldMax, float newMin, float newMax) {
  float oldRange = oldMax - oldMin;
  float newRange = newMax - newMin;
  float val = (((oldValue - oldMin) * newRange) / max(abs(oldRange), 0.00001)) + newMin;
  return clamp(val, min(newMin, newMax), max(newMin, newMax));
}

vec3 crange3(vec3 v, vec3 oldMin, vec3 oldMax, vec3 newMin, vec3 newMax) {
  return (v - oldMin) / max(oldMax - oldMin, vec3(0.0001)) * (newMax - newMin) + newMin;
}

vec2 scaleUV(vec2 uv, vec2 scale, vec2 origin) {
  return (uv - origin) / max(scale, vec2(0.0001)) + origin;
}

vec2 scaleUV(vec2 uv, vec2 scale) {
  return scaleUV(uv, scale, vec2(0.5));
}

vec2 rotateUV(vec2 uv, float rad) {
  float c = cos(rad);
  float s = sin(rad);
  vec2 p = uv - 0.5;
  return vec2(c * p.x + s * p.y, c * p.y - s * p.x) + 0.5;
}

vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
}

float cnoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return (mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y) * 2.0 - 1.0;
}

float fbm6(vec2 st) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 6; i++) {
    value += amplitude * (cnoise(st) * 0.5 + 0.5);
    st *= 2.02;
    amplitude *= 0.5;
  }
  return value;
}

float getFresnel(vec3 normal, vec3 viewDir, float power) {
  float d = dot(normalize(normal), normalize(viewDir));
  return pow(1.0 - clamp(abs(d), 0.0, 1.0), power);
}

vec4 getRGB(sampler2D tex, vec2 uv, float angle, float amount) {
  vec2 offset = vec2(cos(angle), sin(angle)) * amount;
  vec4 r = texture2D(tex, clamp(uv + offset, 0.001, 0.999));
  vec4 g = texture2D(tex, clamp(uv, 0.001, 0.999));
  vec4 b = texture2D(tex, clamp(uv - offset, 0.001, 0.999));
  return vec4(r.r, g.g, b.b, g.a);
}

vec4 radialBlur(sampler2D map, vec2 uv, float size, float quality) {
  vec2 rad = vec2(size * 0.0028);
  vec4 acc = texture2D(map, clamp(uv, 0.002, 0.998)) * 0.20;
  acc += texture2D(map, clamp(uv + rad * vec2( 1.0,  0.0), 0.002, 0.998)) * 0.12;
  acc += texture2D(map, clamp(uv + rad * vec2(-1.0,  0.0), 0.002, 0.998)) * 0.12;
  acc += texture2D(map, clamp(uv + rad * vec2( 0.0,  1.0), 0.002, 0.998)) * 0.12;
  acc += texture2D(map, clamp(uv + rad * vec2( 0.0, -1.0), 0.002, 0.998)) * 0.12;
  acc += texture2D(map, clamp(uv + rad * vec2( 0.7,  0.7), 0.002, 0.998)) * 0.08;
  acc += texture2D(map, clamp(uv + rad * vec2(-0.7,  0.7), 0.002, 0.998)) * 0.08;
  acc += texture2D(map, clamp(uv + rad * vec2( 0.7, -0.7), 0.002, 0.998)) * 0.08;
  acc += texture2D(map, clamp(uv + rad * vec2(-0.7, -0.7), 0.002, 0.998)) * 0.08;
  return acc;
}

float blendSoftLightCh(float base, float blend) {
  return (blend < 0.5)
    ? (2.0 * base * blend + base * base * (1.0 - 2.0 * blend))
    : (sqrt(max(base, 0.0)) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend));
}

vec3 blendSoftLight(vec3 base, vec3 blend, float opacity) {
  vec3 r = vec3(
    blendSoftLightCh(base.r, blend.r),
    blendSoftLightCh(base.g, blend.g),
    blendSoftLightCh(base.b, blend.b)
  );
  return mix(base, r, opacity);
}

float blendOverlayCh(float base, float blend) {
  return base < 0.5 ? (2.0 * base * blend) : (1.0 - 2.0 * (1.0 - base) * (1.0 - blend));
}

vec3 blendOverlay(vec3 base, vec3 blend, float opacity) {
  vec3 r = vec3(
    blendOverlayCh(base.r, blend.r),
    blendOverlayCh(base.g, blend.g),
    blendOverlayCh(base.b, blend.b)
  );
  return mix(base, r, opacity);
}

vec3 blendAdd(vec3 base, vec3 blend, float opacity) {
  return min(base + blend * opacity, vec3(1.5));
}

vec3 rainbowColor(float t) {
  t = mod(t, 1.0);
  if (t < 0.06) return mix(vec3(0.45, 0.15, 0.85), vec3(0.15, 0.42, 1.0), t / 0.06);
  if (t < 0.14) return mix(vec3(0.15, 0.42, 1.0), vec3(0.18, 0.96, 1.0), (t - 0.06) / 0.08);
  if (t < 0.24) return mix(vec3(0.18, 0.96, 1.0), vec3(0.23, 0.91, 0.69), (t - 0.14) / 0.10);
  if (t < 0.36) return mix(vec3(0.23, 0.91, 0.69), vec3(0.95, 0.82, 0.62), (t - 0.24) / 0.12);
  return mix(vec3(0.95, 0.82, 0.62), vec3(0.85, 0.28, 0.66), clamp((t - 0.36) / 0.30, 0.0, 1.0));
}
`;
