import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import sharp from "sharp";

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

    const imagesDir = path.join(process.cwd(), "public/images/gallery", folder);

    if (!fs.existsSync(imagesDir)) {
        return NextResponse.json({ error: "Folder missing" }, { status: 404 });
    }

    const files = fs.readdirSync(imagesDir);
    const images = shuffle(await Promise.all(files.map(async (f) => {
        const filePath = path.join(imagesDir, f);
        const meta = await sharp(filePath).metadata();
        return {
            src: `/images/gallery/${folder}/${f}`,
            width: meta.width,
            height: meta.height
        };
    })));

    return NextResponse.json(images);
}