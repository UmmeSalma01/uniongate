"""Copy existing repo assets into Next.js public/ directory for serving.
This script copies images/, UNITED GATE TRADING CATALOUGE.pdf, and assets/certs into public/.
"""
from pathlib import Path
import shutil

root = Path('.')
public = root / 'public'
public.mkdir(exist_ok=True)

# Copy images folder
src_images = root / 'images'
dst_images = public / 'images'
if src_images.exists():
    if dst_images.exists():
        shutil.rmtree(dst_images)
    shutil.copytree(src_images, dst_images)

# Copy pdf
pdf = root / 'UNITED GATE TRADING CATALOUGE.pdf'
if pdf.exists():
    shutil.copy2(pdf, public / pdf.name)

# Copy certs
src_certs = root / 'assets' / 'certs'
dst_certs = public / 'assets' / 'certs'
if src_certs.exists():
    dst_certs.parent.mkdir(parents=True, exist_ok=True)
    if dst_certs.exists():
        shutil.rmtree(dst_certs)
    shutil.copytree(src_certs, dst_certs)

print('public assets prepared')
