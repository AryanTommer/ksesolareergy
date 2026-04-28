import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { categoryCreateSchema } from "@/lib/validation/product";
import { slugify } from "@/lib/sanitize";
import { revalidateTag } from "next/cache";

export async function GET() {
  try {
    const categories = await prisma.productCategory.findMany({
      orderBy: [{ order: "asc" }, { name: "asc" }],
      include: {
        _count: { select: { products: true } },
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Categories list error:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = categoryCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Auto-generate slug if not provided
    if (!data.slug) {
      data.slug = slugify(data.name);
    }

    // Check for duplicate slug
    const existing = await prisma.productCategory.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return NextResponse.json({ error: "Category with this slug already exists" }, { status: 409 });
    }

    const category = await prisma.productCategory.create({
      data,
    });

    revalidateTag("categories");
    revalidateTag("products");

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Category create error:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
