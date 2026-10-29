with open("kage_full.html", "r", encoding="utf-8", errors="ignore") as f:
    code = f.read()

import re
scripts = re.findall(r'<script.*?>.*?</script>', code, re.DOTALL)
s2 = scripts[2]

print("Script 2 First 2000 chars:")
print(s2[:2000])
