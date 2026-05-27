import { format, parseISO } from "date-fns";
import type { BlogPost } from "@/types";

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5002"
    : "https://us-central1-from-royce.cloudfunctions.net/nextApp";

export function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function formatPost(p: Record<string, unknown>): BlogPost {
  const post = p as BlogPost;
  return {
    ...post,
    formatted_date: post.post_date
      ? format(parseISO(post.post_date), "MM/dd/yy")
      : "—",
    formatted_time: post.post_time
      ? format(parseISO(`1970-01-01T${post.post_time}`), "hh:mm a")
      : "—",
    slug: toSlug(post.post_title),
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const res = await fetch(`${BASE_URL}/api/posts`);
  if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
  const data = await res.json();
  return (data.post as Record<string, unknown>[]).map(formatPost);
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const res = await fetch(
    `${BASE_URL}/api/posts/slug/${encodeURIComponent(slug)}`
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);
  return formatPost(await res.json());
}

export async function createPost(data: {
  title: string;
  content: string;
  image: string | null;
}): Promise<BlogPost> {
  const res = await fetch(`${BASE_URL}/api/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return formatPost(await res.json());
}
