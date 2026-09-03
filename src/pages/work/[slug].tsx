import Head from "next/head";
import { useRouter } from "next/router";
import ProjectDetail from "../../components/projectDetail";
import { useWorks } from "../../hooks/work";
import { getAdjacentWork, getOtherWork } from "../../lib/work";

export default function WorkDetailPage() {
  const router = useRouter();
  const slug = typeof router.query.slug === "string" ? router.query.slug : "";

  const { data: projects, isPending, isError } = useWorks();
  const project = projects?.find((p) => p.slug === slug) ?? null;

  if (!slug || isPending) {
    return (
      <div className="min-h-[100svh] bg-[#f0ebe5] flex items-center justify-center">
        <span className="font-anonymous text-[8px] tracking-[0.35em] uppercase text-black/30 animate-pulse">
          Loading
        </span>
      </div>
    );
  }

  if (isError || !project || !projects) {
    return (
      <div className="min-h-[100svh] bg-[#f0ebe5] font-anonymous relative flex flex-col justify-center items-center overflow-hidden xl:px-24 px-8">
        <span
          className="font-cylburn absolute select-none pointer-events-none text-black/[0.04]"
          style={{ fontSize: "clamp(12rem, 40vw, 52rem)", lineHeight: 1 }}
        >
          404
        </span>
        <div className="relative z-10 flex flex-col items-center gap-4">
          <p className="font-anonymous uppercase text-[9px] tracking-[0.35em] text-black/35">
            Project not found
          </p>
          <button
            onClick={() => router.back()}
            className="font-anonymous uppercase text-[8px] tracking-[0.25em] px-5 py-2.5 border border-black/15 rounded-full text-black/45 hover:text-black/80 hover:border-black/30 transition-all duration-300 cursor-pointer"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const next = getAdjacentWork(projects, slug);
  const others = getOtherWork(projects, slug, 4);
  if (!next) return null;

  return (
    <>
      <Head>
        <title>{`${project.title} – Work – From Royce`}</title>
        <meta name="description" content={project.descriptor} />
        <meta property="og:title" content={`${project.title} – From Royce`} />
        <meta property="og:description" content={project.descriptor} />
        <meta property="og:image" content="https://from-royce.com/cover.png" />
        <meta
          property="og:url"
          content={`https://from-royce.com/work/${project.slug}`}
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${project.title} – From Royce`} />
        <meta name="twitter:description" content={project.descriptor} />
        <meta name="twitter:image" content="https://from-royce.com/cover.png" />
      </Head>
      <ProjectDetail project={project} next={next} others={others} />
    </>
  );
}
