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
  console.log(req.file);
  let profile = "";
  if (!req.file) {
    profile =
      "https://i.pinimg.com/736x/c4/34/d8/c434d8c366517ca20425bdc9ad8a32de.jpg";
  } else {
    profile = req.file.path;
  }
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

  const userDetails = {
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    profile: user.profile,
  };
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.cookie("token", accessToken, {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });

  res.cookie("user", JSON.stringify(userDetails), {
    httpOnly: false,
    secure: true,
    sameSite: "Lax",
    path:'/',
    domain:".vercel.app"
  });

  res.json({
    status: "success",
    message: "Logged in successfully",
  });
};

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

  const userDetails = {
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    profile: user.profile,
  };
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.cookie("token", token, {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });

  res.cookie("user", JSON.stringify(userDetails), {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });

  res.json({
    status: "success",
    isAdmin: true,
    message: "Logged in successfully",
  });
};
401;
// Controller to handle token refresh
const refreshingToken = async (req, res, next) => {
  if (!req.cookies) {
    return next(new CustomError("No cookies found", 401));
  }
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
  let accessToken;
  if (user.role === "Admin") {
    accessToken = createAdminAccessToken(user._id, user.role, "1h");
  } else {
    accessToken = createAccessToken(user._id, user.role, "1h");
  }

  res.status(200).json({ message: "Token refreshed", token: accessToken });
};

// Controller to handle logout
const logout = async (req, res, next) => {
  // Clearing the refresh token cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.clearCookie("token", {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });
  res.clearCookie("user", {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });

  res
    .status(200)
    .json({ status: "success", message: "Logged out successfully" });
};

const adminLogout = async (req, res, next) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.clearCookie("token", {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });
  res.clearCookie("user", {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });
  res
    .status(200)
    .json({ status: "success", message: "Admin logged out successfully" });
};

export {
  loginUser,
  registerUser,
  adminLogin,
  refreshingToken,
  adminLogout,
  logout,
};
