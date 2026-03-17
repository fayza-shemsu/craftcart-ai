const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      maxlength: [1000, "Review comment cannot exceed 1000 characters"],
    },
    sentimentScore: {
      type: Number,
      default: 0, // For sentiment analysis
    },
    sentimentLabel: {
      type: String,
      enum: ["positive", "neutral", "negative"],
      default: "neutral",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  },
);

module.exports = mongoose.model("Review", reviewSchema);
