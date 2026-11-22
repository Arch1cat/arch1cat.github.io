/* ============================================================================
   ARCH1CAT HYDRA-V6 — core/app.js
   Master Stage Bootstrapper, URL Hash Router & 60/120fps Render Loop
   ============================================================================ */

import * as THREE from 'three';
import { bus, tickTweens } from './state-bus.js';
import { PROJECTS_CATALOG } from '../data/projects-catalog.js';
import { buildSharedTextures } from './procedural-textures.js';
import { MouseFluidSolver } from './mouse-fluid.js';
import { FXScrollController } from './fx-scroll.js';
import { WorkSceneController } from '../scenes/work-scene.js';
import { WorkDetailSceneController } from '../scenes/work-detail-scene.js';
import { WorldChaptersController } from '../scenes/world-chapters.js';
import { PostCompositor } from './post-compositor.js';
import { SoundEngine } from '../audio/sound-engine.js';
import { LoaderViewController } from '../ui/loader-view.js';
import { NavAndContactUI } from '../ui/nav-and-contact-ui.js';
import { ChatDOMController } from '../ui/chat-dom.js';

class Arch1catHydraApp {
  constructor() {
    let savedLang = 'en';
    try {
      const s = localStorage.getItem('arch1cat_lang');
      if (s === 'uk' || s === 'en') savedLang = s;
    } catch (_) {}

    bus.set('ui/lang', savedLang);
    bus.set('router/chapter', 'work');
    bus.set('work/filter', 'all');
    bus.set('work/project', null);
    bus.set('ui/contact', false);

    this.canvas = document.getElementById('stage-canvas');
    const isQA = new URLSearchParams(window.location.search).has('qa');
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: false,
      powerPreference: 'high-performance',
      stencil: false,
      preserveDrawingBuffer: isQA
    });

    let isSoftwareGL = false;
    try {
      const gl = this.renderer.getContext();
      const dbg = gl.getExtension('WEBGL_debug_renderer_info');
      const rName = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_GL) : '';
      isSoftwareGL = /swiftshader|software|llvmpipe|basic render/i.test(String(rName));
    } catch (_) {}
    bus.set('gpu/software', isSoftwareGL);

    this.dpr = isSoftwareGL ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(this.dpr);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.autoClear = false;

    this.sharedTextures = buildSharedTextures();
    this.fluid = new MouseFluidSolver(this.renderer);
    this.fxScroll = new FXScrollController();

    this.workScene = new WorkSceneController(this.renderer, this.sharedTextures, this.fluid);
    this.detailScene = new WorkDetailSceneController(this.renderer, this.sharedTextures, this.fluid, this.workScene);
    this.worldChapters = new WorldChaptersController(this.renderer, this.sharedTextures);
    this.compositor = new PostCompositor(
      this.renderer,
      this.sharedTextures,
      this.fluid,
      this.workScene,
      this.detailScene,
      this.worldChapters
    );

    this.sound = new SoundEngine();
    this.loader = new LoaderViewController();
    this.navContact = new NavAndContactUI(this.sound);
    this.chat = new ChatDOMController();

    this.startTime = performance.now();
    this.lastFrameTime = this.startTime;

    this.populateA11yTree();
    this.bindGlobalEvents();
    this.syncInitialHash();

    requestAnimationFrame((now) => this.loop(now));
  }

  populateA11yTree() {
    const a11yWork = document.getElementById('gl-a11y-work');
    if (!a11yWork) return;
    a11yWork.replaceChildren();
    for (const proj of PROJECTS_CATALOG) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = `${proj.en.titleFlat} — ${proj.en.meta}`;
      btn.dataset.slug = proj.slug;
      btn.addEventListener('click', () => bus.set('work/project', proj));
      a11yWork.appendChild(btn);
    }
  }

  syncInitialHash() {
    const raw = (window.location.hash || '').replace(/^#\/?/, '').toLowerCase();
    if (raw === 'contact') {
      bus.set('ui/contact', true);
    } else if (raw.startsWith('work/')) {
      const slug = raw.slice(5);
      const found = PROJECTS_CATALOG.find((p) => p.slug === slug);
      if (found) bus.set('work/project', found);
    }

    const syncModalBodyClass = () => {
      document.body.classList.toggle(
        'modal-open',
        Boolean(bus.get('work/project')) || Boolean(bus.get('ui/contact'))
      );
    };

    bus.on('work/project', (proj) => {
      syncModalBodyClass();
      if (proj) {
        history.replaceState(null, '', `#work/${proj.slug}`);
      } else if (!bus.get('ui/contact')) {
        history.replaceState(null, '', '#work');
      }
    });

    bus.on('ui/contact', (open) => {
      syncModalBodyClass();
      if (open) history.replaceState(null, '', '#contact');
      else if (!bus.get('work/project')) history.replaceState(null, '', '#work');
    });
  }

  bindGlobalEvents() {
    window.addEventListener('pointermove', (e) => {
      const nx = e.clientX / Math.max(1, window.innerWidth);
      const ny = e.clientY / Math.max(1, window.innerHeight);
      const tSec = (performance.now() - this.startTime) * 0.001;
      this.fluid.onPointerMove(nx, ny);
      this.workScene.onPointerMove(nx, ny, tSec);
      this.detailScene.onPointerMove(nx, ny);
    }, { passive: true });

    this.canvas?.addEventListener('click', () => {
      this.workScene.onClick();
    });

    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.dpr = bus.get('gpu/software') ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      this.renderer.setPixelRatio(this.dpr);
      this.renderer.setSize(w, h);
      this.fluid.onResize(w, h);
      this.workScene.onResize(w, h, this.dpr);
      this.detailScene.onResize(w, h, this.dpr);
      this.worldChapters.onResize(w, h);
      this.compositor.onResize(w, h, this.dpr);
    });
  }

  loop(now) {
    const dtSec = Math.min(0.1, Math.max(0.001, (now - this.lastFrameTime) * 0.001));
    this.lastFrameTime = now;
    const timeSec = (now - this.startTime) * 0.001;

    tickTweens(now);
    this.fluid.update();
    const blendInfo = this.fxScroll.update(dtSec);
    this.compositor.renderFrame(blendInfo, timeSec, dtSec);
    this.navContact.update(timeSec);

    requestAnimationFrame((t) => this.loop(t));
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.__ARCH1CAT_V6__ = new Arch1catHydraApp();
});
