import Review from "../Models/review.model.js";

export const addReview = async (req, res) => {
  try {
    const { product, rating, comment } = req.body;

    console.log("User from req.user.userId:", req.user.userId); // ✅ check
    const user = req.user.userId;

    const existingReview = await Review.findOne({ user, product });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You already reviewed this product." });
    }

    const review = new Review({ user, product, rating, comment });
    await review.save();

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId }).populate(
      "user",
      "name"
    );
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (review.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this review" });
    }

    await review.deleteOne();
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
