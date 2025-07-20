import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./Routes/user.routes.js";
import categoryRoutes from "./Routes/category.routes.js";
import productRoutes from "./Routes/product.routes.js";
import reviewRoutes from "./Routes/review.routes.js";
dotenv.config();

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/E-Commerce")
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error(` MongoDB connection error: ${error}`);
    process.exit(1);
  });

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/reviews", reviewRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
