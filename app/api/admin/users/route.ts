import { requireAdmin } from "@/lib/supabase/auth";
import { getDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await requireAdmin();

    const db = await getDB();
    const users = await db.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        department: true,
        active: true,
      },
    });
    return NextResponse.json(users);
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error.message.includes("Admin access required")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const { email, password, name, role, department } = await request.json();

    const db = await getDB();
    const user = await db.user.create({
      data: {
        email,
        password,
        name,
        role,
        department,
      },
    });

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  } catch (error: any) {
    if (error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error.message.includes("Admin access required")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
