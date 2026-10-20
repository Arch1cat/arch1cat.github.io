window.FREE_AI_DATA = {
 "snapshot": "2026-10-20",
 "providers": [
  {
   "id": "OpenRouter",
   "access": "api",
   "status": "working",
   "color": "#00f2fe",
   "limits": "20 RPM / 50 RPD (1000 RPD с $10 top-up)",
   "rpm": 20,
   "rpd": 50,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 1048576,
   "note": "20 zero-price моделей прямо сейчас. Единственный ключ на десятки семейств.",
   "uptime": "99.5%"
  },
  {
   "id": "Nous Portal",
   "access": "api",
   "status": "working",
   "color": "#a78bfa",
   "limits": "RPM/TPM/RPD не раскрыты",
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 1048576,
   "note": "7 :free моделей. Часть требует тег user= в extra_body.tags.",
   "uptime": "97%"
  },
  {
   "id": "OmniRoute / ddgw",
   "access": "noauth",
   "status": "working",
   "color": "#00ff66",
   "limits": "нет явных лимитов; Cloudflare-кеш",
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 262144,
   "note": "DuckDuckGo Cloudflare — 6 моделей БЕЗ подключения и без ключа.",
   "uptime": "95%"
  },
  {
   "id": "OmniRoute / auto",
   "access": "noauth",
   "status": "working",
   "color": "#22c55e",
   "limits": "маршрутизация по free-пулу",
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "varies",
   "ctxCap": 1048576,
   "note": "auto/best-free и auto/coding:free — авто-роутер по бесплатным маршрутам.",
   "uptime": "94%"
  },
  {
   "id": "NVIDIA NIM",
   "access": "api",
   "status": "working",
   "color": "#76b900",
   "limits": "~40 RPM, без дневного капа",
   "rpm": 40,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 1000000,
   "note": "Самый щедрый RPM. Nemotron 3.5 Lightning — PROBE_OK.",
   "uptime": "99%"
  },
  {
   "id": "Freebuff",
   "access": "api",
   "status": "working",
   "color": "#00ff66",
   "limits": "100–150 Freebucks/день (tier)",
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 262144,
   "note": "Локальный прокси :23333. 18 моделей, включая Claude Opus 5.5 и GPT-6.1 Sol.",
   "uptime": "96%"
  },
  {
   "id": "BeatAPI",
   "access": "api",
   "status": "catalog",
   "color": "#f59e0b",
   "limits": "1 RPM без top-up, до 10 RPM после",
   "rpm": 1,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 262144,
   "note": "Слабый RPM — только emergency fallback.",
   "uptime": "93%"
  },
  {
   "id": "OpenCode Free",
   "access": "local",
   "status": "catalog",
   "color": "#84cc16",
   "limits": "дневная квота, точная цифра скрыта",
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 1048576,
   "note": "Только из нативного OpenCode. Внешний CLI → 403 FreeTierError. Прокси :8789 не запущен.",
   "uptime": "90%"
  },
  {
   "id": "OrcaRouter",
   "access": "api",
   "status": "blocked",
   "color": "#ef4444",
   "limits": "10 RPM / 50 RPD (Hy4: 50/250)",
   "rpm": 10,
   "rpd": 50,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 262144,
   "note": "HTTP 429 — нужна GitHub/account eligibility. Модели живые, доступа нет.",
   "uptime": "—"
  },
  {
   "id": "CommandCode",
   "access": "api",
   "status": "blocked",
   "color": "#ef4444",
   "limits": "free-alias требуют credits/entitlement",
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": true,
   "training": "no",
   "ctxCap": 1000000,
   "note": "HTTP 400 insufficient credits. Каталог богатый: DeepSeek, Kimi, MiMo, Hy4, stealth.",
   "uptime": "—"
  },
  {
   "id": "Google AI Studio",
   "access": "api",
   "status": "blocked",
   "color": "#4285f4",
   "limits": "5–15 RPM / 20–1500 RPD",
   "rpm": 10,
   "rpd": 250,
   "tpd": null,
   "card": false,
   "training": "yes (кроме EEA)",
   "ctxCap": 1048576,
   "note": "Ключ есть, но HTTP 429 quota. Gemini Flash до 1M ctx.",
   "uptime": "—"
  },
  {
   "id": "LLM7.io",
   "access": "api",
   "status": "working",
   "color": "#22d3ee",
   "limits": "free-подмножество без баланса; остальное — 402",
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 262144,
   "note": "Ключ уже есть в .env и подключён в Hermes. 67 моделей в каталоге, 7 реально бесплатны.",
   "uptime": "96%"
  },
  {
   "id": "NiloVR",
   "access": "api",
   "status": "working",
   "color": "#f472b6",
   "limits": "2 из 64 моделей доступны бесплатно",
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 262144,
   "note": "Ключ есть в .env, подключён в Hermes. nemotron-3-ultra + laguna-s-2.1 отвечают 200.",
   "uptime": "90%"
  },
  {
   "id": "B.AI",
   "access": "api",
   "status": "blocked",
   "color": "#ef4444",
   "limits": "баланс $0 → 402 на всех моделях",
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": true,
   "training": "no",
   "ctxCap": 200000,
   "note": "Ключ есть, 62 модели (Opus 5.5, Fable 5.1, Haiku 5.5, Gemini 3.8, GPT-6.1 Sol). Нужен депозит.",
   "uptime": "—"
  },
  {
   "id": "GitHub Models / Copilot",
   "access": "oauth",
   "status": "candidate",
   "color": "#a78bfa",
   "limits": "Models: 15 RPM / 150–1000 RPD. Copilot Free: 2000 completions + 50 chat/мес",
   "rpm": 15,
   "rpd": 500,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 128000,
   "note": "GITHUB_TOKEN уже есть. Copilot даёт Claude/GPT/Gemini по подписке GitHub.",
   "uptime": "99%"
  },
  {
   "id": "Groq",
   "access": "api",
   "status": "candidate",
   "color": "#f55036",
   "limits": "30 RPM / 1000 RPD",
   "rpm": 30,
   "rpd": 1000,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 131072,
   "note": "Нужно добавить GROQ_API_KEY. ~320 tok/s на Llama 3.3 70B.",
   "uptime": "99.9%"
  },
  {
   "id": "Cerebras",
   "access": "api",
   "status": "candidate",
   "color": "#ff6b35",
   "limits": "30 RPM / ~1M токенов/день",
   "rpm": 30,
   "rpd": null,
   "tpd": 1000000,
   "card": false,
   "training": "no",
   "ctxCap": 131072,
   "note": "Нужно добавить CEREBRAS_API_KEY. Самая большая дневная квота в токенах.",
   "uptime": "99.9%"
  },
  {
   "id": "Mistral",
   "access": "api",
   "status": "candidate",
   "color": "#ff7000",
   "limits": "~1B токенов/мес (Experiment)",
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "yes (opt-in)",
   "ctxCap": 131072,
   "note": "Нужно добавить MISTRAL_API_KEY. Самая щедрая месячная квота, но с обучением на данных.",
   "uptime": "99%"
  },
  {
   "id": "GitHub Models",
   "access": "oauth",
   "status": "candidate",
   "color": "#a78bfa",
   "limits": "15 RPM / 150–1000 RPD",
   "rpm": 15,
   "rpd": 500,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 128000,
   "note": "GITHUB_TOKEN уже есть. GPT-4o, Claude 3.5 Sonnet, Llama, Phi.",
   "uptime": "99%"
  },
  {
   "id": "Cloudflare Workers AI",
   "access": "api",
   "status": "candidate",
   "color": "#f6821f",
   "limits": "10K нейронов/день (сброс 00:00 UTC)",
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 8192,
   "note": "Малые ctx, но щедро. 20+ моделей.",
   "uptime": "99.9%"
  },
  {
   "id": "SambaNova",
   "access": "api",
   "status": "candidate",
   "color": "#ee7623",
   "limits": "20 RPM / 20 RPD на модель",
   "rpm": 20,
   "rpd": 20,
   "tpd": null,
   "card": true,
   "training": "no",
   "ctxCap": 131072,
   "note": "$5 trial credits.",
   "uptime": "98%"
  },
  {
   "id": "Cohere",
   "access": "api",
   "status": "candidate",
   "color": "#39594d",
   "limits": "~100 RPD, только non-commercial",
   "rpm": 20,
   "rpd": 100,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 131072,
   "note": "Command R+ для RAG.",
   "uptime": "98%"
  },
  {
   "id": "OVH Cloud",
   "access": "noauth",
   "status": "candidate",
   "color": "#123f6d",
   "limits": "2 RPM / IP / модель",
   "rpm": 2,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 131072,
   "note": "Анонимные вызовы без аккаунта. 7 моделей.",
   "uptime": "95%"
  },
  {
   "id": "Requesty",
   "access": "api",
   "status": "candidate",
   "color": "#6366f1",
   "limits": "200 RPD / 20 RPM",
   "rpm": 20,
   "rpd": 200,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 131072,
   "note": ":free модели, низкоприоритетная очередь.",
   "uptime": "96%"
  },
  {
   "id": "Routeway",
   "access": "api",
   "status": "candidate",
   "color": "#10b981",
   "limits": "200 RPD, низкий приоритет",
   "rpm": null,
   "rpd": 200,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 131072,
   "note": ":free модели.",
   "uptime": "95%"
  },
  {
   "id": "Hugging Face",
   "access": "api",
   "status": "candidate",
   "color": "#ff9d00",
   "limits": "community rate limit",
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": null,
   "note": "100K+ OSS моделей через Inference API.",
   "uptime": "98%"
  },
  {
   "id": "AI Horde",
   "access": "noauth",
   "status": "candidate",
   "color": "#ff8c42",
   "limits": "краудсорс, без гарантий",
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 8192,
   "note": "165 моделей в OmniRoute, но это image-gen — на /v1/chat/completions 400.",
   "uptime": "90%"
  },
  {
   "id": "Chutes.ai",
   "access": "api",
   "status": "candidate",
   "color": "#8b5cf6",
   "limits": "community tier",
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 131072,
   "note": "OSS-модели через community tier.",
   "uptime": "95%"
  },
  {
   "id": "ModelScope",
   "access": "api",
   "status": "candidate",
   "color": "#ff6a00",
   "limits": "community tier",
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 131072,
   "note": "Alibaba — Qwen и многое другое.",
   "uptime": "96%"
  },
  {
   "id": "Z AI (Zhipu)",
   "access": "api",
   "status": "candidate",
   "color": "#325ab4",
   "limits": "free tier, без карты",
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 203000,
   "note": "GLM-серия бесплатно.",
   "uptime": "97%"
  },
  {
   "id": "LLM7.io",
   "access": "api",
   "status": "candidate",
   "color": "#22d3ee",
   "limits": "free tier",
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 131072,
   "note": "5 моделей, text+code.",
   "uptime": "90%"
  },
  {
   "id": "Kilo Code",
   "access": "api",
   "status": "candidate",
   "color": "#a3e635",
   "limits": "free tier",
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 131072,
   "note": "4 coding-модели.",
   "uptime": "95%"
  },
  {
   "id": "OVH AI Endpoints",
   "access": "api",
   "status": "candidate",
   "color": "#123f6d",
   "limits": "free tier, без карты",
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 131072,
   "note": "7 моделей, text+code+image.",
   "uptime": "97%"
  },
  {
   "id": "SiliconFlow",
   "access": "api",
   "status": "candidate",
   "color": "#6d28d9",
   "limits": "$1 кредит на .com, free на .cn",
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 131072,
   "note": "6 моделей.",
   "uptime": "96%"
  },
  {
   "id": "Cyrus Relay",
   "access": "api",
   "status": "candidate",
   "color": "#e11d48",
   "limits": "free-tier модели, без аккаунта",
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "ctxCap": 131072,
   "note": "Премиум-тарифы через крипту.",
   "uptime": "88%"
  }
 ],
 "families": [
  {
   "id": "deepseek-v4.1-flash",
   "rank": 1,
   "name": "DeepSeek V4.1 Flash 1017",
   "tasks": [
    "Кодинг",
    "Reasoning",
    "Tools",
    "Vision"
   ],
   "family": "DeepSeek V4.1",
   "ctx": 200000,
   "out": 32000,
   "reasoning": true,
   "bench": {
    "swe": 67.4,
    "he": 89.2,
    "aider": 71.3,
    "livecode": 62.1,
    "arena": 1664,
    "arenaRank": "open №1"
   },
   "routes": [
    {
     "p": "Freebuff",
     "id": "freebuff/deepseek/deepseek-v4.1-flash",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "BeatAPI",
     "id": "deepseek-v4.1-flash-free",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "OpenCode Free",
     "id": "opencode/deepseek-v4.1-flash-free",
     "status": "catalog",
     "type": "free",
     "src": "local"
    },
    {
     "p": "NVIDIA NIM",
     "id": "deepseek-ai/deepseek-v4.1-flash",
     "status": "catalog",
     "type": "free",
     "src": "api"
    },
    {
     "p": "OmniRoute / auto",
     "id": "auto/coding:free",
     "status": "working",
     "type": "free",
     "src": "noauth"
    }
   ]
  },
  {
   "id": "minimax-m3.1-flash",
   "rank": 2,
   "name": "MiniMax M3.1 Flash",
   "tasks": [
    "Кодинг",
    "Fast Agent",
    "Tools"
   ],
   "family": "MiniMax M3",
   "ctx": 1000000,
   "out": 524288,
   "reasoning": true,
   "bench": {
    "swe": 61.8,
    "he": 85.4,
    "aider": 64.2,
    "livecode": 55.2,
    "arena": null,
    "arenaRank": "agent ~№13"
   },
   "routes": [
    {
     "p": "OpenRouter",
     "id": "minimax/minimax-m3.1-flash:free",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "OpenCode Free",
     "id": "opencode/minimax-m3.1-flash-free",
     "status": "catalog",
     "type": "free",
     "src": "local"
    }
   ]
  },
  {
   "id": "kimi-k3",
   "rank": 3,
   "name": "Kimi K3",
   "tasks": [
    "Архитектура",
    "Planning",
    "Big Codebase"
   ],
   "family": "Kimi K3",
   "ctx": 256000,
   "out": 32768,
   "reasoning": true,
   "bench": {
    "swe": 69.3,
    "he": 90.1,
    "aider": 74.2,
    "livecode": 64.5,
    "arena": 1655,
    "arenaRank": "open №2"
   },
   "routes": [
    {
     "p": "Freebuff",
     "id": "freebuff/moonshotai/kimi-k3",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "BeatAPI",
     "id": "kimi-k3",
     "status": "catalog",
     "type": "free",
     "src": "api"
    }
   ]
  },
  {
   "id": "mimo-v2.6-pro",
   "rank": 4,
   "name": "MiMo V2.6 Pro",
   "tasks": [
    "Архитектура",
    "Reasoning",
    "CRM/UI"
   ],
   "family": "MiMo V2.6",
   "ctx": 262144,
   "out": 65536,
   "reasoning": true,
   "bench": {
    "swe": 68.2,
    "he": 91.5,
    "aider": 72.8,
    "livecode": 63.7,
    "arena": 1626,
    "arenaRank": "agent ~№6"
   },
   "routes": [
    {
     "p": "Freebuff",
     "id": "freebuff/mimo/mimo-v2.6-pro",
     "status": "working",
     "type": "free",
     "src": "api"
    }
   ]
  },
  {
   "id": "mimo-v2.6-flash",
   "rank": 5,
   "name": "MiMo V2.6 Flash",
   "tasks": [
    "UI",
    "Frontend",
    "Refactor",
    "Fast Agent"
   ],
   "family": "MiMo V2.6",
   "ctx": 262144,
   "out": 32768,
   "reasoning": true,
   "bench": {
    "swe": 64.1,
    "he": 87.8,
    "aider": 66.9,
    "livecode": 59.3,
    "arena": 1634,
    "arenaRank": "open ~№3"
   },
   "routes": [
    {
     "p": "OpenCode Free",
     "id": "opencode/mimo-v2.6-flash-free",
     "status": "catalog",
     "type": "free",
     "src": "local"
    }
   ]
  },
  {
   "id": "hy4-preview",
   "rank": 6,
   "name": "Hy4 Preview",
   "tasks": [
    "Agent",
    "Reasoning",
    "Large Codebase"
   ],
   "family": "Hy4",
   "ctx": 262144,
   "out": 65536,
   "reasoning": true,
   "bench": {
    "swe": 66.7,
    "he": 88.9,
    "aider": 69.4,
    "livecode": 60.8,
    "arena": 1631,
    "arenaRank": "agent ~№8"
   },
   "routes": [
    {
     "p": "OrcaRouter",
     "id": "tencent/hy4-preview-free",
     "status": "blocked",
     "type": "free",
     "src": "api"
    }
   ]
  },
  {
   "id": "glm-5.3-flash",
   "rank": 7,
   "name": "GLM-5.3 Flash",
   "tasks": [
    "Fast Patch",
    "Small Code",
    "Agent"
   ],
   "family": "GLM-5.3",
   "ctx": 128000,
   "out": 8192,
   "reasoning": true,
   "bench": {
    "swe": 58.4,
    "he": 83.7,
    "aider": 61.2,
    "livecode": 52.1,
    "arena": 1607,
    "arenaRank": null
   },
   "routes": [
    {
     "p": "Freebuff",
     "id": "freebuff/z-ai/glm-5.3-flash",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "BeatAPI",
     "id": "glm-5.3-flash-free",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "OpenCode Free",
     "id": "opencode/glm-5.3-flash-free",
     "status": "catalog",
     "type": "free",
     "src": "local"
    },
    {
     "p": "OrcaRouter",
     "id": "z-ai/glm-5.3-flash-free",
     "status": "blocked",
     "type": "free",
     "src": "api"
    }
   ]
  },
  {
   "id": "nemotron-3.5-lightning",
   "rank": 8,
   "name": "Nemotron 3.5 Lightning",
   "tasks": [
    "Fast Agent",
    "Tools",
    "Coding"
   ],
   "family": "Nemotron 3.5",
   "ctx": 1000000,
   "out": 65536,
   "reasoning": true,
   "bench": {
    "swe": 55.2,
    "he": 81.3,
    "aider": 57.8,
    "livecode": 48.7,
    "arena": null,
    "arenaRank": null
   },
   "routes": [
    {
     "p": "NVIDIA NIM",
     "id": "nvidia/nemotron-3.5-lightning-30b-a3b",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "OpenRouter",
     "id": "nvidia/nemotron-3.5-lightning:free",
     "status": "catalog",
     "type": "free",
     "src": "api"
    },
    {
     "p": "OpenCode Free",
     "id": "opencode/nemotron-3.5-lightning-free",
     "status": "catalog",
     "type": "free",
     "src": "local"
    }
   ]
  },
  {
   "id": "nemotron-3-ultra",
   "rank": 9,
   "name": "Nemotron 3 Ultra / Super VL",
   "tasks": [
    "Reasoning",
    "Vision",
    "Screenshots"
   ],
   "family": "Nemotron 3",
   "ctx": 1000000,
   "out": 131072,
   "reasoning": true,
   "bench": {
    "swe": 63.9,
    "he": 86.2,
    "aider": 67.1,
    "livecode": 58.4,
    "arena": null,
    "arenaRank": "agent ~№16"
   },
   "routes": [
    {
     "p": "OpenRouter",
     "id": "nvidia/nemotron-3-ultra-550b-a55b:free",
     "status": "catalog",
     "type": "free",
     "src": "api"
    },
    {
     "p": "NiloVR",
     "id": "nemotron-3-ultra-550b-a55b",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "OpenRouter",
     "id": "nvidia/nemotron-3.5-super-vl:free",
     "status": "catalog",
     "type": "free",
     "src": "api"
    },
    {
     "p": "OpenCode Free",
     "id": "opencode/nemotron-3-ultra-free",
     "status": "catalog",
     "type": "free",
     "src": "local"
    },
    {
     "p": "NVIDIA NIM",
     "id": "nvidia/nemotron-3-ultra-550b-a55b",
     "status": "catalog",
     "type": "free",
     "src": "api"
    }
   ]
  },
  {
   "id": "laguna-s-2.1",
   "rank": 10,
   "name": "Laguna S 2.1",
   "tasks": [
    "Coding",
    "Patch",
    "Fallback"
   ],
   "family": "Laguna",
   "ctx": 262144,
   "out": 32768,
   "reasoning": true,
   "bench": {
    "swe": 49.8,
    "he": 78.4,
    "aider": 52.3,
    "livecode": 44.1,
    "arena": 1350,
    "arenaRank": null
   },
   "routes": [
    {
     "p": "OpenRouter",
     "id": "poolside/laguna-s-2.1:free",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "Nous Portal",
     "id": "poolside/laguna-s-2.1:free",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "NiloVR",
     "id": "laguna-s-2.1",
     "status": "working",
     "type": "free",
     "src": "api"
    }
   ]
  },
  {
   "id": "laguna-xs-2.1",
   "rank": 11,
   "name": "Laguna XS 2.1",
   "tasks": [
    "Coding",
    "Patch",
    "Fast Agent"
   ],
   "family": "Laguna",
   "ctx": 262144,
   "out": 32768,
   "reasoning": true,
   "bench": {
    "swe": 47.2,
    "he": 76.9,
    "aider": 49.8,
    "livecode": 42.4,
    "arena": null,
    "arenaRank": null
   },
   "routes": [
    {
     "p": "Nous Portal",
     "id": "poolside/laguna-xs-2.1:free",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "OpenRouter",
     "id": "poolside/laguna-xs-2.1:free",
     "status": "catalog",
     "type": "free",
     "src": "api"
    }
   ]
  },
  {
   "id": "longcat-2.5",
   "rank": 12,
   "name": "LongCat 2.5 Preview",
   "tasks": [
    "Long Context",
    "Reasoning",
    "Coding"
   ],
   "family": "LongCat",
   "ctx": 1048576,
   "out": 65536,
   "reasoning": true,
   "bench": {
    "swe": 52.1,
    "he": 79.8,
    "aider": 54.6,
    "livecode": 46.3,
    "arena": null,
    "arenaRank": null
   },
   "routes": [
    {
     "p": "Nous Portal",
     "id": "meituan/longcat-2.5-preview:free",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "OpenCode Free",
     "id": "opencode/longcat-2.5-preview-free",
     "status": "catalog",
     "type": "free",
     "src": "local"
    }
   ]
  },
  {
   "id": "step-3.7-flash",
   "rank": 13,
   "name": "Step 3.7 Flash",
   "tasks": [
    "Кодинг",
    "Fast Agent",
    "Reasoning"
   ],
   "family": "Step",
   "ctx": 131072,
   "out": 32768,
   "reasoning": true,
   "bench": {
    "swe": null,
    "he": null,
    "aider": null,
    "livecode": null,
    "arena": null,
    "arenaRank": null
   },
   "routes": [
    {
     "p": "Nous Portal",
     "id": "stepfun/step-3.7-flash:free",
     "status": "working",
     "type": "free",
     "src": "api"
    }
   ]
  },
  {
   "id": "solar-mini4",
   "rank": 14,
   "name": "Solar Mini4",
   "tasks": [
    "Кодинг",
    "Fast Agent",
    "Multilingual"
   ],
   "family": "Solar",
   "ctx": 131072,
   "out": 32768,
   "reasoning": false,
   "bench": {
    "swe": null,
    "he": null,
    "aider": null,
    "livecode": null,
    "arena": null,
    "arenaRank": null
   },
   "routes": [
    {
     "p": "Nous Portal",
     "id": "upstage/solar-mini4:free",
     "status": "working",
     "type": "free",
     "src": "api"
    }
   ]
  },
  {
   "id": "inkling",
   "rank": 15,
   "name": "Inkling / Inkling Small",
   "tasks": [
    "Кодинг",
    "Reasoning",
    "Fast Agent"
   ],
   "family": "Thinking Machines",
   "ctx": 1048576,
   "out": 262144,
   "reasoning": true,
   "bench": {
    "swe": 63.1,
    "he": 86.7,
    "aider": 66.2,
    "livecode": 57.8,
    "arena": null,
    "arenaRank": "WebDev 1600+"
   },
   "routes": [
    {
     "p": "OpenRouter",
     "id": "thinkingmachines/inkling:free",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "OpenRouter",
     "id": "thinkingmachines/inkling-small:free",
     "status": "working",
     "type": "free",
     "src": "api"
    }
   ]
  },
  {
   "id": "gemma-4",
   "rank": 16,
   "name": "Gemma 4 26B / 31B",
   "tasks": [
    "Reasoning",
    "Multilingual",
    "Fast Agent"
   ],
   "family": "Gemma 4",
   "ctx": 262144,
   "out": 32768,
   "reasoning": true,
   "bench": {
    "swe": 60.2,
    "he": 84.9,
    "aider": 63.1,
    "livecode": 54.1,
    "arena": null,
    "arenaRank": null
   },
   "routes": [
    {
     "p": "OpenRouter",
     "id": "google/gemma-4-26b-a4b-it:free",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "OpenRouter",
     "id": "google/gemma-4-31b-it:free",
     "status": "catalog",
     "type": "free",
     "src": "api"
    }
   ]
  },
  {
   "id": "north-mini-code",
   "rank": 17,
   "name": "North Mini Code",
   "tasks": [
    "Кодинг",
    "Fast Patch",
    "Tools"
   ],
   "family": "Cohere North",
   "ctx": 256000,
   "out": 64000,
   "reasoning": true,
   "bench": {
    "swe": 58.8,
    "he": 84.1,
    "aider": 62.4,
    "livecode": 55.6,
    "arena": null,
    "arenaRank": null
   },
   "routes": [
    {
     "p": "OpenRouter",
     "id": "cohere/north-mini-code:free",
     "status": "working",
     "type": "free",
     "src": "api"
    }
   ]
  },
  {
   "id": "xing-4.0",
   "rank": 18,
   "name": "Xing 4.0 29B-A4B",
   "tasks": [
    "Reasoning",
    "Multilingual"
   ],
   "family": "Xing",
   "ctx": 262144,
   "out": 235929,
   "reasoning": true,
   "bench": {
    "swe": 54.3,
    "he": 81.6,
    "aider": 58.2,
    "livecode": 50.4,
    "arena": null,
    "arenaRank": null
   },
   "routes": [
    {
     "p": "OpenRouter",
     "id": "xingchen-agi/xing4.0-29b-a4b:free",
     "status": "working",
     "type": "free",
     "src": "api"
    }
   ]
  },
  {
   "id": "lfm-2.5",
   "rank": 19,
   "name": "LFM 2.5 2.6B",
   "tasks": [
    "Fast Agent",
    "Edge"
   ],
   "family": "Liquid",
   "ctx": 65536,
   "out": 8192,
   "reasoning": false,
   "bench": {
    "swe": 38.2,
    "he": 68.4,
    "aider": 41.7,
    "livecode": 35.9,
    "arena": null,
    "arenaRank": null
   },
   "routes": [
    {
     "p": "OpenRouter",
     "id": "liquid/lfm-2.5-2.6b:free",
     "status": "working",
     "type": "free",
     "src": "api"
    }
   ]
  },
  {
   "id": "qwen-3.8",
   "rank": 20,
   "name": "Qwen 3.8 Max / Flash",
   "tasks": [
    "Reasoning",
    "Multilingual",
    "Кодинг"
   ],
   "family": "Qwen 3.8",
   "ctx": 262144,
   "out": 32768,
   "reasoning": true,
   "bench": {
    "swe": 65.3,
    "he": 88.1,
    "aider": 68.7,
    "livecode": 61.2,
    "arena": null,
    "arenaRank": "agent ~№11"
   },
   "routes": [
    {
     "p": "Freebuff",
     "id": "freebuff/qwen/qwen3.8-max",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "Freebuff",
     "id": "freebuff/qwen/qwen3.8-flash",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "BeatAPI",
     "id": "qwen3.8-max",
     "status": "catalog",
     "type": "free",
     "src": "api"
    }
   ]
  },
  {
   "id": "claude-opus-5.5",
   "rank": 21,
   "name": "Claude Opus 5.5 / GPT-6.1 Sol / Grok 4.7",
   "tasks": [
    "Deep Review",
    "Архитектура",
    "Reasoning"
   ],
   "family": "Commercial",
   "ctx": 200000,
   "out": 32000,
   "reasoning": true,
   "bench": {
    "swe": 72.1,
    "he": 93.4,
    "aider": 76.8,
    "livecode": 67.9,
    "arena": null,
    "arenaRank": "Opus agent №1; Grok ~№7"
   },
   "routes": [
    {
     "p": "Freebuff",
     "id": "freebuff/anthropic/claude-opus-5.5",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "Freebuff",
     "id": "freebuff/openai/gpt-6.1-sol",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "Freebuff",
     "id": "freebuff/x-ai/grok-4.7",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "Freebuff",
     "id": "freebuff/google/gemini-3.8-flash",
     "status": "working",
     "type": "free",
     "src": "api"
    }
   ]
  },
  {
   "id": "space-bunny",
   "rank": 22,
   "name": "Space Bunny / Ox Alpha",
   "tasks": [
    "Stealth",
    "Experiment",
    "Fast Agent"
   ],
   "family": "Stealth",
   "ctx": 262144,
   "out": 32768,
   "reasoning": true,
   "bench": {
    "swe": null,
    "he": null,
    "aider": null,
    "livecode": null,
    "arena": null,
    "arenaRank": null
   },
   "routes": [
    {
     "p": "Freebuff",
     "id": "freebuff/stealth/space-bunny-alpha",
     "status": "working",
     "type": "stealth",
     "src": "api"
    },
    {
     "p": "Freebuff",
     "id": "freebuff/stealth/ox-alpha",
     "status": "working",
     "type": "stealth",
     "src": "api"
    },
    {
     "p": "OpenCode Free",
     "id": "opencode/space-bunny-free",
     "status": "catalog",
     "type": "preview",
     "src": "local"
    }
   ]
  },
  {
   "id": "beam-pickle",
   "rank": 23,
   "name": "Beam / Big Pickle / Cat Jam / Glyph",
   "tasks": [
    "Stealth",
    "Reasoning",
    "Experiment"
   ],
   "family": "Stealth",
   "ctx": 262144,
   "out": 32768,
   "reasoning": true,
   "bench": {
    "swe": null,
    "he": null,
    "aider": null,
    "livecode": null,
    "arena": null,
    "arenaRank": null
   },
   "routes": [
    {
     "p": "Nous Portal",
     "id": "reflection/beam-1.0-501b-a23b:free",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "OpenCode Free",
     "id": "opencode/beam-free",
     "status": "catalog",
     "type": "free",
     "src": "local"
    },
    {
     "p": "OpenCode Free",
     "id": "opencode/big-pickle",
     "status": "catalog",
     "type": "free",
     "src": "local"
    }
   ]
  },
  {
   "id": "ddgw-free",
   "rank": 24,
   "name": "DuckDuckGo Cloudflare Free",
   "tasks": [
    "Fast Agent",
    "Reasoning",
    "Кодинг"
   ],
   "family": "NoAuth",
   "ctx": 262144,
   "out": 16384,
   "reasoning": true,
   "bench": {
    "swe": 56.1,
    "he": 82.7,
    "aider": 59.8,
    "livecode": 52.4,
    "arena": null,
    "arenaRank": null
   },
   "routes": [
    {
     "p": "OmniRoute / ddgw",
     "id": "ddgw/gpt-5.4-mini",
     "status": "working",
     "type": "free",
     "src": "noauth"
    },
    {
     "p": "OmniRoute / ddgw",
     "id": "ddgw/gpt-5.6-luna",
     "status": "working",
     "type": "free",
     "src": "noauth"
    },
    {
     "p": "OmniRoute / ddgw",
     "id": "ddgw/claude-haiku-4-5",
     "status": "working",
     "type": "free",
     "src": "noauth"
    },
    {
     "p": "OmniRoute / ddgw",
     "id": "ddgw/mistral-small-2603",
     "status": "working",
     "type": "free",
     "src": "noauth"
    },
    {
     "p": "OmniRoute / ddgw",
     "id": "ddgw/tinfoil/gpt-oss-120b",
     "status": "working",
     "type": "free",
     "src": "noauth"
    },
    {
     "p": "OmniRoute / ddgw",
     "id": "ddgw/tinfoil/gemma4-31b",
     "status": "working",
     "type": "free",
     "src": "noauth"
    }
   ]
  },
  {
   "id": "lyria-3",
   "rank": 25,
   "name": "Lyria 3 Clip / Pro (audio)",
   "tasks": [
    "Audio",
    "Music"
   ],
   "family": "Lyria",
   "ctx": 1048576,
   "out": 65536,
   "reasoning": false,
   "bench": {
    "swe": null,
    "he": null,
    "aider": null,
    "livecode": null,
    "arena": null,
    "arenaRank": null
   },
   "routes": [
    {
     "p": "OpenRouter",
     "id": "google/lyria-3-clip-preview",
     "status": "blocked",
     "type": "preview",
     "src": "api"
    },
    {
     "p": "OpenRouter",
     "id": "google/lyria-3-pro-preview",
     "status": "blocked",
     "type": "preview",
     "src": "api"
    }
   ]
  },
  {
   "id": "dots-3-note",
   "rank": 26,
   "name": "Dots 3 Note Preview",
   "tasks": [
    "Notes",
    "Reasoning",
    "Fast Agent"
   ],
   "family": "Dots",
   "ctx": 512000,
   "out": 460800,
   "reasoning": true,
   "bench": {
    "swe": 59.6,
    "he": 85.3,
    "aider": 63.9,
    "livecode": 56.7,
    "arena": null,
    "arenaRank": null
   },
   "routes": [
    {
     "p": "OpenRouter",
     "id": "dots-studio/dots-3-note-preview:free",
     "status": "working",
     "type": "preview",
     "src": "api"
    }
   ]
  },
  {
   "id": "openrouter-free",
   "rank": 27,
   "name": "OpenRouter / free (auto-router)",
   "tasks": [
    "Кодинг",
    "Reasoning",
    "Fast Agent"
   ],
   "family": "OpenRouter",
   "ctx": 200000,
   "out": 32768,
   "reasoning": true,
   "bench": {
    "swe": 55.0,
    "he": 83.0,
    "aider": 59.0,
    "livecode": 51.0,
    "arena": null,
    "arenaRank": null
   },
   "routes": [
    {
     "p": "OpenRouter",
     "id": "openrouter/free",
     "status": "working",
     "type": "free",
     "src": "api"
    }
   ]
  },
  {
   "id": "llm7-free",
   "rank": 28,
   "name": "LLM7.io free subset",
   "tasks": [
    "Кодинг",
    "Fast Agent",
    "Reasoning"
   ],
   "family": "LLM7",
   "ctx": 262144,
   "out": 32768,
   "reasoning": true,
   "bench": {
    "swe": 55.4,
    "he": 82.3,
    "aider": 58.9,
    "livecode": 51.2,
    "arena": null,
    "arenaRank": null
   },
   "routes": [
    {
     "p": "LLM7.io",
     "id": "GLM-5.3-Flash",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "LLM7.io",
     "id": "DeepSeek-V4-Flash-0731",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "LLM7.io",
     "id": "gpt-oss:20b",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "LLM7.io",
     "id": "nemotron-3-nano:30b",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "LLM7.io",
     "id": "mistral-Nemo-Instruct-2407",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "LLM7.io",
     "id": "codestral-latest",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "LLM7.io",
     "id": "minimax-m2.7",
     "status": "working",
     "type": "free",
     "src": "api"
    }
   ]
  },
  {
   "id": "content-safety",
   "rank": 29,
   "name": "Content Safety / Nemotron Nano",
   "tasks": [
    "Safety",
    "Classification"
   ],
   "family": "Specialized",
   "ctx": 128000,
   "out": 8192,
   "reasoning": false,
   "bench": {
    "swe": null,
    "he": null,
    "aider": null,
    "livecode": null,
    "arena": null,
    "arenaRank": null
   },
   "routes": [
    {
     "p": "OpenRouter",
     "id": "nvidia/nemotron-3.5-content-safety:free",
     "status": "working",
     "type": "free",
     "src": "api"
    },
    {
     "p": "OpenRouter",
     "id": "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
     "status": "working",
     "type": "free",
     "src": "api"
    }
   ]
  }
 ],
 "plans": [
  {
   "name": "Nous Portal Free",
   "price": "$0",
   "kind": "Free tier",
   "includes": "Все бесплатные модели Nous: LongCat 2.5, Laguna S/XS 2.1, Beam 501B, Step 3.7 Flash, Solar Mini4 + preview. Каталог портала — 248 моделей (325 с embeddings)",
   "allowance": "50 RPM / 500K TPM. Только free-модели — платные через портал недоступны",
   "tokens": "Без лимита токенов, но жёсткий RPM",
   "verdict": "Наш основной Nous-маршрут. Работает в Hermes",
   "score": 89
  },
  {
   "name": "Nous Portal Plus",
   "price": "$20/мес",
   "kind": "Подписка",
   "includes": "Полный каталог Portal: Kimi K2.7, GLM-5.3, MiniMax M3.1, DeepSeek V4.1, Mistral Large 4, Nemotron 3.5 + Tool Gateway",
   "allowance": "$22 кредитов в месяц, rollover-кап $10. 400 RPM / 4M TPM",
   "tokens": "$22 кредитов ≈ 7.3M токенов Claude Haiku 4.5",
   "verdict": "Дешевле всех подписок при больших лимитах",
   "score": 91
  },
  {
   "name": "Nous Portal Super",
   "price": "$100/мес",
   "kind": "Подписка",
   "includes": "Тот же полный каталог + Tool Gateway",
   "allowance": "$110 кредитов, rollover-кап $50. 800 RPM / 8M TPM",
   "tokens": "$110 ≈ 36.7M токенов Claude Haiku 4.5",
   "verdict": "Для тяжёлых агентных прогонов",
   "score": 84
  },
  {
   "name": "Nous Portal Ultra",
   "price": "$200/мес",
   "kind": "Подписка",
   "includes": "Максимальный каталог и лимиты",
   "allowance": "$220 кредитов, rollover-кап $100. 1600 RPM / 16M TPM",
   "tokens": "$220 ≈ 73.3M токенов Claude Haiku 4.5",
   "verdict": "Максимум RPM в одном месте",
   "score": 76
  },
  {
   "name": "Nous PAYG (без плана)",
   "price": "по факту",
   "kind": "Оплата по факту",
   "includes": "Любая модель каталога, оплата с баланса",
   "allowance": "180 RPM / 720K TPM. Скидка 10% на Anthropic и OpenAI от публичных цен",
   "tokens": "Оплата только за использованное",
   "verdict": "Без месячной платы — для нерегулярного usage",
   "score": 72
  },
  {
   "name": "OpenCode Go",
   "price": "$10/мес",
   "kind": "API-подписка",
   "includes": "DeepSeek V4.1 Flash (off-peak $0.15/$0.60 за 1M), MiMo-V2.5-Pro, MiniMax M3, Muse Spark Contributor, Qwen3.8 Flash, Kimi K2.7 Code, GLM-5.2, LongCat 2.5 Preview Free",
   "allowance": "Лимиты в $ на модель: $60 (GLM-5.3-Flash, Kimi K2.7 Code, MiMo-V2.5, MiniMax M3, Qwen3.7 Plus, DeepSeek V4.1 Flash) или $15 (Kimi K3, GLM-5.3, Qwen3.8 Max, GPT-6 Luna, Claude Haiku 5.5). Окно 5ч = 20%, неделя = 50%, месяц = 100%.",
   "tokens": "≈34 670 запросов DeepSeek V4.1 Flash за 5ч (410 in + 71 300 cached + 310 out на запрос)",
   "verdict": "Лучшее соотношение цена/объём для кодинга",
   "score": 92
  },
  {
   "name": "OpenCode Go Plus",
   "price": "$40/мес",
   "kind": "API-подписка",
   "includes": "Те же модели, повышенные лимиты",
   "allowance": "DeepSeek V4.1 Flash $160, Kimi K3 $60, GLM-5.3 $120 за месяц. ≈69 330 запросов за 5ч.",
   "tokens": "≈69 330 запросов DeepSeek V4.1 Flash за 5ч",
   "verdict": "Если Go не хватает",
   "score": 84
  },
  {
   "name": "OpenRouter (пополнение)",
   "price": "$10 разово",
   "kind": "Кредиты",
   "includes": "Все 20 zero-price моделей без изменений + рост дневного лимита",
   "allowance": "50 RPD → 1000 RPD на free-моделях. Комиссия платформы 5.5%.",
   "tokens": "1000 запросов/день на всём free-пуле",
   "verdict": "Лучший апгрейд именно для бесплатного пула",
   "score": 95
  },
  {
   "name": "Google AI Pro",
   "price": "$19.99/мес",
   "kind": "Подписка",
   "includes": "Gemini 3.8 Flash, Gemini 3.1 Pro (2M ctx), Opus 5.5, Sonnet 5.5, Antigravity, 5 TB, YouTube Premium Lite, $10 Cloud-credits, 1000 Flow-credits",
   "allowance": "4x от free-tier. Общий токен-пул Gemini, списывается по API-ценам. Обновление каждые 5 часов до недельного капа.",
   "tokens": "Не опубликовано абсолютно — 4x от free",
   "verdict": "У нас уже активен через Antigravity",
   "score": 90
  },
  {
   "name": "Google AI Ultra",
   "price": "$99.99/мес",
   "kind": "Подписка",
   "includes": "5x лимитов AI Pro + Deep Think + Gemini Spark + 20 TB + YouTube Premium + $40 Cloud-credits + 10 000 Flow-credits",
   "allowance": "5x AI Pro по токен-пулу. Обновление каждые 5 часов, недельный кап сверху.",
   "tokens": "5x от AI Pro (≈20x от free)",
   "verdict": "Максимум свободы, дорого",
   "score": 78
  },
  {
   "name": "Google AI Ultra 20x",
   "price": "$199.99/мес",
   "kind": "Подписка",
   "includes": "20x AI Pro, 25 000 Flow-credits, тот же bundle",
   "allowance": "20x AI Pro по токен-пулу",
   "tokens": "20x от AI Pro (≈80x от free)",
   "verdict": "Для тех, кто жжёт токены",
   "score": 66
  },
  {
   "name": "Claude Pro",
   "price": "$20/мес",
   "kind": "Подписка",
   "includes": "Opus 5.5, Sonnet 5.5, Fable 5.1, Claude Code",
   "allowance": "5-часовые сессии + недельные капы. С 15 июня 2026 — отдельный месячный кредит для Claude Code / Agent SDK / `claude -p` по полным API-ценам. Не переносится.",
   "tokens": "Кредит = цена плана ($20)",
   "verdict": "Качество кода",
   "score": 86
  },
  {
   "name": "Claude Max 5x",
   "price": "$100/мес",
   "kind": "Подписка",
   "includes": "5x Pro-сессии, Fable 5.1 до 50% недельного лимита",
   "allowance": "5-часовые окна + недельные капы. Сброс 5-часовых окон — каждые 5 часов, недельный — фиксированный день.",
   "tokens": "5x Pro",
   "verdict": "Для Claude Code",
   "score": 74
  },
  {
   "name": "Claude Max 20x",
   "price": "$200/мес",
   "kind": "Подписка",
   "includes": "20x Pro-сессии",
   "allowance": "Те же окна, больше объём",
   "tokens": "20x Pro",
   "verdict": "Дорого",
   "score": 62
  },
  {
   "name": "ChatGPT Pro",
   "price": "$200/мес",
   "kind": "Подписка",
   "includes": "GPT-6 Astra, GPT-6 Sol, GPT-5.6, Codex (CLI/IDE/cloud)",
   "allowance": "Per-model message ranges за 5 часов + недельные лимиты. 100–900 локальных сообщений за 5ч у Astra.",
   "tokens": "100–900 сообщений / 5ч",
   "verdict": "Новые регистрации приостановлены с 10.09",
   "score": 60
  },
  {
   "name": "Cerebras free",
   "price": "$0",
   "kind": "Free tier",
   "includes": "Llama 3.3 70B и другие",
   "allowance": "30 RPM, ~1M токенов/день",
   "tokens": "≈1M токенов/день",
   "verdict": "Нужна карта для активации",
   "score": 88
  },
  {
   "name": "Mistral Experiment",
   "price": "$0",
   "kind": "Free tier",
   "includes": "Mistral Large, Small, Codestral",
   "allowance": "≈1B токенов/мес. Opt-in на обучение данных. Только «try and explore».",
   "tokens": "≈1B токенов/мес",
   "verdict": "Самая большая месячная квота",
   "score": 85
  },
  {
   "name": "Groq free",
   "price": "$0",
   "kind": "Free tier",
   "includes": "Llama 3.3 70B (~320 tok/s), Mixtral, GPT-OSS",
   "allowance": "30 RPM / 1000 RPD. Нужна верификация телефона.",
   "tokens": "1000 запросов/день",
   "verdict": "Максимальная скорость",
   "score": 87
  },
  {
   "name": "Google AI Studio free",
   "price": "$0",
   "kind": "Free tier",
   "includes": "Gemini 2.5 Flash / Flash-Lite / Pro (лимитированно), Gemma",
   "allowance": "5–15 RPM, 20–1500 RPD. Данные могут использоваться для улучшения продуктов Google вне EEA/UK/CH.",
   "tokens": "до 1M ctx",
   "verdict": "У нас 429 — ключ есть, quota сломана",
   "score": 70
  },
  {
   "name": "Cloudflare Workers AI free",
   "price": "$0",
   "kind": "Free tier",
   "includes": "20+ моделей (в т.ч. Llama, SD, Whisper)",
   "allowance": "10 000 нейронов/день, сброс 00:00 UTC. Overage на Workers Paid: $0.011 / 1000 нейронов.",
   "tokens": "10K нейронов/день",
   "verdict": "Отличный edge-вариант",
   "score": 80
  },
  {
   "name": "GitHub Models free",
   "price": "$0",
   "kind": "Free tier",
   "includes": "GPT-4o, Claude 3.5 Sonnet, Llama, Phi",
   "allowance": "15 RPM, 150–1000 RPD. Azure-backed OpenAI-совместимый endpoint.",
   "tokens": "до 1000 RPD",
   "verdict": "GITHUB_TOKEN уже есть — можно подключить",
   "score": 82
  }
 ],
 "plansMarket": [
  {
   "name": "Nous Portal Free",
   "price": 0,
   "quota": "50 RPM / 500K TPM · только free-модели",
   "tokM": 0,
   "models": "LongCat 2.5 · Laguna S/XS · Beam 501B · Step 3.7 Flash · Solar Mini4",
   "tools": "Hermes, все OpenAI-клиенты",
   "ours": true,
   "src": "nousresearch.com",
   "eff": null
  },
  {
   "name": "Nous Portal Plus",
   "price": 20,
   "quota": "$22 кредитов/мес · rollover $10 · 400 RPM / 4M TPM",
   "tokM": 7.3,
   "models": "Полный каталог портала: Kimi K3, GLM-5.3, MiniMax M3.1, DeepSeek V4.1, Nemotron 3.5",
   "tools": "Hermes, все OpenAI-клиенты",
   "ours": true,
   "src": "nousresearch.com",
   "eff": 0.36
  },
  {
   "name": "Nous Portal Super",
   "price": 100,
   "quota": "$110 кредитов · rollover $50 · 800 RPM / 8M TPM",
   "tokM": 36.7,
   "models": "Полный каталог + Tool Gateway",
   "tools": "Hermes, все OpenAI-клиенты",
   "ours": true,
   "src": "nousresearch.com",
   "eff": 0.37
  },
  {
   "name": "Nous Portal Ultra",
   "price": 200,
   "quota": "$220 кредитов · rollover $100 · 1600 RPM / 16M TPM",
   "tokM": 73.3,
   "models": "Полный каталог, максимум RPM",
   "tools": "Hermes, все OpenAI-клиенты",
   "ours": true,
   "src": "nousresearch.com",
   "eff": 0.37
  },
  {
   "name": "OpenCode Go",
   "price": 10,
   "quota": "$12 / 5ч · $30 / нед · $60 / мес на модель (V4.1 Flash $80)",
   "tokM": 24.0,
   "models": "DeepSeek V4.1 Flash · Kimi K3 · GLM-5.3-Flash · MiMo V2.6 Flash · MiniMax M3 · Qwen3.8 · GPT-6 Luna",
   "tools": "opencode, Cline, любой OpenAI-клиент",
   "ours": true,
   "src": "opencode.ai",
   "eff": 2.4
  },
  {
   "name": "OpenCode Go Plus",
   "price": 40,
   "quota": "те же ставки, потолки $60–$240 на модель",
   "tokM": 64.0,
   "models": "те же + Gemini 4 Argon ($240), V4.1 Flash $160",
   "tools": "opencode, Cline, любой OpenAI-клиент",
   "ours": true,
   "src": "opencode.ai",
   "eff": 1.6
  },
  {
   "name": "OmniRoute (локальный шлюз)",
   "price": 0,
   "quota": "no-auth пулы: ddgw 6 моделей, auto/* роутер, 1292 модели в 17 префиксах",
   "tokM": 0,
   "models": "GPT-5.4 Mini · GPT-5.6 Luna · Claude Haiku 4.5 · Mistral Small · GPT-OSS 120B · Gemma4 31B",
   "tools": "Hermes, OpenAI-совместимые",
   "ours": true,
   "src": "localhost:20128",
   "eff": null
  },
  {
   "name": "CommandCode Go",
   "price": 1,
   "quota": "базовый пакет — самый дешёвый вход в рынок",
   "tokM": 0.5,
   "models": "GLM-5.3-Flash · DeepSeek V4 Pro · GPT-6 Luna + 50 моделей",
   "tools": "command-code CLI",
   "ours": true,
   "src": "commandcode.ai",
   "eff": 0.5
  },
  {
   "name": "CommandCode GOAT",
   "price": 10,
   "quota": "1B токенов/мес (обсуждается как 88% месячного лимита)",
   "tokM": 1000.0,
   "models": "GLM-5.3 · GLM-5.2 · GLM-5.3-Flash + 60",
   "tools": "command-code CLI",
   "ours": true,
   "src": "commandcode.ai",
   "eff": 100.0
  },
  {
   "name": "CommandCode Pro",
   "price": 20,
   "quota": "средний пакет, больше моделей",
   "tokM": 0,
   "models": "GLM-5.3-Flash · DeepSeek V4 Pro · GPT-6 Sol + 74",
   "tools": "command-code CLI",
   "ours": true,
   "src": "commandcode.ai",
   "eff": null
  },
  {
   "name": "CommandCode Max 10x",
   "price": 100,
   "quota": "10× базового, 84+ модели",
   "tokM": 0,
   "models": "GLM-5.3-Flash · DeepSeek V4 Pro/Flash + 84",
   "tools": "command-code CLI",
   "ours": true,
   "src": "commandcode.ai",
   "eff": null
  },
  {
   "name": "Nous PAYG (без подписки)",
   "price": 0,
   "quota": "180 RPM / 720K TPM · скидка 10% на Anthropic и OpenAI",
   "tokM": 0,
   "models": "любая модель каталога по факту",
   "tools": "Hermes, все клиенты",
   "ours": true,
   "src": "nousresearch.com",
   "eff": null
  },
  {
   "name": "GLM Coding Plan Lite",
   "price": 18,
   "quota": "2 000 кредитов / 5ч · 10 000 / нед (годовой $12.60)",
   "tokM": 0,
   "models": "GLM-5.3 · GLM-5.3-Flash, ctx 1M, off-peak 50%",
   "tools": "Claude Code, Codex, opencode, Cursor, ZCode",
   "ours": false,
   "src": "z.ai",
   "eff": null
  },
  {
   "name": "GLM Coding Plan Pro",
   "price": 80,
   "quota": "12 000 / 5ч · 60 000 / нед (годовой $56)",
   "tokM": 0,
   "models": "GLM-5.3 · GLM-5.3-Flash, 1M ctx",
   "tools": "20+ инструментов",
   "ours": false,
   "src": "z.ai",
   "eff": null
  },
  {
   "name": "GLM Coding Plan Max",
   "price": 168,
   "quota": "28 000 / 5ч · 140 000 / нед (годовой $117.60)",
   "tokM": 0,
   "models": "GLM-5.3 · GLM-5.3-Flash",
   "tools": "20+ инструментов",
   "ours": false,
   "src": "z.ai",
   "eff": null
  },
  {
   "name": "Alibaba Coding Plan Pro",
   "price": 50,
   "quota": "6 000 запросов / 5ч · 45 000 / нед · 90 000 / мес",
   "tokM": 0,
   "models": "qwen3.7-plus · qwen3.6-plus · kimi-k2.5 · glm-5 · MiniMax-M2.5",
   "tools": "Claude Code, Codex, opencode, Cursor, Qwen Code, Hermes",
   "ours": false,
   "src": "alibabacloud.com",
   "eff": null
  },
  {
   "name": "Kimi Plus",
   "price": 19,
   "quota": "1× агент-кредиты + Kimi Code",
   "tokM": 0,
   "models": "Kimi K3 · K2.8 Preview · K2.7 Code HighSpeed",
   "tools": "Kimi Code, Claude Code",
   "ours": false,
   "src": "moonshot.ai",
   "eff": null
  },
  {
   "name": "Kimi Pro",
   "price": 39,
   "quota": "2× агент-кредиты",
   "tokM": 0,
   "models": "Kimi K3 · K2.8 Preview",
   "tools": "Kimi Code, Claude Code",
   "ours": false,
   "src": "moonshot.ai",
   "eff": null
  },
  {
   "name": "Kimi Max",
   "price": 99,
   "quota": "5× агент-кредиты · ctx 1M",
   "tokM": 0,
   "models": "Kimi K3 (2.8T) · K3-256K · K2.8 Preview",
   "tools": "Kimi Code, Claude Code",
   "ours": false,
   "src": "moonshot.ai",
   "eff": null
  },
  {
   "name": "Kimi Ultra",
   "price": 199,
   "quota": "10× агент-кредиты · ctx 1M",
   "tokM": 0,
   "models": "Kimi K3 + Kimi Claw",
   "tools": "Kimi Code, Claude Code",
   "ours": false,
   "src": "moonshot.ai",
   "eff": null
  },
  {
   "name": "MiniMax M Plan Go",
   "price": 18,
   "quota": "базовый, годовая оплата $220 (2 мес бесплатно)",
   "tokM": 0,
   "models": "MiniMax M3.1 Flash Preview",
   "tools": "Claude Code, Codex, opencode",
   "ours": false,
   "src": "minimax.io",
   "eff": null
  },
  {
   "name": "MiniMax M Plan Explore",
   "price": 46,
   "quota": "3× Go, годовая $550",
   "tokM": 0,
   "models": "MiniMax M3.1 Flash Preview",
   "tools": "то же",
   "ours": false,
   "src": "minimax.io",
   "eff": null
  },
  {
   "name": "MiniMax M Plan Build",
   "price": 110,
   "quota": "7.5× Go + приоритет в пик, годовая $1320",
   "tokM": 0,
   "models": "MiniMax M3.1 Flash Preview",
   "tools": "то же",
   "ours": false,
   "src": "minimax.io",
   "eff": null
  },
  {
   "name": "Qwen Cloud Lite",
   "price": 8,
   "quota": "кредиты, off-peak 22:00–08:00 UTC+8 скидки 25–60%",
   "tokM": 0,
   "models": "qwen3.8-max · qwen3.8-flash · deepseek-v4-pro-0813",
   "tools": "любой OpenAI-клиент",
   "ours": false,
   "src": "alibabacloud.com",
   "eff": null
  },
  {
   "name": "Qwen Cloud Standard",
   "price": 25,
   "quota": "больше кредитов + те же скидки",
   "tokM": 0,
   "models": "те же + qwen3.8-flash",
   "tools": "любой OpenAI-клиент",
   "ours": false,
   "src": "alibabacloud.com",
   "eff": null
  },
  {
   "name": "Qwen Cloud Pro",
   "price": 80,
   "quota": "максимум кредитов",
   "tokM": 0,
   "models": "те же",
   "tools": "любой OpenAI-клиент",
   "ours": false,
   "src": "alibabacloud.com",
   "eff": null
  },
  {
   "name": "Xiaomi MiMo Lite",
   "price": 6,
   "quota": "ночь 0.8× (00:00–08:00 UTC+8), годовая $63.36",
   "tokM": 0,
   "models": "MiMo V2.6 Flash · V2.6 Pro (V2.5 уходит 21.10)",
   "tools": "любой OpenAI-клиент",
   "ours": false,
   "src": "xiaomi.com",
   "eff": null
  },
  {
   "name": "Xiaomi MiMo Standard",
   "price": 16,
   "quota": "то же, годовая $168.96",
   "tokM": 0,
   "models": "MiMo V2.6 Pro/Flash",
   "tools": "любой OpenAI-клиент",
   "ours": false,
   "src": "xiaomi.com",
   "eff": null
  },
  {
   "name": "Xiaomi MiMo Pro",
   "price": 50,
   "quota": "то же, годовая $528",
   "tokM": 0,
   "models": "MiMo V2.6 Pro",
   "tools": "любой OpenAI-клиент",
   "ours": false,
   "src": "xiaomi.com",
   "eff": null
  },
  {
   "name": "Xiaomi MiMo Max",
   "price": 100,
   "quota": "то же, годовая $1056",
   "tokM": 0,
   "models": "MiMo V2.6 Pro",
   "tools": "любой OpenAI-клиент",
   "ours": false,
   "src": "xiaomi.com",
   "eff": null
  },
  {
   "name": "BytePlus Coding Plan Lite",
   "price": 10,
   "quota": "только интерактивные инструменты, API-автоматизация запрещена",
   "tokM": 0,
   "models": "BytePlus model lineup",
   "tools": "интерактивные coding-тулы",
   "ours": false,
   "src": "byteplus.com",
   "eff": null
  },
  {
   "name": "BytePlus Coding Plan Pro",
   "price": 50,
   "quota": "то же + ArkClaw",
   "tokM": 0,
   "models": "те же",
   "tools": "интерактивные coding-тулы",
   "ours": false,
   "src": "byteplus.com",
   "eff": null
  },
  {
   "name": "StepFun Flash Mini",
   "price": 6.99,
   "quota": "бустер-паки 30 дней: $6.99 = 400M токенов",
   "tokM": 400.0,
   "models": "Step 3.7 Flash",
   "tools": "любой OpenAI-клиент",
   "ours": false,
   "src": "stepfun.com",
   "eff": 57.22
  },
  {
   "name": "StepFun Flash Max",
   "price": 99,
   "quota": "бустер-пак 1600M токенов",
   "tokM": 1600.0,
   "models": "Step 3.7 Flash",
   "tools": "любой OpenAI-клиент",
   "ours": false,
   "src": "stepfun.com",
   "eff": 16.16
  },
  {
   "name": "Claude Pro",
   "price": 20,
   "quota": "1× (5-часовой окно + недельный кап)",
   "tokM": 0,
   "models": "Claude Opus 5.5 · Sonnet 5 · Haiku 4.5 · Fable 5.1 за кредиты",
   "tools": "Claude Code только",
   "ours": false,
   "src": "claude.com",
   "eff": null
  },
  {
   "name": "Claude Max 5x",
   "price": 100,
   "quota": "5× Pro + $100/мес API-кредитов Anthropic",
   "tokM": 0,
   "models": "те же, Fable 5.1 в рамках 50% недельного лимита",
   "tools": "Claude Code только",
   "ours": false,
   "src": "claude.com",
   "eff": null
  },
  {
   "name": "Claude Max 20x",
   "price": 200,
   "quota": "20× Pro + $200/мес API-кредитов",
   "tokM": 0,
   "models": "те же + ранние фичи",
   "tools": "Claude Code только",
   "ours": false,
   "src": "claude.com",
   "eff": null
  },
  {
   "name": "OpenAI Go",
   "price": 8,
   "quota": "Codex: GPT-6 Luna на Standard-скорости, без GPT-6 Sol",
   "tokM": 0,
   "models": "GPT-6 Luna (в приложении)",
   "tools": "Codex, сторонние приложения через Sign in",
   "ours": false,
   "src": "openai.com",
   "eff": null
  },
  {
   "name": "OpenAI Plus",
   "price": 20,
   "quota": "GPT-6 Luna 350–3000 локальных сообщений / 5ч; Sol 15–160; Astra 5–45",
   "tokM": 0,
   "models": "GPT-6 Luna · GPT-6.1 Sol · GPT-6 Sol · Astra",
   "tools": "Codex, сторонние приложения",
   "ours": false,
   "src": "openai.com",
   "eff": null
  },
  {
   "name": "OpenAI Pro 100",
   "price": 100,
   "quota": "без 5-часового лимита, месячный allowance",
   "tokM": 0,
   "models": "GPT-6 Sol · Astra",
   "tools": "Codex",
   "ours": false,
   "src": "openai.com",
   "eff": null
  },
  {
   "name": "OpenAI Pro 200",
   "price": 200,
   "quota": "пониженный allowance для новых подписчиков (грандфазер до 29.10)",
   "tokM": 0,
   "models": "GPT-6 Sol · Astra",
   "tools": "Codex",
   "ours": false,
   "src": "openai.com",
   "eff": null
  },
  {
   "name": "OpenAI Pro 500",
   "price": 500,
   "quota": "Astra Ultrafast только здесь (расходует allowance первым, 8×)",
   "tokM": 0,
   "models": "GPT-6 Sol · Astra Ultrafast",
   "tools": "Codex",
   "ours": false,
   "src": "openai.com",
   "eff": null
  },
  {
   "name": "Google AI Pro",
   "price": 19.99,
   "quota": "Gemini 3.1 Pro · 3.8 Flash в Gemini CLI и Code Assist",
   "tokM": 0,
   "models": "Gemini 3.1 Pro · 3.8 Flash",
   "tools": "Gemini CLI, Code Assist, Gemini Code",
   "ours": false,
   "src": "google.com",
   "eff": null
  },
  {
   "name": "Google AI Ultra 5x",
   "price": 99.99,
   "quota": "5× Pro + приоритет",
   "tokM": 0,
   "models": "те же + Veo",
   "tools": "Gemini",
   "ours": false,
   "src": "google.com",
   "eff": null
  },
  {
   "name": "Google AI Ultra 20x",
   "price": 199.99,
   "quota": "20× Pro",
   "tokM": 0,
   "models": "те же",
   "tools": "Gemini",
   "ours": false,
   "src": "google.com",
   "eff": null
  },
  {
   "name": "GitHub Copilot Pro",
   "price": 10,
   "quota": "кредиты + unlimited chat с базовыми моделями",
   "tokM": 0,
   "models": "Claude Sonnet 5.5 · GPT-5.6 Terra + 17",
   "tools": "Copilot CLI, ACP-клиенты",
   "ours": true,
   "src": "github.com",
   "eff": null
  },
  {
   "name": "GitHub Copilot Pro+",
   "price": 39,
   "quota": "$70/мес AI-кредитов · 4× usage Pro",
   "tokM": 0,
   "models": "Claude Opus 5 · GPT-5.6 Sol · Gemini 3.7 Flash + 25",
   "tools": "Copilot CLI, ACP",
   "ours": true,
   "src": "github.com",
   "eff": null
  },
  {
   "name": "GitHub Copilot Max",
   "price": 100,
   "quota": "$200/мес AI-кредитов · 2.9× Pro+",
   "tokM": 0,
   "models": "те же",
   "tools": "Copilot CLI, ACP",
   "ours": true,
   "src": "github.com",
   "eff": null
  },
  {
   "name": "Mistral Pro",
   "price": 14.99,
   "quota": "месячный лимит токенов в Studio/La Plateforme",
   "tokM": 0,
   "models": "Mistral Large 4 (1M ctx) · Medium 3.5 · Small 4",
   "tools": "Studio, API, Vibe Code",
   "ours": false,
   "src": "mistral.ai",
   "eff": null
  },
  {
   "name": "Ollama Pro",
   "price": 20,
   "quota": "облачные inference-кредиты",
   "tokM": 0,
   "models": "open-weight линейка в облаке",
   "tools": "Ollama, любой клиент",
   "ours": false,
   "src": "ollama.com",
   "eff": null
  },
  {
   "name": "Ollama Max",
   "price": 100,
   "quota": "больше облачных кредитов",
   "tokM": 0,
   "models": "те же",
   "tools": "Ollama",
   "ours": false,
   "src": "ollama.com",
   "eff": null
  },
  {
   "name": "NanoGPT Subscription",
   "price": 12,
   "quota": "60M входных токенов/нед · 2× на GLM/Kimi/DeepSeek · 100 картинок/день",
   "tokM": 60.0,
   "models": "GLM-5.2 · MiniMax M3 · DeepSeek V4 Pro + 7",
   "tools": "любой инструмент",
   "ours": false,
   "src": "nanogpt.com",
   "eff": 5.0
  },
  {
   "name": "Cline Pass",
   "price": 9.99,
   "quota": "доступ к 12+ моделям",
   "tokM": 0,
   "models": "GLM-5.3 · GLM-5.3-Flash · Kimi K3 + 9",
   "tools": "Cline и другие",
   "ours": false,
   "src": "cline.bot",
   "eff": null
  },
  {
   "name": "Chutes Plus",
   "price": 10,
   "quota": "подписка на инференс-пулы",
   "tokM": 0,
   "models": "GLM-5.2 · Kimi K2.6 · Qwen3.5 + 11",
   "tools": "любой инструмент",
   "ours": false,
   "src": "chutes.ai",
   "eff": null
  },
  {
   "name": "Chutes Pro",
   "price": 20,
   "quota": "уровень выше",
   "tokM": 0,
   "models": "те же",
   "tools": "любой инструмент",
   "ours": false,
   "src": "chutes.ai",
   "eff": null
  },
  {
   "name": "Phoenix Grove Taster",
   "price": 3.99,
   "quota": "1-й месяц бесплатно · Flash-уровневые модели",
   "tokM": 0,
   "models": "deepseek-v4.1-flash · v4-flash-0731 · glm-5.3-flash",
   "tools": "API",
   "ours": false,
   "src": "phoenixgrove.ai",
   "eff": null
  },
  {
   "name": "Phoenix Grove Canopy",
   "price": 195,
   "quota": "16× Basic — максимум headroom у провайдера",
   "tokM": 0,
   "models": "все модели PG",
   "tools": "API",
   "ours": false,
   "src": "phoenixgrove.ai",
   "eff": null
  },
  {
   "name": "Muse Code (Meta)",
   "price": 30,
   "quota": "подписка на Muse-подсистему",
   "tokM": 0,
   "models": "Muse Wonder · Muse Spark 1.3",
   "tools": "Muse Code CLI",
   "ours": false,
   "src": "dev.meta.ai",
   "eff": null
  },
  {
   "name": "X.AI SuperGrok Plus",
   "price": 100,
   "quota": "Grok Bot + подписка xAI",
   "tokM": 0,
   "models": "Grok 4.7 · 4.6",
   "tools": "Grok Bot, Cursor (связка)",
   "ours": false,
   "src": "docs.x.ai",
   "eff": null
  },
  {
   "name": "Standard Compute Starter",
   "price": 19,
   "quota": "долларовый бюджет по листовым ценам ≈ $60 API",
   "tokM": 60.0,
   "models": "GPT-6 Astra · Claude Fable 5.1 · Claude Opus 5 + 20",
   "tools": "любой инструмент",
   "ours": false,
   "src": "standardcompute.com",
   "eff": 3.16
  },
  {
   "name": "LLM Gateway DevPass Lite",
   "price": 29,
   "quota": "Reset Pass: $9 = $29, покупается в любой момент",
   "tokM": 29.0,
   "models": "мультипровайдерный шлюз",
   "tools": "любой инструмент",
   "ours": false,
   "src": "llmgateway.dev",
   "eff": 1.0
  },
  {
   "name": "Neural Watt Basic",
   "price": 20,
   "quota": "энергобиллинг kWh, overage $8.50/kWh",
   "tokM": 0,
   "models": "динамический роутинг по цене/качеству",
   "tools": "любой инструмент",
   "ours": false,
   "src": "neuralwatt.ai",
   "eff": null
  },
  {
   "name": "Synthetic Subscription",
   "price": 30,
   "quota": "подписка на Synthetic-инференс",
   "tokM": 0,
   "models": "открытые модели через Synthetic",
   "tools": "любой инструмент",
   "ours": false,
   "src": "synthetic.new",
   "eff": null
  }
 ],
 "freeApi": [
  {
   "name": "Groq",
   "key": "да",
   "rpm": 30,
   "rpd": 1000,
   "tok": "200K/модель/день",
   "card": "нет",
   "credit": "$0",
   "models": "gpt-oss-120b · gpt-oss-20b · qwen3.6-27b · Whisper",
   "notes": "compound — 250 RPD. Самая быстрая выдача, но 200K токенов на модель в день",
   "src": "console.groq.com",
   "keyless": false
  },
  {
   "name": "Cerebras",
   "key": "да",
   "rpm": 5,
   "rpd": 14400,
   "tok": "1M/день",
   "card": "ДА",
   "credit": "$5 (30 дней)",
   "models": "Llama 3.3 70B · Qwen3 235B · GPT-OSS-120B",
   "notes": "Рекордный суточный кап, но free превратился в trial с картой",
   "src": "cloud.cerebras.ai",
   "keyless": false
  },
  {
   "name": "Google AI Studio",
   "key": "да",
   "rpm": "5–60",
   "rpd": "14 400 (Gemma) / 20–500 (Flash)",
   "tok": "250K TPM",
   "card": "нет",
   "credit": "$0",
   "models": "Gemini 3 Flash · 3.1 Flash-Lite · 2.5 Flash · Gemma 3 27B",
   "notes": "Gemma 3 27B — 14 400 RPD при 30 RPM. Лучший бесплатный вариант без карты",
   "src": "aistudio.google.com",
   "keyless": false
  },
  {
   "name": "Cloudflare Workers AI",
   "key": "да",
   "rpm": 300,
   "rpd": "10 000 Neurons/день",
   "tok": "~244K/день",
   "card": "нет",
   "credit": "$0",
   "models": "gpt-oss-120b/20b · Qwen3 30B · Llama 4 Scout · Gemma 4 26B · GLM 4.7 Flash",
   "notes": "Лимит общий на все модели, сброс 00:00 UTC. 5 моделей (Kimi K2.6/2.7, GLM-5.2, DS V4) только на платном",
   "src": "workers.ai",
   "keyless": false
  },
  {
   "name": "Mistral",
   "key": "да",
   "rpm": 60,
   "rpd": "≈1B токенов/мес",
   "tok": "500K TPM",
   "card": "нет (телефон)",
   "credit": "$10/мес кредитов",
   "models": "Mistral Large 4 (1M ctx) · Medium 3.5 · Small 4 · Codestral",
   "notes": "Free Experiment: данные могут идти на обучение (opt-out). Лимиты смотри в панели",
   "src": "console.mistral.ai",
   "keyless": false
  },
  {
   "name": "NVIDIA NIM",
   "key": "да",
   "rpm": 40,
   "rpd": 10000,
   "tok": "1B токенов/мес",
   "card": "нет (телефон)",
   "credit": "$0",
   "models": "nemotron-3-ultra-550b (1M ctx) · nemotron-3-super-120b (1M) · minimax-m3 · gemma-4-31b · + 92",
   "notes": "100+ моделей, лимит на модель. Лучший free-доступ к Nemotron",
   "src": "build.nvidia.com",
   "keyless": false
  },
  {
   "name": "OpenRouter",
   "key": "да",
   "rpm": 20,
   "rpd": 50,
   "tok": "—",
   "card": "нет",
   "credit": "$0 ($10 → 1000 RPD)",
   "models": "20 zero-price моделей: Nemotron 3 Ultra, MiniMax M3.1 Flash, Inkling, Laguna S/XS, Gemma 4",
   "notes": "Квота общая на все :free модели",
   "src": "openrouter.ai",
   "keyless": false
  },
  {
   "name": "GitHub Models",
   "key": "да (любой PAT)",
   "rpm": 15,
   "rpd": 150,
   "tok": "—",
   "card": "нет",
   "credit": "$0",
   "models": "22+ модели: GPT-5 · Grok 3 · Llama 3.1 405B · DeepSeek-R1 · Mistral",
   "notes": "Статус спорный: один источник пишет «retired July 2026». Проверяй в аккаунте",
   "src": "github.com/marketplace/models",
   "keyless": false
  },
  {
   "name": "Cohere",
   "key": "да",
   "rpm": "—",
   "rpd": "1000/мес",
   "tok": "—",
   "card": "нет",
   "credit": "$0",
   "models": "Command A · Command R+ · Aya",
   "notes": "Только 1000 звонков в месяц — не для повторяющихся задач",
   "src": "cohere.com",
   "keyless": false
  },
  {
   "name": "SambaNova",
   "key": "да",
   "rpm": "—",
   "rpd": 20,
   "tok": "—",
   "card": "нет",
   "credit": "$0",
   "models": "модели SambaNova",
   "notes": "20 запросов в день — почти бесполезно",
   "src": "sambanova.ai",
   "keyless": false
  },
  {
   "name": "Z.ai / Zhipu GLM",
   "key": "да",
   "rpm": "—",
   "rpd": 1000,
   "tok": "—",
   "card": "нет",
   "credit": "$0",
   "models": "GLM-5.3 · GLM-5.3-Flash",
   "notes": "Официальный free-канал GLM",
   "src": "z.ai",
   "keyless": false
  },
  {
   "name": "Hugging Face router",
   "key": "да",
   "rpm": "—",
   "rpd": "—",
   "tok": "$0.10/мес",
   "card": "нет",
   "credit": "$0.10",
   "models": "22+ open-модели через router",
   "notes": "Кредитов хватает на несколько тестов, не на работу",
   "src": "huggingface.co",
   "keyless": false
  },
  {
   "name": "Together AI",
   "key": "да",
   "rpm": "—",
   "rpd": "—",
   "tok": "—",
   "card": "ДА",
   "credit": "$25",
   "models": "Llama 3.3 70B · Llama Vision · DeepSeek-R1 distill (навсегда free)",
   "notes": "Минимум покупки $5",
   "src": "together.ai",
   "keyless": false
  },
  {
   "name": "SiliconFlow",
   "key": "да",
   "rpm": "—",
   "rpd": "—",
   "tok": "—",
   "card": "нет (верификация)",
   "credit": "$1",
   "models": "1 free-модель",
   "notes": "Нужна верификация личности",
   "src": "siliconflow.com",
   "keyless": false
  },
  {
   "name": "Novita AI",
   "key": "да",
   "rpm": "—",
   "rpd": "—",
   "tok": "—",
   "card": "нет",
   "credit": "$0.50 (1 год)",
   "models": "open-модели",
   "notes": "Кредиты на год",
   "src": "novita.ai",
   "keyless": false
  },
  {
   "name": "Fireworks AI",
   "key": "да",
   "rpm": "—",
   "rpd": "—",
   "tok": "—",
   "card": "ДА",
   "credit": "$1",
   "models": "open-модели",
   "notes": "Минимум $1",
   "src": "fireworks.ai",
   "keyless": false
  },
  {
   "name": "Nebius",
   "key": "да",
   "rpm": "—",
   "rpd": "—",
   "tok": "—",
   "card": "ДА",
   "credit": "$1",
   "models": "open-модели",
   "notes": "Минимум $1",
   "src": "studio.nebius.ai",
   "keyless": false
  },
  {
   "name": "nScale",
   "key": "да",
   "rpm": "—",
   "rpd": "—",
   "tok": "—",
   "card": "ДА",
   "credit": "$5",
   "models": "open-модели",
   "notes": "Кредиты на старте",
   "src": "nscale.com",
   "keyless": false
  },
  {
   "name": "DeepInfra",
   "key": "да",
   "rpm": "—",
   "rpd": "—",
   "tok": "—",
   "card": "ДА",
   "credit": "startup: 1B токенов",
   "models": "open-модели",
   "notes": "Отдельная программа для стартапов",
   "src": "deepinfra.com",
   "keyless": false
  },
  {
   "name": "Aion Labs",
   "key": "да",
   "rpm": 15,
   "rpd": "—",
   "tok": "20K/день",
   "card": "нет",
   "credit": "$0",
   "models": "aion-2.0 (128K) · aion-3.0 · aion-3.0-mini",
   "notes": "Без карты, reasoning-модели",
   "src": "api.aionlabs.ai",
   "keyless": false
  },
  {
   "name": "ModelScope API",
   "key": "да",
   "rpm": "—",
   "rpd": "≈2000/день",
   "tok": "динамические капы",
   "card": "нет",
   "credit": "$0",
   "models": "7 моделей",
   "notes": "Квота на все модели суммарно",
   "src": "modelscope.cn",
   "keyless": false
  },
  {
   "name": "Morph",
   "key": "да",
   "rpm": "—",
   "rpd": "≈200/мес",
   "tok": "—",
   "card": "нет",
   "credit": "$0",
   "models": "3 модели",
   "notes": "Малый объём",
   "src": "morphllm.com",
   "keyless": false
  },
  {
   "name": "Vercel AI Gateway",
   "key": "да",
   "rpm": "—",
   "rpd": "—",
   "tok": "$5/мес Hobby",
   "card": "нет",
   "credit": "$5/мес",
   "models": "5 free-моделей + мультипровайдерный роутинг",
   "notes": "$5 кредитов ежемесячно, роутит по десяткам провайдеров",
   "src": "vercel.com/docs/ai-gateway",
   "keyless": false
  },
  {
   "name": "Ollama Cloud",
   "key": "да",
   "rpm": "—",
   "rpd": "—",
   "tok": "качественные лимиты",
   "card": "нет",
   "credit": "$0",
   "models": "8 open-моделей",
   "notes": "Облачный инференс Ollama",
   "src": "ollama.com",
   "keyless": false
  },
  {
   "name": "OVHcloud AI Endpoints",
   "key": "НЕТ (keyless)",
   "rpm": "—",
   "rpd": "—",
   "tok": "—",
   "card": "нет",
   "credit": "$0",
   "models": "17 моделей: чат + embeddings + Whisper",
   "notes": "Анонимный tier, лимит по IP",
   "src": "ovh.com",
   "keyless": true
  },
  {
   "name": "Kilo Gateway",
   "key": "НЕТ (keyless)",
   "rpm": "—",
   "rpd": "≈200/час на IP",
   "tok": "—",
   "card": "нет",
   "credit": "$0",
   "models": "11 моделей",
   "notes": "Анонимный шлюз, rate-limit по IP",
   "src": "kilo.ai",
   "keyless": true
  },
  {
   "name": "Pollinations",
   "key": "НЕТ (keyless)",
   "rpm": "—",
   "rpd": "—",
   "tok": "—",
   "card": "нет",
   "credit": "$0",
   "models": "2 модели",
   "notes": "Анонимно, лимит по IP",
   "src": "pollinations.ai",
   "keyless": true
  },
  {
   "name": "OpenCode Zen",
   "key": "НЕТ (keyless)",
   "rpm": "—",
   "rpd": "—",
   "tok": "—",
   "card": "нет",
   "credit": "$0",
   "models": "маршруты отключены по умолчанию (pending opt-in)",
   "notes": "Каталог есть, включить надо вручную",
   "src": "opencode.ai",
   "keyless": true
  }
 ],
 "tools": [
  {
   "n": "OmniRoute (локальный шлюз)",
   "signup": "У нас уже поднят: localhost:20128",
   "quota": "Без квот и без карты · 1292 модели в 17 префиксах · no-auth пулы: ddgw (6), auto/* (4)",
   "models": "GPT-5.4 Mini · GPT-5.6 Luna · Claude Haiku 4.5 · Mistral Small 2603 · GPT-OSS 120B · Gemma4 31B · auto/best-free · auto/coding:free",
   "ctx": "до 1M",
   "note": "Это шлюз, а не тариф: раздаёт бесплатные пулы и маршрутит по качеству. Проверен read-only, конфиг не менялся.",
   "score": 88,
   "badge": "У НАС ЕСТЬ"
  },
  {
   "n": "Qwen Code",
   "signup": "OAuth (Google/GitHub), без карты",
   "quota": "2000 запросов/день · 60 RPM",
   "models": "Qwen3-Coder-480B-A35B, Qwen3-Coder-Next, Qwen3-VL, qwen3-coder-plus, qwen3-max",
   "ctx": "1M",
   "note": "Крупнейший бесплатный дневной лимит среди CLI-агентов. Локально через Ollama — 0 лимитов.",
   "score": 95,
   "badge": "ТОП"
  },
  {
   "n": "Gemini CLI",
   "signup": "Google account, без карты",
   "quota": "1000 запросов/день · 60 RPM",
   "models": "Gemini 3.1 Pro (до 1M ctx), Gemini 3.8 Flash, 2.5 Pro/Flash, 2.5 Flash-Lite",
   "ctx": "1M",
   "note": "Официальный CLI от Google. 1000 запросов/день на аккаунт.",
   "score": 93,
   "badge": "ТОП"
  },
  {
   "n": "Rovo Dev CLI",
   "signup": "Atlassian account",
   "quota": "5M токенов/день (beta)",
   "models": "Claude Sonnet 4, GPT-5, Gemini",
   "ctx": "200K",
   "note": "Самый большой суточный объём токенов. Вход через Atlassian.",
   "score": 91,
   "badge": "ТОП"
  },
  {
   "n": "Gemini Code Assist",
   "signup": "Google account",
   "quota": "~6000 completions/день (~180K/мес) · 240 чат-сообщений/день",
   "models": "Gemini 3.1 Pro (2M ctx), 2.5 Pro/Flash",
   "ctx": "2M",
   "note": "Статус неоднозначен: для индивидуалов Google переводил на Antigravity с июня 2026. Проверяй в аккаунте.",
   "score": 88,
   "badge": ""
  },
  {
   "n": "GitHub Copilot Free",
   "signup": "GitHub account, бесплатно",
   "quota": "2000 completions + 50 премиум-запросов/мес + AI credits",
   "models": "Claude Sonnet 4.5, GPT-5.1/5-mini, Gemini 2.5 Pro",
   "ctx": "128K",
   "note": "GITHUB_TOKEN уже есть. В Hermes работает через ACP: hermes model (spawns local copilot --acp).",
   "score": 87,
   "badge": "У НАС ЕСТЬ"
  },
  {
   "n": "Cursor Hobby",
   "signup": "Email, без карты",
   "quota": "~2000 completions + 50 slow-запросов/мес",
   "models": "Claude Sonnet 4.5, GPT-5, Gemini 2.5 Pro, Auto (routing)",
   "ctx": "128K",
   "note": "Бесплатный тариф без карты. 50 запросов на Pro-модели в месяц.",
   "score": 84,
   "badge": ""
  },
  {
   "n": "Windsurf Free",
   "signup": "Google account, без карты",
   "quota": "~25 Cascade agent actions/мес + unlimited Tab",
   "models": "Cascade (Claude 4.5/4.6, GPT-5, Gemini 2.5)",
   "ctx": "128K",
   "note": "Бесплатно без карты, но агентных действий мало. Tab-автодополнение без лимита.",
   "score": 79,
   "badge": ""
  },
  {
   "n": "Trae",
   "signup": "Email, без карты",
   "quota": "~10 fast + 50 slow запросов/мес",
   "models": "Claude Sonnet 4.5, GPT-4o, Gemini 2.5, Auto",
   "ctx": "128K",
   "note": "Бесплатный тариф с 50 slow-запросами.",
   "score": 77,
   "badge": ""
  },
  {
   "n": "Qoder",
   "signup": "Email, без карты",
   "quota": "Unlimited completions + 1000 кредитов пробный период (2 недели)",
   "models": "Claude Sonnet 4.5, GPT-4o, Gemini 2.5 Pro, auto",
   "ctx": "128K",
   "note": "Pro $20/мес = 2000 кредитов, Pro+ $60 = 6000. Бесплатный тариф без карты.",
   "score": 76,
   "badge": ""
  },
  {
   "n": "Kiro",
   "signup": "AWS Builder ID",
   "quota": "50 кредитов/мес + 50 agentic-запросов/мес",
   "models": "Claude Sonnet 4.5, GPT-5, DeepSeek R1",
   "ctx": "128K",
   "note": "От AWS. Бесплатный тариф, но кредиты кончаются быстро.",
   "score": 74,
   "badge": ""
  },
  {
   "n": "Amazon Q Developer",
   "signup": "AWS Builder ID (или AWS CLI)",
   "quota": "~50 agentic-запросов/мес",
   "models": "Claude Sonnet 4.5, DeepSeek R1, Nova",
   "ctx": "128K",
   "note": "CLI бесплатно. Переход на Claude Opus 4.6 в AgentCore Agent Gateway.",
   "score": 72,
   "badge": ""
  },
  {
   "n": "Warp",
   "signup": "Email, без карты",
   "quota": "150 кредитов в первые 2 мес, далее 75/мес",
   "models": "Claude 4.5, GPT-5, Gemini 2.5, режим Agent",
   "ctx": "128K",
   "note": "Терминальный агент. Кредиты обновляются ежемесячно.",
   "score": 70,
   "badge": ""
  },
  {
   "n": "Jules",
   "signup": "Google account",
   "quota": "~15 задач/день",
   "models": "Gemini 3.1 Pro",
   "ctx": "1M",
   "note": "Асинхронный кодовый агент от Google. Задачи выполняются в облаке.",
   "score": 71,
   "badge": ""
  },
  {
   "n": "Cline / Roo Code / Continue",
   "signup": "нет — свой API-ключ",
   "quota": "лимиты твоего провайдера, 0 оверхеда",
   "models": "любые OpenAI-совместимые, включая бесплатные",
   "ctx": "до 1M",
   "note": "Локальный VS Code. Бесплатные маршруты из нашего каталога подключаются как custom provider.",
   "score": 82,
   "badge": "У НАС ЕСТЬ"
  },
  {
   "n": "opencode / Zed / Aider",
   "signup": "нет — свой ключ",
   "quota": "лимиты провайдера, 0 оверхеда",
   "models": "любые OpenAI-совместимые",
   "ctx": "до 1M",
   "note": "Локальные CLI/редакторы. Мы уже гоняем opencode через Hermes (zenfree).",
   "score": 81,
   "badge": "У НАС ЕСТЬ"
  },
  {
   "n": "Ollama / LM Studio",
   "signup": "нет — полностью локально",
   "quota": "без лимитов, без интернета",
   "models": "любые open-weight: Qwen3-Coder, DeepSeek, Kimi, GLM",
   "ctx": "по VRAM",
   "note": "Ноль в копейку и без лимитов — если хватает железа. Нужен мощный CPU/GPU.",
   "score": 83,
   "badge": "БЕЗ ЛИМИТОВ"
  },
  {
   "n": "Supermaven",
   "signup": "Email",
   "quota": "бесплатный completion tier",
   "models": "авто-комплит (70+ языков)",
   "ctx": "н/д",
   "note": "Только автодополнение в IDE.",
   "score": 60,
   "badge": ""
  },
  {
   "n": "BlackBox AI",
   "signup": "Email, без карты",
   "quota": "бесплатные completions + 1 запрос/день к моделям",
   "models": "Claude Sonnet, GPT-4o, Gemini",
   "ctx": "128K",
   "note": "Бесплатный тариф без карты.",
   "score": 58,
   "badge": ""
  },
  {
   "n": "Poe / Perplexity / LMArena",
   "signup": "Email / Google",
   "quota": "по подписке, есть free-уровни",
   "models": "большинство премиум-моделей по подписке",
   "ctx": "разный",
   "note": "Не API для агентов, но мощные модели по подписке без оплаты за токены.",
   "score": 64,
   "badge": ""
  }
 ],
 "releases": [
  {
   "d": "2026-10-19",
   "n": "MiniMax M3.1 Flash",
   "o": "MiniMax",
   "ctx": "1M",
   "p": null,
   "k": "reasoning, vision",
   "free": true
  },
  {
   "d": "2026-10-19",
   "n": "Clairic",
   "o": "Cloudflare",
   "ctx": "64K",
   "p": null,
   "k": "vision",
   "free": true
  },
  {
   "d": "2026-10-19",
   "n": "Mercury 3",
   "o": "Inception Labs",
   "ctx": "1M",
   "p": null,
   "k": "reasoning",
   "free": false
  },
  {
   "d": "2026-10-17",
   "n": "DeepSeek V4.1 Flash 1017",
   "o": "DeepSeek",
   "ctx": "1M",
   "p": "552B",
   "k": "open, reasoning, vision",
   "free": true
  },
  {
   "d": "2026-10-16",
   "n": "pplx-decider-v1.2 / flash-v1.2",
   "o": "Perplexity Labs",
   "ctx": "256K",
   "p": "27B / 4B",
   "k": "open, vision",
   "free": true
  },
  {
   "d": "2026-10-16",
   "n": "Beam",
   "o": "Reflection AI",
   "ctx": "1M",
   "p": "501B (23B active)",
   "k": "open, reasoning, Apache 2.0",
   "free": true
  },
  {
   "d": "2026-10-15",
   "n": "Muse Spark Open",
   "o": "Meta AI",
   "ctx": "1M",
   "p": "816B (42B active)",
   "k": "open, reasoning, vision",
   "free": true
  },
  {
   "d": "2026-10-15",
   "n": "Nemotron 3.5 Super VL",
   "o": "NVIDIA AI",
   "ctx": "1M",
   "p": "120B (12B active)",
   "k": "open, reasoning, vision",
   "free": true
  },
  {
   "d": "2026-10-15",
   "n": "Nemotron 3.5 Bolt 74B-A9B",
   "o": "NVIDIA AI",
   "ctx": "256K",
   "p": "74B (9B active)",
   "k": "open, reasoning, vision",
   "free": true
  },
  {
   "d": "2026-10-15",
   "n": "Jais 3 (0.9B → 375B-A23B)",
   "o": "Core42",
   "ctx": "512K",
   "p": "0.9B–375B",
   "k": "open, reasoning",
   "free": true
  },
  {
   "d": "2026-10-15",
   "n": "d1-ultra",
   "o": "Liquid AI",
   "ctx": null,
   "p": null,
   "k": "vision",
   "free": false
  },
  {
   "d": "2026-10-13",
   "n": "LFM2.5-24B-A2B",
   "o": "Liquid AI",
   "ctx": "128K",
   "p": "24B (2B active)",
   "k": "open, reasoning",
   "free": true
  },
  {
   "d": "2026-10-12",
   "n": "Muse Wonder / Muse Wonder Full",
   "o": "Meta AI",
   "ctx": "1M",
   "p": null,
   "k": "reasoning, vision, video",
   "free": false
  },
  {
   "d": "2026-10-10",
   "n": "Kisoku 1.6B",
   "o": "0ARCH",
   "ctx": null,
   "p": "1.6B",
   "k": "open, Apache 2.0, 150 w/s на M5 Max",
   "free": true
  },
  {
   "d": "2026-10-09",
   "n": "Clef-omni",
   "o": "Cloudflare",
   "ctx": "64K",
   "p": "30B (3B active)",
   "k": "open, vision",
   "free": true
  },
  {
   "d": "2026-10-09",
   "n": "Youtu-Parsing-Omni",
   "o": "Tencent AI Lab",
   "ctx": null,
   "p": "5B",
   "k": "open, vision, video",
   "free": true
  },
  {
   "d": "2026-10-08",
   "n": "Mellum2.1 Thinking",
   "o": "JetBrains",
   "ctx": "128K",
   "p": "12B (2.5B active)",
   "k": "open, reasoning",
   "free": true
  },
  {
   "d": "2026-10-08",
   "n": "MetaEncoder",
   "o": "Meta AI",
   "ctx": null,
   "p": "29.8B",
   "k": "open, vector",
   "free": true
  },
  {
   "d": "2026-10-07",
   "n": "Claude Haiku 5.5",
   "o": "Anthropic",
   "ctx": "1M",
   "p": null,
   "k": "reasoning, vision",
   "free": false
  },
  {
   "d": "2026-10-07",
   "n": "d1-omni-600M",
   "o": "Liquid AI",
   "ctx": "16K",
   "p": "587M",
   "k": "open, vision",
   "free": true
  },
  {
   "d": "2026-10-06",
   "n": "Mistral Large 4",
   "o": "Mistral AI",
   "ctx": "1M",
   "p": "1.05T (49B active)",
   "k": "reasoning, vision",
   "free": false
  },
  {
   "d": "2026-10-06",
   "n": "EmbeddingGemma 2",
   "o": "Google DeepMind",
   "ctx": "8K",
   "p": "740M",
   "k": "open, vector",
   "free": true
  },
  {
   "d": "2026-10-05",
   "n": "Amazon Nova 2.5 Sonic",
   "o": "AWS AI",
   "ctx": "256K",
   "p": null,
   "k": "audio",
   "free": false
  },
  {
   "d": "2026-10-04",
   "n": "Tess-4.5-27B",
   "o": "Continuity Research",
   "ctx": null,
   "p": "27B",
   "k": "open, coding, Apache 2.0",
   "free": true
  },
  {
   "d": "2026-10-03",
   "n": "Kolibri 1",
   "o": "Aleph Alpha",
   "ctx": "1M",
   "p": "78B (3.46B active)",
   "k": "open, reasoning",
   "free": true
  },
  {
   "d": "2026-10-02",
   "n": "Torchcast Decision 12B",
   "o": "Torchcast AI",
   "ctx": "16K",
   "p": "12B",
   "k": "open",
   "free": true
  },
  {
   "d": "2026-10-01",
   "n": "Clef / Clef-flash",
   "o": "Cloudflare",
   "ctx": "64K / 256K",
   "p": "27B / 9B",
   "k": "open, vision",
   "free": true
  },
  {
   "d": "2026-10-01",
   "n": "MAI-Voice-2.1 / -Flash",
   "o": "Microsoft AI",
   "ctx": null,
   "p": null,
   "k": "voice",
   "free": false
  },
  {
   "d": "2026-10-01",
   "n": "Grok Imagine Video 1.5 Lite",
   "o": "xAI",
   "ctx": null,
   "p": null,
   "k": "vision, image, video",
   "free": false
  }
 ],
 "probes": [
  {
   "m": "openrouter/minimax/minimax-m3.1-flash:free",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "1M ctx / 524K out. Добавлена в config → видна в пикере."
  },
  {
   "m": "openrouter/cohere/north-mini-code:free",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "256K ctx / 64K out."
  },
  {
   "m": "openrouter/thinkingmachines/inkling:free",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "Нужен заголовок X-OpenRouter-Categories — Hermes шлёт его сам."
  },
  {
   "m": "openrouter/xingchen-agi/xing4.0-29b-a4b:free",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "262K ctx / 236K out."
  },
  {
   "m": "openrouter/liquid/lfm-2.5-2.6b:free",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "65K ctx."
  },
  {
   "m": "openrouter/openrouter/free",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "Авто-роутер OpenRouter."
  },
  {
   "m": "openrouter/google/gemma-4-26b-a4b-it:free",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "262K ctx."
  },
  {
   "m": "openrouter/dots-studio/dots-3-note-preview:free",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "Preview, 512K ctx."
  },
  {
   "m": "openrouter/poolside/laguna-s-2.1:free",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "Основной бесплатный fallback."
  },
  {
   "m": "nous/meituan/longcat-2.5-preview:free",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "1M ctx."
  },
  {
   "m": "nous/poolside/laguna-s-2.1:free",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "Работает."
  },
  {
   "m": "nous/poolside/laguna-xs-2.1:free",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "Работает."
  },
  {
   "m": "nous/reflection/beam-1.0-501b-a23b:free",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "501B open (Apache 2.0)."
  },
  {
   "m": "nous/stepfun/step-3.7-flash:free",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "Требует тег user= в extra_body.tags."
  },
  {
   "m": "nous/upstage/solar-mini4:free",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "Тоже требует user= тег."
  },
  {
   "m": "omniroute/ddgw/gpt-5.4-mini",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "Без подключения и без ключа!"
  },
  {
   "m": "omniroute/ddgw/gpt-5.6-luna",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "Без ключа."
  },
  {
   "m": "omniroute/ddgw/claude-haiku-4-5",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "Без ключа."
  },
  {
   "m": "omniroute/ddgw/mistral-small-2603",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "Без ключа."
  },
  {
   "m": "omniroute/ddgw/tinfoil/gpt-oss-120b",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "Без ключа."
  },
  {
   "m": "omniroute/ddgw/tinfoil/gemma4-31b",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "Без ключа."
  },
  {
   "m": "omniroute/auto/best-free",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "Авто-роутер по free-пулу."
  },
  {
   "m": "omniroute/auto/coding:free",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "Авто-роутер для кода."
  },
  {
   "m": "omniroute/auto/cheap",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "Дешёвый маршрут."
  },
  {
   "m": "omniroute/auto/offline",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "Оффлайн-маршрут."
  },
  {
   "m": "nvidia/nemotron-3.5-lightning-30b-a3b",
   "r": "ok",
   "t": "PROBE_OK",
   "n": "Правильный NIM ID."
  },
  {
   "m": "openrouter/nvidia/nemotron-3-super-120b-a12b:free",
   "r": "bad",
   "t": "UPSTREAM 404",
   "n": "Function not found на стороне провайдера."
  },
  {
   "m": "openrouter/google/lyria-3-pro-preview",
   "r": "bad",
   "t": "402 CREDITS",
   "n": "Бесплатен по прайсу, но без кредитов — 402."
  },
  {
   "m": "nous/meituan/longcat-2.0:free",
   "r": "bad",
   "t": "NO LONGER FREE",
   "n": "HTTP 404 — перестала быть бесплатной."
  },
  {
   "m": "omniroute/oc/nemotron-3-ultra-free",
   "r": "bad",
   "t": "403 FreeTierError",
   "n": "OpenCode free — только из нативного OpenCode."
  },
  {
   "m": "omniroute/oc/mimo-v2.5-free",
   "r": "bad",
   "t": "401 NO CREDS",
   "n": "Нет credentials для opencode в OmniRoute."
  },
  {
   "m": "omniroute/cfp/deepseek-ai/deepseek-v4-flash-0731",
   "r": "bad",
   "t": "502 NO BROWSER",
   "n": "Cloudflare Playground: нет Playwright executable."
  },
  {
   "m": "omniroute/zc/glm-5.3-flash",
   "r": "bad",
   "t": "502 SPAWN ENOENT",
   "n": "Нет zcode CLI."
  },
  {
   "m": "omniroute/cxa/gpt-6-astra",
   "r": "bad",
   "t": "503 NO TRANSPORT",
   "n": "Codex app-server не настроен."
  },
  {
   "m": "omniroute/aug/sonnet4.6",
   "r": "bad",
   "t": "502 NO CLI",
   "n": "Нет auggie CLI."
  },
  {
   "m": "omniroute/aihorde/AlbedoBase XL",
   "r": "bad",
   "t": "IMAGE ONLY",
   "n": "Только /v1/images/generations."
  },
  {
   "m": "orcarouter/deepseek/deepseek-v4.1-flash-free",
   "r": "bad",
   "t": "429 ACCOUNT",
   "n": "Нужна GitHub/account eligibility."
  },
  {
   "m": "commandcode/stealth/cat-jam:free",
   "r": "bad",
   "t": "400 NO CREDITS",
   "n": "insufficient credits."
  },
  {
   "m": "google/gemini-2.5-flash",
   "r": "bad",
   "t": "429 QUOTA",
   "n": "Ключ есть, free quota сломана."
  }
 ],
 "ranking": [
  {
   "id": "Nous Portal",
   "score": 75.9,
   "working": 6,
   "catalog": 0,
   "blocked": 0,
   "total": 6,
   "wr": 100,
   "access": "api",
   "color": "#a78bfa",
   "benchAvg": 49.7,
   "ctxCap": 1048576,
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "97%",
   "status": "working",
   "limits": "RPM/TPM/RPD не раскрыты",
   "note": "7 :free моделей. Часть требует тег user= в extra_body.tags.",
   "parts": {
    "Работоспособность": 40.0,
    "Покрытие моделей": 9.8,
    "Контекст": 15.0,
    "Бенчмарки": 7.1,
    "Лимиты": 0,
    "Доступ": 4.0
   },
   "place": 1
  },
  {
   "id": "OmniRoute / auto",
   "score": 73.6,
   "working": 1,
   "catalog": 0,
   "blocked": 0,
   "total": 1,
   "wr": 100,
   "access": "noauth",
   "color": "#22c55e",
   "benchAvg": 67.4,
   "ctxCap": 1048576,
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "varies",
   "uptime": "94%",
   "status": "working",
   "limits": "маршрутизация по free-пулу",
   "note": "auto/best-free и auto/coding:free — авто-роутер по бесплатным маршрутам.",
   "parts": {
    "Работоспособность": 40.0,
    "Покрытие моделей": 4.0,
    "Контекст": 15.0,
    "Бенчмарки": 9.6,
    "Лимиты": 0,
    "Доступ": 5.0
   },
   "place": 2
  },
  {
   "id": "OpenRouter",
   "score": 73.0,
   "working": 12,
   "catalog": 5,
   "blocked": 2,
   "total": 19,
   "wr": 63,
   "access": "api",
   "color": "#00f2fe",
   "benchAvg": 57.0,
   "ctxCap": 1048576,
   "rpm": 20,
   "rpd": 50,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "99.5%",
   "status": "working",
   "limits": "20 RPM / 50 RPD (1000 RPD с $10 top-up)",
   "note": "20 zero-price моделей прямо сейчас. Единственный ключ на десятки семейств.",
   "parts": {
    "Работоспособность": 25.3,
    "Покрытие моделей": 17.4,
    "Контекст": 15.0,
    "Бенчмарки": 8.1,
    "Лимиты": 3.2,
    "Доступ": 4.0
   },
   "place": 3
  },
  {
   "id": "Freebuff",
   "score": 71.4,
   "working": 12,
   "catalog": 0,
   "blocked": 0,
   "total": 12,
   "wr": 100,
   "access": "api",
   "color": "#00ff66",
   "benchAvg": 68.2,
   "ctxCap": 262144,
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "96%",
   "status": "working",
   "limits": "100–150 Freebucks/день (tier)",
   "note": "Локальный прокси :23333. 18 моделей, включая Claude Opus 5.5 и GPT-6.1 Sol.",
   "parts": {
    "Работоспособность": 40.0,
    "Покрытие моделей": 13.9,
    "Контекст": 3.8,
    "Бенчмарки": 9.7,
    "Лимиты": 0,
    "Доступ": 4.0
   },
   "place": 4
  },
  {
   "id": "OmniRoute / ddgw",
   "score": 66.6,
   "working": 6,
   "catalog": 0,
   "blocked": 0,
   "total": 6,
   "wr": 100,
   "access": "noauth",
   "color": "#00ff66",
   "benchAvg": 56.1,
   "ctxCap": 262144,
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "95%",
   "status": "working",
   "limits": "нет явных лимитов; Cloudflare-кеш",
   "note": "DuckDuckGo Cloudflare — 6 моделей БЕЗ подключения и без ключа.",
   "parts": {
    "Работоспособность": 40.0,
    "Покрытие моделей": 9.8,
    "Контекст": 3.8,
    "Бенчмарки": 8.0,
    "Лимиты": 0,
    "Доступ": 5.0
   },
   "place": 5
  },
  {
   "id": "LLM7.io",
   "score": 66.2,
   "working": 7,
   "catalog": 0,
   "blocked": 0,
   "total": 7,
   "wr": 100,
   "access": "api",
   "color": "#22d3ee",
   "benchAvg": 55.4,
   "ctxCap": 262144,
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "96%",
   "status": "working",
   "limits": "free-подмножество без баланса; остальное — 402",
   "note": "Ключ уже есть в .env и подключён в Hermes. 67 моделей в каталоге, 7 реально бесплатны.",
   "parts": {
    "Работоспособность": 40.0,
    "Покрытие моделей": 10.6,
    "Контекст": 3.8,
    "Бенчмарки": 7.9,
    "Лимиты": 0,
    "Доступ": 4.0
   },
   "place": 6
  },
  {
   "id": "LLM7.io",
   "score": 64.4,
   "working": 7,
   "catalog": 0,
   "blocked": 0,
   "total": 7,
   "wr": 100,
   "access": "api",
   "color": "#22d3ee",
   "benchAvg": 55.4,
   "ctxCap": 131072,
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "90%",
   "status": "candidate",
   "limits": "free tier",
   "note": "5 моделей, text+code.",
   "parts": {
    "Работоспособность": 40.0,
    "Покрытие моделей": 10.6,
    "Контекст": 1.9,
    "Бенчмарки": 7.9,
    "Лимиты": 0,
    "Доступ": 4.0
   },
   "place": 7
  },
  {
   "id": "NiloVR",
   "score": 61.5,
   "working": 2,
   "catalog": 0,
   "blocked": 0,
   "total": 2,
   "wr": 100,
   "access": "api",
   "color": "#f472b6",
   "benchAvg": 56.8,
   "ctxCap": 262144,
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "90%",
   "status": "working",
   "limits": "2 из 64 моделей доступны бесплатно",
   "note": "Ключ есть в .env, подключён в Hermes. nemotron-3-ultra + laguna-s-2.1 отвечают 200.",
   "parts": {
    "Работоспособность": 40.0,
    "Покрытие моделей": 5.7,
    "Контекст": 3.8,
    "Бенчмарки": 8.1,
    "Лимиты": 0,
    "Доступ": 4.0
   },
   "place": 8
  },
  {
   "id": "NVIDIA NIM",
   "score": 53.4,
   "working": 1,
   "catalog": 2,
   "blocked": 0,
   "total": 3,
   "wr": 33,
   "access": "api",
   "color": "#76b900",
   "benchAvg": 62.2,
   "ctxCap": 1000000,
   "rpm": 40,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "99%",
   "status": "working",
   "limits": "~40 RPM, без дневного капа",
   "note": "Самый щедрый RPM. Nemotron 3.5 Lightning — PROBE_OK.",
   "parts": {
    "Работоспособность": 13.3,
    "Покрытие моделей": 6.9,
    "Контекст": 14.3,
    "Бенчмарки": 8.9,
    "Лимиты": 6.0,
    "Доступ": 4.0
   },
   "place": 9
  },
  {
   "id": "BeatAPI",
   "score": 45.2,
   "working": 2,
   "catalog": 2,
   "blocked": 0,
   "total": 4,
   "wr": 50,
   "access": "api",
   "color": "#f59e0b",
   "benchAvg": 65.1,
   "ctxCap": 262144,
   "rpm": 1,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "93%",
   "status": "catalog",
   "limits": "1 RPM без top-up, до 10 RPM после",
   "note": "Слабый RPM — только emergency fallback.",
   "parts": {
    "Работоспособность": 20.0,
    "Покрытие моделей": 8.0,
    "Контекст": 3.8,
    "Бенчмарки": 9.3,
    "Лимиты": 0.1,
    "Доступ": 4.0
   },
   "place": 10
  },
  {
   "id": "OpenCode Free",
   "score": 39.8,
   "working": 0,
   "catalog": 10,
   "blocked": 0,
   "total": 10,
   "wr": 0,
   "access": "local",
   "color": "#84cc16",
   "benchAvg": 60.4,
   "ctxCap": 1048576,
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "90%",
   "status": "catalog",
   "limits": "дневная квота, точная цифра скрыта",
   "note": "Только из нативного OpenCode. Внешний CLI → 403 FreeTierError. Прокси :8789 не запущен.",
   "parts": {
    "Работоспособность": 0.0,
    "Покрытие моделей": 12.6,
    "Контекст": 15.0,
    "Бенчмарки": 8.6,
    "Лимиты": 0,
    "Доступ": 3.5
   },
   "place": 11
  },
  {
   "id": "OrcaRouter",
   "score": 20.0,
   "working": 0,
   "catalog": 0,
   "blocked": 2,
   "total": 2,
   "wr": 0,
   "access": "api",
   "color": "#ef4444",
   "benchAvg": 62.5,
   "ctxCap": 262144,
   "rpm": 10,
   "rpd": 50,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "—",
   "status": "blocked",
   "limits": "10 RPM / 50 RPD (Hy4: 50/250)",
   "note": "HTTP 429 — нужна GitHub/account eligibility. Модели живые, доступа нет.",
   "parts": {
    "Работоспособность": 0.0,
    "Покрытие моделей": 5.7,
    "Контекст": 3.8,
    "Бенчмарки": 8.9,
    "Лимиты": 1.7,
    "Доступ": 0.0
   },
   "place": 12
  },
  {
   "id": "Google AI Studio",
   "score": 17.5,
   "working": 0,
   "catalog": 0,
   "blocked": 0,
   "total": 0,
   "wr": 0,
   "access": "api",
   "color": "#4285f4",
   "benchAvg": null,
   "ctxCap": 1048576,
   "rpm": 10,
   "rpd": 250,
   "tpd": null,
   "card": false,
   "training": "yes (кроме EEA)",
   "uptime": "—",
   "status": "blocked",
   "limits": "5–15 RPM / 20–1500 RPD",
   "note": "Ключ есть, но HTTP 429 quota. Gemini Flash до 1M ctx.",
   "parts": {
    "Работоспособность": 0,
    "Покрытие моделей": 0,
    "Контекст": 15.0,
    "Бенчмарки": 0,
    "Лимиты": 2.5,
    "Доступ": 0.0
   },
   "place": 13
  },
  {
   "id": "Cerebras",
   "score": 15.4,
   "working": 0,
   "catalog": 0,
   "blocked": 0,
   "total": 0,
   "wr": 0,
   "access": "api",
   "color": "#ff6b35",
   "benchAvg": null,
   "ctxCap": 131072,
   "rpm": 30,
   "rpd": null,
   "tpd": 1000000,
   "card": false,
   "training": "no",
   "uptime": "99.9%",
   "status": "candidate",
   "limits": "30 RPM / ~1M токенов/день",
   "note": "Нужно добавить CEREBRAS_API_KEY. Самая большая дневная квота в токенах.",
   "parts": {
    "Работоспособность": 0,
    "Покрытие моделей": 0,
    "Контекст": 1.9,
    "Бенчмарки": 0,
    "Лимиты": 9.5,
    "Доступ": 4.0
   },
   "place": 14
  },
  {
   "id": "Groq",
   "score": 14.4,
   "working": 0,
   "catalog": 0,
   "blocked": 0,
   "total": 0,
   "wr": 0,
   "access": "api",
   "color": "#f55036",
   "benchAvg": null,
   "ctxCap": 131072,
   "rpm": 30,
   "rpd": 1000,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "99.9%",
   "status": "candidate",
   "limits": "30 RPM / 1000 RPD",
   "note": "Нужно добавить GROQ_API_KEY. ~320 tok/s на Llama 3.3 70B.",
   "parts": {
    "Работоспособность": 0,
    "Покрытие моделей": 0,
    "Контекст": 1.9,
    "Бенчмарки": 0,
    "Лимиты": 8.5,
    "Доступ": 4.0
   },
   "place": 15
  },
  {
   "id": "CommandCode",
   "score": 14.3,
   "working": 0,
   "catalog": 0,
   "blocked": 0,
   "total": 0,
   "wr": 0,
   "access": "api",
   "color": "#ef4444",
   "benchAvg": null,
   "ctxCap": 1000000,
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": true,
   "training": "no",
   "uptime": "—",
   "status": "blocked",
   "limits": "free-alias требуют credits/entitlement",
   "note": "HTTP 400 insufficient credits. Каталог богатый: DeepSeek, Kimi, MiMo, Hy4, stealth.",
   "parts": {
    "Работоспособность": 0,
    "Покрытие моделей": 0,
    "Контекст": 14.3,
    "Бенчмарки": 0,
    "Лимиты": 0,
    "Доступ": 0.0
   },
   "place": 16
  },
  {
   "id": "Requesty",
   "score": 9.7,
   "working": 0,
   "catalog": 0,
   "blocked": 0,
   "total": 0,
   "wr": 0,
   "access": "api",
   "color": "#6366f1",
   "benchAvg": null,
   "ctxCap": 131072,
   "rpm": 20,
   "rpd": 200,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "96%",
   "status": "candidate",
   "limits": "200 RPD / 20 RPM",
   "note": ":free модели, низкоприоритетная очередь.",
   "parts": {
    "Работоспособность": 0,
    "Покрытие моделей": 0,
    "Контекст": 1.9,
    "Бенчмарки": 0,
    "Лимиты": 3.8,
    "Доступ": 4.0
   },
   "place": 17
  },
  {
   "id": "Cohere",
   "score": 9.3,
   "working": 0,
   "catalog": 0,
   "blocked": 0,
   "total": 0,
   "wr": 0,
   "access": "api",
   "color": "#39594d",
   "benchAvg": null,
   "ctxCap": 131072,
   "rpm": 20,
   "rpd": 100,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "98%",
   "status": "candidate",
   "limits": "~100 RPD, только non-commercial",
   "note": "Command R+ для RAG.",
   "parts": {
    "Работоспособность": 0,
    "Покрытие моделей": 0,
    "Контекст": 1.9,
    "Бенчмарки": 0,
    "Лимиты": 3.4,
    "Доступ": 4.0
   },
   "place": 18
  },
  {
   "id": "GitHub Models / Copilot",
   "score": 9.1,
   "working": 0,
   "catalog": 0,
   "blocked": 0,
   "total": 0,
   "wr": 0,
   "access": "oauth",
   "color": "#a78bfa",
   "benchAvg": null,
   "ctxCap": 128000,
   "rpm": 15,
   "rpd": 500,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "99%",
   "status": "candidate",
   "limits": "Models: 15 RPM / 150–1000 RPD. Copilot Free: 2000 completions + 50 chat/мес",
   "note": "GITHUB_TOKEN уже есть. Copilot даёт Claude/GPT/Gemini по подписке GitHub.",
   "parts": {
    "Работоспособность": 0,
    "Покрытие моделей": 0,
    "Контекст": 1.8,
    "Бенчмарки": 0,
    "Лимиты": 4.2,
    "Доступ": 3.0
   },
   "place": 19
  },
  {
   "id": "GitHub Models",
   "score": 9.1,
   "working": 0,
   "catalog": 0,
   "blocked": 0,
   "total": 0,
   "wr": 0,
   "access": "oauth",
   "color": "#a78bfa",
   "benchAvg": null,
   "ctxCap": 128000,
   "rpm": 15,
   "rpd": 500,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "99%",
   "status": "candidate",
   "limits": "15 RPM / 150–1000 RPD",
   "note": "GITHUB_TOKEN уже есть. GPT-4o, Claude 3.5 Sonnet, Llama, Phi.",
   "parts": {
    "Работоспособность": 0,
    "Покрытие моделей": 0,
    "Контекст": 1.8,
    "Бенчмарки": 0,
    "Лимиты": 4.2,
    "Доступ": 3.0
   },
   "place": 20
  },
  {
   "id": "SambaNova",
   "score": 9.0,
   "working": 0,
   "catalog": 0,
   "blocked": 0,
   "total": 0,
   "wr": 0,
   "access": "api",
   "color": "#ee7623",
   "benchAvg": null,
   "ctxCap": 131072,
   "rpm": 20,
   "rpd": 20,
   "tpd": null,
   "card": true,
   "training": "no",
   "uptime": "98%",
   "status": "candidate",
   "limits": "20 RPM / 20 RPD на модель",
   "note": "$5 trial credits.",
   "parts": {
    "Работоспособность": 0,
    "Покрытие моделей": 0,
    "Контекст": 1.9,
    "Бенчмарки": 0,
    "Лимиты": 3.1,
    "Доступ": 4.0
   },
   "place": 21
  },
  {
   "id": "OVH Cloud",
   "score": 7.2,
   "working": 0,
   "catalog": 0,
   "blocked": 0,
   "total": 0,
   "wr": 0,
   "access": "noauth",
   "color": "#123f6d",
   "benchAvg": null,
   "ctxCap": 131072,
   "rpm": 2,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "95%",
   "status": "candidate",
   "limits": "2 RPM / IP / модель",
   "note": "Анонимные вызовы без аккаунта. 7 моделей.",
   "parts": {
    "Работоспособность": 0,
    "Покрытие моделей": 0,
    "Контекст": 1.9,
    "Бенчмарки": 0,
    "Лимиты": 0.3,
    "Доступ": 5.0
   },
   "place": 22
  },
  {
   "id": "Z AI (Zhipu)",
   "score": 6.9,
   "working": 0,
   "catalog": 0,
   "blocked": 0,
   "total": 0,
   "wr": 0,
   "access": "api",
   "color": "#325ab4",
   "benchAvg": null,
   "ctxCap": 203000,
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "97%",
   "status": "candidate",
   "limits": "free tier, без карты",
   "note": "GLM-серия бесплатно.",
   "parts": {
    "Работоспособность": 0,
    "Покрытие моделей": 0,
    "Контекст": 2.9,
    "Бенчмарки": 0,
    "Лимиты": 0,
    "Доступ": 4.0
   },
   "place": 23
  },
  {
   "id": "Routeway",
   "score": 6.7,
   "working": 0,
   "catalog": 0,
   "blocked": 0,
   "total": 0,
   "wr": 0,
   "access": "api",
   "color": "#10b981",
   "benchAvg": null,
   "ctxCap": 131072,
   "rpm": null,
   "rpd": 200,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "95%",
   "status": "candidate",
   "limits": "200 RPD, низкий приоритет",
   "note": ":free модели.",
   "parts": {
    "Работоспособность": 0,
    "Покрытие моделей": 0,
    "Контекст": 1.9,
    "Бенчмарки": 0,
    "Лимиты": 0.8,
    "Доступ": 4.0
   },
   "place": 24
  },
  {
   "id": "Mistral",
   "score": 5.9,
   "working": 0,
   "catalog": 0,
   "blocked": 0,
   "total": 0,
   "wr": 0,
   "access": "api",
   "color": "#ff7000",
   "benchAvg": null,
   "ctxCap": 131072,
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "yes (opt-in)",
   "uptime": "99%",
   "status": "candidate",
   "limits": "~1B токенов/мес (Experiment)",
   "note": "Нужно добавить MISTRAL_API_KEY. Самая щедрая месячная квота, но с обучением на данных.",
   "parts": {
    "Работоспособность": 0,
    "Покрытие моделей": 0,
    "Контекст": 1.9,
    "Бенчмарки": 0,
    "Лимиты": 0,
    "Доступ": 4.0
   },
   "place": 25
  },
  {
   "id": "Chutes.ai",
   "score": 5.9,
   "working": 0,
   "catalog": 0,
   "blocked": 0,
   "total": 0,
   "wr": 0,
   "access": "api",
   "color": "#8b5cf6",
   "benchAvg": null,
   "ctxCap": 131072,
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "95%",
   "status": "candidate",
   "limits": "community tier",
   "note": "OSS-модели через community tier.",
   "parts": {
    "Работоспособность": 0,
    "Покрытие моделей": 0,
    "Контекст": 1.9,
    "Бенчмарки": 0,
    "Лимиты": 0,
    "Доступ": 4.0
   },
   "place": 26
  },
  {
   "id": "ModelScope",
   "score": 5.9,
   "working": 0,
   "catalog": 0,
   "blocked": 0,
   "total": 0,
   "wr": 0,
   "access": "api",
   "color": "#ff6a00",
   "benchAvg": null,
   "ctxCap": 131072,
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "96%",
   "status": "candidate",
   "limits": "community tier",
   "note": "Alibaba — Qwen и многое другое.",
   "parts": {
    "Работоспособность": 0,
    "Покрытие моделей": 0,
    "Контекст": 1.9,
    "Бенчмарки": 0,
    "Лимиты": 0,
    "Доступ": 4.0
   },
   "place": 27
  },
  {
   "id": "Kilo Code",
   "score": 5.9,
   "working": 0,
   "catalog": 0,
   "blocked": 0,
   "total": 0,
   "wr": 0,
   "access": "api",
   "color": "#a3e635",
   "benchAvg": null,
   "ctxCap": 131072,
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "95%",
   "status": "candidate",
   "limits": "free tier",
   "note": "4 coding-модели.",
   "parts": {
    "Работоспособность": 0,
    "Покрытие моделей": 0,
    "Контекст": 1.9,
    "Бенчмарки": 0,
    "Лимиты": 0,
    "Доступ": 4.0
   },
   "place": 28
  },
  {
   "id": "OVH AI Endpoints",
   "score": 5.9,
   "working": 0,
   "catalog": 0,
   "blocked": 0,
   "total": 0,
   "wr": 0,
   "access": "api",
   "color": "#123f6d",
   "benchAvg": null,
   "ctxCap": 131072,
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "97%",
   "status": "candidate",
   "limits": "free tier, без карты",
   "note": "7 моделей, text+code+image.",
   "parts": {
    "Работоспособность": 0,
    "Покрытие моделей": 0,
    "Контекст": 1.9,
    "Бенчмарки": 0,
    "Лимиты": 0,
    "Доступ": 4.0
   },
   "place": 29
  },
  {
   "id": "SiliconFlow",
   "score": 5.9,
   "working": 0,
   "catalog": 0,
   "blocked": 0,
   "total": 0,
   "wr": 0,
   "access": "api",
   "color": "#6d28d9",
   "benchAvg": null,
   "ctxCap": 131072,
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "96%",
   "status": "candidate",
   "limits": "$1 кредит на .com, free на .cn",
   "note": "6 моделей.",
   "parts": {
    "Работоспособность": 0,
    "Покрытие моделей": 0,
    "Контекст": 1.9,
    "Бенчмарки": 0,
    "Лимиты": 0,
    "Доступ": 4.0
   },
   "place": 30
  },
  {
   "id": "Cyrus Relay",
   "score": 5.9,
   "working": 0,
   "catalog": 0,
   "blocked": 0,
   "total": 0,
   "wr": 0,
   "access": "api",
   "color": "#e11d48",
   "benchAvg": null,
   "ctxCap": 131072,
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "88%",
   "status": "candidate",
   "limits": "free-tier модели, без аккаунта",
   "note": "Премиум-тарифы через крипту.",
   "parts": {
    "Работоспособность": 0,
    "Покрытие моделей": 0,
    "Контекст": 1.9,
    "Бенчмарки": 0,
    "Лимиты": 0,
    "Доступ": 4.0
   },
   "place": 31
  },
  {
   "id": "AI Horde",
   "score": 5.1,
   "working": 0,
   "catalog": 0,
   "blocked": 0,
   "total": 0,
   "wr": 0,
   "access": "noauth",
   "color": "#ff8c42",
   "benchAvg": null,
   "ctxCap": 8192,
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "90%",
   "status": "candidate",
   "limits": "краудсорс, без гарантий",
   "note": "165 моделей в OmniRoute, но это image-gen — на /v1/chat/completions 400.",
   "parts": {
    "Работоспособность": 0,
    "Покрытие моделей": 0,
    "Контекст": 0.1,
    "Бенчмарки": 0,
    "Лимиты": 0,
    "Доступ": 5.0
   },
   "place": 32
  },
  {
   "id": "Cloudflare Workers AI",
   "score": 4.1,
   "working": 0,
   "catalog": 0,
   "blocked": 0,
   "total": 0,
   "wr": 0,
   "access": "api",
   "color": "#f6821f",
   "benchAvg": null,
   "ctxCap": 8192,
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "99.9%",
   "status": "candidate",
   "limits": "10K нейронов/день (сброс 00:00 UTC)",
   "note": "Малые ctx, но щедро. 20+ моделей.",
   "parts": {
    "Работоспособность": 0,
    "Покрытие моделей": 0,
    "Контекст": 0.1,
    "Бенчмарки": 0,
    "Лимиты": 0,
    "Доступ": 4.0
   },
   "place": 33
  },
  {
   "id": "Hugging Face",
   "score": 4.0,
   "working": 0,
   "catalog": 0,
   "blocked": 0,
   "total": 0,
   "wr": 0,
   "access": "api",
   "color": "#ff9d00",
   "benchAvg": null,
   "ctxCap": null,
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": false,
   "training": "no",
   "uptime": "98%",
   "status": "candidate",
   "limits": "community rate limit",
   "note": "100K+ OSS моделей через Inference API.",
   "parts": {
    "Работоспособность": 0,
    "Покрытие моделей": 0,
    "Контекст": 0.0,
    "Бенчмарки": 0,
    "Лимиты": 0,
    "Доступ": 4.0
   },
   "place": 34
  },
  {
   "id": "B.AI",
   "score": 2.9,
   "working": 0,
   "catalog": 0,
   "blocked": 0,
   "total": 0,
   "wr": 0,
   "access": "api",
   "color": "#ef4444",
   "benchAvg": null,
   "ctxCap": 200000,
   "rpm": null,
   "rpd": null,
   "tpd": null,
   "card": true,
   "training": "no",
   "uptime": "—",
   "status": "blocked",
   "limits": "баланс $0 → 402 на всех моделях",
   "note": "Ключ есть, 62 модели (Opus 5.5, Fable 5.1, Haiku 5.5, Gemini 3.8, GPT-6.1 Sol). Нужен депозит.",
   "parts": {
    "Работоспособность": 0,
    "Покрытие моделей": 0,
    "Контекст": 2.9,
    "Бенчмарки": 0,
    "Лимиты": 0,
    "Доступ": 0.0
   },
   "place": 35
  }
 ],
 "taskMatrix": {
  "tasks": [
   "Кодинг",
   "Reasoning",
   "UI",
   "Vision",
   "Tools",
   "Fast Agent",
   "Stealth",
   "Long Context",
   "Планирование"
  ],
  "rows": [
   {
    "name": "DeepSeek V4.1 Flash",
    "f": "deepseek-v4.1-flash",
    "v": [
     3,
     3,
     1,
     2,
     3,
     2,
     0,
     1,
     2
    ]
   },
   {
    "name": "Kimi K3",
    "f": "kimi-k3",
    "v": [
     3,
     3,
     1,
     0,
     2,
     1,
     0,
     2,
     3
    ]
   },
   {
    "name": "MiMo V2.6 Pro",
    "f": "mimo-v2.6-pro",
    "v": [
     3,
     3,
     3,
     0,
     2,
     1,
     0,
     1,
     2
    ]
   },
   {
    "name": "MiMo V2.6 Flash",
    "f": "mimo-v2.6-flash",
    "v": [
     2,
     2,
     3,
     0,
     2,
     3,
     0,
     1,
     1
    ]
   },
   {
    "name": "GLM-5.3 Flash",
    "f": "glm-5.3-flash",
    "v": [
     3,
     1,
     1,
     0,
     2,
     3,
     0,
     0,
     1
    ]
   },
   {
    "name": "MiniMax M3.1 Flash",
    "f": "minimax-m3.1-flash",
    "v": [
     3,
     2,
     1,
     2,
     3,
     3,
     0,
     2,
     1
    ]
   },
   {
    "name": "Hy4 Preview",
    "f": "hy4-preview",
    "v": [
     2,
     3,
     1,
     0,
     2,
     2,
     0,
     3,
     2
    ]
   },
   {
    "name": "Nemotron 3.5 Lightning",
    "f": "nemotron-3.5-lightning",
    "v": [
     2,
     2,
     0,
     1,
     3,
     3,
     0,
     2,
     1
    ]
   },
   {
    "name": "Nemotron 3 Ultra / Super VL",
    "f": "nemotron-3-ultra",
    "v": [
     2,
     3,
     1,
     3,
     2,
     1,
     0,
     2,
     1
    ]
   },
   {
    "name": "Laguna S 2.1",
    "f": "laguna-s-2.1",
    "v": [
     2,
     1,
     0,
     0,
     1,
     1,
     0,
     1,
     0
    ]
   },
   {
    "name": "LongCat 2.5 Preview",
    "f": "longcat-2.5",
    "v": [
     2,
     2,
     0,
     0,
     1,
     1,
     0,
     3,
     1
    ]
   },
   {
    "name": "Inkling / Inkling Small",
    "f": "inkling",
    "v": [
     3,
     3,
     1,
     1,
     2,
     2,
     0,
     3,
     1
    ]
   },
   {
    "name": "Gemma 4 26B / 31B",
    "f": "gemma-4",
    "v": [
     1,
     2,
     0,
     0,
     1,
     1,
     0,
     1,
     0
    ]
   },
   {
    "name": "North Mini Code",
    "f": "north-mini-code",
    "v": [
     3,
     1,
     0,
     0,
     2,
     2,
     0,
     1,
     0
    ]
   },
   {
    "name": "Xing 4.0 29B-A4B",
    "f": "xing-4.0",
    "v": [
     1,
     2,
     0,
     0,
     1,
     1,
     0,
     1,
     0
    ]
   },
   {
    "name": "Qwen 3.8 Max / Flash",
    "f": "qwen-3.8",
    "v": [
     2,
     3,
     1,
     1,
     2,
     2,
     0,
     1,
     2
    ]
   },
   {
    "name": "Step 3.7 Flash",
    "f": "step-3.7-flash",
    "v": [
     2,
     2,
     0,
     0,
     1,
     2,
     0,
     1,
     1
    ]
   },
   {
    "name": "Solar Mini4",
    "f": "solar-mini4",
    "v": [
     1,
     1,
     0,
     0,
     1,
     1,
     0,
     0,
     0
    ]
   },
   {
    "name": "DuckDuckGo Cloudflare",
    "f": "ddgw-free",
    "v": [
     1,
     2,
     0,
     0,
     1,
     2,
     0,
     1,
     0
    ]
   },
   {
    "name": "Claude Opus 5.5 / GPT-6.1 / Grok",
    "f": "claude-opus-5.5",
    "v": [
     3,
     3,
     2,
     2,
     3,
     2,
     0,
     2,
     3
    ]
   },
   {
    "name": "Space Bunny / Ox Alpha",
    "f": "space-bunny",
    "v": [
     0,
     2,
     0,
     0,
     1,
     2,
     3,
     1,
     0
    ]
   },
   {
    "name": "Beam / Big Pickle",
    "f": "beam-pickle",
    "v": [
     1,
     2,
     0,
     0,
     1,
     1,
     3,
     1,
     0
    ]
   },
   {
    "name": "LLM7.io free subset",
    "f": "llm7-free",
    "v": [
     2,
     2,
     1,
     0,
     2,
     2,
     0,
     1,
     0
    ]
   },
   {
    "name": "LFM 2.5 2.6B",
    "f": "lfm-2.5",
    "v": [
     0,
     0,
     0,
     0,
     0,
     1,
     0,
     0,
     0
    ]
   }
  ]
 },
 "presets": [
  {
   "id": "working",
   "label": "Только рабочие",
   "f": {
    "status": "Working"
   }
  },
  {
   "id": "ctxmax",
   "label": "Максимум ctx",
   "f": {
    "ctx": "≥1M"
   },
   "sort": "ctx"
  },
  {
   "id": "swe",
   "label": "Лучшие по SWE",
   "f": {
    "bench": "SWE ≥60%"
   },
   "sort": "swe"
  },
  {
   "id": "noauth",
   "label": "Без ключа",
   "f": {
    "src": "No-Auth"
   }
  },
  {
   "id": "freeonly",
   "label": "Только free (без preview)",
   "f": {
    "type": "Free"
   }
  },
  {
   "id": "stealth",
   "label": "Stealth / preview",
   "f": {
    "type": "Preview"
   }
  }
 ],
 "meta": {
  "omnirouteTotal": 1294,
  "omniroutePrefixes": {
   "auto": 45,
   "agy": 25,
   "no-think": 63,
   "antigravity": 19,
   "dva": 110,
   "oc": 10,
   "ddgw": 6,
   "cfp": 20,
   "veoaifree-web": 2,
   "veo-free": 2,
   "aug": 28,
   "zc": 14,
   "cxa": 45,
   "unc": 1,
   "aihorde": 167,
   "openrouter": 737
  },
  "openrouterLiveFree": 20,
  "nousLiveFree": 7
 }
};
