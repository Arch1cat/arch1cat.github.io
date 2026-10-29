with open("kage_full.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

import re
body_match = re.search(r'<body.*?>(.*?)<script', html, re.DOTALL)
if body_match:
    body_content = body_match.group(1).strip()
    print("Body content length:", len(body_content))
    with open("assets/kage/body_template.html", "w", encoding="utf-8") as out:
        out.write(body_content)
    print("Saved body content to assets/kage/body_template.html")
