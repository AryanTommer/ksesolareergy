import sharp from "sharp";

export interface ImageMetadata {
  width: number;
  height: number;
  format: string;
  size: number;
}

export interface ProcessedImage {
  buffer: Buffer;
  metadata: ImageMetadata;
  blurDataUrl: string;
}

const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;
const BLUR_SIZE = 10;
const QUALITY = 85;

export async function processImage(
  buffer: Buffer,
  options: { maxWidth?: number; maxHeight?: number; quality?: number } = {}
): Promise<ProcessedImage> {
  const { maxWidth = MAX_WIDTH, maxHeight = MAX_HEIGHT, quality = QUALITY } = options;

  const image = sharp(buffer);
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error("Unable to read image dimensions");
  }

  const processed = await image
    .resize(maxWidth, maxHeight, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality })
    .toBuffer({ resolveWithObject: true });

  const blurDataUrl = await generateBlurPlaceholder(buffer);

  return {
    buffer: processed.data,
    metadata: {
      width: processed.info.width,
      height: processed.info.height,
      format: processed.info.format,
      size: processed.info.size,
    },
    blurDataUrl,
  };
}

export async function generateBlurPlaceholder(buffer: Buffer): Promise<string> {
  const blurBuffer = await sharp(buffer)
    .resize(BLUR_SIZE, BLUR_SIZE, { fit: "inside" })
    .webp({ quality: 20 })
    .toBuffer();

  return `data:image/webp;base64,${blurBuffer.toString("base64")}`;
}

export async function getImageMetadata(buffer: Buffer): Promise<ImageMetadata> {
  const metadata = await sharp(buffer).metadata();

  if (!metadata.width || !metadata.height || !metadata.format || !metadata.size) {
    throw new Error("Unable to read image metadata");
  }

  return {
    width: metadata.width,
    height: metadata.height,
    format: metadata.format,
    size: metadata.size,
  };
}

export function validateImageFile(
  file: File,
  options: { maxSize?: number; allowedTypes?: string[] } = {}
): { valid: boolean; error?: string } {
  const { maxSize = 5 * 1024 * 1024, allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"] } = options;

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: `File type ${file.type} not allowed` };
  }

  if (file.size > maxSize) {
    return { valid: false, error: `File size exceeds ${Math.round(maxSize / 1024 / 1024)}MB limit` };
  }

  return { valid: true };
}

export function generateUniqueFilename(originalName: string): string {
  const ext = originalName.split(".").pop()?.toLowerCase() || "webp";
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${random}.${ext === "webp" ? "webp" : "webp"}`;
}
