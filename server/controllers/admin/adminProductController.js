import Products from "../../models/productModel.js";
import { joiProductSchema } from "../../models/validation.js";
import CustomError from "../../utils/CustomError.js";

const totalNumberOfProducts = async (req, res) => {
  const products = await Products.find().countDocuments();
  const deletedProducts = await Products.find({
    isDeleted: true,
  }).countDocuments();
  const availableProducts = await Products.find({
    isDeleted: false,
  }).countDocuments();
  const originalProducts = await Products.find({
    original: true,
  }).countDocuments();
  const sofas = await Products.find({ category: "sofas" }).countDocuments();
  const chairs = await Products.find({ category: "chairs" }).countDocuments();
  const tables = await Products.find({ category: "tables" }).countDocuments();
  const beds = await Products.find({ category: "bed" }).countDocuments();
  const lamps = await Products.find({ category: "lamps" }).countDocuments();
  res.status(200).json({
    status: "success",
    message: "Products fetched successfully",
    data: {
      totalProducts: products,
      deletedProducts: deletedProducts,
      availableProducts: availableProducts,
      originalProducts: originalProducts,
      sofas: sofas,
      chairs: chairs,
      tables: tables,
      bed: beds,
      lamps: lamps,
    },
  });
};

const addNewProduct = async (req, res, next) => {
  const { value, error } = joiProductSchema.validate(req.body);
  if (error) {
    return next(new CustomError(error.details[0].message, 400));
  }
  const existingProduct=await Products.findOne({name:value.name,category:value.category});
  if(existingProduct){
    return next(new CustomError("Product already exist", 400));
  }
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

const editProduct = async (req, res, next) => {
  const newProduct = await Products.findById(req.params.id);
  if (!newProduct) {
    return next(new CustomError("Product not found", 400));
  }
  let image = newProduct.image;
  if (req.file) {
    image = req.file.path;
  }
  newProduct.set({ ...req.body, image });
  await newProduct.save();
  res
    .status(200)
    .json({ status: "success", message: "Product updated successfully" });
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Products.findById(req.params.id);

    if (!product) {
      return next(new CustomError("Product not found", 404));
    }

    product.isDeleted = !product.isDeleted;
    await product.save();

    res.status(200).json({
      status: "success",
      message: `Product ${
        product.isDeleted ? "deleted" : "restored"
      } successfully`,
    });
  } catch (err) {
    next(err);
  }
};

export { totalNumberOfProducts, addNewProduct, editProduct, deleteProduct };
