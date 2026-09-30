import { formatPost } from "../post-format";
import { formatProject } from "../project-format";

// Fixed first-party origin, never a request Host or forwarded-host header.
// Calling the public read-only API keeps database credentials out of page props.
const API_ORIGIN = process.env.NODE_ENV === "development"
  ? "http://localhost:5002"
  : "https://nextapp-gzf6b33bla-uc.a.run.app";
export async function fetchDetailData(path: string) {
  const response = await fetch(`${API_ORIGIN}${path}`, {
    signal: AbortSignal.timeout(10000),
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Detail API returned ${response.status}`);
  return response.json();
}
export async function loadBlogDetail(slug: string) {
  const raw = await fetchDetailData(`/api/posts/slug/${encodeURIComponent(slug)}`);
  return raw ? formatPost(raw) : null;
}
export async function loadWorkDetail(slug: string) {
  const raw = await fetchDetailData(`/api/work/slug/${encodeURIComponent(slug)}`);
  if (!raw) return null;
  const all = await fetchDetailData("/api/work");
  if (!all || !Array.isArray(all.project)) throw new Error("Invalid project list");
  return { project: formatProject(raw, Math.max(0, all.project.findIndex((p: { slug: string }) => p.slug === slug))), projects: all.project.map(formatProject) };
}
