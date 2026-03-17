const mongoose = require("mongoose");
const validator = require("validator"); // Use this to validate emails

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false, // This hides the password by default when you fetch a user!
    },
    role: {
      type: String,
      enum: {
        values: ["buyer", "seller", "admin"],
        message: "{VALUE} is not a valid role",
      },
      default: "buyer",
    },
    // Professional address structure for shipping calculation
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
    profileImage: {
      type: String,
      default: "default-user.jpg",
    },
    // Essential for marketplaces
    isVerified: {
      type: Boolean,
      default: false,
    },
    // Specifically for the 'seller' role
    shopName: {
      type: String,
      unique: true,
      sparse: true, // Allows this to be null for buyers but unique for sellers
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt
  },
);

module.exports = mongoose.model("User", userSchema);
