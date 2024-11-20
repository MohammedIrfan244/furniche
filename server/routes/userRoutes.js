import express from "express";
import { allProducts, productByCategory, productById } from "../controllers/user/userProductController.js";

const router = express.Router();

router
.get("/", allProducts)
.get('/byId/:id',productById)
.get('/:category',productByCategory)

export default router;
