import express from "express";
import tryCatch from "../utils/tryCatch.js";
import { verifyTokenAdmin } from "../middlewares/verifyToken.js";
import { blockUser, getAllUsers, getUserById, totalNumberOfUsers } from "../controllers/admin/adminUserController.js";
import { adminLogin } from "../controllers/authController.js";



const router=express.Router();

// router for admin
router

.post("/login",tryCatch(adminLogin)) // login route for admin


// routes for accessing users
.get('/users',verifyTokenAdmin,tryCatch(getAllUsers)) // route to get the list for all users
.get('/user/:id',verifyTokenAdmin,tryCatch(getUserById)) // route for getting a single user
.get('/users/totalNumber',verifyTokenAdmin,tryCatch(totalNumberOfUsers)) // route for getting the total number of uses
.patch('/user/:id',verifyTokenAdmin,tryCatch(blockUser)) // route for block a single user


export default router