import { BASE_URL, toSlug } from "./api";
import type { Project } from "./projects";

function formatProject(p: Record<string, unknown>, index: number): Project {
  return {
    index: String(index + 1).padStart(3, "0"),
    slug: (p.slug as string) || toSlug(p.title as string),
    title: p.title as string,
    descriptor: p.descriptor as string,
    role: p.role as string,
    tags: (p.tags as string[]) || [],
    year: p.year as string,
    src: p.src as string,
    liveUrl: (p.live_url as string | null) || undefined,
    stack: (p.stack as string | null) || undefined,
    status: (p.status as string | null) || undefined,
  };
}

export async function getAllWork(): Promise<Project[]> {
  const res = await fetch(`${BASE_URL}/api/work`);
  if (!res.ok) throw new Error(`Failed to fetch work: ${res.status}`);
  const data = await res.json();
  return (data.project as Record<string, unknown>[]).map(formatProject);
}

export async function getWork(slug: string): Promise<Project | null> {
  const all = await getAllWork();
  return all.find((p) => p.slug === slug) ?? null;
}

export function getAdjacentWork(all: Project[], slug: string): Project | null {
  const i = all.findIndex((p) => p.slug === slug);
  if (i === -1) return null;
  return all[(i + 1) % all.length];
}

export function getOtherWork(all: Project[], slug: string, count: number): Project[] {
  const i = all.findIndex((p) => p.slug === slug);
  if (i === -1) return all.slice(0, count);
  const rest = [...all.slice(i + 1), ...all.slice(0, i)];
  return rest.slice(0, count);
}

export async function createWork(data: {
  title: string;
  descriptor: string;
  role: string;
  tags: string[];
  year: string;
  src: string;
  liveUrl?: string | null;
  stack?: string | null;
  status?: string | null;
}): Promise<Project> {
  const res = await fetch(`${BASE_URL}/api/work`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create project");
  const raw = await res.json();
  return formatProject(raw, 0);
}
