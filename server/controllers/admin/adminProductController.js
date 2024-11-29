import Products from "../../models/productModel.js";
import { joiProductSchema } from "../../models/validation.js";
// import upload from "../../middlewares/multer.js";
import CustomError from "../../utils/CustomError.js";
// import cloudinary from "../../config/cloudinary.js";

const totalNumberOfProducts = async (req, res) => {
  const products = await Products.find({ isDeleted: false });
  if (!products) {
    return res.status(200).json({ message: "No products found" });
  }
  const deletedProducts = await Products.find({ isDeleted: true });
  const availableProducts = await Products.find({ isDeleted: false });
  const originalProducts = await Products.find({ original: true });
  const sofas = await Products.find({ category: "sofas" });
  const chairs = await Products.find({ category: "chairs" });
  const tables = await Products.find({ category: "tables" });
  const beds = await Products.find({ category: "bed" });
  const lamps = await Products.find({ category: "lamps" });
  res.status(200).json({
    status: "success",
    message: "Products fetched successfully",
    data: {
      totalProducts: products.length,
      deletedProducts: deletedProducts.length,
      availableProducts: availableProducts.length,
      originalProducts: originalProducts.length,
      sofas: sofas.length,
      chairs: chairs.length,
      tables: tables.length,
      bed: beds.length,
      lamps: lamps.length,
    },
  });
};

const addNewProduct = async (req, res, next) => {
  // validating the input using joi
  const { value, error } = joiProductSchema.validate(req.body);
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }
  // uploading the image using multer and cloudinary
  if (!req.file || !req.file.path) {
    return next(new CustomError("Product image is required", 400));
  }
  const newProduct = new Products({
    ...value,
    image: req.file.path,
  });

  if (!newProduct) {
    return next(new CustomError("couldn't create the product"));
  }
  await newProduct.save();
  res
    .status(201)
    .json({ status: "success", message: "Product created successfully" });
};

// updating the product
const editProduct = async (req, res, next) => {
  const newProduct = await Products.findById(req.params.id);
  if (!newProduct) {
    return next(new CustomError("Product not found", 400));
  }
  let image = newProduct.image;
  // uploading the image using multer and cloudinary
  if (req.file) {
    image = req.file.path;
  }
  // updating the product
  newProduct.set({ ...req.body, image });
  await newProduct.save();
  res
    .status(200)
    .json({ status: "success", message: "Product updated successfully" });
};

// deleting the product
const deleteProduct = async (req, res, next) => {
  const newProduct = await Products.findByIdAndUpdate(req.params.id, {
    $set: { isDeleted: true },
  });
  if (!newProduct) {
    return next(new CustomError("Product not found", 400));
  }
  await newProduct.save();
  res
    .status(200)
    .json({ status: "success", message: "Product deleted successfully" });
};

export { totalNumberOfProducts, addNewProduct, editProduct, deleteProduct };
