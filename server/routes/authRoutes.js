import express from "express";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import { registerUser } from "../controllers/userController.js";


const router = express.Router();


router.post("/register", registerUser);

router.post("/login", (req, res) => {
  res.send("from login");
});

export default router;
