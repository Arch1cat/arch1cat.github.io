/* ============================================================================
   ARCH1CAT HYDRA-V6 — core/state-bus.js
   Reactive AppState Bus, Custom Cubic-Bezier Solver & Frame-Normalized Tweener
   ============================================================================ */

export function cubicBezier(p1x, p1y, p2x, p2y) {
  const cx = 3 * p1x;
  const bx = 3 * (p2x - p1x) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * p1y;
  const by = 3 * (p2y - p1y) - cy;
  const ay = 1 - cy - by;

  const sampleX = (t) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t) => ((ay * t + by) * t + cy) * t;
  const sampleDerivX = (t) => (3 * ax * t + 2 * bx) * t + cx;

  return function solve(x) {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 6; i++) {
      const dx = sampleX(t) - x;
      if (Math.abs(dx) < 1e-5) break;
      const d = sampleDerivX(t);
      if (Math.abs(d) < 1e-6) break;
      t -= dx / d;
    }
    t = Math.max(0, Math.min(1, t));
    return sampleY(t);
  };
}

export const EASES = {
  linear: (t) => t,
  easeOutSine: (t) => Math.sin((t * Math.PI) / 2),
  easeInSine: (t) => 1 - Math.cos((t * Math.PI) / 2),
  easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
  easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
  easeInCubic: (t) => t * t * t,
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
  easeInQuart: (t) => t * t * t * t,
  easeOutQuint: (t) => 1 - Math.pow(1 - t, 5),
  workInOut: cubicBezier(0.29, 0.05, 0.06, 0.92)
};

export function fpsLerpAlpha(alpha60, dtSec) {
  const clamped = Math.max(0.001, Math.min(dtSec || 0.0166, 0.1));
  return 1 - Math.pow(1 - alpha60, clamped * 60);
}

export function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

export function smoothStep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
}

export function rangeMap(val, inMin, inMax, outMin, outMax, doClamp = false) {
  const t = (val - inMin) / (inMax - inMin || 1e-6);
  const res = outMin + (outMax - outMin) * t;
  if (!doClamp) return res;
  return outMin < outMax ? clamp(res, outMin, outMax) : clamp(res, outMax, outMin);
}

const SKIP_CHARS = new Set([' ', '\n', '/', '?', ',', '.', '-', ':', '>', '<', '[', ']', '(', ')']);

export function scrambleString(str, count, charset = '0123456789') {
  if (!str || str.length < 2 || count <= 0) return str;
  const arr = str.split('');
  const n = Math.min(arr.length * 2, Math.floor(count));
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * arr.length);
    if (!SKIP_CHARS.has(arr[idx])) {
      arr[idx] = charset.charAt(Math.floor(Math.random() * charset.length));
    }
  }
  return arr.join('');
}

const activeTweens = new Set();

export function tween(target, toProps, durationMs = 600, easeName = 'workInOut', delayMs = 0, onUpdate = null) {
  const keys = Object.keys(toProps);
  for (const existing of activeTweens) {
    if (existing.target === target) {
      for (const k of keys) delete existing.toProps[k];
      if (Object.keys(existing.toProps).length === 0) activeTweens.delete(existing);
    }
  }

  let resolvePromise;
  const promise = new Promise((res) => { resolvePromise = res; });
  const entry = {
    target,
    fromProps: {},
    toProps: { ...toProps },
    duration: Math.max(16, durationMs),
    delay: Math.max(0, delayMs),
    ease: EASES[easeName] || EASES.workInOut,
    startTime: performance.now(),
    started: false,
    onUpdate,
    resolve: resolvePromise
  };
  activeTweens.add(entry);

  return {
    promise,
    cancel() {
      activeTweens.delete(entry);
      resolvePromise(false);
    }
  };
}

export function tickTweens(nowMs) {
  for (const tw of activeTweens) {
    const elapsed = nowMs - tw.startTime - tw.delay;
    if (elapsed < 0) continue;
    if (!tw.started) {
      tw.started = true;
      for (const k of Object.keys(tw.toProps)) {
        tw.fromProps[k] = Number(tw.target[k]) || 0;
      }
    }
    const rawT = clamp(elapsed / tw.duration, 0, 1);
    const eased = tw.ease(rawT);
    for (const [k, endVal] of Object.entries(tw.toProps)) {
      const startVal = tw.fromProps[k] ?? 0;
      tw.target[k] = startVal + (endVal - startVal) * eased;
    }
    if (tw.onUpdate) tw.onUpdate(rawT, eased);
    if (rawT >= 1) {
      activeTweens.delete(tw);
      tw.resolve(true);
    }
  }
}

class StateBus {
  constructor() {
    this.state = new Map();
    this.subs = new Map();
    this.events = new Map();
  }

  get(key, fallback = undefined) {
    return this.state.has(key) ? this.state.get(key) : fallback;
  }

  set(key, val) {
    const prev = this.state.get(key);
    if (prev === val) return val;
    this.state.set(key, val);
    const list = this.subs.get(key);
    if (list) {
      for (const fn of [...list]) fn(val, prev);
    }
    return val;
  }

  on(key, fn, immediate = false) {
    if (!this.subs.has(key)) this.subs.set(key, new Set());
    this.subs.get(key).add(fn);
    if (immediate && this.state.has(key)) fn(this.state.get(key), undefined);
    return () => this.subs.get(key)?.delete(fn);
  }

  emit(event, payload) {
    const list = this.events.get(event);
    if (list) {
      for (const fn of [...list]) fn(payload);
    }
  }

  listen(event, fn) {
    if (!this.events.has(event)) this.events.set(event, new Set());
    this.events.get(event).add(fn);
    return () => this.events.get(event)?.delete(fn);
  }
}

export const bus = new StateBus();
