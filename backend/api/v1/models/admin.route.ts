import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    school: String,
    domain: String,
    token: String,
    studentId: String,
    saving: String,
    number: Number,
    avatar: String,
    mentorIds: [
      {
        mentorId: String,
      },
    ],
    saveMentorIds: [
      {
        mentorId: String,
      },
    ],
    description: String,
    categoriesConsultId: String,
    description_proplem: String,
    linkCv: String,
    slug: String,
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

const Admin = mongoose.model("Admin", adminSchema, "admin");

export default Admin;
