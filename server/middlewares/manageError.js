import CustomError from "../utils/CustomError.js";

const manageError = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: "Something went wrong" });
};

export default manageError;
