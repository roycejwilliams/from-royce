const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const { toSlug } = require("../lib/slug");

router.post("/", async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const newPost = await pool.query(
      "INSERT INTO post (post_title, post_content, post_image, slug) VALUES($1, $2, $3, $4) RETURNING *",
      [title, content, image || null, toSlug(title)]
    );
    res.json(newPost.rows[0]);
  } catch (err) {
    console.error("POST /api/posts error:", err);
    res.status(500).send("Server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT post_id, post_title, LEFT(post_content, 300) AS post_content,
              post_image, post_date, post_time, slug
       FROM post ORDER BY post_date DESC, post_time DESC`
    );
    res.json({
      totalPost: result.rows.length,
      currentPage: 1,
      totalPages: 1,
      post: result.rows,
    });
  } catch (err) {
    console.error("GET /api/posts error:", err);
    res.status(500).send("Server error");
  }
});

// Slug lookup: must come before /:id to avoid ambiguity
router.get("/slug/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query(
      "SELECT * FROM post WHERE slug = $1 LIMIT 1",
      [slug]
    );
    if (!result.rows[0]) return res.status(404).json({ message: "Post not found" });
    res.json(result.rows[0]);
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
      "UPDATE post SET post_title = $1, post_content = $2, post_image = $3, slug = $4 WHERE post_id = $5",
      [title, content, image || null, toSlug(title), id]
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
