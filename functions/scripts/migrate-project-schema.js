const fs = require("node:fs");
const path = require("node:path");
const sql = fs.readFileSync(path.join(__dirname, "../migrations/001-project-schema.sql"), "utf8");
async function migrateProjectSchema(client) {
  await client.query("BEGIN");
  try {
    await client.query(sql);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  }
}
async function main() {
  // This tool is local-only. A production migration needs its own reviewed path.
  if (process.env.NODE_ENV === "production" || !process.argv.includes("--apply-local")) {
    throw new Error("Schema setup requires --apply-local and a non-production environment.");
  }
  require("dotenv").config({ path: path.resolve(__dirname, "../../.env.local") });
  if (!process.env.LOCAL_DATABASE_URL) throw new Error("LOCAL_DATABASE_URL is required.");
  const { Client } = require("pg");
  const client = new Client({ connectionString: process.env.LOCAL_DATABASE_URL });
  await client.connect();
  try {
    await migrateProjectSchema(client);
    console.log("Project schema is ready. No project rows were inserted or changed.");
  } finally { await client.end(); }
}
if (require.main === module) main().catch(() => {
  // Do not print database errors/URLs that may contain connection information.
  console.error("Local project schema setup failed. Check the target and permissions privately.");
  process.exitCode = 1;
});
module.exports = { migrateProjectSchema };
