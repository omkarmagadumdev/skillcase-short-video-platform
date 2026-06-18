const app = require("./src/app");
const { config, initializeDatabaseConnection } = require("./src/config");

const startServer = () => {
  try {
    app.listen(config.port, () => {
      console.log(`Backend server running on port ${config.port}`);
    });

    initializeDatabaseConnection();
  } catch (error) {
    console.error("Unable to start backend server:", error.message);
    process.exit(1);
  }
};

startServer();
