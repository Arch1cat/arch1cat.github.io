/* ============================================================
   ARCH1CAT — ui.js
   "CYBER-SICH OS" // 3D SPATIAL HOLO-DECK CONTROLLER
   Full-Viewport Experiential Navigation Engine
   Features:
   - Dynamic 8-Stage Dossier Data Controller
   - Multi-input Navigation: Dock, Arrow Keys, Wheel, Touch Swipe
   - 3-Theme Switcher (Cyber-Sich <-> Chrome-Titanium <-> Void-Matrix)
   - Procedural Web Audio Engine triggers
   - Kyiv Station Telemetry: Clock, FPS, Coordinates
   - Precision Cursor
   ============================================================ */

const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE = window.matchMedia('(pointer: fine)').matches;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;

/* ------------------------------------------------------------
   1. Dynamic Stage Dossier Dataset
   ------------------------------------------------------------ */
const DOSSIERS = [
    {
        id: 'MOD-00 // FUSION CORE',
        status: 'ONLINE · NOMINAL',
        title: 'Cybernetic craft & play.',
        desc: 'Ukrainian cybernetic aerospace rig and autonomous AI agent workstation. Select any module in the dock or swipe to inspect the 3D installations.',
        specs: { arch: 'Three.js / WebGL 2', origin: 'Kyiv 50.45°N', telemetry: 'Sensor Rig', status: '60 FPS Locked' },
        tags: ['AI Workflows', '3D WebGL', 'Android Kotlin', 'Spatial Audio'],
        primaryText: 'VIEW GITHUB ↗',
        primaryUrl: 'https://github.com/l2bote4game',
        subText: null,
        subUrl: null
    },
    {
        id: 'MOD-01 // OSINT TELEMETRY GLOBE',
        status: 'DEPLOYED · LIVE',
        title: 'World Monitor',
        desc: 'Real-time global geopolitical, cyber defense, and network infrastructure telemetry dashboard with live geospatial node mapping and event stream aggregation.',
        specs: { arch: 'Tauri / Cloudflare', origin: 'TypeScript', telemetry: 'Geospatial WebGL', status: 'Live Edge' },
        tags: ['TypeScript', 'Cloudflare Workers', 'Tauri Desktop', 'Mapbox GL'],
        primaryText: 'VIEW SOURCE ↗',
        primaryUrl: 'https://github.com/l2bote4game/world-monitor',
        subText: null,
        subUrl: null
    },
    {
        id: 'MOD-02 // RF SPECTRUM MAST',
        status: 'ACTIVE · 2.4/5GHz',
        title: 'WiFi Scanner',
        desc: 'High-speed native Android telemetry application for 2.4/5GHz Wi-Fi channel graphing, subnet IP discovery, and network latency diagnostics.',
        specs: { arch: 'Kotlin Native', origin: 'Jetpack Compose', telemetry: 'mDNS & ICMP', status: 'Google Play Ready' },
        tags: ['Kotlin', 'Jetpack Compose', 'mDNS Discovery', 'Coroutines'],
        primaryText: 'VIEW SOURCE ↗',
        primaryUrl: 'https://github.com/l2bote4game/wifiscaner',
        subText: null,
        subUrl: null
    },
    {
        id: 'MOD-03 // CRYPTOGRAPHIC SANITIZER',
        status: 'SECURITY AUDITED',
        title: 'Metadata Cleaner',
        desc: 'Multi-threaded Python security suite to sanitize EXIF tags, GPS coordinates, camera serial footprints, and embedded telemetry from images and media streams.',
        specs: { arch: 'Python 3 / Pillow', origin: 'FFmpeg CLI', telemetry: 'Zero Footprint', status: 'Local Only' },
        tags: ['Python 3', 'Pillow', 'FFmpeg', 'Privacy Security'],
        primaryText: 'VIEW SOURCE ↗',
        primaryUrl: 'https://github.com/l2bote4game/media-meta-cleaner',
        subText: null,
        subUrl: null
    },
    {
        id: 'MOD-04 // NEURAL GAME ENGINE',
        status: 'KINETIC PHYSICS',
        title: 'Cats Match-3 Quest',
        desc: 'Mobile casual game architecture featuring custom cascade match algorithms, feline shelter building dynamics, and physics particle systems.',
        specs: { arch: 'Kotlin Canvas', origin: 'Custom Engine', telemetry: '60 FPS Loop', status: 'Offline First' },
        tags: ['Kotlin', 'Canvas Engine', 'Particle FX', 'Game Architecture'],
        primaryText: 'VIEW SOURCE ↗',
        primaryUrl: 'https://github.com/l2bote4game/cats-match3-game',
        subText: null,
        subUrl: null
    },
    {
        id: 'MOD-05 // PRODUCTION APP · v1.2.4',
        status: 'APK RELEASE READY',
        title: 'openGym',
        desc: 'Self-hosted fitness ecosystem. Production Android APK, WebAuthn passkey authentication, guided progressive overload algorithms, and offline state sync.',
        specs: { arch: 'React 19 / Cap 7', origin: 'Android APK v1.2.4', telemetry: 'WebAuthn Passkey', status: 'Audited' },
        tags: ['React 19', 'Capacitor 7', 'Android APK', 'Passkeys'],
        primaryText: 'VIEW SOURCE ↗',
        primaryUrl: 'https://github.com/l2bote4game/openGym',
        subText: 'DOWNLOAD APK ↗',
        subUrl: 'https://github.com/l2bote4game/openGym/releases/tag/v1.2.4-android'
    },
    {
        id: 'MOD-06 // SOLAR ENTERPRISE PLATFORM',
        status: 'ENTERPRISE PRODUCTION',
        title: 'Yotei CRM',
        desc: 'Next-generation real estate intelligence platform and enterprise CRM engine. Engineered with a strict 3-level domain taxonomy, real-time synchronized lead pipelines, and automated Vitest QA.',
        specs: { arch: 'Next.js Turborepo', origin: 'yotei.com.ua', telemetry: 'Real-Time CRM', status: 'High Load Live' },
        tags: ['Next.js 16', 'Supabase & Prisma', 'Mapbox GL', 'Vitest QA'],
        primaryText: 'VISIT YOTEI.COM.UA ↗',
        primaryUrl: 'https://yotei.com.ua/',
        subText: null,
        subUrl: null
    },
    {
        id: 'MOD-07 // TELEMETRY & SIGNAL',
        status: 'STREAMING ONLINE',
        title: 'Signal & Telemetry',
        desc: 'Continuous real-time telemetry from the Kyiv engineering desk. Public GitHub repositories, verified community contributions, and active cybernetic craft.',
        specs: { arch: 'GitHub API v3', origin: 'Kyiv UTC+3', telemetry: 'Continuous Commit', status: '100% Uptime' },
        tags: ['GitHub Telemetry', 'Autonomous Agents', 'Three.js WebGL', 'AI Systems'],
        primaryText: 'GITHUB PROFILE ↗',
        primaryUrl: 'https://github.com/l2bote4game',
        subText: 'X / TWITTER ↗',
        subUrl: 'https://x.com/Archi_____cat'
    }
];

