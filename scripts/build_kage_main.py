import re

with open('kage_test.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update Title & Meta
html = re.sub(r'<title>.*?</title>', '<title>arch1cat — 影の道 Kage · Software Architect &amp; Creative Technologist</title>', html)

# 2. Update Header: Branding & Active Theory Radio Capsule
radio_capsule_html = '''
    <span class="brand-tx"><b>ARCH1CAT</b><i>CHIEF SYSTEM ARCHITECT</i></span>
  </a>

  <!-- Stolen Active Theory Radio Player (Kyoto Temple Edition) -->
  <div class="at-radio-kage" id="kage-radio-capsule" title="Active Theory Radio · Kyoto Temple Edition">
    <button id="radio-prev-btn" class="radio-btn" title="Previous Track">&lt;&lt;</button>
    <div id="radio-eq-bars" style="display:flex; align-items:flex-end; gap:2px; height:12px;">
      <span class="eq-bar" style="height:7px;"></span>
      <span class="eq-bar" style="height:12px;"></span>
      <span class="eq-bar" style="height:5px;"></span>
    </div>
    <div class="radio-ticker-wrap">
      <div id="radio-ticker-text" class="radio-ticker-text">01. Sergey Azbel - Themis</div>
    </div>
    <button id="radio-next-btn" class="radio-btn" title="Next Track">&gt;&gt;</button>
    <button id="radio-toggle-btn" class="radio-play-btn" title="Play/Pause">▶</button>
    <button id="radio-mute-btn" class="radio-btn" title="Mute Audio">🔊</button>
  </div>
'''

html = re.sub(
    r'<span class=\"brand-tx\"><b>KAGE</b><i>HIDDEN REALMS OF KYOTO</i></span>\s*</a>',
    radio_capsule_html,
    html
)

# 3. Update Navigation Links
nav_links_html = '''<nav class="nav-links" id="navlinks">
    <a class="nav-link" href="#gate" data-cursor><span>Sanmon</span><span class="alt">山門</span></a>
    <a class="nav-link" href="#pathways" data-cursor><span>Works</span><span class="alt">庭園</span></a>
    <a class="nav-link" href="#lessons" data-cursor><span>Craft</span><span class="alt">手業</span></a>
    <a class="nav-link" href="#eternity" data-cursor><span>Signal</span><span class="alt">残光</span></a>
    <a class="nav-link" href="activetheory/" data-cursor style="color:#00f2fe;"><span>Active Theory</span><span class="alt">電脳</span></a>
    <a class="nav-link" href="fixora/" data-cursor style="color:#ffcb05;"><span>Fixora</span><span class="alt">復旧</span></a>
    <a class="nav-link" href="rempobut/" data-cursor style="color:#008cf0;"><span>Feexaro</span><span class="alt">修理</span></a>
    <a class="nav-link" href="3d-print/" data-cursor style="color:#ff5500;"><span>3D Print</span><span class="alt">造形</span></a>
    <a class="nav-link" href="ai-matrix.html" data-cursor style="color:#e0231c;"><span>AI Matrix</span><span class="alt">宇宙</span></a>
  </nav>'''

html = re.sub(r'<nav class=\"nav-links\" id=\"navlinks\">.*?</nav>', nav_links_html, html, flags=re.DOTALL)

# 4. Add Radio & Card CSS into <style>
extra_css = '''
/* Radio Capsule Styles */
.at-radio-kage {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 9999px;
  background: rgba(10, 14, 18, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(224, 35, 28, 0.35);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);
  font-family: inherit;
  transition: all 0.3s ease;
}
.at-radio-kage:hover {
  border-color: rgba(224, 35, 28, 0.75);
  box-shadow: 0 0 25px rgba(224, 35, 28, 0.3);
}
.radio-btn {
  background: none;
  border: none;
  color: rgba(223, 231, 224, 0.75);
  font-size: 11px;
  cursor: pointer;
  padding: 0 3px;
  transition: color 0.2s ease;
}
.radio-btn:hover { color: #e0231c; }
.eq-bar {
  width: 2px;
  background: #e0231c;
  border-radius: 1px;
  transition: height 0.08s ease;
}
.radio-ticker-wrap {
  width: 170px;
  overflow: hidden;
  position: relative;
  height: 16px;
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}
.radio-ticker-text {
  white-space: nowrap;
  font-size: 11px;
  color: rgba(223, 231, 224, 0.95);
  letter-spacing: 0.02em;
}
.radio-play-btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: none;
  background: rgba(224, 35, 28, 0.25);
  color: #dfe7e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.radio-play-btn:hover {
  background: #e0231c;
  color: #fff;
  transform: scale(1.08);
}
@media (max-width: 768px) {
  .at-radio-kage { display: none !important; }
}
'''

html = html.replace('</style>', extra_css + '\n</style>')

# 5. Update Cards Section in Still Gardens
cards_replacement = '''<div class="cards" id="cards">
    <!-- Card 01: Yotei CRM -->
    <article class="card" data-rv="up" data-view="0" data-cursor>
      <div class="card-fr" data-frame>
        <span class="card-ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>
        <i class="glow" style="--gx:80.2%; --gy:23.9%; --gr:22%; --gt:6.1s; --gt2:9.7s; --gc1:rgba(0,242,254,.50); --gc2:rgba(14,165,233,.24)"></i>
        <div class="card-lab"><b>Yotei CRM</b><span class="jp">不動産</span></div>
      </div>
      <div class="card-meta"><span>Proptech Intelligence</span><span>yotei.com.ua ↗</span></div>
    </article>

    <!-- Card 02: WARDOGS 3D -->
    <article class="card" data-rv="up" data-view="1" data-cursor>
      <div class="card-fr" data-frame>
        <span class="card-ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>
        <i class="glow glow--flame" style="--gx:70.5%; --gy:47.2%; --gr:14%; --gt:3.7s; --gt2:5.3s; --gc1:rgba(16,185,129,.62); --gc2:rgba(5,150,105,.30)"></i>
        <div class="card-lab"><b>WARDOGS 3D</b><span class="jp">弾道学</span></div>
      </div>
      <div class="card-meta"><span>Tactical GIS &amp; Ballistics</span><span>Live WebGL ↗</span></div>
    </article>

    <!-- Card 03: World Monitor -->
    <article class="card" data-rv="up" data-view="2" data-cursor>
      <div class="card-fr" data-frame>
        <span class="card-ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>
        <i class="glow" style="--gx:48.0%; --gy:16.8%; --gr:20%; --gt:7.3s; --gt2:11.2s; --gc1:rgba(245,158,11,.52); --gc2:rgba(217,119,6,.24)"></i>
        <div class="card-lab"><b>World Monitor</b><span class="jp">諜報</span></div>
      </div>
      <div class="card-meta"><span>OSINT Cyber Telemetry</span><span>GitHub ↗</span></div>
    </article>

    <!-- Card 04: Active Theory 1:1 Showcase -->
    <a href="activetheory/" class="card" data-rv="up" data-cursor style="text-decoration:none;">
      <div class="card-fr" data-frame>
        <span class="card-ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#00f2fe" stroke-width="1.3"/></svg></span>
        <i class="glow" style="--gx:50.0%; --gy:50.0%; --gr:26%; --gt:4.2s; --gt2:7.1s; --gc1:rgba(0,242,254,.75); --gc2:rgba(236,72,153,.35)"></i>
        <div class="card-lab"><b style="color:#00f2fe;">Active Theory</b><span class="jp" style="color:#00f2fe;">電脳</span></div>
      </div>
      <div class="card-meta"><span>1:1 WebGL 3D Showcase</span><span style="color:#00f2fe;">Відкрити сайт ↗</span></div>
    </a>

    <!-- Card 05: Fixora Харків -->
    <a href="fixora/" class="card" data-rv="up" data-cursor style="text-decoration:none;">
      <div class="card-fr" data-frame>
        <span class="card-ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#ffcb05" stroke-width="1.3"/></svg></span>
        <i class="glow glow--gold" style="--gx:50.0%; --gy:50.0%; --gr:26%; --gt:3.8s; --gt2:6.2s; --gc1:rgba(255,203,5,.85); --gc2:rgba(11,11,11,.4)"></i>
        <div class="card-lab"><b style="color:#ffcb05;">Fixora Харків</b><span class="jp" style="color:#ffcb05;">復旧</span></div>
      </div>
      <div class="card-meta"><span>Ретро-едиторіал &amp; Інтерактив</span><span style="color:#ffcb05;">Відкрити прототип ↗</span></div>
    </a>

    <!-- Card 06: Feexaro Сервіс -->
    <a href="rempobut/" class="card" data-rv="up" data-cursor style="text-decoration:none;">
      <div class="card-fr" data-frame>
        <span class="card-ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#008cf0" stroke-width="1.3"/></svg></span>
        <i class="glow glow--azure" style="--gx:65.0%; --gy:35.0%; --gr:24%; --gt:4.2s; --gt2:6.8s; --gc1:rgba(0,140,240,.75); --gc2:rgba(4,31,57,.35)"></i>
        <div class="card-lab"><b>Feexaro Сервіс</b><span class="jp" style="color:#008cf0;">修理</span></div>
      </div>
      <div class="card-meta"><span>Ремонт побутової техніки (Харків)</span><span style="color:#008cf0;">Корпоративний портал ↗</span></div>
    </a>

    <!-- Card 07: VULCAN 3D Lab -->
    <a href="3d-print/" class="card" data-rv="up" data-cursor style="text-decoration:none;">
      <div class="card-fr" data-frame>
        <span class="card-ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#ff5500" stroke-width="1.3"/></svg></span>
        <i class="glow glow--flame" style="--gx:65.0%; --gy:35.0%; --gr:24%; --gt:4.2s; --gt2:6.8s; --gc1:rgba(255,85,0,.75); --gc2:rgba(245,158,11,.35)"></i>
        <div class="card-lab"><b>VULCAN 3D</b><span class="jp" style="color:#ff5500;">造形</span></div>
      </div>
      <div class="card-meta"><span>3D-печать под заказ</span><span style="color:#ff5500;">Интерактивный Lab ↗</span></div>
    </a>
  </div>'''

html = re.sub(r'<div class=\"cards\" id=\"cards\">.*?</div>\s*</section>', cards_replacement + '\n</section>', html, flags=re.DOTALL)

# 6. Audio Engine Controller Script
radio_script = '''
<script type="module">
  import { radio } from './assets/js/audio-engine.js';

  document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('radio-toggle-btn');
    const prevBtn = document.getElementById('radio-prev-btn');
    const nextBtn = document.getElementById('radio-next-btn');
    const muteBtn = document.getElementById('radio-mute-btn');
    const tickerText = document.getElementById('radio-ticker-text');
    const eqBars = document.querySelectorAll('#radio-eq-bars .eq-bar');

    radio.on('trackchange', ({ track, index }) => {
      if (tickerText) tickerText.textContent = `${String(index + 1).padStart(2, '0')}. ${track.artist} - ${track.title}`;
    });

    radio.on('playstate', ({ isPlaying }) => {
      if (toggleBtn) {
        toggleBtn.textContent = isPlaying ? '❚❚' : '▶';
        toggleBtn.style.background = isPlaying ? '#e0231c' : 'rgba(224, 35, 28, 0.25)';
        toggleBtn.style.color = isPlaying ? '#ffffff' : '#dfe7e0';
      }
    });

    radio.on('mute', ({ isMuted }) => {
      if (muteBtn) muteBtn.textContent = isMuted ? '🔇' : '🔊';
    });

    toggleBtn?.addEventListener('click', () => radio.togglePlay());
    prevBtn?.addEventListener('click', () => radio.prev());
    nextBtn?.addEventListener('click', () => radio.next());
    muteBtn?.addEventListener('click', () => radio.toggleMute());

    // Live Equalizer loop
    const loopEq = () => {
      requestAnimationFrame(loopEq);
      const levels = radio.getEqualizerLevels();
      if (eqBars.length >= 3) {
        eqBars[0].style.height = `${Math.floor(levels[0] * 10 + 2)}px`;
        eqBars[1].style.height = `${Math.floor(levels[1] * 12 + 3)}px`;
        eqBars[2].style.height = `${Math.floor(levels[2] * 8 + 2)}px`;
      }
    };
    loopEq();
  });
</script>
'''

html = html.replace('</body>', radio_script + '\n</body>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Built authentic index.html from original Kage template!')
