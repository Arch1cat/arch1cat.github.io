# arch1cat — Тема №2 «SIGNAL DECK» + 3D Audio Player Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.
> **Базис:** текущий прод ARCHIVE//01 (`assets/css/style.css`, `three-scene.js`, `ui.js`). Ничего не ломаем — вторая тема добавляется ПЕРЕКЛЮЧАТЕЛЕМ в хедере, первая остаётся дефолтом.

**Goal:** Добавить на arch1cat.github.io вторую тему «SIGNAL DECK» (вдохновение: ThreeUI Orrery/Cathode — плотный HUD-интерфейс космической станции, индиго+янтарь+лёд вместо угля и вермильона) и встроить в неё **работающий 3D аудио-плеер**: вращающийся виниловый диск из светящихся колец, спектр-бары реагируют на реальный звук через Web Audio AnalyserNode. Звук — **генеративный синтез** (3 трека-паттерна, ноль копирайта, работает офлайн).

**Architecture:** Переключатель тем через `html[data-theme="archive|deck"]` — все цвета уже на CSS-переменных, добавляем второй набор токенов + плотные HUD-компоненты. Сцена `three-scene.js` получает конфиги палитр (лерп fog/light/material при переключении, без перезагрузки) и **модуль плеера**: отдельная группа (винил + реактивные бары), видима в обеих темах как новая глава `04 — TRANSMISSION`. Аудио-движок в новом файле `audio-engine.js` (генеративные паттерны → GainNode → AnalyserNode → destination).

**Tech Stack:** Существующий стек + InstancedMesh (спектр-бары), Web Audio API (Oscillator/Gain/BiquadFilter/Analyser), localStorage (theme + volume persist).

---

## Дизайн «SIGNAL DECK» (чем берём)

**Палитра:** фон `#080B14` (полуночный индиго), поверхность `#0F1526`, текст `#E8ECF8`, приглушённый `#7A84A8`, акценты: **электро-фиолет `#7C5CFF`**, **янтарь `#FFB454`**, лёд `#9BE8FF` (второй акцент разрешён — тема другая). Линии `rgba(232,236,248,.12)`.

**Плотность (анти-«пусто»):**
- Бегущая строка-ticker под хедером (`TRANSMISSION 001 // KYIV STATION // SIGNAL STRONG …`)
- HUD-уголки (bracket-скобки) на карточках и секциях
- Статус-панель справа сверху: локальное время UTC+2, FPS сцены, координаты курсора — живые цифры
- Карточки проектов превращаются в «модули станции» с индексами, статус-LED и прогресс-полосками загрузки
- Фон: тонкая сетка + виньетка + шум остаются, добавляется лёгкий scanline
- Ghost-numerals заменяются на орбитальные дуги SVG по углам секций

**3D-сцена deck:** туман индиго, key-свет ледяной, ember-горизонт → фиолетовое зарево снизу. Артефакт-узел ОСТАЁТСЯ (перецветается в фиолет/лёд), рядом появляется **ПЛЕЕР**.

## 3D AUDIO PLAYER (центральная фича)

Композиция (глава `#transmission`, между FLAGSHIP и SIGNAL):
- **Винил:** 3 концентрических кольца-борозды (`TorusGeometry` тонкие) + центральная ламель-цилиндр, всё metalness .9; вращается со скоростью playState (33⅓ RPM ≈ 0.35 rad/s, ease-in/out 600ms при start/stop)
- **Тон-рука:** изогнутая трубка (`TubeGeometry` по CatmullRom кривой) опускается на пластинку при play (анимация поворота группы)
- **Спектр:** 64 бара `InstancedMesh(BoxGeometry)` по кругу вокруг винила, высота = частотные бины анализатора (лог-шкала), emissive от темы (фиолет низкие → янтарь высокие); в паузе плавно оседают до 0.05
- **Свет:** pointLight над плеером пульсирует RMS-уровнем
- Управление: клик по диску = play/pause (raycast), кнопки DOM: ⏵/⏸, next-track, громкость; drag мышью крутит всю группу плеера (инерция)
- Названия треков генеративные: `KYIV NIGHTBUS`, `EMBER PROTOCOL`, `CAT TRANSMISSION`

## Генеративный аудио-движок

3 «трека» = 3 конфига: {scale (минорный пентатоник A / дорийский D / фригийский E), BPM (84/96/72), тембр (triangle pad + sine arp / sawtooth bass + square blip)}:
- Пад: 2 осциллятора с detune ±4c через lowpass, аккорд меняется каждые 2 такта
- Арп: 16-е ноты по паттерну из гаммы, случайная октава, короткий pluck-envelope
- Бас: корневая нота каждые полтакта
- Хэт-шум: buffer белого шума через highpass, каждые 8-е
Всё через MasterGain(0.6·volume) → Analyser(fftSize=256) → compressor → destination. Scheduler на lookahead 100ms (стандартный паттерн Web Audio clock).

---

## Задачи

### Task 1: Скелет переключателя тем
`index.html`: кнопка-«палитра» в хедере (`.icon-btn#theme-toggle`), `html data-theme="archive"` по умолчанию. `ui.js`: клик → переключение `data-theme`, `localStorage['arch_theme']`, init из storage до первой отрисовки (inline-скрипт в `<head>` чтобы не мигало), обновление `meta[name=theme-color]`, диспатч `CustomEvent('themechange',{detail:{theme}})`.
**Verify:** клик переключает атрибут, переживает reload без вспышки старой темы.
**Commit:** `feat(theme): theme switcher skeleton with persisted data-theme`

