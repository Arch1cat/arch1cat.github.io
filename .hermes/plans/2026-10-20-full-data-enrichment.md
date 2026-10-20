# AI Provider Matrix — Full Data Enrichment Plan

## Goal
Пользователь справедливо указал: не все бесплатные AI включены, отсутствуют важные поля (context window, max output, reasoning tokens, лимиты по токенам). Нужно:
1. Собрать ПОЛНЫЕ списки бесплатных/preview моделей у Nous, OpenRouter и других провайдеров (через live API, а не ручные подборки).
2. Добавить в каждую запись поля: context window (вход), max output, reasoning tokens, RPM/RPD/TPD, статус доступа.
3. Показать эти поля в таблице и карточках.
4. Сделать фильтр по context window и по типу задач.

## Data sources
- Nous: `https://portal.nousresearch.com/api/...` или через Hermes config; также `hermes models list`.
- OpenRouter: `https://openrouter.ai/api/v1/models` (уже использовали) — содержит context_length, pricing.
- OpenCode: docs + `opencode models list`.
- NVIDIA NIM: `https://build.nvidia.com/models`.
- CommandCode: `https://commandcode.ai/models`.
- OrcaRouter: docs.
- Freebuff: Hermes config.
- BeatAPI: docs.

## Schema enrichment
Каждая entry получает:
```
{
  provider, id, status, kind,
  ctx: 200000,        // входной контекст
  out: 32000,         // max output
  reasoning: true,    // поддержка reasoning tokens
  rpm: 20,            // requests per minute
  rpd: 50,            // requests per day
  tpd: null,          // tokens per day (если известно)
  notes: '...'
}
```

## UI changes
- Таблица: добавить колонки ctx / out / reasoning.
- Карточки: показать ctx/out/reasoning.
- Фильтры: добавить "Context window" (≥32K / ≥128K / ≥200K) и "Reasoning" (да/нет).
- Provider overview: добавить колонку "Max ctx" и "Reasoning support".

## Implementation
1. Собрать live данные (через terminal/web_extract).
2. Обновить providers и modelFamilies с новыми полями.
3. Обновить renderModels/renderCards/renderOverview.
4. Проверить локально, закоммитить, запушить.
5. Проверить live.

## Acceptance
- Все бесплатные модели у Nous и OpenRouter присутствуют.
- Каждая запись имеет ctx/out/reasoning/rpm/rpd.
- Фильтры по ctx и reasoning работают.
- Live URL 200.
