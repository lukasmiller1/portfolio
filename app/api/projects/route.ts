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

export async function POST(request: Request) {
  try {
    const { connectToDatabase } = await import("@/lib/mongodb");
    const { ProjectModel } = await import("@/models/Project");

    await connectToDatabase();

    const body = await request.json();

    const { name, description, source, price, image, video, type } = body ?? {};

    if (!name || !description || !source || typeof price !== "number" || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!image && !video) {
      return NextResponse.json(
        { error: "At least one of image or video is required" },
        { status: 400 }
      );
    }

    const project = await ProjectModel.create({
      name,
      description,
      source,
      price,
      image: image ?? null,
      video: video ?? null,
      type,
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/projects] error:", error);
    const message =
      error && typeof error === "object" && "message" in error
        ? String((error as { message?: string }).message)
        : "Failed to create project";
    return NextResponse.json(
      { error: message || "Failed to create project" },
      { status: 500 }
    );
  }
}

