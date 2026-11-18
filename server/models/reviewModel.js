import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    author: { type: String, required: true },
    location: { type: String, default: "Kochi, Kerala" },
    propertyType: { type: String, default: "Architectural Residence" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    verified: { type: Boolean, default: true },
    date: { type: String },
  },
  { timestamps: true }
);

const reviewModel =
  mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default reviewModel;
