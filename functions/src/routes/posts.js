const express = require("express");
const router = express.Router();
const pool = require("../db/db");

router.post("/", async (req, res) => {
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

router.get("/", async (req, res) => {
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

// Slug lookup — must come before /:id to avoid ambiguity
router.get("/slug/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query("SELECT * FROM post");
    const post = result.rows.find(
      (p) =>
        p.post_title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim() === slug
    );
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    console.error("GET /api/posts/slug/:slug error:", err);
    res.status(500).send("Server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await pool.query("SELECT * FROM post WHERE post_id = $1", [id]);
    if (!post.rows[0]) return res.status(404).json({ message: "Post not found" });
    res.json(post.rows[0]);
  } catch (err) {
    console.error("GET /api/posts/:id error:", err);
    res.status(500).send("Server error");
  }
});

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM post WHERE post_id = $1", [id]);
    res.json("Post deleted");
  } catch (err) {
    console.error("DELETE /api/posts/:id error:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
