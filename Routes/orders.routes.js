import express from "express";
import {
  addOrder,
  getAllOrders,
  getUserOrders,
  deleteOrder,
} from "../Controllers/orders.controller.js";
import { authenticate } from "../Middlewares/auth.middleware.js";
import { getAllProductCategory } from "../Controllers/product_category.controller.js";

const router = express.Router();

// POST - Add an order (open)
router.post("/", authenticate,addOrder); // ← بدون authenticate

// GET - Get all orders (optional)
router.get("/",authenticate, getAllOrders);

// GET - Get current user's orders (هتحتاج توكن لو شغال)
router.get("/user", authenticate,getUserOrders); // ← كمان مؤقتًا بدون authenticate

// DELETE - Delete a specific order (هتحتاج توكن)
router.delete("/:orderId",authenticate, deleteOrder); // ← مؤقتًا بدون authenticate

export default router;
