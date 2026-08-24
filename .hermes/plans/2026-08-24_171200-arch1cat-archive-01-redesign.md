# arch1cat — «ARCHIVE//01» Cinematic Redesign Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.
> **SUPERSEDES:** оба предыдущих плана (`neon-os`, `neon-holodeck`) — полностью. Зелёная Cyber-Matrix тема уничтожается целиком: палитра, типографика, сцена, кнопки, курсор, звук. От старого сайта остаются только тексты контента и ссылки.

**Goal:** Кардинальный редизайн в эстетике Kage × ThreeUI: кинематографичный тёмный «архив» с гигантской редакционной типографикой, одним вермильоновым акцентом на угольном чёрном, живой WebGL-сценой-экспонатом и тактильными объектами/кнопками, реагирующими на курсор.

**Architecture:** Статический сайт без сборки. `index.html` (Tailwind CDN) + `assets/css/style.css` + два ES-модуля (`three-scene.js` — мир, `ui.js` — DOM-интерактив). Three.js r170 через importmap. Сцена = «галерея экспонатов»: камера переезжает между главами по скроллу, объекты имеют пружинную физику отталкивания от курсора.

**Tech Stack:** Vanilla HTML/CSS/JS · Three.js r170 (importmap, jsdelivr pinned) · EffectComposer + UnrealBloomPass (дозированно) · Raycaster · Tailwind Play CDN · Google Fonts (Instrument Serif + Space Grotesk + JetBrains Mono) · GitHub REST API (кэш+fallback) · Web Audio API · GitHub Pages.

---

## Референсы (изучены)

- **Kage (mengto.github.io/kage):** «WHERE STILLNESS REVEALS THE UNSEEN» — главы 00–04, огромные заголовки в 3 строки, вермильоновая луна как единственный цвет, статблоки с гигантскими числами (05 CHAPTERS / 92 MINUTES / ∞), моно-подписи, вертикальные японские вставки, футер-колофон. Скорость медленная, всё «дышит».
- **ThreeUI:** премиальные шейдерные сцены — мягкие градиентные горизонты, атмосферный туман, стеклянные панели поверх, дорогой свет. Компоненты типа AtTheHorizon.

## Context

Репо `C:\Users\z\Desktop\arch1cat_site` → `Arch1cat/arch1cat.github.io` (Pages, main, `.nojekyll`). Сейчас один `index.html` 665 строк, зелёная матрица, Three r128. Контент сохраняем: hero-интро, 4 OSS-карточки (World Monitor, WiFi Scanner, Metadata Cleaner, Cats Match-3), Yotei showcase, GitHub Snake, футер. Ссылки: x.com/Archi_____cat, github.com/l2bote4game, yotei.com.ua. Терминал-секция удалена пользователем ранее — не возвращать.

---

# ART DIRECTION «ARCHIVE//01» (кардиально новое)

## Палитра — НИКАКОГО ЗЕЛЁНОГО
| Роль | Значение |
|---|---|
| Фон | `#0B0B0C` угольно-чёрный |
| Поверхность | `#131315` |
| Текст основной | `#F4F1EB` кость/бумага |
| Приглушённый | `#8A877F` тёплый серый |
| **Акцент (единственный)** | `#FF4D00` вермильон (киноварь) |
| Волосы-линии | `rgba(244,241,235,.14)` |

Вермильон = цвет рыжего кота → бренд arch1cat считывается без единого зелёного пикселя.

## Типографика — редакционная, гигантская
- **Display:** Instrument Serif (400 + italic) — заголовки-плакаты, курсивные акценты внутри строк.
- **Body/Subhead:** Space Grotesk (300–600).
- **Микро-подписи, индексы, цифры:** JetBrains Mono, uppercase, letter-spacing 0.2em.
- Hero: `clamp(4rem, 13vw, 12rem)`, строки ломаются вручную, одно слово курсивом вермильоном.

## Композиция — «архивные главы», не лендинг
Секции = главы с индексами: `00 — PROLOGUE` (hero), `01 — SELECTED WORKS`, `02 — FLAGSHIP`, `03 — SIGNAL` (snake/stats), `COLOPHON` (футер). Огромные числа-призраки (ghost numerals) на фоне секций. Статблок в стиле Kage: `06 REPOSITORIES / ★ NN STARS / NN FOLLOWERS / ∞ CURIOSITY`. Фиксированная правая вертикальная навигация-рейка `00→03` с активной вермильоновой отметкой. Зерно плёнки (feTurbulence grain, opacity ~5%) + виньетка поверх всего = кино.

