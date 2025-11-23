import { requireAuth } from "@/lib/supabase/auth";
import { getDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await requireAuth();

    const db = await getDB();
    const tools = await db.tool.findMany({
      orderBy: { category: "asc" },
    });
    return NextResponse.json(tools);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to fetch tools" }, { status: 500 });
  }
}
