const express = require("express");
const router = express.Router({ mergeParams: true });
const userController = require("../controllers/userController");
const { body } = require("express-validator");
const auth = require("../middlewares/userAuth");

// User Signup
router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Please enter a valid email address.").normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
    body("firstName").optional().trim(),
    body("lastName").optional().trim(),
  ],
  userController.onSignup
);

// User Login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email address.").normalizeEmail(),
    body("password").trim().notEmpty().withMessage("Password is required."),
  ],
  userController.onLogin
);

// User Logout
router.post("/logout", auth, userController.onLogout);

// User Profile
router.get("/profile", auth, userController.viewProfile);
router.put("/profile", auth, userController.updateProfile);

// User Cart
router.get("/cart", auth, userController.getCart);
router.post("/cart/:id", auth, userController.addToCart);
router.put("/cart/:id/:qty", auth, userController.editCart);
router.delete("/cart/:id", auth, userController.removeFromCart);
router.delete("/cart", auth, userController.clearCart);

// User Orders
router.get("/order", auth, userController.getOrder);
router.get("/order/:id", auth, userController.getSelectedOrder);
router.post("/add-order", auth, userController.addOrder);

module.exports = router;