let activeStageIndex = 0;

/* ------------------------------------------------------------
   2. Title Card Boot Sequence
   ------------------------------------------------------------ */
(function titleCard() {
    const overlay = document.getElementById('boot-overlay');
    if (!overlay) return;
    const done = () => {
        if (document.body.style.overflow === 'hidden') document.body.style.overflow = '';
        window.dispatchEvent(new CustomEvent('site:ready'));
    };
    if (RM || sessionStorage.getItem('arch1catSichDone')) {
        overlay.remove();
        done();
        return;
    }
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        overlay.classList.add('boot-hide');
        sessionStorage.setItem('arch1catSichDone', '1');
        setTimeout(() => {
            overlay.remove();
            done();
        }, 350);
    }, 400);
})();

/* ------------------------------------------------------------
   3. Stage Navigation & Dossier Update Controller
   ------------------------------------------------------------ */
function renderStage(idx) {
    if (idx < 0 || idx >= DOSSIERS.length) return;
    activeStageIndex = idx;

    const data = DOSSIERS[idx];
    const card = document.getElementById('dossier-card');

    if (card) {
        card.style.opacity = '0.4';
        card.style.transform = 'translateY(10px) scale(0.98)';
        setTimeout(() => {
            document.getElementById('dossier-id').textContent = data.id;
            document.getElementById('dossier-status').textContent = data.status;
            document.getElementById('dossier-title').textContent = data.title;
            document.getElementById('dossier-desc').textContent = data.desc;

            // Specs
            document.getElementById('spec-arch').textContent = data.specs.arch;
            document.getElementById('spec-origin').textContent = data.specs.origin;
            document.getElementById('spec-telemetry').textContent = data.specs.telemetry;
            document.getElementById('spec-status').textContent = data.specs.status;

            // Tags
            const tagContainer = document.getElementById('dossier-tags');
            tagContainer.innerHTML = '';
            data.tags.forEach((t) => {
                const span = document.createElement('span');
                span.className = 'tag';
                span.textContent = t;
                tagContainer.appendChild(span);
            });

            // Action Buttons
            const actionBtn = document.getElementById('dossier-action-btn');
            document.getElementById('dossier-action-text').textContent = data.primaryText;
            actionBtn.setAttribute('href', data.primaryUrl);

            const subBtn = document.getElementById('dossier-sub-btn');
            if (data.subText && data.subUrl) {
                document.getElementById('dossier-sub-text').textContent = data.subText;
                subBtn.setAttribute('href', data.subUrl);
                subBtn.classList.remove('hidden');
            } else {
                subBtn.classList.add('hidden');
            }

            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 120);
    }

    // Update Dock active state
    const dockTabs = document.querySelectorAll('.dock-tab');
    dockTabs.forEach((tab, i) => {
        tab.classList.toggle('active', i === idx);
    });

    const counter = document.getElementById('dock-current-idx');
    if (counter) counter.textContent = String(idx).padStart(2, '0');

    const badge = document.getElementById('sp-stage-badge');
    if (badge) badge.textContent = String(idx).padStart(2, '0');

    // Notify Three.js scene
    if (window.__goToStage) {
        window.__goToStage(idx);
    }
}

// Support ?stage=N on initial load
window.addEventListener('load', () => {
    const p = new URLSearchParams(location.search).get('stage');
    if (p !== null) {
        const s = parseInt(p, 10);
        if (!isNaN(s) && s >= 0 && s < DOSSIERS.length) {
            setTimeout(() => renderStage(s), 250);
        }
    }
});

// Dock Button clicks
document.querySelectorAll('.dock-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
        const target = parseInt(tab.dataset.stage, 10);
        renderStage(target);
    });
});

