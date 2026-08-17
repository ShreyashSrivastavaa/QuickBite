const Food = require("../models/food");
const Restaurant = require("../models/restaurant");

/**
 * @route GET /food
 * @desc  Get available foods with pagination & optional category filter
 */
exports.getAvailableFoods = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit, 10) || 20));
    const category = req.query.category;

    const filter = { isAvailable: true };
    if (category) {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    const totalFoods = await Food.countDocuments(filter);
    const foods = await Food.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalCount: totalFoods,
      currentPage: page,
      totalPages: Math.ceil(totalFoods / limit),
      count: foods.length,
      foods: foods,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

/**
 * @route GET /food/categories
 * @desc  Get all unique food categories
 */
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Food.distinct("category", { isAvailable: true });
    res.status(200).json({
      success: true,
      count: categories.length,
      categories: categories.sort(),
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

/**
 * @route GET /food/search
 * @desc  Search food items by keyword
 */
exports.searchFoods = async (req, res, next) => {
  try {
    const query = req.query.q || req.query.query || "";
    if (!query.trim()) {
      return res.status(200).json({
        success: true,
        count: 0,
        foods: [],
      });
    }

    const searchRegex = new RegExp(query.trim(), "i");
    const foods = await Food.find({
      isAvailable: true,
      $or: [{ name: searchRegex }, { description: searchRegex }, { category: searchRegex }],
    }).limit(50);

    res.status(200).json({
      success: true,
      query: query,
      count: foods.length,
      foods: foods,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

/**
 * @route GET /food/in-30-min
 * @desc  Get foods ready in 30 minutes or less
 */
exports.getInThirtyMinutes = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit, 10) || 20));

    const filter = { readyTime: { $lte: 30 }, isAvailable: true };

    const totalFoods = await Food.countDocuments(filter);
    const foods = await Food.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      totalCount: totalFoods,
      currentPage: page,
      totalPages: Math.ceil(totalFoods / limit),
      foods: foods,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

/**
 * @route GET /food/top/restaurants
 * @desc  Get top restaurants with populated foods
 */
exports.getTopRestaurants = async (req, res, next) => {
  try {
    const restaurants = await Restaurant.find({ isOpen: true }).populate("foods").limit(20);
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
 * @route GET /food/restaurant/:id
 * @desc  Get all foods from a specific restaurant
 */
exports.getAllFoodsFromRestaurant = async (req, res, next) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId).populate("foods");

    if (!restaurant) {
      const err = new Error("Restaurant not found.");
      err.statusCode = 404;
      return next(err);
    }

    res.status(200).json({
      success: true,
      restaurant: restaurant,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

/**
 * @route GET /food/:id
 * @desc  Get single food item details
 */
exports.getFoodDetails = async (req, res, next) => {
  try {
    const foodId = req.params.id;
    const food = await Food.findById(foodId);

    if (!food) {
      const err = new Error("Food product not found.");
      err.statusCode = 404;
      return next(err);
    }

    res.status(200).json({
      success: true,
      food: food,
    });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
