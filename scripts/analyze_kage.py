with open("kage_full.html", "r", encoding="utf-8", errors="ignore") as f:
    code = f.read()

import re
print("Length of kage_full.html:", len(code))

# Check for Three.js, scripts, shaders
scripts = re.findall(r'<script.*?>.*?</script>', code, re.DOTALL)
print("Number of script tags:", len(scripts))
for i, s in enumerate(scripts):
    print(f"Script {i}: length {len(s)}")
    # print first 100 chars
    print("  ->", s[:150].replace('\n', ' '))
