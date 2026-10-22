"""Generate data/free-ai.js — the full curated dataset for the AI Matrix page.

Combines:
  - live free catalogues (OpenRouter / Nous / OmniRoute no-auth)
  - our direct Hermes providers (NVIDIA, Freebuff, BeatAPI, OpenCode Free)
  - benchmark metrics per model family
  - paid plan tiers with token allowances
  - October 2026 release tracker
  - computed provider ranking
"""
import io, json, os, datetime

SITE = r"D:/hermes/projects/site_arch1cat"
OUT = os.path.join(SITE, "data")
raw = json.load(io.open(os.path.join(OUT, "_raw_snapshot.json"), encoding="utf-8"))

SNAP = raw["snapshot"]
OR_LIVE = {m["id"]: m for m in raw["openrouter"]}
NOUS_LIVE = {m["id"]: m for m in raw["nous"]}
OMNI = raw["omniroute"]

# ------------------------------------------------------------------ providers
# access: api | oauth | noauth | local | blocked
# limits: rpm / rpd / tokens-per-day
PROVIDERS = [
    {
        "id": "OpenRouter", "access": "api", "status": "working", "color": "#00f2fe",
        "limits": "20 RPM / 50 RPD (1000 RPD с $10 top-up)", "rpm": 20, "rpd": 50, "tpd": None,
        "card": False, "training": "no", "ctxCap": 1048576,
        "note": f"{len(OR_LIVE)} zero-price моделей прямо сейчас. Единственный ключ на десятки семейств.",
        "uptime": "99.5%",
    },
    {
        "id": "Nous Portal", "access": "api", "status": "working", "color": "#a78bfa",
        "limits": "RPM/TPM/RPD не раскрыты", "rpm": None, "rpd": None, "tpd": None,
        "card": False, "training": "no", "ctxCap": 1048576,
        "note": "8 :free моделей (включая Ornith 1.5 122B). Часть требует тег user= в extra_body.tags.",
        "uptime": "97%",
    },
    {
        "id": "OmniRoute / ddgw", "access": "noauth", "status": "working", "color": "#00ff66",
        "limits": "нет явных лимитов; Cloudflare-кеш", "rpm": None, "rpd": None, "tpd": None,
        "card": False, "training": "no", "ctxCap": 262144,
        "note": "DuckDuckGo Cloudflare — 6 моделей БЕЗ подключения и без ключа.",
        "uptime": "95%",
    },
    {
        "id": "OmniRoute / auto", "access": "noauth", "status": "working", "color": "#22c55e",
        "limits": "маршрутизация по free-пулу", "rpm": None, "rpd": None, "tpd": None,
        "card": False, "training": "varies", "ctxCap": 1048576,
        "note": "auto/best-free и auto/coding:free — авто-роутер по бесплатным маршрутам.",
        "uptime": "94%",
    },
    {
        "id": "NVIDIA NIM", "access": "api", "status": "working", "color": "#76b900",
        "limits": "~40 RPM, без дневного капа", "rpm": 40, "rpd": None, "tpd": None,
        "card": False, "training": "no", "ctxCap": 1000000,
        "note": "Самый щедрый RPM. Nemotron 3.5 Lightning — PROBE_OK.",
        "uptime": "99%",
    },
    {
        "id": "Freebuff", "access": "api", "status": "working", "color": "#00ff66",
        "limits": "100–150 Freebucks/день (tier)", "rpm": None, "rpd": None, "tpd": None,
        "card": False, "training": "no", "ctxCap": 262144,
        "note": "Локальный прокси :23333. 18 моделей, включая Claude Opus 5.5 и GPT-6.1 Sol.",
        "uptime": "96%",
    },
    {
        "id": "BeatAPI", "access": "api", "status": "catalog", "color": "#f59e0b",
        "limits": "1 RPM без top-up, до 10 RPM после", "rpm": 1, "rpd": None, "tpd": None,
        "card": False, "training": "no", "ctxCap": 262144,
        "note": "Слабый RPM — только emergency fallback.",
        "uptime": "93%",
    },
    {
        "id": "OpenCode Free", "access": "local", "status": "catalog", "color": "#84cc16",
        "limits": "дневная квота, точная цифра скрыта", "rpm": None, "rpd": None, "tpd": None,
        "card": False, "training": "no", "ctxCap": 1048576,
        "note": "Только из нативного OpenCode. Внешний CLI → 403 FreeTierError. Прокси :8789 не запущен.",
        "uptime": "90%",
    },
    {
        "id": "OrcaRouter", "access": "api", "status": "blocked", "color": "#ef4444",
        "limits": "10 RPM / 50 RPD (Hy4: 50/250)", "rpm": 10, "rpd": 50, "tpd": None,
        "card": False, "training": "no", "ctxCap": 262144,
        "note": "HTTP 429 — нужна GitHub/account eligibility. Модели живые, доступа нет.",
        "uptime": "—",
    },
    {
        "id": "CommandCode", "access": "api", "status": "blocked", "color": "#ef4444",
        "limits": "free-alias требуют credits/entitlement", "rpm": None, "rpd": None, "tpd": None,
        "card": True, "training": "no", "ctxCap": 1000000,
        "note": "HTTP 400 insufficient credits. Каталог богатый: DeepSeek, Kimi, MiMo, Hy4, stealth.",
        "uptime": "—",
    },
    {
        "id": "Google AI Studio", "access": "api", "status": "blocked", "color": "#4285f4",
        "limits": "5–15 RPM / 20–1500 RPD", "rpm": 10, "rpd": 250, "tpd": None,
        "card": False, "training": "yes (кроме EEA)", "ctxCap": 1048576,
        "note": "Ключ есть, но HTTP 429 quota. Gemini Flash до 1M ctx.",
        "uptime": "—",
    },
    {
        "id": "LLM7.io", "access": "api", "status": "working", "color": "#22d3ee",
        "limits": "free-подмножество без баланса; остальное — 402", "rpm": None, "rpd": None, "tpd": None,
        "card": False, "training": "no", "ctxCap": 262144,
        "note": "Ключ уже есть в .env и подключён в Hermes. 67 моделей в каталоге, 7 реально бесплатны.",
        "uptime": "96%",
    },
    {
        "id": "NiloVR", "access": "api", "status": "working", "color": "#f472b6",
        "limits": "2 из 64 моделей доступны бесплатно", "rpm": None, "rpd": None, "tpd": None,
        "card": False, "training": "no", "ctxCap": 262144,
        "note": "Ключ есть в .env, подключён в Hermes. nemotron-3-ultra + laguna-s-2.1 отвечают 200.",
        "uptime": "90%",
    },
    {
        "id": "B.AI", "access": "api", "status": "blocked", "color": "#ef4444",
        "limits": "баланс $0 → 402 на всех моделях", "rpm": None, "rpd": None, "tpd": None,
        "card": True, "training": "no", "ctxCap": 200000,
        "note": "Ключ есть, 62 модели (Opus 5.5, Fable 5.1, Haiku 5.5, Gemini 3.8, GPT-6.1 Sol). Нужен депозит.",
        "uptime": "—",
    },
    {
        "id": "GitHub Models / Copilot", "access": "oauth", "status": "candidate", "color": "#a78bfa",
        "limits": "Models: 15 RPM / 150–1000 RPD. Copilot Free: 2000 completions + 50 chat/мес", "rpm": 15, "rpd": 500, "tpd": None,
        "card": False, "training": "no", "ctxCap": 128000,
        "note": "GITHUB_TOKEN уже есть. Copilot даёт Claude/GPT/Gemini по подписке GitHub.",
        "uptime": "99%",
    },
    {
        "id": "Groq", "access": "api", "status": "candidate", "color": "#f55036",
        "limits": "30 RPM / 1000 RPD", "rpm": 30, "rpd": 1000, "tpd": None,
        "card": False, "training": "no", "ctxCap": 131072,
        "note": "Нужно добавить GROQ_API_KEY. ~320 tok/s на Llama 3.3 70B.",
        "uptime": "99.9%",
    },
    {
        "id": "Cerebras", "access": "api", "status": "candidate", "color": "#ff6b35",
        "limits": "30 RPM / ~1M токенов/день", "rpm": 30, "rpd": None, "tpd": 1000000,
        "card": False, "training": "no", "ctxCap": 131072,
        "note": "Нужно добавить CEREBRAS_API_KEY. Самая большая дневная квота в токенах.",
        "uptime": "99.9%",
    },
    {
        "id": "Mistral", "access": "api", "status": "candidate", "color": "#ff7000",
        "limits": "~1B токенов/мес (Experiment)", "rpm": None, "rpd": None, "tpd": None,
        "card": False, "training": "yes (opt-in)", "ctxCap": 131072,
        "note": "Нужно добавить MISTRAL_API_KEY. Самая щедрая месячная квота, но с обучением на данных.",
        "uptime": "99%",
    },
    {
        "id": "GitHub Models", "access": "oauth", "status": "candidate", "color": "#a78bfa",
        "limits": "15 RPM / 150–1000 RPD", "rpm": 15, "rpd": 500, "tpd": None,
        "card": False, "training": "no", "ctxCap": 128000,
        "note": "GITHUB_TOKEN уже есть. GPT-4o, Claude 3.5 Sonnet, Llama, Phi.",
        "uptime": "99%",
    },
    {
        "id": "Cloudflare Workers AI", "access": "api", "status": "candidate", "color": "#f6821f",
        "limits": "10K нейронов/день (сброс 00:00 UTC)", "rpm": None, "rpd": None, "tpd": None,
        "card": False, "training": "no", "ctxCap": 8192,
        "note": "Малые ctx, но щедро. 20+ моделей.",
        "uptime": "99.9%",
    },
    {
        "id": "SambaNova", "access": "api", "status": "candidate", "color": "#ee7623",
        "limits": "20 RPM / 20 RPD на модель", "rpm": 20, "rpd": 20, "tpd": None,
        "card": True, "training": "no", "ctxCap": 131072,
        "note": "$5 trial credits.",
        "uptime": "98%",
    },
    {
        "id": "Cohere", "access": "api", "status": "candidate", "color": "#39594d",
        "limits": "~100 RPD, только non-commercial", "rpm": 20, "rpd": 100, "tpd": None,
        "card": False, "training": "no", "ctxCap": 131072,
        "note": "Command R+ для RAG.",
        "uptime": "98%",
    },
    {
        "id": "OVH Cloud", "access": "noauth", "status": "candidate", "color": "#123f6d",
        "limits": "2 RPM / IP / модель", "rpm": 2, "rpd": None, "tpd": None,
        "card": False, "training": "no", "ctxCap": 131072,
        "note": "Анонимные вызовы без аккаунта. 7 моделей.",
        "uptime": "95%",
    },
    {
        "id": "Requesty", "access": "api", "status": "candidate", "color": "#6366f1",
        "limits": "200 RPD / 20 RPM", "rpm": 20, "rpd": 200, "tpd": None,
        "card": False, "training": "no", "ctxCap": 131072,
        "note": ":free модели, низкоприоритетная очередь.",
        "uptime": "96%",
    },
    {
        "id": "Routeway", "access": "api", "status": "candidate", "color": "#10b981",
        "limits": "200 RPD, низкий приоритет", "rpm": None, "rpd": 200, "tpd": None,
        "card": False, "training": "no", "ctxCap": 131072,
        "note": ":free модели.",
        "uptime": "95%",
    },
    {
        "id": "Hugging Face", "access": "api", "status": "candidate", "color": "#ff9d00",
        "limits": "community rate limit", "rpm": None, "rpd": None, "tpd": None,
        "card": False, "training": "no", "ctxCap": None,
        "note": "100K+ OSS моделей через Inference API.",
        "uptime": "98%",
    },
    {
        "id": "AI Horde", "access": "noauth", "status": "candidate", "color": "#ff8c42",
        "limits": "краудсорс, без гарантий", "rpm": None, "rpd": None, "tpd": None,
        "card": False, "training": "no", "ctxCap": 8192,
        "note": "165 моделей в OmniRoute, но это image-gen — на /v1/chat/completions 400.",
        "uptime": "90%",
    },
    {
        "id": "Chutes.ai", "access": "api", "status": "candidate", "color": "#8b5cf6",
        "limits": "community tier", "rpm": None, "rpd": None, "tpd": None,
        "card": False, "training": "no", "ctxCap": 131072,
        "note": "OSS-модели через community tier.",
        "uptime": "95%",
    },
    {
        "id": "ModelScope", "access": "api", "status": "candidate", "color": "#ff6a00",
        "limits": "community tier", "rpm": None, "rpd": None, "tpd": None,
        "card": False, "training": "no", "ctxCap": 131072,
        "note": "Alibaba — Qwen и многое другое.",
        "uptime": "96%",
    },
    {
        "id": "Z AI (Zhipu)", "access": "api", "status": "candidate", "color": "#325ab4",
        "limits": "free tier, без карты", "rpm": None, "rpd": None, "tpd": None,
        "card": False, "training": "no", "ctxCap": 203000,
        "note": "GLM-серия бесплатно.",
        "uptime": "97%",
    },
    {
        "id": "LLM7.io", "access": "api", "status": "candidate", "color": "#22d3ee",
        "limits": "free tier", "rpm": None, "rpd": None, "tpd": None,
        "card": False, "training": "no", "ctxCap": 131072,
        "note": "5 моделей, text+code.",
        "uptime": "90%",
    },
    {
        "id": "Kilo Code", "access": "api", "status": "candidate", "color": "#a3e635",
        "limits": "free tier", "rpm": None, "rpd": None, "tpd": None,
        "card": False, "training": "no", "ctxCap": 131072,
        "note": "4 coding-модели.",
        "uptime": "95%",
    },
    {
        "id": "OVH AI Endpoints", "access": "api", "status": "candidate", "color": "#123f6d",
        "limits": "free tier, без карты", "rpm": None, "rpd": None, "tpd": None,
        "card": False, "training": "no", "ctxCap": 131072,
        "note": "7 моделей, text+code+image.",
        "uptime": "97%",
    },
    {
        "id": "SiliconFlow", "access": "api", "status": "candidate", "color": "#6d28d9",
        "limits": "$1 кредит на .com, free на .cn", "rpm": None, "rpd": None, "tpd": None,
        "card": False, "training": "no", "ctxCap": 131072,
        "note": "6 моделей.",
        "uptime": "96%",
    },
    {
        "id": "Cyrus Relay", "access": "api", "status": "candidate", "color": "#e11d48",
        "limits": "free-tier модели, без аккаунта", "rpm": None, "rpd": None, "tpd": None,
        "card": False, "training": "no", "ctxCap": 131072,
        "note": "Премиум-тарифы через крипту.",
        "uptime": "88%",
    },
]

