const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_1OErqNcgRf3h@ep-sparkling-haze-a8e3gol7-pooler.eastus2.azure.neon.tech/neondb?sslmode=require",
  ssl: {
    rejectUnauthorized: false,
  }
});

module.exports = pool;
