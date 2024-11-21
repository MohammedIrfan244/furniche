import mongoose from "mongoose";

//model for wishList
const wishListSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const wishListModel =
  mongoose.models.WishList || mongoose.model("WishList", wishListSchema);
export default wishListModel;
