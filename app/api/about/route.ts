import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

const getAboutPage = unstable_cache(
  async () => {
    const aboutPage = await prisma.aboutPage.findUnique({
      where: { id: "main" },
    });

    const teamMembers = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" },
    });

    return {
      ...aboutPage,
      teamMembers,
    };
  },
  ["about-page"],
  { tags: ["about", "team"], revalidate: 3600 }
);

export async function GET() {
  try {
    const data = await getAboutPage();
    return NextResponse.json(data);
  } catch (error) {
    console.error("About page fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch about page" }, { status: 500 });
  }
}
