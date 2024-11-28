import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CustomError from "../utils/CustomError.js";
import { joiUserSchema } from "../models/validation.js";

const createAccessToken = (id,role,expiresIn) => {
  return jwt.sign({ id,role}, process.env.JWT_TOKEN,{expiresIn});
};

const createRefreshToken = (id,role,expiresIn) => {
  return jwt.sign({ id,role }, process.env.JWT_REFRESH_TOKEN,{expiresIn});
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

  if(user.isBlocked){
    return next(new CustomError("User is blocked", 401));
  }
  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new CustomError("Invalid credentials", 401));
  }

  // Creating token for logged-in user
  const accessToken = createAccessToken(user._id,user.role,"1h");
  const refreshToken = createRefreshToken(user._id,user.role,"1d");

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none"
  });

  res.json({ message: "Logged in successfully", token: accessToken });
};


const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomError("User does not exist", 401));
  }
  if (user.role!=="Admin"){
    return next(new CustomError("You are not authorized", 403));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new CustomError("Invalid credentials", 401));
  }
  const token = createAccessToken(user._id,user.role,"1h");
  const refreshToken = createRefreshToken(user._id,user.role,"1d");

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "none"
  });
  res.json({ message: "Logged in successfully", token });
};

const refreshingToken=async(req,res,next)=>{
  const refreshToken=req.cookies.refreshToken;
  
  if(!refreshToken){
    next(new CustomError("No refresh token found",401)) 
  }
  const decoded=jwt.verify(refreshToken,process.env.JWT_REFRESH_TOKEN);
  const user=await User.findById(decoded.id);
  if(!user){
    next(new CustomError("User not found",401))
  }
  const accessToken=createAccessToken(user._id,user.role,"1h");
  res.status(200).json({message:"Token refreshed",token:accessToken});
}

export { loginUser, registerUser, adminLogin, refreshingToken };
