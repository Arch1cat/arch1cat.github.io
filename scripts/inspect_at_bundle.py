import urllib.request
import re
import json

base_url = "https://activetheory.net/"
bundle_url = "https://activetheory.net/assets/js/app.1780406240914.js"

print("Downloading bundle...")
req = urllib.request.Request(bundle_url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as resp:
        code = resp.read().decode('utf-8', errors='ignore')
    print(f"Downloaded bundle: {len(code)} bytes")
    
    # Save a copy
    with open("archive/at_ref/app_bundle.js", "w", encoding="utf-8") as f:
        f.write(code)
        
    # Search for audio / radio keywords
    matches = re.findall(r'(\w*radio\w*|\w*audio\w*|\w*sound\w*|\w*track\w*|\w*music\w*)', code, re.IGNORECASE)
    print("Found keywords count:", len(matches))
    print("Unique keywords:", set(matches[:30]))
    
    # Search for audio file extensions
    audio_files = re.findall(r'[\'"][^\'"]+\.(?:mp3|wav|ogg|aac|m4a)[^\'"]*[\'"]', code)
    print("Audio file references:", audio_files)
    
except Exception as e:
    print("Error:", e)
