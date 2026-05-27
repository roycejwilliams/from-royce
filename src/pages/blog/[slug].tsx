import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePost } from "../../hooks/api";

export default function BlogSlugPage() {
  const router = useRouter();
  const slug = typeof router.query.slug === "string" ? router.query.slug : "";

  const { data: post, isPending, isError } = usePost(slug);

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

  if (!slug || isPending) {
    return (
      <div className="min-h-[100svh] bg-[#f0ebe5] flex items-center justify-center">
        <span className="font-anonymous text-[8px] tracking-[0.35em] uppercase text-black/30 animate-pulse">
          Loading
        </span>
      </div>
    );
  }

  if (isError || !post) {
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
            Post not found
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
      <Head>
        <title>{post_title} – Royce</title>
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
