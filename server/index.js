import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoDb from "./config/mongodb.js";

// app config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
mongoDb();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log("Server is running on port ", PORT);
});
