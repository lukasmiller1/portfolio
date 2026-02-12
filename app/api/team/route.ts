import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { connectToDatabase } = await import("@/lib/mongodb");
    const { TeamModel } = await import("@/models/Team");

    await connectToDatabase();

    const { search } = Object.fromEntries(
      new URL(request.url).searchParams.entries()
    );

    const filters: Record<string, unknown> = {};

    if (search && typeof search === "string" && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      filters.name = regex;
    }

    const members = await TeamModel.find(filters)
      .sort({ name: 1 })
      .lean()
      .exec();

    return NextResponse.json({ members }, { status: 200 });
  } catch (error) {
    console.error("[GET /api/team] error:", error);
    return NextResponse.json(
      { error: "Failed to load team members" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { connectToDatabase } = await import("@/lib/mongodb");
    const { TeamModel } = await import("@/models/Team");

    await connectToDatabase();

    const body = await request.json();
    const { name, role, introduction, photo } = body ?? {};

    if (!name || !role || typeof introduction !== "string") {
      return NextResponse.json(
        { error: "Missing required fields: name, role, introduction" },
        { status: 400 }
      );
    }

    const member = await TeamModel.create({
      name: name.trim(),
      role: role.trim(),
      introduction: introduction.trim(),
      photo: photo != null && String(photo).trim() ? String(photo).trim() : null,
    });

    return NextResponse.json({ member }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/team] error:", error);
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    );
  }
}
