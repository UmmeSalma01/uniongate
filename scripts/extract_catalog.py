#!/usr/bin/env python3
"""
Extracts text and images from the catalog PDF.

Saves certificate/embedded images to the user-approved temp folder and
prints a JSON summary (pages and saved image paths) to stdout.

Requires PyMuPDF (install with: pip install pymupdf)
"""
import json
import sys
from pathlib import Path

try:
    import fitz  # PyMuPDF
except Exception as e:
    print(json.dumps({"error": "missing_dependency", "detail": str(e)}))
    sys.exit(2)


def main():
    repo_root = Path(__file__).resolve().parent.parent
    pdf_path = repo_root / "UNITED GATE TRADING CATALOUGE.pdf"
    if not pdf_path.exists():
        print(json.dumps({"error": "pdf_not_found", "path": str(pdf_path)}))
        return

    try:
        doc = fitz.open(str(pdf_path))
    except Exception as e:
        print(json.dumps({"error": "open_failed", "detail": str(e)}))
        return

    # Target temp dir (user-approved)
    target_dir = Path(r"C:\Users\chinm\AppData\Local\Temp\opencode\uniongate_certs")
    target_dir.mkdir(parents=True, exist_ok=True)

    pages = []
    image_files = []

    for i in range(doc.page_count):
        page = doc.load_page(i)
        text = page.get_text("text")
        pages.append({"page": i + 1, "text": text})

        images = page.get_images(full=True)
        for img_index, img in enumerate(images, start=1):
            xref = img[0]
            try:
                base_image = doc.extract_image(xref)
            except Exception:
                # skip extraction failures but continue
                continue
            image_bytes = base_image.get("image")
            image_ext = base_image.get("ext", "png")
            out_name = f"cert_page{i+1}_img{img_index}.{image_ext}"
            out_path = target_dir / out_name
            try:
                with open(out_path, "wb") as f:
                    f.write(image_bytes)
                image_files.append({"page": i + 1, "xref": xref, "file": str(out_path)})
            except Exception:
                # ignore save errors
                continue

    out = {
        "pages_count": doc.page_count,
        "pages": pages,
        "image_files": image_files,
    }

    # Write JSON output to the temp folder to avoid stdout encoding issues on Windows
    out_path = target_dir / "catalog_extraction.json"
    try:
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(out, f, ensure_ascii=False, indent=2)
        print(json.dumps({"status": "ok", "json_file": str(out_path), "images_extracted": len(image_files)}))
    except Exception as e:
        print(json.dumps({"error": "write_failed", "detail": str(e)}))


if __name__ == "__main__":
    main()