## WebGL-сцена — «Экспонат», не обои
Один центральный артефакт — обсидановый тор-узел/икосаэдр (тёмное тело, радужные блики через env-lighting, тонкий костяной wireframe) парит над воображаемым полом. Вокруг: 6–8 крупных обсидановых осколков (не мелкая пыль) + редкие пылинки-споры. Свет: холодный key сверху + **вермильоновый горизонт снизу** (как закат из Kage). Bloom слабый (0.45) — свечение деликатное, не неон.

Интерактив (сохраняем любимые фишки в новом вкусе):
- Курсор = источник света в сцене: свет ходит за мышью, грани ловят блик.
- Осколки пружинно расступаются перед курсором, возвращаются с овершутом.
- Ховер на артефакте: кольца вокруг него ускоряются, вермильоновый свет поднимается ярче.
- Клик: по кольцу-орбите бежит волна + короткий выдох света (без неоновых шоквейвов).
- Скролл: камера медленно облетает/опускается к каждому «экспонату» главы; туман меняет тон (глава 02 — чуть теплее).

## UI-элементы
- **Кнопки:** капсулы с волосяной бордюром, кость-текст; hover — вермильон заливает слева направо, текст становится чёрным; магнит ±8px, tilt ≤4°, нажатие scale .97. Primary CTA — сплошной вермильон.
- **Карточки проектов:** «архивные таблички» — hairline-бордер, индекс `001–004` крупным моно, hover: подъём, блик-спотлайт костяного цвета, вермильоновая засечка в углу.
- **Курсор:** точка + тонкое кольцо (кость), над интерактивом — вермильон и рост; клик — маленькое аккуратное кольцо-рябь.
- **Загрузка:** не терминальный boot, а титульная карта фильма: чёрный экран → `ARCH1CAT` сходящийся letter-spacing (900ms) → fade. Один раз за сессию.
- **Звук:** выключен по умолчанию; мягкие синус-тики вместо квадратных бипов; пасхалка `meow` остаётся: сцена делает «выдох» — волна по осколкам + вспышка вермильона снизу.

## Правило читаемости
Артефакт и осколки живут справа/за контентом (x>3 или z<−6). На текстовых зонах сцена приглушается (opacity слоя 0.85). Никаких объектов перед текстом.

---

## Структура файлов

```
arch1cat_site/
├── index.html               (переписать разметку: новая типографика/главы/кнопки; удалить старый инлайн-CSS/JS)
├── assets/css/style.css     (создать: вся тема ARCHIVE//01)
├── assets/js/three-scene.js (создать: галерея-экспонат, физика курсора, хореография камеры)
├── assets/js/ui.js          (создать: титул, scramble, рейка, магниты, статы, звук)
└── og.png                   (сгенерировать, 1200×630)
```

## Глобальные pitfalls

1. ES-модули не работают с `file://` → локально `python -m http.server 8077` → `http://localhost:8077`.
2. CDN пиннить: `three@0.170.0`. Тон-маппинг не включать (NoToneMapping default).
3. `prefers-reduced-motion`: без титула/scramble/полётов/tilt; контент читаем сразу, сцена статична.
4. `document.hidden` → рендер пауза.
5. GitHub API 60 req/h/IP → localStorage TTL 60 мин + fallback-константы.
6. Сохранить якоря `#about/#projects/#activity` (навигация и внешние ссылки могут на них вести) и все URL.
7. Коммит после каждого таска, conventional commits.

---

### Task 1: Демонтаж матрицы + скелет новой темы

**Objective:** Старая тема удалена, фундамент ARCHIVE//01 стоит, страница ещё без 3D но уже в новой типографике/палитре.

**Files:** Modify `index.html`; Create `assets/css/style.css`, `assets/js/three-scene.js` (стаб), `assets/js/ui.js` (стаб)

