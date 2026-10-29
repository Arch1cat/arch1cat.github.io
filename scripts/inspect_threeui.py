with open("threeui_kage.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

import re
print("Length of html:", len(html))

# Search for code, skill, npm, scripts, iframes
for kw in ['skill', 'Skill', 'SKILL', 'npm', '@designcodeio', 'code', 'Usage', 'usage', 'props', 'Props', 'iframe']:
    m = re.findall(rf'.{{0,60}}{kw}.{{0,60}}', html)
    print(f"Keyword '{kw}' found {len(m)} times. First 3:")
    for snippet in m[:3]:
        print("  ->", snippet.strip().replace('\n', ' '))
