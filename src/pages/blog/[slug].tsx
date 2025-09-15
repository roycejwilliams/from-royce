"use client";
import Head from "next/head";
import Nav from "../../components/nav";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { selectPost } from "../../hooks/api";
import { useParams } from "next/navigation";

export default function BlogSlugPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = selectPost(slug);

  useGSAP(() => {
    if (!post) return;
    gsap.fromTo(
      ".show",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
      }
    );
  }, [post]);

  if (post === null) {
    return (
      <div className="p-8 min-h-screen bg-white font-anonymous relative flex flex-col justify-end items-center overflow-hidden">
        <h1 className="font-extrabold absolute xl:text-[52rem] text-[18rem] w-fit h-fit transform left-[48%] -translate-x-1/2 top-[60%] -translate-y-1/2 z-10 font-cylburn">
          404
        </h1>
        <p className="text-black text-xs text-center mb-52">
          No post found. Please go back to the blog page.
        </p>
      </div>
    );
  }

  const description = post.post_content.slice(0, 150).replace(/\n/g, " ");
  const ogImage = "https://from-royce.com/cover.png";
  const url = `https://from-royce.com/blog/${post.slug}`;

  return (
    <>
      <Head>
        <title>{post?.post_title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${post?.post_title} by Royce`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content={ogImage} />
        <meta name="twitter:title" content={`${post?.post_title} – Royce`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <div className="bg-[#FFF6F6] text-black min-h-[100svh]">
        <Nav />

        <main className="xl:p-24 p-8 font-anonymous">
          <article>
            <header>
              <h1 className="xl:text-6xl text-3xl show font-light uppercase mb-2">
                {post?.post_title}
              </h1>
              <p className="text-sm font-medium show mt-8 uppercase">
                Date: {post?.formatted_date}
              </p>
              <p className="text-sm font-medium show mt-2 uppercase">
                Time: {post?.formatted_time}
              </p>
            </header>

            {post?.post_image && (
              <figure className="xl:w-[50%] w-[100%] h-[65vh] show group hover:scale-105 hover:shadow-2xl hover:shadow-black/50 duration-500 ease-in-out transition-transform relative inset-0 overflow-hidden shadow-xl shadow-black/50 rounded-xl mx-auto my-8">
                <Image
                  src={post?.post_image}
                  alt={post?.post_title}
                  fill
                  priority
                  className="mb-6 rounded-lg w-full h-full object-cover absolute transform transition duration-500 ease-in-out group-hover:scale-105"
                />
              </figure>
            )}

            <section>
              <p className="whitespace-pre-line mt-16 tracking-widest leading-loose font-anonymous font-light text-sm md:text-base">
                {post?.post_content}
              </p>
            </section>
          </article>
        </main>
      </div>
    </>
  );
}