# ------------------------------------------------------------------ families
# bench: swe / he / aider / livecode / arena / arenaRank
FAMILIES = [
    {
        "id": "deepseek-v4.1-flash", "rank": 1, "name": "DeepSeek V4.1 Flash 1017",
        "tasks": ["Кодинг", "Reasoning", "Tools", "Vision"], "family": "DeepSeek V4.1",
        "ctx": 200000, "out": 32000, "reasoning": True,
        "bench": {"swe": 67.4, "he": 89.2, "aider": 71.3, "livecode": 62.1, "arena": 1664, "arenaRank": "open №1"},
        "routes": [
            {"p": "Freebuff", "id": "freebuff/deepseek/deepseek-v4.1-flash", "status": "working", "type": "free", "src": "api"},
            {"p": "BeatAPI", "id": "deepseek-v4.1-flash-free", "status": "working", "type": "free", "src": "api"},
            {"p": "OpenCode Free", "id": "opencode/deepseek-v4.1-flash-free", "status": "catalog", "type": "free", "src": "local"},
            {"p": "NVIDIA NIM", "id": "deepseek-ai/deepseek-v4.1-flash", "status": "catalog", "type": "free", "src": "api"},
            {"p": "OmniRoute / auto", "id": "auto/coding:free", "status": "working", "type": "free", "src": "noauth"},
        ],
    },
    {
        "id": "minimax-m3.1-flash", "rank": 2, "name": "MiniMax M3.1 Flash",
        "tasks": ["Кодинг", "Fast Agent", "Tools"], "family": "MiniMax M3",
        "ctx": 1000000, "out": 524288, "reasoning": True,
        "bench": {"swe": 61.8, "he": 85.4, "aider": 64.2, "livecode": 55.2, "arena": None, "arenaRank": "agent ~№13"},
        "routes": [
            {"p": "OpenRouter", "id": "minimax/minimax-m3.1-flash:free", "status": "working", "type": "free", "src": "api"},
            {"p": "OpenCode Free", "id": "opencode/minimax-m3.1-flash-free", "status": "catalog", "type": "free", "src": "local"},
        ],
    },
    {
        "id": "ornith-1.5-122b", "rank": 3, "name": "Ornith 1.5 122B",
        "tasks": ["Кодинг", "Reasoning", "Tools", "Vision"], "family": "Ornith 1.5",
        "ctx": 262144, "out": 262144, "reasoning": True,
        "bench": {"swe": 84.5, "he": None, "aider": None, "livecode": None, "arena": None, "arenaRank": "TermBench 81.2 · SWE-Pro 76.9"},
        "routes": [
            {"p": "Nous Portal", "id": "ornith/ornith-1.5-122b:free", "status": "working", "type": "free", "src": "api"},
        ],
    },
    {
        "id": "flint-v1.0", "rank": 4, "name": "Recursive Flint 1.0 (40B-A2.5B)",
        "tasks": ["Кодинг", "Reasoning", "Tools", "Fast Agent"], "family": "Recursive Flint",
        "ctx": 262144, "out": 235929, "reasoning": True,
        "bench": {"swe": 74.2, "he": None, "aider": None, "livecode": None, "arena": None, "arenaRank": "SWE-Pro v2 89.7 · TermBench 54.9"},
        "routes": [
            {"p": "OpenRouter", "id": "recursive/flint-v1.0:free", "status": "working", "type": "free", "src": "api"},
        ],
    },
    {
        "id": "kimi-k3", "rank": 4, "name": "Kimi K3",
        "tasks": ["Архитектура", "Planning", "Big Codebase"], "family": "Kimi K3",
        "ctx": 256000, "out": 32768, "reasoning": True,
        "bench": {"swe": 69.3, "he": 90.1, "aider": 74.2, "livecode": 64.5, "arena": 1655, "arenaRank": "open №2"},
        "routes": [
            {"p": "Freebuff", "id": "freebuff/moonshotai/kimi-k3", "status": "working", "type": "free", "src": "api"},
            {"p": "BeatAPI", "id": "kimi-k3", "status": "catalog", "type": "free", "src": "api"},
        ],
    },
    {
        "id": "mimo-v2.6-pro", "rank": 4, "name": "MiMo V2.6 Pro",
        "tasks": ["Архитектура", "Reasoning", "CRM/UI"], "family": "MiMo V2.6",
        "ctx": 262144, "out": 65536, "reasoning": True,
        "bench": {"swe": 68.2, "he": 91.5, "aider": 72.8, "livecode": 63.7, "arena": 1626, "arenaRank": "agent ~№6"},
        "routes": [
            {"p": "Freebuff", "id": "freebuff/mimo/mimo-v2.6-pro", "status": "working", "type": "free", "src": "api"},
        ],
    },
    {
        "id": "mimo-v2.6-flash", "rank": 5, "name": "MiMo V2.6 Flash",
        "tasks": ["UI", "Frontend", "Refactor", "Fast Agent"], "family": "MiMo V2.6",
        "ctx": 262144, "out": 32768, "reasoning": True,
        "bench": {"swe": 64.1, "he": 87.8, "aider": 66.9, "livecode": 59.3, "arena": 1634, "arenaRank": "open ~№3"},
        "routes": [
            {"p": "OpenCode Free", "id": "opencode/mimo-v2.6-flash-free", "status": "catalog", "type": "free", "src": "local"},
        ],
    },
    {
        "id": "hy4-preview", "rank": 6, "name": "Hy4 Preview",
        "tasks": ["Agent", "Reasoning", "Large Codebase"], "family": "Hy4",
        "ctx": 262144, "out": 65536, "reasoning": True,
        "bench": {"swe": 66.7, "he": 88.9, "aider": 69.4, "livecode": 60.8, "arena": 1631, "arenaRank": "agent ~№8"},
        "routes": [
            {"p": "OrcaRouter", "id": "tencent/hy4-preview-free", "status": "blocked", "type": "free", "src": "api"},
        ],
    },
    {
        "id": "glm-5.3-flash", "rank": 7, "name": "GLM-5.3 Flash",
        "tasks": ["Fast Patch", "Small Code", "Agent"], "family": "GLM-5.3",
        "ctx": 128000, "out": 8192, "reasoning": True,
        "bench": {"swe": 58.4, "he": 83.7, "aider": 61.2, "livecode": 52.1, "arena": 1607, "arenaRank": None},
        "routes": [
            {"p": "Freebuff", "id": "freebuff/z-ai/glm-5.3-flash", "status": "working", "type": "free", "src": "api"},
            {"p": "BeatAPI", "id": "glm-5.3-flash-free", "status": "working", "type": "free", "src": "api"},
            {"p": "OpenCode Free", "id": "opencode/glm-5.3-flash-free", "status": "catalog", "type": "free", "src": "local"},
            {"p": "OrcaRouter", "id": "z-ai/glm-5.3-flash-free", "status": "blocked", "type": "free", "src": "api"},
        ],
    },
    {
        "id": "nemotron-3.5-lightning", "rank": 8, "name": "Nemotron 3.5 Lightning",
        "tasks": ["Fast Agent", "Tools", "Coding"], "family": "Nemotron 3.5",
        "ctx": 1000000, "out": 65536, "reasoning": True,
        "bench": {"swe": 55.2, "he": 81.3, "aider": 57.8, "livecode": 48.7, "arena": None, "arenaRank": None},
        "routes": [
            {"p": "NVIDIA NIM", "id": "nvidia/nemotron-3.5-lightning-30b-a3b", "status": "working", "type": "free", "src": "api"},
            {"p": "OpenRouter", "id": "nvidia/nemotron-3.5-lightning:free", "status": "catalog", "type": "free", "src": "api"},
            {"p": "OpenCode Free", "id": "opencode/nemotron-3.5-lightning-free", "status": "catalog", "type": "free", "src": "local"},
        ],
    },
    {
        "id": "nemotron-3-ultra", "rank": 9, "name": "Nemotron 3 Ultra / Super VL",
        "tasks": ["Reasoning", "Vision", "Screenshots"], "family": "Nemotron 3",
        "ctx": 1000000, "out": 131072, "reasoning": True,
        "bench": {"swe": 63.9, "he": 86.2, "aider": 67.1, "livecode": 58.4, "arena": None, "arenaRank": "agent ~№16"},
        "routes": [
            {"p": "OpenRouter", "id": "nvidia/nemotron-3-ultra-550b-a55b:free", "status": "catalog", "type": "free", "src": "api"},
            {"p": "NiloVR", "id": "nemotron-3-ultra-550b-a55b", "status": "working", "type": "free", "src": "api"},
            {"p": "OpenRouter", "id": "nvidia/nemotron-3.5-super-vl:free", "status": "catalog", "type": "free", "src": "api"},
            {"p": "OpenCode Free", "id": "opencode/nemotron-3-ultra-free", "status": "catalog", "type": "free", "src": "local"},
            {"p": "NVIDIA NIM", "id": "nvidia/nemotron-3-ultra-550b-a55b", "status": "catalog", "type": "free", "src": "api"},
        ],
    },
    {
        "id": "laguna-s-2.1", "rank": 10, "name": "Laguna S 2.1",
        "tasks": ["Coding", "Patch", "Fallback"], "family": "Laguna",
        "ctx": 262144, "out": 32768, "reasoning": True,
        "bench": {"swe": 49.8, "he": 78.4, "aider": 52.3, "livecode": 44.1, "arena": 1350, "arenaRank": None},
        "routes": [
            {"p": "OpenRouter", "id": "poolside/laguna-s-2.1:free", "status": "working", "type": "free", "src": "api"},
            {"p": "Nous Portal", "id": "poolside/laguna-s-2.1:free", "status": "working", "type": "free", "src": "api"},
            {"p": "NiloVR", "id": "laguna-s-2.1", "status": "working", "type": "free", "src": "api"},
        ],
    },
    {
        "id": "laguna-xs-2.1", "rank": 11, "name": "Laguna XS 2.1",
        "tasks": ["Coding", "Patch", "Fast Agent"], "family": "Laguna",
        "ctx": 262144, "out": 32768, "reasoning": True,
        "bench": {"swe": 47.2, "he": 76.9, "aider": 49.8, "livecode": 42.4, "arena": None, "arenaRank": None},
        "routes": [
            {"p": "Nous Portal", "id": "poolside/laguna-xs-2.1:free", "status": "working", "type": "free", "src": "api"},
            {"p": "OpenRouter", "id": "poolside/laguna-xs-2.1:free", "status": "catalog", "type": "free", "src": "api"},
        ],
    },
    {
        "id": "longcat-2.5", "rank": 12, "name": "LongCat 2.5 Preview",
        "tasks": ["Long Context", "Reasoning", "Coding"], "family": "LongCat",
        "ctx": 1048576, "out": 65536, "reasoning": True,
        "bench": {"swe": 52.1, "he": 79.8, "aider": 54.6, "livecode": 46.3, "arena": None, "arenaRank": None},
        "routes": [
            {"p": "Nous Portal", "id": "meituan/longcat-2.5-preview:free", "status": "working", "type": "free", "src": "api"},
            {"p": "OpenCode Free", "id": "opencode/longcat-2.5-preview-free", "status": "catalog", "type": "free", "src": "local"},
        ],
    },
    {
        "id": "step-3.7-flash", "rank": 13, "name": "Step 3.7 Flash",
        "tasks": ["Кодинг", "Fast Agent", "Reasoning"], "family": "Step",
        "ctx": 131072, "out": 32768, "reasoning": True,
        "bench": {"swe": None, "he": None, "aider": None, "livecode": None, "arena": None, "arenaRank": None},
        "routes": [
            {"p": "Nous Portal", "id": "stepfun/step-3.7-flash:free", "status": "working", "type": "free", "src": "api"},
        ],
    },
    {
        "id": "solar-mini4", "rank": 14, "name": "Solar Mini4",
        "tasks": ["Кодинг", "Fast Agent", "Multilingual"], "family": "Solar",
        "ctx": 131072, "out": 32768, "reasoning": False,
        "bench": {"swe": None, "he": None, "aider": None, "livecode": None, "arena": None, "arenaRank": None},
        "routes": [
            {"p": "Nous Portal", "id": "upstage/solar-mini4:free", "status": "working", "type": "free", "src": "api"},
        ],
    },
    {
        "id": "inkling", "rank": 15, "name": "Inkling / Inkling Small",
        "tasks": ["Кодинг", "Reasoning", "Fast Agent"], "family": "Thinking Machines",
        "ctx": 1048576, "out": 262144, "reasoning": True,
        "bench": {"swe": 63.1, "he": 86.7, "aider": 66.2, "livecode": 57.8, "arena": None, "arenaRank": "WebDev 1600+"},
        "routes": [
            {"p": "OpenRouter", "id": "thinkingmachines/inkling:free", "status": "working", "type": "free", "src": "api"},
            {"p": "OpenRouter", "id": "thinkingmachines/inkling-small:free", "status": "working", "type": "free", "src": "api"},
        ],
    },
    {
        "id": "gemma-4", "rank": 16, "name": "Gemma 4 26B / 31B",
        "tasks": ["Reasoning", "Multilingual", "Fast Agent"], "family": "Gemma 4",
        "ctx": 262144, "out": 32768, "reasoning": True,
        "bench": {"swe": 60.2, "he": 84.9, "aider": 63.1, "livecode": 54.1, "arena": None, "arenaRank": None},
        "routes": [
            {"p": "OpenRouter", "id": "google/gemma-4-26b-a4b-it:free", "status": "working", "type": "free", "src": "api"},
            {"p": "OpenRouter", "id": "google/gemma-4-31b-it:free", "status": "catalog", "type": "free", "src": "api"},
        ],
    },
    {
        "id": "north-mini-code", "rank": 17, "name": "North Mini Code",
        "tasks": ["Кодинг", "Fast Patch", "Tools"], "family": "Cohere North",
        "ctx": 256000, "out": 64000, "reasoning": True,
        "bench": {"swe": 58.8, "he": 84.1, "aider": 62.4, "livecode": 55.6, "arena": None, "arenaRank": None},
        "routes": [
            {"p": "OpenRouter", "id": "cohere/north-mini-code:free", "status": "working", "type": "free", "src": "api"},
        ],
    },
    {
        "id": "xing-4.0", "rank": 18, "name": "Xing 4.0 29B-A4B",
        "tasks": ["Reasoning", "Multilingual"], "family": "Xing",
        "ctx": 262144, "out": 235929, "reasoning": True,
        "bench": {"swe": 54.3, "he": 81.6, "aider": 58.2, "livecode": 50.4, "arena": None, "arenaRank": None},
        "routes": [
            {"p": "OpenRouter", "id": "xingchen-agi/xing4.0-29b-a4b:free", "status": "working", "type": "free", "src": "api"},
        ],
    },
    {
        "id": "lfm-2.5", "rank": 19, "name": "LFM 2.5 2.6B",
        "tasks": ["Fast Agent", "Edge"], "family": "Liquid",
        "ctx": 65536, "out": 8192, "reasoning": False,
        "bench": {"swe": 38.2, "he": 68.4, "aider": 41.7, "livecode": 35.9, "arena": None, "arenaRank": None},
        "routes": [
            {"p": "OpenRouter", "id": "liquid/lfm-2.5-2.6b:free", "status": "working", "type": "free", "src": "api"},
        ],
    },
    {
        "id": "qwen-3.8", "rank": 20, "name": "Qwen 3.8 Max / Flash",
        "tasks": ["Reasoning", "Multilingual", "Кодинг"], "family": "Qwen 3.8",
        "ctx": 262144, "out": 32768, "reasoning": True,
        "bench": {"swe": 65.3, "he": 88.1, "aider": 68.7, "livecode": 61.2, "arena": None, "arenaRank": "agent ~№11"},
        "routes": [
            {"p": "Freebuff", "id": "freebuff/qwen/qwen3.8-max", "status": "working", "type": "free", "src": "api"},
            {"p": "Freebuff", "id": "freebuff/qwen/qwen3.8-flash", "status": "working", "type": "free", "src": "api"},
            {"p": "BeatAPI", "id": "qwen3.8-max", "status": "catalog", "type": "free", "src": "api"},
        ],
    },
    {
        "id": "claude-opus-5.5", "rank": 21, "name": "Claude Opus 5.5 / GPT-6.1 Sol / Grok 4.7",
        "tasks": ["Deep Review", "Архитектура", "Reasoning"], "family": "Commercial",
        "ctx": 200000, "out": 32000, "reasoning": True,
        "bench": {"swe": 72.1, "he": 93.4, "aider": 76.8, "livecode": 67.9, "arena": None, "arenaRank": "Opus agent №1; Grok ~№7"},
        "routes": [
            {"p": "Freebuff", "id": "freebuff/anthropic/claude-opus-5.5", "status": "working", "type": "free", "src": "api"},
            {"p": "Freebuff", "id": "freebuff/openai/gpt-6.1-sol", "status": "working", "type": "free", "src": "api"},
            {"p": "Freebuff", "id": "freebuff/x-ai/grok-4.7", "status": "working", "type": "free", "src": "api"},
            {"p": "Freebuff", "id": "freebuff/google/gemini-3.8-flash", "status": "working", "type": "free", "src": "api"},
        ],
    },
    {
        "id": "space-bunny", "rank": 22, "name": "Space Bunny / Ox Alpha",
        "tasks": ["Stealth", "Experiment", "Fast Agent"], "family": "Stealth",
        "ctx": 262144, "out": 32768, "reasoning": True,
        "bench": {"swe": None, "he": None, "aider": None, "livecode": None, "arena": None, "arenaRank": None},
        "routes": [
            {"p": "Freebuff", "id": "freebuff/stealth/space-bunny-alpha", "status": "working", "type": "stealth", "src": "api"},
            {"p": "Freebuff", "id": "freebuff/stealth/ox-alpha", "status": "working", "type": "stealth", "src": "api"},
            {"p": "OpenCode Free", "id": "opencode/space-bunny-free", "status": "catalog", "type": "preview", "src": "local"},
        ],
    },
    {
        "id": "beam-pickle", "rank": 23, "name": "Beam / Big Pickle / Cat Jam / Glyph",
        "tasks": ["Stealth", "Reasoning", "Experiment"], "family": "Stealth",
        "ctx": 262144, "out": 32768, "reasoning": True,
        "bench": {"swe": None, "he": None, "aider": None, "livecode": None, "arena": None, "arenaRank": None},
        "routes": [
            {"p": "Nous Portal", "id": "reflection/beam-1.0-501b-a23b:free", "status": "working", "type": "free", "src": "api"},
            {"p": "OpenCode Free", "id": "opencode/beam-free", "status": "catalog", "type": "free", "src": "local"},
            {"p": "OpenCode Free", "id": "opencode/big-pickle", "status": "catalog", "type": "free", "src": "local"},
        ],
    },
    {
        "id": "ddgw-free", "rank": 24, "name": "DuckDuckGo Cloudflare Free",
        "tasks": ["Fast Agent", "Reasoning", "Кодинг"], "family": "NoAuth",
        "ctx": 262144, "out": 16384, "reasoning": True,
        "bench": {"swe": 56.1, "he": 82.7, "aider": 59.8, "livecode": 52.4, "arena": None, "arenaRank": None},
        "routes": [
            {"p": "OmniRoute / ddgw", "id": "ddgw/gpt-5.4-mini", "status": "working", "type": "free", "src": "noauth"},
            {"p": "OmniRoute / ddgw", "id": "ddgw/gpt-5.6-luna", "status": "working", "type": "free", "src": "noauth"},
            {"p": "OmniRoute / ddgw", "id": "ddgw/claude-haiku-4-5", "status": "working", "type": "free", "src": "noauth"},
            {"p": "OmniRoute / ddgw", "id": "ddgw/mistral-small-2603", "status": "working", "type": "free", "src": "noauth"},
            {"p": "OmniRoute / ddgw", "id": "ddgw/tinfoil/gpt-oss-120b", "status": "working", "type": "free", "src": "noauth"},
            {"p": "OmniRoute / ddgw", "id": "ddgw/tinfoil/gemma4-31b", "status": "working", "type": "free", "src": "noauth"},
        ],
    },
    {
        "id": "lyria-3", "rank": 25, "name": "Lyria 3 Clip / Pro (audio)",
        "tasks": ["Audio", "Music"], "family": "Lyria",
        "ctx": 1048576, "out": 65536, "reasoning": False,
        "bench": {"swe": None, "he": None, "aider": None, "livecode": None, "arena": None, "arenaRank": None},
        "routes": [
            {"p": "OpenRouter", "id": "google/lyria-3-clip-preview", "status": "blocked", "type": "preview", "src": "api"},
            {"p": "OpenRouter", "id": "google/lyria-3-pro-preview", "status": "blocked", "type": "preview", "src": "api"},
        ],
    },
    {
        "id": "dots-3-note", "rank": 26, "name": "Dots 3 Note Preview",
        "tasks": ["Notes", "Reasoning", "Fast Agent"], "family": "Dots",
        "ctx": 512000, "out": 460800, "reasoning": True,
        "bench": {"swe": 59.6, "he": 85.3, "aider": 63.9, "livecode": 56.7, "arena": None, "arenaRank": None},
        "routes": [
            {"p": "OpenRouter", "id": "dots-studio/dots-3-note-preview:free", "status": "working", "type": "preview", "src": "api"},
        ],
    },
    {
        "id": "openrouter-free", "rank": 27, "name": "OpenRouter / free (auto-router)",
        "tasks": ["Кодинг", "Reasoning", "Fast Agent"], "family": "OpenRouter",
        "ctx": 200000, "out": 32768, "reasoning": True,
        "bench": {"swe": 55.0, "he": 83.0, "aider": 59.0, "livecode": 51.0, "arena": None, "arenaRank": None},
        "routes": [
            {"p": "OpenRouter", "id": "openrouter/free", "status": "working", "type": "free", "src": "api"},
        ],
    },
    {
        "id": "llm7-free", "rank": 28, "name": "LLM7.io free subset",
        "tasks": ["Кодинг", "Fast Agent", "Reasoning"], "family": "LLM7",
        "ctx": 262144, "out": 32768, "reasoning": True,
        "bench": {"swe": 55.4, "he": 82.3, "aider": 58.9, "livecode": 51.2, "arena": None, "arenaRank": None},
        "routes": [
            {"p": "LLM7.io", "id": "GLM-5.3-Flash", "status": "working", "type": "free", "src": "api"},
            {"p": "LLM7.io", "id": "DeepSeek-V4-Flash-0731", "status": "working", "type": "free", "src": "api"},
            {"p": "LLM7.io", "id": "gpt-oss:20b", "status": "working", "type": "free", "src": "api"},
            {"p": "LLM7.io", "id": "nemotron-3-nano:30b", "status": "working", "type": "free", "src": "api"},
            {"p": "LLM7.io", "id": "mistral-Nemo-Instruct-2407", "status": "working", "type": "free", "src": "api"},
            {"p": "LLM7.io", "id": "codestral-latest", "status": "working", "type": "free", "src": "api"},
            {"p": "LLM7.io", "id": "minimax-m2.7", "status": "working", "type": "free", "src": "api"},
        ],
    },
    {
        "id": "content-safety", "rank": 29, "name": "Content Safety / Nemotron Nano",
        "tasks": ["Safety", "Classification"], "family": "Specialized",
        "ctx": 128000, "out": 8192, "reasoning": False,
        "bench": {"swe": None, "he": None, "aider": None, "livecode": None, "arena": None, "arenaRank": None},
        "routes": [
            {"p": "OpenRouter", "id": "nvidia/nemotron-3.5-content-safety:free", "status": "working", "type": "free", "src": "api"},
            {"p": "OpenRouter", "id": "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free", "status": "working", "type": "free", "src": "api"},
        ],
    },
]
for _idx, _fam in enumerate(FAMILIES, 1):
    _fam["rank"] = _idx

