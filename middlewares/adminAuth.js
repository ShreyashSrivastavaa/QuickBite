const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const { APP_KEY } = require("../config/AppConst");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization") || req.get("authorization");
  if (!authHeader) {
    const err = new Error("Admin access required. No authorization token provided.");
    err.statusCode = 401;
    return next(err);
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    const err = new Error("Admin access failed. Bearer token format required.");
    err.statusCode = 401;
    return next(err);
  }

  const token = parts[1];

  jwt.verify(token, APP_KEY, (err, payload) => {
    if (err || !payload) {
      const authErr = new Error("Admin access failed. Invalid or expired token.");
      authErr.statusCode = 401;
      return next(authErr);
    }

    if (payload.role !== "admin") {
      const authErr = new Error("Forbidden. Admin privileges required.");
      authErr.statusCode = 403;
      return next(authErr);
    }

    req.adminId = payload.adminId || payload.userId;
    req.adminEmail = payload.email;
    next();
  });
};

