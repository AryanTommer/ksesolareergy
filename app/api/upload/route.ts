import { NextRequest, NextResponse } from "next/server";
import { put, del } from "@vercel/blob";
import { processImage, validateImageFile, generateUniqueFilename } from "@/lib/upload";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "uploads";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const validation = validateImageFile(file);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const processed = await processImage(buffer);
    const filename = generateUniqueFilename(file.name);
    const pathname = `${folder}/${filename}`;

    const blob = await put(pathname, processed.buffer, {
      access: "public",
      contentType: "image/webp",
    });

    return NextResponse.json({
      url: blob.url,
      width: processed.metadata.width,
      height: processed.metadata.height,
      size: processed.metadata.size,
      blurDataUrl: processed.blurDataUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    await del(url);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Delete failed" },
      { status: 500 }
    );
  }
}
