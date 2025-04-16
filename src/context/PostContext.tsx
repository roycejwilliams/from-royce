import { createContext, useContext, useState, ReactNode } from "react";

type Post = {
  slug: string;
  post_title: string;
  post_content: string;
  post_image?: string;
  formatted_date?: string;
  formatted_time?: string;
};

type PostContextType = {
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error("usePostContext must be used within PostProvider");
  return context;
};

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <PostContext.Provider value={{ selectedPost, setSelectedPost }}>
      {children}
    </PostContext.Provider>
  );
};
