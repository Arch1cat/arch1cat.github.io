import os, json, re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the i18n_script at bottom of index.html with the upgraded version
old_i18n_script = r'<!-- ============================================================ Bilingual i18n Engine -->.*?</script>'

new_i18n_script = '''<!-- ============================================================ Bilingual i18n Engine -->
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
      // Check if this is a mask-line container or parent
      const parentMask = el.closest('.mask-line');
      if (parentMask) {
        el.textContent = val;
        // Also re-render word masks if parent was processed
        const maskLine = parentMask;
        maskLine.setAttribute('aria-label', val);
        maskLine.dataset.wordReady = 'false';
        maskLine.innerHTML = '';
        val.split(' ').forEach((w, i) => {
          if (i) maskLine.appendChild(document.createTextNode(' '));
          const mask = document.createElement('span');
          const inner = document.createElement('span');
          mask.className = 'word-mask'; mask.setAttribute('aria-hidden', 'true');
          inner.className = 'word'; inner.textContent = w;
          mask.appendChild(inner);
          maskLine.appendChild(mask);
        });
        maskLine.dataset.wordReady = 'true';
      } else {
        el.textContent = val;
      }
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
</script>'''

html = re.sub(old_i18n_script, new_i18n_script, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Updated i18n script in index.html!')
