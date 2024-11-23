import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CustomError from "../utils/CustomError.js";
import { joiUserSchema } from "../models/validation.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN);
};

// Controller to handle register
const registerUser = async (req, res, next) => {
  // validating the input by joi
  const { value, error } = joiUserSchema.validate(req.body);
  const { name, email, password, mobile } = value;

  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }

  const exist = await User.findOne({ email });
  if (exist) {
    return next(new CustomError("User already exist", 400));
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    mobile,
    password: hashedPassword,
  });

  await newUser.save();
  res.status(201).json({ message: "Registered successfully" });
};

// Controller to handle login
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomError("User does not exist", 401));
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new CustomError("Invalid credentials", 401));
  }

  // Creating token for logged-in user
  const token = createToken(user._id);

  
  res.json({ message: "Logged in successfully", token });
};

export { loginUser, registerUser };
