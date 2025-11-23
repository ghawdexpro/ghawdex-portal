import { requireAdmin } from "@/lib/supabase/auth";
import { getDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await requireAdmin();

    const db = await getDB();
    const announcements = await db.announcement.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(announcements);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error.message.includes("Admin access required")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const { title, content, author, priority } = await request.json();

    const db = await getDB();
    const announcement = await db.announcement.create({
      data: { title, content, author, priority },
    });

    return NextResponse.json(announcement);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error.message.includes("Admin access required")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
