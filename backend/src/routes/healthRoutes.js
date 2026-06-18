const express = require("express");
const { config } = require("../config");
const { API_MESSAGES, HTTP_STATUS } = require("../utils/constants");

const router = express.Router();

router.get("/", (_request, response) => {
  response.status(HTTP_STATUS.OK).json({
    success: true,
    message: API_MESSAGES.HEALTH_CHECK_SUCCESS,
    data: {
      environment: config.environment,
      timestamp: new Date().toISOString(),
    },
  });
});

module.exports = router;
