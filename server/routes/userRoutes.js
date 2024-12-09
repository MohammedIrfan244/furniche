import express from "express";
import tryCatch from "../utils/tryCatch.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import idValidation from "../middlewares/idValidation.js";
import {
  getUserCart,
  removeFromCart,
  totalNumberOfCartItems,
  updateCart,
} from "../controllers/user/userCartController.js";
import {
  addToWishList,
  getUserWishList,
  removeFromWishList,
} from "../controllers/user/userWishListController.js";
import {
  cancelOneOrder,
  getAllOrders,
  getOneOrder,
  orderCashOnDel,
  publicKeySend,
  stripePayment,
  stripeSuccess,
} from "../controllers/user/userOrderController.js";

const router = express.Router();

router

  //routes for cart handling
  .get("/cart", verifyToken, tryCatch(getUserCart)) // getting user's cart
  .get("/cart/stats", verifyToken, tryCatch(totalNumberOfCartItems))
  .post("/cart", verifyToken, tryCatch(updateCart)) // updating the products in the cart
  .delete("/cart/:productId", verifyToken, tryCatch(removeFromCart)) // removing a product from the cart

  // routes for wishlist handling
  .get("/wishList", verifyToken, tryCatch(getUserWishList)) // getting user's wish list
  .post("/wishList", verifyToken, tryCatch(addToWishList)) // adding item to wish list
  .delete("/wishList/:id", verifyToken, tryCatch(removeFromWishList)) // removing item from wish list

  // routes for orders
  .get("/orders", verifyToken, tryCatch(getAllOrders)) // getting all orders by user
  .get("/orders/:orderId", verifyToken,idValidation, tryCatch(getOneOrder)) // getting order by id
  .post("/orders/checkout/cod", verifyToken, tryCatch(orderCashOnDel)) // making an order by cash on delivery
  .post("/orders/checkout/stripe", verifyToken, tryCatch(stripePayment)) // making an order by stripe
  .put(
    "/orders/stripe/success/:sessionId",
    verifyToken,
    tryCatch(stripeSuccess)
  ) // success route for stripe
  .get("/orders/publicKey", verifyToken, tryCatch(publicKeySend)) // getting stripe public key on the client
  .patch("/orders/cancel/:orderId", verifyToken, idValidation,tryCatch(cancelOneOrder)); // cancelling an order by id

export default router;
