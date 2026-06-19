const path = require("path");
const dotenv = require("dotenv");
const { ENVIRONMENTS } = require("../utils/constants");

dotenv.config();

const jwtSecret = typeof process.env.JWT_SECRET === "string"
  ? process.env.JWT_SECRET.trim()
  : "";

if (!jwtSecret) {
  throw new Error("JWT_SECRET is required in the environment configuration.");
}

const config = {
  port: Number(process.env.PORT) || 5000,
  environment: process.env.NODE_ENV || ENVIRONMENTS.DEVELOPMENT,
  database: {
    url: process.env.DATABASE_URL || "",
  },
  jwt: {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
    secret: jwtSecret,
  },
  uploads: {
    directoryPath: path.join(__dirname, "..", "uploads"),
    publicPath: "/uploads",
  },
};

module.exports = config;
