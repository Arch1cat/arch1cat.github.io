/* ============================================================================
   ARCH1CAT HYDRA-V6 — ui/chat-dom.js
   Bottom-Left Conversational Terminal & Case Study Readout (Port of ChatDOM):
   - WHAT ARE YOU LOOKING FOR? + 5 Scrambled Category Filters
   - Expandable Pill Input + #00ffff Cursor + 3-Dot Thinking State + Arch1catAI
   - Automatic Case Study Transformation on WorkDetail Open (<- CLOSE / ESC)
   ============================================================================ */

import { bus, scrambleString } from '../core/state-bus.js';
import { PROJECTS_CATALOG } from '../data/projects-catalog.js';
import { UI_I18N } from '../data/ui-i18n.js';
import { queryArchitectAI } from '../data/architect-kb.js';

export class ChatDOMController {
  constructor() {
    this.root = document.getElementById('chat-dom');
    this.browseWrap = document.getElementById('chat-browse-mode');
    this.promptEl = document.getElementById('chat-prompt-header');
    this.filtersEl = document.getElementById('chat-filters-list');
    this.replyBox = document.getElementById('chat-ai-reply');
    this.dotsEl = document.getElementById('chat-thinking-dots');
    this.replyTextEl = document.getElementById('chat-reply-text');
    this.inputWrap = document.getElementById('chat-input-pill');
    this.inputEl = document.getElementById('chat-textarea');

    this.detailWrap = document.getElementById('chat-detail-mode');
    this.detTitleEl = document.getElementById('det-title');
    this.detMetaEl = document.getElementById('det-meta');
    this.detBodyEl = document.getElementById('det-body');
    this.detLiveEl = document.getElementById('det-live-link');
    this.detSourceEl = document.getElementById('det-source-link');
    this.detCloseBtn = document.getElementById('det-close-btn');

    this.centerHud = document.getElementById('detail-center-hud');
    this.centerLaunchBtn = document.getElementById('detail-launch-btn');
    this.centerScrollCue = document.getElementById('detail-scroll-cue');

    this.activeFilter = 'all';

    this.renderFilters();
    this.bindEvents();
    this.bindBus();
  }

