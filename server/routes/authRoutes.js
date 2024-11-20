import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";

// route for user, the path start with /user/
const router = express.Router();

router
    .post("/register", registerUser)
    .post("/login", loginUser);

export default router;
