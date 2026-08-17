exports.unAuthorised = (req, res, next) => {
  return res.status(401).json({
    success: false,
    message: "Unauthorized access: Invalid or missing authentication token.",
  });
};

exports.onError = (res, msg = "Something went wrong", statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message: msg,
  });
};

exports.onInvalidEndpoint = (req, res, next) => {
  return res.status(404).json({
    success: false,
    message: `Resource not found: ${req.originalUrl}`,
  });
};

