import WishList from "../../models/wishListModel.js";
import CustomError from "../../utils/CustomError.js";
import Product from "../../models/productModel.js";

// Controller to get the verified user's wishList
const getUserWishList = async (req, res) => {
  const data = await WishList.findOne(
    { userId: req.user.id },
    { _id: 0, userId: 0, createdAt: 0, updatedAt: 0 }
  )
    .sort({ createdAt: -1 })
    .populate("products", "name price image");
  if (data) {
    res.status(200).json(data);
  } else {
    res
      .status(200)
      .json({ status: "success", message: "Wishlist is empty", products: [] });
  }
};

// Controller for updating the wishList
const addToWishList = async (req, res, next) => {
  const { productId } = req.body;
  const product = await Product.findOne(
    { _id: productId },
    { name: 1, price: 1, image: 1 }
  );
  if (!productId) {
    return next(new CustomError("Product id is required", 400));
  }
  // find the wishlist and update,
  let newWishList = await WishList.findOneAndUpdate(
    { userId: req.user.id },
    { $addToSet: { products: productId } },
    { new: true }
  );
  //   if no wishlist found , create one
  if (!newWishList) {
    newWishList = new WishList({
      userId: req.user.id,
      products: [productId],
    });
    await newWishList.save();
  }

  res.status(200).json({
    status: "success",
    message: "Product added to wishlist successfully",
    data: product,
  });
};

// delete wish list
const removeFromWishList = async (req, res, next) => {
  const { id } = req.params;
  const item = await Product.findOne(
    { _id: id },
    {
      name: 0,
      price: 0,
      image: 0,
      description: 0,
      rating: 0,
      original: 0,
      category: 0,
      review: 0,
      isDeleted: 0,
    }
  );
  const newWishList = await WishList.findOneAndUpdate(
    { userId: req.user.id },
    { $pull: { products: id } },
    { new: true }
  );
  if (newWishList) {
    res.status(201).json({
      status: "success",
      message: "Product removed from wishlist successfully",
      data: item,
    });
  } else {
    next(new CustomError("product not found in wishlist", 404));
  }
};

export { getUserWishList, addToWishList, removeFromWishList };
