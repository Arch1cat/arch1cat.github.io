import http.server
import socketserver
import threading
import subprocess
import time
import os

PORT = 8096
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

# 1. Main View (After preloader finished ~4s)
out_png = os.path.join(out_dir, "test_at_v6_main.png")
if os.path.exists(out_png): os.remove(out_png)

cmd = [
    edge_path,
    "--headless=new",
    "--window-size=1920,1080",
    "--virtual-time-budget=8000",
    f"--screenshot={out_png}",
    f"http://localhost:{PORT}/"
]

print("Capturing Active Theory V6 Main...")
res = subprocess.run(cmd, capture_output=True, text=True)
print("Finished:", res.returncode, "Size:", os.path.getsize(out_png) if os.path.exists(out_png) else 0)

server.shutdown()
