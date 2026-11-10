import os, json, re

# Read current index.html
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Ensure CSS additions are in place
css_styles = '''
/* === BILINGUAL I18N SWITCHER & RICH PORTFOLIO ENHANCEMENTS === */
.lang-switch-box {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(223, 231, 224, 0.16);
  border-radius: 9999px;
  padding: 3px 6px;
  font-family: var(--font-mono, 'JetBrains Mono', monospace);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  margin-left: auto;
}
.lang-opt-btn {
  background: transparent;
  border: none;
  color: rgba(223, 231, 224, 0.6);
  cursor: pointer;
  padding: 3px 7px;
  border-radius: 6px;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: 1;
}
.lang-opt-btn:hover {
  color: #fff;
}
.lang-opt-btn.active {
  background: #e0231c;
  color: #fff;
  box-shadow: 0 0 12px rgba(224, 35, 28, 0.45);
}
.lang-divider {
  color: rgba(223, 231, 224, 0.25);
  font-size: 10px;
  user-select: none;
}

/* Developer Profile Enhancements in #gate */
.dev-profile-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  margin: 32px 0 24px;
}
.dev-pillar-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(223, 231, 224, 0.1);
  border-radius: 16px;
  padding: 18px 20px;
  transition: all 0.3s ease;
}
.dev-pillar-card:hover {
  border-color: rgba(224, 35, 28, 0.35);
  background: rgba(255, 255, 255, 0.04);
  transform: translateY(-2px);
}
.dev-pillar-title {
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.dev-pillar-desc {
  font-size: 12px;
  color: rgba(223, 231, 224, 0.65);
  line-height: 1.6;
}

/* 6-Project Responsive Cards Grid in #pathways */
.cards, body[data-layout-gallery="b"] .cards {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)) !important;
  grid-template-rows: auto !important;
  gap: clamp(16px, 1.8vw, 24px) !important;
  align-items: stretch !important;
}
body[data-layout-gallery="b"] .card, .card {
  transform: none !important;
  display: flex !important;
  flex-direction: column !important;
  min-height: 0 !important;
  grid-row: auto !important;
  background: rgba(14, 18, 24, 0.7);
  border: 1px solid rgba(223, 231, 224, 0.1);
  border-radius: 18px;
  overflow: hidden;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
}
.card:hover {
  border-color: rgba(224, 35, 28, 0.4);
  transform: translateY(-4px) !important;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6);
}

.card-fr, body[data-layout-gallery="b"] .card-fr {
  flex: 0 0 auto !important;
  height: 220px !important;
  min-height: 220px !important;
  position: relative;
  overflow: hidden;
  background: #090c10;
  border-bottom: 1px solid rgba(223, 231, 224, 0.08);
}
.card-bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: contrast(1.08) brightness(0.85);
  transition: transform 0.4s ease;
}
.card:hover .card-bg-img {
  transform: scale(1.05);
}
.card-top-tag {
  position: absolute;
  top: 14px;
  left: 14px;
  z-index: 3;
  padding: 4px 10px;
  border-radius: 9999px;
  background: rgba(7, 9, 13, 0.88);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  font-family: var(--font-mono, monospace);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: #e2e8f0;
  text-transform: uppercase;
}
.card-body {
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: space-between;
}
.card-desc {
  font-size: 13px;
  color: rgba(223, 231, 224, 0.72);
  line-height: 1.6;
  margin-bottom: 14px;
}
.card-tech-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}
.card-tech-pills span {
  font-family: var(--font-mono, monospace);
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #cbd5e1;
}
.card-link-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 12px;
  font-size: 12px;
  font-weight: 700;
  color: #e0231c;
}
.card-link-bar .alt-link {
  color: rgba(223, 231, 224, 0.6);
  text-decoration: none;
  font-size: 11px;
}
.card-link-bar .alt-link:hover {
  color: #fff;
}

@media (max-width: 768px) {
  .cards, body[data-layout-gallery="b"] .cards {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
  }
  .card-fr, body[data-layout-gallery="b"] .card-fr {
    height: 190px !important;
    min-height: 190px !important;
  }
  .dev-profile-grid {
    grid-template-columns: 1fr;
  }
}
'''

if '.lang-switch-box' not in html:
    html = html.replace('</style>', css_styles + '\n</style>', 1)

# 2. Update Header Navigation with Language Switcher and links
old_nav_pattern = r'<header class="nav" id="nav">.*?</header>'
new_nav = '''<header class="nav" id="nav">
  <a class="brand" href="#top" data-cursor>
    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <circle cx="22" cy="25" r="8.6" fill="#e0231c" fill-opacity=".9"/>
      <path d="M5 13h34M9 18.4h26M22 8.5v27" stroke="#dfe7e0" stroke-width="1.5"/>
      <path d="M14 35.5h16" stroke="#dfe7e0" stroke-width="1.2" stroke-opacity=".6"/>
    </svg>
    <span class="brand-tx"><b>ARCH1CAT</b><i>CHIEF SYSTEM ARCHITECT</i></span>
  </a>

  <!-- Active Theory Radio Player (Kyoto Temple Edition) -->
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

  <!-- Language Switcher [ UK | EN ] -->
  <div class="lang-switch-box" id="lang-switch" title="Змінити мову / Switch language">
    <button class="lang-opt-btn active" data-lang="uk">УКР</button>
    <span class="lang-divider">/</span>
    <button class="lang-opt-btn" data-lang="en">ENG</button>
  </div>

  <nav class="nav-links" id="navlinks">
    <a class="nav-link" href="#gate" data-cursor><span data-i18n="nav.foundations">Про мене</span><span class="alt">基盤</span></a>
    <a class="nav-link" href="#pathways" data-cursor><span data-i18n="nav.works">Проєкти</span><span class="alt">作品</span></a>
    <a class="nav-link" href="#lessons" data-cursor><span data-i18n="nav.craft">Майстерність</span><span class="alt">手業</span></a>
    <a class="nav-link" href="#eternity" data-cursor><span data-i18n="nav.signal">Контакти</span><span class="alt">連絡</span></a>
    <a href="https://yotei.com.ua/" target="_blank" rel="noopener noreferrer" class="nav-ext-pill" data-cursor style="color:#00f2fe;"><span>Yotei CRM ↗</span></a>
    <a href="rempobut/" class="nav-ext-pill" data-cursor style="color:#ff6600;"><span>ТехноVovk ↗</span></a>
    <a href="activetheory/" class="nav-ext-pill" data-cursor style="color:#e0231c;"><span>Active Theory ↗</span></a>
  </nav>
  <button class="nav-burger" aria-label="Menu" data-cursor><i></i><i></i></button>
</header>'''

