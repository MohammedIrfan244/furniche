import Products from "../../models/productModel.js";
import CustomError from "../../utils/CustomError.js";

const totalNumberOfProducts = async (req, res) => {
  const products = await Products.find({ isDeleted: false });
  if (!products) {
    return res.status(200).json({ message: "No products found" });
  }
  res.status(200).json({ data: products.length });
};

const addNewProduct=async (req,res,next)=>{
    // const {}
}
