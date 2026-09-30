import { auth } from "../../firebase";
import { formatPost } from "./post-format";
export { formatPost, toSlug } from "./post-format";
import type { BlogPost } from "@/types";

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5002"
    : "";

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
  const token = await auth?.currentUser?.getIdToken();
  if (!token) throw new Error("Sign in required");
  const res = await fetch(`${BASE_URL}/api/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return formatPost(await res.json());
}
