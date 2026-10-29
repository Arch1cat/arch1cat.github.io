with open("kage_full.html", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

import re

# Find all src, href, url(...)
urls = re.findall(r'(?:src|href)=["\']([^"\']+)["\']', text)
css_urls = re.findall(r'url\(["\']?([^"\'\)]+)["\']?\)', text)

all_assets = set(urls + css_urls)
print("=== ASSETS REFERENCED IN KAGE ===")
for u in sorted(all_assets):
    print("  ->", u)
