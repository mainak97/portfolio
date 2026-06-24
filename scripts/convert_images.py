#!/usr/bin/env python3

import shutil
from pathlib import Path
from PIL import Image
from pathlib import Path

WEBP_QUALITY = 85
SUPPORTED_EXTS = {".jpg", ".jpeg", ".png", ".tiff", ".bmp"}

def clear_repo_gallery(gallery_path: Path):
    if gallery_path.exists():
        shutil.rmtree(gallery_path)
    gallery_path.mkdir(parents=True, exist_ok=True)

def collect_images(src_root: Path):
    return [
        p for p in src_root.rglob("*")
        if p.suffix.lower() in SUPPORTED_EXTS
    ]

def convert_and_copy(images, src_root: Path, dst_root: Path):
    total = len(images)

    for idx, img_path in enumerate(images, start=1):
        rel_path = img_path.relative_to(src_root).with_suffix(".webp")
        out_path = dst_root / rel_path
        out_path.parent.mkdir(parents=True, exist_ok=True)

        print(f"[{idx}/{total}] Converting {rel_path}")

        with Image.open(img_path) as im:
            im = im.convert("RGB")
            im.save(
                out_path,
                "WEBP",
                quality=WEBP_QUALITY,
                method=6
            )

def main():
    SCRIPT_DIR = Path(__file__).parent.resolve()
    PROJECT_ROOT = SCRIPT_DIR.parent
    IMG_ROOT = PROJECT_ROOT / "public" / "images"
    LOCAL_ROOT = PROJECT_ROOT / "raw_images"

    images = collect_images(LOCAL_ROOT)
    print(f"Found {len(images)} images")

    clear_repo_gallery(IMG_ROOT)

    convert_and_copy(images, LOCAL_ROOT, IMG_ROOT)

if __name__ == "__main__":
    main()
