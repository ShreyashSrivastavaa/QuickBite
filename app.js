const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { MONGODB_URI, PORT, NODE_ENV, CORS_ORIGIN, RATE_LIMIT_MAX } = require("./config/AppConst");

/**
 * Controllers & Middlewares
 */
const AppError = require("./controllers/errorController");

/**
 * Routes
 */
const userRoutes = require("./routes/userRoutes");
const foodRoutes = require("./routes/foodsRoute");
const adminRoutes = require("./routes/adminRoutes");
const healthRoutes = require("./routes/healthRoute");

const app = express();

/**
 * Security & Helper Middlewares
 */

// Secure HTTP headers
app.use(helmet());

// Enable CORS with restricted origin(s)
const allowedOrigins = CORS_ORIGIN === "*" ? "*" : CORS_ORIGIN.split(",").map((o) => o.trim());
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Global Rate Limiting
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: RATE_LIMIT_MAX || 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes.",
  },
});
app.use(globalLimiter);

// Compress HTTP responses
app.use(compression());

// Request logging (morgan)
if (NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

// Request body parser with payload size limits (10kb) to prevent DoS
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Serve static assets
app.use("/images", express.static(path.join(__dirname, "images")));

/**
 * API Routes
 */
app.use("/health", healthRoutes);
app.use("/user", userRoutes);
app.use("/food", foodRoutes);
app.use("/admin", adminRoutes);

// Handle 404 routes
app.use(AppError.onInvalidEndpoint);

/**
 * Global Error Handling Middleware
 */
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  const errors = error.data || error.errors || null;

  console.error(`[Error] ${req.method} ${req.originalUrl}:`, error);

  res.status(statusCode).json({
    success: false,
    message: message,
    ...(errors && { errors: errors }),
    ...(NODE_ENV !== "production" && { stack: error.stack }),
  });
});

/**
 * Database Connection & Server Initialization
 */
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connection established successfully.");
    const serverPort = PORT || 8000;
    app.listen(serverPort, () => {
      console.log(`QuickBite Backend server running in ${NODE_ENV || "development"} mode on port ${serverPort}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Connection Error:", err.message);
    process.exit(1);
  });
