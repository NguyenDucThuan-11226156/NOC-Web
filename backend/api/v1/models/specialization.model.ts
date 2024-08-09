import mongoose from "mongoose";

const specializationSchema = new mongoose.Schema(
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
const Specialization = mongoose.model(
  "Specialization",
  specializationSchema,
  "specialization"
);

export default Specialization;