# ------------------------------------------------------------------ paid plans
PLANS = [
    {
        "name": "Nous Portal Free", "price": "$0", "kind": "Free tier",
        "includes": "Все бесплатные модели Nous: Ornith 1.5 122B, LongCat 2.5, Laguna S/XS 2.1, Beam 501B, Step 3.7 Flash, Solar Mini4 + preview. Каталог портала — 248 моделей (325 с embeddings)",
        "allowance": "50 RPM / 500K TPM. Только free-модели — платные через портал недоступны",
        "tokens": "Без лимита токенов, но жёсткий RPM",
        "verdict": "Наш основной Nous-маршрут. Работает в Hermes", "score": 89,
    },
    {
        "name": "Nous Portal Plus", "price": "$20/мес", "kind": "Подписка",
        "includes": "Полный каталог Portal: Kimi K2.7, GLM-5.3, MiniMax M3.1, DeepSeek V4.1, Mistral Large 4, Nemotron 3.5 + Tool Gateway",
        "allowance": "$22 кредитов в месяц, rollover-кап $10. 400 RPM / 4M TPM",
        "tokens": "$22 кредитов ≈ 7.3M токенов Claude Haiku 4.5",
        "verdict": "Дешевле всех подписок при больших лимитах", "score": 91,
    },
    {
        "name": "Nous Portal Super", "price": "$100/мес", "kind": "Подписка",
        "includes": "Тот же полный каталог + Tool Gateway",
        "allowance": "$110 кредитов, rollover-кап $50. 800 RPM / 8M TPM",
        "tokens": "$110 ≈ 36.7M токенов Claude Haiku 4.5",
        "verdict": "Для тяжёлых агентных прогонов", "score": 84,
    },
    {
        "name": "Nous Portal Ultra", "price": "$200/мес", "kind": "Подписка",
        "includes": "Максимальный каталог и лимиты",
        "allowance": "$220 кредитов, rollover-кап $100. 1600 RPM / 16M TPM",
        "tokens": "$220 ≈ 73.3M токенов Claude Haiku 4.5",
        "verdict": "Максимум RPM в одном месте", "score": 76,
    },
    {
        "name": "Nous PAYG (без плана)", "price": "по факту", "kind": "Оплата по факту",
        "includes": "Любая модель каталога, оплата с баланса",
        "allowance": "180 RPM / 720K TPM. Скидка 10% на Anthropic и OpenAI от публичных цен",
        "tokens": "Оплата только за использованное",
        "verdict": "Без месячной платы — для нерегулярного usage", "score": 72,
    },
    {
        "name": "OpenCode Go", "price": "$10/мес", "kind": "API-подписка",
        "includes": "DeepSeek V4.1 Flash (off-peak $0.15/$0.60 за 1M), MiMo-V2.5-Pro, MiniMax M3, Muse Spark Contributor, Qwen3.8 Flash, Kimi K2.7 Code, GLM-5.2, LongCat 2.5 Preview Free",
        "allowance": "Лимиты в $ на модель: $60 (GLM-5.3-Flash, Kimi K2.7 Code, MiMo-V2.5, MiniMax M3, Qwen3.7 Plus, DeepSeek V4.1 Flash) или $15 (Kimi K3, GLM-5.3, Qwen3.8 Max, GPT-6 Luna, Claude Haiku 5.5). Окно 5ч = 20%, неделя = 50%, месяц = 100%.",
        "tokens": "≈34 670 запросов DeepSeek V4.1 Flash за 5ч (410 in + 71 300 cached + 310 out на запрос)",
        "verdict": "Лучшее соотношение цена/объём для кодинга", "score": 92,
    },
    {
        "name": "OpenCode Go Plus", "price": "$40/мес", "kind": "API-подписка",
        "includes": "Те же модели, повышенные лимиты",
        "allowance": "DeepSeek V4.1 Flash $160, Kimi K3 $60, GLM-5.3 $120 за месяц. ≈69 330 запросов за 5ч.",
        "tokens": "≈69 330 запросов DeepSeek V4.1 Flash за 5ч",
        "verdict": "Если Go не хватает", "score": 84,
    },
    {
        "name": "OpenRouter (пополнение)", "price": "$10 разово", "kind": "Кредиты",
        "includes": f"Все {len(OR_LIVE)} zero-price моделей без изменений + рост дневного лимита",
        "allowance": "50 RPD → 1000 RPD на free-моделях. Комиссия платформы 5.5%.",
        "tokens": "1000 запросов/день на всём free-пуле",
        "verdict": "Лучший апгрейд именно для бесплатного пула", "score": 95,
    },
    {
        "name": "Google AI Pro", "price": "$19.99/мес", "kind": "Подписка",
        "includes": "Gemini 3.8 Flash, Gemini 3.1 Pro (2M ctx), Opus 5.5, Sonnet 5.5, Antigravity, 5 TB, YouTube Premium Lite, $10 Cloud-credits, 1000 Flow-credits",
        "allowance": "4x от free-tier. Общий токен-пул Gemini, списывается по API-ценам. Обновление каждые 5 часов до недельного капа.",
        "tokens": "Не опубликовано абсолютно — 4x от free",
        "verdict": "У нас уже активен через Antigravity", "score": 90,
    },
    {
        "name": "Google AI Ultra", "price": "$99.99/мес", "kind": "Подписка",
        "includes": "5x лимитов AI Pro + Deep Think + Gemini Spark + 20 TB + YouTube Premium + $40 Cloud-credits + 10 000 Flow-credits",
        "allowance": "5x AI Pro по токен-пулу. Обновление каждые 5 часов, недельный кап сверху.",
        "tokens": "5x от AI Pro (≈20x от free)",
        "verdict": "Максимум свободы, дорого", "score": 78,
    },
    {
        "name": "Google AI Ultra 20x", "price": "$199.99/мес", "kind": "Подписка",
        "includes": "20x AI Pro, 25 000 Flow-credits, тот же bundle",
        "allowance": "20x AI Pro по токен-пулу",
        "tokens": "20x от AI Pro (≈80x от free)",
        "verdict": "Для тех, кто жжёт токены", "score": 66,
    },
    {
        "name": "Claude Pro", "price": "$20/мес", "kind": "Подписка",
        "includes": "Opus 5.5, Sonnet 5.5, Fable 5.1, Claude Code",
        "allowance": "5-часовые сессии + недельные капы. С 15 июня 2026 — отдельный месячный кредит для Claude Code / Agent SDK / `claude -p` по полным API-ценам. Не переносится.",
        "tokens": "Кредит = цена плана ($20)",
        "verdict": "Качество кода", "score": 86,
    },
    {
        "name": "Claude Max 5x", "price": "$100/мес", "kind": "Подписка",
        "includes": "5x Pro-сессии, Fable 5.1 до 50% недельного лимита",
        "allowance": "5-часовые окна + недельные капы. Сброс 5-часовых окон — каждые 5 часов, недельный — фиксированный день.",
        "tokens": "5x Pro",
        "verdict": "Для Claude Code", "score": 74,
    },
    {
        "name": "Claude Max 20x", "price": "$200/мес", "kind": "Подписка",
        "includes": "20x Pro-сессии",
        "allowance": "Те же окна, больше объём",
        "tokens": "20x Pro",
        "verdict": "Дорого", "score": 62,
    },
    {
        "name": "ChatGPT Pro", "price": "$200/мес", "kind": "Подписка",
        "includes": "GPT-6 Astra, GPT-6 Sol, GPT-5.6, Codex (CLI/IDE/cloud)",
        "allowance": "Per-model message ranges за 5 часов + недельные лимиты. 100–900 локальных сообщений за 5ч у Astra.",
        "tokens": "100–900 сообщений / 5ч",
        "verdict": "Новые регистрации приостановлены с 10.09", "score": 60,
    },
    {
        "name": "Cerebras free", "price": "$0", "kind": "Free tier",
        "includes": "Llama 3.3 70B и другие",
        "allowance": "30 RPM, ~1M токенов/день",
        "tokens": "≈1M токенов/день",
        "verdict": "Нужна карта для активации", "score": 88,
    },
    {
        "name": "Mistral Experiment", "price": "$0", "kind": "Free tier",
        "includes": "Mistral Large, Small, Codestral",
        "allowance": "≈1B токенов/мес. Opt-in на обучение данных. Только «try and explore».",
        "tokens": "≈1B токенов/мес",
        "verdict": "Самая большая месячная квота", "score": 85,
    },
    {
        "name": "Groq free", "price": "$0", "kind": "Free tier",
        "includes": "Llama 3.3 70B (~320 tok/s), Mixtral, GPT-OSS",
        "allowance": "30 RPM / 1000 RPD. Нужна верификация телефона.",
        "tokens": "1000 запросов/день",
        "verdict": "Максимальная скорость", "score": 87,
    },
    {
        "name": "Google AI Studio free", "price": "$0", "kind": "Free tier",
        "includes": "Gemini 2.5 Flash / Flash-Lite / Pro (лимитированно), Gemma",
        "allowance": "5–15 RPM, 20–1500 RPD. Данные могут использоваться для улучшения продуктов Google вне EEA/UK/CH.",
        "tokens": "до 1M ctx",
        "verdict": "У нас 429 — ключ есть, quota сломана", "score": 70,
    },
    {
        "name": "Cloudflare Workers AI free", "price": "$0", "kind": "Free tier",
        "includes": "20+ моделей (в т.ч. Llama, SD, Whisper)",
        "allowance": "10 000 нейронов/день, сброс 00:00 UTC. Overage на Workers Paid: $0.011 / 1000 нейронов.",
        "tokens": "10K нейронов/день",
        "verdict": "Отличный edge-вариант", "score": 80,
    },
    {
        "name": "GitHub Models free", "price": "$0", "kind": "Free tier",
        "includes": "GPT-4o, Claude 3.5 Sonnet, Llama, Phi",
        "allowance": "15 RPM, 150–1000 RPD. Azure-backed OpenAI-совместимый endpoint.",
        "tokens": "до 1000 RPD",
        "verdict": "GITHUB_TOKEN уже есть — можно подключить", "score": 82,
    },
]

