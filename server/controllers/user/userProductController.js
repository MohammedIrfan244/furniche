import Products from "../../models/productModel.js"

// to get all the products
const allProducts = async (req, res) => {
  try {
    const products = await Products.find();
    if (!products) {
      return res.status(204).json({ message: "No item in products" });
    }
    res.json({ data: products });
  } catch (err) {
    res.json({ error: err.message });
  }
};

// to get the product by id
const productById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(401);
    }
    res.json(product);
  } catch (err) {
    res.json({ error: err.message });
  }
};

// to get the products by category
const productByCategory = async (req, res) => {
  try {
    const products = await Products.find({ category: req.params.category });
    if (!products) {
      return res.status(404);
    }
    res.json({ data: products });
  } catch (err) {
    res.json({ error: err.message });
  }
};


export {allProducts,productByCategory,productById}