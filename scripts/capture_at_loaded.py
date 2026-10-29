import subprocess
import os
import time

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
out_dir = r"C:\Users\z\Desktop\arch1cat_site\archive\at_ref"

# Let's take screenshot with virtual time budget = 18000 (18 seconds) to let WebGL scene compile and load
out_png = os.path.join(out_dir, "activetheory_work_loaded.png")
cmd = [
    edge_path,
    "--headless=new",
    "--window-size=1920,1080",
    "--virtual-time-budget=20000",
    f"--screenshot={out_png}",
    "https://activetheory.net/work"
]

print("Capturing loaded work page...")
res = subprocess.run(cmd, capture_output=True, text=True)
print("Finished, size:", os.path.getsize(out_png) if os.path.exists(out_png) else 0)
