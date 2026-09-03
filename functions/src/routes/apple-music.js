const express = require("express");
const router = express.Router();
const { getDeveloperToken } = require("../lib/appleMusicToken");

const STOREFRONT = process.env.APPLE_MUSIC_STOREFRONT || "us";

// Public developer token — safe to expose to the client. It authorizes
// catalog reads only; it is not a user credential.
router.get("/token", (req, res) => {
  try {
    res.json({ token: getDeveloperToken() });
  } catch (err) {
    res.status(501).json({ message: err.message });
  }
});

// Catalog lookup by Apple Music song IDs — no user auth required, returns
// title/artist/artwork/previewUrl. https://api.music.apple.com/v1/catalog/{storefront}/songs
router.get("/tracks", async (req, res) => {
  const ids = typeof req.query.ids === "string" ? req.query.ids : "";
  if (!ids) return res.status(400).json({ message: "Missing ids query param" });

  let token;
  try {
    token = getDeveloperToken();
  } catch (err) {
    return res.status(501).json({ message: err.message });
  }

  try {
    const url = `https://api.music.apple.com/v1/catalog/${STOREFRONT}/songs?ids=${encodeURIComponent(ids)}`;
    const appleRes = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!appleRes.ok) {
      const text = await appleRes.text();
      return res.status(appleRes.status).json({ message: text });
    }
    const data = await appleRes.json();
    res.json(data);
  } catch (err) {
    console.error("GET /api/apple-music/tracks error:", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
