const { API_MESSAGES, HTTP_STATUS } = require("../utils/constants");
const createAppError = require("../utils/createAppError");
const { verifyToken } = require("../utils/jwt");

const authenticate = (request, _response, next) => {
  const authorizationHeader =
    typeof request.headers.authorization === "string"
      ? request.headers.authorization.trim()
      : "";

  if (!authorizationHeader) {
    return next(createAppError(API_MESSAGES.AUTHENTICATION_REQUIRED, HTTP_STATUS.UNAUTHORIZED));
  }

  const authorizationParts = authorizationHeader.split(/\s+/);

  if (
    authorizationParts.length !== 2 ||
    authorizationParts[0] !== "Bearer" ||
    !authorizationParts[1]
  ) {
    return next(createAppError(API_MESSAGES.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED));
  }

  try {
    const decodedToken = verifyToken(authorizationParts[1]);

    request.user = {
      id: Number(decodedToken.sub),
      username: decodedToken.username,
    };

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = authenticate;
