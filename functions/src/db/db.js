const { Pool, types } = require("pg");

// PostgreSQL DATE is a calendar day, not a UTC timestamp.
types.setTypeParser(1082, (value) => value);

const isProd = process.env.NODE_ENV === "production";

if (!isProd) {
  const path = require("path");
  require("dotenv").config({ path: path.resolve(__dirname, "../../../.env.local") });
}

const { databaseConfig } = require("../lib/database-config");
const pool = new Pool(databaseConfig(
  isProd ? process.env.DATABASE_URL : process.env.LOCAL_DATABASE_URL,
  isProd
));

module.exports = pool;
