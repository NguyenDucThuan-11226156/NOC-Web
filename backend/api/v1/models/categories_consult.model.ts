import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema(
  {
    title: String,
    status: String,
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

const Categories = mongoose.model("Categories", categoriesSchema, "Categories");

export default Categories;
