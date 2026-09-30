const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const { insertWithStableSlug, validateTitle } = require("../lib/slug");

router.post("/", async (req, res) => {
  try {
    const { title, descriptor, role, tags, year, src, liveUrl, stack, status } = req.body;
    validateTitle(title, 255);
    const newProject = await insertWithStableSlug(title, (slug) => pool.query(
      `INSERT INTO project (slug, title, descriptor, role, tags, year, src, live_url, stack, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        slug,
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
    ));
    res.json(newProject.rows[0]);
  } catch (err) {
    if (err.status === 400) return res.status(400).json({ message: err.message });
    if (err.code === "23505") return res.status(409).json({ message: "Project URL already exists" });
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
    validateTitle(title, 255);
    await pool.query(
      `UPDATE project SET title = $1, descriptor = $2, role = $3, tags = $4,
              year = $5, src = $6, live_url = $7, stack = $8, status = $9
       WHERE project_id = $10`,
      [
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
    if (err.status === 400) return res.status(400).json({ message: err.message });
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
