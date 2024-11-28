import Orders from "../../models/orderModel.js";
import CustomError from "../../utils/CustomError.js";

const getTotalOrders = async (req, res) => {
  // getting all the orders and populating the products
  const totalOrders = await Orders.find()
    .populate("products.productId", "name price image")
    .sort({ createdAt: -1 });
  // if no orders found return a message
  if (!totalOrders) {
    return res.status(200).json({ message: "No orders found" });
  }
  // sending the orders
  res.status(200).json({ data: totalOrders });
};

// getting all the orders by a user
const getOrderByUser = async (req, res) => {
  const orders = await Orders.find({ userId: req.params.id })
    .populate("products.productId", "name price image")
    .sort({ createdAt: -1 });
  if (!orders) {
    return res.status(200).json({ message: "No orders found" });
  }
  res.status(200).json({ data: orders });
};

// getting the total number of orders
const totalNumberOfOrders = async (req, res) => {
  const totalOrders = await Orders.find();
  if (!totalOrders) {
    return res.status(200).json({ message: "No orders found" });
  }
  const cancelled=totalOrders.filter(order=>order.shippingStatus==="Cancelled");
  const nonCancelled=totalOrders.filter(order=>order.shippingStatus!=="Cancelled");
  res.status(200).json({ totalOrders:totalOrders.length,cancelledOrders:cancelled.length,nonCancelledOrders:nonCancelled.length });
};

// updating the shipping status
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

// updating the payment status
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

// getting the total revenue
const getTotalRevenue = async (req, res) => {
  const totalOrders = await Orders.find();
  if (!totalOrders) {
    return res.status(200).json({ message: "No orders found" });
  }
  const nonCancelledOrders = totalOrders.filter(
    (order) => order.shippingStatus !== "Cancelled"
  )
  const revenue = nonCancelledOrders.reduce((acc, order) => {
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
