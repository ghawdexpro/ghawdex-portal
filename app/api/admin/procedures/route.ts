import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const procedures = await prisma.procedure.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(procedures);
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

    const { title, category, content, priority } = await request.json();

    const procedure = await prisma.procedure.create({
      data: { title, category, content, priority },
    });

    return NextResponse.json(procedure);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
