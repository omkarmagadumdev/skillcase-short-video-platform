const HTTP_STATUS = {
  BAD_REQUEST: 400,
  CREATED: 201,
  CONFLICT: 409,
  OK: 200,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
};

const API_MESSAGES = {
  AUTHENTICATION_REQUIRED: "Authentication is required.",
  EMAIL_ALREADY_EXISTS: "A user with this email already exists.",
  INVALID_CREDENTIALS: "Invalid email or password.",
  INVALID_TOKEN: "Invalid authentication token.",
  LOGIN_SUCCESS: "Login successful.",
  REGISTRATION_SUCCESS: "User registered successfully.",
  TOKEN_EXPIRED: "Authentication token has expired.",
  USER_FETCH_SUCCESS: "Authenticated user fetched successfully.",
  USERNAME_ALREADY_EXISTS: "A user with this username already exists.",
  VALIDATION_ERROR: "Required fields are missing or invalid.",
  HEALTH_CHECK_SUCCESS: "Backend service is healthy.",
  INTERNAL_SERVER_ERROR: "Internal server error.",
};

const ENVIRONMENTS = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
  TEST: "test",
};

module.exports = {
  API_MESSAGES,
  ENVIRONMENTS,
  HTTP_STATUS,
};
