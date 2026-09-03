"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/projects";

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
        Selected projects: engineering and design treated as one practice.
      </p>
    </header>
  );
}

function ProjectRow({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="reveal group w-full flex items-center gap-6 xl:gap-10 py-7 border-b border-black/8 hover:border-black/20 transition-colors duration-300"
    >
      <div className="hidden xl:flex flex-col items-center gap-1 w-8 flex-shrink-0">
        <span className="font-anonymous text-[7px] tracking-[0.2em] uppercase text-black/20">
          {project.index}
        </span>
      </div>

      <div className="relative w-[80px] h-[56px] xl:w-[110px] xl:h-[72px] rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src={project.src}
          fill
          sizes="(min-width: 1280px) 110px, 80px"
          alt={project.title}
          className="object-cover saturate-0 group-hover:saturate-100 transition duration-500"
        />
      </div>

      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <h2 className="font-anonymous uppercase text-sm xl:text-base tracking-[0.06em] text-black/70 group-hover:text-black/90 transition-colors duration-200">
          <span className="font-cylburn text-lg italic mr-1">{project.title[0]}</span>
          {project.title.slice(1)}
        </h2>
        <p className="font-anonymous text-[9px] tracking-[0.1em] uppercase text-black/35 truncate">
          {project.descriptor}
        </p>
      </div>

      <span className="hidden xl:block font-anonymous text-[8px] tracking-[0.2em] uppercase text-black/25 flex-shrink-0">
        {project.year}
      </span>

      <ArrowUpRight
        size={14}
        className="text-black/20 group-hover:text-black/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0"
      />
    </Link>
  );
}

function WorkCatalogue() {
  return (
    <section className="w-full">
      <WorkHeader />

      <div className="xl:px-24 px-6 pb-16 flex flex-col">
        {PROJECTS.map((project) => (
          <ProjectRow key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}

export default WorkCatalogue;
