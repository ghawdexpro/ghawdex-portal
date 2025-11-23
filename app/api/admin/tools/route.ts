import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const tools = await prisma.tool.findMany({
      orderBy: { category: "asc" },
    });
    return NextResponse.json(tools);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { name, description, category, url } = await request.json();

    const tool = await prisma.tool.create({
      data: { name, description, category, url },
    });

    return NextResponse.json(tool);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