# ------------------------------------------------------------------ releases
RELEASES = [
    {"d": "2026-10-21", "n": "Recursive Flint 1.0", "o": "Recursive", "ctx": "256K", "p": "40B (2.5B active)", "k": "open, coding, reasoning, Apache 2.0", "free": True},
    {"d": "2026-10-19", "n": "MiniMax M3.1 Flash", "o": "MiniMax", "ctx": "1M", "p": None, "k": "reasoning, vision", "free": True},
    {"d": "2026-10-19", "n": "Clairic", "o": "Cloudflare", "ctx": "64K", "p": None, "k": "vision", "free": True},
    {"d": "2026-10-19", "n": "Mercury 3", "o": "Inception Labs", "ctx": "1M", "p": None, "k": "reasoning", "free": False},
    {"d": "2026-10-17", "n": "DeepSeek V4.1 Flash 1017", "o": "DeepSeek", "ctx": "1M", "p": "552B", "k": "open, reasoning, vision", "free": True},
    {"d": "2026-10-16", "n": "Ornith 1.5 122B", "o": "Ornith AI", "ctx": "256K (1M YaRN)", "p": "122B MoE", "k": "open, reasoning, vision, MIT", "free": True},
    {"d": "2026-10-16", "n": "pplx-decider-v1.2 / flash-v1.2", "o": "Perplexity Labs", "ctx": "256K", "p": "27B / 4B", "k": "open, vision", "free": True},
    {"d": "2026-10-16", "n": "Beam", "o": "Reflection AI", "ctx": "1M", "p": "501B (23B active)", "k": "open, reasoning, Apache 2.0", "free": True},
    {"d": "2026-10-15", "n": "Muse Spark Open", "o": "Meta AI", "ctx": "1M", "p": "816B (42B active)", "k": "open, reasoning, vision", "free": True},
    {"d": "2026-10-15", "n": "Nemotron 3.5 Super VL", "o": "NVIDIA AI", "ctx": "1M", "p": "120B (12B active)", "k": "open, reasoning, vision", "free": True},
    {"d": "2026-10-15", "n": "Nemotron 3.5 Bolt 74B-A9B", "o": "NVIDIA AI", "ctx": "256K", "p": "74B (9B active)", "k": "open, reasoning, vision", "free": True},
    {"d": "2026-10-15", "n": "Jais 3 (0.9B → 375B-A23B)", "o": "Core42", "ctx": "512K", "p": "0.9B–375B", "k": "open, reasoning", "free": True},
    {"d": "2026-10-15", "n": "d1-ultra", "o": "Liquid AI", "ctx": None, "p": None, "k": "vision", "free": False},
    {"d": "2026-10-13", "n": "LFM2.5-24B-A2B", "o": "Liquid AI", "ctx": "128K", "p": "24B (2B active)", "k": "open, reasoning", "free": True},
    {"d": "2026-10-12", "n": "Muse Wonder / Muse Wonder Full", "o": "Meta AI", "ctx": "1M", "p": None, "k": "reasoning, vision, video", "free": False},
    {"d": "2026-10-10", "n": "Kisoku 1.6B", "o": "0ARCH", "ctx": None, "p": "1.6B", "k": "open, Apache 2.0, 150 w/s на M5 Max", "free": True},
    {"d": "2026-10-09", "n": "Clef-omni", "o": "Cloudflare", "ctx": "64K", "p": "30B (3B active)", "k": "open, vision", "free": True},
    {"d": "2026-10-09", "n": "Youtu-Parsing-Omni", "o": "Tencent AI Lab", "ctx": None, "p": "5B", "k": "open, vision, video", "free": True},
    {"d": "2026-10-08", "n": "Mellum2.1 Thinking", "o": "JetBrains", "ctx": "128K", "p": "12B (2.5B active)", "k": "open, reasoning", "free": True},
    {"d": "2026-10-08", "n": "MetaEncoder", "o": "Meta AI", "ctx": None, "p": "29.8B", "k": "open, vector", "free": True},
    {"d": "2026-10-07", "n": "Claude Haiku 5.5", "o": "Anthropic", "ctx": "1M", "p": None, "k": "reasoning, vision", "free": False},
    {"d": "2026-10-07", "n": "d1-omni-600M", "o": "Liquid AI", "ctx": "16K", "p": "587M", "k": "open, vision", "free": True},
    {"d": "2026-10-06", "n": "Mistral Large 4", "o": "Mistral AI", "ctx": "1M", "p": "1.05T (49B active)", "k": "reasoning, vision", "free": False},
    {"d": "2026-10-06", "n": "EmbeddingGemma 2", "o": "Google DeepMind", "ctx": "8K", "p": "740M", "k": "open, vector", "free": True},
    {"d": "2026-10-05", "n": "Amazon Nova 2.5 Sonic", "o": "AWS AI", "ctx": "256K", "p": None, "k": "audio", "free": False},
    {"d": "2026-10-04", "n": "Tess-4.5-27B", "o": "Continuity Research", "ctx": None, "p": "27B", "k": "open, coding, Apache 2.0", "free": True},
    {"d": "2026-10-03", "n": "Kolibri 1", "o": "Aleph Alpha", "ctx": "1M", "p": "78B (3.46B active)", "k": "open, reasoning", "free": True},
    {"d": "2026-10-02", "n": "Torchcast Decision 12B", "o": "Torchcast AI", "ctx": "16K", "p": "12B", "k": "open", "free": True},
    {"d": "2026-10-01", "n": "Clef / Clef-flash", "o": "Cloudflare", "ctx": "64K / 256K", "p": "27B / 9B", "k": "open, vision", "free": True},
    {"d": "2026-10-01", "n": "MAI-Voice-2.1 / -Flash", "o": "Microsoft AI", "ctx": None, "p": None, "k": "voice", "free": False},
    {"d": "2026-10-01", "n": "Grok Imagine Video 1.5 Lite", "o": "xAI", "ctx": None, "p": None, "k": "vision, image, video", "free": False},
]

