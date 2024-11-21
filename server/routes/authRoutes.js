import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import tryCatch from "../utils/tryCatch.js";

// route for user, the path starts with /user/
const router = express.Router();

router
  .post("/register", tryCatch(registerUser))
  .post("/login", tryCatch(loginUser));

export default router;
