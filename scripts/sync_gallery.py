#!/usr/bin/env python3

import argparse
import shutil
from pathlib import Path
from PIL import Image
from git import Repo

WEBP_QUALITY = 85
SUPPORTED_EXTS = {".jpg", ".jpeg", ".png", ".tiff", ".bmp"}

XMP_TEMPLATE = """<?xpacket begin='' id='W5M0MpCehiHzreSzNTczkc9d'?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
 <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <rdf:Description xmlns:dc="http://purl.org/dc/elements/1.1/">
   <dc:description>
    <rdf:Alt>
     <rdf:li xml:lang="x-default">{caption}</rdf:li>
    </rdf:Alt>
   </dc:description>
  </rdf:Description>
 </rdf:RDF>
</x:xmpmeta>
<?xpacket end='w'?>"""

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
        caption = img_path.stem.replace("_"," ").strip()
        xmp_bytes = XMP_TEMPLATE.format(caption=caption).encode("utf-8")

        rel_path = img_path.relative_to(src_root).with_suffix(".webp")
        out_path = dst_root / rel_path
        out_path.parent.mkdir(parents=True, exist_ok=True)

        print(f"[{idx}/{total}] Processing {rel_path}")

        with Image.open(img_path) as im:
            im = im.convert("RGB")
            im.save(
                out_path,
                "WEBP",
                quality=WEBP_QUALITY,
                method=6,
                xmp=xmp_bytes
            )

def git_commit(repo_path: Path, message: str):
    repo = Repo(repo_path)
    repo.git.add(A=True)
    if repo.is_dirty():
        repo.index.commit(message)
        repo.remote().push()

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--local", required=True)
    parser.add_argument("--repo", required=True)
    parser.add_argument("--mode", choices=["add","replace"], required=True)
    args = parser.parse_args()

    local_root = Path(args.local).resolve()
    repo_root = Path(args.repo).resolve()
    gallery_root = repo_root / "public/images/"

    images = collect_images(local_root)
    print(f"Found {len(images)} images")

    if args.mode == "replace":
        clear_repo_gallery(gallery_root)

    convert_and_copy(images, local_root, gallery_root)

    git_commit(repo_root, f"Update gallery images ({args.mode})")

if __name__ == "__main__":
    main()