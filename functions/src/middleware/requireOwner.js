const { getApps, initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

// Firebase Functions supplies application-default credentials and project ID.
if (!getApps().length) initializeApp();

const OWNER_UID = "H4pmMiCJHyVkqLU0RvPPd4blP4l1";

async function requireOwner(req, res, next) {
  const match = /^Bearer ([^\s]+)$/i.exec(req.get("authorization") || "");
  if (!match) return res.status(401).json({ message: "Sign in required" });

  try {
    const decoded = await getAuth().verifyIdToken(match[1], true);
    if (decoded.uid !== OWNER_UID) {
      return res.status(403).json({ message: "Not authorized" });
    }
    next();
  } catch (error) {
    console.warn("Owner token verification failed:", error.code || error.message);
    return res.status(401).json({ message: "Sign in required" });
  }
}

module.exports = { requireOwner };
