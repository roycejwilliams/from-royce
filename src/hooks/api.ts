import { useQuery, useQueryClient } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";

type BlogPost = {
  post_id: number;
  post_title: string;
  post_content: string;
  post_image: string | null;
  post_time: string;
  post_date: string;
  formatted_date: string;
  formatted_time: string;
  slug: string;
};

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5002" // <- your Express dev server
    : "https://us-central1-from-royce.cloudfunctions.net/nextApp";

const getAllPost = async (): Promise<BlogPost[]> => {
  const response = await fetch(`${BASE_URL}/api/posts`);
  console.log("[getAllPost] Response status:", response.status);

  if (!response.ok) {
    throw new Error(`[getAllPost] Failed with status ${response.status}`);
  }

  const data = await response.json();
  console.log("[getAllPost] Raw response:", data);

  const formattedPost = data.post.map((p: BlogPost) => {
    const formattedDate = p.post_date
      ? format(parseISO(p.post_date), "MM/dd/yy")
      : "Invalid date";
    const formattedTime = p.post_time
      ? format(parseISO(`1970-01-01T${p.post_time}`), "hh:mm a")
      : "Invalid time";

    const slug = p.post_title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    return {
      ...p,
      formatted_date: formattedDate,
      formatted_time: formattedTime,
      slug,
    };
  });

  return formattedPost;
};

const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getAllPost(),
  });
};

const selectPost = (slug: string) => {
  const queryClient = useQueryClient();
  const posts = queryClient.getQueryData<BlogPost[]>(["posts"]);
  return posts?.find((p) => p.slug === slug);
};

export { selectPost, usePosts, getAllPost };
