/* ============================================================
   ARCH1CAT — ui.js
   Lusion-Grade UI Controller & Micro-Interactions
   Features:
   - Boot Title Card with elegant reveal
   - Letter Scramble Decode on scroll
   - Scroll-driven reveals with staggered delays
   - Precision Dual Cursor with magnetic hover states
   - Dual-Theme Switcher (Lusion Void <-> Super Chrome)
   - Station Telemetry: Kyiv time, FPS counter, cursor coordinates
   - Magnetic Buttons & 3D Glass Plate Tilt with Specular Sheen
   - GitHub live telemetry fetch & animated count-up
   - Web Audio SFX integration & Ambient Synth Toggle
   - 3D Kinetic Energy Pulse Trigger
   - Cat Easter Egg ("meow")
   ============================================================ */

const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = window.matchMedia('(pointer: fine)').matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;

/* ------------------------------------------------------------
   1. Title Card / Boot Sequence
   ------------------------------------------------------------ */
(function titleCard() {
    const overlay = document.getElementById('boot-overlay');
    if (!overlay) return;
    const done = () => {
        if (document.body.style.overflow === 'hidden') document.body.style.overflow = '';
        window.dispatchEvent(new CustomEvent('site:ready'));
    };
    if (RM || sessionStorage.getItem('arch1catTitleDone')) {
        overlay.remove();
        done();
        return;
    }
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        overlay.classList.add('boot-hide');
        sessionStorage.setItem('arch1catTitleDone', '1');
        setTimeout(() => {
            overlay.remove();
            done();
        }, 350);
    }, 400);
})();

/* ------------------------------------------------------------
   2. Letter Scramble Decode
   ------------------------------------------------------------ */
const GLYPHS = '—/\\|▪▸<>_#01XYZ';
function scramble(el) {
    if (el.dataset.scrambled) return;
    el.dataset.scrambled = '1';
    if (RM) return;
    const original = el.textContent;
    const len = original.length;
    const start = performance.now();
    const DUR = 750;

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

const scrambleObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
        if (e.isIntersecting) {
            scramble(e.target);
            scrambleObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.35 });

document.querySelectorAll('[data-scramble]').forEach((el) => scrambleObserver.observe(el));

/* ------------------------------------------------------------
   3. Reveal on Scroll
   ------------------------------------------------------------ */
(function reveals() {
    const els = document.querySelectorAll('.reveal');
    if (RM) {
        els.forEach((el) => el.classList.add('in'));
        return;
    }
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add('in');
                io.unobserve(e.target);
            }
        });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
})();

/* ------------------------------------------------------------
   4. Chapter Rail Navigation
   ------------------------------------------------------------ */
(function rail() {
    const buttons = [...document.querySelectorAll('.rail-item')];
    const MAP = { prologue: '#about', works: '#projects', flagship: '#flagship', signal: '#activity' };

    buttons.forEach((b) => b.addEventListener('click', () => {
        if (window.__playSfx) window.__playSfx('click');
        const target = document.querySelector(b.dataset.target);
        if (target) target.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' });
    }));

    window.addEventListener('chapterchange', (e) => {
        const sel = MAP[e.detail?.name];
        buttons.forEach((b) => b.classList.toggle('active', !!sel && b.dataset.target === sel));
    });

    const first = document.querySelector('[data-chapter="prologue"]');
    if (first) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
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
   5. Precision Cursor & Click Ripple
   ------------------------------------------------------------ */
function spawnRipple(x, y) {
    const r = document.createElement('div');
    r.className = 'click-ripple';
    r.style.left = x + 'px';
    r.style.top = y + 'px';
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 550);
}

function showToast(text, ms = 2200) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), ms);
}

(function cursor() {
    if (!FINE || RM) return;
    document.documentElement.classList.add('cursor-on');
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    window.addEventListener('pointermove', (e) => {
        mx = e.clientX;
        my = e.clientY;
    }, { passive: true });

    (function loop() {
        rx = lerp(rx, mx, 0.2);
        ry = lerp(ry, my, 0.2);
        dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
        requestAnimationFrame(loop);
    })();

    const HOVER_SEL = 'a, button, .plate, .btn-archive, .stage-3d-badge, .icon-btn';
    document.addEventListener('mouseover', (e) => {
        const hit = !!e.target.closest(HOVER_SEL);
        ring.classList.toggle('grow', hit);
        if (hit && window.__playSfx) {
            window.__playSfx('hover');
        }
    });

    window.addEventListener('pointerdown', (e) => {
        spawnRipple(e.clientX, e.clientY);
        if (window.__playSfx && e.target.closest('a, button, .btn-archive, .icon-btn')) {
            window.__playSfx('click');
        }
    });
})();

