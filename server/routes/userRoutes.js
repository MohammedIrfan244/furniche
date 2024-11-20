import express from "express";
import {
  allProducts,
  productByCategory,
  productById,
} from "../controllers/user/userProductController.js";
import tryCatch from "../utils/tryCatch.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { getUserCart, removeFromCart, updateCart } from "../controllers/user/userCartController.js";

const router = express.Router();

router
  // routes for the products to show, doesn't need any verification
  .get("/products", tryCatch(allProducts))
  .get("/product/:id", tryCatch(productById))
  .get("/products/:category", tryCatch(productByCategory))

  //routes for cart handling
  .get('/cart',verifyToken,tryCatch(getUserCart))
  .post('/cart',verifyToken,tryCatch(updateCart))
  .delete('/cart',verifyToken,tryCatch(removeFromCart));

export default router;
