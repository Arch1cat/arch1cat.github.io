with open("archive/at_ref/app_bundle.js", "r", encoding="utf-8", errors="ignore") as f:
    code = f.read()

# Let's find where "assets/music/" is used
idx = code.find("assets/music/")
while idx != -1:
    print("=== OCCURRENCE ===")
    print(code[max(0, idx - 200):min(len(code), idx + 500)])
    idx = code.find("assets/music/", idx + 1)
