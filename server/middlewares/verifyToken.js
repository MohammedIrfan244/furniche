import jwt from "jsonwebtoken";
import CustomError from "../utils/CustomError.js";

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
      next(new CustomError("You are not authenticated", 403));
    }
  } catch (err) {
    next(err);
  }
};

export const verifyTokenAdmin = (req, res, next) => {
  try{
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_ADMIN_TOKEN, (err, user) => {
        if (err) {
          throw new CustomError("Token is not valid", 403);
        }
        if (user.role !== "Admin") {
          throw new CustomError("You are not authorized", 403);
        }
        req.user = user;
        next();
      });
    } else {
      next(new CustomError("You are not authenticated", 403));
    }
  }catch(err){
    next(err);
  }
  }