html = re.sub(old_nav_pattern, new_nav, html, flags=re.DOTALL)

# 3. Update Section 00 (#hero)
old_hero_pattern = r'<section class="sec" id="hero".*?</section>'
new_hero = '''<section class="sec" id="hero" data-cam="0">
  <div class="hero-top" data-rv="fade">
    <span class="hero-ch" data-i18n="hero.chapter">Розділ 00 — Архітектура & Ремесло</span>
    <span class="hero-sub jp">影の道</span>
  </div>

  <h1 class="hero-t" data-rv="fade" id="hero-title">
    <span class="mask-line"><span data-i18n="hero.title_line1">Де майстерність</span></span>
    <span class="mask-line"><span data-i18n="hero.title_line2">розкриває</span></span>
    <span class="mask-line"><span data-i18n="hero.title_line3">приховане.</span></span>
  </h1>

  <p class="hero-p" data-rv="fade" data-i18n="hero.desc">
    Програмна інженерія як високе ремесло. Портфоліо arch1cat — Chief System & UX Architect. Хмарна нерухомість enterprise-рівня, субметрові 3D WebGL рушії, автономні AI екосистеми та нативні Android Kotlin системи.
  </p>

  <div class="scroll-cue" data-rv="fade">
    <div class="scroll-mouse" aria-hidden="true"></div>
    <span data-i18n="hero.scroll_cue">Гортайте, щоб увійти в храм</span>
  </div>

  <div class="hero-bottom" data-rv="fade">
    <div class="chips" id="chips">
      <div class="chip" data-cursor><span><b data-i18n="hero.chip1_title">01 Системи</b><p data-i18n="hero.chip1_desc">Хмарна інфраструктура та екосистеми нерухомості.</p></span></div>
      <div class="chip" data-cursor><span><b data-i18n="hero.chip2_title">02 WebGL 3D</b><p data-i18n="hero.chip2_desc">Субметровий DEM raymarching та тактична балістика.</p></span></div>
      <div class="chip" data-cursor><span><b data-i18n="hero.chip3_title">03 Автономний AI</b><p data-i18n="hero.chip3_desc">Мультиагентна оркестрація, CoT планування та Hermes.</p></span></div>
      <div class="chip" data-cursor><span><b data-i18n="hero.chip4_title">04 Нативний Kotlin</b><p data-i18n="hero.chip4_desc">Jetpack Compose, 2.4/5GHz RF діагностика та passkeys.</p></span></div>
    </div>
  </div>

  <a class="peek" href="#pathways" data-rv="fade" data-cursor aria-label="Переглянути: Yotei CRM">
    <span class="peek-lab"><b>Yotei CRM</b><i class="jp">不動産</i></span>
    <span class="peek-meta" data-i18n="hero.peek_meta">Enterprise Proptech · live</span>
  </a>
</section>'''

html = re.sub(old_hero_pattern, new_hero, html, flags=re.DOTALL)

