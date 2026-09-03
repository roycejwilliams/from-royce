"use client";
import Image from "next/image";
import Link from "next/link";
import { Bookmark, ArrowUpRight } from "lucide-react";
import Filmstrip from "./filmstrip";
import type { Project } from "@/lib/projects";

function ChromeCard({
  project,
  className = "",
  imageSizes,
}: {
  project: Project;
  className?: string;
  imageSizes: string;
}) {
  return (
    <div
      className={`w-full rounded-2xl overflow-hidden border border-black/10 bg-white ${className}`}
    >
      <div className="flex items-center gap-3 px-4 py-3 border-b border-black/8 bg-[#f0ebe5]">
        <div className="flex gap-1.5 flex-shrink-0">
          <span className="w-2 h-2 rounded-full bg-black/15" />
          <span className="w-2 h-2 rounded-full bg-black/15" />
          <span className="w-2 h-2 rounded-full bg-black/15" />
        </div>
        <div className="flex-1 flex justify-center min-w-0">
          <span className="font-anonymous text-[8px] tracking-[0.2em] uppercase text-black/30 bg-black/[0.03] rounded-full px-3 py-1 truncate">
            {project.slug}.work
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
          sizes={imageSizes}
          className="object-cover"
        />
      </div>
    </div>
  );
}

function ProjectDetail({
  project,
  next,
  others,
}: {
  project: Project;
  next: Project;
  others: Project[];
}) {
  return (
    <div className="min-h-[100svh] bg-[#f0ebe5] text-black/85 overflow-x-hidden">
      {/* Top breadcrumb bar */}
      <div className="xl:px-24 px-6 pt-8 flex items-center justify-between">
        <div className="flex items-center gap-3 font-anonymous text-[8px] tracking-[0.3em] uppercase text-black/35">
          <Link href="/work" className="hover:text-black/70 transition-colors">
            Work
          </Link>
          <span className="text-black/15">/</span>
          <Link href="/work" className="hover:text-black/70 transition-colors">
            Catalogue
          </Link>
          <span className="text-black/15">/</span>
          <span className="text-black/70">{project.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Save project"
            className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center text-black/40 hover:text-black/80 hover:border-black/30 transition-colors"
          >
            <Bookmark size={13} />
          </button>
          {project.liveUrl ? (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open live site"
              className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center text-black/40 hover:text-black/80 hover:border-black/30 transition-colors"
            >
              <ArrowUpRight size={13} />
            </Link>
          ) : (
            <span
              aria-hidden="true"
              className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-black/15"
            >
              <ArrowUpRight size={13} />
            </span>
          )}
        </div>
      </div>

      <div className="xl:px-24 px-6 pt-14 xl:pt-16 flex flex-col xl:flex-row gap-12 xl:gap-16">
        {/* Sidebar */}
        <aside className="xl:w-64 flex-shrink-0 flex flex-col gap-10">
          <h1 className="font-anonymous uppercase leading-none">
            <span className="font-cylburn text-6xl leading-[0.85] block mb-1">
              {project.title[0]}
            </span>
            <span className="text-2xl tracking-[0.05em] text-black/90">
              {project.title.slice(1)}
            </span>
          </h1>

          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start font-anonymous text-[9px] tracking-[0.2em] uppercase text-black/50 border border-black/15 rounded-full px-4 py-2.5 hover:text-black/85 hover:border-black/30 transition-colors"
            >
              {project.slug}.work
              <ArrowUpRight size={11} />
            </Link>
          )}

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="font-anonymous text-[8px] tracking-[0.3em] uppercase text-black/30">
                Tags
              </span>
              <span className="font-anonymous text-[10px] tracking-[0.05em] text-black/60">
                {project.tags.join(" · ")}
              </span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="font-anonymous text-[8px] tracking-[0.3em] uppercase text-black/30">
                Role
              </span>
              <span className="font-anonymous text-[10px] tracking-[0.05em] text-black/60">
                {project.role}
              </span>
            </div>
            {project.stack && (
              <div className="flex flex-col gap-1.5">
                <span className="font-anonymous text-[8px] tracking-[0.3em] uppercase text-black/30">
                  Stack
                </span>
                <span className="font-anonymous text-[10px] tracking-[0.05em] text-black/60">
                  {project.stack}
                </span>
              </div>
            )}
            {project.status && (
              <div className="flex flex-col gap-1.5">
                <span className="font-anonymous text-[8px] tracking-[0.3em] uppercase text-black/30">
                  Status
                </span>
                <span className="font-anonymous text-[10px] tracking-[0.05em] text-black/60">
                  {project.status}
                </span>
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <span className="font-anonymous text-[8px] tracking-[0.3em] uppercase text-black/30">
                Published
              </span>
              <span className="font-anonymous text-[10px] tracking-[0.05em] text-black/60">
                {project.year}
              </span>
            </div>
          </div>
        </aside>

        {/* Main card + peek of next project */}
        <div className="flex-1 min-w-0 relative flex items-start">
          <div className="w-full max-w-2xl mx-auto xl:mx-0">
            <ChromeCard
              project={project}
              imageSizes="(min-width: 1280px) 672px, 100vw"
            />
            <Filmstrip project={project} theme="light" />
          </div>

          <Link
            href={`/work/${next.slug}`}
            aria-label={`View next project: ${next.title}`}
            className="hidden xl:block absolute left-[calc(100%-4rem)] top-10 w-56 opacity-50 hover:opacity-85 transition-opacity duration-300"
          >
            <ChromeCard
              project={next}
              className="scale-95 origin-top-left pointer-events-none"
              imageSizes="224px"
            />
          </Link>
        </div>
      </div>

      {/* Mobile-only next-project affordance (the edge "peek" is desktop-only) */}
      <div className="xl:hidden xl:px-24 px-6 pt-10">
        <Link
          href={`/work/${next.slug}`}
          className="font-anonymous text-[9px] tracking-[0.25em] uppercase text-black/40 hover:text-black/70 transition-colors"
        >
          Next project: {next.title} →
        </Link>
      </div>

      {/* More work */}
      <div className="mt-20 border-t border-black/10 xl:px-24 px-6 py-16">
        <span className="font-anonymous text-[8px] tracking-[0.3em] uppercase text-black/30 block mb-8">
          More work
        </span>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
          {others.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="group flex flex-col gap-3"
            >
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={p.src}
                  alt={p.title}
                  fill
                  sizes="(min-width: 1280px) 20vw, 45vw"
                  className="object-cover saturate-0 group-hover:saturate-100 transition duration-500"
                />
              </div>
              <span className="font-anonymous text-[9px] tracking-[0.15em] uppercase text-black/50 group-hover:text-black/85 transition-colors">
                {p.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="xl:px-24 px-6 pb-12">
        <Link
          href="/work"
          className="font-anonymous text-[8px] tracking-[0.25em] uppercase text-black/25 hover:text-black/60 transition-colors"
        >
          ← Back to catalogue
        </Link>
      </div>
    </div>
  );
}

export default ProjectDetail;
