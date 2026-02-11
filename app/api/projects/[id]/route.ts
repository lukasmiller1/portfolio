import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const runtime = "nodejs";

async function getModel() {
  const { connectToDatabase } = await import("@/lib/mongodb");
  const { ProjectModel } = await import("@/models/Project");
  await connectToDatabase();
  return ProjectModel;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    const ProjectModel = await getModel();
    const body = await request.json();
    const { name, description, source, price, image, video, type } = body ?? {};

    const update: Record<string, unknown> = {};
    if (name !== undefined) update.name = name;
    if (description !== undefined) update.description = description;
    if (source !== undefined) update.source = source;
    if (typeof price === "number") update.price = price;
    if (image !== undefined) update.image = image ?? null;
    if (video !== undefined) update.video = video ?? null;
    if (type !== undefined) update.type = type;

    const project = await ProjectModel.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, runValidators: true }
    )
      .lean()
      .exec();

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const doc = project as { image?: string | null; video?: string | null };
    if (!doc.image && !doc.video) {
      return NextResponse.json(
        { error: "At least one of image or video is required" },
        { status: 400 }
      );
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error("[PATCH /api/projects/:id] error:", error);
    const message =
      error && typeof error === "object" && "message" in error
        ? String((error as { message?: string }).message)
        : "Failed to update project";
    return NextResponse.json(
      { error: message || "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    const ProjectModel = await getModel();
    const project = await ProjectModel.findByIdAndDelete(id).exec();

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ deleted: true }, { status: 200 });
  } catch (error) {
    console.error("[DELETE /api/projects/:id] error:", error);
    const message =
      error && typeof error === "object" && "message" in error
        ? String((error as { message?: string }).message)
        : "Failed to delete project";
    return NextResponse.json(
      { error: message || "Failed to delete project" },
      { status: 500 }
    );
  }
}