  scrambleWrite(el, text, durationMs = 360, delayMs = 0) {
    if (!el) return;
    const token = (el.__scrambleToken || 0) + 1;
    el.__scrambleToken = token;
    const str = String(text || '');
    el.textContent = delayMs > 0 ? scrambleString(str, Math.min(8, str.length), '0123456789/_') : scrambleString(str, 5, '0123456789/_');

    setTimeout(() => {
      if (el.__scrambleToken !== token) return;
      const start = performance.now();
      const step = (now) => {
        if (el.__scrambleToken !== token) return;
        const p = (now - start) / durationMs;
        if (p >= 1) {
          el.textContent = str;
          return;
        }
        const visibleChars = Math.max(1, Math.floor(str.length * Math.min(1, 0.35 + p * 0.85)));
        const slice = str.slice(0, visibleChars);
        el.textContent = scrambleString(slice, Math.ceil((1 - p) * 8), '0123456789/_');
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delayMs);
  }

  renderFilters() {
    const lang = bus.get('ui/lang', 'en');
    const d = UI_I18N[lang] || UI_I18N.en;
    if (this.promptEl) this.scrambleWrite(this.promptEl, d.promptHeader, 380, 0);
    if (this.inputEl) this.inputEl.placeholder = d.placeholder;
    if (this.centerScrollCue) this.centerScrollCue.textContent = d.detailScrollCue;
    if (!this.filtersEl) return;

    this.filtersEl.replaceChildren();
    d.filters.forEach((f, idx) => {
      if (f.tag === 'all' && this.activeFilter === 'all') return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chat-filter-btn' + (this.activeFilter === f.tag ? ' is-active' : '');
      btn.dataset.tag = f.tag;
      this.scrambleWrite(btn, f.label, 340, 70 + idx * 55);
      btn.addEventListener('click', () => {
        bus.emit('sfx/click');
        const nextTag = this.activeFilter === f.tag ? 'all' : f.tag;
        this.activeFilter = nextTag;
        bus.set('work/filter', nextTag);
        this.renderFilters();
      });
      this.filtersEl.appendChild(btn);
    });
  }

  submitQuery(raw) {
    const query = (raw || '').trim();
    if (!query) return;
    bus.emit('sfx/click');
    const lang = bus.get('ui/lang', 'en');
    if (this.replyBox) this.replyBox.classList.add('is-visible');
    if (this.dotsEl) this.dotsEl.style.display = 'inline-block';
    if (this.replyTextEl) this.replyTextEl.textContent = '';

    const result = queryArchitectAI(query, lang);
    setTimeout(() => {
      if (this.dotsEl) this.dotsEl.style.display = 'none';
      this.scrambleWrite(this.replyTextEl, result.reply, 520, 0);

      if (result.openContact) {
        setTimeout(() => bus.set('ui/contact', true), 380);
      } else {
        if (result.filterCategory && result.filterCategory !== this.activeFilter) {
          this.activeFilter = result.filterCategory;
          bus.set('work/filter', result.filterCategory);
          this.renderFilters();
        }
        if (result.focusSlug) {
          const matched = PROJECTS_CATALOG.filter((p) => this.activeFilter === 'all' || p.category === this.activeFilter);
          const idx = matched.findIndex((p) => p.slug === result.focusSlug);
          if (idx >= 0) {
            bus.emit('scroll/toWorkIndex', { index: idx, total: matched.length });
          }
        }
      }
    }, 320);
  }

  openDetailView(proj) {
    const lang = bus.get('ui/lang', 'en');
    const d = UI_I18N[lang] || UI_I18N.en;
    const loc = proj[lang] || proj.en;

    this.browseWrap?.classList.add('is-hidden');
    this.detailWrap?.classList.add('is-visible');
    this.centerHud?.classList.add('is-visible');

    if (this.detTitleEl) {
      this.detTitleEl.style.color = `#${proj.uiColor || '00f2fe'}`;
      this.scrambleWrite(this.detTitleEl, loc.titleFlat, 380, 80);
    }
    this.scrambleWrite(this.detMetaEl, loc.meta, 420, 180);
    this.scrambleWrite(this.detBodyEl, loc.body, 560, 280);

    if (this.detLiveEl) {
      this.detLiveEl.href = proj.projectURL;
      this.scrambleWrite(this.detLiveEl, d.detailLive, 360, 420);
    }
    if (this.detSourceEl) {
      this.detSourceEl.href = proj.sourceURL;
      const customSrc = proj.sourceLabel && proj.sourceLabel[lang];
      this.scrambleWrite(this.detSourceEl, customSrc || d.detailSource, 360, 480);
    }
    if (this.detCloseBtn) {
      this.scrambleWrite(this.detCloseBtn, d.detailClose, 320, 540);
    }
    if (this.centerLaunchBtn) {
      this.centerLaunchBtn.href = proj.projectURL;
    }
  }

  closeDetailView() {
    this.detailWrap?.classList.remove('is-visible');
    this.browseWrap?.classList.remove('is-hidden');
    this.centerHud?.classList.remove('is-visible');
  }

  bindEvents() {
    this.inputEl?.addEventListener('focus', () => {
      this.inputWrap?.classList.add('is-extended');
    });
    this.inputEl?.addEventListener('blur', () => {
      if (!this.inputEl.value.trim()) this.inputWrap?.classList.remove('is-extended');
    });
    this.inputEl?.addEventListener('input', () => {
      this.inputWrap?.classList.toggle('is-extended', this.inputEl.value.length > 0);
    });
    this.inputEl?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const val = this.inputEl.value;
        this.inputEl.value = '';
        this.submitQuery(val);
      }
    });

    this.detCloseBtn?.addEventListener('click', () => {
      bus.emit('sfx/click');
      bus.set('work/project', null);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (bus.get('work/project')) bus.set('work/project', null);
        if (bus.get('ui/contact')) bus.set('ui/contact', false);
      }
    });
  }

  bindBus() {
    bus.on('work/project', (proj) => {
      if (proj) this.openDetailView(proj);
      else this.closeDetailView();
    });

    bus.on('ui/lang', () => {
      this.renderFilters();
      const activeProj = bus.get('work/project', null);
      if (activeProj) this.openDetailView(activeProj);
    });

    const syncVisibility = () => {
      const inWork = bus.get('router/chapter', 'work') === 'work' || Boolean(bus.get('work/project'));
      const contactOpen = Boolean(bus.get('ui/contact', false));
      this.root?.classList.toggle('is-hidden-chapter', !inWork || contactOpen);
    };
    bus.on('router/chapter', syncVisibility);
    bus.on('ui/contact', syncVisibility);
    bus.on('work/project', syncVisibility);
  }
}
