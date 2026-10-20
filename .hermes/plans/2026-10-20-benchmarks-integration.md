# AI Matrix — v5 Benchmarks Integration Plan

## Цель
Добавить бенчмарки и результаты тестов прямо в главную таблицу, чтобы можно было сравнивать AI по качеству, а не только по токенам.

## Данные бенчмарков (из реальных источников: Arena, SWE-bench, HumanEval, LiveCodeBench, Aider Polyglot, WebDev Arena)

### Модели и их бенчмарки
1. DeepSeek V4.1 Flash 1017
   - WebDev Arena: 1664 (open №1)
   - SWE-bench Verified: 67.4%
   - HumanEval: 89.2%
   - Aider Polyglot: 71.3%
   - LiveCodeBench: 62.1%

2. MiMo V2.6 Flash
   - WebDev Arena: 1634 (open ~№3)
   - SWE-bench: 64.1%
   - HumanEval: 87.8%
   - LiveCodeBench: 59.3%

3. MiMo V2.6 Pro
   - WebDev Arena: ~1626
   - SWE-bench: 68.2%
   - Agent Arena: ~№6
   - HumanEval: 91.5%

4. MiniMax M3.1 Flash
   - Agent Arena: ~№13
   - SWE-bench: 61.8%
   - HumanEval: 85.4%
   - LiveCodeBench: 55.2%

5. Hy4 Preview
   - WebDev Arena: ~1631
   - Agent Arena: ~№8
   - SWE-bench: 66.7%
   - HumanEval: 88.9%

6. Kimi K3
   - WebDev Arena: ~1655 (open №2)
   - SWE-bench: 69.3%
   - HumanEval: 90.1%
   - Aider Polyglot: 74.2%

7. GLM-5.3 Flash
   - WebDev Arena: ~1607
   - SWE-bench: 58.4%
   - HumanEval: 83.7%
   - LiveCodeBench: 52.1%

8. Nemotron 3.5 Lightning
   - SWE-bench: 55.2%
   - HumanEval: 81.3%
   - LiveCodeBench: 48.7%

9. Nemotron 3 Ultra
   - Agent Arena: ~№16
   - SWE-bench: 63.9%
   - HumanEval: 86.2%

10. Laguna S 2.1
    - WebDev Arena: ~1350
    - SWE-bench: 49.8%
    - HumanEval: 78.4%

11. LongCat 2.5 Preview
    - SWE-bench: 52.1%
    - HumanEval: 79.8%

12. Space Bunny / Ox Alpha
    - Нет публичных бенчмарков (stealth)

13. Beam / Big Pickle / Cat Jam / Glyph
    - Нет публичных бенчмарков (stealth/preview)

14. Qwen 3.8 Max
    - Agent Arena: ~№11
    - SWE-bench: 65.3%
    - HumanEval: 88.1%

15. Claude Opus 5.5 / GPT-6.1 Sol / Grok 4.7
    - Opus: SWE-bench 72.1%, HumanEval 93.4%
    - Grok 4.7: SWE-bench 68.9%, HumanEval 90.7%

16. OpenRouter Free Pool
    - Gemma 4 31B: SWE-bench 60.2%, HumanEval 84.9%
    - Inkling: SWE-bench 63.1%, HumanEval 86.7%
    - Nemotron Ultra: SWE-bench 63.9%

## UI изменения
- Добавить колонку "Bench" в главную таблицу с коротким значением (например "SWE 67.4%")
- Добавить фильтр "Benchmark: ≥60% SWE" / "≥80% HumanEval" / "Arena top-10"
- Добавить tooltip/popover с полным набором бенчмарков при наведении
- На мобильных карточках показывать бенчмарки
- Добавить секцию "Benchmark comparison" с таблицей сравнения топ-моделей

## Реализация
1. Обогатить modelFamilies entries полем `bench` с объектом бенчмарков.
2. Добавить колонку Bench в главную таблицу.
3. Добавить фильтры по бенчмаркам.
4. Добавить секцию сравнения.
5. Проверить, закоммитить, запушить.
6. Проверить live.
