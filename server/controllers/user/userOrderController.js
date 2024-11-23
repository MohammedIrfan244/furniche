import Order from "../../models/orderModel.js";
import CustomError from "../../utils/CustomError.js";
import Cart from "../../models/cartModel.js";

// to make an order with cash on delivery
const orderCashOnDel = async (req, res, next) => {
  // getting and populating the order in order to check incase of deletion by admin
  const newOrder = await new Order({
    ...req.body,
    userId: req.user.id,
  }).populate("products.productId", "name price image");

  //   sending error if creation of order failed
  if (!newOrder) return next(new CustomError("order not created", 400));

  //   checking if the any product is deleted by the admin
  const checkUnAvailableProducts = newOrder.products.some(
    (p) => !p.productId || !p.productId.name
  );

  //   if deleted , throw error to user
  if (checkUnAvailableProducts) {
    return next(new CustomError("some products are not available", 400));
  }

  //   setting the statuses for payment and delivery
  newOrder.paymentStatus = "Cash On Delivery";
  newOrder.shippingStatus = "Processing";

  //   making the cart empty after the ordering
  let currUserCart = await Cart.findOneAndUpdate(
    { userId: req.user.id },
    { $set: { products: [] } }
  );
  let cart = await currUserCart.save();

  let order = await (
    await newOrder.save()
  )

  res.status(201).json({ message: "Order placed successfully" });
};

// Controller to get all orders by a user
const getAllOrders = async (req, res) => {
  const newOrders = await Order.find({ userId: req.user.id })
    .populate("products.productId", "name price image")
    .sort({ createdAt: -1 });

  // sending the orders or an empty array if none found
  if (newOrders) {
    res.status(200).json({ data: newOrders });
  } else {
    res.status(200).json({ data: [] });
  }
};

// Controller to get one order by a user
const getOneOrder = async (req, res, next) => {
  // getting the order id by params and check and find
  const newOrder = await Order.findOne({
    _id: req.params.orderId,
    userId: req.user.id,
  }).populate("products.productId", "name price image");
  if (!newOrder) {
    return next(new CustomError("Order not found", 404));
  }
  res.status(200).json({ newOrder });
};

// Controller to cancel one order by id
const cancelOneOrder = async (req, res, next) => {
  //  getting the order id by params and updating the delivery status to cancelled
  const newOrder = await Order.findOneAndUpdate(
    { _id: req.params.orderId, userId: req.user.id },
    { $set: { shippingStatus: "Cancelled" } },
    { new: true }
  );
  if (!newOrder) {
    return next(new CustomError("Order not found", 404));
  }
  res.status(200).json({ message: "Order cancelled" });
};

export { orderCashOnDel, getAllOrders, getOneOrder, cancelOneOrder };
