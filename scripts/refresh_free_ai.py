"""Daily refresh for the Free AI Universe data.

Pulls the live free catalogues (OpenRouter, Nous, OmniRoute) and reports what
changed since the last snapshot. Run standalone:
    python scripts/refresh_free_ai.py
Prints a compact diff report on stdout (no LLM needed).
"""
import io, json, os, sqlite3, subprocess, sys, urllib.request, datetime

SITE = r"D:/hermes/projects/site_arch1cat"
OUT = os.path.join(SITE, "data")
ENV = r"C:/Users/z/AppData/Local/hermes/.env"
SCRIPTS = os.path.join(SITE, "scripts")

env = {}
for line in io.open(ENV, encoding="utf-8", errors="replace"):
    s = line.strip()
    if not s or s.startswith("#") or "=" not in s:
        continue
    k, v = s.split("=", 1)
    env[k.strip()] = v.strip().strip('"').strip("'")

def http_json(url, key=None, timeout=30):
    h = {"Accept": "application/json"}
    if key:
        h["Authorization"] = f"Bearer {key}"
    req = urllib.request.Request(url, headers=h)
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read().decode("utf-8", "replace"))

report = []
today = datetime.date.today().isoformat()

# ---------- OpenRouter live zero-price
try:
    d = http_json("https://openrouter.ai/api/v1/models", env["OPENROUTER_API_KEY"])
    live = sorted(m["id"] for m in d["data"]
                  if (m.get("pricing") or {}).get("prompt") == "0"
                  and (m.get("pricing") or {}).get("completion") == "0")
    report.append(f"OpenRouter live zero-price: {len(live)}")
    for i in live:
        report.append(f"  OR {i}")
except Exception as e:
    report.append(f"OpenRouter ERROR: {e}")

# ---------- Nous live :free
try:
    d = http_json("https://inference-api.nousresearch.com/v1/models", env["NOUS_API_KEY"])
    live = sorted(str(m.get("id")) for m in d.get("data", []) if str(m.get("id")).endswith(":free"))
    report.append(f"NOUS live :free: {len(live)}")
    for i in live:
        report.append(f"  NOUS {i}")
except Exception as e:
    report.append(f"NOUS ERROR: {e}")

# ---------- OmniRoute catalogue
try:
    con = sqlite3.connect("file:C:/Users/z/.omniroute/storage.sqlite?mode=ro", uri=True)
    cur = con.cursor()
    cur.execute("SELECT key FROM api_keys WHERE name='hermes'")
    okey = cur.fetchone()[0]
    od = http_json("http://localhost:20128/v1/models", okey, timeout=25)
    ids = [m["id"] for m in od.get("data", [])]
    groups = {}
    for i in ids:
        groups.setdefault(i.split("/")[0] if "/" in i else "(bare)", 0)
        groups[i.split("/")[0] if "/" in i else "(bare)"] += 1
    report.append(f"OmniRoute catalogue: {len(ids)} models, {len(groups)} prefixes")
    for p, n in sorted(groups.items(), key=lambda x: -x[1]):
        report.append(f"  {p}: {n}")
except Exception as e:
    report.append(f"OmniRoute ERROR: {e}")

# ---------- diff vs previous snapshot
snap_path = os.path.join(OUT, "_raw_snapshot.json")
prev = {}
if os.path.exists(snap_path):
    try:
        p = json.load(io.open(snap_path, encoding="utf-8"))
        prev = {"or": {m["id"] for m in p.get("openrouter", [])},
                "nous": {m["id"] for m in p.get("nous", [])},
                "date": p.get("snapshot")}
    except Exception:
        pass

cur_or = {ln.strip().split(" ", 1)[1] for ln in report if ln.startswith("  OR ")}
cur_nous = {ln.strip().split(" ", 1)[1] for ln in report if ln.startswith("  NOUS ")}

if prev:
    new_or = sorted(cur_or - prev.get("or", set()))
    gone_or = sorted(prev.get("or", set()) - cur_or)
    new_nous = sorted(cur_nous - prev.get("nous", set()))
    gone_nous = sorted(prev.get("nous", set()) - cur_nous)
    report.append("")
    report.append(f"=== DIFF vs {prev.get('date')} ===")
    report.append(f"NEW OpenRouter ({len(new_or)}): {', '.join(new_or) if new_or else '—'}")
    report.append(f"GONE OpenRouter ({len(gone_or)}): {', '.join(gone_or) if gone_or else '—'}")
    report.append(f"NEW Nous ({len(new_nous)}): {', '.join(new_nous) if new_nous else '—'}")
    report.append(f"GONE Nous ({len(gone_nous)}): {', '.join(gone_nous) if gone_nous else '—'}")
    changed = bool(new_or or gone_or or new_nous or gone_nous)
else:
    report.append("=== no previous snapshot — first run ===")
    changed = True

report.append(f"SNAPSHOT_DATE={today}")
report.append(f"CHANGED={changed}")

print("\n".join(report))

# ---------- refresh the data files (only when the live catalogues changed)
if changed:
    r = subprocess.run([sys.executable, os.path.join(SCRIPTS, "build_free_ai_data.py")],
                       capture_output=True, text=True, cwd=SITE)
    report.append("build_free_ai_data.py: " + (r.stdout.strip().splitlines()[-1] if r.stdout.strip() else r.stderr[:200]))
    r2 = subprocess.run([sys.executable, os.path.join(SCRIPTS, "gen_free_ai_js.py")],
                        capture_output=True, text=True, cwd=SITE)
    report.append("gen_free_ai_js.py: " + (r2.stdout.strip().splitlines()[-1] if r2.stdout.strip() else r2.stderr[:200]))

    # bump the data cache-buster in the page so browsers pick up the new snapshot
    page = os.path.join(SITE, "ai-matrix.html")
    html = io.open(page, encoding="utf-8").read()
    import re as _re
    m = _re.search(r"data/free-ai\.js\?v=(\d+)", html)
    if m:
        newv = int(m.group(1)) + 1
        html = html.replace(f"data/free-ai.js?v={m.group(1)}", f"data/free-ai.js?v={newv}")
        io.open(page, "w", encoding="utf-8", newline="\n").write(html)
        report.append(f"cache-buster bumped -> v={newv}")

    # publish
    g = lambda *a: subprocess.run(["git", "-c", "safe.directory=D:/hermes/projects/site_arch1cat", *a],
                                  capture_output=True, text=True, cwd=SITE)
    g("add", "-A", "data", "ai-matrix.html")
    cm = g("commit", "-m", f"chore: daily refresh {today}")
    if "nothing to commit" not in (cm.stdout + cm.stderr):
        ps = g("push", "origin", "main")
        report.append("push: " + ((ps.stdout or ps.stderr).strip().splitlines()[-1] if (ps.stdout or ps.stderr).strip() else "?"))
    else:
        report.append("nothing to commit")
    print("\n".join(report[-4:]))
