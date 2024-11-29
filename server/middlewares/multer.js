import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "../config/cloudinary.js"; // Import your Cloudinary config

// Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Furniche-uploads", // Folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"], // Accepted formats
  },
});

// Multer middleware
const upload = multer({ storage });

export default upload;