### Task 2: Токены и плоть SIGNAL DECK в CSS
`style.css`: блок `[data-theme="deck"]{--ink:#080B14; --surface:#0F1526; --plate:#0D1220; --bone:#E8ECF8; --muted:#7A84A8; --ember:#7C5CFF; --ember-2:#FFB454; --ice:#9BE8FF; --line:…}` — вся существующая система перекрашивается автоматически. Новые компоненты: `.ticker` (marquee через CSS animation translateX -50%, дубль контента), `.hud-corners::before/after` + 2 span (bracket-уголки), `.scanlines` overlay (opacity .03, только deck), `.station-panel` (часы/FPS/курсор), `.module-card` апгрейды plate (LED-dot, progress-bar). Archive-тема их скрывает (`.ticker,.scanlines,.station-panel{display:none}` вне deck).
**Verify:** переключение мгновенно перекрашивает весь сайт, ticker бежит только в deck.
**Commit:** `feat(theme): signal-deck token set + hud density components`

### Task 3: Разметка плотности + глава TRANSMISSION
`index.html`: ticker после хедера, station-panel в хедере (спаны #clock/#fps/#cursorpos), HUD-bracket спаны на секции works/flagship, новая секция `#transmission data-chapter="deck-transmission"`: слева DOM-консоль плеера (обложка-canvas 96px, title/track, transport-кнопки, volume-slider, VU-бары DOM 12шт), справа пустой якорь под 3D (плеер рендерится в общей сцене, секция задаёт камера-ключ). Рейка/навигация/футер: + пункт `04`.
**Verify:** разметка видима в обеих темах, консоль плеера стилизована.
**Commit:** `feat(ui): transmission chapter markup + station density elements`

### Task 4: Генеративный аудио-движок
Create `assets/js/audio-engine.js` (ES module, экспорт singleton `window.__deckAudio = {play,pause,next,setVolume,getAnalyser,trackInfo,onstate}`): scheduler lookahead, 3 конфига треков, masterGain→analyser→compressor→destination. Автопауза при `document.hidden`. Состояние → CustomEvent('deckaudostate').
**Verify:** в консоли `__deckAudio.play()` → слышен генеративный луп, next меняет характер.
**Commit:** `feat(audio): generative 3-track synth engine with analyser tap`

### Task 5: Плеер в 3D-сцене
`three-scene.js`: группа `playerGroup` (винил-кольца, ламель, тон-рука, InstancedMesh 64 бара кругом r≈3.4, pointLight). Видимость по главе (opacity fade при входе в `deck-transmission`, камера-ключ `{pos:[0,.6,7],look:[0,0,0]}`). Каждый кадр: если analyser есть → frequencyData → высоты баров (lerp .25), rotation диска += playing? .006 : ease-to-stop; тон-рука rotZ target. Drag по канвасу в зоне плеера → вращение playerGroup.rotation.y с инерцией (pointerdown/move/up, только desktop).
**Verify:** скролл к главе — плеер проявляется, диск крутится после play(), бары пляшут, drag вращает.
**Commit:** `feat(scene): 3d vinyl player with reactive spectrum ring`

### Task 6: Связка управления + палитры сцен по темам
`ui.js`: кнопки консоли → __deckAudio, play-state синхронно крутит диск (event), volume-slider persist, VU DOM-бары из analyser (те же данные, throttle rAF). `three-scene.js`: THEME_SCENES = {archive:{fog:0x0B0B0C, key:0xF4F1EB, glow:0xFF4D00, body:0x151517}, deck:{fog:0x080B14, key:0x9BE8FF, glow:0x7C5CFF, body:0x11162A}} — на 'themechange' лерп всех цветов за ~800ms (fog.color.lerp, light.color.lerp, material.color.lerp).
**Verify:** переключение темы прямо во время скролла — мир плавно перецветает, звук не рвётся.
**Commit:** `feat(scene): theme-reactive scene palettes + player controls wiring`

### Task 7: Мобильный + QA + деплой
Мобайл: плеер-консоль в колонку, drag off, бары 32, DPR≤1.5, ticker медленнее. QA: node --check всех js; скриншоты headless обеих тем ×{hero, transmission}; оверфло-диагностика 390px; переключение тем 20× без утечек (heap ±10MB); reduced-motion: диск стоит, бары статичны, звук работает по кнопке. Push → Pages → проверка живого сайта обеих тем.
**Commit:** `chore: mobile polish + release signal-deck v2`

---

## Risks
| Риск | Митигация |
|---|---|
| Автоплей-политика браузера | Звук стартует ТОЛЬКО по клику пользователя |
| Генеративный звук надоедает | Громкость по умолчанию умеренная, пауза одной кнопкой, состояние видно |
| Лерп материалов дорогой | Однократно 800ms по событию, не каждый кадр |
| Конфликт физики осколков и плеера | Плеер — отдельная группа без пружин, только своя ротация |
| Tailwind CDN снова выкинуть из head | НЕ трогать script cdn.tailwindcss.com |

## Open questions (дефолты выбраны)
1. Дефолтная тема остаётся ARCHIVE (переключатель manual) — или сделать deck дефолтом?
2. Треки можно потом заменить на реальные mp3-файлы — движок оставляет точку расширения (url-режим).
