import mongoose from "mongoose";

const domainSchema = new mongoose.Schema(
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
const Domain = mongoose.model("Domain", domainSchema, "domain");

export default Domain;
