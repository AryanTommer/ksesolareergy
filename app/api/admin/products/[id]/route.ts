import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productUpdateSchema } from "@/lib/validation/product";
import { sanitizeRichText, generateExcerpt } from "@/lib/sanitize";
import { revalidateTag } from "next/cache";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Product get error:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const parsed = productUpdateSchema.safeParse({ ...body, id });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { id: _, ...data } = parsed.data;

    // Sanitize rich text content
    if (data.description) {
      data.description = sanitizeRichText(data.description);
    }

    // Auto-generate excerpt if description changed and excerpt not provided
    if (data.description && !data.excerpt) {
      data.excerpt = generateExcerpt(data.description);
    }

    // Check slug uniqueness if changed
    if (data.slug) {
      const existing = await prisma.product.findFirst({
        where: { slug: data.slug, id: { not: id } },
      });
      if (existing) {
        return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
      }
    }

    // Set publishedAt when publishing
    const updateData: Record<string, unknown> = { ...data };
    if (data.status === "published") {
      const current = await prisma.product.findUnique({ where: { id } });
      if (current && !current.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: { category: true },
    });

    revalidateTag("products");

    return NextResponse.json(product);
  } catch (error) {
    console.error("Product update error:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    await prisma.product.delete({ where: { id } });

    revalidateTag("products");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Product delete error:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