document.getElementById('dock-prev-btn')?.addEventListener('click', () => {
    const prev = (activeStageIndex - 1 + DOSSIERS.length) % DOSSIERS.length;
    renderStage(prev);
});

document.getElementById('dock-next-btn')?.addEventListener('click', () => {
    const next = (activeStageIndex + 1) % DOSSIERS.length;
    renderStage(next);
});

document.getElementById('brand-home-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    renderStage(0);
});

// Pulse trigger
document.getElementById('dossier-pulse-btn')?.addEventListener('click', () => {
    if (window.__triggerStagePulse) {
        window.__triggerStagePulse();
    }
    showToast('⚡ PLASMA SURGE INITIATED');
});

/* ------------------------------------------------------------
   4. Keyboard & Mouse Wheel Navigation
   ------------------------------------------------------------ */
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const next = (activeStageIndex + 1) % DOSSIERS.length;
        renderStage(next);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const prev = (activeStageIndex - 1 + DOSSIERS.length) % DOSSIERS.length;
        renderStage(prev);
    } else if (e.key === ' ') {
        if (window.__triggerStagePulse) window.__triggerStagePulse();
    }
});

let wheelTimeout = null;
window.addEventListener('wheel', (e) => {
    if (wheelTimeout) return;
    if (Math.abs(e.deltaY) > 25) {
        if (e.deltaY > 0) {
            const next = (activeStageIndex + 1) % DOSSIERS.length;
            renderStage(next);
        } else {
            const prev = (activeStageIndex - 1 + DOSSIERS.length) % DOSSIERS.length;
            renderStage(prev);
        }
        wheelTimeout = setTimeout(() => { wheelTimeout = null; }, 400);
    }
}, { passive: true });

// Mobile Touch Swipe Navigation
let touchStartX = 0;
window.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
}, { passive: true });

