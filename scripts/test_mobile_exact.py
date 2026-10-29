import subprocess
import time
import os
from http.server import HTTPServer, SimpleHTTPRequestHandler
import threading

PORT = 8094
ROOT_DIR = r"C:\Users\z\Desktop\arch1cat_site"
OUT_DIR = os.path.join(ROOT_DIR, "archive", "qa")
os.makedirs(OUT_DIR, exist_ok=True)

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT_DIR, **kwargs)

server = HTTPServer(("127.0.0.1", PORT), Handler)
t = threading.Thread(target=server.serve_forever, daemon=True)
t.start()

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(edge_path):
    edge_path = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

mobile_png = os.path.join(OUT_DIR, "test_3d_print_mobile.png")

cmd_mobile = [
    edge_path,
    "--headless=new",
    "--window-size=390,844",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
    "--virtual-time-budget=6000",
    f"--screenshot={mobile_png}",
    f"http://127.0.0.1:{PORT}/3d-print/"
]
print("Running mobile capture with mobile user agent & hide-scrollbars...")
res = subprocess.run(cmd_mobile, capture_output=True, text=True)
print("Exit code:", res.returncode)

server.shutdown()
