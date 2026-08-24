# arch1cat — «NEON OS» 3D Redesign Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Превратить статичный Cyber-Matrix лендинг в интерактивный 3D-опыт «NEON OS»: морфингая частица-скульптура под скролл, bloom-постобработка, живые GitHub-данные и «умные» micro-interactions — сохранив фирменный зелёно-циановый матрикс и один деплой на GitHub Pages.

**Architecture:** Один статический сайт без сборки. Разметка остаётся в `index.html` (Tailwind CDN), стили выносятся в `assets/css/style.css`, логика — в два ES-модуля: `three-scene.js` (WebGL мир) и `ui.js` (DOM-интерактив). Three.js апгрейдится с r128 до r170 через importmap — это открывает EffectComposer/UnrealBloomPass для настоящего неонового свечения вместо фейковых text-shadow.

**Tech Stack:** Vanilla HTML/CSS/JS · Three.js r170 (ES modules + importmap, jsdelivr) · Tailwind Play CDN · GitHub REST API (public, без ключей) · Web Audio API · GitHub Pages.

---

## Context / текущее состояние

Репозиторий: `C:\Users\z\Desktop\arch1cat_site` → `git@github.com:Arch1cat/arch1cat.github.io.git` (GitHub Pages, ветка main, `.nojekyll` есть).

