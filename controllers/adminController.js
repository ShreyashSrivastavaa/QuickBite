const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { APP_KEY, JWT_EXPIRES_IN } = require("../config/AppConst");
const { validationResult } = require("express-validator");

const Food = require("../models/food");
const Restaurant = require("../models/restaurant");
const Order = require("../models/order");
const User = require("../models/user");
const Admin = require("../models/admin");

/**
 * @route POST /admin/login
 * @desc  Admin Authentication
 */
exports.adminLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = new Error("Validation Failed");
      err.statusCode = 422;
      err.data = errors.array();
      return next(err);
    }

    const { email, password } = req.body;

    const admin = await Admin.findOne({ email: email.toLowerCase() }).select("+password");
    if (!admin) {
      const err = new Error("Invalid admin credentials.");
      err.statusCode = 401;
      return next(err);
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      const err = new Error("Invalid admin credentials.");
      err.statusCode = 401;
      return next(err);
    }

    const token = jwt.sign(
      { adminId: admin._id.toString(), email: admin.email, role: "admin" },
      APP_KEY,
      { expiresIn: JWT_EXPIRES_IN || "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Admin login successful.",
      token: token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

/**
 * @route GET /admin/dashboard
 * @desc  Get Admin Dashboard Stats
 */
exports.getDashboardStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRestaurants = await Restaurant.countDocuments();
    const totalFoods = await Food.countDocuments();
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ orderStatus: { $in: ["pending", "confirmed", "preparing"] } });

    const totalRevenueResult = await Order.aggregate([
      { $match: { orderStatus: { $ne: "cancelled" } } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
    ]);

    const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].totalRevenue : 0;

    res.status(200).json({
      success: true,
      stats: {
        totalUsers: totalUsers,
        totalRestaurants: totalRestaurants,
        totalFoods: totalFoods,
        totalOrders: totalOrders,
        pendingOrders: pendingOrders,
        totalRevenue: totalRevenue,
      },
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

/**
 * @route GET /admin/orders
 * @desc  Get all orders with filtering and pagination
 */
exports.getAllOrders = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit, 10) || 20));
    const status = req.query.status;

    const filter = {};
    if (status) {
      filter.orderStatus = status;
    }

    const totalOrders = await Order.countDocuments(filter);
    const orders = await Order.find(filter)
      .populate("user", "email firstName lastName phone")
      .populate("items.food")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      totalCount: totalOrders,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      orders: orders,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

/**
 * @route PUT /admin/orders/:id/status
 * @desc  Update order status (pending → confirmed → preparing → shipped → delivered / cancelled)
 */
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { orderStatus } = req.body;

    const validStatuses = ["pending", "confirmed", "preparing", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(orderStatus)) {
      const err = new Error(`Invalid status. Allowed values: ${validStatuses.join(", ")}`);
      err.statusCode = 400;
      return next(err);
    }

    const order = await Order.findById(orderId);
    if (!order) {
      const err = new Error("Order not found.");
      err.statusCode = 404;
      return next(err);
    }

    order.orderStatus = orderStatus;
    const updatedOrder = await order.save();

    res.status(200).json({
      success: true,
      message: `Order status updated to '${orderStatus}'.`,
      order: updatedOrder,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

/**
 * @route POST /admin/add-restaurant
 * @desc  Create a new restaurant
 */
exports.addRestaurant = async (req, res, next) => {
  try {
    const { name, foodType, pincode, address, phone, images } = req.body;

    if (!name) {
      const err = new Error("Restaurant name is required.");
      err.statusCode = 400;
      return next(err);
    }

    const restaurant = new Restaurant({
      name: name,
      foodType: foodType || "",
      pincode: pincode || "",
      address: address || "",
      phone: phone || "",
      images: images || [],
      foods: [],
    });

    const savedRestaurant = await restaurant.save();

    res.status(201).json({
      success: true,
      message: "Restaurant added successfully.",
      restaurant: savedRestaurant,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

/**
 * @route GET /admin/view-restaurants
 * @desc  List all restaurants
 */
exports.viewAllRestaurant = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find().populate("foods");
    res.status(200).json({
      success: true,
      count: restaurants.length,
      restaurants: restaurants,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

/**
 * @route POST /admin/add-food/:id
 * @desc  Add new food product to restaurant
 */
exports.addFood = async (req, res, next) => {
  try {
    const restaurantId = req.params.id;
    const { name, description, category, price, readyTime, images } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      const err = new Error("Restaurant not found.");
      err.statusCode = 404;
      return next(err);
    }

    const food = new Food({
      name: name,
      description: description,
      category: category || "General",
      price: price,
      readyTime: readyTime || 30,
      images: images || [],
    });

    const savedFood = await food.save();

    restaurant.foods.push(savedFood._id);
    await restaurant.save();

    res.status(201).json({
      success: true,
      message: "Food item added successfully.",
      food: savedFood,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

/**
 * @route PUT /admin/food/:id
 * @desc  Update food details
 */
exports.updateFood = async (req, res, next) => {
  try {
    const foodId = req.params.id;
    const { name, description, category, price, readyTime, isAvailable, images } = req.body;

    const food = await Food.findById(foodId);
    if (!food) {
      const err = new Error("Food product not found.");
      err.statusCode = 404;
      return next(err);
    }

    if (name !== undefined) food.name = name;
    if (description !== undefined) food.description = description;
    if (category !== undefined) food.category = category;
    if (price !== undefined) food.price = price;
    if (readyTime !== undefined) food.readyTime = readyTime;
    if (isAvailable !== undefined) food.isAvailable = isAvailable;
    if (images !== undefined) food.images = images;

    const updatedFood = await food.save();

    res.status(200).json({
      success: true,
      message: "Food item updated successfully.",
      food: updatedFood,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

/**
 * @route DELETE /admin/food/:id
 * @desc  Delete food product
 */
exports.deleteFood = async (req, res, next) => {
  try {
    const foodId = req.params.id;
    const food = await Food.findByIdAndDelete(foodId);

    if (!food) {
      const err = new Error("Food product not found.");
      err.statusCode = 404;
      return next(err);
    }

    // Remove from restaurant.foods array
    await Restaurant.updateMany({ foods: foodId }, { $pull: { foods: foodId } });

    res.status(200).json({
      success: true,
      message: "Food item deleted successfully.",
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
