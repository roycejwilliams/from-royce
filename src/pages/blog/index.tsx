import { useEffect, useRef } from "react";
import Nav from "../../components/nav";
import Post from "../../components/post";
import Head from "next/head";
import type LocomotiveScroll from "locomotive-scroll";

interface Blog {
  post_id: number;
  post_title: string;
  post_content: string;
  post_image: string | null;
  post_time: string;
}

function Blog() {
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<LocomotiveScroll | null>(null);

  const initializeLocomotive = async () => {
    const LocomotiveScroll = (await import("locomotive-scroll")).default;
    const instance = new LocomotiveScroll();
    scrollRef.current = instance;
  };

  useEffect(() => {
    return () => {
      if (scrollRef.current) {
        scrollRef.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>Ethos – From Royce</title>
        <meta name="description" content="Read my insights, ideas, and stories." />
        <meta property="og:title" content="Blog – Royce" />
        <meta property="og:description" content="Read my insights, ideas, and stories." />
        <meta property="og:image" content="https://from-royce.com/cover.png" />
        <meta property="og:url" content="https://from-royce.com/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://from-royce.com/cover.png" />
      </Head>

      <aside
        ref={backgroundRef}
        className="w-full gradient-bg-2 min-h-[100svh] overflow-x-hidden"
        aria-hidden="true"
      >

      <Nav />

      <main>
        {/* Title Section */}
        <header
          className="xl:px-24 px-8 xl:mt-32 mt-20 flex flex-col gap-y-4 xl:gap-x-32 text-white"
          aria-labelledby="ethos-heading"
        >
          <h1
            id="ethos-heading"
            className="tracking-[0.2em] z-30 leading-[1.2em] py-8 font-anonymous gap-x-8 xl:text-xl text-sm uppercase"
          >
            <span className="font-cylburn xl:text-8xl text-6xl">F</span>rom
            <span className="font-cylburn xl:text-8xl text-6xl">R</span>oyce
          </h1>
          <p className="xl:text-base text-sm font-anonymous z-30 uppercase tracking-[0.2em]">
            frames of mind.
          </p>
        </header>

        {/* Blog Posts */}
        <section aria-labelledby="posts-heading">
          {/* You can add a visually hidden label if needed */}
          <h2 id="posts-heading" className="sr-only">
            Blog Posts
          </h2>
          <Post onReady={initializeLocomotive} />
        </section>
      </main>
    </aside>

    </>
  );
}

export default Blog;
