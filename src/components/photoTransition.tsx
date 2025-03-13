"use client";
import Image from "next/image";
import {  useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Photos = () => {
  const photosRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const photos = [
    "/images/photo.jpg",
    "/images/photo1.jpg",
    "/images/photo2.jpg",
    "/images/photo3.jpg",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: photosRef.current, // Target the section
          start: "top top", // Starts when the top of the section hits the top of the viewport
          end: `+=${photos.length * window.innerHeight * 0.6}`, // Adjust the scroll duration to fit the number of slides
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            // Calculate the active index based on the scroll progress
            const index = Math.floor(self.progress * photos.length);
            setActiveIndex(index); // Update the activeIndex
          },
        },
      });

      const photoElements = gsap.utils.toArray(".photo") as HTMLElement[];

      // Animate in order (from slide1 to slide4)
      photoElements.forEach((photo, index) => {
        gsap.set(photo, {
          zIndex: -index,
          y: 75,
          opacity: index === 0 ? 1 : 0,
        }); // Example scale effect

        timeline.to(
          photo,
          {
            zIndex: 1, // Bring photo to the front
            scale: 1, // Scale photo to normal size
            opacity: 1, // Fade photo in
            duration: 1.5,
            ease: "power1.in",
            y: 0,
          },
          index * 0.5 // Add delay based on index for sequential animation
        );
      });
    }, photosRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={photosRef}
      className="photos h-[100vh] relative flex justify-center items-center w-full overflow-hidden"
    >
      {photos.map((photo, index) => (
        <div
          key={index}
          className={`photo photo-${index} w-[100%] h-screen absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 overflow-hidden origin-bottom`}
        >
          <Image
            src={photo}
            fill
            alt={`Photo ${index + 1}`}
            className="absolute w-full h-full brightness-90 xl:object-cover object-fill aspect-video "
          />
          <div className="absolute w-full h-full bg-gradient-to-b from-gray-500/20 via-black/50 to-[#6F5C5C]/35"></div>
        </div>
      ))}
      <h2 className="z-50 absolute left-0 font-anonymous top-1/2 -translate-y-1/2 xl:px-24 px-8 xl:text-3xl text-xl text-white font-medium">
        <span className="font-cylburn text-8xl ">V</span>isions{" "}
        <span className="font-cylburn text-8xl ">C</span>rafted: <br></br>An
        Engineer’s Perspective
      </h2>
      <div className="z-50 absolute p-4 right-0 top-1/2 flex flex-col justify-center items-center gap-6 -translate-y-1/2 h-auto">
        {photos.map((_, index) => (
          <div
            key={index}
            className={`w-3 shadow-md rounded-full bg-white transition-all duration-300 ease-in-out ${
              activeIndex === index ? "max-h-40 md:max-h-72" : "max-h-3"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Photos;
