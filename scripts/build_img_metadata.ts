import fs from "fs";
import path from "path";
import sharp from "sharp";
import { XMLParser } from "fast-xml-parser";

const GALLERY_DIR = path.join(process.cwd(), "public/images/gallery");
const OUTPUT = path.join(process.cwd(), "src/generated/galleryMeta.json");

const parser = new XMLParser();

async function walk(dir: string, files: string[] = []) {
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
    const result: Record<string, Record<string, { caption: string }>> = {};

    const images = await walk(GALLERY_DIR);

    for (const img of images) {
        const meta = await sharp(img).metadata();
        if (!meta.xmp) continue;

        const xmp = parser.parse(meta.xmp.toString());
        const caption =
            xmp?.["x:xmpmeta"]
            ?.["rdf:RDF"]
            ?.["rdf:Description"]
            ?.["dc:description"]
            ?.["rdf:Alt"]
            ?.["rdf:li"]
            ?.["#text"];
    }
}