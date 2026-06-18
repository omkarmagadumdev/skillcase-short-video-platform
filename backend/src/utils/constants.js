const HTTP_STATUS = {
  OK: 200,
  INTERNAL_SERVER_ERROR: 500,
};

const API_MESSAGES = {
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
