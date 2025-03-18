"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState,  useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronsRight } from "lucide-react";

declare global {
  interface Window {
    calendar?: {
      schedulingButton: {
        load: (options: {
          url: string;
          color: string;
          label: string;
          target: HTMLElement | null;
        }) => void;
      };
    };
  }
}

 gsap.registerPlugin(ScrollTrigger);

const Grid = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleScheduleClick = () => {
    setIsOpen(true); // Open modal
  };

  

  const logos = [
    {
      social: "/images/insta.webp",
      href: "",
      alt: "instagram",
    },
    {
      social: "/images/google.png",
      href: "",
      alt: "google",
    },
    {
      social: "/images/github.png",
      href: "",
      alt: "github",
    },
    {
      social: "/images/linkedin.png",
      href: "",
      alt: "github",
    },
  ];

  const sounds = [
    "https://embed.music.apple.com/us/album/life-is-beautiful/1793866201?i=1793866743",
    "https://embed.music.apple.com/us/album/i-cant-wait-to-get-there/1793654348?i=1793654639",
    "https://embed.music.apple.com/us/album/one-eye-open/1437899976?i=1437900163",
    "https://embed.music.apple.com/us/album/moment-hung/1546825984?i=1546826150",
    "https://embed.music.apple.com/us/album/everybodys-favorite-uncle/1767503809?i=1767503967",
    "https://embed.music.apple.com/us/album/let-it-happen/1440838039?i=1440838060",
    "https://embed.music.apple.com/us/album/next-time-humble-pie/1388571796?i=1388572550",
    "https://embed.music.apple.com/us/album/cola/1666142474?i=1666142670",
    "https://embed.music.apple.com/us/album/mixed-emotions/1769093191?i=1769093513",
    "https://embed.music.apple.com/us/album/glimmer/1497230760?i=1497231172",
    "https://embed.music.apple.com/us/album/you-dont-have-to-change/1443798401?i=1443798977",
    "https://embed.music.apple.com/us/album/jazz-is-for-ordinary-people/1691075357?i=1691075358",
    "https://embed.music.apple.com/us/album/come-as-you-are/1586895441?i=1586895445",
    "https://embed.music.apple.com/us/album/change-in-the-house-of-flies/1099848709?i=1099848811",
    "https://embed.music.apple.com/us/album/loving-you-aint-complicated/1499855510?i=1499855516",
    "https://embed.music.apple.com/us/album/junes-cry-feat-emil/1576488643?i=1576489325",
    "https://embed.music.apple.com/us/album/waves/1396290965?i=1396291667",
    "https://embed.music.apple.com/us/album/ghetto-gospel/1582876749?i=1582876752",
    "https://embed.music.apple.com/us/album/all-i-do/1440820988?i=1440821233",
    "https://embed.music.apple.com/us/album/shiggy/1529996984?i=1529996990",
    "https://embed.music.apple.com/us/album/you-sure-love-to-ball/1701654441?i=1701654456",
  ];

  const skills = [
    "UX/UI",
    "Branding",
    "Product Design",
    "Interface Design",
    "Design Consulting",
    "App | Web Development",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const toggleNextSong = () => {
    setCurrentIndex((prev) => (prev + 1) % sounds.length); // Move to the next index cyclically
  };

  const gridContainer = useRef(null);

   useGSAP(() => {
     if (!gridContainer.current) return;

     const sections = gsap.utils.toArray(".section") as HTMLElement[]; // Cast to HTMLElement[]
     const skillItems = document.querySelectorAll(".skills-list li"); // Select skill list items

     const ctx = gsap.context(() => {
       const timeline = gsap.timeline({
         scrollTrigger: {
           trigger: gridContainer.current,
           start: "top+=50",  //Offset the start point
           end: `+=${skills.length * 100}vh`,  //Adjust based on your layout
           pin: true,
           scrub: true,  //Smooth scroll animation
         },
       });

       sections.forEach((section, index) => {
         gsap.set(section, {
           opacity: index === 0 ? 1 : 0,
         });  //Example scale effect
         timeline.to(
           section,
           {
             opacity: 1,
             duration: 1,
             display: "none",
             zIndex: 50,
             ease: "power2.inOut",
           },
           index * 0.75
         );
       });

       skillItems.forEach((skill, index) => {
         timeline.fromTo(
           skill,
           { opacity: 0.25 },
           { opacity: 1, duration: 0.5, ease: "power2.inOut" },
           index * 0.5 // Adjust the timing independently
         );
      });
     }, gridContainer); // Use `gridContainer` to bind the context

     return () => ctx.revert(); // Cleanup the effect on unmount or dependencies change
   }, []);

  return (
    <div
      ref={gridContainer}
      className="w-full mx-auto p-24 flex flex-col lg:flex-row justify-center gap-y-2 min-h-screen "
    >
      <div className="w-1/2 hidden relative xl:flex justify-center mt-24">
        {/* Mission */}

        <div
          data-scroll
          data-scroll-speed="-0.1"
          className="section flex-col p-  w-[75%]  absolute rounded-lg backdrop-blur flex"
        >
          <div className="via-white/10 from-black/20 bg-gradient-to-t to-white/10 blur-lg w-full h-full  absolute"></div>
          <div className="w-full block z-50 ">
            <p className=" text-sm text-white z-40 ml-4 font-anonymous font-light ">
              <span className="font-cylburn text-5xl">I</span>'m a computer
              engineer with a designer's eye, aspiring agency owner, and
              dedicated developer. As a founder and creative, I focus on
              crafting solutions that help businesses grow and thrive.
            </p>
          </div>
        </div>
        <div
          data-scroll
          data-scroll-speed="-0.1"
          className="section flex-col p-4 w-[75%]  rounded-lg absolute flex "
        >
          <div className="via-white/10 from-black/20 bg-gradient-to-t to-white/10 blur-lg w-full h-full  absolute"></div>

          <div className=" w-full flex items-center justify-evenly p-4 ">
            {logos.map((logo, index) => (
              <Link
                href={logo.href}
                key={index}
                className="p-4 relative overflow-hidden w-12 h-12 rounded-full hover:bg-white transition ease-in-out duration-300 hover:scale-75"
              >
                <Image
                  src={logo.social}
                  alt={logo.alt}
                  fill
                  className="absolute w-full h-full object-cover invert hover:invert-0 saturate-0 "
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Apple Music - Rotation */}
        <div
          data-scroll
          data-scroll-speed="-0.1"
          className="section py-24 w-[75%] absolute rounded-lg backdrop-blur flex justify-center items-center"
        >
          <div className="via-white/10 from-black/20 bg-gradient-to-t to-white/10 blur-lg w-full h-full  absolute"></div>
          <div className="w-full h-auto flex items-center  p-4 ">
            {sounds.map((slide, index) => (
              <iframe
                className={`max-h-full max-w-80 ml-4
                  `}
                allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                width="100%"
                key={index}
                style={{
                  borderRadius: "10px",
                  position: "absolute",

                  boxShadow: "2px 0px rgba(0, 0, 0, 0.1)", // Optional shadow for visual separation
                  zIndex:
                    (index - currentIndex + sounds.length) % sounds.length === 0
                      ? 50
                      : 40 -
                        ((index - currentIndex + sounds.length) %
                          sounds.length),
                  opacity:
                    index === currentIndex
                      ? 1
                      : 1 -
                        Math.abs(
                          (index - currentIndex + sounds.length) % sounds.length
                        ) *
                          0.2,
                  // Fade out the last item
                  transform: `translateX(${
                    ((index - currentIndex + sounds.length) % sounds.length) *
                    40
                  }%)`, // Translate based on position
                  transition:
                    "opacity 0.5s ease-in-out, transform 1.2s ease-in-out", // Smooth transition
                }}
                src={slide}
              ></iframe>
            ))}
            <button
              onClick={toggleNextSong}
              className="w-12 h-12 absolute  shadow-xl hover:text-black text-white hover:bg-white/75 shadow-[#FF5C00] hover:shadow-2xl hover:shadow-[#63777e] hover:scale-95 ease-in-out duration-200 transition right-0 rounded-full bg-[#2b2b2b]/75 z-50 flex justify-center items-center cursor-pointer"
            >
              <ChevronsRight className="w-6 h-6  absolute -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2" />
            </button>
          </div>
        </div>
        {/* Schedule */}
        <div
          data-scroll
          data-scroll-speed="-0.1"
          className="section py-20 absolute w-[75%] rounded-lg font-anonymous tracking-widest  backdrop-blur flex items-center justify-between"
        >
          <div className="via-[#FF5C00]/50 bg-gradient-to-b from-white/20 -z-10  blur-lg w-full h-full absolute"></div>
          <h2 className="uppercase text-white  p-4">
            <span className="font-cylburn text-4xl">L</span>et&apos;s{" "}
            <span className="font-cylburn text-4xl">W</span>ork
          </h2>
          <button
            onClick={handleScheduleClick}
            className="px-4 py-2 border uppercase text-sm text-white bg-transparent rounded-full"
          >
            Schedule
          </button>
        </div>
      </div>
      <div
        data-scroll
        data-scroll-speed="-0.05"
        className="flex-col p-8 relative xl:w-1/2 w-full  flex justify-center items-center h-full "
      >
        <h2 className="uppercase z-40 mb-20 font-anonymous tracking-widest xl:w-1/2 w-full xl:text-left text-center text-white ">
          <span className="font-cylburn text-8xl">S</span>kills
        </h2>
        <ul className="skills-list text-white text-center xl:text-left font-anonymous flex flex-col z-50 text-lg  gap-y-10 tracking-[0.3em] uppercase p-4 ml-8">
          {skills.map((skill, index) => (
            <li
              key={index}
              data-index={index} // Add a data attribute for reference
              className=""
            >
              <span>{skill}</span>
            </li>
          ))}
        </ul>
      </div>
      {isOpen && (
        <div
          ref={modalRef}
          className="fixed h-[120vh] inset-0 flex items-center top-0 left-0 justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-lg">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold">Appointment</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* Google Calendar Scheduling Inside Modal */}
            <div className="p-4">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3zA_z-W8DacfaA4wa1CQyN9ujlNcgfq63YvjFjkN_mD64TakHy137mkUhbUqZEwflvlojcnPMp?gv=true"
                width="100%"
                height="500px"
                style={{ border: "none" }}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Grid;
