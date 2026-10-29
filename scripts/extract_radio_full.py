with open("archive/at_ref/app_bundle.js", "r", encoding="utf-8", errors="ignore") as f:
    code = f.read()

idx = code.find("GlobalAudio3D.setup()")
if idx != -1:
    print("=== RADIO CONTROLLER CLASS / COMPONENT ===")
    print(code[max(0, idx - 400):min(len(code), idx + 2500)])
