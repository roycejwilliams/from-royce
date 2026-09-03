require("dotenv").config({ path: require("path").resolve(__dirname, "../../.env.local") });
const pool = require("../src/db/db");
const { toSlug } = require("../src/lib/slug");

// Exact current values from src/lib/projects.ts, preserved as the seed data
// so the catalogue does not go empty when the frontend cuts over to the DB.
const SEED_PROJECTS = [
  {
    title: "Vantage",
    descriptor: "A dashboard rebuilt around what people actually decide from it.",
    role: "Product Engineering",
    tags: ["Dashboards", "Product"],
    year: "2025",
    src: "/images/image5.jpg",
  },
  {
    title: "Ledger",
    descriptor: "Financial tooling made legible without dumbing it down.",
    role: "Full-Stack Engineering",
    tags: ["Fintech", "Full-Stack"],
    year: "2025",
    src: "/images/image6.jpg",
  },
  {
    title: "Aperture",
    descriptor: "A media pipeline that treats compression as a design decision.",
    role: "Systems Engineering",
    tags: ["Media", "Systems"],
    year: "2024",
    src: "/images/image7.jpg",
  },
  {
    title: "Northline",
    descriptor: "Wayfinding rebuilt around trust instead of just routing.",
    role: "Product Design & Engineering",
    tags: ["Navigation", "Product Design"],
    year: "2024",
    src: "/images/image8.jpg",
  },
  {
    title: "Threadwork",
    descriptor: "Distributed systems, stitched into something a team can maintain.",
    role: "Backend Architecture",
    tags: ["Distributed Systems", "Backend"],
    year: "2023",
    src: "/images/image23.jpg",
  },
  {
    title: "Signal",
    descriptor: "Real-time data made calm instead of noisy.",
    role: "Frontend Engineering",
    tags: ["Realtime", "Frontend"],
    year: "2023",
    src: "/images/image24.jpg",
  },
  {
    title: "Foundry",
    descriptor: "Internal tooling built to disappear into the workflow.",
    role: "Design Systems",
    tags: ["Internal Tools", "Design Systems"],
    year: "2022",
    src: "/images/image25.jpg",
  },
  {
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

async function main() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS project (
      project_id SERIAL PRIMARY KEY,
      slug VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      descriptor TEXT NOT NULL,
      role VARCHAR(255) NOT NULL,
      tags TEXT[] NOT NULL DEFAULT '{}',
      year VARCHAR(10) NOT NULL,
      src VARCHAR(500) NOT NULL,
      live_url VARCHAR(500),
      stack TEXT,
      status TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
  await pool.query(
    "CREATE UNIQUE INDEX IF NOT EXISTS project_slug_idx ON project (slug)"
  );

  const { rows: existing } = await pool.query("SELECT count(*) FROM project");
  if (Number(existing[0].count) > 0) {
    console.log(`project table already has ${existing[0].count} row(s), skipping seed.`);
    await pool.end();
    return;
  }

  for (const p of SEED_PROJECTS) {
    await pool.query(
      `INSERT INTO project (slug, title, descriptor, role, tags, year, src, stack, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        toSlug(p.title),
        p.title,
        p.descriptor,
        p.role,
        p.tags,
        p.year,
        p.src,
        p.stack || null,
        p.status || null,
      ]
    );
  }
  console.log(`Seeded ${SEED_PROJECTS.length} project(s).`);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
