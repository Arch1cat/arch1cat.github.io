with open("kage_full.html", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

import re

# Find sections and headings
headings = re.findall(r'<h[1-4].*?>.*?</h[1-4]>', text)
print("=== HEADINGS IN KAGE ===")
for h in headings[:25]:
    print(h)

# Find CSS styles size and key classes
css_match = re.search(r'<style>(.*?)</style>', text, re.DOTALL)
if css_match:
    css = css_match.group(1)
    print(f"\nCSS length: {len(css)} chars")
    # print first 500 chars of css
    print("CSS sample:\n", css[:500])

# Check how Three.js is initialized in Script 2
s2_match = re.search(r'<script>\s*/\* =====================================================================\s*KAGE(.*?)</script>', text, re.DOTALL)
if s2_match:
    s2 = s2_match.group(1)
    print(f"\nThree.js Script length: {len(s2)} chars")
    # Find functions inside s2
    funcs = re.findall(r'function\s+([a-zA-Z0-9_]+)\s*\(', s2)
    print("Functions in Three.js script (first 30):", funcs[:30])
