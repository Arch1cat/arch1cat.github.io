/* ============================================================================
   ARCH1CAT HYDRA-V6 — ui/nav-and-contact-ui.js
   Top-Right Shader Capsule NavUI (NavBGShader + NavAudioShader + EN|UA)
   + Fullscreen Frosted ContactUI Modal (Globe, 12fps Hub Glitch, QR Sync)
   ============================================================================ */

import * as THREE from 'three';
import { bus, scrambleString, tween } from '../core/state-bus.js';
import { UI_I18N } from '../data/ui-i18n.js';
import { SIMPLE_UI_VERT, NAV_BG_FRAG, NAV_AUDIO_FRAG } from '../shaders/ui-shaders.js';

export class NavAndContactUI {
  constructor(soundEngine) {
    this.sound = soundEngine;
    this.navCanvas = document.getElementById('nav-shader-canvas');
    this.workBtn = document.getElementById('nav-work-btn');
    this.audioBtn = document.getElementById('nav-audio-btn');
    this.langBtn = document.getElementById('nav-lang-btn');
    this.contactBtn = document.getElementById('nav-contact-btn');

    this.contactOverlay = document.getElementById('contact-ui');
    this.contactTitleEl = document.getElementById('contact-title');
    this.contactSubEl = document.getElementById('contact-sub');
    this.syncLabelEl = document.getElementById('contact-sync-label');
    this.hubEls = Array.from(document.querySelectorAll('[data-hub-code]'));
    this.copyBtn = document.getElementById('contact-copy-btn');
    this.labDock = document.getElementById('lab-dock');

    this.anim = { amp: 0, hoverAudio: 0, uiBlend: 0 };

    this.initNavShader();
    this.bindEvents();
    this.syncLabels();
  }

  initNavShader() {
    if (!this.navCanvas) return;
    try {
      const isQA = new URLSearchParams(window.location.search).has('qa');
      this.renderer = new THREE.WebGLRenderer({ canvas: this.navCanvas, alpha: true, antialias: true, preserveDrawingBuffer: isQA });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.setSize(330, 86, false);

      this.scene = new THREE.Scene();
      this.cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      this.bgMat = new THREE.ShaderMaterial({
        vertexShader: SIMPLE_UI_VERT,
        fragmentShader: NAV_BG_FRAG,
        uniforms: {
          uTime: { value: 0 },
          uScroll: { value: 0 },
          uScrollDelta: { value: 0 },
          uHeight: { value: 0.24 },
          uColor: { value: new THREE.Color('#090c13') },
          uUIColor: { value: new THREE.Color('#00f2fe') },
          uUIBlend: { value: 0 },
          uAlpha: { value: 1 }
        },
        transparent: true,
        depthTest: false,
        depthWrite: false
      });
      this.scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.bgMat));