# 4. Update Section 01 (#gate - Foundations & Developer Profile)
old_gate_pattern = r'<section class="sec" id="gate".*?</section>'
new_gate = '''<section class="sec" id="gate" data-cam="1">
  <div class="fg" data-fg="gate" aria-hidden="true">
    <span class="fg-el fg-wall" data-fg-in="left">
      <img crossorigin="anonymous" src="https://ublctyddhtbgaersvxxb.supabase.co/storage/v1/object/public/threeui-media/scene-images/35388445965f970fa28af333/temple-wall.webp" alt="" width="1536" height="1024" loading="lazy" decoding="async">
    </span>
    <span class="fg-el fg-pine" data-fg-in="right">
      <img crossorigin="anonymous" src="https://ublctyddhtbgaersvxxb.supabase.co/storage/v1/object/public/threeui-media/scene-images/35388445965f970fa28af333/pine-tree.webp" alt="" width="1536" height="1024" loading="lazy" decoding="async">
    </span>
    <span class="fg-el fg-grass" data-fg-in="up">
      <img crossorigin="anonymous" src="https://ublctyddhtbgaersvxxb.supabase.co/storage/v1/object/public/threeui-media/scene-images/35388445965f970fa28af333/tall-grass.webp" alt="" width="1717" height="696" loading="lazy" decoding="async">
    </span>
  </div>

  <div class="sec-head" data-rv="fade">
    <span class="k"><b data-i18n="gate.sec_head">01 — Про розробника & Фундамент</b></span><span class="rule"></span><span class="k jp">基盤</span>
  </div>

  <div class="story" data-rv="up">
    <h2 data-i18n="gate.title">Архітектурна строгість, нуль зайвого шуму, системи збудовані на віки.</h2>
    <p data-i18n="gate.p1">
      Мене звати Керя (arch1cat) — Lead System & UX Architect, Full-Stack інженер та творець цифрових продуктів. Мій підхід базується на безкомпромісній відмові від поверхових «AI-слоп» заглушок та половинчастих рішень. Кожна система проектується для екстремальних навантажень, гарантуючи детермінізм, високу швидкість та абсолютну надійність у продакшені.
    </p>
    <p data-i18n="gate.p2">
      Парне програмування на стику frontier AI моделей та глибокої людської інтуїції. Дотримання Залізного Закону Верифікації (The Iron Law of Verification): жоден баг не вважається виправленим, а фіча — створеною, без свіжих прогонів тестів, суворої типізації TypeScript та візуального аудиту рендерингу. Модульність за правилом 300 рядків, атомарні транзакції баз даних та мілісекундний час відгуку.
    </p>
    <p data-i18n="gate.p3">
      Ключовий стек: Cloudflare Workers, D1 (Distributed SQLite), R2, KV, Next.js, Three.js WebGL 2.0, GLSL шейдери, Hermes Agent, нативний Android Kotlin. Від enterprise CRM систем, що синхронізують тисячі об'єктів нерухомості в реальному часі, до субметрових балістичних симуляторів рельєфу.
    </p>
  </div>

  <!-- 4 Core Pillars of the Architect -->
  <div class="dev-profile-grid" data-rv="up">
    <div class="dev-pillar-card">
      <div class="dev-pillar-title"><span style="color:#00f2fe;">☁️</span><span data-i18n="gate.pillar1_title">Розподілені хмарні платформи</span></div>
      <div class="dev-pillar-desc" data-i18n="gate.pillar1_desc">Cloudflare Workers, D1 distributed SQL, R2, KV, Next.js 16, Prisma та відмовостійкі мікросервісні конвеєри.</div>
    </div>
    <div class="dev-pillar-card">
      <div class="dev-pillar-title"><span style="color:#10b981;">🌐</span><span data-i18n="gate.pillar2_title">3D WebGL & Просторова графіка</span></div>
      <div class="dev-pillar-desc" data-i18n="gate.pillar2_desc">Three.js, WebGL 2.0, авторські GLSL шейдери, субметровий DEM raymarching, 60 FPS оптимізація.</div>
    </div>
    <div class="dev-pillar-card">
      <div class="dev-pillar-title"><span style="color:#ff6600;">🤖</span><span data-i18n="gate.pillar3_title">Автономні AI мультиагенти</span></div>
      <div class="dev-pillar-desc" data-i18n="gate.pillar3_desc">Оркестрація Hermes Agent, ланцюжки міркувань CoT, автоматизовані ворота верифікації та інструментальні виклики.</div>
    </div>
    <div class="dev-pillar-card">
      <div class="dev-pillar-title"><span style="color:#e0231c;">📱</span><span data-i18n="gate.pillar4_title">Нативний Android & RF системи</span></div>
      <div class="dev-pillar-desc" data-i18n="gate.pillar4_desc">Kotlin, Jetpack Compose, аналіз спектра 2.4/5GHz Wi-Fi, діагностика мереж та біометричні passkeys.</div>
    </div>
  </div>

  <div class="stats" data-rv="up">
    <div><b>08</b><span data-i18n="gate.stat1_label">Головних систем</span></div>
    <div><b>100M+</b><span data-i18n="gate.stat2_label">Токенів аналізу щодня</span></div>
    <div><b>1,611+</b><span data-i18n="gate.stat3_label">Продакшн-комітів</span></div>
    <div><b>60 FPS</b><span data-i18n="gate.stat4_label">Графіка реального часу</span></div>
  </div>
</section>'''

html = re.sub(old_gate_pattern, new_gate, html, flags=re.DOTALL)

