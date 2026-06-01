"""Copy selected certification images from the temp extraction folder into the repo assets/certs.
This script expects the extraction JSON to exist in the temp folder and will copy four chosen images.
"""
import json
from pathlib import Path
import shutil
import sys

temp_json = Path(r"C:\Users\chinm\AppData\Local\Temp\opencode\uniongate_certs\catalog_extraction.json")
if not temp_json.exists():
    print("extraction json not found", file=sys.stderr)
    sys.exit(1)

data = json.loads(temp_json.read_text(encoding='utf-8'))
images = data.get('image_files', [])

# Choose the four images that correspond to the certificates as seen in the extraction list.
# From earlier read: page5 img1/2 and page3 img1/2 look like the certificate images.
candidates = [
    next((i for i in images if i['file'].endswith('cert_page5_img1.png')), None),
    next((i for i in images if i['file'].endswith('cert_page5_img2.png')), None),
    next((i for i in images if i['file'].endswith('cert_page3_img1.png')), None),
    next((i for i in images if i['file'].endswith('cert_page3_img2.png')), None),
]

out_dir = Path('assets/certs')
out_dir.mkdir(parents=True, exist_ok=True)

copied = []
for item in candidates:
    if not item:
        continue
    src = Path(item['file'])
    if not src.exists():
        continue
    dst = out_dir / src.name
    shutil.copy2(src, dst)
    copied.append(str(dst))

print({'copied': copied})
