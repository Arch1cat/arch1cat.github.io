import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

out_dir = "C:/Users/z/Desktop/arch1cat_site/assets/textures/projects"
os.makedirs(out_dir, exist_ok=True)

projects = [
    {
        "id": "yotei",
        "index": "01",
        "category": "WEBSITES & CRM",
        "glyph": "[= ◈ ︿ ◈ =]",
        "title": "YOTEI CRM",
        "subtitle": "ENTERPRISE REAL ESTATE INTELLIGENCE",
        "color": (0, 242, 254),
        "accent": (14, 165, 233),
        "tags": ["NEXT.JS 16", "TURBOREPO", "MAPBOX GL", "SUPABASE"]
    },
    {
        "id": "wardogs",
        "index": "02",
        "category": "3D EXPERIENCES & WEBGL",
        "glyph": "< ⌖ 3D ⌖ >",
        "title": "WARDOGS 3D",
        "subtitle": "TACTICAL GIS & BALLISTIC SIMULATOR",
        "color": (16, 185, 129),
        "accent": (5, 150, 105),
        "tags": ["THREE.JS R170", "WEBGL 2.0", "VIEWSHED", "MIL BALLISTICS"]
    },
    {
        "id": "world-monitor",
        "index": "03",
        "category": "REALTIME GIS & TELEMETRY",
        "glyph": "[ • ☫ • ]",
        "title": "WORLD MONITOR",
        "subtitle": "GLOBAL OSINT & CYBER TELEMETRY",
        "color": (245, 158, 11),
        "accent": (217, 119, 6),
        "tags": ["TYPESCRIPT", "CLOUDFLARE WORKERS", "TAURI", "MAPBOX"]
    },
    {
        "id": "opengym",
        "index": "04",
        "category": "MOBILE APPS (KOTLIN)",
        "glyph": "( ⚡ FIT ⚡ )",
        "title": "OPENGYM",
        "subtitle": "PROGRESSIVE FITNESS & PASSKEYS",
        "color": (236, 72, 153),
        "accent": (219, 39, 119),
        "tags": ["REACT 19", "CAPACITOR", "ANDROID APK", "PASSKEYS"]
    },
    {
        "id": "wifiscanner",
        "index": "05",
        "category": "MOBILE APPS (KOTLIN)",
        "glyph": "{ ~ RF ~ }",
        "title": "WIFI SCANNER",
        "subtitle": "NATIVE RF DIAGNOSTICS & SUBNET GRAPHER",
        "color": (139, 92, 246),
        "accent": (124, 58, 237),
        "tags": ["KOTLIN", "JETPACK COMPOSE", "MDNS", "COROUTINES"]
    },
    {
        "id": "meta-cleaner",
        "index": "06",
        "category": "AUTONOMOUS AI AGENTS",
        "glyph": "[ ⟁ SEC ⟁ ]",
        "title": "METADATA CLEANER",
        "subtitle": "MULTI-THREADED PRIVACY SUITE",
        "color": (6, 182, 212),
        "accent": (8, 145, 178),
        "tags": ["PYTHON 3", "FFMPEG", "PILLOW", "CRYPTOGRAPHY"]
    },
    {
        "id": "cats-match3",
        "index": "07",
        "category": "3D EXPERIENCES & WEBGL",
        "glyph": "=^..^=",
        "title": "CATS MATCH-3",
        "subtitle": "CASUAL ENGINE & PARTICLE FX",
        "color": (244, 63, 94),
        "accent": (225, 29, 72),
        "tags": ["KOTLIN", "ANDROID CANVAS", "PARTICLE FX", "GAME LOOP"]
    }
]

W, H = 1024, 640

for p in projects:
    im = Image.new("RGBA", (W, H), (4, 7, 13, 255))
    d = ImageDraw.Draw(im)

    # Ambient radial background glow
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    cx, cy = W // 2, H // 2
    r, g, b = p["color"]
    for rad in range(350, 0, -10):
        alpha = int(28 * (1.0 - rad / 350))
        gd.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=(r, g, b, alpha))
    im = Image.alpha_composite(im, glow)
    d = ImageDraw.Draw(im)

    # Grid lines / cyber matrix pattern
    for x in range(0, W, 40):
        d.line([(x, 0), (x, H)], fill=(255, 255, 255, 6), width=1)
    for y in range(0, H, 40):
        d.line([(0, y), (W, y)], fill=(255, 255, 255, 6), width=1)

    # Outer tech border
    d.rounded_rectangle([16, 16, W - 16, H - 16], radius=24, outline=(r, g, b, 140), width=3)
    d.rounded_rectangle([24, 24, W - 24, H - 24], radius=18, outline=(255, 255, 255, 20), width=1)

    # Corner brackets
    cL = 36
    # TL
    d.line([(16, 16 + cL), (16, 16), (16 + cL, 16)], fill=(r, g, b, 255), width=4)
    # TR
    d.line([(W - 16 - cL, 16), (W - 16, 16), (W - 16, 16 + cL)], fill=(r, g, b, 255), width=4)
    # BL
    d.line([(16, H - 16 - cL), (16, H - 16), (16 + cL, H - 16)], fill=(r, g, b, 255), width=4)
    # BR
    d.line([(W - 16 - cL, H - 16), (W - 16, H - 16), (W - 16, H - 16 - cL)], fill=(r, g, b, 255), width=4)

    # Binary / matrix side ticker
    bin_str = "10110010100101010110101001010101"
    for i, ch in enumerate(bin_str[:16]):
        d.text((W - 42, 60 + i * 28), ch, fill=(r, g, b, 80))

    # Top Tag
    top_text = f"// {p['index']} · {p['category']}"
    d.text((54, 52), top_text, fill=(r, g, b, 240))

    # Glyph (Active Theory Porter Robinson style icon)
    d.text((W // 2 - 80, 150), p["glyph"], fill=(255, 255, 255, 200))

    # Big Title
    title = p["title"]
    d.text((54, 250), title, fill=(255, 255, 255, 255))

    # Subtitle
    d.text((54, 330), p["subtitle"], fill=(148, 163, 184, 240))

    # Bottom Tags
    tags_str = "  //  ".join(p["tags"])
    d.rounded_rectangle([54, 450, W - 140, 500], radius=8, fill=(0, 0, 0, 160), outline=(r, g, b, 80))
    d.text((70, 466), f"[ {tags_str} ]", fill=(r, g, b, 230))

    # Interactive prompt
    d.text((54, 550), "CLICK TO INSPECT CASE STUDY ->", fill=(255, 255, 255, 200))

    # Save
    out_path = os.path.join(out_dir, f"{p['id']}.png")
    im.save(out_path, "PNG")
    print("Generated:", out_path)

print("All project card posters generated successfully!")
