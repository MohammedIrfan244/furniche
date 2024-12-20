import Cart from "../../models/cartModel.js";
import CustomError from "../../utils/CustomError.js";
import mongoose from "mongoose";

// controller to show cart for a specific user
const getUserCart = async (req, res) => {
  // finding the user based  on the login info and token verification and populating it
  const data = await Cart.findOne(
    { userId: req.user.id },
    { _id: 0, userId: 0, createdAt: 0, updatedAt: 0 }
  )
    .sort({ createdAt: -1 })
    .populate("products.productId", "name price image");
  if (data) {
    res.status(200).json({
      status: "success",
      message: "Cart fetched successfully",
      data: data,
    });
  } else {
    res
      .status(200)
      .json({ status: "success", message: "Cart is empty", data: [] });
  }
};

const totalNumberOfCartItems = async (req, res) => {
  const data = await Cart.findOne({ userId: req.user.id });
  if (!data) {
    return res
      .status(200)
      .json({ status: "success", message: "Cart is empty", count: 0 });
  } else {
    res
      .status(200)
      .json({
        status: "success",
        message: "Cart fetched successfully",
        count: data.products.length,
      });
  }
};

//controller to update cart
const updateCart = async (req, res, next) => {
  const { productId, quantity } = req.body;

  if (quantity < 1) {
    next(new CustomError("Quantity is not valid " + quantity, 400));
  }
  // finding the verified user's cart
  let newCart = await Cart.findOne({ userId: req.user.id });
  // if no cart found ,create a new cart
  if (!newCart) {
    newCart = new Cart({
      userId: req.user.id,
      products: [{ productId, quantity }],
    });
  } else {
    // if cart exist. find the product from the cart
    const itemIndex = newCart.products.findIndex(
      (p) => p.productId.toString() == productId
    );
    // if the product is in the cart,update the quantity
    if (itemIndex > -1) {
      newCart.products[itemIndex].quantity = quantity;
    } else {
      newCart.products.push({ productId, quantity });
    }
  }
  await newCart.save();

  res
    .status(200)
    .json({ status: "success", message: "Cart updated successfully" });
};

// Controller for removing item from cart
const removeFromCart = async (req, res, next) => {
  const productId = req.params.productId;
  const cart = await Cart.findOneAndUpdate(
    { userId: req.user.id, "products.productId": productId },
    {
      $pull: { products: { productId: productId } },
    },
    { new: true }
  );
  if (cart) {
    res.status(200).json({
      status: "success",
      message: "Product removed from cart successfully",
    });
  } else {
    next(new CustomError("Product not found in the cart", 404));
  }
};

export { getUserCart, updateCart, removeFromCart, totalNumberOfCartItems };
