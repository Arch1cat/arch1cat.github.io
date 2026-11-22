/* ============================================================================
   ARCH1CAT HYDRA-V6 — geometries/bio-geometries.js
   Procedural High-Detail Geometries (Zero External .bin Dependencies):
   - Anatomical Human Vertebra (Body + Pedicles + Spinous & Transverse Processes)
   - Interlocking Oval Stadium Chain Link
   - Rounded-Corner Bevelled 3D Glass Slab (Clean [0..1] Front/Back UVs)
   ============================================================================ */

import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

function prepPart(geo, matrix) {
  const g = geo.index ? geo.toNonIndexed() : geo.clone();
  if (matrix) g.applyMatrix4(matrix);
  if (!g.attributes.uv) {
    const count = g.attributes.position.count;
    g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(count * 2), 2));
  }
  return g;
}

export function buildVertebraGeometry() {
  const parts = [];
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const s = new THREE.Vector3(1, 1, 1);
  const p = new THREE.Vector3();

  // 1. Anterior kidney-shaped vertebral centrum
  const body = new THREE.CylinderGeometry(0.42, 0.44, 0.34, 20, 3);
  p.set(-0.18, 0, 0); e.set(0, 0, 0); s.set(1.05, 1.0, 0.88);
  m.compose(p, q.setFromEuler(e), s);
  parts.push(prepPart(body, m));

  // 2. Superior & Inferior cortical endplate rims
  for (const dir of [-1, 1]) {
    const rim = new THREE.TorusGeometry(0.41, 0.048, 8, 20);
    p.set(-0.18, dir * 0.16, 0); e.set(Math.PI * 0.5, 0, 0); s.set(1.04, 0.88, 1.0);
    m.compose(p, q.setFromEuler(e), s);
    parts.push(prepPart(rim, m));
  }

  // 3. Bilateral pedicles + neural arch ring
  const arch = new THREE.TorusGeometry(0.28, 0.075, 10, 18);
  p.set(0.22, 0.02, 0); e.set(Math.PI * 0.5, 0, 0); s.set(1.15, 0.95, 1.0);
  m.compose(p, q.setFromEuler(e), s);
  parts.push(prepPart(arch, m));

  // 4. Swept posterior spinous process (signature shark-fin silhouette)
  const spinous = new THREE.ConeGeometry(0.11, 0.72, 10);
  p.set(0.68, -0.10, 0); e.set(0, 0, -Math.PI * 0.40); s.set(1.0, 1.0, 0.52);
  m.compose(p, q.setFromEuler(e), s);
  parts.push(prepPart(spinous, m));

  // 5. Left & Right transverse processes + superior articular facets
  for (const side of [-1, 1]) {
    const trans = new THREE.ConeGeometry(0.085, 0.56, 9);
    p.set(0.22, 0.03, side * 0.44);
    e.set(side * Math.PI * 0.44, 0, -0.18);
    s.set(0.75, 1.0, 0.85);
    m.compose(p, q.setFromEuler(e), s);
    parts.push(prepPart(trans, m));

    const facet = new THREE.SphereGeometry(0.095, 10, 8);
    p.set(0.26, 0.17, side * 0.22);
    e.set(0, 0, 0);
    s.set(0.8, 1.25, 0.7);
    m.compose(p, q.setFromEuler(e), s);
    parts.push(prepPart(facet, m));
  }

  const merged = mergeGeometries(parts, false);
  merged.computeVertexNormals();
  return merged;
}

export function buildChainLinkGeometry() {
  const path = new THREE.CurvePath();
  const r = 0.085;
  const halfH = 0.09;
  const steps = 12;
  const pts = [];

  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI;
    pts.push(new THREE.Vector3(Math.cos(a) * r, halfH + Math.sin(a) * r, 0));
  }
  for (let i = 0; i <= steps; i++) {
    const a = Math.PI + (i / steps) * Math.PI;
    pts.push(new THREE.Vector3(Math.cos(a) * r, -halfH + Math.sin(a) * r, 0));
  }
  pts.push(pts[0].clone());
  const curve = new THREE.CatmullRomCurve3(pts, true);
  return new THREE.TubeGeometry(curve, 28, 0.028, 8, true);
}

export function buildBevelGlassPaneGeometry(width = 4.0, height = 2.5, depth = 0.12, radius = 0.16) {
  const hw = width * 0.5 - radius;
  const hh = height * 0.5 - radius;
  const shape = new THREE.Shape();
  shape.moveTo(-hw, -hh - radius);
  shape.lineTo(hw, -hh - radius);
  shape.absarc(hw, -hh, radius, -Math.PI * 0.5, 0, false);
  shape.lineTo(hw + radius, hh);
  shape.absarc(hw, hh, radius, 0, Math.PI * 0.5, false);
  shape.lineTo(-hw, hh + radius);
  shape.absarc(-hw, hh, radius, Math.PI * 0.5, Math.PI, false);
  shape.lineTo(-hw - radius, -hh);
  shape.absarc(-hw, -hh, radius, Math.PI, Math.PI * 1.5, false);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.025,
    bevelThickness: 0.025,
    curveSegments: 10
  });

  geo.center();
  geo.computeVertexNormals();

  // Normalize UVs strictly into [0..1] across full slab bounds for crisp refraction & artwork mapping
  geo.computeBoundingBox();
  const min = geo.boundingBox.min;
  const max = geo.boundingBox.max;
  const spanX = Math.max(0.001, max.x - min.x);
  const spanY = Math.max(0.001, max.y - min.y);
  const posAttr = geo.attributes.position;
  const uvArr = new Float32Array(posAttr.count * 2);
  for (let i = 0; i < posAttr.count; i++) {
    uvArr[i * 2] = (posAttr.getX(i) - min.x) / spanX;
    uvArr[i * 2 + 1] = (posAttr.getY(i) - min.y) / spanY;
  }
  geo.setAttribute('uv', new THREE.BufferAttribute(uvArr, 2));
  return geo;
}
