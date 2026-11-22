/* ============================================================================
   ARCH1CAT HYDRA-V6 — ui/loader-view.js
   Authentic Active Theory LoaderView + LoaderGLUI:
   - Solar Cyan/Cobalt Concentric Arcs & Radial Bars (LoaderBGShader.glsl)
   - Circular-Masked 16x30 '/' Matrix Mutating Digits + //0 -> /99 -> >>>
   - Guaranteed Non-Blocking Completion (<1.5s) & Context Cleanup
   ============================================================================ */

import * as THREE from 'three';
import { bus, tween } from '../core/state-bus.js';
import { SIMPLE_UI_VERT, LOADER_BG_FRAG } from '../shaders/ui-shaders.js';

const ROWS = 14;
const COLS = 28;

export class LoaderViewController {
  constructor() {
    this.root = document.getElementById('loader-view');
    this.canvas = document.getElementById('loader-gl-canvas');
    this.matrixEl = document.getElementById('loader-slash-matrix');
    this.percentEl = document.getElementById('loader-percent');

    this.state = { progress: 0, visible: 1, alpha: 1 };
    this.done = false;
    this.startTime = performance.now();

    this.initShaderCanvas();
    this.runSequence();
  }

  initShaderCanvas() {
    if (!this.canvas) return;
    try {
      const isQA = new URLSearchParams(window.location.search).has('qa');
      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: false, preserveDrawingBuffer: isQA });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      this.scene = new THREE.Scene();
      this.cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      this.mat = new THREE.ShaderMaterial({
        vertexShader: SIMPLE_UI_VERT,
        fragmentShader: LOADER_BG_FRAG,
        uniforms: {
          uTime: { value: 0 },
          uProgress: { value: 0.15 },
          uVisible: { value: 1 },
          uAlpha: { value: 1 },
          uBars: { value: 20 },
          uMobile: { value: window.innerWidth < 768 ? 1 : 0 },
          uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
        },
        transparent: true,
        depthTest: false,
        depthWrite: false
      });
      this.scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.mat));
    } catch (_) {
      this.renderer = null;
    }
  }

  renderSlashMatrix(pctInt) {
    if (!this.matrixEl) return;
    const digits = String(pctInt);
    const lines = [];
    for (let r = 0; r < ROWS; r++) {
      let row = '';
      for (let c = 0; c < COLS; c++) {
        if (Math.random() < 0.09) {
          row += digits.charAt(Math.floor(Math.random() * digits.length));
        } else {
          row += '/';
        }
      }
      lines.push(row);
    }
    this.matrixEl.textContent = lines.join('\n');
  }

  runSequence() {
    let lastMatrixTick = 0;

    const step = (now) => {
      if (this.done) return;
      const tSec = (now - this.startTime) * 0.001;

      if (now - lastMatrixTick > 75 && this.state.progress < 1) {
        lastMatrixTick = now;
        const pct = Math.min(99, Math.floor(this.state.progress * 100));
        this.renderSlashMatrix(pct);
        if (this.percentEl) {
          this.percentEl.textContent = pct < 10 ? `//${pct}` : `/${pct}`;
        }
      }

      if (this.renderer && this.mat) {
        this.mat.uniforms.uTime.value = tSec;
        this.mat.uniforms.uProgress.value = Math.max(0.15, this.state.progress);
        this.mat.uniforms.uVisible.value = this.state.visible;
        this.mat.uniforms.uAlpha.value = this.state.alpha;
        this.renderer.render(this.scene, this.cam);
      }

      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);

    // Start stage reveal smoothly at 750ms and finish loader at 1150ms
    setTimeout(() => bus.emit('stage/reveal'), 750);

    tween(this.state, { progress: 1 }, 980, 'easeInOutCubic').promise.then(() => {
      if (this.percentEl) this.percentEl.textContent = '>>>';
      if (this.matrixEl) this.matrixEl.style.opacity = '0';
      bus.emit('stage/reveal');

      tween(this.state, { visible: 0, alpha: 0 }, 380, 'easeOutCubic', 90, () => {
        if (this.root) this.root.style.opacity = String(this.state.alpha);
      }).promise.then(() => {
        this.done = true;
        if (this.root) this.root.style.display = 'none';
        if (this.renderer) {
          this.renderer.dispose();
          this.renderer = null;
        }
        bus.set('loader/complete', true);
      });
    });

    // Hard fail-safe so software/background tabs never hang on LoaderView
    setTimeout(() => {
      if (!this.done) {
        this.done = true;
        bus.emit('stage/reveal');
        if (this.root) this.root.style.display = 'none';
        if (this.renderer) {
          this.renderer.dispose();
          this.renderer = null;
        }
        bus.set('loader/complete', true);
      }
    }, 1550);
  }
}
