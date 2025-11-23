import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const policies = await prisma.policy.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(policies);
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

    const { title, category, content } = await request.json();

    const policy = await prisma.policy.create({
      data: { title, category, content },
    });

    return NextResponse.json(policy);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
