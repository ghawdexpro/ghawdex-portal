import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const members = await prisma.teamMember.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(members);
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

    const { name, title, department, email, phone, bio } = await request.json();

    const member = await prisma.teamMember.create({
      data: { name, title, department, email, phone, bio },
    });

    return NextResponse.json(member);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
