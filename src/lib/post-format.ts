import { format, parseISO } from "date-fns";
import type { BlogPost } from "@/types";

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
      ? format(parseISO(post.post_date.slice(0, 10)), "MM/dd/yy")
      : "-",
    formatted_time: post.post_time
      ? format(parseISO(`1970-01-01T${post.post_time}`), "hh:mm a")
      : "-",
    slug: (post.slug as string) || toSlug(post.post_title),
  };
}
