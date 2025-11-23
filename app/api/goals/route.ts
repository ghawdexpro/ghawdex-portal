import { requireAuth } from "@/lib/supabase/auth";
import { getDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await requireAuth();

    const db = await getDB();
    const goals = await db.goal.findMany({
      where: { status: "active" },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(goals);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to fetch goals" }, { status: 500 });
  }
}
