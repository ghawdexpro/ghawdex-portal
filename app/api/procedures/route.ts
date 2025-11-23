import { requireAuth } from "@/lib/supabase/auth";
import { getDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await requireAuth();

    const db = await getDB();
    const procedures = await db.procedure.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(procedures);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to fetch procedures" }, { status: 500 });
  }
}
