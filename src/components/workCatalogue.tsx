"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Project = {
  index: string;
  title: string;
  descriptor: string;
  role: string;
  year: string;
  src: string;
};

const PROJECTS: Project[] = [
  {
    index: "001",
    title: "Vantage",
    descriptor: "A dashboard rebuilt around what people actually decide from it.",
    role: "Product Engineering",
    year: "2025",
    src: "/images/image5.jpg",
  },
  {
    index: "002",
    title: "Ledger",
    descriptor: "Financial tooling made legible without dumbing it down.",
    role: "Full-Stack Engineering",
    year: "2025",
    src: "/images/image6.jpg",
  },
  {
    index: "003",
    title: "Aperture",
    descriptor: "A media pipeline that treats compression as a design decision.",
    role: "Systems Engineering",
    year: "2024",
    src: "/images/image7.jpg",
  },
  {
    index: "004",
    title: "Northline",
    descriptor: "Wayfinding rebuilt around trust instead of just routing.",
    role: "Product Design & Engineering",
    year: "2024",
    src: "/images/image8.jpg",
  },
  {
    index: "005",
    title: "Threadwork",
    descriptor: "Distributed systems, stitched into something a team can maintain.",
    role: "Backend Architecture",
    year: "2023",
    src: "/images/image23.jpg",
  },
  {
    index: "006",
    title: "Signal",
    descriptor: "Real-time data made calm instead of noisy.",
    role: "Frontend Engineering",
    year: "2023",
    src: "/images/image24.jpg",
  },
  {
    index: "007",
    title: "Foundry",
    descriptor: "Internal tooling built to disappear into the workflow.",
    role: "Design Systems",
    year: "2022",
    src: "/images/image25.jpg",
  },
];

// Reused per project as distinct "process frames" cropped from the same
// hero image — repetition is deliberate (see task notes), not a placeholder gap.
const FRAME_POSITIONS = [
  "20% 15%",
  "70% 10%",
  "50% 50%",
  "10% 80%",
  "85% 40%",
  "35% 70%",
  "60% 25%",
  "5% 45%",
];

