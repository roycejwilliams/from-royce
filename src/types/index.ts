export type BlogPost = {
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
