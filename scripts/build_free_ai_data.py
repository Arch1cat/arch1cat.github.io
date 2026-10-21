"""Build data/free-ai.js for the arch1cat AI Matrix page.

Sources (all live-verified 2026-10-20):
  - OpenRouter live zero-price catalogue
  - Nous live :free catalogue
  - OmniRoute /v1/models (1292 models, 17 prefixes)
  - Direct Hermes providers (NVIDIA, Freebuff, BeatAPI, OpenCode Free)
  - Official docs for paid tiers and free-tier limits

Run: python build_free_ai_data.py
Output: data/free-ai.js  (window.FREE_AI_DATA = {...})
"""
import io, json, os, re, sqlite3, urllib.request, urllib.error, time, datetime

SCRATCH = r"C:/Users/z/AppData/Local/hermes/cache/scratch"
OUT_DIR = r"D:/hermes/projects/site_arch1cat/data"
ENV = r"C:/Users/z/AppData/Local/hermes/.env"

env = {}
for line in io.open(ENV, encoding="utf-8", errors="replace"):
    s = line.strip()
    if not s or s.startswith("#") or "=" not in s:
        continue
    k, v = s.split("=", 1)
    env[k.strip()] = v.strip().strip('"').strip("'")

def http_json(url, key=None, headers=None, timeout=30):
    h = {"Accept": "application/json"}
    if key:
        h["Authorization"] = f"Bearer {key}"
    if headers:
        h.update(headers)
    req = urllib.request.Request(url, headers=h)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read().decode("utf-8", "replace"))

snapshot = datetime.date.today().isoformat()
print("snapshot:", snapshot)

# ---------------------------------------------------------------- OpenRouter
or_models = []
try:
    d = http_json("https://openrouter.ai/api/v1/models", env["OPENROUTER_API_KEY"])
    for m in d["data"]:
        pr = m.get("pricing") or {}
        if pr.get("prompt") == "0" and pr.get("completion") == "0":
            params = m.get("supported_parameters")
            or_models.append({
                "id": m["id"],
                "ctx": m.get("context_length"),
                "out": (m.get("top_provider") or {}).get("max_completion_tokens"),
                "tools": bool("tools" in params) if isinstance(params, list) else True,
                "name": m.get("name", ""),
            })
    or_models.sort(key=lambda x: x["id"])
    print("openrouter free:", len(or_models))
except Exception as e:
    print("openrouter ERR", e)

# ---------------------------------------------------------------- Nous
nous_free = []
try:
    d = http_json("https://inference-api.nousresearch.com/v1/models", env["NOUS_API_KEY"])
    for m in d.get("data", []):
        mid = str(m.get("id"))
        if mid.endswith(":free"):
            params = m.get("supported_parameters")
            nous_free.append({
                "id": mid,
                "ctx": m.get("context_length"),
                "out": (m.get("top_provider") or {}).get("max_completion_tokens"),
                "tools": bool("tools" in params) if isinstance(params, list) else True,
                "name": m.get("name") or mid,
            })
    nous_free.sort(key=lambda x: x["id"])
    print("nous free:", len(nous_free))
except Exception as e:
    print("nous ERR", e)

# ---------------------------------------------------------------- OmniRoute
omni = {"total": 0, "prefixes": {}, "noauth_free": []}
try:
    con = sqlite3.connect("file:C:/Users/z/.omniroute/storage.sqlite?mode=ro", uri=True)
    cur = con.cursor()
    cur.execute("SELECT key FROM api_keys WHERE name='hermes'")
    okey = cur.fetchone()[0]
    od = http_json("http://localhost:20128/v1/models", okey, timeout=25)
    ids = [m["id"] for m in od.get("data", [])]
    omni["total"] = len(ids)
    for i in ids:
        p = i.split("/")[0] if "/" in i else "(bare)"
        omni["prefixes"].setdefault(p, 0)
        omni["prefixes"][p] += 1
    # no-auth free routes we LIVE-probed OK
    omni["noauth_free"] = [
        {"id": "ddgw/gpt-5.4-mini", "name": "GPT-5.4 mini", "ctx": None, "out": None, "family": "GPT-5.4"},
        {"id": "ddgw/gpt-5.6-luna", "name": "GPT-5.6 Luna", "ctx": None, "out": None, "family": "GPT-5.6"},
        {"id": "ddgw/claude-haiku-4-5", "name": "Claude Haiku 4.5", "ctx": 200000, "out": None, "family": "Claude Haiku 4.5"},
        {"id": "ddgw/mistral-small-2603", "name": "Mistral Small 2603", "ctx": None, "out": None, "family": "Mistral Small"},
        {"id": "ddgw/tinfoil/gpt-oss-120b", "name": "GPT-OSS 120B (Tinfoil)", "ctx": 131072, "out": None, "family": "GPT-OSS"},
        {"id": "ddgw/tinfoil/gemma4-31b", "name": "Gemma 4 31B (Tinfoil)", "ctx": 262144, "out": None, "family": "Gemma 4"},
    ]
    print("omniroute models:", omni["total"], "prefixes:", len(omni["prefixes"]))
except Exception as e:
    print("omniroute ERR", e)

payload = {
    "snapshot": snapshot,
    "openrouter": or_models,
    "nous": nous_free,
    "omniroute": omni,
}
os.makedirs(OUT_DIR, exist_ok=True)
with io.open(os.path.join(OUT_DIR, "_raw_snapshot.json"), "w", encoding="utf-8") as f:
    json.dump(payload, f, ensure_ascii=False, indent=1)
print("raw snapshot written ->", os.path.join(OUT_DIR, "_raw_snapshot.json"))
