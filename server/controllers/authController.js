import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CustomError from "../utils/CustomError.js";
import { joiUserSchema } from "../models/validation.js";

const createAccessToken = (id, role, expiresIn) => {
  return jwt.sign({ id, role }, process.env.JWT_TOKEN, { expiresIn });
};

const createAdminAccessToken = (id, role, expiresIn) => {
  return jwt.sign({ id, role }, process.env.JWT_ADMIN_TOKEN, { expiresIn });
};

const createRefreshToken = (id, role, expiresIn) => {
  return jwt.sign({ id, role }, process.env.JWT_REFRESH_TOKEN, { expiresIn });
};

// Controller to handle register
const registerUser = async (req, res, next) => {
  const { value, error } = joiUserSchema.validate(req.body);
  const { name, email, password, mobile } = value;
  const newMobile = mobile ? mobile : "Not Provided";
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }
  const exist = await User.findOne({ email });
  if (exist) {
    return next(new CustomError("User already exist", 400));
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const profile = req.file!==""
    ? req.file.path
    : "https://i.pinimg.com/736x/c4/34/d8/c434d8c366517ca20425bdc9ad8a32de.jpg";
  const newUser = new User({
    name,
    email,
    mobile: newMobile,
    password: hashedPassword,
    profile,
  });
  await newUser.save();
  res
    .status(201)
    .json({ status: "success", message: "Registered successfully" });
};

// Controller to handle login
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomError("User does not exist", 401));
  }
  if (user.isBlocked) {
    return next(new CustomError("User is blocked", 401));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new CustomError("Invalid credentials", 401));
  }

  const accessToken = createAccessToken(user._id, user.role, "1h");
  const refreshToken = createRefreshToken(user._id, user.role, "1d");

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none", 
    maxAge: 24 * 60 * 60 * 1000, 
  });

  const userDetails = {
    name: user.name,
    email: user.email,
    role: user.role,
    profile: user.profile,
  };

  res.json({
    status: "success",
    message: "Logged in successfully",
    token: accessToken,
    user: userDetails,
  });
};

// Controller to handle admin login
const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomError("User does not exist", 401));
  }
  if (user.role !== "Admin") {
    return next(new CustomError("You are not authorized", 403));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new CustomError("Invalid credentials", 401));
  }
  const token = createAdminAccessToken(user._id, user.role, "1h");
  const refreshToken = createRefreshToken(user._id, user.role, "1d");

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none",
  });
  const userDetails = {
    name: user.name,
    email: user.email,
    role: user.role,
    profile:user.profile
  }
  res.json({ status: "success", message: "Logged in successfully", token ,user:userDetails});
};

// Controller to handle token refresh
const refreshingToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return next(new CustomError("No refresh token found", 401));
    }

    // Verifying the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN);

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return next(new CustomError("Invalid refresh token", 403));
    }

    // Create a new access token
    const accessToken = createAccessToken(user._id, user.role, "1h");

    res.status(200).json({ message: "Token refreshed", token: accessToken });
  } catch (err) {
    next(new CustomError("Failed to refresh token", 500));
  }
};


// Controller to handle logout
const logout = async (req, res, next) => {
  // Clearing the refresh token cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "none",
  });
  res
    .status(200)
    .json({ status: "success", message: "Logged out successfully" });
};

export { loginUser, registerUser, adminLogin, refreshingToken, logout };
