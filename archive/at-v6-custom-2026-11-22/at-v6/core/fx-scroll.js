/* ============================================================================
   ARCH1CAT HYDRA-V6 — core/fx-scroll.js
   6-Chapter Virtual Inertial Scroll Controller (22.2 vh Total, Starts at /work)
   ============================================================================ */

import { bus, clamp, fpsLerpAlpha } from './state-bus.js';

export const CHAPTERS = [
  { id: 'home', start: 0.0, len: 4.0 },
  { id: 'about', start: 4.0, len: 1.0 },
  { id: 'work', start: 5.0, len: 10.0 },
  { id: 'tree', start: 15.0, len: 2.0 },
  { id: 'lab', start: 17.0, len: 1.2 },
  { id: 'footer', start: 18.2, len: 4.0 }
];

export const TOTAL_VH = 22.2;
const SEAM_HALF = 0.36;
const WORK_ENTRY_VH = 5.55; // Opens directly into /work helix (workProgress ~ 0.055)

export class FXScrollController {
  constructor() {
    const initialVh = this.resolveInitialRouteVh();
    this.targetVh = initialVh;
    this.currentVh = initialVh;
    this.prevVh = initialVh;
    this.scrollDelta = 0;
    this.locked = false;
    this.projectOpenedAt = 0;
    this.touchLastY = 0;
    this.draggingPill = false;

    this.thumbEl = document.getElementById('scroll-pill-thumb');
    this.trackEl = document.getElementById('scroll-pill-track');

    this.bindInputs();
    this.bindBus();
  }

  resolveInitialRouteVh() {
    const h = (window.location.hash || '').toLowerCase();
    if (h === '#home') return 0.25;
    if (h === '#about') return 4.35;
    if (h === '#lab') return 17.5;
    return WORK_ENTRY_VH;
  }

  bindBus() {
    bus.on('work/project', (proj) => {
      if (proj) {
        this.locked = true;
        this.projectOpenedAt = performance.now();
      } else if (!bus.get('ui/contact', false)) {
        this.locked = false;
      }
    });

    bus.on('ui/contact', (open) => {
      if (open) {
        this.locked = true;
      } else if (!bus.get('work/project', null)) {
        this.locked = false;
      }
    });

    bus.listen('scroll/toWorkIndex', ({ index, total }) => {
      const n = Math.max(1, total);
      const t = n <= 1 ? 0.1 : clamp(index / (n - 1), 0, 1);
      const localWork = 0.07 + t * 0.86;
      this.scrollToVh(5.0 + localWork * 10.0);
    });

    bus.listen('scroll/toChapter', (chapterId) => {
      const ch = CHAPTERS.find((c) => c.id === chapterId);
      if (!ch) return;
      this.scrollToVh(chapterId === 'work' ? WORK_ENTRY_VH : ch.start + ch.len * 0.35);
    });
  }

  scrollToVh(vh) {
    this.targetVh = clamp(vh, 0, TOTAL_VH);
  }

  handleDeltaPixels(dyPx) {
    if (bus.get('work/project', null)) {
      if (performance.now() - this.projectOpenedAt > 650 && Math.abs(dyPx) > 26) {
        bus.set('work/project', null);
      }
      return;
    }
    if (this.locked) return;
    const vhDelta = (dyPx / Math.max(500, window.innerHeight)) * 1.45;
    this.targetVh = clamp(this.targetVh + vhDelta, 0, TOTAL_VH);
  }

  bindInputs() {
    window.addEventListener('wheel', (e) => {
      if (e.target && e.target.closest && e.target.closest('.allow-native-scroll')) return;
      this.handleDeltaPixels(e.deltaY);
    }, { passive: true });

    window.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) this.touchLastY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const y = e.touches[0].clientY;
        const dy = (this.touchLastY - y) * 1.85;
        this.touchLastY = y;
        this.handleDeltaPixels(dy);
      }
    }, { passive: true });

    window.addEventListener('keydown', (e) => {
      const tag = (e.target?.tagName || '').toUpperCase();
      if (tag === 'TEXTAREA' || tag === 'INPUT') return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        this.handleDeltaPixels(e.key === 'PageDown' ? 520 : 210);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        this.handleDeltaPixels(e.key === 'PageUp' ? -520 : -210);
      }
    });

    if (this.trackEl) {
      const seekFromClientY = (clientY) => {
        if (this.locked) return;
        const rect = this.trackEl.getBoundingClientRect();
        const pct = clamp((clientY - rect.top) / Math.max(1, rect.height), 0, 1);
        this.targetVh = pct * TOTAL_VH;
      };
      this.trackEl.addEventListener('pointerdown', (e) => {
        this.draggingPill = true;
        seekFromClientY(e.clientY);
      });
      window.addEventListener('pointermove', (e) => {
        if (this.draggingPill) seekFromClientY(e.clientY);
      });
      window.addEventListener('pointerup', () => {
        this.draggingPill = false;
      });
    }
  }

  update(dtSec) {
    const alpha = fpsLerpAlpha(0.095, dtSec);
    this.prevVh = this.currentVh;
    this.currentVh += (this.targetVh - this.currentVh) * alpha;

    const rawVel = (this.prevVh - this.currentVh) * 18.0;
    this.scrollDelta += (clamp(rawVel, -3, 3) - this.scrollDelta) * fpsLerpAlpha(0.14, dtSec);

    const globalProgress = clamp(this.currentVh / TOTAL_VH, 0, 1);
    const workProgress = clamp((this.currentVh - 5.0) / 10.0, 0, 1);

    bus.set('scroll/vh', this.currentVh);
    bus.set('scroll/progress', globalProgress);
    bus.set('scroll/delta', this.scrollDelta);
    bus.set('work/scrollProgress', workProgress);

    if (this.thumbEl) {
      const trackH = Math.max(120, window.innerHeight - 36);
      const thumbH = 54;
      const y = 18 + globalProgress * (trackH - thumbH);
      this.thumbEl.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    }

    return this.computeChapterBlend(this.currentVh);
  }

  computeChapterBlend(vh) {
    for (let i = 0; i < CHAPTERS.length - 1; i++) {
      const cur = CHAPTERS[i];
      const next = CHAPTERS[i + 1];
      const boundary = next.start;
      if (vh >= boundary - SEAM_HALF && vh <= boundary + SEAM_HALF) {
        const t = clamp((vh - (boundary - SEAM_HALF)) / (SEAM_HALF * 2), 0, 1);
        return {
          primary: cur.id,
          secondary: next.id,
          transition: t,
          localPrimary: clamp((vh - cur.start) / cur.len, 0, 1),
          localSecondary: clamp((vh - next.start) / next.len, 0, 1)
        };
      }
    }
    let active = CHAPTERS[0];
    for (const c of CHAPTERS) {
      if (vh >= c.start) active = c;
    }
    bus.set('router/chapter', active.id);
    return {
      primary: active.id,
      secondary: null,
      transition: 0,
      localPrimary: clamp((vh - active.start) / active.len, 0, 1),
      localSecondary: 0
    };
  }
}
