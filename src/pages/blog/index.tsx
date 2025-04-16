import { useEffect, useRef } from "react";
import Nav from "../../components/nav";
import Post from "../../components/post";
import Head from "next/head";

interface Blog {
  post_id: number; // Matches SERIAL PRIMARY KEY
  post_title: string; // Matches VARCHAR(500) NOT NULL
  post_content: string; // Matches TEXT NOT NULL
  post_image: string | null; // Matches VARCHAR(255), nullable
  post_time: string; // Matches TIMESTAMP DEFAULT CURRENT_TIMESTAMP
}

function Blog() {
  <Head>
        <title>Ethos – From Royce</title>
        <meta name="description" content="Read insights, ideas, and stories from Royce." />
        <meta property="og:title" content="Blog – Royce" />
        <meta property="og:description" content="Read insights, ideas, and stories from Royce." />
        <meta property="og:image" content="https://from-royce.com/cover.png" />
        <meta property="og:url" content="https://from-royce.com/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://from-royce.com/cover.png" />
      </Head>
   const backgroundRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
       (async () => {
         const LocomotiveScroll = (await import('locomotive-scroll')).default;
         const locomotiveScroll = new LocomotiveScroll();
         console.log(locomotiveScroll)
   
       })();
     }, []);
    
     
  
         useEffect(() => {
          if (!backgroundRef.current) return;
        
          const bubbles = Array.from(backgroundRef.current.querySelectorAll<HTMLDivElement>(".g1, .g2, .g3, .g4, .g5"));
          const interactive = backgroundRef.current.querySelector<HTMLDivElement>(".interactive, .interactive-2");
        
          let mouseX = window.innerWidth / 2;
          let mouseY = window.innerHeight / 2;
        
          const bubbleStates = bubbles.map(() => ({
            x: Math.random() * (window.innerWidth - 100),
            y: Math.random() * (window.innerHeight - 100),
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
          }));
        
          function update() {
            bubbleStates.forEach((state, i) => {
              state.x += state.vx;
              state.y += state.vy;
        
              if (state.x <= 0 || state.x >= window.innerWidth - 100) state.vx *= -1;
              if (state.y <= 0 || state.y >= window.innerHeight - 100) state.vy *= -1;
        
              const bubble = bubbles[i];
              if (bubble) {
                bubble.style.transform = `translate(${state.x}px, ${state.y}px)`;
              }
            });
        
            if (interactive) {
              interactive.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
            }
        
            requestAnimationFrame(update);
          }
        
          window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
          });
        
          update(); // start animation
        
          return () => {
            window.removeEventListener("mousemove", (e) => {
              mouseX = e.clientX;
              mouseY = e.clientY;
            });
          };
        }, []);

  return (
    <>
      <Head>
            <title>Ethos</title>
      </Head>
    <section ref={backgroundRef} className="w-full gradient-bg-2 min-h-[100svh] overflow-x-hidden">
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
      <Post />
    </section>
    </>
  );
}

export default Blog;
