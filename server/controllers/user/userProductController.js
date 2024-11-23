import Products from "../../models/productModel.js";

// to get all the products
const allProducts = async (req, res) => {
  const products = await Products.find();
  if (!products) {
    return res.status(204).json({ message: "No item in products" });
  }
  res.json({ data: products });
};

// to get the product by id
const productById = async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (!product) {
    return res.status(401).json({ message: "Product not found" });
  }
  res.json({ data: product });
};

// to get the products by category
const productByCategory = async (req, res) => {
  const products = await Products.find({ category: req.params.category });
  if (!products) {
    return res
      .status(404)
      .json({ message: "No products found in this category" });
  }
  res.json({ data: products });
};

export { allProducts, productByCategory, productById };
