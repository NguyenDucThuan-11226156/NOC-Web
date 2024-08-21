import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    token: String,
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
