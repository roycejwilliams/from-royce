"use client";
import Image from "next/image";
import {   useRef,  } from "react";
 import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Photos = () => {
  const photosRef = useRef<HTMLDivElement>(null);

  const photos = [
    "/images/photo.jpg",
    "/images/photo1.jpg",
    "/images/photo2.jpg",
    "/images/photo3.jpg",
  ];

   useGSAP(() => {
     const ctx = gsap.context(() => {
       const timeline = gsap.timeline({
         scrollTrigger: {
           trigger: photosRef.current,  //Target the section
           start: "top+=25",  //Starts when the top of the section hits the top of the viewport
           end: `+=${photos.length * window.innerHeight * (window.innerWidth < 768 ? 0.4 : 0.6)}`,
           scrub: true,
           pin: true,
         },
       });

       const photoElements = gsap.utils.toArray(".photo") as HTMLElement[];

        //Animate in order (from slide1 to slide4)
       photoElements.forEach((photo, index) => {
         gsap.set(photo, {
           zIndex: -index,
           y: 75,
           opacity: index === 0 ? 1 : 0,
         });  //Example scale effect

         timeline.to(
           photo,
           {
             zIndex: 1, 
             scale: 1, 
             opacity: 1, 
             duration: 0.6,
             ease: "power2.inOut",
             y: 0,
           },
           index * 0.25 
         );
       });
     }, photosRef);

     return () => ctx.revert();
   }, []);
   

  return (
    <section
      ref={photosRef}
      className="photos min-h-[100vh] relative  flex justify-center items-center w-full overflow-hidden"
    >
      {photos.map((photo, index) => (
        <div
          key={index}
          className={`photo photo-${index} w-[100%] h-screen absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 overflow-hidden `}
        >
          <Image
            loading="lazy"
            src={photo}
            fill
            alt={`Photo ${index + 1}`}
            className="absolute w-full h-full brightness-90 xl:object-cover object-fill aspect-video "
          />
          <div className="absolute w-full h-full bg-gradient-to-b from-gray-500/20 via-black/50 to-[#6F5C5C]/35"></div>
        </div>
      ))}
      <h2 className="z-50 absolute left-0 font-anonymous top-1/2 -translate-y-1/2 xl:px-24 px-8 py-4 xl:text-3xl  text-white font-medium">
        <span className="font-cylburn xl:text-8xl text-6xl">V</span>isions{" "}
        <span className="font-cylburn xl:text-8xl text-6xl">C</span>rafted: 
        <br></br>
        <span>An Engineer&apos;s Perspective</span>
      </h2>
   
    </section>
  );
};

export default Photos;
