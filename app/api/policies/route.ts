import { requireAuth } from "@/lib/supabase/auth";
import { getDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await requireAuth();

    const db = await getDB();
    const policies = await db.policy.findMany({
      where: { status: "active" },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(policies);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to fetch policies" }, { status: 500 });
  }
}
