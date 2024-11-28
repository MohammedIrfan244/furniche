import mongoose from "mongoose";

// schema for the product
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    price: { type: Number, required: true },
    image: { type: String },
    description: { type: String ,default:""},
    original: { type: Boolean, default: false },
    category: { type: String, required: true },
    review: { type: String ,default:""},
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const productModel =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default productModel;
