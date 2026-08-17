const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
    cart: [
      {
        food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
        qty: { type: Number, required: true, default: 1 },
      },
    ],
    order: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.addToCart = function (foodItem) {
  const foodIndex = this.cart.findIndex((cf) => {
    return cf.food._id ? cf.food._id.toString() === foodItem._id.toString() : cf.food.toString() === foodItem._id.toString();
  });

  let updatedItems = [...this.cart];
  let newQty = 1;
  if (foodIndex >= 0) {
    newQty = this.cart[foodIndex].qty + 1;
    updatedItems[foodIndex].qty = newQty;
  } else {
    updatedItems.push({
      food: foodItem._id || foodItem,
      qty: newQty,
    });
  }
  this.cart = updatedItems;
  return this.save();
};

userSchema.methods.editCart = function (foodItem, newQty) {
  const parsedQty = parseInt(newQty, 10);
  const foodIndex = this.cart.findIndex((cf) => {
    return cf.food._id ? cf.food._id.toString() === foodItem._id.toString() : cf.food.toString() === foodItem._id.toString();
  });

  if (isNaN(parsedQty) || parsedQty < 1) {
    const updatedItems = this.cart.filter((cf) => {
      const id = cf.food._id ? cf.food._id.toString() : cf.food.toString();
      return id !== foodItem._id.toString();
    });
    this.cart = updatedItems;
    return this.save();
  } else {
    if (foodIndex >= 0) {
      let updatedItems = [...this.cart];
      updatedItems[foodIndex].qty = parsedQty;
      this.cart = updatedItems;
      return this.save();
    } else {
      return Promise.reject(new Error("Item not found in cart"));
    }
  }
};

module.exports = mongoose.model("User", userSchema);
