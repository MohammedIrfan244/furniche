import express from "express";
import { loginUser, refreshingToken, registerUser } from "../controllers/authController.js";
import tryCatch from "../utils/tryCatch.js";

// route for user, the path starts with /user/
const router = express.Router();

router
  .post("/register", tryCatch(registerUser)) // handling the registration of new user
  .post("/login", tryCatch(loginUser)) // handling the login in of existing user
  .post("/refreshToken", tryCatch(refreshingToken));

export default router;
