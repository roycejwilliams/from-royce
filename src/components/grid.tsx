"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronsRight, Minimize2 } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

declare global {
  interface Window {
    Calendly: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement | null;
      }) => void;
    };
  }
}

type ScrollInstance = {
  start?: () => void;
  stop?: () => void;
};

gsap.registerPlugin(ScrollTrigger);

const Grid = ({ scroll }: { scroll: ScrollInstance }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleScheduleClick = () => {
    setIsOpen(true); // Open modal
  };

  const handleCloseMenu = () => {
    setIsOpen(false); // closes modal
  };

  const logos = [
    {
      social: "/images/insta.webp",
      href: "https://instagram.com/roycejwilliams",
      alt: "instagram",
    },
    {
      social: "/images/google.png",
      href: "roycewilliamsj@gmail.com",
      alt: "google",
    },
    {
      social: "/images/github.png",
      href: "https://github.com/roycejwilliams",
      alt: "github",
    },
    {
      social: "/images/linkedin.png",
      href: "https://www.linkedin.com/in/royce-williams-9bb2021a1/",
      alt: "linkedIn",
    },
  ];

  const sounds = [
    "https://embed.music.apple.com/us/album/the-calm/1452017773?i=1452018100",
    "https://embed.music.apple.com/us/album/nobodys-perfect/1830114202?i=1830114774",
    "https://embed.music.apple.com/us/album/carruth/1522353829?i=1522353830",
    "https://embed.music.apple.com/us/album/forever-on-some-fly-shit/705400082?i=705401066",
    "https://embed.music.apple.com/us/album/red-light/1407068859?i=1407068999",
    "https://embed.music.apple.com/us/album/my-heart/1822666383?i=1822666386",
    "https://embed.music.apple.com/us/album/lly-1h8u/1769093191?i=1769093510",
    "https://embed.music.apple.com/us/album/hoe-train/1128588967?i=1128589113",
    "https://embed.music.apple.com/us/album/rich-forever-feat-john-legend/1440718127?i=1440718637",
    "https://embed.music.apple.com/us/album/pound-cake-paris-morton-music-2-feat-jay-z/1440829462?i=1440829777",
    "https://embed.music.apple.com/us/album/idols/1622129078?i=1622129563",
    "https://embed.music.apple.com/us/album/jazz-club-after-hours/1789168367?i=1789168431",
    "https://embed.music.apple.com/us/album/when-im-in-your-arms/1504276245?i=1504276747",
    "https://embed.music.apple.com/us/album/purchasing-power/1592427387?i=1592427554",
    "https://embed.music.apple.com/us/album/really-love/950764300?i=950764325",
    "https://embed.music.apple.com/us/album/what-i-tell-kids/994273343?i=994273489",
    "https://embed.music.apple.com/us/album/trampa-de-la-casa/1405710728?i=1405710831",
    "https://embed.music.apple.com/us/album/sierra-leone/1440765580?i=1440766139",
    "https://embed.music.apple.com/us/album/palmolive-feat-pusha-t-killer-mike/1464243671?i=1464243894",
    "https://embed.music.apple.com/us/album/on-deck/1614570594?i=1614570728",
    "https://embed.music.apple.com/us/album/50/1820521524?i=1820521920",
    "https://embed.music.apple.com/us/album/by-george-outro/1149506748?i=1149507881",
    "https://embed.music.apple.com/us/album/born-sinner-feat-james-fauntleroy/1529510479?i=1529510874",
    "https://embed.music.apple.com/us/album/lost-my-lex/1445963026?i=1445963028",
    "https://embed.music.apple.com/us/album/beach-chair-feat-chris-martin/1440744598?i=1440744804",
    "https://embed.music.apple.com/us/album/shine-your-light-for-we/1832510565?i=1832510723",
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
          start: "top+=0", //Offset the start point
          end: `+=${skills.length * 100}vh`, //Adjust based on your layout
          pin: true,
          scrub: true, //Smooth scroll animation
        },
      });

      sections.forEach((section, index) => {
        gsap.set(section, {
          opacity: index === 0 ? 1 : 0,
        }); //Example scale effect
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

  //Calendly Modal
  const calendlyRef = useRef(null);

  useEffect(() => {
    const script = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );

    const loadCalendly = () => {
      if (window.Calendly && calendlyRef.current) {
        calendlyRef.current.innerHTML = ""; // Clear previous widget
        window.Calendly.initInlineWidget({
          url: "https://calendly.com/roycewilliamsj?hide_landing_page_details=0&hide_gdpr_banner=1&background_color=000000&text_color=ffffff&primary_color=FF5C00",
          parentElement: calendlyRef.current,
        });
      }
    };

    if (!script) {
      const newScript = document.createElement("script");
      newScript.src = "https://assets.calendly.com/assets/external/widget.js";
      newScript.async = true;
      newScript.onload = loadCalendly;
      document.body.appendChild(newScript);
    } else {
      loadCalendly();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scroll?.stop?.(); // Stop Locomotive scroll
      document.body.style.overflow = "hidden";
    } else {
      scroll?.start?.(); // Start it back up
      document.body.style.overflow = "unset";
    }

    return () => {
      scroll?.start?.();
      document.body.style.overflow = "unset";
    };
  }, [isOpen, scroll]);

  return (
    <div
      ref={gridContainer}
      className="w-full mx-auto p-24 flex flex-col  lg:flex-row justify-center gap-y-2 min-h-[100vh]  "
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
              <span className="font-cylburn text-5xl">I</span>&apos;m a computer
              engineer with a designer&apos;s eye, aspiring agency owner, and
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
          className="section py-20 px-8 border border-white/5 shadow-md absolute w-[75%] rounded-lg font-anonymous tracking-widest  backdrop-blur flex items-center justify-between"
        >
          <div className="via-white/10 -z-10 from-black/20 bg-gradient-to-t to-white/10 blur-lg w-full h-full  absolute"></div>
          <h2 className="uppercase text-white  p-4">
            <span className="font-cylburn text-4xl">L</span>et&apos;s{" "}
            <span className="font-cylburn text-4xl">W</span>ork
          </h2>
          <button
            onClick={handleScheduleClick}
            className="px-4 py-2 uppercase hover:scale-105 hover:bg-[#20140a] ease-in-out duration-300 transition hover:border hover:border-white/5 text-sm text-white bg-transparent cursor-pointer rounded-xl shadow-lg border border-white/5"
          >
            Schedule
          </button>
        </div>
      </div>
      <div
        data-scroll
        data-scroll-speed="0.05"
        className="flex-col xl:p-4 relative xl:w-1/2 w-full  flex justify-center items-center h-full "
      >
        <h2 className="uppercase z-40 xl:mb-20 my-6 font-anonymous  tracking-widest xl:w-1/2 w-full xl:text-left text-center text-white ">
          <span className="font-cylburn text-8xl">S</span>kills
        </h2>
        <ul className="skills-list text-white text-center xl:text-left font-anonymous flex flex-col z-50 md:text-lg  text-sm  gap-y-10 tracking-[0.3em] uppercase p-4 ">
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
          className="fixed h-[100vh]  inset-0 flex items-center top-0 left-0 justify-center bg-black bg-opacity-65 z-50"
        >
          <button
            onClick={handleCloseMenu}
            className="absolute cursor-pointer top-8 p-2 hover:shadow-2xl shadow-white/50 ease-in-out duration-300 transition rounded-full right-8"
          >
            <Minimize2 />
          </button>
          <div
            className="calendly-inline-widget"
            ref={calendlyRef}
            style={{
              minWidth: "800px",
              height: "800px",
              overflow: "hidden",
              colorScheme: "light",
              padding: "2rem",
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Grid;
