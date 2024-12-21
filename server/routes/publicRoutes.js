import express from "express";
import tryCatch from "../utils/tryCatch.js";
import idValidation from "../middlewares/idValidation.js";
import {
  allProducts,
  getOriginalProducts,
  lastAddedTenProducts,
  productByCategory,
  productById,
} from "../controllers/publicController.js";

const router = express.Router();

router
  // routes for the products to show, doesn't need any verification
  .get("/products", tryCatch(allProducts)) // getting all the products
  .get("/products/:id", idValidation,tryCatch(productById)) // getting a product by id
  .get("/products/category/:category", tryCatch(productByCategory))// getting products by category
  .get("/products/collection/original",tryCatch(getOriginalProducts))
  .get("/products/collection/latest",tryCatch(lastAddedTenProducts))

export default router;
