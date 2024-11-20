import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

// route for user, the path start with /user/
const router = express.Router();


router.post("/register", registerUser);
router.post("/login",loginUser);

export default router;
