import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

const getPublishedProducts = unstable_cache(
  async () => {
    const products = await prisma.product.findMany({
      where: {
        status: "published",
        isActive: true,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            nameEn: true,
            slug: true,
            color: true,
          },
        },
      },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return products;
  },
  ["published-products"],
  { tags: ["products"], revalidate: 3600 }
);

export async function GET() {
  try {
    const products = await getPublishedProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Products fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
