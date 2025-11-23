import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const company = await prisma.companyInfo.findFirst();
    return NextResponse.json(company || {});
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch company info" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { mission, vision, values } = await request.json();

    const existingCompany = await prisma.companyInfo.findFirst();

    if (existingCompany) {
      const updated = await prisma.companyInfo.update({
        where: { id: existingCompany.id },
        data: { mission, vision, values },
      });
      return NextResponse.json(updated);
    } else {
      const created = await prisma.companyInfo.create({
        data: { mission, vision, values },
      });
      return NextResponse.json(created);
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to update company info" }, { status: 500 });
  }
}
