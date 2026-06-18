const { API_MESSAGES, HTTP_STATUS } = require("../utils/constants");

const errorHandler = (error, _request, response, next) => {
  if (response.headersSent) {
    return next(error);
  }

  console.error("Unhandled application error:", error.message);

  return response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: API_MESSAGES.INTERNAL_SERVER_ERROR,
    errors: [],
  });
};

module.exports = errorHandler;
