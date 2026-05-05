import { type Document, model, Schema } from "mongoose";
import { User } from "./user";

export interface ISessionDoc extends Document {
  userId: Schema.Types.ObjectId;
  accessToken: string; // Note: Singular string now
  refreshToken: string; // Note: Singular string now
  ipAddress?: string;
  userAgent?: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new Schema<ISessionDoc>(
  {
    userId: { type: Schema.Types.ObjectId, ref: User.modelName, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },

    // 👇 You can now store context per login!
    ipAddress: { type: String },
    userAgent: { type: String },

    // 👇 MongoDB will automatically delete the document when this time passes!
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
  },
  { timestamps: true },
);

export const Session = model<ISessionDoc>("Session", sessionSchema);
