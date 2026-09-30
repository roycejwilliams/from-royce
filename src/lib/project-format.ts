import type { Project } from "./projects";
import { toSlug } from "./post-format";

export function formatProject(p: Record<string, unknown>, index: number): Project {
  return {
    index: String(index + 1).padStart(3, "0"),
    slug: (p.slug as string) || toSlug(p.title as string),
    title: p.title as string,
    descriptor: p.descriptor as string,
    role: p.role as string,
    tags: (p.tags as string[]) || [],
    year: p.year as string,
    src: p.src as string,
    liveUrl: (p.live_url as string | null) || null,
    stack: (p.stack as string | null) || null,
    status: (p.status as string | null) || null,
  };
}