# ------------------------------------------------------------------ verified probes
PROBES = [
    {"m": "openrouter/recursive/flint-v1.0:free", "r": "ok", "t": "PROBE_OK", "n": "262K ctx / 236K out, 40B-A2.5B MoE, SWE-Verified 74.2%, ~108 tok/s."},
    {"m": "openrouter/minimax/minimax-m3.1-flash:free", "r": "ok", "t": "PROBE_OK", "n": "1M ctx / 524K out. Добавлена в config → видна в пикере."},
    {"m": "openrouter/cohere/north-mini-code:free", "r": "ok", "t": "PROBE_OK", "n": "256K ctx / 64K out."},
    {"m": "openrouter/thinkingmachines/inkling:free", "r": "ok", "t": "PROBE_OK", "n": "Нужен заголовок X-OpenRouter-Categories — Hermes шлёт его сам."},
    {"m": "openrouter/xingchen-agi/xing4.0-29b-a4b:free", "r": "ok", "t": "PROBE_OK", "n": "262K ctx / 236K out."},
    {"m": "openrouter/liquid/lfm-2.5-2.6b:free", "r": "ok", "t": "PROBE_OK", "n": "65K ctx."},
    {"m": "openrouter/openrouter/free", "r": "ok", "t": "PROBE_OK", "n": "Авто-роутер OpenRouter."},
    {"m": "openrouter/google/gemma-4-26b-a4b-it:free", "r": "ok", "t": "PROBE_OK", "n": "262K ctx."},
    {"m": "openrouter/dots-studio/dots-3-note-preview:free", "r": "ok", "t": "PROBE_OK", "n": "Preview, 512K ctx."},
    {"m": "openrouter/poolside/laguna-s-2.1:free", "r": "ok", "t": "PROBE_OK", "n": "Основной бесплатный fallback."},
    {"m": "nous/ornith/ornith-1.5-122b:free", "r": "ok", "t": "PROBE_OK", "n": "262K ctx / 262K out, vision + tools, SWE-Verified 84.5%. Работает без user= тега."},
    {"m": "nous/meituan/longcat-2.5-preview:free", "r": "ok", "t": "PROBE_OK", "n": "1M ctx."},
    {"m": "nous/poolside/laguna-s-2.1:free", "r": "ok", "t": "PROBE_OK", "n": "Работает."},
    {"m": "nous/poolside/laguna-xs-2.1:free", "r": "ok", "t": "PROBE_OK", "n": "Работает."},
    {"m": "nous/reflection/beam-1.0-501b-a23b:free", "r": "ok", "t": "PROBE_OK", "n": "501B open (Apache 2.0)."},
    {"m": "nous/stepfun/step-3.7-flash:free", "r": "ok", "t": "PROBE_OK", "n": "Требует тег user= в extra_body.tags."},
    {"m": "nous/upstage/solar-mini4:free", "r": "ok", "t": "PROBE_OK", "n": "Тоже требует user= тег."},
    {"m": "omniroute/ddgw/gpt-5.4-mini", "r": "ok", "t": "PROBE_OK", "n": "Без подключения и без ключа!"},
    {"m": "omniroute/ddgw/gpt-5.6-luna", "r": "ok", "t": "PROBE_OK", "n": "Без ключа."},
    {"m": "omniroute/ddgw/claude-haiku-4-5", "r": "ok", "t": "PROBE_OK", "n": "Без ключа."},
    {"m": "omniroute/ddgw/mistral-small-2603", "r": "ok", "t": "PROBE_OK", "n": "Без ключа."},
    {"m": "omniroute/ddgw/tinfoil/gpt-oss-120b", "r": "ok", "t": "PROBE_OK", "n": "Без ключа."},
    {"m": "omniroute/ddgw/tinfoil/gemma4-31b", "r": "ok", "t": "PROBE_OK", "n": "Без ключа."},
    {"m": "omniroute/auto/best-free", "r": "ok", "t": "PROBE_OK", "n": "Авто-роутер по free-пулу."},
    {"m": "omniroute/auto/coding:free", "r": "ok", "t": "PROBE_OK", "n": "Авто-роутер для кода."},
    {"m": "omniroute/auto/cheap", "r": "ok", "t": "PROBE_OK", "n": "Дешёвый маршрут."},
    {"m": "omniroute/auto/offline", "r": "ok", "t": "PROBE_OK", "n": "Оффлайн-маршрут."},
    {"m": "nvidia/nemotron-3.5-lightning-30b-a3b", "r": "ok", "t": "PROBE_OK", "n": "Правильный NIM ID."},
    {"m": "openrouter/nvidia/nemotron-3-super-120b-a12b:free", "r": "bad", "t": "UPSTREAM 404", "n": "Function not found на стороне провайдера."},
    {"m": "openrouter/google/lyria-3-pro-preview", "r": "bad", "t": "402 CREDITS", "n": "Бесплатен по прайсу, но без кредитов — 402."},
    {"m": "nous/meituan/longcat-2.0:free", "r": "bad", "t": "NO LONGER FREE", "n": "HTTP 404 — перестала быть бесплатной."},
    {"m": "omniroute/oc/nemotron-3-ultra-free", "r": "bad", "t": "403 FreeTierError", "n": "OpenCode free — только из нативного OpenCode."},
    {"m": "omniroute/oc/mimo-v2.5-free", "r": "bad", "t": "401 NO CREDS", "n": "Нет credentials для opencode в OmniRoute."},
    {"m": "omniroute/cfp/deepseek-ai/deepseek-v4-flash-0731", "r": "bad", "t": "502 NO BROWSER", "n": "Cloudflare Playground: нет Playwright executable."},
    {"m": "omniroute/zc/glm-5.3-flash", "r": "bad", "t": "502 SPAWN ENOENT", "n": "Нет zcode CLI."},
    {"m": "omniroute/cxa/gpt-6-astra", "r": "bad", "t": "503 NO TRANSPORT", "n": "Codex app-server не настроен."},
    {"m": "omniroute/aug/sonnet4.6", "r": "bad", "t": "502 NO CLI", "n": "Нет auggie CLI."},
    {"m": "omniroute/aihorde/AlbedoBase XL", "r": "bad", "t": "IMAGE ONLY", "n": "Только /v1/images/generations."},
    {"m": "orcarouter/deepseek/deepseek-v4.1-flash-free", "r": "bad", "t": "429 ACCOUNT", "n": "Нужна GitHub/account eligibility."},
    {"m": "commandcode/stealth/cat-jam:free", "r": "bad", "t": "400 NO CREDITS", "n": "insufficient credits."},
    {"m": "google/gemini-2.5-flash", "r": "bad", "t": "429 QUOTA", "n": "Ключ есть, free quota сломана."},
]

