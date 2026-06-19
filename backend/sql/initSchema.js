const fs = require("fs/promises");
const path = require("path");
const { getPool } = require("../src/config");

const schemaFilePath = path.join(__dirname, "schema.sql");

const initializeSchema = async () => {
  let pool;
  let client;
  let transactionStarted = false;

  try {
    const schemaSql = await fs.readFile(schemaFilePath, "utf8");
    pool = getPool();
    client = await pool.connect();

    await client.query("BEGIN");
    transactionStarted = true;
    await client.query(schemaSql);
    await client.query("COMMIT");
    transactionStarted = false;

    console.log("Database schema initialized successfully.");
  } catch (error) {
    if (client && transactionStarted) {
      await client.query("ROLLBACK");
    }

    console.error("Failed to initialize database schema:", error.message);
    process.exitCode = 1;
  } finally {
    if (client) {
      client.release();
    }

    if (pool) {
      await pool.end();
    }
  }
};

initializeSchema();
