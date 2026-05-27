import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllPosts, getPost, createPost } from "@/lib/api";
import type { BlogPost } from "@/types";

export type { BlogPost };

export const usePosts = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });

export const usePost = (slug: string) =>
  useQuery({
    queryKey: ["post", slug],
    queryFn: () => getPost(slug),
    enabled: !!slug,
  });

export const useCreatePost = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["posts"] }),
  });
};

export { getAllPosts };