/* ------------------------------------------------------------
   6. 3-Theme Switcher (Lusion Void -> Super Chrome -> Cyber Volya)
   ------------------------------------------------------------ */
(function themeSwitch() {
    const btn = document.getElementById('theme-toggle-btn');
    const iconVoid = document.getElementById('theme-icon-void');
    const iconChrome = document.getElementById('theme-icon-chrome');
    const iconVolya = document.getElementById('theme-icon-volya');
    const meta = document.querySelector('meta[name="theme-color"]');

    const THEME_CYCLE = ['lusion-void', 'super-chrome', 'cyber-volya'];

    const METAS = {
        'lusion-void': '#05070B',
        'super-chrome': '#08080A',
        'cyber-volya': '#020612'
    };

    const TOASTS = {
        'lusion-void': '💎 LUSION VOID ENGAGED',
        'super-chrome': '⚡ SUPER CHROME ENGAGED',
        'cyber-volya': '🇺🇦 ВОЛЯ // CYBER-UKRAINE ENGAGED'
    };

    function paint(theme) {
        iconVoid?.classList.toggle('hidden', theme !== 'lusion-void');
        iconChrome?.classList.toggle('hidden', theme !== 'super-chrome');
        iconVolya?.classList.toggle('hidden', theme !== 'cyber-volya');
        meta?.setAttribute('content', METAS[theme] || '#05070B');
    }

    let cur = document.documentElement.getAttribute('data-theme') || 'lusion-void';
    if (!THEME_CYCLE.includes(cur)) cur = 'lusion-void';
    document.documentElement.setAttribute('data-theme', cur);
    paint(cur);

    btn?.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'lusion-void';
        const currentIndex = THEME_CYCLE.indexOf(current);
        const nextIndex = (currentIndex + 1) % THEME_CYCLE.length;
        const next = THEME_CYCLE[nextIndex];

        try { localStorage.setItem('arch_theme', next); } catch (_) {}
        document.documentElement.setAttribute('data-theme', next);
        paint(next);

        if (window.__playSfx) window.__playSfx('theme');
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: next } }));
        showToast(TOASTS[next] || TOASTS['lusion-void']);
    });
})();

/* ------------------------------------------------------------
   7. Station Telemetry Panel: Kyiv Clock · FPS · Pointer Coordinates
   ------------------------------------------------------------ */
(function stationPanel() {
    const clock = document.getElementById('sp-clock');
    const fpsEl = document.getElementById('sp-fps');
    const cxEl = document.getElementById('sp-cx');

    if (clock) {
        const tick = () => {
            try {
                clock.textContent = new Date().toLocaleTimeString('uk-UA', {
                    hour12: false,
                    timeZone: 'Europe/Kyiv'
                });
            } catch (_) {
                clock.textContent = new Date().toLocaleTimeString('uk-UA', { hour12: false });
            }
        };
        tick();
        setInterval(tick, 1000);
    }

    if (fpsEl) {
        let last = performance.now();
        let frames = 0;
        let acc = 0;

        (function fLoop(now) {
            frames++;
            acc += now - last;
            last = now;
            if (acc >= 500) {
                fpsEl.textContent = Math.round(frames / (acc / 1000));
                frames = 0;
                acc = 0;
            }
            requestAnimationFrame(fLoop);
        })(performance.now());
    }

    if (cxEl) {
        window.addEventListener('pointermove', (e) => {
            cxEl.textContent = String(Math.round(e.clientX)).padStart(4, '0');
        }, { passive: true });
    }
})();

/* ------------------------------------------------------------
   8. Magnetic Elements & 3D Glass Plates Tilt with Specular Sheen
   ------------------------------------------------------------ */
