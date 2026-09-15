import os
import subprocess
import time
import http.server
import socketserver
import threading

PORT = 8099
DIRECTORY = "C:/Users/z/Desktop/arch1cat_site"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

httpd = socketserver.TCPServer(("", PORT), Handler)
server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
server_thread.start()
print(f"Temporary server running on http://127.0.0.1:{PORT}")

edge_path = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
stages_to_test = [
    (0, "C:/Users/z/Desktop/arch1cat_site/archive/qa/screenshot_spatial_stage0.png", f"http://127.0.0.1:{PORT}/"),
    (1, "C:/Users/z/Desktop/arch1cat_site/archive/qa/screenshot_spatial_stage1_globe.png", f"http://127.0.0.1:{PORT}/?stage=1"),
    (6, "C:/Users/z/Desktop/arch1cat_site/archive/qa/screenshot_spatial_stage6_yotei.png", f"http://127.0.0.1:{PORT}/?stage=6"),
]

for stage_idx, output_png, url in stages_to_test:
    print(f"Capturing Stage {stage_idx} -> {output_png} ...")
    cmd = [
        edge_path,
        "--headless=new",
        "--window-size=1440,900",
        "--virtual-time-budget=3000",
        f"--screenshot={output_png}",
        url
    ]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(output_png):
        size = os.path.getsize(output_png)
        print(f"  Stage {stage_idx} captured successfully: {size} bytes")
    else:
        print(f"  Failed to capture Stage {stage_idx}: {res.stderr}")

httpd.shutdown()
httpd.server_close()
print("Temporary server stopped. No background tasks left.")
