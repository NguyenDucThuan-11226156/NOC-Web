import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
    mentorId: String,
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

const Users = mongoose.model("Users", userSchema, "users");

export default Users;
