import subprocess
import time
import os
from http.server import HTTPServer, SimpleHTTPRequestHandler
import threading
import json

PORT = 8092
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

# Script to find elements wider than window.innerWidth
js_code = """
const docW = document.documentElement.offsetWidth;
const winW = window.innerWidth;
const wide = [];
document.querySelectorAll('*').forEach(el => {
  if (el.offsetWidth > winW) {
    wide.push({ tag: el.tagName, id: el.id, class: el.className.slice(0, 50), w: el.offsetWidth });
  }
});
console.log('DOC_METRICS:' + JSON.stringify({ winW, docW, wideCount: wide.length, wide: wide.slice(0, 10) }));
"""

cmd = [
    edge_path,
    "--headless=new",
    "--window-size=390,844",
    "--enable-logging=stderr",
    "--v=1",
    f"http://127.0.0.1:{PORT}/3d-print/"
]

# We can also run node with puppeteer or simple evaluation if node has it, or check CSS directly
server.shutdown()
