import Products from "../../models/productModel.js";
import { joiProductSchema } from "../../models/validation.js";
import CustomError from "../../utils/CustomError.js";

const totalNumberOfProducts = async (req, res) => {
  const products = await Products.find({ isDeleted: false });
  if (!products) {
    return res.status(200).json({ message: "No products found" });
  }
  res.status(200).json({ data: products.length });
};

const addNewProduct=async (req,res,next)=>{
    const {value,error}=joiProductSchema.validate((req.body))
    if(error){
        return next(new CustomError(error.details[0].message, 400));
    }
    const newProduct= new Products({
        ...value
    })

    if(!newProduct){
        return next(new CustomError("couldn't create the product"))
    }
    newProduct.save()
    res.status(201).json({message:"Product created successfully"})
}

const editProduct=async (req,res,next)=>{
    const newProduct = await Products.findByIdAndUpdate(req.params.id,{...req.body},{new:true})
    if(!newProduct){
        return next(new CustomError("Couldn't update product",400))
    }
    res.status(201).json({message:"Product updated successfully"})
}

const deleteProduct = async (req, res,next) => {
    const newProduct = await Products.findByIdAndUpdate(req.params.id,{$set:{isDeleted:true}})
    if(!newProduct){
        return next(new CustomError("Product not found",400))
    }
    await newProduct.save();
    res.status(200).json({message:"Product deleted successfully"})
};

export {totalNumberOfProducts,addNewProduct,editProduct,deleteProduct}