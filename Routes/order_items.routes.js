// routes/order_items.routes.js
import express from "express";
import {
  addOrderItem,
  getOrderItems,
  deleteOrderItem,
} from "../Controllers/order_items.controller.js";
import { authenticate } from "../Middlewares/auth.middleware.js";

const router = express.Router();

// POST - Add an order item
router.post("/", authenticate, addOrderItem);

// GET - Get all items for an order
router.get("/order/:orderId", getOrderItems);

// DELETE - Delete an order item
router.delete("/:itemId", authenticate, deleteOrderItem);

export default router;
