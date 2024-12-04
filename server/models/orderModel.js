import mongoose from "mongoose";

// model for order

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // products would be an array containing multiple orders
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    // session id will be hard coded rn, will make it functional after adding the stripe
    sessionId: { type: String },
    orderType: { type: String, required: true },
    purchasedDate: { type: Date, default: Date.now },
    address: { type: Object, required: true },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, default: "pending" },
    shippingStatus: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const orderModel =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

export default orderModel;
