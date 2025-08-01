import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs"; // ✅ أضف هذا

import userRoutes from "./Routes/user.routes.js";
import categoryRoutes from "./Routes/category.routes.js";
import productRoutes from "./Routes/product.routes.js";
import reviewRoutes from "./Routes/review.routes.js";
import product_category from "./Routes/product_category.routes.js";
import order_items from './Routes/order_items.routes.js'
import orders from './Routes/orders.routes.js'
import swaggerUIExpress from 'swagger-ui-express';

dotenv.config();

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/E-Commerce")
  .then(() => {
    console.log("✅ Connected to MongoDB successfully");
  })
  .catch((error) => {
    console.error(`❌ MongoDB connection error: ${error}`);
    process.exit(1);
  });

app.use(express.json());

// ✅ استخدم fs لقراءة ملف swagger.json
const swaggerJSDoc = JSON.parse(fs.readFileSync('./swagger.json', 'utf8'));

app.use('/api-docs', swaggerUIExpress.serve, swaggerUIExpress.setup(swaggerJSDoc));

app.use("/api/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/reviews", reviewRoutes);
app.use("/product_category", product_category);
app.use("/order_items", order_items);
app.use("/orders", orders);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
