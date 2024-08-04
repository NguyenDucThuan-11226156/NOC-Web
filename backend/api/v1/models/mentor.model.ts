import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema(
  {
    name: String,
    introduction: String,
    field: String,
    experience: String,
    rate: Number,
    numberRate: Number,
    review: [
      {
        userId: String,
        message: String,
        createAt: Date,
      },
    ],
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
