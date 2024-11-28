import Order from "../../models/orderModel.js";
import CustomError from "../../utils/CustomError.js";
import Cart from "../../models/cartModel.js";
import Product from '../../models/productModel.js'
import stripe from "stripe";




// to make an order with cash on delivery
const orderCashOnDel = async (req, res, next) => {
  const {products} = req.body
  if(!products||products.length===0){
    return next(new CustomError("No products found",400))
  }
  const newOrder = await new Order({
    ...req.body,
    userId: req.user.id,
  }).populate("products.productId", "name price image");

  //   sending error if creation of order failed
  if (!newOrder) return next(new CustomError("order not created", 400));

  //   checking if the any product is deleted by the admin
  const checkUnAvailableProducts = newOrder.products.some(
    (p) => p.isDeleted===true
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
   await currUserCart.save();

  let order = await (
    await newOrder.save()
  )

  res.status(201).json({ message: "Order placed successfully" });
};

const stripePayment=async(req,res,next)=>{
const {products,address,totalAmount}=req.body
if(!products||products.length===0){
    return next(new CustomError("No products found",400))
}
const productDetails= await Promise.all(
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
  const newTotal=Math.round(totalAmount)

  const lineItems=productDetails.map((p)=>{
    return{
        price_data:{
            currency:"inr",
            product_data:{
                name:p.name,
                images:[p.image],
            },
            unit_amount:Math.round(p.price*p.quantity)
        },
        quantity:p.quantity
    }
  })
  const stripeClient= new stripe(process.env.STRIPE_SECRET_KEY)
  const session=await stripeClient.checkout.sessions.create({
    payment_method_types:["card"],
    line_items:lineItems,
    mode:"payment",
    success_url:`http://localhost:3000/success/{CHECKOUT_SESSION_ID}`,
    cancel_url:`http://localhost:3000/cancel`,
  })

  const newOrder=await new Order({
    userId:req.user.id,
    products,
    address,
    paymentStatus:"pending",
    shippingStatus:"pending",
    totalAmount:newTotal,
    sessionId:session.id
  })

  await newOrder.save()
  res.status(201).json({message:"Order placed successfully",sessionId:session.id,stripeUrl:session.url})
}

// Controller to get all orders by a user
const getAllOrders = async (req, res) => {
  const Orders = await Order.find({ userId: req.user.id })
    .populate("products.productId", "name price image")
    .sort({ createdAt: -1 });

  // sending the orders or an empty array if none found
  if (Orders) {
    res.status(200).json({ data: Orders });
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

const publicKeySend=async(req,res)=>{
  res.status(200).json({publicKey:process.env.STRIPE_PUBLIC_KEY})
}

export { orderCashOnDel, getAllOrders, getOneOrder, cancelOneOrder, stripePayment ,publicKeySend};