# ------------------------------------------------------------------ tools (big free quotas, not per-token)
TOOLS = [
    {"n": "OmniRoute (локальный шлюз)", "signup": "У нас уже поднят: localhost:20128", "quota": "Без квот и без карты · 1292 модели в 17 префиксах · no-auth пулы: ddgw (6), auto/* (4)",
     "models": "GPT-5.4 Mini · GPT-5.6 Luna · Claude Haiku 4.5 · Mistral Small 2603 · GPT-OSS 120B · Gemma4 31B · auto/best-free · auto/coding:free",
     "ctx": "до 1M", "note": "Это шлюз, а не тариф: раздаёт бесплатные пулы и маршрутит по качеству. Проверен read-only, конфиг не менялся.",
     "score": 88, "badge": "У НАС ЕСТЬ"},
    {"n": "Qwen Code", "signup": "OAuth (Google/GitHub), без карты", "quota": "2000 запросов/день · 60 RPM",
     "models": "Qwen3-Coder-480B-A35B, Qwen3-Coder-Next, Qwen3-VL, qwen3-coder-plus, qwen3-max",
     "ctx": "1M", "note": "Крупнейший бесплатный дневной лимит среди CLI-агентов. Локально через Ollama — 0 лимитов.",
     "score": 95, "badge": "ТОП"},
    {"n": "Gemini CLI", "signup": "Google account, без карты", "quota": "1000 запросов/день · 60 RPM",
     "models": "Gemini 3.1 Pro (до 1M ctx), Gemini 3.8 Flash, 2.5 Pro/Flash, 2.5 Flash-Lite",
     "ctx": "1M", "note": "Официальный CLI от Google. 1000 запросов/день на аккаунт.",
     "score": 93, "badge": "ТОП"},
    {"n": "Rovo Dev CLI", "signup": "Atlassian account", "quota": "5M токенов/день (beta)",
     "models": "Claude Sonnet 4, GPT-5, Gemini",
     "ctx": "200K", "note": "Самый большой суточный объём токенов. Вход через Atlassian.",
     "score": 91, "badge": "ТОП"},
    {"n": "Gemini Code Assist", "signup": "Google account", "quota": "~6000 completions/день (~180K/мес) · 240 чат-сообщений/день",
     "models": "Gemini 3.1 Pro (2M ctx), 2.5 Pro/Flash",
     "ctx": "2M", "note": "Статус неоднозначен: для индивидуалов Google переводил на Antigravity с июня 2026. Проверяй в аккаунте.",
     "score": 88, "badge": ""},
    {"n": "GitHub Copilot Free", "signup": "GitHub account, бесплатно", "quota": "2000 completions + 50 премиум-запросов/мес + AI credits",
     "models": "Claude Sonnet 4.5, GPT-5.1/5-mini, Gemini 2.5 Pro",
     "ctx": "128K", "note": "GITHUB_TOKEN уже есть. В Hermes работает через ACP: hermes model (spawns local copilot --acp).",
     "score": 87, "badge": "У НАС ЕСТЬ"},
    {"n": "Cursor Hobby", "signup": "Email, без карты", "quota": "~2000 completions + 50 slow-запросов/мес",
     "models": "Claude Sonnet 4.5, GPT-5, Gemini 2.5 Pro, Auto (routing)",
     "ctx": "128K", "note": "Бесплатный тариф без карты. 50 запросов на Pro-модели в месяц.",
     "score": 84, "badge": ""},
    {"n": "Windsurf Free", "signup": "Google account, без карты", "quota": "~25 Cascade agent actions/мес + unlimited Tab",
     "models": "Cascade (Claude 4.5/4.6, GPT-5, Gemini 2.5)",
     "ctx": "128K", "note": "Бесплатно без карты, но агентных действий мало. Tab-автодополнение без лимита.",
     "score": 79, "badge": ""},
    {"n": "Trae", "signup": "Email, без карты", "quota": "~10 fast + 50 slow запросов/мес",
     "models": "Claude Sonnet 4.5, GPT-4o, Gemini 2.5, Auto",
     "ctx": "128K", "note": "Бесплатный тариф с 50 slow-запросами.",
     "score": 77, "badge": ""},
    {"n": "Qoder", "signup": "Email, без карты", "quota": "Unlimited completions + 1000 кредитов пробный период (2 недели)",
     "models": "Claude Sonnet 4.5, GPT-4o, Gemini 2.5 Pro, auto",
     "ctx": "128K", "note": "Pro $20/мес = 2000 кредитов, Pro+ $60 = 6000. Бесплатный тариф без карты.",
     "score": 76, "badge": ""},
    {"n": "Kiro", "signup": "AWS Builder ID", "quota": "50 кредитов/мес + 50 agentic-запросов/мес",
     "models": "Claude Sonnet 4.5, GPT-5, DeepSeek R1",
     "ctx": "128K", "note": "От AWS. Бесплатный тариф, но кредиты кончаются быстро.",
     "score": 74, "badge": ""},
    {"n": "Amazon Q Developer", "signup": "AWS Builder ID (или AWS CLI)", "quota": "~50 agentic-запросов/мес",
     "models": "Claude Sonnet 4.5, DeepSeek R1, Nova",
     "ctx": "128K", "note": "CLI бесплатно. Переход на Claude Opus 4.6 в AgentCore Agent Gateway.",
     "score": 72, "badge": ""},
    {"n": "Warp", "signup": "Email, без карты", "quota": "150 кредитов в первые 2 мес, далее 75/мес",
     "models": "Claude 4.5, GPT-5, Gemini 2.5, режим Agent",
     "ctx": "128K", "note": "Терминальный агент. Кредиты обновляются ежемесячно.",
     "score": 70, "badge": ""},
    {"n": "Jules", "signup": "Google account", "quota": "~15 задач/день",
     "models": "Gemini 3.1 Pro",
     "ctx": "1M", "note": "Асинхронный кодовый агент от Google. Задачи выполняются в облаке.",
     "score": 71, "badge": ""},
    {"n": "Cline / Roo Code / Continue", "signup": "нет — свой API-ключ", "quota": "лимиты твоего провайдера, 0 оверхеда",
     "models": "любые OpenAI-совместимые, включая бесплатные",
     "ctx": "до 1M", "note": "Локальный VS Code. Бесплатные маршруты из нашего каталога подключаются как custom provider.",
     "score": 82, "badge": "У НАС ЕСТЬ"},
    {"n": "opencode / Zed / Aider", "signup": "нет — свой ключ", "quota": "лимиты провайдера, 0 оверхеда",
     "models": "любые OpenAI-совместимые",
     "ctx": "до 1M", "note": "Локальные CLI/редакторы. Мы уже гоняем opencode через Hermes (zenfree).",
     "score": 81, "badge": "У НАС ЕСТЬ"},
    {"n": "Ollama / LM Studio", "signup": "нет — полностью локально", "quota": "без лимитов, без интернета",
     "models": "любые open-weight: Qwen3-Coder, DeepSeek, Kimi, GLM",
     "ctx": "по VRAM", "note": "Ноль в копейку и без лимитов — если хватает железа. Нужен мощный CPU/GPU.",
     "score": 83, "badge": "БЕЗ ЛИМИТОВ"},
    {"n": "Supermaven", "signup": "Email", "quota": "бесплатный completion tier",
     "models": "авто-комплит (70+ языков)",
     "ctx": "н/д", "note": "Только автодополнение в IDE.",
     "score": 60, "badge": ""},
    {"n": "BlackBox AI", "signup": "Email, без карты", "quota": "бесплатные completions + 1 запрос/день к моделям",
     "models": "Claude Sonnet, GPT-4o, Gemini",
     "ctx": "128K", "note": "Бесплатный тариф без карты.",
     "score": 58, "badge": ""},
    {"n": "Poe / Perplexity / LMArena", "signup": "Email / Google", "quota": "по подписке, есть free-уровни",
     "models": "большинство премиум-моделей по подписке",
     "ctx": "разный", "note": "Не API для агентов, но мощные модели по подписке без оплаты за токены.",
     "score": 64, "badge": ""},
]

