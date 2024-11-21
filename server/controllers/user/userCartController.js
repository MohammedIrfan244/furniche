import Cart from "../../models/cartModel.js";
import CustomError from "../../utils/CustomError.js";

// controller to show cart for a specific user
const getUserCart = async (req, res) => {
  // finding the user based  on the login info and token verification and populating it
  const data = await Cart.findOne({ userId: req.user.id }).populate({
    path: "products.productId",
    select: "name price image",
  });
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(200).json({ products: [] });
  }
};

//controller to add to cart
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
      // if no product found in the cart. add to the cart
      newCart.products.push({ productId, quantity });
    }
  }
  const cart = await newCart.save();

  // populate cart with product
  await cart.populate({
    path: "products.productId",
    select: "name price image",
  });
  res.status(200).json(cart);
};

// Controller for removing item from cart
const removeFromCart = async (req, res, next) => {
  // finding the cart by verified user and product passed through request and pull it from cart
  const cart = await Cart.findOneAndUpdate(
    { userId: req.user.id, "products.productId": req.body.productId },
    {
      $pull: { products: { productId: req.body.productId } },
    },
    // it will make it to return the updated cart
    { new: true }
  );
  // if cart exists, populate it and return
  if (cart) {
    await cart.populate({
      path: "products.productId",
      select: "name price image",
    });
    res.status(200).json(cart);
  } else {
    next(new CustomError("Product not found in the cart", 404));
  }
};

export { getUserCart, updateCart, removeFromCart };
