import express from "express";
import { allProducts, productByCategory, productById } from "../controllers/user/userProductController.js";

const router = express.Router();

router
.get("/products", allProducts)
.get('/product/:id',productById)
.get('/products/:category',productByCategory)

export default router;
