import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CustomError from "../utils/CustomError.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN);
};

// Controller to handle register
const registerUser = async (req, res) => {
  const { name, email, password, mobile } = req.body;

  // Check if user already exists
  const exist = await User.findOne({ email });
  if (exist) {
    return res.status(400).send("User already exists");
  }

  // Creating salt and hash
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Creating user
  const newUser = new User({
    name,
    email,
    mobile,
    password: hashedPassword,
  });

  // Adding user to db and returning
  const user = await newUser.save();
  res.status(201).json({ success: true, data: user });
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
