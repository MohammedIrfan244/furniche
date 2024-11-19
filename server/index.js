import express from "express";
import dotenv from "dotenv";
import connectCloudinary from "./config/cloudinary.js";
import connectDb from './config/mongodb.js'
import authRoute from './routes/authRoutes.js'

// app config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
connectDb()
connectCloudinary()

// middlewares
app.use(express.json());

// api endpoints
app.use('/user',authRoute)


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
