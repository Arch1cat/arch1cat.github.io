# ArchiCat AI Provider Matrix Page Plan

> **For Hermes:** Use this plan to implement and verify the page in `D:/hermes/projects/site_arch1cat`. Do not touch Antigravity settings or any Hermes provider configuration.

**Goal:** Add a dedicated, readable AI-provider comparison page to the ArchiCat GitHub Pages portfolio, focused on the free/preview/stealth catalogues of Nous, OpenRouter, OpenCode, NVIDIA, CommandCode, OrcaRouter, Freebuff, and BeatAPI, with clear limits, status, task recommendations, and a budget section.

**Architecture:** Keep the existing zero-build static GitHub Pages site. Add one self-contained `ai-providers.html` page with the existing cyber-green visual language, compact responsive tables, provider filters, and no external app/backend dependency beyond already-used CDN assets. Add a visible navigation/card link from `index.html`; keep the data in a structured JavaScript array so filters and sorting are real interactions instead of inert pills.

**Tech Stack:** Static HTML, Tailwind CDN already used by the site, vanilla JavaScript, Font Awesome already used by the site. No npm dependency, no build pipeline, no credentials, no API calls from the browser.

---

## Scope and content contract

### Priority provider coverage

The page must cover each as a first-class provider section/card and table:

1. Nous — full current configured/free/preview inventory, with an explicit note when live account discovery is broader than local curated config.
2. OpenRouter — all current zero-price models captured in the research snapshot, not only Laguna/Nemotron.
3. OpenCode Free — all current free/native IDs.
4. OpenCode Go — clearly marked paid, with its 5-hour/weekly/monthly usage budgets and model groups.
5. NVIDIA NIM — free endpoint model families and exact tested Lightning ID.
6. CommandCode — free/preview/stealth aliases plus account credits gate.
7. OrcaRouter — full public free package plus account/GitHub eligibility gate.
8. Freebuff — all current configured models including Space Bunny/Ox Alpha.
9. BeatAPI — all configured free aliases and RPM caveat.

### Page sections

- Header: `ARCH1CAT // AI PROVIDER MATRIX`, timestamp/research snapshot, back-to-portfolio link.
- Hero summary: one sentence explaining “free catalogue ≠ account access”, with status legend.
- Provider overview table: provider, free model count, strongest routes, limits, current status, practical verdict.
- Interactive model matrix: one row per important model family, provider availability cells, exact model IDs in expandable/details content, task tags, benchmark evidence.
- Provider detail tables: one compact table per priority provider with all exact free/preview/stealth IDs from the report. Long model lists must be inside `<details>` to prevent a vertical wall of text.
- Task selector: Coding Agent, Large Refactor, UI/Vision, Reasoning, Fast Patch, Stealth/Experimental; filtering must update visible model rows.
- Budget table: `$0`, `$10`, `$20`, `$30` options, OpenCode Go/Go Plus and other researched plans, with “paid/not free” labels.
- Tested status table: exact probes and error interpretation (`PROBE_OK`, native-only 403, account 402/429, timeout=inconclusive).
- Final recommendation panel: primary free route, API fallback, native OpenCode route, NVIDIA fallback, stealth route, and `$10–30` option.
- Footer: GitHub source link and back-to-portfolio link.

### Data and wording rules

- Use exact copyable IDs; never call catalog presence proof of access.
- Every model/provider cell has one status: `WORKING`, `CATALOG`, `NATIVE ONLY`, `ACCOUNT BLOCKED`, `CREDITS REQUIRED`, or `INCONCLUSIVE`.
- Distinguish `ctx`, `out`, `RPM`, `RPD`, `TPM`, `TPD`, Freebucks, credits, and subscription usage budgets.
- Do not describe the literal modality value `text`; use readable Russian labels or omit it.
- Use Russian UI copy because the user requested the report in Russian; preserve provider/model IDs in monospace.
- No invented benchmark results. Use `нет публичного score` for stealth routes.
- Do not expose API keys or account secrets.
- Do not touch Antigravity.

---

## Structural options and decision

### Option A — Embed the matrix into `index.html`

Pros: one URL, no navigation changes.
Cons: makes the portfolio page extremely long and repeats the readability problem the user complained about.

### Option B — Separate `ai-providers.html` page (selected)

Pros: dedicated readable report, independent scrolling, easy GitHub Pages route, minimal risk to existing portfolio.
Cons: one new static page and one navigation/card link.

### Option C — Client-rendered data from live provider APIs

Pros: always current.
Cons: CORS/auth/rate-limit/security problems, unreliable GitHub Pages, and would expose provider access assumptions.

**Decision:** Option B with a static researched snapshot and local filters. Add a “snapshot date” so stale data is visible instead of pretending live accuracy.

---

## Implementation tasks

### Task 1: Capture the existing repo baseline

Files:
- Read: `index.html`
- Check: `git -c safe.directory=... status`, branch, remote.

Verify the working tree is clean before edits. Do not overwrite any user changes.

