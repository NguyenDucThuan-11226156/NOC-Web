import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema(
  {
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

const Mentors = mongoose.model("Mentors", mentorSchema, "mentors");

export default Mentors;
