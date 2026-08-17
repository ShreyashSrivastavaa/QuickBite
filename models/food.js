const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    readyTime: {
      type: Number,
      default: 30,
    },
    rating: {
      rate: { type: Number, default: 4.5 },
      count: { type: Number, default: 0 },
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    images: {
      type: [String],
      default: [],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Create compound text index for search
productSchema.index({ name: "text", description: "text", category: "text" });

module.exports = mongoose.model("Food", productSchema);
