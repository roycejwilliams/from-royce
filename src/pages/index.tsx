"use client";
import Image from "next/image";

import { useEffect,  useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

const Splash = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  //Drawout Path
  useEffect(() => {
    const svg = svgRef.current;
    const path = svg?.querySelector("path");

    if (path) {
      const pathLength = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 4.5,
        ease: "power2.out",
      });
    }
  }, []);

  const backgroundRef = useRef<HTMLDivElement | null>(null);  

  useEffect(() => {
    if (!backgroundRef.current) return;
  
    const bubbles = backgroundRef.current.querySelectorAll<HTMLDivElement>(".g1, .g2, .g3, .g4, .g5");
    const interactive = backgroundRef.current.querySelector<HTMLDivElement>(".interactive-3");
  
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
    <section ref={backgroundRef} className="w-full gradient-bg-3 overflow-hidden flex justify-center items-center">
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
      <div className="gradient-container ">
        <div className="g1"></div>
        <div className="g2"></div>
        <div className="g3"></div>
        <div className="g4"></div>
        <div className="g5"></div>
        <div className="interactive-3"></div>
      </div>
      {/* Logo / Action button */}
      <div className="mx-auto flex flex-col z-50 justify-center items-center">
        <Image
          src="/images/from-royce-white.png"
          alt="from royce logo"
          width={100}
          height={100}
          style={{ objectFit: "contain" }}
        />
         <Link
          scroll={false}
          href="/portfolio"
          className="px-4 py-2 font-anonymous uppercase  z-40 flex justify-center items-center text-sm text-white  hover:scale-105 ease-in-out duration-300 mt-8  shadow-black/50 cursor-pointer"
        >
          <span className="font-cylburn text-4xl">S</span>tart
        </Link> 
      </div>
      <div className="svg-container">
        <svg
          ref={svgRef}
          width="1728"
          height="1117"
          viewBox="0 0 1728 1117"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.585327 1113.19C501.5 1007 717 573 675.5 395C630.048 200.047 376 218 286 395C107.079 746.878 -272.836 1434.62 826.203 1113.19C1925.24 791.763 1545.27 73.7384 1077.9 -84.6784C610.534 -243.095 699.375 739.289 1728 660.93"
            stroke="#F7F0F0"
            strokeOpacity="0.8"
            strokeWidth="3"
          />
        </svg>
      </div>
    </section>
  );
};

export default Splash;