(function interactives() {
    if (!FINE || RM) return;

    const magnets = [...document.querySelectorAll('.magnetic')].map((el) => ({
        el, tx: 0, ty: 0, cx: 0, cy: 0, hover: false
    }));

    const tilts = [...document.querySelectorAll('.tilt-plate')].map((el) => ({
        el, rx: 0, ry: 0, crx: 0, cry: 0
    }));

    magnets.forEach((m) => {
        m.el.addEventListener('pointerenter', () => { m.hover = true; });
        m.el.addEventListener('pointerleave', () => { m.hover = false; });
    });

    window.addEventListener('pointermove', (e) => {
        // Magnets
        for (const m of magnets) {
            const r = m.el.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            const inside = e.target.closest && e.target.closest('.magnetic') === m.el;
            const pull = inside ? 9 : 3;
            m.tx = m.hover ? clamp(dx * 0.2, -pull, pull) : 0;
            m.ty = m.hover ? clamp(dy * 0.2, -pull, pull) : 0;
        }

        // Tilt Plates & Specular Sheen
        for (const t of tilts) {
            const r = t.el.getBoundingClientRect();
            if (e.clientX < r.left - 60 || e.clientX > r.right + 60 ||
                e.clientY < r.top - 60 || e.clientY > r.bottom + 60) {
                t.crx = 0;
                t.cry = 0;
                continue;
            }

            const px = (e.clientX - r.left) / r.width;
            const py = (e.clientY - r.top) / r.height;

            t.crx = (py - 0.5) * -7;
            t.cry = (px - 0.5) * 7;

            // Update mouse coordinates for specular sheen highlight
            t.el.style.setProperty('--mouse-x', `${(e.clientX - r.left).toFixed(1)}px`);
            t.el.style.setProperty('--mouse-y', `${(e.clientY - r.top).toFixed(1)}px`);
        }
    }, { passive: true });

    (function loop() {
        for (const m of magnets) {
            m.cx = lerp(m.cx, m.tx, 0.16);
            m.cy = lerp(m.cy, m.ty, 0.16);
            if (Math.abs(m.cx) > 0.05 || Math.abs(m.cy) > 0.05 || m.hover) {
                m.el.style.transform = `perspective(600px) translate(${m.cx.toFixed(2)}px, ${m.cy.toFixed(2)}px)`;
            } else if (m.el.style.transform) {
                m.el.style.transform = '';
            }
        }

        for (const t of tilts) {
            t.rx = lerp(t.rx, t.crx, 0.12);
            t.ry = lerp(t.ry, t.cry, 0.12);
            if (Math.abs(t.rx) > 0.06 || Math.abs(t.ry) > 0.06) {
                t.el.style.transform = `perspective(1000px) rotateX(${t.rx.toFixed(2)}deg) rotateY(${t.ry.toFixed(2)}deg)`;
            } else if (t.el.style.transform && !t.el.matches(':hover')) {
                t.el.style.transform = '';
            }
        }
        requestAnimationFrame(loop);
    })();
})();

/* ------------------------------------------------------------
   9. GitHub Live Telemetry
   ------------------------------------------------------------ */
(function telemetry() {
    const KEY = 'arch1cat_gh_v2';
    const TTL = 60 * 60 * 1000;
    const FALLBACK = { repos: 8, stars: 0, followers: 0 };
    const starEls = {};
    document.querySelectorAll('[data-star-repo]').forEach((el) => {
        starEls[el.dataset.starRepo] = el;
    });

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
        const DUR = 1200;

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
        return {
            repos: user.public_repos ?? FALLBACK.repos,
            stars,
            followers: user.followers ?? FALLBACK.followers,
            perRepo
        };
    }

    try {
        const cached = JSON.parse(localStorage.getItem(KEY) || 'null');
        if (cached && Date.now() - cached.t < TTL) {
            render(cached.data, true);
            return;
        }
    } catch (_) {}

    fetchLive()
        .then((data) => {
            render(data, true);
            try { localStorage.setItem(KEY, JSON.stringify({ t: Date.now(), data })); } catch (_) {}
        })
        .catch(() => render(FALLBACK, true));
})();

/* ------------------------------------------------------------
   10. Interactive 3D Orbit Pulse & Header Audio Button
   ------------------------------------------------------------ */
(function controls() {
    // 3D Pulse Buttons
    const pulseBtn = document.getElementById('hero-pulse-btn');
    const stageBadge = document.getElementById('stage-3d-prompt');

    pulseBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (window.__triggerEnergyPulse) window.__triggerEnergyPulse();
    });

    stageBadge?.addEventListener('click', () => {
        if (window.__triggerEnergyPulse) window.__triggerEnergyPulse();
    });

    // Audio Ambient Toggle Button in Header
    const audioBtn = document.getElementById('audio-toggle-btn');
    audioBtn?.addEventListener('click', () => {
        if (!window.__deckAudio) return;
        window.__deckAudio.toggle();
        const playing = window.__deckAudio.isPlaying();
        audioBtn.classList.toggle('active', playing);
        if (window.__playSfx) window.__playSfx(playing ? 'theme' : 'click');
        showToast(playing ? '▶ AMBIENT SYNTH ONLINE' : '❚❚ AMBIENT SYNTH PAUSED');
    });

    // Meow easter egg
    let buffer = '';
    window.addEventListener('keydown', (e) => {
        if (e.key.length !== 1) return;
        buffer = (buffer + e.key.toLowerCase()).slice(-8);
        if (buffer.endsWith('meow')) {
            buffer = '';
            if (window.__triggerEnergyPulse) window.__triggerEnergyPulse();
            showToast('🐱 CYBER CAT OVERDRIVE ACTIVATED');
        }
    });
})();
