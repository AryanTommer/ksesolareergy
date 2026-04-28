import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

const getPublishedServices = unstable_cache(
  async () => {
    const services = await prisma.service.findMany({
      where: {
        status: "published",
        isActive: true,
      },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return services;
  },
  ["published-services"],
  { tags: ["services"], revalidate: 3600 }
);

export async function GET() {
  try {
    const services = await getPublishedServices();
    return NextResponse.json(services);
  } catch (error) {
    console.error("Services fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}
