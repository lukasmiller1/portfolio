import { NextResponse } from "next/server";
import mongoose from "mongoose";

export const runtime = "nodejs";

async function getModel() {
  const { connectToDatabase } = await import("@/lib/mongodb");
  const { TeamModel } = await import("@/models/Team");
  await connectToDatabase();
  return TeamModel;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid team member ID" },
        { status: 400 }
      );
    }

    const TeamModel = await getModel();
    const body = await request.json();
    const { name, role, introduction, photo } = body ?? {};

    const update: Record<string, unknown> = {};
    if (name !== undefined) update.name = name;
    if (role !== undefined) update.role = role;
    if (introduction !== undefined) update.introduction = introduction;
    if (photo !== undefined) update.photo = photo != null && String(photo).trim() ? String(photo).trim() : null;

    const member = await TeamModel.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, runValidators: true }
    )
      .lean()
      .exec();

    if (!member) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ member }, { status: 200 });
  } catch (error) {
    console.error("[PATCH /api/team/:id] error:", error);
    return NextResponse.json(
      { error: "Failed to update team member" },
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
      return NextResponse.json(
        { error: "Invalid team member ID" },
        { status: 400 }
      );
    }

    const TeamModel = await getModel();
    const member = await TeamModel.findByIdAndDelete(id).exec();

    if (!member) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ deleted: true }, { status: 200 });
  } catch (error) {
    console.error("[DELETE /api/team/:id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete team member" },
      { status: 500 }
    );
  }
}
