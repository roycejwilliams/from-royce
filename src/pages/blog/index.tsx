import { useEffect, useRef } from "react";
import Nav from "../../components/nav";
import Post from "../../components/post";

interface Blog {
  post_id: number; // Matches SERIAL PRIMARY KEY
  post_title: string; // Matches VARCHAR(500) NOT NULL
  post_content: string; // Matches TEXT NOT NULL
  post_image: string | null; // Matches VARCHAR(255), nullable
  post_time: string; // Matches TIMESTAMP DEFAULT CURRENT_TIMESTAMP
}

function Blog() {

   const backgroundRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
      (async () => {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
    
        const scroll = new LocomotiveScroll({
          el: document.querySelector("[data-scroll-container]") as HTMLElement,
          smooth: true,
          smartphone: {
            smooth: false,
          },
          tablet: {
            smooth: false,
          },
        } as unknown as ConstructorParameters<typeof LocomotiveScroll>[0]); // ✅ type-checked!
        
        console.log(scroll);
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
    <section data-scroll-container ref={backgroundRef} className="w-full gradient-bg-2 overflow-x-hidden">
      {typeof window !== "undefined" && window.innerWidth > 768 && (
      <svg >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      )}
      <div className="gradient-container">
        <div className="g1"></div>
        <div className="g2"></div>
        <div className="g3"></div>
        <div className="g4"></div>
        <div className="g5"></div>
        <div className="interactive-2"></div>
      </div>
      <Nav />
      {/* Title */}
      <div className=" xl:px-24 px-8 mt-52  flex flex-col  gap-y-12 xl:gap-x-32 text-white">
        <h1 className=" tracking-[0.2em] z-30 leading-[1.2em]  font-anonymous gap-x-8 xl:text-xl text-sm uppercase">
          <span className="font-cylburn  md:text-[10rem] text-[6rem]">F</span>rom
          <span className="font-cylburn  md:text-[10rem] text-[6rem]">R</span>oyce
        </h1>
        <p className="xl:text-base  text-sm font-anonymous z-30 uppercase tracking-[0.2em] ">
          frames of mind.{" "}
        </p>
      </div>
      <Post />
    </section>
  );
}

export default Blog;
