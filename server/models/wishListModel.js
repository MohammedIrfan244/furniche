import mongoose from "mongoose";

//model for wishList
const wishListSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // each products will be their ids. we will populate it
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
