// routes/review.routes.js
import express from "express";
import {
  addReview,
  getProductReviews,
  deleteReview,
  getAllReviews,
} from "../controllers/review.controller.js";
import { authenticate } from "../Middlewares/auth.middleware.js";

const router = express.Router();

// POST - Add a review

// router.get("/", getAllReviews);


router.post("/", authenticate, addReview);

// GET - Get all reviews for a product
router.get("/product/:productId", getProductReviews);

// DELETE - Delete a review
router.delete("/:reviewId", authenticate, deleteReview);

export default router;
