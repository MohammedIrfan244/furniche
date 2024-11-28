import Products from "../../models/productModel.js";
import { joiProductSchema } from "../../models/validation.js";
import upload from "../../middlewares/multer.js";
import CustomError from "../../utils/CustomError.js";
import cloudinary from "../../config/cloudinary.js";

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

    if(!req.file||!req.file.path){
        return next(new CustomError("Product image is required",400))
    }
    const newProduct= new Products({
        ...value,
        image:req.file.path
    })

    if(!newProduct){
        return next(new CustomError("couldn't create the product"))
    }
    await newProduct.save()
    res.status(201).json({message:"Product created successfully"})
}

const editProduct=async (req,res,next)=>{
const newProduct=await Products.findById(req.params.id)
if(!newProduct){
    return next(new CustomError("Product not found",400))
}
let image=newProduct.image
if(req.file){
   image=req.file.path
}
newProduct.set({...req.body,image})
await newProduct.save()
res.status(200).json({message:"Product updated successfully"})
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