# 5. Update Section 02 (#pathways - 6 Featured Projects)
old_pathways_pattern = r'<section class="sec" id="pathways".*?</section>'
new_pathways = '''<section class="sec" id="pathways" data-cam="2">
  <div class="fg" data-fg="pathways" aria-hidden="true">
    <span class="fg-el fg-sakura fg-el--sway" data-fg-in="left">
      <img crossorigin="anonymous" src="https://ublctyddhtbgaersvxxb.supabase.co/storage/v1/object/public/threeui-media/scene-images/35388445965f970fa28af333/sakura-branch.webp" alt="" width="1536" height="1024" loading="lazy" decoding="async">
    </span>
    <span class="fg-el fg-leaves fg-el--sway" data-fg-in="right">
      <img crossorigin="anonymous" src="https://ublctyddhtbgaersvxxb.supabase.co/storage/v1/object/public/threeui-media/scene-images/35388445965f970fa28af333/maple-leaves.webp" alt="" width="1536" height="1024" loading="lazy" decoding="async">
    </span>
    <span class="fg-el fg-lantern" data-fg-in="up">
      <img crossorigin="anonymous" src="https://ublctyddhtbgaersvxxb.supabase.co/storage/v1/object/public/threeui-media/scene-images/35388445965f970fa28af333/stone-lantern.webp" alt="" width="1024" height="1499" loading="lazy" decoding="async">
    </span>
    <span class="fg-el fg-bush" data-fg-in="up">
      <img crossorigin="anonymous" src="https://ublctyddhtbgaersvxxb.supabase.co/storage/v1/object/public/threeui-media/scene-images/35388445965f970fa28af333/garden-bush.webp" alt="" width="1717" height="876" loading="lazy" decoding="async">
    </span>
  </div>

  <div class="sec-head" data-rv="fade">
    <span class="k"><b data-i18n="works.sec_head">02 — Флагманські проєкти</b></span><span class="rule"></span><span class="k jp">作品</span>
  </div>

  <div class="cards" id="cards">
    
    <!-- 1. Yotei CRM -->
    <article class="card" data-rv="up" data-view="0" data-cursor onclick="window.open('https://yotei.com.ua/','_blank')">
      <div class="card-fr" data-frame>
        <img src="assets/textures/projects/yotei.png" class="card-bg-img" alt="Yotei CRM" />
        <div class="card-top-tag" style="border-color:rgba(0,242,254,0.4); color:#00f2fe;">PROPTECH ENTERPRISE</div>
        <span class="card-ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>
        <i class="glow" style="--gx:80.2%; --gy:23.9%; --gr:22%; --gt:6.1s; --gt2:9.7s; --gc1:rgba(0,242,254,.50); --gc2:rgba(14,165,233,.24)"></i>
        <div class="card-lab"><b>Yotei CRM</b><span class="jp">不動産</span></div>
      </div>
      <div class="card-body">
        <p class="card-desc" data-i18n="works.p1_desc">
          Хмарна enterprise-екосистема нерухомості. 1:1 паритет із RealtSoft CRM, 3-рівнева таксономія, Cloudflare Workers, D1 distributed SQL, R2, тримовна локалізація (UK/RU/EN).
        </p>
        <div class="card-tech-pills">
          <span>Cloudflare Workers</span><span>D1 SQL</span><span>Next.js 16</span><span>Prisma</span><span>R2</span>
        </div>
        <div class="card-link-bar">
          <span style="color:#00f2fe;">yotei.com.ua ↗</span>
          <span class="alt-link">Live Production</span>
        </div>
      </div>
    </article>

    <!-- 2. ТехноVovk Сервіс Ремонту Техніки (Харків) -->
    <article class="card" data-rv="up" data-view="1" data-cursor onclick="window.open('rempobut/','_blank')">
      <div class="card-fr" data-frame>
        <img src="assets/textures/projects/technovovk.jpg" class="card-bg-img" alt="ТехноVovk Харків" />
        <div class="card-top-tag" style="border-color:rgba(255,102,0,0.5); color:#ff7e1e;">SERVICE BUSINESS & GIS</div>
        <span class="card-ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>
        <i class="glow" style="--gx:65%; --gy:40%; --gr:24%; --gt:4.2s; --gt2:8.1s; --gc1:rgba(255,102,0,.55); --gc2:rgba(255,140,46,.25)"></i>
        <div class="card-lab"><b>ТехноVovk</b><span class="jp">修理</span></div>
      </div>
      <div class="card-body">
        <p class="card-desc" data-i18n="works.p2_desc">
          Комерційний портал сервісного центру побутової техніки (пр. Героїв Харкова, 35). Інтерактивна Google-карта з живим прокладанням маршрутів на авто та транспорті, онлайн-калькулятор вартості, 4 інженерні напрямки, 100% мобільна адаптивність.
        </p>
        <div class="card-tech-pills">
          <span>Google Maps API</span><span>Route Planner</span><span>Live Calculator</span><span>Mobile-First</span>
        </div>
        <div class="card-link-bar">
          <span style="color:#ff7e1e;">rempobut/ (Темний) ↗</span>
          <a href="fixora/" target="_blank" onclick="event.stopPropagation()" class="alt-link" style="color:var(--orange-bright);">fixora/ (Жовтий) ↗</a>
        </div>
      </div>
    </article>

    <!-- 3. Active Theory 3D WebGL Engine -->
    <article class="card" data-rv="up" data-view="2" data-cursor onclick="window.open('activetheory/','_blank')">
      <div class="card-fr" data-frame>
        <img src="assets/textures/projects/meta-cleaner.png" class="card-bg-img" alt="Active Theory 3D WebGL" />
        <div class="card-top-tag" style="border-color:rgba(224,35,28,0.45); color:#ff4d45;">CREATIVE 3D WEBGL</div>
        <span class="card-ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>
        <i class="glow glow--flame" style="--gx:50%; --gy:30%; --gr:20%; --gt:3.5s; --gt2:6.0s; --gc1:rgba(224,35,28,.65); --gc2:rgba(180,20,15,.30)"></i>
        <div class="card-lab"><b>Active Theory</b><span class="jp">空間</span></div>
      </div>
      <div class="card-body">
        <p class="card-desc" data-i18n="works.p3_desc">
          100% автономний рендеринг-рушій Active Theory WebGL 2.0. Динамічна карусель просторових проєктів, аудіокапсула радіо, шейдери частинок та кінематографічна інтерактивність на 60 FPS.
        </p>
        <div class="card-tech-pills">
          <span>WebGL 2.0</span><span>GLSL Shaders</span><span>Three.js</span><span>Spatial Audio</span>
        </div>
        <div class="card-link-bar">
          <span style="color:#ff4d45;">activetheory/ ↗</span>
          <span class="alt-link">Interactive 3D</span>
        </div>
      </div>
    </article>

    <!-- 4. WARDOGS 3D -->
    <article class="card" data-rv="up" data-cursor onclick="window.open('https://l2bote4game.github.io/wardogs-tactical-map/','_blank')">
      <div class="card-fr" data-frame>
        <img src="assets/textures/projects/wardogs.png" class="card-bg-img" alt="WARDOGS 3D" />
        <div class="card-top-tag" style="border-color:rgba(16,185,129,0.45); color:#10b981;">TACTICAL GIS & SIM</div>
        <span class="card-ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>
        <i class="glow glow--flame" style="--gx:70.5%; --gy:47.2%; --gr:14%; --gt:3.7s; --gt2:5.3s; --gc1:rgba(16,185,129,.62); --gc2:rgba(5,150,105,.30)"></i>
        <div class="card-lab"><b>WARDOGS 3D</b><span class="jp">弾道学</span></div>
      </div>
      <div class="card-body">
        <p class="card-desc" data-i18n="works.p4_desc">
          Військово-тактична 3D ГІС система реального часу: субметровий DEM raymarching рельєфу, розрахунок балістичних траєкторій, кутів наведення артилерії та розвідка висот.
        </p>
        <div class="card-tech-pills">
          <span>DEM Raymarching</span><span>Ballistics</span><span>Tactical GIS</span><span>Three.js</span>
        </div>
        <div class="card-link-bar">
          <span style="color:#10b981;">Live WebGL ↗</span>
          <span class="alt-link">Sub-Meter Precision</span>
        </div>
      </div>
    </article>

    <!-- 5. World Monitor -->
    <article class="card" data-rv="up" data-cursor onclick="window.open('https://github.com/l2bote4game/world-monitor','_blank')">
      <div class="card-fr" data-frame>
        <img src="assets/textures/projects/world-monitor.png" class="card-bg-img" alt="World Monitor" />
        <div class="card-top-tag" style="border-color:rgba(245,158,11,0.45); color:#f59e0b;">CYBER INTELLIGENCE</div>
        <span class="card-ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>
        <i class="glow" style="--gx:48.0%; --gy:16.8%; --gr:20%; --gt:7.3s; --gt2:11.2s; --gc1:rgba(245,158,11,.52); --gc2:rgba(217,119,6,.24)"></i>
        <div class="card-lab"><b>World Monitor</b><span class="jp">諜報</span></div>
      </div>
      <div class="card-body">
        <p class="card-desc" data-i18n="works.p5_desc">
          Глобальна система моніторингу загроз OSINT: супутникові трекери, кіберінциденти, геопросторовий аналіз радіочастот та агрегація розвідданих у реальному часі.
        </p>
        <div class="card-tech-pills">
          <span>OSINT Telemetry</span><span>Satellite Tracking</span><span>Cybersecurity</span><span>GeoJSON</span>
        </div>
        <div class="card-link-bar">
          <span style="color:#f59e0b;">GitHub Repository ↗</span>
          <span class="alt-link">Global Threat Stream</span>
        </div>
      </div>
    </article>

    <!-- 6. VULCAN 3D Lab -->
    <article class="card" data-rv="up" data-cursor onclick="window.open('3d-print/','_blank')">
      <div class="card-fr" data-frame>
        <img src="assets/textures/projects/opengym.png" class="card-bg-img" alt="VULCAN 3D Lab" />
        <div class="card-top-tag" style="border-color:rgba(168,85,247,0.45); color:#c084fc;">CUSTOM MANUFACTURING</div>
        <span class="card-ar"><svg viewBox="0 0 14 14" fill="none"><path d="M3 11 11 3M5 3h6v6" stroke="#dfe7e0" stroke-width="1.3"/></svg></span>
        <i class="glow" style="--gx:60%; --gy:50%; --gr:20%; --gt:5.8s; --gt2:9.0s; --gc1:rgba(168,85,247,.5); --gc2:rgba(147,51,234,.25)"></i>
        <div class="card-lab"><b>VULCAN 3D</b><span class="jp">造形</span></div>
      </div>
      <div class="card-body">
        <p class="card-desc" data-i18n="works.p6_desc">
          Інтерактивна 3D-лабораторія виготовлення деталей під замовлення: онлайн-перегляд 3D моделей, конфігуратор інженерних полімерів (ABS, PETG, Nylon, Carbon) та миттєвий прорахунок.
        </p>
        <div class="card-tech-pills">
          <span>3D WebGL Configurator</span><span>FDM/SLA Engineering</span><span>Polymers</span>
        </div>
        <div class="card-link-bar">
          <span style="color:#c084fc;">3d-print/ ↗</span>
          <span class="alt-link">Interactive Lab</span>
        </div>
      </div>
    </article>

  </div>
</section>'''

