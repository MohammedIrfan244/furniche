import express from "express";
import dotenv from "dotenv";
import { connectCloudinary } from "./config/cloudinary.js";
import connectDb from "./config/mongodb.js";
import publicRoute from "./routes/publicRoutes.js";
import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";
import adminRout from "./routes/adminRoutes.js";
import manageError from "./middlewares/manageError.js";
import cors from 'cors'
import cookieParser from "cookie-parser";
// Config of app
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to the database and Cloudinary
connectDb();
connectCloudinary();

// Middlewares
app.use(cors({
  origin:process.env.CLIENT_URL,
  credentials:true,
  allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/public", publicRoute);
app.use("/api/users", authRoute);
app.use("/api/users", userRoute);
app.use("/api/admin", adminRout);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

// Undefined endpoint handling
app.all("*", (req, res) => {
  res.status(404).json({ message: `Cannot access this end point` });
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

// manage error middleware
app.use(manageError);
