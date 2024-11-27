import jwt from "jsonwebtoken";
import CustomError from "../utils/CustomError.js";
import User from "../models/userModel.js"

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
        if (err) {
          throw new CustomError("Token is not valid", 403);
        }
        req.user = user;
        next();
      });
    } else {
      next( new CustomError("You are not authenticated", 403))
    }
  } catch (err) {
    next(err);
  }
};

export const verifyTokenAdmin = (req, res, next) => {
  verifyToken(req,res,async () => {
    const admin= await User.findOne({_id:req.user.id})
    if (admin.role==="Admin") {
      next();
    } else {
      next(new CustomError("You are not authorized", 403))
    }
  })
};
