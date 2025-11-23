import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tools = await prisma.tool.findMany({
      orderBy: { category: "asc" },
    });
    return NextResponse.json(tools);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tools" }, { status: 500 });
  }
}
