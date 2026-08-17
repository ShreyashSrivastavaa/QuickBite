const express = require("express");
const router = express.Router();
const adminAuth = require("../middlewares/adminAuth");
const adminController = require("../controllers/adminController");
const { body } = require("express-validator");

// Public Admin Route
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid admin email.").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required."),
  ],
  adminController.adminLogin
);

// Protected Admin Routes (Require Bearer Token with Admin role)
router.use(adminAuth);

router.get("/dashboard", adminController.getDashboardStats);
router.get("/orders", adminController.getAllOrders);
router.put("/orders/:id/status", adminController.updateOrderStatus);

router.post("/add-restaurant", adminController.addRestaurant);
router.get("/view-restaurants", adminController.viewAllRestaurant);

router.post("/add-food/:id", adminController.addFood);
router.put("/food/:id", adminController.updateFood);
router.delete("/food/:id", adminController.deleteFood);

module.exports = router;
