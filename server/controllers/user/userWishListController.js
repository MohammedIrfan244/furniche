import WishList from "../../models/wishListModel.js";
import CustomError from "../../utils/CustomError.js";

// Controller to get the verified user's wishList
const getUserWishList = async (req, res) => {
  // getting the wishlist and populate with product
  const data = await WishList.findOne({ userId: req.user.id }).populate(    "products");
  if (data) {
    // if data exists , send the data as wishlist
    res.status(200).json(data);
  } else {
    // if doesn't exists, send an empty array
    res.status(200).json({ products: [] });
  }
};

// Controller for updating the wishList
const addToWishList = async (req, res, next) => {
  const { productId } = req.body;
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
    return res.status(201).json(newWishList);
  }
  res.status(200).json(newWishList);
};

// delete wish list
const removeFromWishList = async (req, res, next) => {
  const { productId } = req.body;
  const newWishList = await WishList.findOneAndUpdate(
    { userId: req.user.id },
    { $pull: { products: productId } },
    { new: true }
  );
  if (newWishList) {
    res.status(201).json(newWishList);
  } else {
    next(new CustomError("product not found in wishlist", 404));
  }
};

export { getUserWishList, addToWishList, removeFromWishList };