**Steps:**
1. В `<head>`: убрать tailwind.config cyber-цвета → новые токены (ink/bone/muted/ember/line); подключить Google Fonts: `Instrument+Serif:ital@0;1`, `Space+Grotesk:wght@300..700`, `JetBrains+Mono:wght@400;500`; `<link rel="stylesheet" href="assets/css/style.css">`.
2. Удалить старый `<style>` блок, старый three r128 script, весь инлайн-движок (строки ~423–663) и matrix-overlay div.
3. Добавить importmap (three@0.170.0) + `<script type="module" src="assets/js/three-scene.js">` + `ui.js` в конце body.
4. В style.css: токены на `:root`, body bg `#0B0B0C` цвет `#F4F1EB`, grain-оверлей (svg feTurbulence data-uri, `position:fixed inset:0 opacity:.05 pointer-events:none z-index:90`), vignette (radial-gradient fixed), утилиты `.mono-label`, `.display-serif`, hairline-классы.
5. Разметку секций пока оставить старую (контент), только классы цветов поправить чтобы не было зелёного (быстрый прогон: `cyber-green` → `ember` и т.д.).

**Verify:** сервер → превью: сайт чёрно-костяной, ни одного зелёного пикселя; шрифты загрузились; консоль чистая.
**Commit:** `feat!: demolish cyber-matrix theme, scaffold archive-01 design system`

---

### Task 2: Ядро сцены — рендерер, кинематографичный свет, туман

**Files:** Modify `assets/js/three-scene.js`

**Steps:**
1. Import three + EffectComposer/RenderPass/UnrealBloomPass. Renderer alpha:true, DPR min(dpr,2). Fog `#0B0B0C` exp2 0.028.
2. Свет: DirectionalLight key `#F4F1EB @1.1` сверху-слева; PointLight ember `#FF4D00 @6 dist 30` под горизонтом y=−7 (вермильоновый закат); PointLight курсора `#F4F1EB @3 dist 18`.
3. Пол-намёк: большой круг `CircleGeometry(40)` y=−6, MeshStandardMaterial `#0e0e10` roughness .9 — ловит вермильоновый отсвет (без grid-сеток!).
4. BloomPass strength **0.45**, radius 0.8, threshold 0.8.
5. Loop c clock delta, hidden-guard, resize. Экспорт `window.__archive = {scene,camera,composer,bloom}`.

**Verify:** превью: чёрная сцена, костяной ключевой свет, тёплое вермильоновое зарево под полом; никакого неона.
**Commit:** `feat(scene): cinematic core - bone key light, ember horizon, film fog`

---

### Task 3: Экспонат + осколки — объёмные объекты с характером ⭐

**Files:** Modify `assets/js/three-scene.js`

**Steps:**
1. Центральный артефакт: `TorusKnotGeometry(1.9, 0.55, 220, 32)`; материал MeshStandardMaterial `color:#151517, metalness:.92, roughness:.22, envMapIntensity:1.2`; окружение — `RoomEnvironment` из three/addons (PMREMGenerator) для радужных бликов без HDRI-файлов; поверх второй mesh той же геометрии `MeshBasicMaterial wireframe #F4F1EB opacity:.08`.
2. Орбитальные кольца: 2 тонких `TorusGeometry(r, 0.015)` наклонённых, basic кость opacity .35; медленное прецессионное вращение.
3. Флот осколков (7 шт): `TetrahedronGeometry/OctahedronGeometry(0.5–1.1)`, тот же обсидан-материал, разбросаны справа и сзади (правило коридора: при |x|<3 ⇒ z≤−6); каждый: home, vel, phase, spinAxis/speed.
4. Пылинки: 300 точек с круглой canvas-текстурой, кость, opacity .35, size .06, медленный дрейф вверх.
5. Дыхание: артефакт `position.y += sin(t*.6)*.25`, вращение 0.08 rad/s; осколки bobbing ±.2.
6. Raycast-ховер артефакта: цель `focusT` 0→1 lerp: кольца speed ×2.5, emberLight.intensity 6→10, wire opacity .08→.16.

**Verify:** превью: обсидановый узел с радужными переливами и костяным каркасом парит в центре-справа; осколки вокруг; ховер оживляет кольца и зарево; FPS ≥ 55.
**Commit:** `feat(scene): obsidian artifact exhibit with orbit rings and shard fleet`

---

### Task 4: Курсор как сила — физика, свет, клик-волна ⭐

**Files:** Modify `assets/js/three-scene.js`

