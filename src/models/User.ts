import mongoose, { Schema, model, models, Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  division: string;
  department: string;
  superintendent: Types.ObjectId | null;
  directReports: Types.ObjectId[];
  status: 0 | 1 | 2;
  role: "superadmin" | "head" | "spv" | "member";
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 60,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 4,
      maxlength: 60,
    },
    division: {
      type: String,
      required: true,
      enum: [
        "IT Development",
        "HCGA",
        "Product Development",
        "Research & Development",
        "IT Infrastructure, Network, and Security",
        "Business & Relationship",
        "FAT",
        "Compliance & Audit",
        "BOD/Management",
      ],
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    superintendent: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    directReports: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    status: {
      type: Number,
      enum: [0, 1, 2],
      default: 1,
    },
    role: {
      type: String,
      enum: ["superadmin", "head", "spv", "member"],
      default: "member",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model re-compilation in Next.js dev (hot reload)
export const User = (models.User as mongoose.Model<IUser>) ?? model<IUser>("User", UserSchema);
