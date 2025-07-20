import express from "express";
const router = express.Router();

import {
  createCategory,
  getAllCategories,
  getCategoryById, // ✅ تأكدي إنه موجود
  updateCategory,
  deleteCategory,
} from "../Controllers/category.controller.js";

// Routes
router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById); // ✅ Route by ID
router.patch("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
