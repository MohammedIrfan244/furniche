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
    return next(new CustomError("Input is not valid", 400));
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
  const userDetail = {
    name,
    email,
    mobile,
  };

  const user = await newUser.save();
  res.status(201).json({ success: true, data: userDetail });
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

  // creating only the necessary detail for the user
  const userDetail = {
    name: user.name,
    email: user.email,
    mobile: user.mobile,
  };
  res.json({ success: true, token, data: userDetail });
};

export { loginUser, registerUser };
