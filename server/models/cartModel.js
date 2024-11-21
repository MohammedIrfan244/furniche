import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // an array for products. it will contain the id of products and the quantity
    products: [
      {
        // this is the ids
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },

        quantity: { type: Number, required: true, min: 1 },
      },
    ],
  },
  { timestamps: true }
);

const cartModel = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
export default cartModel;
