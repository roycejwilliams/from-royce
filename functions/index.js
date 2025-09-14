const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
const cors = require("cors");
const next = require("next");
const { Pool } = require("pg");

// 🔐Load local env vars when not in production
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env.local") });
console.log("DB URL being used:", process.env.LOCAL_DATABASE_URL);

//  PostgreSQL connection
const isProd = process.env.NODE_ENV === "production";

const databaseUrl = isProd
  ? process.env.DATABASE_URL
  : process.env.LOCAL_DATABASE_URL;

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: isProd ? { rejectUnauthorized: false } : false,
});

// DB Connection
pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error(" PostgreSQL connection error:", err));

const dev = process.env.NODE_ENV !== "production";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "../.env.local" });
}

const nextApp = next({ dev, conf: { distDir: ".next" } });
const handle = nextApp.getRequestHandler();

const app = express();
app.use(cors());
app.use(express.json());

app.listen(5002, () => {
  console.log("Express server running on http://localhost:5002");
});

// API Routes
app.post("/api/posts", async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const newPost = await pool.query(
      "INSERT INTO post (post_title, post_content, post_image) VALUES($1, $2, $3) RETURNING *",
      [title, content, image || null]
    );
    res.json(newPost.rows[0]);
  } catch (err) {
    console.error("POST /api/posts error:", err);
    res.status(500).send("Server error");
  }
});

app.get("/api/posts", async (req, res) => {
  try {
    const { page = 1, limit = 6 } = req.query;
    const offset = (page - 1) * limit;
    const paginatedPage = await pool.query(
      "SELECT * FROM post ORDER BY post_date DESC, post_time DESC LIMIT $1 OFFSET $2",
      [limit, offset]
    );
    const totalPost = await pool.query("SELECT COUNT(*) FROM post");
    res.json({
      totalPost: parseInt(totalPost.rows[0].count),
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalPost.rows[0].count / limit),
      post: paginatedPage.rows,
    });
  } catch (err) {
    console.error("GET /api/posts error:", err);
    res.status(500).send("Server error");
  }
});

app.get("/api/posts/:slug", async (req, res) => {
  const slug = req.params.slug;
  const result = await db.query("SELECT * FROM post");

  const post = result.rows.find(
    (p) =>
      p.post_title.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "") ===
      slug
  );

  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

app.get("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await pool.query("SELECT * FROM post WHERE post_id = $1", [
      id,
    ]);
    res.json(post.rows[0]);
  } catch (err) {
    console.error("GET /api/posts/:id error:", err);
    res.status(500).send("Server error");
  }
});

app.put("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image } = req.body;
    await pool.query(
      "UPDATE post SET post_title = $1, post_content = $2, post_image = $3 WHERE post_id = $4",
      [title, content, image || null, id]
    );
    res.json("Post updated");
  } catch (err) {
    console.error("PUT /api/posts/:id error:", err);
    res.status(500).send("Server error");
  }
});

app.delete("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM post WHERE post_id = $1", [id]);
    res.json("Post deleted");
  } catch (err) {
    console.error("DELETE /api/posts/:id error:", err);
    res.status(500).send("Server error");
  }
});

// 🔁 Catch-all for Next.js pages
app.all("*", (req, res) => {
  return handle(req, res);
});

// 🚀 Export Firebase Gen 2 Cloud Function
exports.nextApp = onRequest({ region: "us-central1" }, async (req, res) => {
  await nextApp.prepare();
  app(req, res);
});