**Steps:**
1. Unproject указателя на плоскость z=0 (raycaster.intersectPlane) → `cursor3`; cursorLight следует за ним (lerp .12).
2. Spring-физика осколков: пружина к home (K=2.2·dt) + отталкивание от cursor3 (REACH 4.5, сила 6·dt) + damping .90 — код из holodeck-плана переносится 1:1.
3. Клик: волна по орбитальным кольцам — их масштаб пульсирует 1→1.35→1 (600ms, ease-out) и по осколкам импульс от точки клика (радиус 8, затухание); короткий подъём emberLight +30% с возвратом (800ms). Пул объектов не нужен — пульсируем существующие параметры.
4. Параллакс камеры от мыши ±0.8 юнита (lerp .04).

**Verify:** превью: осколки расступаются перед курсором и упруго возвращаются; свет ходит за мышью и зажигает грани; клик — волна по кольцам и мягкий выдох света.
**Commit:** `feat(scene): cursor force field, traveling click wave, light following`

---

### Task 5: Хореография скролла — главы и камера

**Files:** Modify `assets/js/three-scene.js`, `index.html` (data-chapter атрибуты)

**Steps:**
1. Секции получают `data-chapter="prologue|works|flagship|signal"`.
2. Камера-ключи (лерп .035): prologue `{pos:[2.2,.4,9.5], look:[1.2,0,0]}` (артефакт справа от текста), works `{pos:[-2,-.6,10.5], look:[0,-.4,0]}`, flagship `{pos:[3,1.2,8], look:[0,.2,0]}`, signal `{pos:[0,-2.4,11], look:[0,-1,0]}` (взгляд чуть сверху на пол с заревом).
3. Fog/ember-тон по главам: prologue базовый, works чуть теплее (ember intensity 7), flagship нейтральней (4), signal обратно тёплый (8).
4. IntersectionObserver `-45%/-45%` переключает ключи; правая рейка подсвечивает активную главу (ui.js слушает тот же observer через CustomEvent `chapterchange`).

**Verify:** превью: скролл между главами плавно переезжает камерой, настроение света меняется; артефакт никогда не перекрывает текст.
**Commit:** `feat(scene): chapter camera choreography + per-chapter light mood`

---

### Task 6: FPS-governor

**Files:** Modify `assets/js/three-scene.js`

**Steps:** Rolling avg FPS/60 кадров; ступени без отката: <32 → DPR 1.25; <32 → bloom.enabled=false (+wire opacity компенсация); <32 → пылинки visible=false; console.info однократно.

**Verify:** форс `setPixelRatio(4)` → каскад в консоли; вернуть.
**Commit:** `feat(scene): adaptive quality governor`

---

### Task 7: Титульная карта (film leader) вместо boot

**Files:** Create разметку overlay в `index.html`, логику `assets/js/ui.js`, стили `style.css`

**Steps:**
1. Overlay: чёрный fullscreen z-[100]; по центру mono-микро `// PORTFOLIO — 2026`, ниже display-serif `ARCH1CAT` с анимацией letter-spacing 0.6em→0.02em + opacity (900ms cubic-bezier(.16,1,.3,1)); тонкая вермильоновая линия прорисовывается под именем (scaleX 0→1).
2. Тайминг: total ≤1.6s → fade-out 500ms. `sessionStorage.archiveTitleDone || reduced-motion` → мгновенно скрыто. body overflow lock на время.
3. После fade — триггер `archive:ready`: артефакт материализуется (масштаб .6→1 + opacity материалов 0→цель, 800ms), hero-строки начинают scramble (Task 8).

**Verify:** первая загрузка — титул; reload — мгновенно скрыт; reduced-motion — нет.
**Commit:** `feat(ui): cinematic title card intro (session-skippable)`

---

### Task 8: Новая разметка глав + scramble + reveal

**Files:** Modify `index.html` (полная переразметка контента), `style.css`, `ui.js`

