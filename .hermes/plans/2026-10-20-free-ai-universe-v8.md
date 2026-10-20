# Free AI Universe — Deep Rebuild Plan (v8)

## Запрос пользователя
Сделать **рейтинг бесплатных AI-провайдеров** на сайте arch1cat.github.io:
- основной фокус — БЕСПЛАТНЫЕ AI (не платные в общей куче)
- все доступные нам AI из подключённых сервисов (по API и через авторизацию)
- OmniRoute даёт много AI без подключений (no-auth/free-пул) — включить
- **Antigravity в Hermes и в OmniRoute НЕ ТРОГАТЬ** (пользователь явно указал 3 раза)
- рейтинг + графики/метрики + визуализация бенчмарков
- удобные фильтры, чтобы сразу глянуть все доступные бесплатные
- платные тарифы — отдельным блоком (цены + что входит + млн токенов)
- обновлять инфу раз в день
- «можешь всё удалить и сделать круто» — разрешён полный редизайн

## Что собрано (факты, не догадки)

### OmniRoute (localhost:20128) — 1292 модели, 17 префиксов
| Префикс | Кол-во | Статус (живая проба 20 Oct 2026) |
|---|---|---|
| `openrouter/*` | 737 | работает (наш ключ активен) |
| `aihorde/*` | 165 | image-gen only (400 на chat) |
| `dva/*` | 110 | есть, но `dva/` известен проблемой префикса |
| `no-think/*` | 63 | обёртки над agy/dva (agy не трогаем) |
| `auto/*` | 45 | **200 OK** — best-free, coding:free, cheap, offline |
| `cxa/*` | 45 | 503 — нет транспорта Codex app-server |
| `aug/*` | 28 | 502 — нет CLI auggie |
| `agy/*` | 25 | активен, **НЕ ТРОГАЕМ** |
| `cfp/*` | 20 | 502 — нет Playwright browser |
| `antigravity/*` | 19 | активен, **НЕ ТРОГАЕМ** |
| `zc/*` | 14 | 502 — spawn zcode ENOENT |
| `oc/*` | 10 | 401/402/403 — OpenCode free только из OpenCode |
| `ddgw/*` | 6 | **200 OK ВСЕ 6** — DuckDuckGo Cloudflare, без подключения! |
| `veoaifree-web/*` | 2 | video gen |
| `veo-free/*` | 2 | video gen |
| `unc/*` | 1 | 404 |

**Ключевая находка: `ddgw/*` (6 моделей) работает бесплатно без подключения вообще.**
- ddgw/gpt-5.4-mini, ddgw/gpt-5.6-luna, ddgw/claude-haiku-4-5, ddgw/mistral-small-2603, ddgw/tinfoil/gpt-oss-120b, ddgw/tinfoil/gemma4-31b

**Второй ключ: `auto/best-free` и `auto/coding:free` — 200 OK.** Это авто-роутер по free-пулу.

### Наши прямые Hermes-провайдеры (в config.yaml)
- OpenRouter: 20 free моделей (live-каталог, все в пикере после фикса)
- Nous: 7 free (longcat-2.5, laguna-s-2.1, laguna-xs-2.1, beam, step-3.7-flash, solar-mini4, longcat-2.0=мёртвая)
- NVIDIA NIM: 5 моделей
- Freebuff: 18
- BeatAPI: 12
- OpenCode Free (zenfree): 8, локальный прокси 8789 сейчас **не запущен**
- OrcaRouter: 0 (429 account gate)
- Google AI Studio: ключ есть, 429 quota
- Groq/Cerebras/Mistral: прописаны, но **ключей нет** — нужен API key
- GITHUB_TOKEN есть → GitHub Models потенциально доступен (не проверен)

### Тарифы (из официальных доков, 20 Oct 2026)
**OpenCode Go**: Go $10/мес, Go Plus $40/мес. Лимиты = месячные $ на модель; 5ч = 20%, неделя = 50%, месяц = 100%. Цены за 1M токенов: DeepSeek V4.1 Flash off-peak $0.15/$0.60, peak $0.30/$1.20; Kimi K3 $3.00/$15.00; GLM-5.3 $1.40/$4.40; GLM-5.3-Flash $0.15/$0.50; Qwen3.8 Max $2.00/$6.00; MiMo-V2.5-Pro $0.435/$0.87; MiniMax M3 $0.30/$1.20; Claude Haiku 5.5 $0.10/$0.50; Grok 4.7 $2.00/$6.00.
**Claude**: Pro $20, Max 5x $100, Max 20x $200 (5-часовые окна + недельные капы).
**Google AI**: Pro $19.99 (4x free), Ultra $99.99 (5x Pro), Ultra $199.99 (20x Pro). AI Plus ≈$5.5 (2x free). Antigravity: Free $0, Pro $20, Ultra $99/$199. Claude 4.6 на Free/Plus до 2 ноября.
**ChatGPT**: Plus $20, Pro $200 (новые регистрации приостановлены с 10 сентября).
**OpenRouter**: $10 top-up → 1000 RPD free-моделей (было 50). Комиссия 5.5%.

### Free-tier лимиты (сверено по 3 источникам)
OpenRouter 20 RPM/50 RPD · Groq 30 RPM/1000 RPD · Cerebras 30 RPM/~1M tok/день · Mistral ~1B ток/мес (Experiment) · Google AI Studio 5-15 RPM/20-1500 RPD · NVIDIA NIM ~40 RPM без дневного капа · Cloudflare Workers AI 10K нейронов/день · GitHub Models 15 RPM/150-1000 RPD · Cohere ~100 RPD · SambaNova 20 RPM/20 RPD · OVH 2 RPM/IP · Requesty 200 RPD · Routeway 200 RPD.

