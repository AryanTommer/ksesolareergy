import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productCreateSchema } from "@/lib/validation/product";
import { sanitizeRichText, generateExcerpt, slugify } from "@/lib/sanitize";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const categoryId = searchParams.get("categoryId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;
    if (categoryId) where.categoryId = categoryId;

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: true },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Products list error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = productCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Sanitize rich text content
    if (data.description) {
      data.description = sanitizeRichText(data.description);
    }

    // Auto-generate excerpt if not provided
    if (!data.excerpt && data.description) {
      data.excerpt = generateExcerpt(data.description);
    }

    // Auto-generate slug if not provided
    if (!data.slug) {
      data.slug = slugify(data.title);
    }

    // Check for duplicate slug
    const existing = await prisma.product.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      data.slug = `${data.slug}-${Date.now()}`;
    }

    const product = await prisma.product.create({
      data: {
        ...data,
        publishedAt: data.status === "published" ? new Date() : null,
      },
      include: { category: true },
    });

    revalidateTag("products");

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Product create error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
