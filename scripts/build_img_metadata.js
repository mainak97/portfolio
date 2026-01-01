import fs from "fs";
import path from "path";
import sharp from "sharp";
import { XMLParser } from "fast-xml-parser";

const GALLERY_DIR = path.join(process.cwd(), "public/images/gallery");
const OUTPUT = path.join(process.cwd(), "src/generated/galleryMeta.json");

const parser = new XMLParser();

async function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      await walk(full, files);
    } else if (entry.endsWith(".webp")) {
      files.push(full);
    }
  }
  return files;
}

async function extract() {
  const result = {};
  const images = await walk(GALLERY_DIR);

  for (const img of images) {
    const meta = await sharp(img).metadata();
    if (!meta.xmp) {
      continue;
    }

    const xmp = parser.parse(meta.xmp.toString());
    const desc =
      xmp?.["x:xmpmeta"]?.["rdf:RDF"]?.["rdf:Description"]?.["dc:description"];

    let caption;

    if (typeof desc === "string") {
      caption = desc;
    } else {
      caption =
        desc?.["rdf:Alt"]?.["rdf:li"]?.["#text"] ??
        desc?.["rdf:Alt"]?.["rdf:li"];
    }

    if (!caption) {
      continue;
    };

    const relativePath = path
      .relative(GALLERY_DIR, img)
      .replace(/\\/g, "/");


    const parts = relativePath.split("/");
    const folder = parts[0];
    const filename = parts.slice(1).join("/");

    if (!result[folder]) {
      result[folder] = {};
    }

    result[folder][filename] = {
      caption
    };
  }

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(result, null, 2));
}

extract();