### Новинки октября 2026 (61 модель)
MiniMax M3.1 Flash (19.10, 1M) · DeepSeek V4.1 Flash 1017 (17.10, 1M, 552B) · Claude Haiku 5.5 (7.10, 1M) · Mistral Large 4 (6.10, 1M) · Beam 501B open (5.10, 1M, Apache 2.0) · Muse Spark Open Meta (15.10, 816B/42B active, 1M) · Nemotron 3.5 Super VL (15.10, 1M) · Nemotron 3.5 Bolt 74B-A9B · Kolibri 1 Aleph Alpha (78B/3.46B, 1M) · Mercury 3 Inception Labs (1M) · Clairic Cloudflare (64K) · Kisoku 1.6B (Apache 2.0, 150 w/s на M5 Max) · Tess-4.5-27B Continuity Research (Apache 2.0, 128/150 на BenchLocal) · LFM2.5-24B-A2B · Jais 3 (0.9B-375B) · d1-omni Liquid AI · Mellum2.1 JetBrains · pplx-decider-v1.2 Perplexity · Vercel AI Gateway.

## Архитектура страницы (v8)

### Структура — ОДИН главный экран, вкладки минимальны
1. **Hero** — счётчики: N free-моделей, M провайдеров, R рабочих маршрутов, дата снапшота
2. **Табы (4)**: `Free AI` (главная) · `Рейтинг` · `Тарифы` · `Новинки`
3. **Free AI** — единая таблица ВСЕХ free-моделей со всеми фильтрами + графики
4. **Рейтинг** — сводная таблица провайдеров с computed score + bar-chart визуализация
5. **Тарифы** — платные планы с ценами, лимитами, млн токенов
6. **Новинки** — релиз-трекер октября 2026

### Главная таблица (одна строка = один exact route)
Колонки: `Провайдер` (цветной pill) · `Модель` · `Exact ID` (копируется) · `Статус` (WORKING/CATALOG/BLOCKED/PAID) · `Тип` (Free/Preview/Stealth/NoAuth) · `ctx` · `out` · `R` · `SWE` · `HE` · `Aider` · `Limit` · `Источник` (API / OAuth / NoAuth)
- Сортировка: rank / ctx / SWE / провайдер / статус / тип
- Фильтры: search, provider, type, status, task, ctx, reasoning, source, benchmark — ВСЕ в dropdown-строке
- Column toggles с localStorage (14 колонок)
- Мобильные карточки

### Графики и метрики (инлайн SVG/Canvas, без внешних библиотек — GitHub Pages offline-safe)
1. **Bar chart: free-модели по провайдерам** (working/blocked разными цветами)
2. **Scatter: ctx × SWE-bench** (размер точки = out-токены) — визуальный выбор моделей
3. **Radar: топ-5 моделей** (SWE / HE / Aider / ctx / reasoning)
4. **Stacked bar: тип лимитов** (RPM / RPD / токены)
5. **Метрики-карточки**: всего free-моделей, рабочих, провайдеров, avg SWE, max ctx, покрытие задач

### Рейтинг провайдеров (computed score)
```
score = 40*working_ratio + 20*model_count_norm + 15*ctx_cap + 10*bench_avg + 10*limit_score + 5*access_ease
```
- working_ratio: доля WORKING-маршрутов
- model_count_norm: log-нормализация количества free-моделей
- ctx_cap: нормированный max ctx
- bench_avg: средний SWE по семействам провайдера
- limit_score: RPM/RPD/токены
- access_ease: no-auth = 1.0, api key = 0.8, oauth = 0.6, blocked = 0
- Рейтинг показывается и числом, и bar-визуализацией, и breakdown-столбиками

### Данные
- `data/free-ai.js` — внешний JS с массивом (данные отделены от разметки,便于 daily update)
- Daily update: cron-задача Hermes, которая тянет live-каталоги (OpenRouter /v1/models, Nous /v1/models, OmniRoute /v1/models) и перегенерирует `data/free-ai.js` + `data/rating.json`
- Снапшот в репо: `data/snapshot-<date>.json` для истории диффов

## Реализация
1. `data/free-ai.js` — все модели, провайдеры, бенчмарки, тарифы, новинки
2. `data/rating.js` — рейтинг-провайдеры (вычисляется в JS из данных)
3. `ai-matrix.html` — новая главная страница (старую `ai-providers.html` — удалить/заменить)
4. SVG-графики инлайн, без CDN
5. Линтер: `node --check` по вытащенному JS
6. Локальный QA: headless Edge скриншоты desktop+mobile, DOM-проверка
7. Git commit + push → live verify
8. Cron: ежедневная задача обновления

## Риски
- OmniRoute может быть не запущен → данные из его `/v1/models` кешируются в снапшот
- Бесплатные пулы ротируются → показывать дату снапшота везде
- `ddgw/*` может отвалиться (Cloudflare) → статус из живой пробы
- Не трогать agy/antigravity — только читать их каталог

## Acceptance
- Одна главная таблица со ВСЕМИ free-моделями (включая no-auth ddgw/auto)
- Фильтры: provider/type/status/task/ctx/reasoning/source/benchmark работают
- Рейтинг провайдеров с визуализацией
- Тарифы с ценами и лимитами в токенах
- ≥4 графика на странице
- Column toggles работают, выбор сохраняется
- Мобильная версия не ломается
- Live URL 200
- Antigravity/agy не изменены
