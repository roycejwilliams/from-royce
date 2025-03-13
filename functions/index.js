const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Routes

// Create a post
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

// Get all posts (paginated)
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

// Get a single post
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

// Update a post
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

// Delete a post
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

// 👇 Firebase handles the server, so no need for app.listen
exports.api = functions.https.onRequest(app);
