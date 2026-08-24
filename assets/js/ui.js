/* ============================================================
   ARCHIVE//01 — ui.js
   Title card · scramble · reveal · rail · cursor · magnets ·
   tilt · telemetry · audio v3 · meow easter egg
   ============================================================ */

const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = window.matchMedia('(pointer: fine)').matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;

/* ------------------------------------------------------------
   1. TITLE CARD
   ------------------------------------------------------------ */
(function titleCard() {
    const overlay = document.getElementById('boot-overlay');
    if (!overlay) return;
    const done = () => {
        if (document.body.style.overflow === 'hidden') document.body.style.overflow = '';
        window.dispatchEvent(new CustomEvent('archive:ready'));
    };
    if (RM || sessionStorage.getItem('archiveTitleDone')) {
        overlay.remove();
        done();
        return;
    }
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        overlay.classList.add('boot-hide');
        sessionStorage.setItem('archiveTitleDone', '1');
        setTimeout(() => { overlay.remove(); done(); }, 550);
    }, 1600);
})();

/* ------------------------------------------------------------
   2. SCRAMBLE DECODE
   ------------------------------------------------------------ */
const GLYPHS = '—/\\|▪▸<>_#01';
function scramble(el) {
    if (el.dataset.scrambled) return;
    el.dataset.scrambled = '1';
    if (RM) return;
    const original = el.textContent;
    const len = original.length;
    const start = performance.now();
    const DUR = 700;
    (function frame(now) {
        const p = clamp((now - start) / DUR, 0, 1);
        const solidCount = Math.floor(p * len);
        let out = original.slice(0, solidCount);
        for (let i = solidCount; i < len; i++) {
            out += original[i] === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        el.textContent = out;
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = original;
    })(start);
}
var scrambleObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
        if (e.isIntersecting) { scramble(e.target); scrambleObserver.unobserve(e.target); }
    });
}, { threshold: 0.4 });
document.querySelectorAll('[data-scramble]').forEach((el) => scrambleObserver.observe(el));

/* ------------------------------------------------------------
   3. REVEAL ON SCROLL
   ------------------------------------------------------------ */
(function reveals() {
    const els = document.querySelectorAll('.reveal');
    if (RM) { els.forEach((el) => el.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
    }, { threshold: 0.15 });
    els.forEach((el) => io.observe(el));
})();

/* ------------------------------------------------------------
   4. CHAPTER RAIL (sync with three-scene via chapterchange)
   ------------------------------------------------------------ */
(function rail() {
    const buttons = [...document.querySelectorAll('.rail-item')];
    const MAP = { prologue: '#about', works: '#projects', flagship: '#flagship', signal: '#activity' };
    buttons.forEach((b) => b.addEventListener('click', () => {
        const target = document.querySelector(b.dataset.target);
        if (target) target.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' });
    }));
    window.addEventListener('chapterchange', (e) => {
        const sel = MAP[e.detail?.name];
        buttons.forEach((b) => b.classList.toggle('active', !!sel && b.dataset.target === sel));
    });
    // initial state without waiting for scene
    const first = document.querySelector('[data-chapter="prologue"]');
    if (first) {
        const io = new IntersectionObserver((es) => {
            es.forEach((e) => {
                if (e.isIntersecting) {
                    buttons.forEach((b) => b.classList.toggle('active', b.dataset.target === '#about'));
                    io.disconnect();
                }
            });
        }, { rootMargin: '-45% 0px -45% 0px' });
        io.observe(first);
    }
})();

/* ------------------------------------------------------------
   5. PRECISION CURSOR + CLICK RIPPLE
   ------------------------------------------------------------ */
(function cursor() {
    if (!FINE || RM) return;
    document.documentElement.classList.add('cursor-on');
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });

    (function loop() {
        rx = lerp(rx, mx, 0.18); ry = lerp(ry, my, 0.18);
        dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
        ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
        requestAnimationFrame(loop);
    })();

    const HOVER_SEL = 'a, button, .plate, .btn-archive';
    document.addEventListener('mouseover', (e) => {
        ring.classList.toggle('grow', !!e.target.closest(HOVER_SEL));
    });

    // unified click ripple (mirrors the WebGL wave)
    addEventListener('pointerdown', (e) => {
        if (e.target.closest('a, button')) return; // links handle their own feedback
        spawnRipple(e.clientX, e.clientY);
    });
})();
function spawnRipple(x, y) {
    const r = document.createElement('div');
    r.className = 'click-ripple';
    r.style.left = x + 'px'; r.style.top = y + 'px';
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 520);
}

