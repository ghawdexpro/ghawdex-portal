import { requireAuth } from "@/lib/supabase/auth";
import { getDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await requireAuth();

    const params = await context.params;
    const db = await getDB();
    const page = await db.wikiPage.findUnique({
      where: { slug: params.slug },
    });

    if (!page || !page.published) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to fetch page" }, { status: 500 });
  }
}
