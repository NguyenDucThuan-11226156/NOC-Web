import mongoose from "mongoose";

const enterpriseSchema = new mongoose.Schema(
  {
    description: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);
const Enterprise = mongoose.model("Enterprise", enterpriseSchema, "enterprise");

export default Enterprise;
