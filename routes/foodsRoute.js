const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController");

/**
 * PUBLIC PRODUCT & RESTAURANT ROUTES
 */
router.get("/search", foodController.searchFoods);
router.get("/categories", foodController.getCategories);
router.get("/in-30-min", foodController.getInThirtyMinutes);
router.get("/top/restaurants", foodController.getTopRestaurants);
router.get("/restaurant/:id", foodController.getAllFoodsFromRestaurant);
router.get("/", foodController.getAvailableFoods);
router.get("/:id", foodController.getFoodDetails);

module.exports = router;