window.addEventListener('touchend', (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 50) {
        if (deltaX < 0) {
            const next = (activeStageIndex + 1) % DOSSIERS.length;
            renderStage(next);
        } else {
            const prev = (activeStageIndex - 1 + DOSSIERS.length) % DOSSIERS.length;
            renderStage(prev);
        }
    }
}, { passive: true });

/* ------------------------------------------------------------
   5. 3-Theme Switcher (Cyber-Sich -> Chrome-Titanium -> Void-Matrix)
   ------------------------------------------------------------ */
(function themeSwitch() {
    const btn = document.getElementById('theme-toggle-btn');
    const iconSich = document.getElementById('theme-icon-sich');
    const iconChrome = document.getElementById('theme-icon-chrome');
    const iconVoid = document.getElementById('theme-icon-void');
    const meta = document.querySelector('meta[name="theme-color"]');

    const THEME_CYCLE = ['cyber-sich', 'chrome-titanium', 'void-matrix'];

    const METAS = {
        'cyber-sich': '#02050D',
        'chrome-titanium': '#060709',
        'void-matrix': '#04060A'
    };

    const TOASTS = {
        'cyber-sich': '🇺🇦 СІЧ-OS // CYBER VOLYA ACTIVE',
        'chrome-titanium': '⚡ TITANIUM CHROME ACTIVE',
        'void-matrix': '🔮 VOID MATRIX ACTIVE'
    };

    function paint(theme) {
        iconSich?.classList.toggle('hidden', theme !== 'cyber-sich');
        iconChrome?.classList.toggle('hidden', theme !== 'chrome-titanium');
        iconVoid?.classList.toggle('hidden', theme !== 'void-matrix');
        meta?.setAttribute('content', METAS[theme] || '#02050D');
    }

    let cur = document.documentElement.getAttribute('data-theme') || 'cyber-sich';
    if (!THEME_CYCLE.includes(cur)) cur = 'cyber-sich';
    document.documentElement.setAttribute('data-theme', cur);
    paint(cur);

    btn?.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'cyber-sich';
        const currentIndex = THEME_CYCLE.indexOf(current);
        const nextIndex = (currentIndex + 1) % THEME_CYCLE.length;
        const next = THEME_CYCLE[nextIndex];

        try { localStorage.setItem('arch_theme', next); } catch (_) {}
        document.documentElement.setAttribute('data-theme', next);
        paint(next);

        if (window.__playSfx) window.__playSfx('theme');
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: next } }));
        showToast(TOASTS[next] || TOASTS['cyber-sich']);
    });
})();

/* ------------------------------------------------------------
   6. Kyiv Clock & Station Telemetry Panel
   ------------------------------------------------------------ */
(function stationPanel() {
    const clock = document.getElementById('sp-clock');
    const fpsEl = document.getElementById('sp-fps');

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
})();

/* ------------------------------------------------------------
   7. Precision Cursor & Toast
   ------------------------------------------------------------ */
function showToast(text, ms = 2000) {
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

    const HOVER_SEL = 'a, button, .dock-tab, .icon-btn, .btn-primary, .btn-ghost';
    document.addEventListener('mouseover', (e) => {
        const hit = !!e.target.closest(HOVER_SEL);
        ring.classList.toggle('grow', hit);
        if (hit && window.__playSfx) {
            window.__playSfx('hover');
        }
    });

    window.addEventListener('pointerdown', (e) => {
        if (window.__playSfx && e.target.closest(HOVER_SEL)) {
            window.__playSfx('click');
        }
    });
})();

/* ------------------------------------------------------------
   8. Ambient Audio Engine Controller
   ------------------------------------------------------------ */
(function audioControls() {
    const audioBtn = document.getElementById('audio-toggle-btn');
    audioBtn?.addEventListener('click', () => {
        if (!window.__deckAudio) return;
        window.__deckAudio.toggle();
        const playing = window.__deckAudio.isPlaying();
        audioBtn.classList.toggle('active', playing);
        if (window.__playSfx) window.__playSfx(playing ? 'theme' : 'click');
        showToast(playing ? '▶ KYIV CARILLON ONLINE' : '❚❚ AMBIENT SYNTH PAUSED');
    });
})();
