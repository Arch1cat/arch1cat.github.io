with open("kage_full.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

import re

# 1. Extract CSS
css_match = re.search(r'<style>(.*?)</style>', html, re.DOTALL)
if css_match:
    css = css_match.group(1).strip()
    with open("assets/css/kage-style.css", "w", encoding="utf-8") as out:
        out.write(css)
    print(f"Extracted CSS: {len(css)} chars to assets/css/kage-style.css")

# 2. Extract Script 2 (Three.js procedural engine)
scripts = re.findall(r'<script.*?>\s*(/\* =====================================================================\s*KAGE.*?)</script>', html, re.DOTALL)
if scripts:
    js_code = scripts[0].strip()
    with open("assets/kage/kage-engine.js", "w", encoding="utf-8") as out:
        out.write(js_code)
    print(f"Extracted Three.js script: {len(js_code)} chars to assets/kage/kage-engine.js")
else:
    print("Could not find Kage Three.js script!")
