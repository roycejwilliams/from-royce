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

export const PROJECTS: Project[] = [
  {
    index: "001",
    slug: "vantage",
    title: "Vantage",
    descriptor: "A dashboard rebuilt around what people actually decide from it.",
    role: "Product Engineering",
    tags: ["Dashboards", "Product"],
    year: "2025",
    src: "/images/image5.jpg",
  },
  {
    index: "002",
    slug: "ledger",
    title: "Ledger",
    descriptor: "Financial tooling made legible without dumbing it down.",
    role: "Full-Stack Engineering",
    tags: ["Fintech", "Full-Stack"],
    year: "2025",
    src: "/images/image6.jpg",
  },
  {
    index: "003",
    slug: "aperture",
    title: "Aperture",
    descriptor: "A media pipeline that treats compression as a design decision.",
    role: "Systems Engineering",
    tags: ["Media", "Systems"],
    year: "2024",
    src: "/images/image7.jpg",
  },
  {
    index: "004",
    slug: "northline",
    title: "Northline",
    descriptor: "Wayfinding rebuilt around trust instead of just routing.",
    role: "Product Design & Engineering",
    tags: ["Navigation", "Product Design"],
    year: "2024",
    src: "/images/image8.jpg",
  },
  {
    index: "005",
    slug: "threadwork",
    title: "Threadwork",
    descriptor: "Distributed systems, stitched into something a team can maintain.",
    role: "Backend Architecture",
    tags: ["Distributed Systems", "Backend"],
    year: "2023",
    src: "/images/image23.jpg",
  },
  {
    index: "006",
    slug: "signal",
    title: "Signal",
    descriptor: "Real-time data made calm instead of noisy.",
    role: "Frontend Engineering",
    tags: ["Realtime", "Frontend"],
    year: "2023",
    src: "/images/image24.jpg",
  },
  {
    index: "007",
    slug: "foundry",
    title: "Foundry",
    descriptor: "Internal tooling built to disappear into the workflow.",
    role: "Design Systems",
    tags: ["Internal Tools", "Design Systems"],
    year: "2022",
    src: "/images/image25.jpg",
  },
  {
    index: "008",
    slug: "co",
    title: "Co",
    descriptor:
      "A genuine, ongoing life companion, built to understand people and act on that over time.",
    role: "Co-founder & CTO",
    tags: ["Companion AI", "Event Curation"],
    year: "2026",
    src: "/images/image.jpg",
    stack: "Voice infra, relevance pipeline, event curation",
    status: "Active, running live via Co-branded events",
  },
];

export function getProjectBySlug(slug: string): Project | null {
  return PROJECTS.find((p) => p.slug === slug) ?? null;
}

export function getAdjacentProject(slug: string): Project | null {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  if (i === -1) return null;
  return PROJECTS[(i + 1) % PROJECTS.length];
}

export function getOtherProjects(slug: string, count: number): Project[] {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  if (i === -1) return PROJECTS.slice(0, count);
  const rest = [...PROJECTS.slice(i + 1), ...PROJECTS.slice(0, i)];
  return rest.slice(0, count);
}