html = re.sub(old_pathways_pattern, new_pathways, html, flags=re.DOTALL)

# 6. Update Section 03 (#lessons - Sacred Craft)
old_lessons_pattern = r'<section class="sec" id="lessons".*?</section>'
new_lessons = '''<section class="sec" id="lessons" data-cam="3">
  <div class="sec-head" data-rv="fade">
    <span class="k"><b data-i18n="craft.sec_head">03 — Інженерна майстерність</b></span><span class="rule"></span><span class="k jp">手業</span>
  </div>

  <div class="cur-head" data-rv="up">
    <h2 data-i18n="craft.title">П'ять дисциплін. Безкомпромісне виконання. Спокійний розум.</h2>
    <p data-i18n="craft.desc">
      Філософія, викувана в бойових релізах: глибока коректність предметної області, автоматизовані шлюзи верифікації та сумнів щодо неперевірених припущень.
    </p>
  </div>

  <ol class="cur-list" id="cur">
    <li class="cur-row" data-rv="up" data-cursor>
      <div class="cur-num">01</div>
      <div class="cur-body">
        <div class="cur-t-row">
          <h3><span data-i18n="craft.d1_title">Чиста архітектура</span><em class="jp">山門</em></h3>
          <span class="cur-dur" data-i18n="craft.d1_tag">Архітектура</span>
        </div>
        <p data-i18n="craft.d1_desc">Чіткі межі предметної області, двостороння синхронізація, нуль витоків пам'яті та детерміністичні схеми баз даних.</p>
      </div>
    </li>
    <li class="cur-row" data-rv="up" data-cursor>
      <div class="cur-num">02</div>
      <div class="cur-body">
        <div class="cur-t-row">
          <h3><span data-i18n="craft.d2_title">3D WebGL реального часу</span><em class="jp">借景</em></h3>
          <span class="cur-dur" data-i18n="craft.d2_tag">Three.js</span>
        </div>
        <p data-i18n="craft.d2_desc">Shakkei: субметровий DEM raymarching, авторські шейдери GLSL, 60 FPS продуктивність без важких сторонніх ассетів.</p>
      </div>
    </li>
    <li class="cur-row" data-rv="up" data-cursor>
      <div class="cur-num">03</div>
      <div class="cur-body">
        <div class="cur-t-row">
          <h3><span data-i18n="craft.d3_title">Автономні мультиагентні AI системи</span><em class="jp">焼杉</em></h3>
          <span class="cur-dur" data-i18n="craft.d3_tag">AI Agents</span>
        </div>
        <p data-i18n="craft.d3_desc">Оркестрація Hermes Agent, глибоке CoT міркування, автоматизовані конвеєри верифікації та інструментальні шлюзи.</p>
      </div>
    </li>
    <li class="cur-row" data-rv="up" data-cursor>
      <div class="cur-num">04</div>
      <div class="cur-body">
        <div class="cur-t-row">
          <h3><span data-i18n="craft.d4_title">Нативний Android та RF-системи</span><em class="jp">灯籠</em></h3>
          <span class="cur-dur" data-i18n="craft.d4_tag">Kotlin</span>
        </div>
        <p data-i18n="craft.d4_desc">Kotlin, Jetpack Compose, спектральний аналіз радіочастот 2.4/5GHz, діагностика підмереж та безпека WebAuthn passkeys.</p>
      </div>
    </li>
    <li class="cur-row" data-rv="up" data-cursor>
      <div class="cur-num">05</div>
      <div class="cur-body">
        <div class="cur-t-row">
          <h3><span data-i18n="craft.d5_title">Хмарна Edge-інфраструктура</span><em class="jp">朱月</em></h3>
          <span class="cur-dur" data-i18n="craft.d5_tag">Cloudflare</span>
        </div>
        <p data-i18n="craft.d5_desc">Cloudflare Workers, розподілена база даних D1 SQL, сховище R2, кешування KV та глобальний час відгуку &lt;30 мс.</p>
      </div>
    </li>
  </ol>
</section>'''

