const { API_MESSAGES, HTTP_STATUS } = require("../utils/constants");

const errorHandler = (error, _request, response, next) => {
  if (response.headersSent) {
    return next(error);
  }

  console.error("Unhandled application error:", error.message);

  const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const message =
    error.statusCode ? error.message : API_MESSAGES.INTERNAL_SERVER_ERROR;
  const errors = error.statusCode ? error.errors || [] : [];

  return response.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

module.exports = errorHandler;
