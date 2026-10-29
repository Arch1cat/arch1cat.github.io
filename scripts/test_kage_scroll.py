import http.server
import socketserver
import threading
import subprocess
import time
import os

PORT = 8099
DIRECTORY = "C:/Users/z/Desktop/arch1cat_site"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

server = socketserver.TCPServer(("", PORT), Handler)
t = threading.Thread(target=server.serve_forever)
t.daemon = True
t.start()
print(f"Local server started on http://localhost:{PORT}")

time.sleep(1)

out_dir = "C:/Users/z/Desktop/arch1cat_site/archive/qa"
os.makedirs(out_dir, exist_ok=True)

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

# 1. Capture Hero (Scroll Y = 0)
hero_png = os.path.join(out_dir, "test_kage_hero.png")
if os.path.exists(hero_png): os.remove(hero_png)

cmd_hero = [
    edge_path,
    "--headless=new",
    "--window-size=1920,1080",
    "--virtual-time-budget=8000",
    f"--screenshot={hero_png}",
    f"http://localhost:{PORT}/#top"
]

print("Capturing Kage Hero...")
subprocess.run(cmd_hero, capture_output=True)
print("Hero size:", os.path.getsize(hero_png) if os.path.exists(hero_png) else 0)

# 2. Capture Chapter 01 Sanmon Gate (Scroll Y = 1200)
gate_png = os.path.join(out_dir, "test_kage_gate.png")
if os.path.exists(gate_png): os.remove(gate_png)

cmd_gate = [
    edge_path,
    "--headless=new",
    "--window-size=1920,1080",
    "--virtual-time-budget=8000",
    f"--screenshot={gate_png}",
    f"http://localhost:{PORT}/#gate"
]

print("Capturing Kage Gate...")
subprocess.run(cmd_gate, capture_output=True)
print("Gate size:", os.path.getsize(gate_png) if os.path.exists(gate_png) else 0)

# 3. Capture Chapter 02 Still Gardens (Scroll Y = 2500)
gardens_png = os.path.join(out_dir, "test_kage_gardens.png")
if os.path.exists(gardens_png): os.remove(gardens_png)

cmd_gardens = [
    edge_path,
    "--headless=new",
    "--window-size=1920,1080",
    "--virtual-time-budget=8000",
    f"--screenshot={gardens_png}",
    f"http://localhost:{PORT}/#pathways"
]

print("Capturing Kage Gardens...")
subprocess.run(cmd_gardens, capture_output=True)
print("Gardens size:", os.path.getsize(gardens_png) if os.path.exists(gardens_png) else 0)

server.shutdown()
