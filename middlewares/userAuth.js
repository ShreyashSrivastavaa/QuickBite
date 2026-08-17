const jwt = require("jsonwebtoken");
const { APP_KEY } = require("../config/AppConst");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization") || req.get("authorization");
  if (!authHeader) {
    const err = new Error("Authentication required. No authorization header provided.");
    err.statusCode = 401;
    return next(err);
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    const err = new Error("Authentication failed. Bearer token format required.");
    err.statusCode = 401;
    return next(err);
  }

  const token = parts[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, APP_KEY);
  } catch (err) {
    const authErr = new Error("Authentication failed. Token is invalid or expired.");
    authErr.statusCode = 401;
    return next(authErr);
  }

  if (!decodedToken || !decodedToken.userId) {
    const authErr = new Error("Authentication failed. Invalid token payload.");
    authErr.statusCode = 401;
    return next(authErr);
  }

  req.userId = decodedToken.userId;
  req.userRole = decodedToken.role || "user";
  next();
};

