import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import sharp from "sharp";
import { XMLParser } from "fast-xml-parser";

function shuffle<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export async function GET(
    req: Request
) {
    const { searchParams } = new URL(req.url);
    const raw = searchParams.get("folder");
    if (!raw) {
        return NextResponse.json({ error: "Folder required" }, { status: 400 });
    }

    const folder = decodeURIComponent(raw);

    if (!folder) {
        return NextResponse.json({ error: "Folder required" }, { status: 400 });
    }

    const galleryMeta = path.join(process.cwd(), "src", "generated", "galleryMeta.json");

    if (!fs.existsSync(galleryMeta)) {
        return NextResponse.json({ error: "Gallery metadata missing" }, { status: 500 });
    }

    const metaJson = fs.readFileSync(galleryMeta, "utf-8");

    return NextResponse.json(shuffle(JSON.parse(metaJson)[folder]));
}