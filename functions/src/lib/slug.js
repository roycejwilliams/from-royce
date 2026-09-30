const { randomUUID } = require("node:crypto");
function toSlug(title) {
  return String(title ?? "")
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/[\s-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
function validateTitle(title, maxLength = 500) {
  if (typeof title !== "string" || !title.trim() || title.length > maxLength || !toSlug(title)) {
    throw Object.assign(new Error(`A title with letters or numbers, at most ${maxLength} characters, is required`), { status: 400 });
  }
  return title;
}
function slugForNewRecord(title, collision = false) {
  validateTitle(title);
  const base = toSlug(title);
  if (!base) throw Object.assign(new Error("A title with letters or numbers is required"), { status: 400 });
  return collision ? `${base.slice(0, 220)}-${randomUUID()}` : base.slice(0, 255);
}
async function insertWithStableSlug(title, insert) {
  try { return await insert(slugForNewRecord(title)); }
  catch (error) {
    if (error.code !== "23505") throw error;
    return insert(slugForNewRecord(title, true));
  }
}
module.exports = { toSlug, validateTitle, slugForNewRecord, insertWithStableSlug };
