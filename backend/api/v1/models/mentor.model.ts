import mongoose from "mongoose";

const mentorSchema = new mongoose.Schema(
  {
    name: String,
    avatar: String,
    menteeCount: Number,
    introduction1: String,
    introduction2: String,
    rate: Number,
    numberRate: Number,
    keyword: String,
    organization: String,
    specialization: String,
    education: String,
    industry: String,
    other: String,
    companyLogo: String,
    field: String,
    experience: String,
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
