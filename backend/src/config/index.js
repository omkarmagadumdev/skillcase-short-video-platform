const config = require("./env");
const database = require("./database");

module.exports = {
  config,
  ...database,
};
