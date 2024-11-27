import express from "express";
import tryCatch from "../utils/tryCatch.js";
import { allProducts, productByCategory, productById } from "../controllers/user/userProductController.js";

const router = express.Router();



router
  // routes for the products to show, doesn't need any verification
  .get("/products", tryCatch(allProducts)) // getting all the products
  .get("/products/:id", tryCatch(productById)) // getting a product by id
  .get("/products/category/:category", tryCatch(productByCategory)) // getting products by category

  export default router;