html = re.sub(old_lessons_pattern, new_lessons, html, flags=re.DOTALL)

# 7. Update Section 04 (#eternity - Direct Signal & Collaboration)
old_eternity_pattern = r'<section class="sec" id="eternity".*?</section>'
new_eternity = '''<section class="sec" id="eternity" data-cam="4">
  <div class="sec-head" data-rv="fade">
    <span class="k"><b data-i18n="signal.chapter">Розділ 04 — Прямий зв'язок та співпраця</b></span><span class="rule"></span><span class="k jp">連絡</span>
  </div>

  <div class="eternity-hero" data-rv="up">
    <h2 data-i18n="signal.title">Післясвітло</h2>
    <p data-i18n="signal.desc">
      Брама не зачиняється за вами. Відкритий до складних викликів: проектування високонавантажених SaaS систем, 3D WebGL архітектури та автономних мультиагентних AI систем. Пряме парне програмування, інженерний консалтинг та реалізація нестандартних задач.
    </p>
  </div>

  <div class="contact-channels" data-rv="up" style="display:flex; gap:16px; flex-wrap:wrap; margin-top:32px;">
    <a href="https://t.me/Archi_____cat" target="_blank" rel="noopener noreferrer" class="btn btn-orange" data-cursor style="background:linear-gradient(135deg,#e0231c,#ff4d45); color:#fff; border-radius:9999px; padding:12px 24px; text-decoration:none; font-weight:700; font-size:13px; display:inline-flex; align-items:center; gap:8px;">
      <span>Telegram: @Archi_____cat ↗</span>
    </a>
    <a href="https://github.com/Arch1cat" target="_blank" rel="noopener noreferrer" class="btn btn-outline" data-cursor style="border:1px solid rgba(255,255,255,0.2); border-radius:9999px; padding:12px 24px; text-decoration:none; color:#fff; font-weight:700; font-size:13px; display:inline-flex; align-items:center; gap:8px;">
      <span>GitHub: @Arch1cat ↗</span>
    </a>
    <a href="https://x.com/Archi_____cat" target="_blank" rel="noopener noreferrer" class="btn btn-outline" data-cursor style="border:1px solid rgba(255,255,255,0.2); border-radius:9999px; padding:12px 24px; text-decoration:none; color:#fff; font-weight:700; font-size:13px; display:inline-flex; align-items:center; gap:8px;">
      <span>X (Twitter): @Archi_____cat ↗</span>
    </a>
  </div>
</section>'''

html = re.sub(old_eternity_pattern, new_eternity, html, flags=re.DOTALL)

