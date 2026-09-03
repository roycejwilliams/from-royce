import Head from "next/head";
import type { GetStaticPaths, GetStaticProps } from "next";
import ProjectDetail from "../../components/projectDetail";
import {
  PROJECTS,
  getProjectBySlug,
  getAdjacentProject,
  getOtherProjects,
  type Project,
} from "@/lib/projects";

type Props = {
  project: Project;
  next: Project;
  others: Project[];
};

export default function WorkDetailPage({ project, next, others }: Props) {
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: PROJECTS.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const project = getProjectBySlug(slug);
  if (!project) return { notFound: true };

  const next = getAdjacentProject(slug);
  if (!next) return { notFound: true };

  return {
    props: {
      project,
      next,
      others: getOtherProjects(slug, 4),
    },
  };
};
