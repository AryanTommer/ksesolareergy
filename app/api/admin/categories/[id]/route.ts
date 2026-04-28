import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { categoryUpdateSchema } from "@/lib/validation/product";
import { revalidateTag } from "next/cache";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const category = await prisma.productCategory.findUnique({
      where: { id },
      include: {
        products: { orderBy: { order: "asc" } },
        _count: { select: { products: true } },
      },
    });

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("Category get error:", error);
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const parsed = categoryUpdateSchema.safeParse({ ...body, id });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { id: _, ...data } = parsed.data;

    // Check slug uniqueness if changed
    if (data.slug) {
      const existing = await prisma.productCategory.findFirst({
        where: { slug: data.slug, id: { not: id } },
      });
      if (existing) {
        return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
      }
    }

    const category = await prisma.productCategory.update({
      where: { id },
      data,
    });

    revalidateTag("categories", "max");
    revalidateTag("products", "max");

    return NextResponse.json(category);
  } catch (error) {
    console.error("Category update error:", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    // Check if category has products
    const category = await prisma.productCategory.findUnique({
      where: { id },
      include: { _count: { select: { products: true } } },
    });

    if (category && category._count.products > 0) {
      return NextResponse.json(
        { error: "Cannot delete category with products. Move or delete products first." },
        { status: 400 }
      );
    }

    await prisma.productCategory.delete({ where: { id } });

    revalidateTag("categories", "max");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Category delete error:", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