### Task 2: Create the implementation plan in the site repo

Create:
- `.hermes/plans/YYYY-MM-DD-HHMM-ai-provider-matrix-page.md`

This file is the durable design record for the static page.

### Task 3: Create the page shell

Create:
- `ai-providers.html`

Implement:

- document metadata/title;
- existing Tailwind CDN and Font Awesome setup;
- cyber-green/cyan theme matching the portfolio;
- responsive container with `max-w-7xl` and horizontal table overflow;
- fixed/sticky compact header with clear back link;
- accessible table captions and `scope` headers;
- no emoji as UI icons; use Font Awesome or inline SVG.

### Task 4: Add structured provider/model data

Inside `ai-providers.html`, define a `providers` array and `models` array with:

- provider slug/name;
- exact IDs;
- access status;
- access class;
- limit summary;
- context/output;
- task tags;
- benchmark/evidence label;
- short verdict.

Include the complete current catalog snapshot from the research, grouped per provider. Do not collapse a provider to one model.

### Task 5: Build the provider overview table

Render the provider overview from data, not duplicated static markup.

Columns:

```text
Провайдер | Free AI | Лучшие маршруты | Лимиты | Наш доступ | Вердикт
```

Use status badges with text and color, not color alone.

### Task 6: Build the model matrix and provider detail tables

Implement:

- a cross-provider matrix with rows by model family;
- compact provider cells with `✅/⚠️/❌` status text and a “copy ID” action;
- provider detail `<details>` tables for full exact IDs;
- task tags and benchmark labels;
- no table cell should contain an unbounded giant paragraph; use `line-clamp`/details and horizontal scrolling.

### Task 7: Add real client-side filters

Implement vanilla JS state:

- provider multi-filter;
- task filter;
- access filter (`free`, `preview`, `stealth`, `paid`);
- search by model/provider/exact ID;
- sort by practical rank and access status;
- clear filters button;
- visible result counter.

No inert pills. Update the rows immediately without page reload.

### Task 8: Add budget and task recommendation panels

Render:

- `$0`: Freebuff/OpenRouter/NVIDIA/native OpenCode Free;
- `$10`: OpenCode Go and OpenRouter credit reference;
- `$20`: researched plan candidates;
- `$30`: researched plan candidates;

Mark paid plans explicitly and include limits/overage caveats. Include a small “what I would use” card with exact IDs.

### Task 9: Link the page from the portfolio

Modify:
- `index.html`

Add one visible, responsive project/navigation entry:

```text
AI Provider Matrix
Free models · limits · benchmarks
```

Link to `ai-providers.html` with `target="_blank"` only if it matches the existing portfolio interaction pattern; otherwise same-tab navigation is preferred for a first-party page. Keep the existing cards and WebGL code untouched.

### Task 10: Static validation

Run:

```bash
python - <<'PY'
from html.parser import HTMLParser
for path in ['index.html', 'ai-providers.html']:
    class P(HTMLParser): pass
    P().feed(open(path, encoding='utf-8').read())
    print(path, 'HTML_PARSE_OK')
PY
```

Also run a JavaScript syntax check by extracting inline scripts to scratch files and using the available Node runtime (`node --check`). Verify no duplicate IDs and no broken relative links with a small script.

### Task 11: Browser QA

Serve the static repo with a local HTTP server and verify in a real browser:

- page loads without console errors;
- provider table visible above the fold;
- desktop table is readable and horizontally scrollable only where needed;
- mobile cards/details do not create page-wide horizontal overflow;
- search/provider/task/access filters update results;
- copy-ID button copies exact IDs and shows a temporary confirmation;
- OpenCode Go is visibly separated from free plans;
- “Antigravity” is absent from the page;
- links back to the portfolio and source open correctly.

### Task 12: Git verification and delivery

Run:

```bash
git -c safe.directory='D:/hermes/projects/site_arch1cat' diff --check
git -c safe.directory='D:/hermes/projects/site_arch1cat' status --short
git -c safe.directory='D:/hermes/projects/site_arch1cat' diff --stat
```

Do not commit/push unless the user explicitly asks after reviewing the page. If the user asks to publish, read the GitHub workflow reference, commit only the page/link changes, push `main`, and verify the GitHub Pages URL with a fresh HTTP/browser check.

---

## Acceptance criteria

- A user can open one dedicated page and see the provider overview without reading prose.
- Nous visibly has all discovered free/preview routes, not just one or three examples.
- OpenRouter, OpenCode, NVIDIA, CommandCode, and OrcaRouter each have full free/preview/stealth tables.
- Free vs paid OpenCode Go is impossible to confuse.
- Exact model IDs are visible/copyable.
- Limits are presented in the correct unit and unknown values remain unknown.
- Task filters and provider filters actually change rows.
- The page is readable on desktop and mobile and does not hide key content under giant vertical text blocks.
- Existing portfolio and WebGL content remains intact.
- Antigravity is not touched or mentioned in implementation/configuration.
- Fresh HTML/JS/browser checks pass before claiming completion.
