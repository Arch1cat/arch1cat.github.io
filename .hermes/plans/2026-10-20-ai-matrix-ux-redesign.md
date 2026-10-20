# AI Provider Matrix — UX Redesign Plan

## Goal
Переделать страницу так, чтобы она была удобной как каталог и как рабочий инструмент выбора AI:
- одна общая таблица всех AI и всех провайдеров;
- явные фильтры по провайдеру, задаче, статусу, типу (free / preview / paid);
- поиск по exact ID;
- понятные колонки: Provider · Model · Exact ID · Status · Limits · Task · Benchmark · Copy;
- мобильная версия с карточками;
- без вертикальной каши и скрытых блоков.

## Architecture options
1. Оставить текущую структуру и просто улучшить фильтры — быстро, но каталог останется распределённым по 3 местам.
2. Переписать как единый data-driven UI с двумя главными представлениями: «Provider → Models» и «Model → Providers», плюс отдельный полный каталог exact ID. Лучший UX, больше работы.
3. Полностью переписать на компонентный подход с tabs. Слишком тяжело для static GitHub Pages.

Выбираю вариант 2: единый data-driven UI с тремя вкладками.

## Tabs
- **Overview** — сводка по провайдерам (таблица + карточки).
- **All Models** — единая таблица всех AI и провайдеров. Ключевая вкладка.
- **Exact IDs** — полный каталог exact ID по провайдерам с копированием.
- **Budget / Verified** — бюджеты и тесты.

## Data model
Каждая запись — один ID/модель:
```
{
  provider: 'OpenRouter',
  model: 'DeepSeek V4.1 Flash',
  id: 'openrouter/deepseek/deepseek-v4.1-flash:free',
  status: 'working' | 'catalog' | 'paid' | 'blocked' | 'inconclusive',
  kind: 'free' | 'preview' | 'paid',
  tasks: ['Кодинг', ...],
  benchmark: 'WebDev 1664 · open №1',
  limits: '20 RPM / 50 RPD',
  note: '...'
}
```

## Filters
- Provider: All / конкретный провайдер.
- Kind: All / Free / Preview / Paid.
- Status: All / Working / Catalog / Blocked.
- Task: All / Кодинг / Reasoning / UI / Vision / Fast Agent / Stealth / Long Context.
- Search: model, provider, exact ID, task, benchmark.

## Mobile
- Таблица заменяется на карточки.
- Фильтры остаются горизонтальными scrollable pills.
- Copy button всегда виден.

## Implementation steps
1. Собрать полный плоский массив `entries` из существующих providers.
2. Переписать HTML с вкладками и единым фильтром.
3. Переписать JS: единый state, единый рендер.
4. Проверить локально, закоммитить, запушить.
5. Проверить live.

## Acceptance
- Все free/preview/paid AI видны в одной таблице.
- Фильтры работают без перезагрузки.
- Exact ID можно скопировать в один клик.
- Мобильная версия не ломается.
- Live URL возвращает 200.
