import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serviceUpdateSchema } from "@/lib/validation/service";
import { sanitizeRichText, generateExcerpt } from "@/lib/sanitize";
import { revalidateTag } from "next/cache";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const service = await prisma.service.findUnique({ where: { id } });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error("Service get error:", error);
    return NextResponse.json({ error: "Failed to fetch service" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const parsed = serviceUpdateSchema.safeParse({ ...body, id });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { id: _, ...data } = parsed.data;

    if (data.description) {
      data.description = sanitizeRichText(data.description);
    }

    if (data.description && !data.excerpt) {
      data.excerpt = generateExcerpt(data.description);
    }

    if (data.slug) {
      const existing = await prisma.service.findFirst({
        where: { slug: data.slug, id: { not: id } },
      });
      if (existing) {
        return NextResponse.json({ error: "Slug already in use" }, { status: 409 });
      }
    }

    const service = await prisma.service.update({
      where: { id },
      data,
    });

    revalidateTag("services");

    return NextResponse.json(service);
  } catch (error) {
    console.error("Service update error:", error);
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    await prisma.service.delete({ where: { id } });

    revalidateTag("services");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Service delete error:", error);
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
