// Apple Music's public page serialization is not a supported API. Validate each
// refresh and keep a known-good snapshot; never pass arbitrary page URLs through.
const fallback = require("./intuitionSnapshot.json");
const PLAYLIST_ID = "pl.u-mJy88R0CzGyjKyd";
const PAGE_URL = "https://music.apple.com/us/playlist/intuition/pl.u-mJy88R0CzGyjKyd";
const CACHE_MS = 60 * 60 * 1000;
let cached = { playlist: fallback, snapshot: true, expires: 0 };
let inflight;
const timeout = (ms) => AbortSignal.timeout(ms);
function artwork(value) {
  const template = value?.dictionary?.url;
  if (typeof template !== "string") throw Error("Missing artwork");
  const url = template.replace("{w}x{h}", "600x600").replace("{f}", "jpg");
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" || !/^is\d+-ssl\.mzstatic\.com$/.test(parsed.hostname)) throw Error("Invalid artwork origin");
  return { url, width: 600, height: 600 };
}
async function refresh() {
  const pageRes = await fetch(PAGE_URL, { signal: timeout(12000), headers: { Accept: "text/html" } });
  if (!pageRes.ok) throw Error(`Playlist page ${pageRes.status}`);
  const html = await pageRes.text();
  const serialized = html.match(/<script\b(?=[^>]*\bid="serialized-server-data")(?=[^>]*\btype="application\/json")[^>]*>([\s\S]*?)<\/script>/);
  if (!serialized) throw Error("Playlist page schema changed");
  const sections = JSON.parse(serialized[1])?.data?.[0]?.data?.sections;
  if (!Array.isArray(sections)) throw Error("Missing playlist sections");
  const header = sections.find((s) => s.itemKind === "containerDetailHeaderLockup")?.items?.[0];
  const list = sections.find((s) => s.itemKind === "trackLockup")?.items;
  if (header?.contentDescriptor?.identifiers?.storeAdamID !== PLAYLIST_ID ||
      header?.contentDescriptor?.url !== PAGE_URL ||
      !Array.isArray(list) || list.length < 1 || list.length > 500 ||
      header.trackCount !== list.length) throw Error("Invalid or incomplete playlist");
  const ids = list.map((t) => t.contentDescriptor?.identifiers?.storeAdamID);
  if (ids.some((id) => !/^\d+$/.test(String(id))) || new Set(ids).size !== ids.length)
    throw Error("Invalid track IDs");
  const byId = new Map();
  // iTunes Lookup has a practical URL-length limit. Chunk growing playlists.
  for (let offset = 0; offset < ids.length; offset += 50) {
    const lookup = new URL("https://itunes.apple.com/lookup");
    lookup.searchParams.set("id", ids.slice(offset, offset + 50).join(","));
    lookup.searchParams.set("country", "us");
    lookup.searchParams.set("entity", "song");
    const lookupRes = await fetch(lookup, { signal: timeout(12000) });
    if (!lookupRes.ok) throw Error(`Preview lookup ${lookupRes.status}`);
    const data = await lookupRes.json();
    for (const track of (data.results || [])) byId.set(String(track.trackId), track);
  }
  if (ids.some((id) => !byId.has(id))) throw Error("Incomplete preview lookup");
  const tracks = list.map((t) => {
    const id = t.contentDescriptor.identifiers.storeAdamID;
    const catalog = byId.get(id);
    const trackUrl = t.contentDescriptor.url;
    if (typeof t.title !== "string" || !t.title || typeof t.artistName !== "string" || !t.artistName ||
        !trackUrl?.startsWith("https://music.apple.com/us/") ||
        String(catalog.trackName) !== t.title) throw Error("Mismatched track metadata");
    const preview = catalog.previewUrl;
    const validPreview = typeof preview === "string" && /^https:\/\/audio-ssl\.itunes\.apple\.com\//.test(preview);
    return { id, attributes: {
      name: t.title, artistName: t.artistName, url: trackUrl,
      artwork: artwork(t.artwork), previews: validPreview ? [{ url: preview }] : [],
    } };
  });
  return { playlist: { id: PLAYLIST_ID,
    attributes: { name: header.title, url: PAGE_URL, artwork: artwork(header.artwork) },
    relationships: { tracks: { data: tracks } } }, snapshot: false };
}
async function getPublicPlaylist() {
  if (Date.now() < cached.expires) return cached;
  if (!inflight) inflight = refresh().then((result) => {
    cached = { ...result, expires: Date.now() + CACHE_MS };
    return cached;
  }).catch((error) => {
    console.error("Public playlist refresh failed; keeping last known good:", error);
    cached.expires = Date.now() + 5 * 60 * 1000;
    return cached;
  }).finally(() => { inflight = undefined; });
  return inflight;
}
module.exports = { getPublicPlaylist, PLAYLIST_ID };
