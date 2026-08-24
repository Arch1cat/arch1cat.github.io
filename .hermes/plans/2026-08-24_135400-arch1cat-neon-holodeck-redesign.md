# arch1cat — «NEON HOLODECK» Redesign Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.
> **SUPERSEDES:** `.hermes/plans/2026-08-24_133700-arch1cat-neon-os-3d-redesign.md` — этот план заменяет предыдущий. Морфинг-частицы заменены флотом объёмных летающих объектов с физикой курсора; добавлены объёмные кнопки в воздухе.

**Goal:** Превратить сайт в «голодек»: флот объёмных неоновых кристаллов летает в воздухе вокруг контента, реагирует на курсор (отталкивание, подсветка при ховере, шоквейв по клику), перестраивается в формации при скролле, а кнопки — объёмные 3D-панели в воздухе, которые наклоняются, магнитятся и продавливаются к курсору.

**Architecture:** Один статический сайт без сборки. Разметка в `index.html` (Tailwind CDN), стили в `assets/css/style.css`, логика в двух ES-модулях: `assets/js/three-scene.js` (WebGL: флот объектов, физика курсора, формации, bloom) и `assets/js/ui.js` (DOM: boot, scramble, tilt-кнопки, курсор, статы, аудио). Ключевой принцип: у каждой 3D-сущности есть «домашняя» точка и пружинная физика — формации, отталкивания и возвраты получаются бесплатно из одной системы.

**Tech Stack:** Vanilla HTML/CSS/JS · Three.js r170 ES modules + importmap (jsdelivr, запиннено) · EffectComposer + UnrealBloomPass · Raycaster · Tailwind Play CDN · GitHub REST API (кэш + fallback) · Web Audio API · GitHub Pages.

---

## Context / текущее состояние

Репозиторий: `C:\Users\z\Desktop\arch1cat_site` → `git@github.com:Arch1cat/arch1cat.github.io.git` (GitHub Pages, main, `.nojekyll` есть).

