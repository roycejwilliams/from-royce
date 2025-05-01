import { useEffect, useRef } from "react";
import Nav from "../../components/nav";
import Post from "../../components/post";
import Head from "next/head";
import type LocomotiveScroll from "locomotive-scroll";


interface Blog {
  post_id: number; // Matches SERIAL PRIMARY KEY
  post_title: string; // Matches VARCHAR(500) NOT NULL
  post_content: string; // Matches TEXT NOT NULL
  post_image: string | null; // Matches VARCHAR(255), nullable
  post_time: string; // Matches TIMESTAMP DEFAULT CURRENT_TIMESTAMP
}

function Blog() {
   const backgroundRef = useRef<HTMLDivElement | null>(null);
   const scrollRef = useRef<LocomotiveScroll | null>(null);
 
   const initializeLocomotive = async () => {
    const LocomotiveScroll = (await import('locomotive-scroll')).default;
    const instance = new LocomotiveScroll({
    });
    scrollRef.current = instance;
  };

  // Cleanup locomotive scroll
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
        <meta name="description" content="Read my insights, ideas, and stories.." />
        <meta property="og:title" content="Blog – Royce" />
        <meta property="og:description" content="Read my insights, ideas, and stories." />
        <meta property="og:image" content="https://from-royce.com/cover.png" />
        <meta property="og:url" content="https://from-royce.com/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://from-royce.com/cover.png" />
      </Head>
    <section   
    ref={backgroundRef} className="w-full gradient-bg-2 min-h-[100svh] overflow-x-hidden">
      <Nav />
      {/* Title */}
      <div className=" xl:px-24 px-8  xl:mt-32 mt-20  flex flex-col  gap-y-4 xl:gap-x-32 text-white">
        <h1 className=" tracking-[0.2em] z-30 leading-[1.2em] py-8 font-anonymous gap-x-8 xl:text-xl text-sm uppercase">
          <span className="font-cylburn  xl:text-8xl text-6xl">F</span>rom
          <span className="font-cylburn  xl:text-8xl text-6xl">R</span>oyce
        </h1>
        <p className="xl:text-base  text-sm font-anonymous z-30 uppercase tracking-[0.2em] ">
          frames of mind.{" "}
        </p>
      </div>
      <Post onReady={initializeLocomotive} />
    </section>
    </>
  );
}

export default Blog;
