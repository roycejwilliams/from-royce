import Intro from "../../components/intro";
import React, { useEffect, useRef } from "react";
import Grid from "../../components/grid";
import Photos from "../../components/photoTransition";
import Work from "../../components/work";
import Footer from "../../components/footer";
import Nav from "../../components/nav";
import WorkCon from "../../components/workCon";


const Portfolio = () => {

  const backgroundRef = useRef<HTMLDivElement | null>(null);

   
  useEffect(() => {
    if (!backgroundRef.current) return;
  
    const bubbles = backgroundRef.current.querySelectorAll<HTMLDivElement>(".g1, .g2, .g3, .g4, .g5");
    const interactive = backgroundRef.current.querySelector<HTMLDivElement>(".interactive");
  
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
  
    // ✅ Function to Move Bubbles Randomly Forever
    function moveBubbles() {
      bubbles.forEach((bubble) => {
        let bubbleX = Math.random() * (window.innerWidth - 100);
        let bubbleY = Math.random() * (window.innerHeight - 100);
        let velocityX = (Math.random() - 0.5) * 4; // Speed in X direction
        let velocityY = (Math.random() - 0.5) * 4; // Speed in Y direction
  
        function animateBubble() {
          bubbleX += velocityX;
          bubbleY += velocityY;
  
          // Bounce off screen edges
          if (bubbleX <= 0 || bubbleX >= window.innerWidth - 100) velocityX *= -1;
          if (bubbleY <= 0 || bubbleY >= window.innerHeight - 100) velocityY *= -1;
  
          bubble.style.transform = `translate(${bubbleX}px, ${bubbleY}px)`;
  
          requestAnimationFrame(animateBubble);
        }
  
        animateBubble(); // Start animation
      });
    }
  
    moveBubbles(); // Start movement immediately
  
    // ✅ Add Interactive Mouse Tracking Effect for `.interactive`
    function updateMousePosition(event: MouseEvent) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }
  
    function moveWithMouse() {
      if (interactive) {
        interactive.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
      requestAnimationFrame(moveWithMouse);
    }
  
    window.addEventListener("mousemove", updateMousePosition);
    moveWithMouse(); // Start interactive movement
  
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <section ref={backgroundRef} className="w-full gradient-bg overflow-x-hidden">
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
      <Grid />
      <Photos />
      <Footer />
      
    </section>
  );
};

export default Portfolio;
