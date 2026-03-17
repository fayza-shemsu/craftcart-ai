const mongoose = require("mongoose");
const slugify = require("slugify"); // You'll need to install this: npm install slugify

const productSchema = new mongoose.Schema(
  {
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    slug: {
      // SEO-friendly URL part
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    images: [
      {
        url: { type: String, required: true },
        isPrimary: { type: Boolean, default: false }, // First image the buyer sees
      },
    ],
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Jewelry", "Pottery", "Art", "Textiles", "Other"], // Controls your data quality
      trim: true,
    },
    materials: [String],
    basePrice: {
      type: Number,
      required: [true, "Base price is required"],
      min: [0, "Price must be positive"],
      // Pro-Tip: Store as cents or use a setter/getter for rounding
      set: (v) => Math.round(v * 100) / 100,
    },
    aiSuggestedPrice: {
      type: Number,
      default: null,
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    soldCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// AUTO-GENERATE SLUG: Before saving, turn "Blue Clay Pot" into "blue-clay-pot"
productSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// INDEXING: Makes searching for titles and categories 10x faster
productSchema.index({ title: "text", description: "text", category: 1 });

module.exports = mongoose.model("Product", productSchema);
