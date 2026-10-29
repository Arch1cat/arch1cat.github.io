import subprocess
import time
import os
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler
import threading

PORT = 8089
ROOT_DIR = r"C:\Users\z\Desktop\arch1cat_site"
OUT_DIR = os.path.join(ROOT_DIR, "archive", "qa")
os.makedirs(OUT_DIR, exist_ok=True)

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT_DIR, **kwargs)

server = HTTPServer(("127.0.0.1", PORT), Handler)
t = threading.Thread(target=server.serve_forever, daemon=True)
t.start()
print(f"HTTP Server started on 127.0.0.1:{PORT}")

time.sleep(1)

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(edge_path):
    edge_path = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

desktop_png = os.path.join(OUT_DIR, "test_3d_print_desktop.png")
mobile_png = os.path.join(OUT_DIR, "test_3d_print_mobile.png")

# 1. Desktop Screenshot
cmd_desktop = [
    edge_path,
    "--headless=new",
    "--window-size=1920,1080",
    "--virtual-time-budget=6000",
    f"--screenshot={desktop_png}",
    f"http://127.0.0.1:{PORT}/3d-print/"
]
print("Taking desktop screenshot...")
res1 = subprocess.run(cmd_desktop, capture_output=True, text=True)
print("Desktop return code:", res1.returncode)

# 2. Mobile Screenshot (iPhone 14 Pro aspect ratio)
cmd_mobile = [
    edge_path,
    "--headless=new",
    "--window-size=390,844",
    "--virtual-time-budget=6000",
    f"--screenshot={mobile_png}",
    f"http://127.0.0.1:{PORT}/3d-print/"
]
print("Taking mobile screenshot...")
res2 = subprocess.run(cmd_mobile, capture_output=True, text=True)
print("Mobile return code:", res2.returncode)

print("Desktop screenshot size:", os.path.getsize(desktop_png) if os.path.exists(desktop_png) else "NOT FOUND")
print("Mobile screenshot size:", os.path.getsize(mobile_png) if os.path.exists(mobile_png) else "NOT FOUND")

server.shutdown()
print("Verification complete.")
