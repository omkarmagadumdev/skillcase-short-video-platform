const express = require("express");
const cors = require("cors");
const { config } = require("./config");
const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(config.uploads.publicPath, express.static(config.uploads.directoryPath));
app.use(routes);
app.use(errorHandler);

module.exports = app;