      this.waveMat = new THREE.ShaderMaterial({
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position.xy * vec2(0.095, 0.20) + vec2(-0.168, 0.0), 0.0, 1.0);
          }
        `,
        fragmentShader: NAV_AUDIO_FRAG,
        uniforms: {
          uTime: { value: 0 },
          uScroll: { value: 0 },
          uAmplitude: { value: 0 },
          uHover: { value: 0 },
          uAlpha: { value: 1 }
        },
        transparent: true,
        depthTest: false,
        depthWrite: false
      });
      this.scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.waveMat));
    } catch (_) {
      this.renderer = null;
    }
  }

  scrambleElement(el, finalStr, durationMs = 360) {
    if (!el) return;
    const start = performance.now();
    const tick = (now) => {
      const t = (now - start) / durationMs;
      if (t >= 1) {
        el.textContent = finalStr;
        return;
      }
      const amt = Math.ceil((1 - t) * finalStr.length * 1.4);
      el.textContent = scrambleString(finalStr, amt, '0123456789/X');
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  runHubGlitch() {
    this.hubEls.forEach((el, idx) => {
      const target = el.getAttribute('data-hub-code') || 'HRK';
      setTimeout(() => this.scrambleElement(el, target, 520), 120 + idx * 140);
    });
  }

  syncLabels() {
    const lang = bus.get('ui/lang', 'en');
    const d = UI_I18N[lang] || UI_I18N.en;
    const contactOpen = Boolean(bus.get('ui/contact', false));

    if (this.workBtn) this.workBtn.textContent = d.navWork;
    if (this.langBtn) this.langBtn.textContent = lang === 'uk' ? 'UA' : 'EN';
    if (this.contactBtn) this.scrambleElement(this.contactBtn, contactOpen ? d.navClose : d.navContact, 320);
    if (this.contactTitleEl) this.contactTitleEl.textContent = d.contactTitle;
    if (this.contactSubEl) this.contactSubEl.textContent = d.contactSub;
    if (this.syncLabelEl) this.syncLabelEl.textContent = d.syncLabel;
  }

  bindEvents() {
    this.workBtn?.addEventListener('mouseenter', () => {
      const d = UI_I18N[bus.get('ui/lang', 'en')] || UI_I18N.en;
      this.scrambleElement(this.workBtn, d.navWork, 280);
    });
    this.workBtn?.addEventListener('click', () => {
      bus.emit('sfx/click');
      bus.set('ui/contact', false);
      bus.set('work/project', null);
      bus.emit('scroll/toChapter', 'work');
    });

    this.audioBtn?.addEventListener('mouseenter', () => {
      tween(this.anim, { hoverAudio: 1 }, 240, 'easeOutCubic');
    });
    this.audioBtn?.addEventListener('mouseleave', () => {
      tween(this.anim, { hoverAudio: 0 }, 240, 'easeOutCubic');
    });
    this.audioBtn?.addEventListener('click', () => {
      this.sound.toggleAudio();
    });

    this.langBtn?.addEventListener('click', () => {
      bus.emit('sfx/click');
      const next = bus.get('ui/lang', 'en') === 'en' ? 'uk' : 'en';
      try { localStorage.setItem('arch1cat_lang', next); } catch (_) {}
      bus.set('ui/lang', next);
    });

    this.contactBtn?.addEventListener('mouseenter', () => {
      const d = UI_I18N[bus.get('ui/lang', 'en')] || UI_I18N.en;
      const lbl = bus.get('ui/contact', false) ? d.navClose : d.navContact;
      this.scrambleElement(this.contactBtn, lbl, 280);
    });
    this.contactBtn?.addEventListener('click', () => {
      bus.emit('sfx/click');
      const next = !bus.get('ui/contact', false);
      if (next) bus.set('work/project', null);
      bus.set('ui/contact', next);
    });

    this.copyBtn?.addEventListener('click', () => {
      navigator.clipboard?.writeText('https://t.me/Archi_____cat').catch(() => {});
      this.scrambleElement(this.copyBtn, 'COPIED: @ARCHI_____CAT ✓', 340);
      setTimeout(() => this.scrambleElement(this.copyBtn, 'COPY DIRECT TG HANDLE', 300), 2200);
    });

    bus.on('audio/playing', (playing) => {
      tween(this.anim, { amp: playing ? 1 : 0 }, 450, 'workInOut');
    });

    bus.on('ui/contact', (open) => {
      this.contactOverlay?.classList.toggle('is-open', Boolean(open));
      this.syncLabels();
      if (open) this.runHubGlitch();
    });

    bus.on('ui/lang', () => this.syncLabels());

    bus.on('work/project', (proj) => {
      if (proj && this.bgMat) {
        this.bgMat.uniforms.uUIColor.value.set(`#${proj.uiColor || '00f2fe'}`);
        tween(this.anim, { uiBlend: 1 }, 650, 'workInOut');
      } else {
        tween(this.anim, { uiBlend: 0 }, 500, 'workInOut');
      }
    });

    bus.on('router/chapter', (ch) => {
      const showLab = ch === 'lab' && !bus.get('work/project') && !bus.get('ui/contact');
      this.labDock?.classList.toggle('is-visible', showLab);
    });
  }

  update(timeSec) {
    if (!this.renderer || !this.bgMat || !this.waveMat) return;
    const sp = bus.get('scroll/progress', 0);
    const sd = bus.get('scroll/delta', 0);

    this.bgMat.uniforms.uTime.value = timeSec;
    this.bgMat.uniforms.uScroll.value = sp;
    this.bgMat.uniforms.uScrollDelta.value = sd;
    this.bgMat.uniforms.uUIBlend.value = this.anim.uiBlend;

    this.waveMat.uniforms.uTime.value = timeSec;
    this.waveMat.uniforms.uScroll.value = sp;
    this.waveMat.uniforms.uAmplitude.value = this.anim.amp;
    this.waveMat.uniforms.uHover.value = this.anim.hoverAudio;

    this.renderer.render(this.scene, this.cam);
  }
}
