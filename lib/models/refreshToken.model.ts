// 3rd Party
import mongoose, { Schema, Document, models, model } from "mongoose";

export interface RefreshTokenInterface extends Document {
  token: string;
  userId: Schema.Types.ObjectId;
  expiry: Date;

  isExpired(): boolean;
}

const RefreshTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    expiry: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "refresh_tokens",
    versionKey: false,
  }
);

// method to check if the refresh token is expired
RefreshTokenSchema.methods.isExpired = function (): boolean {
  return new Date() > this.expiry;
};

export const RefreshToken =
  models.RefreshToken ||
  model<RefreshTokenInterface>("RefreshToken", RefreshTokenSchema);
