import http.server
import socketserver
import threading
import subprocess
import time
import os

PORT = 8098
DIRECTORY = "C:/Users/z/Desktop/arch1cat_site"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

server = socketserver.TCPServer(("", PORT), Handler)
t = threading.Thread(target=server.serve_forever)
t.daemon = True
t.start()

time.sleep(1)

out_dir = "C:/Users/z/Desktop/arch1cat_site/archive/qa"
out_png = os.path.join(out_dir, "test_at_v6_drawer.png")
if os.path.exists(out_png): os.remove(out_png)

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

# We'll use a small query param or script injection to open the drawer
# Or we can test with Playwright / CDP / direct click
cmd = [
    edge_path,
    "--headless=new",
    "--window-size=1920,1080",
    "--virtual-time-budget=9000",
    f"--screenshot={out_png}",
    f"http://localhost:{PORT}/#project=yotei"
]

subprocess.run(cmd, capture_output=True)
server.shutdown()
print("Captured drawer:", os.path.exists(out_png), "Size:", os.path.getsize(out_png) if os.path.exists(out_png) else 0)