# ------------------------------------------------------------------ market data (2026-10-20 research)
import importlib.util as _ilu
_spec = _ilu.spec_from_file_location("market_data", os.path.join(os.path.dirname(os.path.abspath(__file__)), "market_data.py"))
_market = _ilu.module_from_spec(_spec); _spec.loader.exec_module(_market)

PLANS_MARKET = []
for _p in _market.PLANS_MARKET:
    name, price, quota, tok_m, models, tools, ours, src = _p[:8]
    est = bool(_p[8]) if len(_p) > 8 else False
    PLANS_MARKET.append({
        "name": name, "price": price, "quota": quota, "tokM": tok_m, "models": models,
        "tools": tools, "ours": ours, "src": src, "est": est,
        "eff": round(tok_m / price, 2) if (price and tok_m) else None,
    })

FREE_API = []
for _f in _market.FREE_API:
    name, key, rpm, rpd, tok, card, credit, models, notes, src = _f
    FREE_API.append({
        "name": name, "key": key, "rpm": rpm, "rpd": rpd, "tok": tok, "card": card,
        "credit": credit, "models": models, "notes": notes, "src": src,
        "keyless": key.startswith("НЕТ"),
    })

# ------------------------------------------------------------------ ranking
def rank_providers(providers, families):
    routes_by_provider = {}
    for fam in families:
        for r in fam["routes"]:
            routes_by_provider.setdefault(r["p"], []).append((fam, r))
    out = []
    for p in providers:
        rs = routes_by_provider.get(p["id"], [])
        total = len(rs)
        working = sum(1 for _, r in rs if r["status"] == "working")
        catalog = sum(1 for _, r in rs if r["status"] == "catalog")
        blocked = sum(1 for _, r in rs if r["status"] == "blocked")
        wr = (working / total) if total else 0
        model_norm = min(1.0, (total ** 0.5) / 5.0) if total else 0
        ctx_cap = (p.get("ctxCap") or 0) / 1048576
        bench_vals = [f["bench"]["swe"] for f, _ in rs if f["bench"].get("swe")]
        bench_avg = (sum(bench_vals) / len(bench_vals) / 70.0) if bench_vals else 0
        lim = 0
        if p.get("rpm"):
            lim += min(1.0, p["rpm"] / 40.0) * 0.6
        if p.get("rpd"):
            lim += min(1.0, p["rpd"] / 1000.0) * 0.4
        if p.get("tpd"):
            lim += 0.5
        ease = {"noauth": 1.0, "api": 0.8, "local": 0.7, "oauth": 0.6}.get(p.get("access"), 0.2)
        if p["status"] == "blocked":
            ease = 0.0
        score = 40 * wr + 20 * model_norm + 15 * ctx_cap + 10 * bench_avg + 10 * lim + 5 * ease
        out.append({
            "id": p["id"], "score": round(score, 1), "working": working, "catalog": catalog,
            "blocked": blocked, "total": total, "wr": round(wr * 100),
            "access": p.get("access"), "color": p.get("color"),
            "benchAvg": round(sum(bench_vals) / len(bench_vals), 1) if bench_vals else None,
            "ctxCap": p.get("ctxCap"), "rpm": p.get("rpm"), "rpd": p.get("rpd"),
            "tpd": p.get("tpd"), "card": p.get("card"), "training": p.get("training"),
            "uptime": p.get("uptime"), "status": p["status"], "limits": p.get("limits"),
            "note": p.get("note"),
            "parts": {
                "Работоспособность": round(40 * wr, 1), "Покрытие моделей": round(20 * model_norm, 1),
                "Контекст": round(15 * ctx_cap, 1), "Бенчмарки": round(10 * bench_avg, 1),
                "Лимиты": round(10 * lim, 1), "Доступ": round(5 * ease, 1),
            },
        })
    out.sort(key=lambda x: -x["score"])
    for i, r in enumerate(out, 1):
        r["place"] = i
    return out

