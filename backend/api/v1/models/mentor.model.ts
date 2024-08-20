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
    mentees: [
      {
        userId: String,
        name: String,
        school: String,
        domain: String,
        studentId: String,
        number: Number,
        email: String,
        introduction: String,
        field: String,
        issueDescription: String,
        cv: {
          url: String,
          originalFilename: String,
        },
      },
    ],
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
