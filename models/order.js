const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    orderID: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    items: [
      {
        food: {
          type: Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },
        name: { type: String },
        price: { type: Number, required: true },
        qty: { type: Number, required: true, default: 1 },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    paidThrough: {
      type: String,
      enum: ["COD", "CARD", "NET_BANKING", "UPI", "WALLET", ""],
      default: "COD",
    },
    paymentResponse: {
      type: String,
      default: "",
    },
    orderStatus: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "shipped", "delivered", "cancelled"],
      default: "pending",
      index: true,
    },
    deliveryAddress: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
