const { Pool, types } = require("pg");

// PostgreSQL DATE is a calendar day, not a UTC timestamp.
types.setTypeParser(1082, (value) => value);

const isProd = process.env.NODE_ENV === "production";

if (!isProd) {
  const path = require("path");
  require("dotenv").config({ path: path.resolve(__dirname, "../../../.env.local") });
}

const pool = new Pool({
  connectionString: isProd ? process.env.DATABASE_URL : process.env.LOCAL_DATABASE_URL,
  ssl: isProd ? { rejectUnauthorized: false } : false,
  max: 3,
  idleTimeoutMillis: 30000,
});

module.exports = pool;
