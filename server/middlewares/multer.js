import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../config/cloudinary.js"; 

// cloudinary Storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Furniche-uploads",
    allowed_formats: ["jpg", "png", "jpeg"], 
  },
});

const upload = multer({ storage });

export default upload;
