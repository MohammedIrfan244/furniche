import Review from "../models/reviewModel.js";
import Products from "../models/productModel.js";

const calculateStats = (reviews) => {
  const total = reviews.length;
  if (total === 0) {
    return {
      score: null,
      totalEvaluations: 0,
      fiveStarPct: 0,
      fourStarPct: 0,
      distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    };
  }

  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let sum = 0;
  reviews.forEach((r) => {
    const star = Math.min(5, Math.max(1, Math.round(r.rating || 5)));
    distribution[star] = (distribution[star] || 0) + 1;
    sum += Number(r.rating || 5);
  });

  const avg = (sum / total).toFixed(1);
  const fiveStarPct = Math.round((distribution[5] / total) * 100);
  const fourStarPct = Math.round((distribution[4] / total) * 100);

  return {
    score: avg,
    totalEvaluations: total,
    fiveStarPct,
    fourStarPct,
    distribution,
  };
};

export const getReviewsByProduct = async (req, res) => {
  const { id } = req.params;

  const reviews = await Review.find({ productId: id }).sort({ createdAt: -1 });
  const stats = calculateStats(reviews);

  res.json({
    status: "success",
    message: "Product reviews fetched successfully from database",
    data: {
      stats,
      reviews,
    },
  });
};

export const createProductReview = async (req, res) => {
  const { id } = req.params;
  const { author, location, propertyType, rating, title, comment } = req.body;

  if (!rating || !title || !comment) {
    return res.status(400).json({
      status: "error",
      message: "Rating, review title, and comments are required",
    });
  }

  const numRating = Math.min(5, Math.max(1, Number(rating) || 5));

  const newReview = new Review({
    productId: id,
    userId: req.user?._id || null,
    author: author?.trim() || req.user?.name || "Client Patron",
    location: location?.trim() || "Verified Patron",
    propertyType: propertyType?.trim() || "Residence",
    rating: numRating,
    title: title.trim(),
    comment: comment.trim(),
    verified: true,
    date: new Date().toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),
  });

  await newReview.save();

  // Recalculate and update the product's overall rating in database
  const allProductReviews = await Review.find({ productId: id });
  const stats = calculateStats(allProductReviews);

  await Products.findByIdAndUpdate(id, {
    rating: Math.round(Number(stats.score || numRating)),
  });

  res.status(201).json({
    status: "success",
    message: "Your review has been recorded in the Atelier database",
    data: {
      review: newReview,
      stats,
      reviews: allProductReviews,
    },
  });
};
