import http.server
import socketserver
import threading
import subprocess
import time
import os

PORT = 8097
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
edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

# We'll use browser_exec or a python script with CDP/Playwright or let's use a small helper script that scrolls
scroll_test_script = """
import time
from browser_harness import *
new_tab("http://localhost:8097/")
wait_for_load()
time.sleep(6) # wait for preloader

# Capture Hero
shot0 = capture_screenshot()
print("Shot 0 Hero:", shot0)

# Scroll to Chapter 1
js("window.scrollTo(0, 1400)")
time.sleep(3)
shot1 = capture_screenshot()
print("Shot 1 Gate:", shot1)

# Scroll to Chapter 2
js("window.scrollTo(0, 2800)")
time.sleep(3)
shot2 = capture_screenshot()
print("Shot 2 Gardens:", shot2)

# Scroll to Chapter 4
js("window.scrollTo(0, 4800)")
time.sleep(3)
shot3 = capture_screenshot()
print("Shot 3 Eternity:", shot3)
"""

print("Running scroll test...")
server.shutdown()
