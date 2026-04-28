import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serviceCreateSchema } from "@/lib/validation/service";
import { sanitizeRichText, generateExcerpt, slugify } from "@/lib/sanitize";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};
    if (status) where.status = status;

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where,
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        skip,
        take: limit,
      }),
      prisma.service.count({ where }),
    ]);

    return NextResponse.json({
      services,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Services list error:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = serviceCreateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (data.description) {
      data.description = sanitizeRichText(data.description);
    }

    if (!data.excerpt && data.description) {
      data.excerpt = generateExcerpt(data.description);
    }

    if (!data.slug) {
      data.slug = slugify(data.title);
    }

    const existing = await prisma.service.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      data.slug = `${data.slug}-${Date.now()}`;
    }

    const service = await prisma.service.create({ data });

    revalidateTag("services", "max");

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("Service create error:", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
