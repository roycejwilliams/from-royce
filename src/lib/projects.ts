export type Project = {
  index: string;
  slug: string;
  title: string;
  descriptor: string;
  role: string;
  tags: string[];
  year: string;
  src: string;
  liveUrl?: string;
  stack?: string;
  status?: string;
};
