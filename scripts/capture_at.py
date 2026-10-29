import subprocess
import os

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
out_dir = r"C:\Users\z\Desktop\arch1cat_site\archive\at_ref"
os.makedirs(out_dir, exist_ok=True)

out_png = os.path.join(out_dir, "activetheory_work.png")
cmd = [
    edge_path,
    "--headless=new",
    "--window-size=1920,1080",
    "--virtual-time-budget=9000",
    f"--screenshot={out_png}",
    "https://activetheory.net/work"
]

print("Capturing https://activetheory.net/work ...")
res = subprocess.run(cmd, capture_output=True, text=True)
print("Finished:", res.returncode, "Size:", os.path.getsize(out_png) if os.path.exists(out_png) else 0)
