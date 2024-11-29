import { v2 as cloudinary } from "cloudinary";

export const connectCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, // Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY, // Cloudinary API key
    api_secret: process.env.CLOUDINARY_SECRET_KEY, // Cloudinary API secret
  });
};

export default cloudinary; // Export the configured Cloudinary instance