# 8. Add i18n JavaScript engine before </body>
i18n_script = '''
<!-- ============================================================ Bilingual i18n Engine -->
<script>
const I18N_DICT = {
  uk: {
    nav: {
      foundations: "Про мене",
      works: "Проєкти",
      craft: "Майстерність",
      signal: "Контакти"
    },
    hero: {
      chapter: "Розділ 00 — Архітектура & Ремесло",
      title_line1: "Де майстерність",
      title_line2: "розкриває",
      title_line3: "приховане.",
      desc: "Програмна інженерія як високе ремесло. Портфоліо arch1cat — Chief System & UX Architect. Хмарна нерухомість enterprise-рівня, субметрові 3D WebGL рушії, автономні AI екосистеми та нативні Android Kotlin системи.",
      scroll_cue: "Гортайте, щоб увійти в храм",
      chip1_title: "01 Системи",
      chip1_desc: "Хмарна інфраструктура та екосистеми нерухомості.",
      chip2_title: "02 WebGL 3D",
      chip2_desc: "Субметровий DEM raymarching та тактична балістика.",
      chip3_title: "03 Автономний AI",
      chip3_desc: "Мультиагентна оркестрація, CoT планування та Hermes.",
      chip4_title: "04 Нативний Kotlin",
      chip4_desc: "Jetpack Compose, 2.4/5GHz RF діагностика та passkeys.",
      peek_meta: "Enterprise Proptech · live"
    },
    gate: {
      sec_head: "01 — Про розробника & Фундамент",
      title: "Архітектурна строгість, нуль зайвого шуму, системи збудовані на віки.",
      p1: "Мене звати Керя (arch1cat) — Lead System & UX Architect, Full-Stack інженер та творець цифрових продуктів. Мій підхід базується на безкомпромісній відмові від поверхових «AI-слоп» заглушок та половинчастих рішень. Кожна система проектується для екстремальних навантажень, гарантуючи детермінізм, високу швидкість та абсолютну надійність у продакшені.",
      p2: "Парне програмування на стику frontier AI моделей та глибокої людської інтуїції. Дотримання Залізного Закону Верифікації (The Iron Law of Verification): жоден баг не вважається виправленим, а фіча — створеною, без свіжих прогонів тестів, суворої типізації TypeScript та візуального аудиту рендерингу. Модульність за правилом 300 рядків, атомарні транзакції баз даних та мілісекундний час відгуку.",
      p3: "Ключовий стек: Cloudflare Workers, D1 (Distributed SQLite), R2, KV, Next.js, Three.js WebGL 2.0, GLSL шейдери, Hermes Agent, нативний Android Kotlin. Від enterprise CRM систем, що синхронізують тисячі об'єктів нерухомості в реальному часі, до субметрових балістичних симуляторів рельєфу.",
      pillar1_title: "Розподілені хмарні платформи",
      pillar1_desc: "Cloudflare Workers, D1 distributed SQL, R2, KV, Next.js 16, Prisma та відмовостійкі мікросервісні конвеєри.",
      pillar2_title: "3D WebGL & Просторова графіка",
      pillar2_desc: "Three.js, WebGL 2.0, авторські GLSL шейдери, субметровий DEM raymarching, 60 FPS оптимізація.",
      pillar3_title: "Автономні AI мультиагенти",
      pillar3_desc: "Оркестрація Hermes Agent, ланцюжки міркувань CoT, автоматизовані ворота верифікації та інструментальні виклики.",
      pillar4_title: "Нативний Android & RF системи",
      pillar4_desc: "Kotlin, Jetpack Compose, аналіз спектра 2.4/5GHz Wi-Fi, діагностика мереж та біометричні passkeys.",
      stat1_label: "Головних систем",
      stat2_label: "Токенів аналізу щодня",
      stat3_label: "Продакшн-комітів",
      stat4_label: "Графіка реального часу"
    },
    works: {
      sec_head: "02 — Флагманські проєкти",
      p1_desc: "Хмарна enterprise-екосистема нерухомості. 1:1 паритет із RealtSoft CRM, 3-рівнева таксономія, Cloudflare Workers, D1 distributed SQL, R2, тримовна локалізація (UK/RU/EN).",
      p2_desc: "Комерційний портал сервісного центру побутової техніки (пр. Героїв Харкова, 35). Інтерактивна Google-карта з живим прокладанням маршрутів на авто та транспорті, онлайн-калькулятор вартості, 4 інженерні напрямки, 100% мобільна адаптивність.",
      p3_desc: "100% автономний рендеринг-рушій Active Theory WebGL 2.0. Динамічна карусель просторових проєктів, аудіокапсула радіо, шейдери частинок та кінематографічна інтерактивність на 60 FPS.",
      p4_desc: "Військово-тактична 3D ГІС система реального часу: субметровий DEM raymarching рельєфу, розрахунок балістичних траєкторій, кутів наведення артилерії та розвідка висот.",
      p5_desc: "Глобальна система моніторингу загроз OSINT: супутникові трекери, кіберінциденти, геопросторовий аналіз радіочастот та агрегація розвідданих у реальному часі.",
      p6_desc: "Інтерактивна 3D-лабораторія виготовлення деталей під замовлення: онлайн-перегляд 3D моделей, конфігуратор інженерних полімерів (ABS, PETG, Nylon, Carbon) та миттєвий прорахунок."
    },
    craft: {
      sec_head: "03 — Інженерна майстерність",
      title: "П'ять дисциплін. Безкомпромісне виконання. Спокійний розум.",
      desc: "Філософія, викувана в бойових релізах: глибока коректність предметної області, автоматизовані шлюзи верифікації та сумнів щодо неперевірених припущень.",
      d1_title: "Чиста архітектура",
      d1_tag: "Архітектура",
      d1_desc: "Чіткі межі предметної області, двостороння синхронізація, нуль витоків пам'яті та детерміністичні схеми баз даних.",
      d2_title: "3D WebGL реального часу",
      d2_tag: "Three.js",
      d2_desc: "Shakkei: субметровий DEM raymarching, авторські шейдери GLSL, 60 FPS продуктивність без важких сторонніх ассетів.",
      d3_title: "Автономні мультиагентні AI системи",
      d3_tag: "AI Agents",
      d3_desc: "Оркестрація Hermes Agent, глибоке CoT міркування, автоматизовані конвеєри верифікації та інструментальні шлюзи.",
      d4_title: "Нативний Android та RF-системи",
      d4_tag: "Kotlin",
      d4_desc: "Kotlin, Jetpack Compose, спектральний аналіз радіочастот 2.4/5GHz, діагностика підмереж та безпека WebAuthn passkeys.",
      d5_title: "Хмарна Edge-інфраструктура",
      d5_tag: "Cloudflare",
      d5_desc: "Cloudflare Workers, розподілена база даних D1 SQL, сховище R2, кешування KV та глобальний час відгуку <30 мс."
    },
    signal: {
      chapter: "Розділ 04 — Прямий зв'язок та співпраця",
      title: "Післясвітло",
      desc: "Брама не зачиняється за вами. Відкритий до складних викликів: проектування високонавантажених SaaS систем, 3D WebGL архітектури та автономних мультиагентних AI систем. Пряме парне програмування, інженерний консалтинг та реалізація нестандартних задач."
    }
  },
  en: {
    nav: {
      foundations: "Foundations",
      works: "Works",
      craft: "Craft",
      signal: "Signal"
    },
    hero: {
      chapter: "Chapter 00 — Architecture & Craft",
      title_line1: "Where craft",
      title_line2: "reveals the",
      title_line3: "unseen.",
      desc: "Software as craft & play. Portfolio of arch1cat — Chief System & UX Architect. Enterprise proptech, sub-meter 3D WebGL engines, autonomous multi-agent AI ecosystems, and native Android Kotlin systems.",
      scroll_cue: "Scroll to enter the sanctuary",
      chip1_title: "01 Systems",
      chip1_desc: "Enterprise proptech & distributed cloud infrastructure.",
      chip2_title: "02 WebGL 3D",
      chip2_desc: "Sub-meter DEM raymarching & tactical ballistics.",
      chip3_title: "03 Autonomous AI",
      chip3_desc: "Multi-agent orchestration, CoT planning & Hermes.",
      chip4_title: "04 Native Kotlin",
      chip4_desc: "Jetpack Compose, 2.4/5GHz RF & Android security.",
      peek_meta: "Enterprise Proptech · live"
    },
    gate: {
      sec_head: "01 — The Foundations & Architect",
      title: "Architectural rigor, zero-fluff code, systems built to endure.",
      p1: "I'm arch1cat (Kerya) — Lead System & UX Architect, Full-Stack Engineer, and Digital Craftsman. My engineering philosophy rejects superficial 'AI slop' stubs and half-baked solutions. Every system is engineered to endure extreme load, edge latency, and relentless scale with guaranteed determinism and production-grade reliability.",
      p2: "Pair programming at the frontier of AI models and deep human intuition. The Iron Law of Verification: no bug is considered fixed and no feature completed without fresh execution proof, strict TypeScript schemas, and headless browser rendering audits. Modular 300-line architecture, atomic database transactions, and sub-millisecond responsiveness.",
      p3: "Full-stack engineering spanning Cloudflare Workers, D1 distributed SQL, R2, KV, Next.js, Three.js WebGL 2.0, GLSL shaders, Hermes Agent, and native Android Kotlin. From enterprise CRM pipelines syncing thousands of commercial properties to sub-millisecond tactical ballistics simulators.",
      pillar1_title: "Distributed Cloud Platforms",
      pillar1_desc: "Cloudflare Workers, D1 distributed SQL, R2, KV, Next.js 16, Prisma, and resilient microservice pipelines.",
      pillar2_title: "Real-Time 3D WebGL & Graphics",
      pillar2_desc: "Three.js, WebGL 2.0, custom GLSL shaders, sub-meter DEM raymarching, 60 FPS rendering pipelines.",
      pillar3_title: "Autonomous Multi-Agent AI",
      pillar3_desc: "Hermes Agent orchestration, CoT planning pipelines, automated verification gates, and dynamic tool calling.",
      pillar4_title: "Native Android & RF Systems",
      pillar4_desc: "Kotlin, Jetpack Compose, 2.4/5GHz RF spectrum diagnostics, subnet discovery, and WebAuthn passkeys.",
      stat1_label: "Core Systems",
      stat2_label: "Tokens Reasoned Daily",
      stat3_label: "Production Commits",
      stat4_label: "Real-Time WebGL"
    },
    works: {
      sec_head: "02 — Flagship Works",
      p1_desc: "Cloud enterprise proptech intelligence ecosystem. 1:1 RealtSoft CRM parity, 3-tier taxonomy, Cloudflare Workers, D1 distributed SQL, R2 storage, trilingual localization.",
      p2_desc: "Commercial portal for Kharkiv home appliance repair center (35 Heroiv Kharkova Ave). Interactive Google Maps route builder for cars and transit, dynamic live cost calculator with itemized parts breakdown, 100% mobile-first responsive architecture.",
      p3_desc: "100% standalone Active Theory WebGL 2.0 engine clone. Dynamic spatial project carousel, Kyoto audio radio capsule, custom particle GLSL shaders, and 60 FPS cinematic web graphics.",
      p4_desc: "Real-time military-tactical 3D GIS platform: sub-meter DEM raymarching, 60 FPS ballistic trajectories, artillery elevation calculators, and high-precision terrain elevation intelligence.",
      p5_desc: "Global threat & cyber telemetry OSINT platform: satellite tracking feeds, real-time incident mapping, RF signal intelligence, and live geospatial threat intelligence.",
      p6_desc: "Interactive custom 3D printing lab & showroom: real-time 3D model viewport, engineering polymer configurator (ABS, PETG, Nylon, Carbon), and production order pipeline."
    },
    craft: {
      sec_head: "03 — Sacred Craft",
      title: "Five disciplines. Relentless execution. One quiet mind.",
      desc: "A philosophy forged through production delivery: deep domain correctness, automated verification gates, and relentless doubt of unverified assumptions.",
      d1_title: "Clean Architecture",
      d1_tag: "Architecture",
      d1_desc: "Strict domain boundaries, bidirectional sync, zero-leak state management, and deterministic schema taxonomies.",
      d2_title: "Real-Time WebGL 3D",
      d2_tag: "Three.js",
      d2_desc: "Shakkei: sub-meter DEM raymarching, custom GLSL shaders, and 60 FPS performance without heavy external 3D assets.",
      d3_title: "Autonomous Multi-Agent AI",
      d3_tag: "AI Agents",
      d3_desc: "Hermes orchestration, high-context CoT reasoning, automated verification gates, and agentic toolkits.",
      d4_title: "Native Android & RF Systems",
      d4_tag: "Kotlin",
      d4_desc: "Kotlin, Jetpack Compose, 2.4/5GHz RF spectrum graphing, subnet diagnostics, and WebAuthn passkeys.",
      d5_title: "Edge Infrastructure & Cloud",
      d5_tag: "Cloudflare",
      d5_desc: "Cloudflare Workers, D1 distributed SQL, R2 object storage, KV caching, and sub-30ms global response times."
    },
    signal: {
      chapter: "Chapter 04 — Direct Signal & Collaboration",
      title: "Afterlight",
      desc: "The gate does not close behind you. Open to high-stakes 3D WebGL architectures, enterprise SaaS systems, and autonomous multi-agent engineering. Direct pair programming, architectural consulting, and frontier tech."
    }
  }
};

let currentAppLang = localStorage.getItem('arch1cat_lang') || 'uk';

function applyLanguage(lang) {
  currentAppLang = lang;
  localStorage.setItem('arch1cat_lang', lang);
  document.documentElement.lang = lang;

  // Update switcher buttons state
  document.querySelectorAll('#lang-switch .lang-opt-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  const dict = I18N_DICT[lang] || I18N_DICT.uk;

  // Helper to resolve nested key e.g. "hero.title_line1"
  function getVal(key) {
    const parts = key.split('.');
    let curr = dict;
    for (const p of parts) {
      if (!curr || curr[p] === undefined) return null;
      curr = curr[p];
    }
    return curr;
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = getVal(key);
    if (val !== null) {
      el.textContent = val;
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Wire up language switch buttons
  document.querySelectorAll('#lang-switch .lang-opt-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      applyLanguage(btn.dataset.lang);
    });
  });

  // Apply saved or default language
  applyLanguage(currentAppLang);
});
</script>
'''

if 'const I18N_DICT =' not in html:
    html = html.replace('</body>', i18n_script + '\n</body>', 1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Bilingual portfolio index.html successfully generated!')