Один файл `index.html` (665 строк):
- **Сцена (Three.js r128):** GridHelper пол, геодезический wireframe-core с вершинной волной, внутренняя сфера, 2 торус-ринга, 2000 дождевых частиц (квадратные точки!) с repulsion от мыши, mouse-light, скролл-полёт камеры. Всё фоном, с контентом не связано.
- **Контент:** Hero («Hi, I'm arch1cat», бейдж AVAILABLE), 4 карточки Open Source (World Monitor, WiFi Scanner, Metadata Cleaner, Cats Match-3), флагман Yotei, секция GitHub Snake (embed SVG), футер.
- **Аудио:** синт-бипы через Web Audio, кнопка mute в хедере (не персистится).
- **Чего нет:** favicon, OG/Twitter meta, JSON-LD, scroll-reveal анимаций, живых данных, постобработки, favicon'а, мобильных оптимизаций, паузы рендера в скрытом табе.

История коммитов показывает: терминал-секцию пользователь **сам удалил** (`Remove terminal section…`) — полноразмерный терминал НЕ возвращаем, только пасхалка.

## UX Analysis (Chief Architect)

**Боли сейчас:**
1. 3D никогда не взаимодействует с контентом — это дорогие обои. Скролл просто двигает камеру по синусоиде без смысла.
2. Нулевой ритм между секциями: заголовки/карточки появляются без анимации, страница «плоская».
3. Нет доказательств активности: звёзды/фолловеры/репо нигде не видны, хотя это главный social proof для разработчика.
4. Частицы — квадратные точки (PointsMaterial без текстуры) — выглядит бюджетно.
5. Нет тактильности: карточки отвечают только сменой border-color; кнопки не магнитятся; курсор системный.
6. Мобильный опыт не спроектирован (тяжёлый blur + 2000 частиц + DPR до 2).

**Целевой опыт:** загрузка → короткий boot-лог (терминальный вайб, ≤1.5с, один раз за сессию) → hero декодируется scramble-эффектом → при скролле камера «ныряет» между главами, а центральная частица-скульптура **морфится** под смысл секции (туманность → кот → решётка проектов → двойная спираль активности) → карточки наклоняются в 3D со spotlight-рамкой за мышью → счётчики GitHub оживают → Snake как игривый финал → футер. Уважение к `prefers-reduced-motion` и слабым GPU (авто-деградация качества).

## Art Direction «NEON OS»

- Фон глубже: `#010603`. Основной зелёный `#00FF66`, циан `#00F2FE` сохраняются (бренд). Новый третичный акцент — **magenta `#FF2ED1`** для контрастных вспышек (hover, пасхалка, часть градиентов).
- Настоящее свечение: UnrealBloomPass (threshold ~0.85, strength ~0.9, radius ~0.6) + лёгкий vignette/grain overlay в CSS.
- Типографика: Inter + JetBrains Mono как сейчас; mono-подписи `// SECTION` — система навигации.
- Частицы — круглые светящиеся спрайты (radial-gradient текстура, генерится кодом), additive blending, вертексный градиент зелёный→циан→magenta.

---

## Структура файлов

```
arch1cat_site/
├── index.html                  (изменить: meta, importmap, разметка-правки, убрать старый <script> движка)
├── assets/
│   ├── css/style.css           (создать: тема, glass-cards, overlay, cursor, boot, reveal)
│   ├── js/three-scene.js       (создать: модуль WebGL мира)
│   └── js/ui.js                (создать: boot, scramble, reveal, tilt, cursor, stats, audio, easter egg)
└── .hermes/plans/…             (этот план)
```

## Глобальные pitfalls (прочитать всем исполнителям)

1. **ES-модули не работают с `file://`** — локально только через HTTP: `python -m http.server 8077` в корне репо, проверять `http://localhost:8077`.
2. Three.js r170: `renderer.outputColorSpace` по умолчанию sRGB; тон-маппинг НЕ включаем (NoToneMapping) — иначе неон гаснет.
3. Все CDN пиннить на точную версию (`three@0.170.0`) — floating tag = внезапная поломка прода.
4. `prefers-reduced-motion: reduce` → отключить boot, scramble, морфинг (статичная сцена), tilt, кастомный курсор. Контент должен быть читаем сразу.
5. Рендер-луп обязан останавливаться при `document.hidden` и возобновляться при возврате.
6. GitHub API без токена = 60 req/h на IP → кэш в localStorage на 60 минут + захардкоженные fallback-числа.
7. Не ломать существующие якоря `#about/#projects/#activity` и ссылки (X, GitHub, yotei.com.ua).
8. Терминал-секцию не возвращать (пользователь её удалил сознательно).
9. Каждый таск = отдельный коммит, conventional commits.

---

### Task 1: Скелет — вынести стили, подключить Three.js r170 через importmap

**Objective:** Подготовить фундамент: CSS в отдельный файл, современный Three.js, страница визуально не изменилась.

**Files:**
- Create: `assets/css/style.css`
- Modify: `index.html`

**Steps:**
1. Перенести содержимое `<style>…</style>` из index.html в `assets/css/style.css` 1-в-1, добавить `<link rel="stylesheet" href="assets/css/style.css">`.
2. Заменить `<script src="…three.min.js">` (r128) на importmap:
```html
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/"
  }
}
</script>
```
3. Временно закомментировать старый инлайн `<script>` движка (строки ~423–663) целиком — он перепишется в Task 2–4 (страница станет без 3D на один коммит — ок).
4. Создать пустые `assets/js/three-scene.js` и `assets/js/ui.js`; в конце body:
```html
<script type="module" src="assets/js/three-scene.js"></script>
<script type="module" src="assets/js/ui.js"></script>
```

**Verify:** `node --check` неприменим к HTML; проверить: `python -m http.server 8077` → открыть `http://localhost:8077` в превью — контент, стили, аудио-кнопка на месте, в консоли нет ошибок загрузки ресурсов.
**Commit:** `chore: extract styles, add importmap for three r170, stub js modules`

---

### Task 2: Ядро сцены r170 — рендерер, bloom, звёзды, пол, свет

**Objective:** Новый WebGL-каркас с настоящим свечением и базовой графикой вместо старого движка.

**Files:**
- Modify: `assets/js/three-scene.js`

**Steps:**
1. Импорты: `three`, `EffectComposer`, `RenderPass`, `UnrealBloomPass`.
2. Сцена: `scene.fog = new THREE.FogExp2(0x010603, 0.02)`; фон прозрачный (`alpha:true`), фон несёт CSS.
3. Renderer: `antialias:true`, `setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1.5 : 2))`, resize-handler.
4. Composer: RenderPass + `UnrealBloomPass(resolution, strength=0.9, radius=0.6, threshold=0.85)`.
5. Свет: ambient `0x00ff66 @0.5`, mouse PointLight `0x00ff66 @5`, орбитальный циановый PointLight (как сейчас).
6. Пол: GridHelper 90×60 `0x00ff66/0x003311`, y=-6, материалу `transparent:true, opacity:0.55`.
7. Starfield: 2500 точек на дальней сфере r∈[40,80], круглый спрайт (см. Task 3 шаг «dotTexture»), additive, размер 0.35, лёгкое вращение всей группы.
8. Loop с `clock.getDelta()`, guard: `if (document.hidden) { raf=requestAnimationFrame(loop); return; }` (рендер пропускаем, rAF держим).
9. Экспорт наружу хуков для других задач: `window.__scene = { scene, camera, composer, bloomPass }`.

**Verify:** сервер → превью: неоновый пол и звёзды светятся bloom'ом, скролл пока не влияет, консоль чистая, вкладка в фоне не грузит CPU (Activity Monitor глазом).
**Commit:** `feat(scene): three r170 core with bloom, starfield and neon grid`

---

### Task 3: Морфингая частица-скульптура (центральная фишка)

**Objective:** 12k частиц, которые перетекают между 4 фигурами по мере скролла: NEBULA (hero) → CAT (about/hero-акцент) → LATTICE (projects) → HELIX (activity).

**Files:**
- Modify: `assets/js/three-scene.js`

**Steps:**
1. `dotTexture()`: offscreen canvas 64×64, radial gradient white→transparent → `THREE.CanvasTexture`. Никаких квадратов.
2. Сэмплеры (каждый возвращает `Float32Array(N*3)`, N = isMobile ? 5000 : 12000):
   - `sampleNebula`: гауссово облако σ≈6 + 15% точек в диск r≈3 (ядро).
   - `sampleCat`: offscreen canvas 512², нарисовать силуэт головы кота путями (голова-круг r150 @ (256,290), уши-треугольники, глаза — «дырки» через `globalCompositeOperation='destination-out'`), пройти по пикселям с шагом 4, заполненные → маппинг x∈[-11,11], y∈[-8,8], z=(rand−0.5)*1.5. Код сэмплера обязателен к написанию полностью, это сердце фишки.
   - `sampleLattice`: узлы сетки 15³ с джиттером 0.15 (куб ≈ ±7).
   - `sampleHelix`: двойная спираль (2 витка, радиус 5, высота 14, вторая нить +π) + 20% точек «ступеньками» между нитями.
3. Морф-машина: массивы `fromPos`, `toPos`, `mix∈[0,1]`; каждый кадр `mix += (target−mix)*0.04`, позиция = `lerp(from,to,easeInOut(mix)) + idleWave(t,i)` (маленькая синусоида по индексу — скульптура «дышит»). При смене цели: `fromPos.set(currentInterpolatedPositions)`.
4. Материал: `PointsMaterial({ map: dotTexture(), size:0.22, vertexColors:true, blending:AdditiveBlending, depthWrite:false, transparent:true })`; цвета — градиент по исходному y: green→cyan→magenta.
5. Mouse repulsion из старого кода сохранить (работает поверх морфа, сила 0.12, радиус 4.5).

**Verify:** сервер → превью: скульптура видна в hero, форма — облако; вручную в консоли `__demoMorph(1/2/3)` (временный хук) — частицы плавно текут в кота/решётку/спираль; FPS ≥ 55 на десктопе.
**Commit:** `feat(scene): 12k-particle morphing sculpture (nebula/cat/lattice/helix)`

---

### Task 4: Секционный сценарий — observer, камера, цвет сцены

**Objective:** Связать скролл со сценой: каждая секция задаёт морф-цель, позу камеры и оттенок тумана.

**Files:**
- Modify: `assets/js/three-scene.js`, `index.html` (только `data-scene` атрибуты)

**Steps:**
1. Конфиг ключевых кадров:
```js
const SCENES = {
  hero:     { shape:'nebula', cam:[0,0,10],    look:[0,0,0], fog:0x010603 },
  projects: { shape:'lattice',cam:[4,-2,9],    look:[0,-1,0], fog:0x030610 },
  activity: { shape:'helix',  cam:[-4,-4,9],   look:[0,-2,0], fog:0x0a0312 },
};
```
2. `IntersectionObserver` c `rootMargin: '-45% 0px -45% 0px'` по секциям `[data-scene]` (hero=`#about`, projects=`#projects`, activity=`#activity`) → активная секция меняет цель морфа и таргеты камеры (лерп камеры уже есть — оставить коэффициент 0.05).
3. Параллакс мыши ±1.2 юнита поверх ключевых кадров (как было, но мягче).
4. Fog color лерпить к целевому hex (проекты — холоднее, activity — чуть magenta).

**Verify:** сервер → превью: скролл hero→projects→activity переключает фигуры и ракурсы без рывков; обратный скролл работает; на мобильной ширине фигура мельче (camera.z +2 при aspect<1).
**Commit:** `feat(scene): scroll-driven section choreography (shape+camera+fog)`

---

### Task 5: Авто-деградация качества (FPS-governor)

**Objective:** Слабые устройства получают стабильные 30+ FPS вместо слайд-шоу.

**Files:**
- Modify: `assets/js/three-scene.js`

**Steps:**
1. Rolling average FPS за 60 кадров. Пороги (по одному шагу за раз, не откатываясь):
   - <32 FPS → `renderer.setPixelRatio(1.25)`
   - снова <32 → `bloomPass.enabled=false` (+ компенсация яркости материалов ×1.3)
   - снова <32 → `geometry.setDrawRange(0, N/2)`
2. Однократный `console.info('[perf] degraded to …')` на шаг.

**Verify:** временно выставить `setPixelRatio(3)` принудительно → в консоли видно каскад деградаций; вернуть обратно.
**Commit:** `feat(scene): adaptive quality governor (dpr/bloom/particles)`

---

### Task 6: Boot-оверлей «NEON OS starting…»

**Objective:** Терминальный прелоадер на 1.2–1.5с, задаёт тон; не раздражает при повторных визитах.

**Files:**
- Modify: `assets/js/ui.js`, `assets/css/style.css`, `index.html` (разметка оверлея перед `<main>`)

**Steps:**
1. Разметка: fixed overlay z-[100], фон `#010603`, mono-строки (`> initializing neon os v2.0`, `> mounting webgl renderer … OK`, `> linking github telemetry … OK`, `> meow.`) + прогресс-бар из символов `█░`.
2. Логика: если `sessionStorage.neonBootDone` или `prefers-reduced-motion` → сразу `display:none`. Иначе печатать строки по ~90мс/символ (общий бюджет ≤1.5с!), затем fade-out 400мс, поставить флаг.
3. Пока оверлей виден — `body.overflow:hidden`, после — снять.

**Verify:** первая загрузка показывает boot и убирает его; reload в той же сессии — boot мгновенно скрыт; с `prefers-reduced-motion` — никогда не показывается.
**Commit:** `feat(ui): neon os boot sequence overlay (session-skippable)`

---

### Task 7: Scramble-заголовки + scroll-reveal

**Objective:** Текст «взламывается» при появлении — фирменный момент темы.

**Files:**
- Modify: `assets/js/ui.js`, `assets/css/style.css`, `index.html` (классы `data-scramble`, `reveal`)

**Steps:**
1. `scramble(el)`: кадр 30мс, символы из `!<>-_\/[]{}—=+*^?#01`; прогресс раскрытия слева направо за ~700мс; запуск один раз.
2. Hero H1 и все `// SECTION` подписи + заголовки секций пометить `data-scramble`.
3. Reveal: `.reveal { opacity:0; transform:translateY(24px); transition:.7s cubic-bezier(.16,1,.3,1) }` + `.reveal.in { opacity:1; transform:none }`; IO с threshold 0.15, stagger через `transition-delay` по индексу внутри родителя (карточки — по 80мс).
4. Reduced-motion → всё видимым сразу (класс `in` проставляется без анимации).

**Verify:** превью: заголовки декодируются, карточки всплывают каскадом, повторный скролл вверх/вниз не переигрывает анимацию.
**Commit:** `feat(ui): text scramble decode + staggered scroll reveals`

---

### Task 8: Тактильность карточек и кнопок — tilt, spotlight, magnet, курсор

**Objective:** Карточки реагируют объёмом и светом, кнопки тянутся к курсору, кастомный курсор-кольцо.

**Files:**
- Modify: `assets/js/ui.js`, `assets/css/style.css`

**Steps:**
1. Tilt: на `.glass-card-matrix` (только desktop, pointer:fine): rotateX/Y ≤6° по позиции мыши, perspective 800, transition out 400ms. CSS-var `--mx/--my` обновлять одновременно.
2. Spotlight-бордер: `::before` c `radial-gradient(220px at var(--mx) var(--my), rgba(0,255,102,.25), transparent 70%)` поверх карточки (border-radius inherit, opacity 0→1 on hover).
3. Магнитные кнопки: hero CTA + кнопки хедера сдвигаются к курсору ≤8px (lerp), возврат пружиной.
4. Кастомный курсор (desktop only): точка 6px + кольцо 32px (lerp-хвост), кольцо растёт на `a/button`; `body { cursor:none }` только в media `(pointer:fine)`.
5. Всё отключено при reduced-motion и на touch.

**Verify:** превью: карточки наклоняются, блик следует за мышью по рамке, кнопки магнитятся, курсор-кольцо увеличивается над ссылками; на эмуляции touch ничего из этого не мешает скроллу.
**Commit:** `feat(ui): 3d tilt cards, spotlight borders, magnetic ctas, custom cursor`

---

### Task 9: Живая GitHub-телеметрия

**Objective:** Реальные числа (followers, repos, ⭐ по 4 проектам) с анимированными счётчиками — social proof без вранья.

**Files:**
- Modify: `assets/js/ui.js`, `index.html` (блок stats под hero subtitle + мелкие бейджи-звёзды в углах карточек)

**Steps:**
1. Разметка: строка из 3 stat-блоков (`STARS EARNED`, `PUBLIC REPOS`, `FOLLOWERS`) в hero под абзацем, mono, крупные цифры.
2. Fetch параллельно: `users/l2bote4game` (public_repos, followers) + `repos/l2bote4game/{world-monitor,wifiscaner,media-meta-cleaner,cats-match3-game}` (stargazers_count, суммарно).
3. Кэш: `localStorage['neon_gh_cache'] = { t: Date.now(), data }`, TTL 60 мин; просрочен/ошибка → fallback константы (взять актуальные на день реализации, зафиксировать их в комментарии).
4. Счётчики: rAF ease-out 1.2с от 0 до значения, форматирование как есть.
5. Бейджи карточек: `★ N` в правом верхнем углу каждой OSS-карты (после загрузки; без данных — скрыт).

**Verify:** превью: числа появляются и набегают; DevTools Network при повторном заходе в течение часа — запросов к api.github.com нет; заблокировать домен в DevTools → сайт работает на fallback.
**Commit:** `feat(ui): live github stats with cached counters and fallbacks`

---

### Task 10: Аудио v2 + пасхалка «meow»

**Objective:** Звуковая обратная связь интерфейса + скрытый кот-режим.

**Files:**
- Modify: `assets/js/ui.js`

**Steps:**
1. Вынести существующий синт из index.html в ui.js без изменений поведения; добавить: hover на ссылках/кнопках — тихий blip 220Hz square 30ms (не чаще 1/100ms), click — 440Hz.
2. Выбор звука персистить: `localStorage['neon_sound']`.
3. Пасхалка: буфер последних нажатых клавиш; последовательность `m,e,o,w` → shockwave: `bloomPass.strength` кратко 2.2 → 0.9 за 900мс, радиальный импульс частицам (vel-массив с затуханием 0.92), аккорд-«мяу» (осц. glide 600→350Hz sawtooth + chime), маленький toast `🐱 MEOW MODE` снизу. Только desktop-клавиатура.

**Verify:** превью: клики/ховers озвучены при включённом тумблере; после перезагрузки состояние тумблера сохранено; набор `meow` даёт вспышку и импульс частицам; звук выключен по умолчанию для новых визитов.
**Commit:** `feat(ui): audio feedback v2 + meow easter egg shockwave`

---

### Task 11: SEO / мета / favicon / доступность

**Objective:** Сайт должен выглядеть достойно в выдаче, в соцсетях и во вкладке браузера.

**Files:**
- Modify: `index.html`

**Steps:**
1. `<title>` оставить/уточнить `arch1cat — Software Engineer & Creator`; description уже есть — дополнить упоминанием 3D/WebGL.
2. OG/Twitter: `og:title`, `og:description`, `og:type=website`, `og:url=https://arch1cat.github.io/`, `twitter:card=summary_large_image`, `og:image=/og.png`.
3. Favicon: инлайн SVG data-URI (кот-силуэт зелёным на чёрном) + `<meta name="theme-color" content="#020904">`.
4. JSON-LD `Person` (name arch1cat, url, sameAs: x.com/Archi_____cat, github.com/l2bote4game).
5. Доступность: `aria-label` на icon-only кнопках, `aria-hidden` на декоративном канвасе, контраст текста не ниже 4.5:1 для серых подписей (поднять gray-400 → gray-300 где мелко).

**Verify:** превью + `view-source`: мета на месте; favicon виден во вкладке; https://metatags.io глазами по скрину (или открыть локальный HTML там же).
**Commit:** `feat(seo): og/twitter meta, svg favicon, json-ld person, a11y pass`

---

### Task 12: Мобільний проход + финальный QA + деплой

**Objective:** Вылизать телефон, прогнать полный чек-лист, задеплоить и проверить живой сайт.

**Files:**
- Modify: любые из перечисленных (точечные правки)

**Steps:**
1. Мобайл (DevTools iPhone/Pixel эмуляция + реальный телефон если рядом): N=5000 частиц, DPR≤1.5, tilt/cursor/magnet выключены, boot короче (2 строки), hero-заголовок не обрезается, карточки в одну колонку без горизонтального скролла, Snake-карта скроллится внутри контейнера.
2. Чек-лист QA (всё ✅ перед пушем):
   - [ ] `node --check assets/js/three-scene.js && node --check assets/js/ui.js`
   - [ ] Консоль браузера без ошибок/warnings на hero/projects/activity
   - [ ] Скролл туда-обратно: морфы и камера без рывков, память не течёт (heap snapshot до/после 10 проходов ±10MB)
   - [ ] Скрытие таба останавливает рендер
   - [ ] Все ссылки живы (X, GitHub, 4 репо, yotei.com.ua), якоря работают
   - [ ] reduced-motion: сайт полностью читабелен, анимаций нет
   - [ ] GitHub-статы с кэшем и fallback
3. Коммит + `git push origin main` → ждать пересборку Pages (~60с) → `open_preview https://arch1cat.github.io/` → прогнать чек-лист ещё раз на живом сайте.
4. Если что-то сломалось на проде — hotfix-коммит немедленно, не оставлять красный прод.

**Commit:** `chore: mobile polish + release neon os v2`

---

## Risks / Tradeoffs

| Риск | Митигация |
|---|---|
| jsdelivr недоступен у части пользователей | Версия запиннена; при желании позже вендорить three в репо (отложено — YAGNI) |
| Bloom жрёт батарею/фпс на старых ноутах | FPS-governor (Task 5) + пауза в скрытом табе |
| GitHub API rate-limit (60/h/IP) | localStorage TTL 60мин + fallback-константы |
| Canvas-сэмплер кота даст кривой силуэт | Отдельный verify-шаг в Task 3; запасной вариант — упрощённая голова (круг+уши без глаз) |
| Слишком агрессивные анимации раздражают | Всё уважает reduced-motion; boot одноразовый за сессию |
| Один большой PR-коммит | Запрещено планом: коммит после каждого таска |

## Open Questions (дефолты выбраны, можно переиграть)

1. **Палитра:** оставляю зелёный+циан, добавляю magenta как третий акцент. Хочешь полную смену палитры (violet/gold) — сказать до Task 2.
2. **Кот-морф:** делаю голову кота частицами (бренд arch1cat). Не хочется — заменю на тор-узел.
3. **og.png баннер:** могу сгенерировать 1200×630 картинку и закоммитить (Task 11) — по умолчанию делаю.
