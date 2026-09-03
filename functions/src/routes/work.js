const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const { toSlug } = require("../lib/slug");

router.post("/", async (req, res) => {
  try {
    const { title, descriptor, role, tags, year, src, liveUrl, stack, status } = req.body;
    const newProject = await pool.query(
      `INSERT INTO project (slug, title, descriptor, role, tags, year, src, live_url, stack, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        toSlug(title),
        title,
        descriptor,
        role,
        tags || [],
        year,
        src,
        liveUrl || null,
        stack || null,
        status || null,
      ]
    );
    res.json(newProject.rows[0]);
  } catch (err) {
    console.error("POST /api/work error:", err);
    res.status(500).send("Server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM project ORDER BY created_at ASC"
    );
    res.json({ project: result.rows });
  } catch (err) {
    console.error("GET /api/work error:", err);
    res.status(500).send("Server error");
  }
});

// Slug lookup: must come before /:id to avoid ambiguity
router.get("/slug/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await pool.query(
      "SELECT * FROM project WHERE slug = $1 LIMIT 1",
      [slug]
    );
    if (!result.rows[0]) return res.status(404).json({ message: "Project not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("GET /api/work/slug/:slug error:", err);
    res.status(500).send("Server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await pool.query("SELECT * FROM project WHERE project_id = $1", [id]);
    if (!project.rows[0]) return res.status(404).json({ message: "Project not found" });
    res.json(project.rows[0]);
  } catch (err) {
    console.error("GET /api/work/:id error:", err);
    res.status(500).send("Server error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, descriptor, role, tags, year, src, liveUrl, stack, status } = req.body;
    await pool.query(
      `UPDATE project SET slug = $1, title = $2, descriptor = $3, role = $4, tags = $5,
              year = $6, src = $7, live_url = $8, stack = $9, status = $10
       WHERE project_id = $11`,
      [
        toSlug(title),
        title,
        descriptor,
        role,
        tags || [],
        year,
        src,
        liveUrl || null,
        stack || null,
        status || null,
        id,
      ]
    );
    res.json("Project updated");
  } catch (err) {
    console.error("PUT /api/work/:id error:", err);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM project WHERE project_id = $1", [id]);
    res.json("Project deleted");
  } catch (err) {
    console.error("DELETE /api/work/:id error:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
