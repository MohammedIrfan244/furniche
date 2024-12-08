import Order from "../../models/orderModel.js";
import CustomError from "../../utils/CustomError.js";
import Cart from "../../models/cartModel.js";
import Product from "../../models/productModel.js";
import stripe from "stripe";

// to make an order with cash on delivery
const orderCashOnDel = async (req, res, next) => {
  const { products } = req.body;
  const { orderType } = req.body;
  if (!products || products.length === 0) {
    return next(new CustomError("No products found", 400));
  }
  const newOrder = await new Order({
    ...req.body,
    userId: req.user.id,
  }).populate("products.productId", "name price image");
  if (!newOrder) return next(new CustomError("order not created", 400));
  const checkUnAvailableProducts = newOrder.products.some(
    (p) => p.isDeleted === true
  );

  if (checkUnAvailableProducts) {
    return next(new CustomError("some products are not available", 400));
  }

  newOrder.paymentStatus = "COD";
  newOrder.shippingStatus = "Pending";


  if(orderType === "cart"){
     await Cart.findOne({ userId: req.user.id },{$set:{products:[]}},{new:true});
  }

  await newOrder.save();

  res
    .status(201)
    .json({ status: "success", message: "Order placed successfully" });
};

// to make an order with stripe
const stripePayment = async (req, res, next) => {
  // getting the products, address and total amount
  const { products, address, totalAmount } = req.body;
  if (!products || products.length === 0) {
    return next(new CustomError("No products found", 400));
  }
  // getting the details of the products
  const productDetails = await Promise.all(
    products.map(async (p) => {
      const product = await Product.findById(p.productId);
      return {
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: p.quantity,
      };
    })
  );
  if (!productDetails) return next(new CustomError("No products found", 400));
  const newTotal = Math.round(totalAmount);
  // creating the stripe line items
  const lineItems = productDetails.map((p) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: p.name,
          images: [p.image],
        },
        unit_amount: Math.round(p.price * p.quantity),
      },
      quantity: p.quantity,
    };
  });
  // creating the stripe session
  const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);
  const session = await stripeClient.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:3000/success/{CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:3000/cancel`,
  });

  const newOrder = await new Order({
    userId: req.user.id,
    products,
    address,
    paymentStatus: "Pending",
    shippingStatus: "Pending",
    totalAmount: newTotal,
    sessionId: session.id,
  });

  await newOrder.save();
  res.status(201).json({
    status: "success",
    message: "Order placed successfully",
    sessionId: session.id,
    stripeUrl: session.url,
  });
};

const stripeSuccess = async (req, res) => {
  const sessionId = req.params.sessionId;
  const {orderType}= req.body
  const order = await Order.findOne({ sessionId: sessionId });
  if (!order) {
    return next(new CustomError("Order not found", 404));
  }
  
  if(orderType === "cart"){
    await Cart.findOne({ userId: req.user.id },{$set:{products:[]}},{new:true});
  }
  
  order.shippingStatus = "Pending";
  order.paymentStatus = "Paid";
  await order.save();
  res
    .status(200)
    .json({ status: "success", message: "Order placed successfully" });
};
// Controller to get all orders by a user
const getAllOrders = async (req, res) => {
  const Orders = await Order.find({ userId: req.user.id })
    .populate("products.productId", "name price image")
    .sort({ createdAt: -1 });

  // sending the orders or an empty array if none found
  if (Orders) {
    res.status(200).json({ data: Orders });
  } else {
    res
      .status(200)
      .json({ status: "success", message: "No orders found", data: [] });
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
  res.status(200).json({
    status: "success",
    message: "Order fetched successfully",
    data: newOrder,
  });
};

// Controller to cancel one order by id
const cancelOneOrder = async (req, res, next) => {
  //  getting the order id by params and updating the delivery status to cancelled
  const newOrder = await Order.findOne({
    _id: req.params.orderId,
    userId: req.user.id,
  });
  if (!newOrder) {
    return next(new CustomError("Order not found", 404));
  }
  if (newOrder.paymentStatus === "Paid") {
    return next(new CustomError("You can't cancel this order", 400));
  }

  newOrder.shippingStatus = "Cancelled";
  newOrder.paymentStatus = "Cancelled";
  await newOrder.save();
  res.status(200).json({ status: "success", message: "Order cancelled" });
};

const publicKeySend = async (req, res) => {
  res.status(200).json({ publicKey: process.env.STRIPE_PUBLIC_KEY });
};

export {
  orderCashOnDel,
  getAllOrders,
  getOneOrder,
  cancelOneOrder,
  stripePayment,
  publicKeySend,
  stripeSuccess,
};