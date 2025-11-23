import { requireAuth } from "@/lib/supabase/auth";
import { getDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await requireAuth();

    const db = await getDB();
    const events = await db.calendarEvent.findMany({
      orderBy: { startDate: "asc" },
    });

    return NextResponse.json(events);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
