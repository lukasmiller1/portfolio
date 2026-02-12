import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface TeamMemberDocument extends Document {
  name: string;
  role: string;
  introduction: string;
  photo?: string | null;
}

const TeamMemberSchema = new Schema<TeamMemberDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    introduction: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    collection: "Team",
    timestamps: true,
  }
);

export const TeamModel: Model<TeamMemberDocument> =
  (mongoose.models.Team as Model<TeamMemberDocument>) ||
  mongoose.model<TeamMemberDocument>("Team", TeamMemberSchema);
