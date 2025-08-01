// routes/order_items.routes.js
import express from "express";
import {
  addOrderItem,
  getOrderItems,
  deleteOrderItem,
  getOrderItemsById,
} from "../Controllers/order_items.controller.js";
import { authenticate } from "../Middlewares/auth.middleware.js";

const router = express.Router();

// GET - Get all items for an order
router.get("/", getOrderItems)

// GET - Get all items for an order
router.get("/:orderId", getOrderItemsById);


// POST - Add an order item
router.post("/", authenticate, addOrderItem);


// DELETE - Delete an order item
router.delete("/:itemId", authenticate, deleteOrderItem);

export default router;
