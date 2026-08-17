const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { APP_KEY, JWT_EXPIRES_IN } = require("../config/AppConst");
const { validationResult } = require("express-validator");

const User = require("../models/user");
const Food = require("../models/food");
const Order = require("../models/order");

/**
 * @route POST /user/signup
 * @desc  Register new user
 */
exports.onSignup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error("Validation Failed");
      err.statusCode = 422;
      err.data = errors.array();
      return next(err);
    }

    const { email, password, firstName, lastName, phone, address } = req.body;

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      const err = new Error("User already exists with this email address.");
      err.statusCode = 409;
      return next(err);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName: firstName || "",
      lastName: lastName || "",
      phone: phone || "",
      address: address || "",
      cart: [],
      order: [],
    });

    const savedUser = await user.save();

    const token = jwt.sign(
      { userId: savedUser._id.toString(), email: savedUser.email, role: "user" },
      APP_KEY,
      { expiresIn: JWT_EXPIRES_IN || "7d" }
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      token: token,
      user: {
        id: savedUser._id,
        email: savedUser.email,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        phone: savedUser.phone,
        address: savedUser.address,
      },
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

/**
 * @route POST /user/login
 * @desc  Authenticate user & return JWT
 */
exports.onLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error("Validation Failed");
      err.statusCode = 422;
      err.data = errors.array();
      return next(err);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) {
      const err = new Error("Invalid credentials: User does not exist.");
      err.statusCode = 401;
      return next(err);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const err = new Error("Invalid credentials: Password does not match.");
      err.statusCode = 401;
      return next(err);
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email, role: "user" },
      APP_KEY,
      { expiresIn: JWT_EXPIRES_IN || "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token: token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

/**
 * @route POST /user/logout
 * @desc  Logout user (client invalidates token)
 */
exports.onLogout = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully. Please remove token from client storage.",
  });
};

/**
 * @route GET /user/profile
 * @desc  Get user profile
 */
exports.viewProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const err = new Error("User profile not found.");
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

/**
 * @route PUT /user/profile
 * @desc  Update user profile
 */
exports.updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, address, phone, lat, lng } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      const err = new Error("User not found.");
      err.statusCode = 404;
      return next(err);
    }

    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (address !== undefined) user.address = address;
    if (phone !== undefined) user.phone = phone;
    if (lat !== undefined) user.lat = lat;
    if (lng !== undefined) user.lng = lng;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

/**
 * @route GET /user/cart
 * @desc  Get user cart
 */
exports.getCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate("cart.food");
    if (!user) {
      const err = new Error("User not found.");
      err.statusCode = 404;
      return next(err);
    }
    res.status(200).json({
      success: true,
      cart: user.cart,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

/**
 * @route POST /user/cart/:id
 * @desc  Add food to cart
 */
exports.addToCart = async (req, res, next) => {
  try {
    const foodId = req.params.id;
    const food = await Food.findById(foodId);
    if (!food) {
      const err = new Error("Food item not found.");
      err.statusCode = 404;
      return next(err);
    }

    const user = await User.findById(req.userId);
    if (!user) {
      const err = new Error("User not found.");
      err.statusCode = 404;
      return next(err);
    }

    await user.addToCart(food);
    const updatedUser = await User.findById(req.userId).populate("cart.food");

    res.status(200).json({
      success: true,
      message: "Item added to cart.",
      cart: updatedUser.cart,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

/**
 * @route PUT /user/cart/:id/:qty
 * @desc  Update quantity of item in cart
 */
exports.editCart = async (req, res, next) => {
  try {
    const foodId = req.params.id;
    const qty = req.params.qty;
    const food = await Food.findById(foodId);
    if (!food) {
      const err = new Error("Food item not found.");
      err.statusCode = 404;
      return next(err);
    }

    const user = await User.findById(req.userId);
    if (!user) {
      const err = new Error("User not found.");
      err.statusCode = 404;
      return next(err);
    }

    await user.editCart(food, qty);
    const updatedUser = await User.findById(req.userId).populate("cart.food");

    res.status(200).json({
      success: true,
      message: "Cart updated.",
      cart: updatedUser.cart,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

/**
 * @route DELETE /user/cart/:id
 * @desc  Remove item from cart
 */
exports.removeFromCart = async (req, res, next) => {
  try {
    const foodId = req.params.id;
    const user = await User.findById(req.userId);
    if (!user) {
      const err = new Error("User not found.");
      err.statusCode = 404;
      return next(err);
    }

    user.cart = user.cart.filter((item) => item.food.toString() !== foodId);
    await user.save();
    const updatedUser = await User.findById(req.userId).populate("cart.food");

    res.status(200).json({
      success: true,
      message: "Item removed from cart.",
      cart: updatedUser.cart,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

/**
 * @route DELETE /user/cart
 * @desc  Clear entire cart
 */
exports.clearCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const err = new Error("User not found.");
      err.statusCode = 404;
      return next(err);
    }

    user.cart = [];
    await user.save();

    res.status(200).json({
      success: true,
      message: "Cart cleared.",
      cart: [],
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

/**
 * @route GET /user/order
 * @desc  Get user order history
 */
exports.getOrder = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.userId }).populate("items.food").sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

/**
 * @route GET /user/order/:id
 * @desc  Get details of a specific order
 */
exports.getSelectedOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findOne({ _id: orderId, user: req.userId }).populate("items.food");

    if (!order) {
      const err = new Error("Order not found or unauthorized.");
      err.statusCode = 404;
      return next(err);
    }

    res.status(200).json({
      success: true,
      order: order,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

/**
 * @route POST /user/add-order
 * @desc  Create order from current cart
 */
exports.addOrder = async (req, res, next) => {
  try {
    const { paidThrough, deliveryAddress, phone } = req.body;
    const user = await User.findById(req.userId).populate("cart.food");

    if (!user) {
      const err = new Error("User not found.");
      err.statusCode = 404;
      return next(err);
    }

    if (!user.cart || user.cart.length === 0) {
      const err = new Error("Cart is empty. Cannot create an order.");
      err.statusCode = 400;
      return next(err);
    }

    let totalAmount = 0;
    const orderItems = user.cart.map((item) => {
      const price = item.food.price || 0;
      const qty = item.qty || 1;
      totalAmount += price * qty;
      return {
        food: item.food._id,
        name: item.food.name,
        price: price,
        qty: qty,
      };
    });

    const uniqueOrderId = `QB-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const order = new Order({
      orderID: uniqueOrderId,
      user: user._id,
      items: orderItems,
      totalAmount: totalAmount,
      paidThrough: paidThrough || "COD",
      orderStatus: "pending",
      deliveryAddress: deliveryAddress || user.address || "",
      phone: phone || user.phone || "",
    });

    const savedOrder = await order.save();

    user.order.push(savedOrder._id);
    user.cart = [];
    await user.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order: savedOrder,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
