import mongoose, { Schema, type Document, type Model } from "mongoose";

export type ProjectType = "game" | "script" | "bot" | "website" | "other";

export interface ProjectDocument extends Document {
  name: string;
  description: string;
  source: string;
  price: number;
  image?: string | null;
  video?: string | null;
  type: ProjectType;
}

const ProjectSchema = new Schema<ProjectDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      default: null,
      trim: true,
    },
    video: {
      type: String,
      default: null,
      trim: true,
    },
    type: {
      type: String,
      enum: ["game", "script", "bot", "website", "other"],
      required: true,
      default: "other",
    },
  },
  {
    collection: "Project",
    timestamps: true,
  }
);

ProjectSchema.pre("validate", function () {
  if (!this.image && !this.video) {
    this.invalidate(
      "image",
      "At least one of image or video is required for a project."
    );
    this.invalidate(
      "video",
      "At least one of image or video is required for a project."
    );
  }
});

export const ProjectModel: Model<ProjectDocument> =
  (mongoose.models.Project as Model<ProjectDocument>) ||
  mongoose.model<ProjectDocument>("Project", ProjectSchema);

