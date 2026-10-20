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
   "id": "content-safety",
   "rank": 28,
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
   "place": 6
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
   "place": 7
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
   "place": 8
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
   "place": 9
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
   "place": 10
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
   "place": 11
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
   "place": 12
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
   "place": 13
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
   "place": 14
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
   "place": 15
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
   "place": 16
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
   "place": 17
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
   "place": 18
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
   "place": 19
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
   "place": 20
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
   "place": 21
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
   "place": 22
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
   "place": 23
  },
  {
   "id": "LLM7.io",
   "score": 5.9,
   "working": 0,
   "catalog": 0,
   "blocked": 0,
   "total": 0,
   "wr": 0,
   "access": "api",
   "color": "#22d3ee",
   "benchAvg": null,
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
    "Работоспособность": 0,
    "Покрытие моделей": 0,
    "Контекст": 1.9,
    "Бенчмарки": 0,
    "Лимиты": 0,
    "Доступ": 4.0
   },
   "place": 24
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
   "place": 25
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
   "place": 26
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
   "place": 27
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
   "place": 28
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
   "place": 29
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
   "place": 30
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
   "place": 31
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
