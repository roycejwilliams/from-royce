import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { GetServerSideProps } from "next";
import type { BlogPost } from "../../types";
import { loadBlogDetail } from "../../lib/server/detail-data";

type Props = { post: BlogPost | null; loadError: boolean };
export const getServerSideProps: GetServerSideProps<Props> = async ({ params, res }) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";
  try {
    const post = await loadBlogDetail(slug);
    if (!post) return { notFound: true };
    return { props: { post, loadError: false } };
  } catch {
    res.statusCode = 503;
    res.setHeader("Retry-After", "30");
    return { props: { post: null, loadError: true } };
  }
};
export default function BlogSlugPage({ post, loadError }: Props) {
  const router = useRouter();
  useGSAP(() => {
    if (!post) return;
    gsap.fromTo(
      ".show",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        delay: 0.1,
      },
    );
  }, [post]);

  if (loadError || !post) {
    return <div className="min-h-[100svh] bg-[#f0ebe5] flex flex-col gap-4 items-center justify-center font-anonymous">
      <p role="alert" className="text-xs text-black/65">This post is temporarily unavailable.</p>
      <button onClick={() => router.reload()} className="text-xs underline">Try again</button>
    </div>;
  }

  const {
    post_title,
    post_content,
    post_image,
    formatted_date,
    formatted_time,
    slug: postSlug,
  } = post;
  const description = post_content.slice(0, 150).replace(/\n/g, " ");
  const ogImage = "https://from-royce.com/cover.png";
  const url = `https://from-royce.com/blog/${postSlug}`;

  return (
    <>
      <noscript><style>{`.route-transition, .show { opacity: 1 !important; transform: none !important; }`}</style></noscript>
      <Head>
        <title>{`${post_title} - Royce`}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${post_title} by Royce`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post_title} – Royce`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <div className="bg-[#f0ebe5] text-black min-h-[100svh]">
        <main className="xl:px-24 px-6 pb-24 pt-8 font-anonymous">
          <article>
            {/* Header */}
            <header className="show flex flex-col gap-3 max-w-2xl xl:pt-12 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-4 h-px bg-black/20" />
                <p className="font-anonymous text-[8px] uppercase tracking-[0.35em] text-black/30">
                  {formatted_date} &nbsp;·&nbsp; {formatted_time}
                </p>
              </div>
              <h1 className="font-anonymous font-light uppercase leading-[1.15] tracking-[0.06em] xl:text-5xl text-2xl text-black/85">
                {post_title}
              </h1>
            </header>

            {/* Cover image */}
            {post_image && (
              <figure className="show w-full xl:w-[60%] h-[50vh] xl:h-[65vh] relative overflow-hidden rounded-2xl my-12 mx-auto">
                <Image
                  src={post_image}
                  alt={post_title}
                  fill
                  priority
                  sizes="(min-width: 1280px) 60vw, 100vw"
                  className="object-cover transition duration-700 ease-in-out hover:scale-[1.02]"
                />
              </figure>
            )}

            {/* Body */}
            <section className="show max-w-xl mx-auto">
              <p className="whitespace-pre-line font-anonymous font-light text-xs xl:text-sm leading-[2.4] tracking-[0.06em] text-black/60">
                {post_content}
              </p>
            </section>
          </article>
        </main>
      </div>
    </>
  );
}