function Filmstrip({ project }: { project: Project }) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const el = stripRef.current;
    if (!el) return;
    const itemWidth = el.scrollWidth / FRAME_POSITIONS.length;
    const idx = Math.round(el.scrollLeft / itemWidth);
    setActive(Math.min(FRAME_POSITIONS.length - 1, Math.max(0, idx)));
  };

  const scrollToFrame = (i: number) => {
    const el = stripRef.current;
    if (!el) return;
    const itemWidth = el.scrollWidth / FRAME_POSITIONS.length;
    el.scrollTo({ left: itemWidth * i, behavior: "smooth" });
  };

  return (
    <div className="mt-10 max-w-2xl mx-auto w-full">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="font-anonymous text-[7px] tracking-[0.25em] uppercase text-black/25">
          Concept
        </span>
        <span className="font-anonymous text-[7px] tracking-[0.25em] uppercase text-black/30">
          {"<< drag to scrub >>"}
        </span>
        <span className="font-anonymous text-[7px] tracking-[0.25em] uppercase text-black/25">
          Shipped {project.year}
        </span>
      </div>
      <div
        ref={stripRef}
        onScroll={handleScroll}
        style={{ overscrollBehaviorX: "contain" }}
        className="flex gap-2 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {FRAME_POSITIONS.map((pos, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToFrame(i)}
            aria-label={`Frame ${i + 1} of ${FRAME_POSITIONS.length}`}
            aria-current={i === active}
            className={`relative flex-shrink-0 w-14 h-14 rounded-md overflow-hidden snap-center border transition-all duration-300 ${
              i === active
                ? "border-black/40 opacity-100"
                : "border-transparent opacity-40 hover:opacity-70"
            }`}
          >
            <Image
              src={project.src}
              alt=""
              fill
              sizes="56px"
              style={{ objectPosition: pos }}
              className={`object-cover transition duration-500 ${
                i === active ? "saturate-100" : "saturate-0"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function ProjectCase({
  project,
  next,
  registerRef,
}: {
  project: Project;
  next: Project | null;
  registerRef: (el: HTMLElement | null) => void;
}) {
  const slug = project.title.toLowerCase();

  return (
    <section
      ref={registerRef}
      data-title={project.title}
      className="reveal relative min-h-[92vh] flex flex-col justify-center xl:px-24 px-6 py-24 border-t border-black/8 first:border-t-0"
    >
      {/* Artifact card — browser-chrome frame around the work */}
      <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-black/10 bg-white">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-black/8 bg-[#f0ebe5]">
          <div className="flex gap-1.5 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-black/15" />
            <span className="w-2 h-2 rounded-full bg-black/15" />
            <span className="w-2 h-2 rounded-full bg-black/15" />
          </div>
          <div className="flex-1 flex justify-center min-w-0">
            <span className="font-anonymous text-[8px] tracking-[0.2em] uppercase text-black/30 bg-black/[0.03] rounded-full px-3 py-1 truncate">
              {slug}.work
            </span>
          </div>
          <span className="font-anonymous text-[7px] tracking-[0.25em] uppercase text-black/25 flex-shrink-0">
            {project.index}
          </span>
        </div>

        <div className="relative w-full aspect-[16/10]">
          <Image
            src={project.src}
            alt={project.title}
            fill
            sizes="(min-width: 1280px) 672px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Metadata + copy */}
      <div className="mt-8 flex flex-col items-center text-center gap-3 max-w-lg mx-auto">
        <div className="flex items-center gap-3">
          <span className="font-anonymous text-[7px] tracking-[0.3em] uppercase text-black/30">
            {project.role}
          </span>
          <span className="w-1 h-1 rounded-full bg-black/15" />
          <span className="font-anonymous text-[7px] tracking-[0.3em] uppercase text-black/30">
            {project.year}
          </span>
        </div>

        <h2 className="font-anonymous uppercase text-black/85 leading-none">
          <span className="font-cylburn text-5xl xl:text-6xl leading-[0.85]">
            {project.title[0]}
          </span>
          <span className="text-lg xl:text-2xl tracking-[0.05em]">
            {project.title.slice(1)}
          </span>
        </h2>

        <p className="font-anonymous text-[10px] tracking-[0.08em] uppercase text-black/45 leading-[1.9]">
          {project.descriptor}
        </p>
      </div>

      <Filmstrip project={project} />

      {next && (
        <div className="hidden xl:block absolute bottom-8 right-24 font-anonymous text-[7px] tracking-[0.25em] uppercase text-black/20">
          Next — {next.title}
        </div>
      )}
    </section>
  );
}

type InfoColumn = {
  label: string;
  body: string;
};

const CO_COLUMNS: InfoColumn[] = [
  {
    label: "What Co is",
    body: "A genuine, ongoing life companion — not a matchmaking app, not an event app. Built to understand the person using it and the people around them, then act on that understanding over time: surfacing who's worth meeting, when to follow up, what actually matters to them. Its near-term expression is in-person event curation — Co-branded events where it decides who should meet whom in the room — but the premise is the ongoing companionship, not any single feature.",
  },
  {
    label: "My role",
    body: "Co-founder & CTO. Built the full stack end-to-end — conversational and voice infrastructure, the profile and relevance intelligence pipeline, and the event curation system — from zero to production.",
  },
  {
    label: "Stack & systems",
    body: "Voice and conversation infrastructure, a profile/relevance intelligence pipeline, and an in-room event curation system, built as one full-stack product rather than separate hand-offs.",
  },
  {
    label: "Status",
    body: "Active — in-person curation running live through Co-branded events.",
  },
];

function CoCaseStudy() {
  return (
    <section className="reveal xl:px-24 px-6 py-24 border-t border-black/8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-4 h-px bg-black/20" />
          <span className="font-anonymous text-[7px] tracking-[0.35em] uppercase text-black/30">
            Featured — CoPatible
          </span>
        </div>

        <h2 className="font-anonymous uppercase text-black/85 leading-none mb-12">
          <span className="font-cylburn text-6xl xl:text-7xl leading-[0.85]">
            C
          </span>
          <span className="text-2xl xl:text-4xl tracking-[0.05em]">o</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-10 gap-y-10">
          {CO_COLUMNS.map((col) => (
            <div key={col.label} className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-px bg-black/20" />
                <span className="font-anonymous text-[7px] tracking-[0.3em] uppercase text-black/30">
                  {col.label}
                </span>
              </div>
              <p className="font-anonymous text-[11px] tracking-[0.03em] leading-[1.9] text-black/55">
                {col.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkHeader() {
  return (
    <header className="xl:px-24 px-6 pt-36 xl:pt-44 pb-16 xl:pb-20">
      <div className="flex items-center gap-3 mb-6 font-anonymous text-[8px] tracking-[0.35em] uppercase text-black/30">
        <span>Work</span>
        <span className="text-black/15">/</span>
        <span className="text-black/50">Catalogue</span>
      </div>
      <h1 className="font-anonymous uppercase text-black/85 leading-[0.9]">
        <span className="font-cylburn text-[5rem] xl:text-[9rem] leading-[0.85]">
          W
        </span>
        <span className="text-3xl xl:text-6xl tracking-[0.04em]">ork</span>
      </h1>
      <p className="font-anonymous uppercase text-[9px] xl:text-[10px] tracking-[0.25em] text-black/35 mt-6 max-w-md">
        Selected projects — engineering and design treated as one practice.
      </p>
    </header>
  );
}

function WorkCatalogue() {
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const sections = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.indexOf(entry.target as HTMLElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const activeProject = PROJECTS[activeIndex];

  return (
    <section className="w-full relative">
      <WorkHeader />

      <div className="flex flex-col">
        {PROJECTS.map((project, i) => (
          <ProjectCase
            key={project.index}
            project={project}
            next={PROJECTS[i + 1] ?? null}
            registerRef={(el) => {
              sectionRefs.current[i] = el;
            }}
          />
        ))}
      </div>

      <CoCaseStudy />

      {/* Persistent wayfinding — echoes the reference's breadcrumb, but as a
          fixed readout that tracks which case study is in view. */}
      <div className="fixed bottom-6 left-8 xl:left-24 z-30 flex items-center gap-2 font-anonymous text-[7px] tracking-[0.25em] uppercase text-black/30 pointer-events-none">
        <span>Work</span>
        <span className="text-black/15">/</span>
        <span>Catalogue</span>
        <span className="text-black/15">/</span>
        <span className="text-black/60">{activeProject.title}</span>
        <span className="ml-2 text-black/20">
          {String(activeIndex + 1).padStart(2, "0")} —{" "}
          {String(PROJECTS.length).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}

export default WorkCatalogue;
