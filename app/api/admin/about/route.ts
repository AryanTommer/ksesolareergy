import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { aboutPageUpdateSchema } from "@/lib/validation/about";
import { sanitizeRichText } from "@/lib/sanitize";
import { revalidateTag } from "next/cache";

export async function GET() {
  try {
    let aboutPage = await prisma.aboutPage.findUnique({
      where: { id: "main" },
    });

    if (!aboutPage) {
      aboutPage = await prisma.aboutPage.create({
        data: {
          id: "main",
          heroTitle: "हमारे बारे में",
          heroTagline: "PM सूर्य घर योजना",
        },
      });
    }

    return NextResponse.json(aboutPage);
  } catch (error) {
    console.error("About page get error:", error);
    return NextResponse.json({ error: "Failed to fetch about page" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = aboutPageUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (data.heroDescription) {
      data.heroDescription = sanitizeRichText(data.heroDescription);
    }
    if (data.missionContent) {
      data.missionContent = sanitizeRichText(data.missionContent);
    }

    const aboutPage = await prisma.aboutPage.upsert({
      where: { id: "main" },
      update: data,
      create: {
        id: "main",
        heroTitle: data.heroTitle || "हमारे बारे में",
        ...data,
      },
    });

    revalidateTag("about", "max");

    return NextResponse.json(aboutPage);
  } catch (error) {
    console.error("About page update error:", error);
    return NextResponse.json({ error: "Failed to update about page" }, { status: 500 });
  }
}
