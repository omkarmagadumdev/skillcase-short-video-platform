const { Pool } = require("pg");
const config = require("./env");

let poolInstance;

const createPool = () => {
  if (!config.database.url) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const pool = new Pool({
    connectionString: config.database.url,
  });

  pool.on("error", (error) => {
    console.error("Unexpected PostgreSQL pool error:", error.message);
  });

  return pool;
};

const getPool = () => {
  if (!poolInstance) {
    poolInstance = createPool();
  }

  return poolInstance;
};

const testDatabaseConnection = async () => {
  const pool = getPool();
  const client = await pool.connect();

  try {
    await client.query("SELECT 1");
    console.log("PostgreSQL connection established successfully.");
  } catch (error) {
    console.error("PostgreSQL connection failed:", error.message);
    throw error;
  } finally {
    client.release();
  }
};

const initializeDatabaseConnection = async () => {
  if (!config.database.url) {
    console.warn("DATABASE_URL is not configured. Database connection test skipped.");
    return;
  }

  try {
    await testDatabaseConnection();
  } catch (error) {
    console.error("Database connection test failed after startup:", error.message);
  }
};

module.exports = {
  getPool,
  initializeDatabaseConnection,
  testDatabaseConnection,
};
