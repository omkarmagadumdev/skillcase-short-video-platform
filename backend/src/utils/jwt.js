const jwt = require("jsonwebtoken");
const { config } = require("../config");
const { API_MESSAGES, HTTP_STATUS } = require("./constants");
const createAppError = require("./createAppError");

const generateToken = (payload) => {
  if (!config.jwt.secret) {
    throw createAppError(API_MESSAGES.INTERNAL_SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }

  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

const verifyToken = (token) => {
  if (!config.jwt.secret) {
    throw createAppError(API_MESSAGES.INTERNAL_SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }

  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw createAppError(API_MESSAGES.TOKEN_EXPIRED, HTTP_STATUS.UNAUTHORIZED);
    }

    throw createAppError(API_MESSAGES.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED);
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
