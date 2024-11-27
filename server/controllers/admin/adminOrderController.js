import Orders from "../../models/orderModel.js";
import CustomError from "../../utils/CustomError.js";

const getTotalOrders = async (req, res) => {
  const totalOrders = await Orders.find()
    .populate("products.productId", "name price image")
    .sort({ createdAt: -1 });
  if (!totalOrders) {
    return res.status(200).json({ message: "No orders found" });
  }
  res.status(200).json({ data: totalOrders });
};

const getOrderByUser = async (req, res) => {
  const orders = await Orders.find({ userId: req.params.id })
    .populate("products.productId", "name price image")
    .sort({ createdAt: -1 });
  if (!orders) {
    return res.status(200).json({ message: "No orders found" });
  }
  res.status(200).json({ data: orders });
};

const totalNumberOfOrders = async (req, res) => {
  const totalOrders = await Orders.find().countDocuments()
  if (!totalOrders) {
    return res.status(200).json({ message: "No orders found" });
  }
  res.status(200).json({ data: totalOrders });
};

const updateShippingStatus = async (req, res, next) => {
  const order = await Orders.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { shippingStatus: req.body.status } },
    { new: true }
  );
  if (!order) {
    return next(new CustomError("Order not found", 404));
  }
  res.status(200).json({ message: "Order status updated successfully" });
};

const updatePaymentStatus = async (req, res, next) => {
  const order = await Orders.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { paymentStatus: req.body.status } },
    { new: true }
  );
  if (!order) {
    return next(new CustomError("Order not found", 404));
  }
  res.status(200).json({ message: "Order status updated successfully" });
};

const getTotalRevenue = async (req, res) => {
  const totalOrders = await Orders.find();
  if (!totalOrders) {
    return res.status(200).json({ message: "No orders found" });
  }
  const revenue = totalOrders.reduce((acc, order) => {
    return acc + order.totalAmount;
  }, 0);
  res.status(200).json({ data: revenue });
};

export {
  getTotalOrders,
  totalNumberOfOrders,
  updateShippingStatus,
  updatePaymentStatus,
  getOrderByUser,
  getTotalRevenue,
};
