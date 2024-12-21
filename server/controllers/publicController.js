import Products from "../models/productModel.js";

// to get all the products
const allProducts = async (req, res) => {
  const products = await Products.find(
    {isDeleted:false},
    { name: 1, price: 1, image: 1, rating: 1, original: 1, category: 1,description:1 ,review:1 }
  );
  if (!products) {
    return res
      .status(204)
      .json({ status: "success", message: "No item in products" });
  }
  res.json({
    status: "success",
    message: "Products fetched successfully",
    data: products,
  });
};

const publicCookieSet=async(req,res)=>{
  res.cookie("pub", "Public", { httpOnly: false, secure: true, sameSite: "none" });
  res.status(200).json({ status: "success", message: "Public cookie set successfully" });
}

const getOriginalProducts = async (req, res) => {
  const products = await Products.find(
    { original: true, isDeleted: false },
    { name: 1, price: 1, image: 1, rating: 1, original: 1, category: 1 ,description:1 ,review:1}
  );
  if (!products) {
    return res
      .status(204)
      .json({ status: "success", message: "No item in products" });
  }
  res.json({
    status: "success",
    message: "Products fetched successfully",
    data: products,
  });
};

const lastAddedTenProducts = async (req, res) => {
  const products = await Products.find(
    {isDeleted:false},
    { name: 1, price: 1, image: 1, rating: 1, original: 1, category: 1,description:1 ,review:1 }
  )
    .sort({ createdAt: -1 })
    .limit(8);
  if (!products) {
    return res
      .status(204)
      .json({ status: "success", message: "No item in products" });
  }
  res.json({
    status: "success",
    message: "Products fetched successfully",
    data: products,
  });
};

// to get the product by id
const productById = async (req, res) => {
  const product = await Products.findOne(
    { _id: req.params.id },
    { name: 1, price: 1, image: 1, rating: 1, original: 1, category: 1,description:1 ,review:1 }
  );
  if (!product) {
    return res.status(401).json({ message: "Product not found" });
  }
  res.json({
    status: "success",
    message: "Product fetched successfully",
    data: product,
  });
};

// to get the products by category
const productByCategory = async (req, res) => {
  if(!req.params.category){
    return res.status(400).json({ message: "Category is required" , data: []});
  }
  const products = await Products.find(
    { category: req.params.category, isDeleted: false },
    { name: 1, price: 1, image: 1, rating: 1, original: 1, category: 1 ,description:1 ,review:1}
  );
  if (!products) {
    return res
      .status(404)
      .json({ message: "No products found in this category" });
  }
  res.json({
    status: "success",
    message: "Products fetched successfully",
    data: products,
  });
};

export { allProducts, productByCategory, productById , getOriginalProducts, publicCookieSet,lastAddedTenProducts};
