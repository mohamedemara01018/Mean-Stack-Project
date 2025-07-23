// routes/orders.routes.js
import express from "express";
import {
  addOrder,
  getAllOrders,
  getUserOrders,
  deleteOrder,
} from "../Controllers/orders.controller.js";
import { authenticate } from "../Middlewares/auth.middleware.js";

const router = express.Router();

// POST - Add an order
router.post("/", authenticate, addOrder);

// GET - Get all orders
router.get("/", getAllOrders);

// GET - Get orders for a user
router.get("/user", authenticate, getUserOrders);

// DELETE - Delete an order
router.delete("/:orderId", authenticate, deleteOrder);

export default router;