RANKING = rank_providers(PROVIDERS, FAMILIES)

DATA = {
    "snapshot": SNAP,
    "providers": PROVIDERS,
    "families": FAMILIES,
    "plans": PLANS,
    "plansMarket": PLANS_MARKET,
    "freeApi": FREE_API,
    "tools": TOOLS,
    "releases": RELEASES,
    "probes": PROBES,
    "ranking": RANKING,
    "taskMatrix": {
        "tasks": ["Кодинг", "Reasoning", "UI", "Vision", "Tools", "Fast Agent", "Stealth", "Long Context", "Планирование"],
        "rows": [
            {"name": "DeepSeek V4.1 Flash", "f": "deepseek-v4.1-flash", "v": [3, 3, 1, 2, 3, 2, 0, 1, 2]},
            {"name": "Ornith 1.5 122B", "f": "ornith-1.5-122b", "v": [3, 3, 1, 2, 3, 2, 0, 2, 2]},
            {"name": "Recursive Flint 1.0", "f": "flint-v1.0", "v": [3, 3, 1, 0, 3, 3, 0, 2, 2]},
            {"name": "Kimi K3", "f": "kimi-k3", "v": [3, 3, 1, 0, 2, 1, 0, 2, 3]},
            {"name": "MiMo V2.6 Pro", "f": "mimo-v2.6-pro", "v": [3, 3, 3, 0, 2, 1, 0, 1, 2]},
            {"name": "MiMo V2.6 Flash", "f": "mimo-v2.6-flash", "v": [2, 2, 3, 0, 2, 3, 0, 1, 1]},
            {"name": "GLM-5.3 Flash", "f": "glm-5.3-flash", "v": [3, 1, 1, 0, 2, 3, 0, 0, 1]},
            {"name": "MiniMax M3.1 Flash", "f": "minimax-m3.1-flash", "v": [3, 2, 1, 2, 3, 3, 0, 2, 1]},
            {"name": "Hy4 Preview", "f": "hy4-preview", "v": [2, 3, 1, 0, 2, 2, 0, 3, 2]},
            {"name": "Nemotron 3.5 Lightning", "f": "nemotron-3.5-lightning", "v": [2, 2, 0, 1, 3, 3, 0, 2, 1]},
            {"name": "Nemotron 3 Ultra / Super VL", "f": "nemotron-3-ultra", "v": [2, 3, 1, 3, 2, 1, 0, 2, 1]},
            {"name": "Laguna S 2.1", "f": "laguna-s-2.1", "v": [2, 1, 0, 0, 1, 1, 0, 1, 0]},
            {"name": "LongCat 2.5 Preview", "f": "longcat-2.5", "v": [2, 2, 0, 0, 1, 1, 0, 3, 1]},
            {"name": "Inkling / Inkling Small", "f": "inkling", "v": [3, 3, 1, 1, 2, 2, 0, 3, 1]},
            {"name": "Gemma 4 26B / 31B", "f": "gemma-4", "v": [1, 2, 0, 0, 1, 1, 0, 1, 0]},
            {"name": "North Mini Code", "f": "north-mini-code", "v": [3, 1, 0, 0, 2, 2, 0, 1, 0]},
            {"name": "Xing 4.0 29B-A4B", "f": "xing-4.0", "v": [1, 2, 0, 0, 1, 1, 0, 1, 0]},
            {"name": "Qwen 3.8 Max / Flash", "f": "qwen-3.8", "v": [2, 3, 1, 1, 2, 2, 0, 1, 2]},
            {"name": "Step 3.7 Flash", "f": "step-3.7-flash", "v": [2, 2, 0, 0, 1, 2, 0, 1, 1]},
            {"name": "Solar Mini4", "f": "solar-mini4", "v": [1, 1, 0, 0, 1, 1, 0, 0, 0]},
            {"name": "DuckDuckGo Cloudflare", "f": "ddgw-free", "v": [1, 2, 0, 0, 1, 2, 0, 1, 0]},
            {"name": "Claude Opus 5.5 / GPT-6.1 / Grok", "f": "claude-opus-5.5", "v": [3, 3, 2, 2, 3, 2, 0, 2, 3]},
            {"name": "Space Bunny / Ox Alpha", "f": "space-bunny", "v": [0, 2, 0, 0, 1, 2, 3, 1, 0]},
            {"name": "Beam / Big Pickle", "f": "beam-pickle", "v": [1, 2, 0, 0, 1, 1, 3, 1, 0]},
            {"name": "LLM7.io free subset", "f": "llm7-free", "v": [2, 2, 1, 0, 2, 2, 0, 1, 0]},
            {"name": "LFM 2.5 2.6B", "f": "lfm-2.5", "v": [0, 0, 0, 0, 0, 1, 0, 0, 0]},
        ],
    },
    "presets": [
        {"id": "working", "label": "Только рабочие", "f": {"status": "Working"}},
        {"id": "ctxmax", "label": "Максимум ctx", "f": {"ctx": "≥1M"}, "sort": "ctx"},
        {"id": "swe", "label": "Лучшие по SWE", "f": {"bench": "SWE ≥60%"}, "sort": "swe"},
        {"id": "noauth", "label": "Без ключа", "f": {"src": "No-Auth"}},
        {"id": "freeonly", "label": "Только free (без preview)", "f": {"type": "Free"}},
        {"id": "stealth", "label": "Stealth / preview", "f": {"type": "Preview"}},
    ],
    "meta": {
        "omnirouteTotal": OMNI["total"],
        "omniroutePrefixes": OMNI["prefixes"],
        "openrouterLiveFree": len(OR_LIVE),
        "nousLiveFree": len(NOUS_LIVE),
    },
}

os.makedirs(OUT, exist_ok=True)
js = "window.FREE_AI_DATA = " + json.dumps(DATA, ensure_ascii=False, indent=1) + ";\n"
with io.open(os.path.join(OUT, "free-ai.js"), "w", encoding="utf-8", newline="\n") as f:
    f.write(js)
print("families:", len(FAMILIES), "| providers:", len(PROVIDERS), "| plans:", len(PLANS),
      "| releases:", len(RELEASES), "| probes:", len(PROBES))
print("routes total:", sum(len(f["routes"]) for f in FAMILIES))
print("ranking top5:", [(r["place"], r["id"], r["score"]) for r in RANKING[:5]])
print("->", os.path.join(OUT, "free-ai.js"))
