require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env.local") });
const pool = require("../src/db/db");
const { toSlug } = require("../src/lib/slug");

async function main() {
  await pool.query("ALTER TABLE post ADD COLUMN IF NOT EXISTS slug VARCHAR(500)");

  const { rows } = await pool.query("SELECT post_id, post_title FROM post");
  for (const row of rows) {
    await pool.query("UPDATE post SET slug = $1 WHERE post_id = $2", [
      toSlug(row.post_title),
      row.post_id,
    ]);
  }
  console.log(`Backfilled slug for ${rows.length} post(s).`);

  await pool.query("ALTER TABLE post ALTER COLUMN slug SET NOT NULL");
  await pool.query(
    "CREATE UNIQUE INDEX IF NOT EXISTS post_slug_idx ON post (slug)"
  );
  console.log("slug column is NOT NULL with a unique index.");

  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
