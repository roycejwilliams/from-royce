import Intro from "../../components/intro";
import React, { useEffect, useRef, useState } from "react";
import Grid from "../../components/grid";
import Photos from "../../components/photoTransition";
import Work from "../../components/work";
import Footer from "../../components/footer";
import Nav from "../../components/nav";
import WorkCon from "../../components/workCon";
import Head from "next/head";

type ScrollInstance = {
  start?: () => void;
  stop?: () => void;
};

const Portfolio = () => {

  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const [scrollInstance, setScrollInstance] = useState<ScrollInstance | null>(null);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const instance = new LocomotiveScroll();
      setScrollInstance(instance);
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
        <title>Portfolio – From Royce</title>
        <meta name="description" content="Read insights, ideas, and stories from Royce." />
        <meta property="og:title" content="Blog – Royce" />
        <meta property="og:description" content="Read insights, ideas, and stories from Royce." />
        <meta property="og:image" content="https://from-royce.com/cover.png" />
        <meta property="og:url" content="https://from-royce.com/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://from-royce.com/cover.png" />
      </Head>
    <section  ref={backgroundRef} className="w-full gradient-bg overflow-x-hidden">
      <svg id="svg-goo" >
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
      <div 
      
      className="gradient-container ">
        <div className="g1"></div>
        <div className="g2"></div>
        <div className="g3"></div>
        <div className="g4"></div>
        <div className="g5"></div>
        <div className="interactive hidden xl:block"></div>
      </div>

      <Nav />
      <Intro />
      <Work />
      <WorkCon />
      <Grid scroll={scrollInstance} />
      <Photos />
      <Footer />
      
    </section>
    </>
  );
};

export default Portfolio;
