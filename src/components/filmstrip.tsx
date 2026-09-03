"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import type { Project } from "@/lib/projects";

// Reused per project as distinct "process frames" cropped from the same
// hero image. Repetition is deliberate, not a placeholder gap.
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

function Filmstrip({
  project,
  theme = "light",
}: {
  project: Project;
  theme?: "light" | "dark";
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const labelCls =
    theme === "dark"
      ? "font-anonymous text-[7px] tracking-[0.25em] uppercase text-white/30"
      : "font-anonymous text-[7px] tracking-[0.25em] uppercase text-black/25";
  const centerLabelCls =
    theme === "dark"
      ? "font-anonymous text-[7px] tracking-[0.25em] uppercase text-white/40"
      : "font-anonymous text-[7px] tracking-[0.25em] uppercase text-black/30";

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
        <span className={labelCls}>Concept</span>
        <span className={centerLabelCls}>{"<< drag to scrub >>"}</span>
        <span className={labelCls}>Shipped {project.year}</span>
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

export default Filmstrip;
