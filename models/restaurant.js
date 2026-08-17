const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    foodType: {
      type: String,
    },
    pincode: {
      type: String,
      index: true,
    },
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    rating: {
      rate: { type: Number, default: 4.5 },
      count: { type: Number, default: 0 },
    },
    images: {
      type: [String],
      default: [],
    },
    foods: [
      {
        type: Schema.Types.ObjectId,
        ref: "Food",
      },
    ],
    isOpen: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
