import { requireAdmin } from "@/lib/supabase/auth";
import { getDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await requireAdmin();

    const db = await getDB();
    const company = await db.companyInfo.findFirst();
    return NextResponse.json(company || {});
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error.message.includes("Admin access required")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to fetch company info" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const { mission, vision, values } = await request.json();

    const db = await getDB();
    const existingCompany = await db.companyInfo.findFirst();

    if (existingCompany) {
      const updated = await db.companyInfo.update({
        where: { id: existingCompany.id },
        data: { mission, vision, values },
      });
      return NextResponse.json(updated);
    } else {
      const created = await db.companyInfo.create({
        data: { mission, vision, values },
      });
      return NextResponse.json(created);
    }
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error.message.includes("Admin access required")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to update company info" }, { status: 500 });
  }
}