/* ------------------------------------------------------------
   6. MAGNETIC BUTTONS + PLATE TILT + SPOTLIGHT VARS
   (single shared rAF manager)
   ------------------------------------------------------------ */
(function interactives() {
    if (!FINE || RM) return;
    const magnets = [...document.querySelectorAll('.magnetic')].map((el) => ({
        el, tx: 0, ty: 0, cx: 0, cy: 0, hover: false,
    }));
    const tilts = [...document.querySelectorAll('.tilt-plate')].map((el) => ({
        el, rx: 0, ry: 0, crx: 0, cry: 0,
    }));

    magnets.forEach((m) => {
        m.el.addEventListener('pointerenter', () => { m.hover = true; });
        m.el.addEventListener('pointerleave', () => { m.hover = false; });
    });

    document.addEventListener('pointermove', (e) => {
        for (const m of magnets) {
            const r = m.el.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            const inside = e.target.closest && e.target.closest('.magnetic') === m.el;
            const pull = inside ? 8 : 3;
            m.tx = m.hover ? clamp(dx * 0.18, -pull, pull) : 0;
            m.ty = m.hover ? clamp(dy * 0.18, -pull, pull) : 0;
        }
        for (const t of tilts) {
            const r = t.el.getBoundingClientRect();
            if (e.clientX < r.left - 80 || e.clientX > r.right + 80 ||
                e.clientY < r.top - 80 || e.clientY > r.bottom + 80) continue;
            const px = (e.clientX - r.left) / r.width;
            const py = (e.clientY - r.top) / r.height;
            t.crx = (py - 0.5) * -5;
            t.cry = (px - 0.5) * 5;
            t.el.style.setProperty('--mx', `${px * 100}%`);
            t.el.style.setProperty('--my', `${py * 100}%`);
        }
    }, { passive: true });

    (function loop() {
        for (const m of magnets) {
            m.cx = lerp(m.cx, m.tx, 0.15);
            m.cy = lerp(m.cy, m.ty, 0.15);
            if (Math.abs(m.cx) > 0.05 || Math.abs(m.cy) > 0.05 || m.hover) {
                m.el.style.transform = `perspective(600px) translate(${m.cx.toFixed(2)}px, ${m.cy.toFixed(2)}px)`;
            } else if (m.el.style.transform) {
                m.el.style.transform = '';
            }
        }
        for (const t of tilts) {
            t.rx = lerp(t.rx, t.crx, 0.12);
            t.ry = lerp(t.ry, t.cry, 0.12);
            if (Math.abs(t.rx) > 0.08 || Math.abs(t.ry) > 0.08) {
                t.el.style.transform = `perspective(900px) rotateX(${t.rx.toFixed(2)}deg) rotateY(${t.ry.toFixed(2)}deg)`;
            } else if (t.el.style.transform && !t.el.matches(':hover')) {
                t.el.style.transform = '';
            }
        }
        requestAnimationFrame(loop);
    })();
})();

/* ------------------------------------------------------------
   7. GITHUB TELEMETRY (cache TTL 60min + fallbacks)
   Fallback snapshot taken live on 2026-08-24:
   repos=8 stars(sum of 4)=0 followers=0
   ------------------------------------------------------------ */
