import subprocess
import time
import os
from http.server import HTTPServer, SimpleHTTPRequestHandler
import threading
import json

PORT = 8097
ROOT_DIR = r"C:\Users\z\Desktop\arch1cat_site"

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT_DIR, **kwargs)

server = HTTPServer(("127.0.0.1", PORT), Handler)
t = threading.Thread(target=server.serve_forever, daemon=True)
t.start()

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(edge_path):
    edge_path = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

# We will use cdp or a simple node script to inspect bounding boxes in puppeteer or fetch
server.shutdown()
