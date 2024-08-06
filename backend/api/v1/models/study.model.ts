import mongoose from "mongoose";

const studySchema = new mongoose.Schema(
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
const Study = mongoose.model("Study", studySchema, "study");

export default Study;