(function telemetry() {
    const KEY = 'archive_gh_v1';
    const TTL = 60 * 60 * 1000;
    const FALLBACK = { repos: 8, stars: 0, followers: 0 };
    const starEls = {};
    document.querySelectorAll('[data-star-repo]').forEach((el) => { starEls[el.dataset.starRepo] = el; });

    function render(d, animate) {
        setCounter('#stat-repos', d.repos, animate, (v) => String(v).padStart(2, '0'));
        setCounter('#stat-stars', d.stars, animate, (v) => '★★ ' + String(v).padStart(2, '0'));
        setCounter('#stat-followers', d.followers, animate, (v) => String(v).padStart(2, '0'));
        Object.entries(starEls).forEach(([repo, el]) => {
            if (d.perRepo && d.perRepo[repo] > 0) {
                el.textContent = `★ ${d.perRepo[repo]}`;
                el.classList.remove('hidden');
            }
        });
    }

    function setCounter(sel, target, animate, fmt) {
        const el = document.querySelector(sel);
        if (!el) return;
        if (!animate || RM) { el.textContent = fmt(target); return; }
        const start = performance.now();
        const DUR = 1400;
        (function tick(now) {
            const p = clamp((now - start) / DUR, 0, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = fmt(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
        })(start);
    }

    async function fetchLive() {
        const base = 'https://api.github.com';
        const [user, ...repos] = await Promise.all([
            fetch(base + '/users/l2bote4game').then((r) => r.json()),
            ...['world-monitor', 'wifiscaner', 'media-meta-cleaner', 'cats-match3-game', 'openGym']
                .map((n) => fetch(`${base}/repos/l2bote4game/${n}`).then((r) => r.json())),
        ]);
        const perRepo = {};
        let stars = 0;
        const NAMES = ['world-monitor', 'wifiscaner', 'media-meta-cleaner', 'cats-match3-game', 'openGym'];
        repos.forEach((r, i) => {
            const name = NAMES[i];
            perRepo[name] = typeof r.stargazers_count === 'number' ? r.stargazers_count : 0;
            stars += perRepo[name];
        });
        return { repos: user.public_repos ?? FALLBACK.repos, stars, followers: user.followers ?? FALLBACK.followers, perRepo };
    }

    try {
        const cached = JSON.parse(localStorage.getItem(KEY) || 'null');
        if (cached && Date.now() - cached.t < TTL) {
            render(cached.data, true);
            return;
        }
    } catch (_) { /* ignore corrupt cache */ }

    fetchLive()
        .then((data) => {
            render(data, true);
            try { localStorage.setItem(KEY, JSON.stringify({ t: Date.now(), data })); } catch (_) {}
        })
        .catch(() => render(FALLBACK, true));
})();

/* ------------------------------------------------------------
   8. AUDIO v3 (soft sine ticks) + MEOW EASTER EGG
   ------------------------------------------------------------ */
(function audio() {
    let ctx = null;
    let on = localStorage.getItem('archive_sound') === '1';
    let lastHover = 0;

    const btn = document.getElementById('audio-toggle-btn');
    const iconOn = document.getElementById('audio-icon-on');
    const iconOff = document.getElementById('audio-icon-off');

    function ensureCtx() { ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); }
    function blip(freq, dur = 0.05, vol = 0.04, type = 'sine') {
        if (!on) return;
        try {
            ensureCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(vol, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
            osc.connect(gain); gain.connect(ctx.destination);
            osc.start(); osc.stop(ctx.currentTime + dur);
        } catch (_) {}
    }

    function paintState() {
        iconOn?.classList.toggle('hidden', !on);
        iconOff?.classList.toggle('hidden', on);
        btn?.classList.toggle('text-[color:var(--ember)]', on);
    }
    btn?.addEventListener('click', () => {
        on = !on;
        localStorage.setItem('archive_sound', on ? '1' : '0');
        ensureCtx();
        if (ctx.state === 'suspended') ctx.resume();
        paintState();
        if (on) [520, 660, 780].forEach((f, i) => setTimeout(() => blip(f, 0.12, 0.05), i * 70));
    });
    paintState();

    document.addEventListener('mouseover', (e) => {
        if (!e.target.closest('a, button')) return;
        const now = performance.now();
        if (now - lastHover < 120) return;
        lastHover = now;
        blip(520, 0.03, 0.02);
    });
    document.addEventListener('click', (e) => {
        if (!e.target.closest('a, button')) return;
        blip(320, 0.06, 0.035);
    });

    // meow → ember surge
    let buffer = '';
    addEventListener('keydown', (e) => {
        if (e.key.length !== 1) return;
        buffer = (buffer + e.key.toLowerCase()).slice(-8);
        if (!buffer.endsWith('meow')) return;
        buffer = '';
        const scene = window.__archive;
        if (scene?.surge) scene.surge();
        spawnRipple(innerWidth / 2, innerHeight / 2);
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = '🐱 EMBER SURGE — MEOW MODE';
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2200);
        }
        if (on) {
            ensureCtx();
            try {
                const o = ctx.createOscillator();
                const g = ctx.createGain();
                o.type = 'sawtooth';
                o.frequency.setValueAtTime(600, ctx.currentTime);
                o.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.45);
                g.gain.setValueAtTime(0.05, ctx.currentTime);
                g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
                o.connect(g); g.connect(ctx.destination);
                o.start(); o.stop(ctx.currentTime + 0.5);
            } catch (_) {}
        }
    });
})();
