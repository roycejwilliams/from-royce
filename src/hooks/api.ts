import { useQuery } from "@tanstack/react-query";
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
    ? "http://localhost:5002"
    : "https://from-royce.web.app";

const getAllPost = async (): Promise<BlogPost[]> => {
  const response = await fetch(`${BASE_URL}/api/posts`);
  const data = await response.json();

  const formattedPost = data.post.map((p: BlogPost) => {
    const formattedDate = p.post_date
      ? format(parseISO(p.post_date), "MM/dd/yy")
      : "Invalid date";
    const formattedTime = p.post_time
      ? format(parseISO(`1970-01-01T${p.post_time}Z`), "hh:mm a")
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

const usePosts = (limit: number) => {
  return useQuery({
    queryKey: ["posts", limit],
    queryFn: () => getAllPost(),
  });
};

export { usePosts, getAllPost };
