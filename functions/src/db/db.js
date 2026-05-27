const { Pool } = require("pg");

const isProd = process.env.NODE_ENV === "production";

if (!isProd) {
  const path = require("path");
  require("dotenv").config({ path: path.resolve(__dirname, "../../../.env.local") });
}

const pool = new Pool({
  connectionString: isProd ? process.env.DATABASE_URL : process.env.LOCAL_DATABASE_URL,
  ssl: isProd ? { rejectUnauthorized: false } : false,
});

module.exports = pool;
