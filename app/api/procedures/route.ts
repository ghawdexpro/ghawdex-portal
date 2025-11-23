import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const procedures = await prisma.procedure.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(procedures);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch procedures" }, { status: 500 });
  }
}
