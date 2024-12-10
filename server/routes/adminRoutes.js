import express from "express";
import tryCatch from "../utils/tryCatch.js";
import { verifyTokenAdmin } from "../middlewares/verifyToken.js";
import idValidation from "../middlewares/idValidation.js";
import {
  blockUser,
  getAllUsers,
  getUserById,
  totalNumberOfUsers,
} from "../controllers/admin/adminUserController.js";
import { adminLogin, logout } from "../controllers/authController.js";
import {
  addNewProduct,
  adminProducts,
  deleteProduct,
  editProduct,
  totalNumberOfProducts,
} from "../controllers/admin/adminProductController.js";
import {
  getOrderByUser,
  getTotalOrders,
  getTotalRevenue,
  totalNumberOfOrders,
  updatePaymentStatus,
  updateShippingStatus,
} from "../controllers/admin/adminOrderController.js";
import upload from "../middlewares/multer.js";
import {
  productById,
} from "../controllers/publicController.js";

const router = express.Router();

router
  .post("/login", tryCatch(adminLogin)) // login route for admin
  .post("/logout",tryCatch(logout))

  // routes for accessing users
  .get("/users", verifyTokenAdmin, tryCatch(getAllUsers)) // route to get the list for all users
  .get("/users/:id", verifyTokenAdmin, idValidation,tryCatch(getUserById)) // route for getting a single user
  .get("/users/details/stats", verifyTokenAdmin, tryCatch(totalNumberOfUsers)) // route for getting the total number of uses
  .patch("/users/block/:id", verifyTokenAdmin, idValidation,tryCatch(blockUser)) // route for block a single user

  // routes for accessing products
  .get("/products/category/:category", verifyTokenAdmin, tryCatch(adminProducts)) // getting all the products
  .get("/products/:id", verifyTokenAdmin, idValidation,tryCatch(productById)) // getting a product by id
  .get(
    "/products/details/stats",
    verifyTokenAdmin,
    tryCatch(totalNumberOfProducts)
  ) // route for getting the total number of products
  .post(
    "/products",
    verifyTokenAdmin,
    upload.single("image"),
    tryCatch(addNewProduct)
  ) // route for adding a new product
  .put(
    "/products/:id",
    verifyTokenAdmin,
    upload.single("image"),
    idValidation,
    tryCatch(editProduct)
  ) // route for editing a product
  .delete("/products/:id", verifyTokenAdmin, idValidation,tryCatch(deleteProduct)) // route for deleting a product

  // routes for accessing orders
  .get("/orders", verifyTokenAdmin, tryCatch(getTotalOrders)) // route for getting all the orders
  .get("/orders/user/:id", verifyTokenAdmin, idValidation,tryCatch(getOrderByUser)) // route for getting all the orders by a user
  .get("/orders/details/stats", verifyTokenAdmin, tryCatch(totalNumberOfOrders)) // route for getting the total number of orders
  .get("/orders/details/revenue", verifyTokenAdmin, tryCatch(getTotalRevenue)) // route for getting the total revenue
  .patch(
    "/orders/shipping/:id",
    verifyTokenAdmin,
    idValidation,
    tryCatch(updateShippingStatus)
  ) // route for updating the shipping status
  .patch(
    "/orders/payment/:id",
    verifyTokenAdmin,
    idValidation,
    tryCatch(updatePaymentStatus)
  ); // route for updating the payment status

export default router;
