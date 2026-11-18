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
import {
  getReviewsByProduct,
  createProductReview,
} from "../controllers/reviewController.js";
import {
  createConsultation,
  getPincodeEstimate,
} from "../controllers/consultationController.js";

const router = express.Router();

router
  // routes for the products to show, doesn't need any verification
  .get("/products", tryCatch(allProducts)) // getting all the products
  .get("/products/:id", idValidation, tryCatch(productById)) // getting a product by id
  .get("/products/:id/reviews", idValidation, tryCatch(getReviewsByProduct)) // getting dynamic real reviews from DB
  .post("/products/:id/reviews", idValidation, tryCatch(createProductReview)) // submitting real review to DB
  .get("/products/category/:category", tryCatch(productByCategory)) // getting products by category
  .get("/products/collection/original", tryCatch(getOriginalProducts))
  .get("/products/collection/latest", tryCatch(lastAddedTenProducts))
  .post("/consultations", tryCatch(createConsultation)) // requesting atelier consultation
  .get("/pincode/:pin", tryCatch(getPincodeEstimate)); // dynamic real Kerala pincode delivery calculation

export default router;
