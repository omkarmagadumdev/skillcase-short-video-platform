const dotenv = require("dotenv");
const { ENVIRONMENTS } = require("../utils/constants");

dotenv.config();

const config = {
  port: Number(process.env.PORT) || 5000,
  environment: process.env.NODE_ENV || ENVIRONMENTS.DEVELOPMENT,
  database: {
    url: process.env.DATABASE_URL || "",
  },
};

module.exports = config;
