import sys
import os
import json
import subprocess
from pathlib import Path
from PIL import Image

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp"}
PY = sys.executable
SCRIPT_DIR = Path(__file__).parent / "scripts"


def is_image(path: str) -> bool:
    return os.path.splitext(path.lower())[1] in IMAGE_EXTS


def run_pipeline(image_path: str) -> str:
    # Stage 1: vision → semantic
    semantic = subprocess.check_output(
        [PY, str(SCRIPT_DIR / "infer_vision.py"), image_path],
        text=True
    ).strip()
    print(semantic)
    # Stage 2: semantic → caption
    caption = subprocess.check_output(
        [PY, str(SCRIPT_DIR / "infer_text.py"), semantic],
        text=True
    ).strip()
    print(caption)
    # extract final line only
    return caption.splitlines()[-1].strip()


def main(root_dir: str, output_dir : str):
    results = {}

    for dirpath, _, filenames in os.walk(root_dir):
        images = [f for f in filenames if is_image(f)]
        if not images:
            continue

        folder_name = os.path.basename(dirpath)
        results[folder_name] = []

        for fname in images:
            image_path = os.path.join(dirpath, fname)
            print(f"Processing: {image_path}")
            try:
                caption = run_pipeline(image_path)
                with Image.open(image_path) as img:
                    width, height = img.size
            except Exception as e:
                width, height = None, None
                caption = f"ERROR: {e}"

            results[folder_name].append({
                "filename": fname,
                "caption": caption,
                "width": width,
                "height": height
            })
            print(f"Result: {results[folder_name][-1]}")

    with open(os.path.join(output_dir, "galleryMeta.json"), "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)


if __name__ == "__main__":
    SCRIPT_DIR = Path(__file__).parent.resolve()
    PROJECT_ROOT = SCRIPT_DIR.parent
    IMG_ROOT = PROJECT_ROOT / "public" / "images"
    OUTPUT = PROJECT_ROOT / "src" / "generated"
    main(IMG_ROOT,OUTPUT)
