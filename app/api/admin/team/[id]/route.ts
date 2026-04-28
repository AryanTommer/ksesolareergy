import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { teamMemberUpdateSchema } from "@/lib/validation/about";
import { revalidateTag } from "next/cache";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    const teamMember = await prisma.teamMember.findUnique({ where: { id } });

    if (!teamMember) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    return NextResponse.json(teamMember);
  } catch (error) {
    console.error("Team member get error:", error);
    return NextResponse.json({ error: "Failed to fetch team member" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const parsed = teamMemberUpdateSchema.safeParse({ ...body, id });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { id: _, ...data } = parsed.data;

    const teamMember = await prisma.teamMember.update({
      where: { id },
      data,
    });

    revalidateTag("team");
    revalidateTag("about");

    return NextResponse.json(teamMember);
  } catch (error) {
    console.error("Team member update error:", error);
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    await prisma.teamMember.delete({ where: { id } });

    revalidateTag("team");
    revalidateTag("about");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Team member delete error:", error);
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 });
  }
}