Один файл `index.html` (665 строк): тема Cyber Matrix (#00FF66 зелёный, #00F2FE циан), Three.js r128 (grid-пол, wireframe-core, 2000 квадратных частиц, mouse-light, скролл-камера), секции: Hero, 4 OSS-карточки (World Monitor, WiFi Scanner, Metadata Cleaner, Cats Match-3), Yotei showcase, GitHub Snake embed, футер. Аудио-бипы через Web Audio, тумблер в хедере. Терминал-секция удалена пользователем сознательно — НЕ возвращать.

## UX Analysis (Chief Architect)

**Боли текущего сайта:**
1. 3D никак не связан с курсором как физическое пространство — мышь двигает свет, но объекты «не чувствуют» руку.
2. Кнопки плоские: нет объёма, глубины, тактильности нажатия.
3. Карточки — плоские прямоугольники, а могли бы быть голо-панелями, парящими над полом.
4. Скролл ничего не меняет в мире — камера ездит по синусоиде без смысла.

**Целевой опыт:** страница = комната голодека. При загрузке короткий boot → в воздухе висит флот кристаллов (твёрдое тёмное ядро + неоновый каркас-вайрфрейм поверх + glow-спрайт сзади = объём). Объекты медленно дышат (bobbing + вращение). Курсор — силовое поле: подношение ближе → кристаллы расступаются, наведение на объект → он вспыхивает и увеличивается, клик → кольцо-шоквейв и импульс соседям. Скролл между секциями → объекты **перелетают в новые формации** (герой: рассеянное созвездие справа; проекты: две колонны по бокам контента; активность: спираль). Кнопки hero/header — многослойные CSS-3D панели с толщиной (передняя грань + тёмная задняя грань со сдвигом по Z + свечение-лужа под низом), парят с разными фазами, наклоняются к курсору, магнитятся и продавливаются при нажатии. Карточки — парящие панели с отражением в полу и разной «глубиной» параллакса.

**Правило читаемости (критично):** контент занимает центральную колонку. Флот живёт либо за контентом (z < −5, приглушён), либо у краёв (|x| > 4). Никакой объект не проплывает перед текстом.

## Art Direction «NEON HOLODECK»

- Палитра бренда сохраняется: фон `#010603`, зелёный `#00FF66`, циан `#00F2FE`; новый акцент **magenta `#FF2ED1`** — вспышки ховеров, часть градиентов, пасхалка.
- Объём объектов: `MeshStandardMaterial` (тёмное тело, metalness 0.85, roughness 0.25, emissive зелёный слабый) + поверх двойник-каркас `MeshBasicMaterial wireframe` яркий + `Sprite` с радиальным градиентом позади (additive). Читается как голографический кристалл.
- Настоящее свечение: UnrealBloomPass (strength 0.9, radius 0.6, threshold 0.85). Тон-маппинг НЕ включать.
- Типографика без изменений: Inter + JetBrains Mono, mono-подписи `// SECTION`.
- Пол: grid как сейчас + мягкое пятно света под каждой карточкой (CSS) = ощущение, что всё парит над полом сцены.

---

## Структура файлов

```
arch1cat_site/
├── index.html                  (изменить: meta, importmap, разметка кнопок/статов, убрать старый движок)
├── assets/
│   ├── css/style.css           (создать: тема, holo-кнопки, holo-карты, boot, cursor, reveal)
│   ├── js/three-scene.js       (создать: флот, физика, формации, bloom, шоквейвы)
│   └── js/ui.js                (создать: boot, scramble, tilt-кнопки, магниты, курсор, статы, аудио)
└── .hermes/plans/…             (этот план)
```

## Глобальные pitfalls (читать всем исполнителям)

1. **ES-модули не работают c `file://`** — локально только HTTP: `python -m http.server 8077` в корне репо → `http://localhost:8077`.
2. CDN пиннить на точную версию (`three@0.170.0`) — никаких floating tags.
3. `prefers-reduced-motion: reduce` → отключить boot, scramble, float-анимации, tilt, магниты, кастомный курсор; объекты стоят статично; контент читаем сразу.
4. Рендер-луп останавливается при `document.hidden`, возобновляется при возврате.
5. GitHub API без токена = 60 req/h/IP → localStorage TTL 60 мин + захардкоженные fallback-числа.
6. Не ломать якоря `#about/#projects/#activity` и все ссылки (x.com/Archi_____cat, github.com/l2bote4game, yotei.com.ua).
7. Каждый таск = отдельный коммит, conventional commits.

---

### Task 1: Скелет — вынести стили, importmap Three r170, стабы модулей

**Objective:** Фундамент без визуальных изменений: CSS отдельно, современный Three.js, модули подключены.

**Files:**
- Create: `assets/css/style.css`, `assets/js/three-scene.js` (пустые), `assets/js/ui.js` (пустые)
- Modify: `index.html`

**Steps:**
1. Перенести содержимое `<style>…</style>` (строки 45–124 index.html) в `assets/css/style.css` 1-в-1; вместо тега — `<link rel="stylesheet" href="assets/css/style.css">`.
2. Удалить `<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>` (строка 37), вставить перед закрывающим body:
```html
<script type="importmap">
{
  "imports": {
    "three": "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js",
    "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/"
  }
}
</script>
<script type="module" src="assets/js/three-scene.js"></script>
<script type="module" src="assets/js/ui.js"></script>
```
3. Старый инлайн-движок (строки 423–663) удалить целиком — перепишется в Task 2–5 (аудиофункции `toggleAudio/playBeep/playChime` из него перенесём в ui.js в Task 12; до этого кнопка звука просто никуда не ведёт — допустимо на один коммит).

**Verify:** `python -m http.server 8077` → превью `http://localhost:8077`: контент, стили, вёрстка на месте; консоль чистая (нет 404 на модули).
**Commit:** `chore: extract styles, pin three r170 via importmap, stub js modules`

---

### Task 2: Ядро сцены — рендерер, bloom, пол, звёзды, свет

**Objective:** Каркас мира с настоящим свечением.

**Files:**
- Modify: `assets/js/three-scene.js`

**Steps:**
1. Импорты: `three`, `EffectComposer`, `RenderPass`, `UnrealBloomPass`.
2. Сцена: `scene.fog = new THREE.FogExp2(0x010603, 0.02)`; рендерер `alpha:true, antialias:true`, `setPixelRatio(Math.min(devicePixelRatio, 2))`, resize-handler.
3. Composer: RenderPass + `UnrealBloomPass(new Vector2(w,h), 0.9, 0.6, 0.85)`. Тон-маппинг не трогать (дефолт NoToneMapping).
4. Свет: ambient `0x00ff66 @0.5`; PointLight мыши `0x00ff66 @5 dist 40`; орбитальный циановый `0x00f2fe @4 dist 50` (крутится по кругу r=12, как в старом коде).
5. Пол: `GridHelper(90, 60, 0x00ff66, 0x003311)`, y=-6, материалу `transparent:true, opacity:0.55`.
6. Starfield: 2500 точек на дальней сфере r∈[40,80]; текстура точки — `dotTexture()` (см. Task 3 шаг 1), additive, size 0.35, группа медленно вращается (0.005 rad/s).
7. Loop через `clock.getDelta()`; guard: если `document.hidden` — пропускать render/composer (rAF держим).
8. Экспорт: `window.__holo = { scene, camera, composer, bloomPass, THREE }` (для дебага и пасхалки из ui.js).

**Verify:** сервер → превью: неоновый пол и звёзды светятся bloom'ом; скрытие вкладки → CPU падает до ~0; консоль чистая.
**Commit:** `feat(scene): three r170 core with bloom, neon grid and starfield`

---

### Task 3: Флот объёмных летающих объектов ⭐ (центральная фишка №1)

**Objective:** 10–14 голографических кристаллов, парящих в воздухе с дыханием и вращением.

**Files:**
- Modify: `assets/js/three-scene.js`

**Steps:**
1. `dotTexture()`: offscreen canvas 64×64, radial gradient white→transparent → `CanvasTexture`. Используется для звёзд и glow-спрайтов.
2. Конструктор объекта `makeHoloObject({ geo, color, pos, scale })`:
```js
function makeHoloObject({ geo, color, pos, scale = 1 }) {
  const g = new THREE.Group();
  const solid = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
    color: 0x04160b, metalness: 0.85, roughness: 0.25,
    emissive: color, emissiveIntensity: 0.25, transparent: true, opacity: 0.92
  }));
  const wire = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
    color, wireframe: true, transparent: true, opacity: 0.9
  }));
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: dotTexture(), color, blending: THREE.AdditiveBlending,
    transparent: true, opacity: 0.35, depthWrite: false
  }));
  glow.scale.setScalar(scale * 4);
  g.add(glow, solid, wire);
  g.position.copy(pos);
  return { group: g, solid, wire, glow, home: pos.clone(),
           vel: new THREE.Vector3(), phase: Math.random() * Math.PI * 2,
           spinAxis: new THREE.Vector3().randomDirection(),
           spinSpeed: 0.2 + Math.random() * 0.4, hoverT: 0 };
}
```
3. Флот (миксовать геометрии и цвета green/cyan/magenta):
   - **Фоновый флот (8 шт):** z ∈ [−16, −6], разброс x∈[−22,22], y∈[−8,10], scale 0.6–1.2, приглушённый (wire opacity 0.5, glow 0.2). Геометрии: `IcosahedronGeometry(1.2, 0)`, `OctahedronGeometry(1.4)`, `TorusKnotGeometry(0.7, 0.22, 64, 8)`, `TetrahedronGeometry(1.5)`.
   - **Передний флот (4 шт):** у краёв |x| ∈ [7, 12], z ∈ [−2, 2], scale 1–1.6 — самые реактивные.
4. Анимация дыхания (в общем loop): `group.position.y = базоваяY + sin(t*0.8 + phase)*0.35`; вращение `rotateOnAxis(spinAxis, spinSpeed*dt)`; glow пульсирует `opacity = base + sin(t*2+phase)*0.08`.
5. Ховеры: массив solid-мешей в `Raycaster`; при пересечении луча цель `hoverT=1`, иначе 0; каждый кадр `lerp(hoverT)` и применять: `emissiveIntensity 0.25→1.4`, `wire.opacity →1.0`, `glow.opacity →0.7`, масштаб группы ×(1+0.18*hoverT), `spinSpeed` временно ×3.
6. `window.__holo.objects = objects`.

**Verify:** сервер → превью: кристаллы объёмные (тело+каркас+свечение), дышат и вращаются; наведение мыши → объект вспыхивает и слегка растёт; ни один объект не заходит на центральный текстовый коридор (|x|<4 && z>−5 пусто); FPS ≥ 55 desktop.
**Commit:** `feat(scene): holographic floating object fleet with hover glow`

---

### Task 4: Силовое поле курсора — физика, отталкивание, шоквейв по клику ⭐ (фишка №2)

**Objective:** Курсор становится физическим объектом в сцене: расталкивает кристаллы, клик бьёт волной.

**Files:**
- Modify: `assets/js/three-scene.js`

**Steps:**
1. 3D-позиция курсора: unproject указателя на плоскость z=0:
```js
const ndc = new THREE.Vector2();
const cursor3 = new THREE.Vector3();
const raycaster = new THREE.Raycaster();
window.addEventListener('pointermove', (e) => {
  ndc.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
});
// каждый кадр:
raycaster.setFromCamera(ndc, camera);
raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,0,1), 0), cursor3);
mouseLight.position.set(cursor3.x, cursor3.y, 4);
```
2. Физика пружины + отталкивание (для каждого объекта, в loop):
```js
const REACH = 4.2, K = 2.2, DAMP = 0.90;
tmp.copy(obj.home).sub(obj.group.position).multiplyScalar(K * dt); // пружина к дому
obj.vel.add(tmp);
const dist = obj.group.position.distanceTo(cursor3);
if (dist < REACH) {
  push.copy(obj.group.position).sub(cursor3).setLength((REACH - dist) * 6 * dt);
  obj.vel.add(push);                                   // отталкивание
}
obj.vel.multiplyScalar(DAMP);
obj.group.position.addScaledVector(obj.vel, dt * 60);
```
Базовая Y-позиция для дыхания берётся из `home.y` (не из текущей), чтобы физика и бобинг не конфликтовали: дыхание применять к `wire/glow` смещением визуальной части нельзя — проще: `home.y` статичен, а итоговая позиция = физическая позиция; бобинг реализовать как малую силу `sin(t+phase)` добавляемую в vel. Так одна система отвечает за всё.
3. Шоквейв по клику: pool из 4 колец `Mesh(TorusGeometry(0.12, 0.03, 8, 48))`, материал basic цвет по объекту/зелёный, additive. По `pointerdown`: кольцо в точку `cursor3` (или точку пересечения с объектом), нормаль к камере; анимация 0.9с: scale 1→16, opacity 0.9→0, затем вернуть в пул. Одновременно импульс всем объектам в радиусе 9: `vel += dir.normalize() * (9-dist) * 0.5`.
4. Клик по конкретному объекту (raycast попал в solid): дополнительно kick вращению (`spinSpeed ×8` на 1.5с, затухая) и короткая вспышка его glow до 1.0.

**Verify:** сервер → превью: проводишь курсором сквозь флот — кристаллы расступаются и плавно возвращаются на места (с лёгким овершутом); клик в воздухе — расходящееся кольцо + волна по объектам; клик по кристаллу — вспышка и раскрутка; после остановки мыши всё успокаивается за ~2с.
**Commit:** `feat(scene): cursor force field physics + click shockwave rings`

---

### Task 5: Сценарий скролла — формации флота и позы камеры

**Objective:** При переходе между секциями объекты перелетают в новые формации — мир живёт вместе с контентом.

**Files:**
- Modify: `assets/js/three-scene.js`, `index.html` (только `data-scene` атрибуты на секциях)

**Steps:**
1. Разметке секций добавить атрибуты: `#about → data-scene="hero"`, `#projects → data-scene="projects"`, `#activity → data-scene="activity"`.
2. Формации — просто новые home-точки (пружина сама доставит объекты с красивым перелётом):
```js
const FORMATIONS = {
  hero: (i, n) => new THREE.Vector3(
      (i % 2 ? 1 : -1) * (7 + Math.random() * 5),          // края
      (Math.random() - 0.5) * 10,
      -4 - Math.random() * 10),
  projects: (i, n) => new THREE.Vector3(
      (i % 2 ? 1 : -1) * (8.5 + Math.random() * 3),        // две колонны по бокам
      ((Math.floor(i / 2) / Math.ceil(n / 2)) - 0.5) * 14,
      -3 - Math.random() * 6),
  activity: (i, n) => new THREE.Vector3(                    // спираль
      Math.cos(i / n * Math.PI * 4) * 6,
      (i / n - 0.5) * 12,
      Math.sin(i / n * Math.PI * 4) * 6 - 4),
};
function setFormation(name) {
  const f = FORMATIONS[name] || FORMATIONS.hero;
  objects.forEach((o, i) => o.home.copy(f(i, objects.length)));
}
```
   Фоновому флоту при формациях сохранять z ≤ −6 (не выплывать за контент): после вычисления точки клампить `if (pos.z > -5 && Math.abs(pos.x) < 6) pos.z = -5 - Math.random()*4`.
3. `IntersectionObserver` c `rootMargin: '-45% 0px -45% 0px'` по `[data-scene]` → активная секция вызывает `setFormation(...)` + задаёт позу камеры:
```js
const CAM_POSES = {
  hero:     { pos: [0, 0, 10],  look: [0, 0, 0] },
  projects: { pos: [3, -1, 10], look: [0, -1, 0] },
  activity: { pos: [-3, -3, 10],look: [0, -2, 0] },
};
```
   Лерп камеры 0.05 на кадр (как в старом коде) + параллакс мыши ±1.2 юнита.
4. Fog color лерпить: hero `0x010603`, projects `0x030610`, activity `0x0c0312` (лёгкий magenta-оттенок).

**Verify:** сервер → превью: скролл hero→projects→activity — кристаллы эффектно перелетают в колонны/спираль, камера мягко меняет ракурс; обратный скролл возвращает; текст всегда читаем (объекты не перед контентом).
**Commit:** `feat(scene): scroll-driven fleet formations + camera choreography`

---

### Task 6: FPS-governor + пауза рендера

**Objective:** Стабильные 30+ FPS на слабых устройствах ценой качества, а не слайд-шоу.

**Files:**
- Modify: `assets/js/three-scene.js`

**Steps:**
1. Rolling average FPS за 60 кадров; ступени деградации (по одной, без отката):
   - <32 FPS → `renderer.setPixelRatio(1.25)`
   - снова <32 → `bloomPass.enabled = false` + компенсация: всем wire `opacity=1.0`, glow `opacity×1.4`
   - снова <32 → фоновый флот скрыть (`visible=false`)
2. Каждый шаг один раз логирует `console.info('[perf] degraded …')`.

**Verify:** временно `renderer.setPixelRatio(4)` → в консоли каскад ступеней; вернуть. Реально проверить на встроенной графике, если доступно.
**Commit:** `feat(scene): adaptive quality governor`

---

### Task 7: Boot-оверлей «NEON HOLODECK starting…»

**Objective:** Терминальный прелоадер ≤1.5с, задаёт тон; одноразовый за сессию.

**Files:**
- Create разметку в `index.html` (fixed overlay перед `<main>`), логику в `assets/js/ui.js`, стили в `assets/css/style.css`

**Steps:**
1. Разметка: overlay z-[100], фон `#010603`, mono-строки: `> initializing neon holodeck v3.0`, `> spawning hologram fleet … OK`, `> calibrating cursor field … OK`, `> meow.` + прогресс-бар из символов `█░`.
2. Логика: `sessionStorage.neonBootDone || prefers-reduced-motion` → мгновенно `display:none`. Иначе печать строк (~90мс/символ, бюджет ≤1.5с суммарно) → fade-out 400мс → флаг. Пока виден: `body.overflow:hidden`, потом снять.
3. После fade-out триггерить стартовое появление флота (объекты «материализуются»: масштаб 0→1 со stagger 60мс, ease-out-back) — связка boot → мир оживает.

**Verify:** первая загрузка показывает boot и убирает; reload той же сессии — boot скрыт мгновенно; reduced-motion — никогда не показывается; флот появляется красиво после boot.
**Commit:** `feat(ui): neon holodeck boot sequence + fleet materialization`

---

### Task 8: Scramble-заголовки + каскадные reveal

**Objective:** Текст «декодируется» при появлении — фирменный момент.

**Files:**
- Modify: `assets/js/ui.js`, `assets/css/style.css`, `index.html` (классы `data-scramble`, `reveal`)

**Steps:**
1. `scramble(el)`: кадр 30мс, глифы `!<>-_\/[]{}—=+*^?#01`, раскрытие слева направо ~700мс, один раз.
2. Пометить `data-scramble`: hero H1, подписи `// PORTFOLIO & WORK`, заголовки подсекций.
3. Reveal: `.reveal{opacity:0;transform:translateY(24px)}` + `.in{opacity:1;transform:none}`, transition .7s cubic-bezier(.16,1,.3,1); IO threshold 0.15; stagger карточек 80мс по индексу.
4. Reduced-motion → классы `in` проставляются сразу.

**Verify:** превью: заголовки декодируются, карточки всплывают каскадом, повторный проход не переигрывает.
**Commit:** `feat(ui): scramble decode titles + staggered scroll reveals`

---

### Task 9: Объёмные кнопки в воздухе ⭐ (фишка №3)

**Objective:** Hero CTA и кнопки хедера — многослойные CSS-3D панели с реальной толщиной, парящие и реагирующие на курсор.

**Files:**
- Modify: `assets/css/style.css`, `assets/js/ui.js`, `index.html` (обёртки кнопок)

**Steps:**
1. Разметка: обёртка отвечает за парение, внутренняя ссылка — за 3D (иначе трансформы конфликтуют):
```html
<div class="float-wrap" style="--fd: 0s">
  <a href="#projects" class="holo-btn holo-btn-primary">…</a>
</div>
```
2. CSS ядра кнопки:
```css
.float-wrap { animation: floaty 5.2s ease-in-out infinite; animation-delay: var(--fd, 0s); }
@keyframes floaty { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-7px) } }

.holo-btn {
  --depth: 8px; --rx: 0deg; --ry: 0deg; --mxp: 0px; --myp: 0px; --tz: 0px;
  display: inline-flex; align-items: center; gap: .75rem;
  transform-style: preserve-3d;
  transform: perspective(700px)
             translate(var(--mxp), var(--myp)) translateZ(var(--tz))
             rotateX(var(--rx)) rotateY(var(--ry));
  transition: transform .18s ease-out, box-shadow .3s;
}
/* задняя грань = толщина */
.holo-btn::before {
  content: ''; position: absolute; inset: 0; border-radius: inherit; z-index: -1;
  transform: translateZ(calc(var(--depth) * -1));
  background: linear-gradient(160deg, #052e14, #01170a);
  border: 1px solid rgba(0,255,102,.35);
}
/* световая лужа под кнопкой */
.holo-btn::after {
  content: ''; position: absolute; left: 8%; right: 8%; bottom: -34%; height: 40%;
  z-index: -2; border-radius: 9999px; filter: blur(16px);
  background: radial-gradient(closest-side, rgba(0,255,102,.45), transparent);
  opacity: .55; transition: opacity .3s, bottom .3s;
}
.holo-btn:hover::after { opacity: .95; bottom: -42%; }
.holo-btn:hover { box-shadow: 0 0 34px rgba(0,255,102,.28); }
.holo-btn:active { --tz: -5px; filter: brightness(1.35); }
```
3. Блик-свип: дочерний `<span class="sheen">` с `linear-gradient(105deg, transparent 40%, rgba(255,255,255,.25) 50%, transparent 60%)`, `translateX(-120%)→120%` при hover за 0.7с.
4. JS-tilt + магнит (единый rAF в ui.js, только `(pointer:fine)` и не reduced-motion): для каждой `.holo-btn` по позиции курсора относительно центра: `--ry = clamp(dx*10°)`, `--rx = clamp(-dy*10°)`, магнит `--mxp/--myp ≤ 10px` к курсору (lerp 0.15); на hover `--tz: 10px` (поднимается к зрителю).
5. Применить ко всем кнопкам: hero «EXPLORE PROJECTS» (primary, зелёная грань), hero X-Twitter, хедер-аудио/X/GitHub. Разные `--fd` (0s/.6s/1.2s…) чтобы парили в противофазе. Yotei-кнопке — purple-вариант грани.
6. Reduced-motion/touch: float и tilt выключены, кнопки статичны, обычный `:active`-эффект остаётся.

**Verify:** превью: кнопки объёмные (виден тёмный торец и лужа света на полу), паряют в противофазе, наклоняются к курсору, тянутся к нему, при нажатии продавливаются и вспыхивают; на touch-эмуляции — обычные стабильные кнопки.
**Commit:** `feat(ui): volumetric 3d floating holo-buttons with cursor tilt+magnet`

---

### Task 10: Голо-карточки проектов — отражение в полу + глубина

**Objective:** Карточки выглядят как парящие панели над полом сцены.

**Files:**
- Modify: `assets/css/style.css`, `assets/js/ui.js` (лёгкий tilt), `index.html` (атрибут `data-depth`)

**Steps:**
1. Каждой карточке `data-depth` (фон. флоту параллакса: World Monitor 1.0, WiFi 1.4, Metadata 0.8, Cats 1.6, Yotei 0.6).
2. Отражение: псевдоэлемент снизу карточки — перевёрнутая размытая копия не делаем (дорого), вместо этого «отражение-намёк»: `::after` — вертикальный градиент от цвета бордера карточки к прозрачному высотой ~60px ниже карточки + blur 8px, opacity .25. Плюс общее правило: под сеткой карточек уже есть grid-пол сцены — выглядит как отражение в нём.
3. Tilt карточек: rotateX/Y ≤5°, perspective 900, spotlight-бордер через `::before` c `radial-gradient(220px at var(--mx) var(--my), rgba(0,255,102,.22), transparent 70%)` (vars обновляет тот же rAF, что и Task 9); на hover `translateY(-6px)`.
4. Параллакс-дрейф: при скролле карточки сдвигаются на `scrollDelta * (depth-1) * 0.03` по Y (transform в том же rAF) — разные скорости = ощущение разных высот парения.
5. Reduced-motion: только статичный hover-lift.

**Verify:** превью: карточки чуть наклоняются, блик ходит по рамке за мышью, при скролле карточки плавают с разной скоростью, под ними световое пятно; текст внутри резкий (tilt мал).
**Commit:** `feat(ui): floating holo-cards with depth parallax and spotlight borders`

---

### Task 11: Кастомный курсор + клик-рипл на странице

**Objective:** Курсор — энергетическое ядро: точка + кольцо-хвост, клик пускает рябь и по DOM тоже.

**Files:**
- Modify: `assets/js/ui.js`, `assets/css/style.css`

**Steps:**
1. DOM: `<div id="cursor-dot">` (6px, зелёный) + `<div id="cursor-ring">` (34px кольцо, border cyan, lerp-хвост 0.18). Только `(pointer:fine)`; `body{cursor:none}` в этой же media.
2. Кольцо растёт ×1.6 и зеленеет над `a, button, .glass-card-matrix` (делегированный mouseover/out).
3. Клик: DOM-ripple — div расширяющееся кольцо в точке клика (600ms, fade), синхронно с 3D-шоквейвом Task 4 (они совпадут по месту — вау-эффект единого поля).
4. В моменты загрузки/boot курсор-кольцо «заряжается» (быстро вращающийся conic-gradient border).

**Verify:** превью: курсор плавный с хвостом, реагирует на интерактивные элементы, клик даёт двойную рябь (DOM+WebGL в одной точке); touch-устройства — системный курсор/жесты без изменений.
**Commit:** `feat(ui): energy cursor with trailing ring and unified click ripple`

---

### Task 12: Живая GitHub-телеметрия

**Objective:** Реальные цифры с анимированными счётчиками — social proof.

**Files:**
- Modify: `assets/js/ui.js`, `index.html` (stats-блок под hero subtitle + бейджи ★ на карточках)

**Steps:**
1. Разметка: ряд из 3 stat-блоков (`STARS EARNED`, `PUBLIC REPOS`, `FOLLOWERS`) mono, крупные цифры, тонкие разделители.
2. Fetch параллельно: `users/l2bote4game` + `repos/l2bote4game/{world-monitor,wifiscaner,media-meta-cleaner,cats-match3-game}` → сумма stargazers.
3. Кэш `localStorage['neon_holo_gh'] = {t, data}` TTL 60 мин; промах/ошибка → fallback-константы (зафиксировать актуальные значения в комментарии при реализации).
4. Счётчики: rAF ease-out 1.2с от 0; бейдж `★ N` в углу OSS-карточек после загрузки (без данных скрыт).

**Verify:** превью: числа набегают; повторный заход в течение часа — запросов к api.github.com нет (Network); блокировка домена → сайт работает на fallback.
**Commit:** `feat(ui): live github stats counters with cache and fallbacks`

---

### Task 13: Аудио v2 + пасхалка «meow»

**Objective:** Звуковая обратная связь + режим перегрузки голодека.

**Files:**
- Modify: `assets/js/ui.js` (перенести `toggleAudio/playBeep/playChime` из старого кода 1-в-1)

**Steps:**
1. Перенести существующий синт без изменения поведения; персист `localStorage['neon_sound']`.
2. Новое: hover на ссылках/кнопках — blip 220Hz square 30ms (rate-limit 100ms), click — 440Hz 60ms.
3. Пасхалка: буфер клавиш, последовательность `meow` → **HOLODECK OVERLOAD**: `__holo.bloomPass.strength` 0.9→2.2→0.9 за 900мс; всем объектам `spinSpeed×6` на 2.5с с затуханием + случайный magenta-цвет wire на время; аккорд-«мяу» (осц glide 600→350Hz sawtooth + chime); toast `🐱 MEOW MODE` снизу. Desktop-only.

**Verify:** превью: звук тумблером, состояние переживает reload; набор `meow` — сцена вспыхивает, кристаллы бешено крутятся, toast появляется; по умолчанию звук выключен.
**Commit:** `feat(ui): audio feedback v2 + meow holodeck overload easter egg`

---

### Task 14: SEO / мета / favicon / доступность

**Objective:** Достойный вид в выдаче, соцсетях и вкладке браузера.

**Files:**
- Modify: `index.html`

**Steps:**
1. OG/Twitter: `og:title`, `og:description` (упомянуть 3D/WebGL), `og:type=website`, `og:url=https://arch1cat.github.io/`, `twitter:card=summary_large_image`, `og:image=/og.png`.
2. `og.png` 1200×630: сгенерировать через image_generate (неоновый кот-голограмма в стиле сайта, текст ARCH1CAT) → положить в корень репо.
3. Favicon: инлайн SVG data-URI (кот-силуэт `#00FF66` на чёрном) + `<meta name="theme-color" content="#020904">`.
4. JSON-LD `Person` (arch1cat, url, sameAs: x.com/Archi_____cat, github.com/l2bote4game).
5. A11y: `aria-label` на icon-only кнопках, `aria-hidden="true"` на webgl-канвасе и декоративных слоях, серые мелкие подписи поднять до gray-300 (контраст ≥4.5).

**Verify:** превью + view-source: мета на месте; favicon во вкладке; канвас не объявляется скринридерам; контраст мелкого текста ок.
**Commit:** `feat(seo): og/twitter meta, generated og banner, svg favicon, json-ld, a11y`

---

### Task 15: Мобильный проход + финальный QA + деплой

**Objective:** Вылизать телефон, прогнать чек-лист, задеплоить, проверить живой сайт.

**Files:** любые из перечисленных (точечные правки)

**Steps:**
1. Мобайл (DevTools iPhone/Pixel + реальный телефон): передний флот скрыт или 2 объекта, DPR≤1.5, tilt/магниты/курсор off, boot короче (2 строки), hero-заголовок не обрезан, карточки в одну колонку, Snake-карта скроллится внутри контейнера.
2. QA-чеклист (всё ✅ до пуша):
   - [ ] `node --check assets/js/three-scene.js && node --check assets/js/ui.js`
   - [ ] Консоль без ошибок на всех трёх секциях
   - [ ] Кристаллы: дышат, отталкиваются от курсора, вспыхивают на hover, шоквейв по клику
   - [ ] Формации переключаются скроллом туда-обратно без рывков
   - [ ] Кнопки: объём, парение, tilt, магнит, продавливание
   - [ ] Ни один объект не перекрывает текст (визуальная проверка на 1920/1440/1280/390 ширинах)
   - [ ] Heap snapshot до/после 10 скроллов ±10MB (нет утечки колец/объектов)
   - [ ] Скрытая вкладка не рендерит; reduced-motion полностью статичен и читаем
   - [ ] Все ссылки живы, якоря работают
3. Коммит + `git push origin main` → ждать Pages (~60с) → `open_preview https://arch1cat.github.io/` → чек-лист повторно на проде. Регресс — немедленный hotfix-коммит.

**Commit:** `chore: mobile polish + release neon holodeck v3`

---

## Risks / Tradeoffs

| Риск | Митигация |
|---|---|
| Объекты залезают на текст → нечитаемо | Правило коридора (|x|<4 ⇒ z≤−5) зашито в формации + verify-шаг в Task 5/15 |
| Физика + бобинг конфликтуют → дёргание | Бобинг как малая сила в общей spring-системе, не отдельным transform (Task 4 шаг 2) |
| Bloom жрёт батарею | FPS-governor + пауза в скрытой вкладке |
| GitHub rate-limit | localStorage TTL + fallback-константы |
| CSS-3D кнопки ломаются на Safari | preserve-3d + z-index:-1 у ::before проверяется в превью; фолбэк — кнопка без торца, hover работает |
| Утечка памяти от колец шоквейва | Pool фиксированного размера (4), никакого создания мешей в цикле |
| Слишком много движения раздражает | Всё уважает reduced-motion; амплитуды парения малы (≤7px) |

## Open Questions (дефолты выбраны)

1. Палитра: зелёный+циан+magenta акцент. Полная смена (violet/gold) — сказать ДО Task 2.
2. Формы объектов: кристаллы/тор-узлы/октаэдры. Хочешь мини-котиков из вокселей — можно заменить 1–2 объекта (сказать до Task 3).
3. og.png генерю нейросетью (Task 14) — по умолчанию делаю.
