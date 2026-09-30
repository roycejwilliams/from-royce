import Head from "next/head";
import { useRouter } from "next/router";
import ProjectDetail from "../../components/projectDetail";
import type { GetServerSideProps } from "next";
import type { Project } from "../../lib/projects";
import { loadWorkDetail } from "../../lib/server/detail-data";
import { getAdjacentWork, getOtherWork } from "../../lib/work";

type Props = { project: Project | null; projects: Project[]; loadError: boolean };
export const getServerSideProps: GetServerSideProps<Props> = async ({ params, res }) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";
  try {
    const data = await loadWorkDetail(slug);
    if (!data) return { notFound: true };
    return { props: { ...data, loadError: false } };
  } catch {
    res.statusCode = 503;
    res.setHeader("Retry-After", "30");
    return { props: { project: null, projects: [], loadError: true } };
  }
};
export default function WorkDetailPage({ project, projects, loadError }: Props) {
  const router = useRouter();
  if (loadError || !project) {
    return <div className="min-h-[100svh] bg-[#f0ebe5] flex flex-col gap-4 items-center justify-center font-anonymous">
      <p role="alert" className="text-xs text-black/65">This project is temporarily unavailable.</p>
      <button onClick={() => router.reload()} className="text-xs underline">Try again</button>
    </div>;
  }
  const slug = project.slug;
  const next = getAdjacentWork(projects, slug);
  const others = getOtherWork(projects, slug, 4);
  if (!next) return null;

  return (
    <>
      <noscript><style>{`.route-transition, .show { opacity: 1 !important; transform: none !important; }`}</style></noscript>
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
