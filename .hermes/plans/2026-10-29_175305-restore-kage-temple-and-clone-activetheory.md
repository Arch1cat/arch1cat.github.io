# План: Повернення теми «影の道 Kage» (Київсько-Кіотський храм) на головну та 100% автентичне клонування Active Theory (`activetheory/`)

**Дата:** 2026-10-29  
**Автор:** Antigravity / Hermes Agent (Chief System & UX Architect)  
**Ціль:**  
1. Повернути на головну сторінку `index.html` тему у східному стилі («影の道 Kage» / Kyoto Mountain Temple) з повним усуненням зависання прелоадера на 0% та збереженням карток `Fixora`, `Feexaro`, `VULCAN 3D`.  
2. Повністю за стандартом скіла `website-cloning-and-preview-standards` реалізувати бездоганний автономний 100% клон [Active Theory](https://activetheory.net/) за адресою `activetheory/` (GitHub Pages: `https://arch1cat.github.io/activetheory/`) з ліквідацією зависання прелоадера на 75% та повноцінним WebGL-середовищем.

---

## 1. Аналіз кореневих причин (Root Cause Analysis)

### 1.1. Чому зависав Kage на головній сторінці (`index.html`)
- У файлі `assets/kage/kage-engine.js` перший крок масиву `JOBS` викликає `document.fonts.load('600 320px Wordmark')`. Оскільки шрифт `Wordmark` не був оголошений через `@font-face` у CSS, у деяких браузерах (особливо на мобільних пристроях та без кешу) проміс `document.fonts.load` не резолвився вчасно або WebGL-ініціалізація блокувала макротаски, через що прелоадер `#pre` залишався на екрані з `0%`.
- **Рішення:** 
  1. Забезпечити захисний таймер (safety fallback timeout) у прелоадері: якщо сцена не сигналізує готовність протягом 1.8 секунди, прелоадер автоматично плавно розчиняється (`pre.classList.add('done')`, зняття `is-locked`).
  2. Додати оголошення шрифту `Wordmark` та перевірку готовності WebGL.
  3. Зберегти всі навігаційні кнопки та картки проєктів (`Fixora`, `Feexaro`, `3D Print`) у саду `Still Gardens`.

### 1.2. Чому зависав Active Theory на `/activetheory/` (застрягання на 75%)
- У директорії `activetheory/` при переході за адресою `https://arch1cat.github.io/activetheory/` вихідний скрипт `three-scene.js` намагався завантажити текстури проєктів за відносними шляхами `assets/textures/projects/...`. 
- Оскільки базова адреса була у підпапці, текстури повертали 404, таймер завантаження зависав на 75%, а WebGL-сцена зупинялась до отримання текстур.
- **Рішення:**
  1. Використати `<base href="../">` або жорстко зашити абсолютні/локальні шляхи до всіх ресурсів.
  2. Забезпечити повне завантаження справжнього Medusa WebGL-рушія Active Theory або самодостатнього автономного бандла Active Theory V6 з аудіо-рушієм, шейдерами хроматичної аберації, блуму, кіберпанк-інтерфейсом HUD, еквалайзером та тривимірним хребтом.

---

## 2. Покроковий план реалізації

### Етап 1: Відновлення та виправлення теми Kage на `index.html`
- [ ] Відновити структуру `index.html` із коміту `1f42e29` (Kage Kyoto Mountain Temple 3D з радіо капсулою).
- [ ] Впровадити гарантований відвід прелоадера (fail-safe fallback) у скрипті ініціалізації:
  ```html
  <script>
    // Fail-safe preloader dismiss: ensure the sanctuary always opens smoothly
    window.addEventListener('load', () => {
      setTimeout(() => {
        const p = document.getElementById('pre');
        if (p && !p.classList.contains('done')) {
          p.classList.add('done');
          document.body.classList.remove('is-locked');
        }
      }, 1600);
    });
  </script>
  ```
- [ ] Перевірити наявність карток у розділі `Still Gardens`:
  - Card 01: Yotei CRM
  - Card 02: WARDOGS 3D
  - Card 03: World Monitor
  - Card 04: VULCAN 3D Lab (`3d-print/`)
  - Card 05: Feexaro Сервіс Харків (`rempobut/`)
  - Card 06: Fixora Харків (`fixora/`)
- [ ] Додати у навігацію швидкі посилання на `Active Theory` (`activetheory/`), `Fixora` (`fixora/`) та `Feexaro` (`rempobut/`).
- [ ] Протестувати `http://localhost:8080/` через `browser_exec` та `vision_analyze`.

### Етап 2: Створення 100% автономного клону Active Theory в `activetheory/`
- [ ] Підготувати `activetheory/index.html` як повністю самодостатній автономний проєкт з правильним завантаженням:
  - `<base href="../">` для коректного підтягування всіх текстур `assets/textures/projects/...`, моделей та аудіо-файлів.
  - Повний набір Active Theory V6:
    - 3D WebGL Canvas Layer з інтерактивною просторовою каруселлю.
    - Crystalline Biomechanical Spine & Cosmic Particle Ring.
    - Active Theory Radio із живим стрімом та треками (Sergey Azbel - Themis).
    - Іконічний ASCII Sphere Preloader (0% → 100% за 1.2 с з плавним виходом).
    - Category Navigator (ALL WORKS, WEBSITES & CRM, 3D EXPERIENCES, AI AGENTS, TELEMETRY).
    - Slide-out Project Inspection Drawer з ефектом приглушення аудіо.
    - Interactive AI Search Capsule.
- [ ] Забезпечити, що всі текстури проєктів (`yotei.png`, `wardogs.png`, `world-monitor.png`, `opengym.png`, `wifiscanner.png`, `meta-cleaner.png`, `cats-match3.png`) присутні та завантажуються без помилок.
- [ ] Перевірити роботу в `browser_exec` — прелоадер проходить до 100%, сцена відкривається на повний екран, частинки обертаються, звук працює.

### Етап 3: Верифікація за Залізним Законом (Iron Law)
- [ ] Перевірити локально всі 4 адреси:
  - `http://localhost:8080/` (Kage Kyoto Temple — 100% робочий без зависань)
  - `http://localhost:8080/activetheory/` (Active Theory 1:1 клон — 100% робочий)
  - `http://localhost:8080/rempobut/` (Feexaro Харків — фото майстра та реальні фото техніки)
  - `http://localhost:8080/fixora/` (Fixora Харків — нео-бруталізм)
- [ ] Зробити скріншоти та перевірити комп'ютерним зором `vision_analyze`.

### Етап 4: Деплой на GitHub Pages
- [ ] Закомітити зміни та запушити в `origin main`:
  `git add -A && git commit -m "feat: restore Kage Kyoto temple to root with fail-safe preloader & polish Active Theory 1:1 clone" && git push origin main`
- [ ] Перевірити доступність наживо на `https://arch1cat.github.io/` та `https://arch1cat.github.io/activetheory/`.