**Steps:**
1. Hero `00 — PROLOGUE`: mono-лейбл `// FULLSTACK ENGINEER & CREATOR`, display-заголовок 3 строками: `Code is` / `craft &` / `*curiosity.*` (*курсив вермильон*) — либо вариант «Building the unseen.» (выбрать при реализации, согласовать с тоном arch1cat; контент-черновик: строка 1 `SOFTWARE`, строка 2 `AS` *CRAFT*`, строка 3 `& PLAY.`). Подзаголовок Space Grotesk: текущий текст про AI agents/WebGL/Kotlin/Telegram/SEO сохранить. CTA: `VIEW WORKS ↳` (primary ember) + `X — @Archi_____cat` (hairline).
2. Ghost numeral: абсолютный `<span class="ghost-num">00</span>` (display serif, ~40vh размер, кость opacity .04) в каждом разделе.
3. `01 — SELECTED WORKS`: 4 карточки-таблички: индекс `001`, название display-serif, описание, теги моно, ссылка `SOURCE ↗`; сетка 2×2 (lg:4 может быть тесно при крупных табличках — выбрать 2×2); Yotei = отдельная глава `02 — FLAGSHIP`: полноширинная табличка с большим индексом `Y` и CTA `VISIT YOTEI.COM.UA ↗`.
4. `03 — SIGNAL`: слева статистика-Kage (большие числа: REPOS/STARS/FOLLOWERS/CURIOSITY ∞), справа Snake embed в hairline-рамке с подписью `FIG. 03 — CONTRIBUTION FIELD`.
5. COLOPHON футер: колонки CHAPTERS/PRACTICE/ELSEWHERE (по образцу Kage), внизу mono `© 2026 ARCH1CAT — WEBGL · KYIV · CATS`.
6. Scramble: hero-строки + заголовки глав, глифы `—/\\|▪▸`, 700ms, once. Reveal: translateY(28px)+opacity, stagger 90ms.
7. Reduced-motion: всё сразу видно.

**Verify:** превью: структура глав читается как журнал; гигантские призрачные числа на фоне; ничего зелёного; якоря `#about`(→prologue id сохранить!), `#projects`, `#activity` маппятся на новые секции (id старые сохранить на новых секциях).
**Commit:** `feat(ui): chapter layout, ghost numerals, kage stats block, scramble+reveal`

---

### Task 9: Тактильные кнопки и архивные карточки

**Files:** Modify `style.css`, `ui.js`

**Steps:**
1. `.btn-archive`: капсула, hairline-бордер, кость; overflow hidden; `::before` — вермильоновая заливка scaleX 0→1 слева (transform-origin left, 350ms cubic-bezier(.16,1,.3,1)); hover: текст `#0B0B0C`, бордер ember. Primary: фон ember сразу, hover — яркость + заливка костью? (нет: hover просто brighten 1.08 + lift).
2. JS (pointer:fine, не reduced-motion): магнит lerp ±8px, tilt rotateX/Y ≤4° perspective 600, active scale .97. Единый rAF-менеджер (один на все интерактивы).
3. Карточки `.plate`: position relative, hairline, bg `#101012`, padding крупный; hover: translateY(-6px), бордер кость .3, спотлайт `::before` radial 260px at var(--mx/--my) rgba(244,241,235,.07); вермильоновая засечка-уголок `::after` (top-right, 14×14 border-top/right ember, opacity 0→1). Индексы `001` крупным моно opacity .5.
4. Tilt карточек ≤3.5° тем же rAF.

**Verify:** превью: кнопки заливаются вермильоном слева, магнитятся; карточки приподнимаются, блик ходит за мышью, уголок-засечка появляется; текст резкий.
**Commit:** `feat(ui): archive buttons with ember sweep + tactile plates`

---

### Task 10: Прецизионный курсор + прогресс-рейка

**Files:** Modify `ui.js`, `style.css`, `index.html`

**Steps:**
1. Курсор: точка 5px кость + кольцо 28px 1px бордер (lerp .18); над `a/button/.plate` — рост ×1.5 и бордер вермильон; клик — DOM-кольцо-рябь 480ms (синхронно с волной сцены). Только `(pointer:fine)`; `cursor:none` там же.
2. Правая рейка (desktop): фиксировано right 24px, вертикально по центру; элементы `00 01 02 03` моно 10px + линия; активный — вермильон + сдвиг линии; клики — скролл к главе; обновляется от `chapterchange`.

**Verify:** превью: курсор точен и реагирует; рейка подсвечивает текущую главу и работает как навигация; touch — системное поведение.
**Commit:** `feat(ui): precision cursor + chapter progress rail`

---

### Task 11: Живая телеметрия GitHub

**Files:** Modify `ui.js`, `index.html` (statblock разметка уже из Task 8)

**Steps:** fetch users/l2bote4game + 4 repos (stars sum); localStorage `archive_gh` TTL 60min; fallback-константы в комментарии; счётчики ease-out 1.4с; формат: `06` / `★★ 12` / `48` / `∞`.

**Verify:** числа набегают; повторно — без запросов; домен заблокирован → fallback работает.
**Commit:** `feat(ui): live github telemetry with cache and fallbacks`

---

### Task 12: Звук v3 + пасхалка meow

**Files:** Modify `ui.js`

**Steps:** перенести WebAudio-каркас; заменить square на sine/triangle, громкости −50% (blip 520Hz sine 25ms hover rate-limit 120ms, click 320Hz 50ms); персист `localStorage['archive_sound']`; `meow` → сцена: волна по осколкам сильнее обычного клика ×2 + emberLight вспышка ×2.5 (900ms) + мягкий glide-аккорд; toast `🐱` снизу mono. Desktop-only.

**Verify:** тики мягкие; состояние переживает reload; `meow` работает; default off.
**Commit:** `feat(ui): soft audio feedback + meow ember surge easter egg`

---

### Task 13: SEO / favicon / og.png / a11y

**Files:** Modify `index.html`; Create `og.png`

**Steps:**
1. title `arch1cat — software engineer & creator`; description обновить (3D/WebGL упоминание).
2. OG/Twitter полным набором, `og:image=/og.png`, `og:url=https://arch1cat.github.io/`.
3. `og.png` 1200×630 — сгенерировать image_generate: обсидановый 3D тор-узел на угольном фоне, вермильоновое зарево снизу, крупная надпись ARCH1CAT костяным serif — стиль точно по арт-диршн.
4. Favicon: inline SVG data-URI — кот-силуэт вермильон `#FF4D00` на `#0B0B0C`; theme-color `#0B0B0C`.
5. JSON-LD Person (sameAs X+GitHub). A11y: aria-label на icon-only, aria-hidden на канвасе/grain/vignette/ghost-numerals, контраст: muted `#8A877F` на `#0B0B0C` = 5.1:1 ✓.

**Verify:** вкладка с новым фавиконом; view-source мета; og.png в корне коммитится.
**Commit:** `feat(seo): meta suite, generated og banner, ember cat favicon, json-ld, a11y`

---

### Task 14: Мобильный проход + QA + деплой

**Files:** точечные правки везде

**Steps:**
1. Мобайл: артефакт центрируется мельче позади hero (scale .7, opacity слоя .8), осколков 3, DPR≤1.5, рейка скрыта, курсор системный, tilt/магниты off, титул короче (800ms), карточки в колонку, snake скроллится внутри рамки, ghost-numerals меньше/скрыты на <380px.
2. QA-чеклист до пуша:
   - [ ] `node --check assets/js/*.js`
   - [ ] Консоль чистая на всех главах
   - [ ] Ни одного зелёного элемента (grep `00FF66|00ff66|green-|emerald|cyan` по репо = 0 хитов кроме node_modules-нет)
   - [ ] Объекты не перекрывают текст на 1920/1440/1280/768/390
   - [ ] Физика курсора/кнопки/курсор/рейка работают; hidden-tab пауза; heap ±10MB после 10 проходов
   - [ ] reduced-motion читабелен; ссылки/якоря живы; статы с fallback
3. Push → Pages ~60с → `open_preview https://arch1cat.github.io/` → чеклист на проде. Регресс — hotfix немедленно.

**Commit:** `chore: mobile polish + release archive-01`

---

## Risks / Tradeoffs

| Риск | Митигация |
|---|---|
| RoomEnvironment добавит вес загрузки | Импорт из addons ~мал; если критично — заменить на простую grad-env текстуру кодом |
| Радужные блики выглядят «фиолетово» | envMapIntensity умеренный, key-свет костяной держит монохром; verify на скрине |
| Вермильон на чёрном режет глаз на больших заливках | Ember только в акцентах: заливка кнопки, свет, засечки; фон всегда уголь |
| Обсидановые тела слишком тёмные на ноут-экранах | Key light 1.1 + wireframe-косточка гарантируют читаемость силуэта |
| Инструмент-сериф может не лечь на кириллицу | Сайт англоязычный (как сейчас); если добавить RU — проверить fallback Space Grotesk |
| Пружины + бобинг конфликтуют | Бобинг силой в общей spring-системе (как в holodeck-плане) |

## Open Questions (дефолты выбраны)

1. Hero-фраза: дефолт `SOFTWARE AS *CRAFT* & PLAY.` — альтернативы предложу при реализации.
2. og.png генерю нейросетью в новом стиле (Task 13) — делаю по умолчанию.
3. Карточки 2×2 крупные (дефолт) или 4 в ряд компактные — решить на Task 8 по факту вёрстки.
