# AI Matrix — v4 Free-First Redesign Plan

## Проблема пользователя
Платные модели (OpenCode Go, paid) смешаны с бесплатными в одной таблице — это шум. Основное — бесплатные AI. Платные должны быть отдельным блоком с тарифами и лимитами, но не в главной таблице.

## Цель
Главная таблица = ТОЛЬКО бесплатные + preview AI. Платные — отдельная секция "Paid plans" с тарифами, лимитами, ценами.

## Архитектура
1. **Главная таблица (Free + Preview)** — только бесплатные и preview модели. Это основной каталог.
2. **Секция "Paid plans"** — отдельный блок с тарифами: OpenCode Go $10, OpenCode Go Plus $40, CommandCode credits, OrcaRouter paid, и т.д. С лимитами 5h/week/month, ценами, что получаешь.
3. **Секция "Blocked / needs account"** — отдельный блок с провайдерами, которые заблокированы (OrcaRouter, CommandCode, Google AI Studio) и что нужно для разблокировки.
4. **Секция "New candidates"** — Groq, Cerebras, Mistral — что нужно для подключения.

## Фильтры главной таблицы
- Search, Provider, Task, ctx, Reasoning, Status (working/catalog/blocked)
- Kind фильтр УБРАТЬ — все бесплатные/preview, нет paid
- Добавить фильтр "Тип бесплатного": Free / Preview / Stealth

## Главная таблица колонки
# · AI/сила · Задачи · Benchmark · ctx · out · R · Provider · Exact ID · Status · Limit

## Paid plans секция
Таблица: План · Цена · Что получаешь · Лимиты · Вердикт

## Реализация
1. Переписать HTML: главная таблица только free/preview.
2. Добавить секцию Paid plans.
3. Добавить секцию Blocked/needs account.
4. Добавить секцию New candidates.
5. Проверить, закоммитить, запушить.
6. Проверить live.
