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
           const LocomotiveScroll = (await import('locomotive-scroll')).default;
           const locomotiveScroll = new LocomotiveScroll();
           console.log(locomotiveScroll); // Logs the instance to the console
         })();
       }, []);
  
    useEffect(() => {
      if (!backgroundRef.current) return;
    
      const bubbles = backgroundRef.current.querySelectorAll<HTMLDivElement>(".g1, .g2, .g3, .g4, .g5");
      const interactive = backgroundRef.current.querySelector<HTMLDivElement>(".interactive-2");
    
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
    <section ref={backgroundRef} className="w-full gradient-bg-2 overflow-x-hidden">
      <svg>
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
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
