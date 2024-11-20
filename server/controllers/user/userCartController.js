import Cart from "../../models/cartModel.js";
import CustomError from "../../utils/CustomError.js";

// controller to show cart for a specific user
const getUserCart = async (req, res) => {
  const data = await Cart.findOne({ userId: req.user.id }).populate({
    path: "products.productId",
    select: "name price image",
  });
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(200).json({ products: [] });
  }
};

//controller to add to cart
const updateCart = async (req, res, next) => {
  const { productId, quantity } = req.body;

  if (quantity < 1) {
    next(new CustomError("Quantity is not valid " + quantity, 400));
  }
  let newCart = await Cart.findOne({ userId: req.user.id });
  if (!newCart) {
    newCart = new Cart({
      userId: req.user.id,
      products: [{ productId, quantity }],
    });
  } else {
    const itemIndex = newCart.products.findIndex(
      (p) => p.productId.toString() == productId
    );
    if (itemIndex > -1) {
      newCart.products[itemIndex].quantity = quantity;
    } else {
      newCart.products.push({ productId, quantity });
    }
  }
  const cart=await newCart.save()

  await cart.populate({
    path:'products.productId',
    select:'name price image'
  })
  res.status(200).json(cart)
};

// Controller for removing item from cart
const removeFromCart=async(req,res,next)=>{
    const cart=await Cart.findOneAndUpdate(
        {userId:req.user.id,'products.productId':req.body.productId},
        {
            $pull:{products:{productId:req.body.productId}}
        },
        {new:true}
    )
    if(cart){
        await cart.populate({
            path:'products.productId',
            select:'name price image'
        })
        res.status(200).json(cart)
    }else{
        next(new CustomError("Product not found in the cart",404))
    }
}

export {getUserCart,updateCart,removeFromCart}