/* ============================================================
   ARCH1CAT — ui.js
   Active Theory V6 UI Orchestrator
   - ASCII Sphere Preloader Dismissal
   - Radio Marquee Ticker & Real-time Equalizer Loop
   - Project Inspection Drawer with Acoustic Muffle Effect
   - Spatial Carousel Controls & Category Filtering
   - Custom Precision Holographic Cursor
   ============================================================ */

import { radio } from './audio-engine.js';
import { stage, PROJECTS_DATA } from './three-scene.js';

document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------------------------
       1. Active Theory ASCII Sphere Preloader
       ------------------------------------------------------------ */
    const preloader = document.getElementById('ascii-preloader');
    const pctEl = document.getElementById('ascii-pct');
    let progress = 0;

    const loadTimer = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 4;
        if (progress > 100) progress = 100;
        if (pctEl) pctEl.textContent = `/ ${progress} /`;

        if (progress >= 100) {
            clearInterval(loadTimer);
            setTimeout(() => {
                if (preloader) {
                    preloader.style.opacity = '0';
                    preloader.style.pointerEvents = 'none';
                    setTimeout(() => preloader.remove(), 700);
                }
            }, 300);
        }
    }, 45);

    /* ------------------------------------------------------------
       2. Active Theory Radio Controls & Real-time Visualizer
       ------------------------------------------------------------ */
    const tickerText = document.getElementById('radio-ticker-text');
    const toggleBtn = document.getElementById('radio-toggle-btn');
    const prevBtn = document.getElementById('radio-prev-btn');
    const nextBtn = document.getElementById('radio-next-btn');
    const muteBtn = document.getElementById('radio-mute-btn');
    const eqBars = document.querySelectorAll('#radio-eq-bars .eq-bar');

    const updateTicker = (track, idx) => {
        if (!tickerText) return;
        tickerText.style.opacity = '0';
        setTimeout(() => {
            const num = (idx + 1).toString().padStart(2, '0');
            tickerText.textContent = `${num}. ${track.title}`;
            tickerText.style.opacity = '1';
        }, 150);
    };

    radio.on('trackchange', ({ index, track }) => {
        updateTicker(track, index);
    });

    radio.on('playstate', ({ isPlaying }) => {
        if (toggleBtn) {
            toggleBtn.textContent = isPlaying ? '❚❚' : '▶';
            toggleBtn.classList.toggle('bg-cyan-400', isPlaying);
            toggleBtn.classList.toggle('text-black', isPlaying);
        }
    });

    radio.on('mute', ({ isMuted }) => {
        if (muteBtn) {
            muteBtn.textContent = isMuted ? '🔇' : '🔊';
        }
    });

    toggleBtn?.addEventListener('click', () => radio.togglePlay());
    prevBtn?.addEventListener('click', () => radio.prev());
    nextBtn?.addEventListener('click', () => radio.next());
    muteBtn?.addEventListener('click', () => radio.toggleMute());

    // Initialize initial ticker title
    const initTrack = radio.getCurrentTrack();
    if (initTrack) updateTicker(initTrack, 0);

    // Visualizer loop for equalizer bars
    const updateEqualizer = () => {
        requestAnimationFrame(updateEqualizer);
        const levels = radio.getEqualizerLevels();
        if (eqBars.length >= 3) {
            eqBars[0].style.height = `${Math.floor(levels[0] * 12 + 3)}px`;
            eqBars[1].style.height = `${Math.floor(levels[1] * 14 + 4)}px`;
            eqBars[2].style.height = `${Math.floor(levels[2] * 10 + 2)}px`;
        }
    };
    updateEqualizer();

    /* ------------------------------------------------------------
       3. Project Inspection Drawer & Muffled Audio Filter
       ------------------------------------------------------------ */
    const drawer = document.getElementById('project-drawer');
    const drawerIndex = document.getElementById('drawer-index');
    const drawerTitle = document.getElementById('drawer-title');
    const drawerSubtitle = document.getElementById('drawer-subtitle');
    const drawerDesc = document.getElementById('drawer-desc');
    const drawerTags = document.getElementById('drawer-tags');
    const drawerLiveLink = document.getElementById('drawer-live-link');
    const drawerSourceLink = document.getElementById('drawer-source-link');
    const drawerCloseBtn = document.getElementById('drawer-close-btn');

    const openProjectDrawer = (proj) => {
        if (!drawer || !proj) return;

        if (drawerIndex) drawerIndex.textContent = `// ${proj.index} · ${proj.category}`;
        if (drawerTitle) drawerTitle.textContent = proj.title;
        if (drawerSubtitle) drawerSubtitle.textContent = proj.subtitle;
        if (drawerDesc) drawerDesc.textContent = proj.desc;

        if (drawerTags) {
            drawerTags.innerHTML = '';
            proj.tags.forEach(t => {
                const span = document.createElement('span');
                span.className = 'tag-pill';
                span.textContent = t;
                drawerTags.appendChild(span);
            });
        }

        if (drawerLiveLink) drawerLiveLink.href = proj.url;
        if (drawerSourceLink) drawerSourceLink.href = proj.source;

        // Slide drawer in
        drawer.classList.remove('translate-x-full');

        // Trigger Signature Active Theory Acoustic Muffle
        radio.setMuffled(true);
        radio.playSfx('ping');
    };

    const closeProjectDrawer = () => {
        if (!drawer) return;
        drawer.classList.add('translate-x-full');

        // Restore un-muffled frequency
        radio.setMuffled(false);
        radio.playSfx('click');
    };

    drawerCloseBtn?.addEventListener('click', closeProjectDrawer);

    // Listen to 3D raycast project clicks
    window.addEventListener('project-select', (e) => {
        openProjectDrawer(e.detail);
    });

    // ESC to close drawer
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectDrawer();
        } else if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
            e.preventDefault();
            radio.togglePlay();
        } else if (e.key === 'ArrowRight' && e.target.tagName !== 'INPUT') {
            radio.next();
        } else if (e.key === 'ArrowLeft' && e.target.tagName !== 'INPUT') {
            radio.prev();
        }
    });

    /* ------------------------------------------------------------
       4. Spatial Carousel Controls & Category Filtering
       ------------------------------------------------------------ */
    const prevProjBtn = document.getElementById('carousel-prev-btn');
    const nextProjBtn = document.getElementById('carousel-next-btn');
    const counterEl = document.getElementById('carousel-counter');
    let currentProjIdx = 0;

    const updateCarouselUI = (idx) => {
        currentProjIdx = (idx + PROJECTS_DATA.length) % PROJECTS_DATA.length;
        if (stage) stage.setActiveProject(currentProjIdx);
        if (counterEl) {
            const num = (currentProjIdx + 1).toString().padStart(2, '0');
            const total = PROJECTS_DATA.length.toString().padStart(2, '0');
            counterEl.textContent = `${num} / ${total}`;
        }

        // Update Active Theory World switcher index
        const worldIndex = document.getElementById('world-index-num');
        if (worldIndex) worldIndex.textContent = `${currentProjIdx + 1}.`;

        // Update Right Edge Scroll Thumb
        const thumb = document.getElementById('right-scroll-thumb');
        if (thumb) {
            const pct = currentProjIdx / (PROJECTS_DATA.length - 1);
            thumb.style.transform = `translateY(${pct * 64}px)`;
        }
    };

    // World Switcher Buttons
    document.getElementById('world-prev-btn')?.addEventListener('click', () => {
        updateCarouselUI(currentProjIdx - 1);
        radio.playSfx('click');
    });
    document.getElementById('world-next-btn')?.addEventListener('click', () => {
        updateCarouselUI(currentProjIdx + 1);
        radio.playSfx('click');
    });

    prevProjBtn?.addEventListener('click', () => {
        updateCarouselUI(currentProjIdx - 1);
        radio.playSfx('click');
    });

    nextProjBtn?.addEventListener('click', () => {
        updateCarouselUI(currentProjIdx + 1);
        radio.playSfx('click');
    });

    // Category Buttons
    const catButtons = document.querySelectorAll('.cat-filter-btn');
    catButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            catButtons.forEach(b => b.classList.remove('active'));
            const target = e.currentTarget;
            target.classList.add('active');

            const category = target.dataset.cat;
            radio.playSfx('ping');

            if (category === 'ALL') {
                updateCarouselUI(0);
            } else {
                const matchIndex = PROJECTS_DATA.findIndex(p => p.category === category);
                if (matchIndex !== -1) {
                    updateCarouselUI(matchIndex);
                }
            }
        });
    });

    /* ------------------------------------------------------------
       5. Interactive Search / Prompt Capsule
       ------------------------------------------------------------ */
    const searchInput = document.getElementById('ai-search-input');
    searchInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim().toLowerCase();
            if (!query) return;

            const match = PROJECTS_DATA.find(p =>
                p.title.toLowerCase().includes(query) ||
                p.desc.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query) ||
                p.tags.some(t => t.toLowerCase().includes(query))
            );

            if (match) {
                const idx = PROJECTS_DATA.indexOf(match);
                updateCarouselUI(idx);
                openProjectDrawer(match);
                searchInput.value = '';
            } else {
                searchInput.value = 'NO MATCH FOUND — TRY "CRM" OR "3D"';
                setTimeout(() => { searchInput.value = ''; }, 2000);
            }
        }
    });

    /* ------------------------------------------------------------
       6. URL Hash & Deep Linking
       ------------------------------------------------------------ */
    const checkHash = () => {
        const hash = window.location.hash.slice(1);
        if (!hash) return;
        if (hash === 'contact') {
            openContactDrawer();
            return;
        }
        const params = new URLSearchParams(hash);
        const projId = params.get('project') || hash;
        const match = PROJECTS_DATA.find(p => p.id === projId);
        if (match) {
            const idx = PROJECTS_DATA.indexOf(match);
            updateCarouselUI(idx);
            setTimeout(() => openProjectDrawer(match), 400);
        }
    };

    const openContactDrawer = () => {
        openProjectDrawer({
            index: '00',
            category: 'DIRECT SIGNAL',
            title: 'CONTACT ARCH1CAT',
            subtitle: 'Chief System & UX Architect · Creative Technologist',
            desc: 'Available for high-stakes 3D WebGL experiences, autonomous multi-agent AI ecosystems, native Kotlin software, and real-time systems architecture.',
            tags: ['Telegram: @Archi_____cat', 'X: @Archi_____cat', 'GitHub: l2bote4game'],
            url: 'https://x.com/Archi_____cat',
            source: 'https://github.com/l2bote4game'
        });
    };

    document.getElementById('nav-contact-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        openContactDrawer();
    });

    document.getElementById('nav-work-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        closeProjectDrawer();
        updateCarouselUI(0);
    });

    // Check on startup
    setTimeout(checkHash, 500);

    /* ------------------------------------------------------------
       7. Custom Precision Cursor
       ------------------------------------------------------------ */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('pointermove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (cursorDot) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }
    });

    const animateCursor = () => {
        requestAnimationFrame(animateCursor);
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        if (cursorRing) {
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
        }
    };
    animateCursor();

    // Hover scale effect on links & buttons
    document.querySelectorAll('a, button, input').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorRing) {
                cursorRing.style.width = '48px';
                cursorRing.style.height = '48px';
                cursorRing.style.borderColor = 'rgba(0, 242, 254, 0.9)';
            }
            radio.playSfx('hover');
        });
        el.addEventListener('mouseleave', () => {
            if (cursorRing) {
                cursorRing.style.width = '32px';
                cursorRing.style.height = '32px';
                cursorRing.style.borderColor = 'rgba(0, 242, 254, 0.5)';
            }
        });
    });
});
