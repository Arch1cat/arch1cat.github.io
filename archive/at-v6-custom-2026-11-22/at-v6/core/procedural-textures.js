/* ============================================================================
   ARCH1CAT HYDRA-V6 — core/procedural-textures.js
   Zero-404 Procedural PBR Normals, Iridescent Oil Matcaps, Bokeh &
   Clean Architectural Visual Previews (Zero Legacy/Ghost Text!)
   ============================================================================ */

import * as THREE from 'three';

function hash2(x, y, seed = 13.7) {
  const s = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453123;
  return s - Math.floor(s);
}

function tileNoise(x, y, period, seed) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const x0 = ((xi % period) + period) % period;
  const x1 = (x0 + 1) % period;
  const y0 = ((yi % period) + period) % period;
  const y1 = (y0 + 1) % period;
  const a = hash2(x0, y0, seed);
  const b = hash2(x1, y0, seed);
  const c = hash2(x0, y1, seed);
  const d = hash2(x1, y1, seed);
  return a + (b - a) * u + (c - a) * v * (1 - u) + (d - b) * u * v;
}

function fbmTile(u, v, baseFreq, octaves, seed) {
  let sum = 0;
  let amp = 0.5;
  let freq = baseFreq;
  for (let o = 0; o < octaves; o++) {
    sum += amp * tileNoise(u * freq, v * freq, freq, seed + o * 19.1);
    freq *= 2;
    amp *= 0.5;
  }
  return sum;
}

export function createNormalMapTexture(size = 256, baseFreq = 8, strength = 2.6, seed = 3.1) {
  const data = new Uint8Array(size * size * 4);
  const heights = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      heights[y * size + x] = fbmTile(x / size, y / size, baseFreq, 5, seed);
    }
  }
  for (let y = 0; y < size; y++) {
    const ym = (y - 1 + size) % size;
    const yp = (y + 1) % size;
    for (let x = 0; x < size; x++) {
      const xm = (x - 1 + size) % size;
      const xp = (x + 1) % size;
      const dx = (heights[y * size + xp] - heights[y * size + xm]) * strength;
      const dy = (heights[yp * size + x] - heights[ym * size + x]) * strength;
      const invLen = 1 / Math.hypot(dx, dy, 1);
      const idx = (y * size + x) * 4;
      data[idx] = Math.round((-dx * invLen * 0.5 + 0.5) * 255);
      data[idx + 1] = Math.round((-dy * invLen * 0.5 + 0.5) * 255);
      data[idx + 2] = Math.round((invLen * 0.5 + 0.5) * 255);
      data[idx + 3] = 255;
    }
  }
  const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  tex.needsUpdate = true;
  return tex;
}

export function createOilSlickMatcap(size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const cx = size * 0.5;
  const cy = size * 0.5;

  ctx.fillStyle = '#06080f';
  ctx.fillRect(0, 0, size, size);

  const baseGrad = ctx.createRadialGradient(cx * 0.74, cy * 0.70, size * 0.05, cx, cy, size * 0.5);
  baseGrad.addColorStop(0.0, '#c8f6ff');
  baseGrad.addColorStop(0.18, '#28b8d8');
  baseGrad.addColorStop(0.40, '#2254c8');
  baseGrad.addColorStop(0.62, '#8a3488');
  baseGrad.addColorStop(0.82, '#162332');
  baseGrad.addColorStop(1.0, '#04060a');
  ctx.fillStyle = baseGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.5, 0, Math.PI * 2);
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export function createBokehMatcap(size = 128) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const r = size * 0.5;
  const g = ctx.createRadialGradient(r * 0.82, r * 0.78, r * 0.05, r, r, r * 0.96);
  g.addColorStop(0.0, 'rgba(255,255,255,1)');
  g.addColorStop(0.42, 'rgba(235,246,255,0.92)');
  g.addColorStop(0.78, 'rgba(175,218,255,0.62)');
  g.addColorStop(0.93, 'rgba(255,220,245,0.88)');
  g.addColorStop(1.0, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

function drawCleanArchitecturalVisual(ctx, project) {
  const accent = `#${project.uiColor || '00f2fe'}`;
  ctx.fillStyle = '#050811';
  ctx.fillRect(0, 0, 1024, 640);

  const bg = ctx.createRadialGradient(512, 320, 30, 512, 320, 560);
  bg.addColorStop(0, `${accent}3d`);
  bg.addColorStop(0.55, '#0b1322');
  bg.addColorStop(1, '#030509');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1024, 640);

  // Subtle architectural UI / telemetry visual without baked legacy text
  ctx.strokeStyle = `${accent}30`;
  ctx.lineWidth = 1.2;
  for (let i = 1; i <= 5; i++) {
    ctx.beginPath();
    ctx.arc(512, 320, i * 54, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Stylized clean dashboard / waveform / contour geometry per category
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  for (let x = 90; x <= 934; x += 12) {
    const nx = (x - 90) / 844;
    const y = 350 + Math.sin(nx * Math.PI * 4 + Number(project.index)) * 68 * Math.sin(nx * Math.PI);
    if (x === 90) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Clean glass UI window chrome mockup (text-free visual silhouette)
  ctx.fillStyle = 'rgba(10, 18, 32, 0.65)';
  ctx.strokeStyle = `${accent}88`;
  ctx.lineWidth = 2;
  ctx.strokeRect(140, 110, 744, 420);

  // Header dots + clean metric bars
  for (let d = 0; d < 3; d++) {
    ctx.fillStyle = d === 0 ? accent : 'rgba(255,255,255,0.28)';
    ctx.beginPath();
    ctx.arc(172 + d * 18, 136, 4.5, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = `${accent}33`;
  ctx.fillRect(172, 172, 210, 128);
  ctx.fillRect(404, 172, 210, 128);
  ctx.fillRect(636, 172, 216, 128);
  ctx.fillStyle = `${accent}22`;
  ctx.fillRect(172, 322, 680, 174);

  // Crisp subtle watermark emblem at center
  ctx.fillStyle = '#ffffff';
  ctx.font = '700 38px "Space Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(project.glyph || '◈', 512, 422);
}

// Keep real photographic previews (technovovk-hero.jpg & yotei-foil.png); replace legacy text-baked PNGs with clean architectural visuals
const PHOTO_TEXTURES = new Set([
  'assets/textures/projects/technovovk-hero.jpg',
  'assets/textures/projects/yotei-foil.png'
]);

export function createProjectPreviewTexture(project) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  drawCleanArchitecturalVisual(ctx, project);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;

  if (project.texture && PHOTO_TEXTURES.has(project.texture)) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const ratio = Math.max(1024 / img.width, 640 / img.height);
      const dw = img.width * ratio;
      const dh = img.height * ratio;
      ctx.clearRect(0, 0, 1024, 640);
      ctx.drawImage(img, (1024 - dw) * 0.5, (640 - dh) * 0.5, dw, dh);
      tex.needsUpdate = true;
    };
    img.src = project.texture;
  }
  return tex;
}

export function buildSharedTextures() {
  return {
    roadNormal: createNormalMapTexture(256, 8, 2.8, 4.2),
    waterNormal: createNormalMapTexture(256, 6, 2.1, 11.7),
    woodNormal: createNormalMapTexture(256, 10, 2.6, 21.3),
    oilMatcap: createOilSlickMatcap(256),
    bokehMatcap: createBokehMatcap(128)
  };
}
