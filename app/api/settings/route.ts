import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const updateSettingsSchema = z.object({
  phone: z.string().min(1).optional(),
  whatsapp: z.string().min(1).optional(),
  email: z.string().email().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  youtube: z.string().optional(),
});

export async function GET() {
  try {
    let settings = await prisma.siteSettings.findUnique({
      where: { id: "main" },
    });

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          id: "main",
          phone: "1800-XXX-XXXX",
          whatsapp: "+91 99999-99999",
          email: "info@suryagharup.in",
        },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const data = updateSettingsSchema.parse(body);

    const settings = await prisma.siteSettings.upsert({
      where: { id: "main" },
      update: data,
      create: {
        id: "main",
        phone: data.phone || "1800-XXX-XXXX",
        whatsapp: data.whatsapp || "+91 99999-99999",
        email: data.email || "info@suryagharup.in",
      },
    });

    return NextResponse.json(settings);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid data", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
