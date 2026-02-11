import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { connectToDatabase } = await import("@/lib/mongodb");
    const { ProjectModel } = await import("@/models/Project");

    await connectToDatabase();

    const { search } = Object.fromEntries(
      new URL(request.url).searchParams.entries()
    );

    const filters: Record<string, unknown> = {};

    if (search && typeof search === "string" && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      filters.$or = [{ name: regex }, { description: regex }];
    }

    const projects = await ProjectModel.find(filters)
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error("[GET /api/projects] error:", error);
    return NextResponse.json(
      { error: "Failed to load projects" },
      { status: 500 }
    );
  }
}

