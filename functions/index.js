// Firebase Functions SDK
const functions = require("firebase-functions");

// Express (for API)
const express = require("express");
const cors = require("cors");
const pool = require("./db"); // Your PostgreSQL pool or DB connection

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// ===== REST API Routes =====

app.post("/posts", async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const newPost = await pool.query(
      "INSERT INTO post (post_title, post_content, post_image) VALUES($1, $2, $3) RETURNING *",
      [title, content, image || null]
    );
    res.json(newPost.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

app.get("/posts", async (req, res) => {
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
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await pool.query("SELECT * FROM post WHERE post_id = $1", [id]);
    res.json(posts.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

app.put("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image } = req.body;
    await pool.query(
      "UPDATE post SET post_title = $1, post_content = $2, post_image = $3 WHERE post_id = $4",
      [title, content, image || null, id]
    );
    res.json("Post was updated");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM post WHERE post_id = $1", [id]);
    res.json("Post was deleted!");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// ✅ Export your API under /api
exports.api = functions.https.onRequest(app);

// ===== Next.js SSR Handler =====

const next = require("next");

const isDev = process.env.NODE_ENV !== "production";
const nextApp = next({
  dev: isDev,
  conf: {
    distDir: ".next"
  }
});

// ✅ This line was missing
const handle = nextApp.getRequestHandler();

// ✅ Export your SSR handler for all other routes
exports.nextApp = functions.https.onRequest((req, res) => {
  return nextApp.prepare().then(() => handle(req, res));
});
