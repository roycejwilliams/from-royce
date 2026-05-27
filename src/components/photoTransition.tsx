"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  {
    src: "/images/photo.jpg",
    label: "001",
    heading: "Visions",
    sub: "Crafted",
    caption: "An engineer's perspective",
  },
  {
    src: "/images/photo1.jpg",
    label: "002",
    heading: "Built",
    sub: "With intent",
    caption: "Every decision deliberate",
  },
  {
    src: "/images/photo2.jpg",
    label: "003",
    heading: "Depth",
    sub: "In the detail",
    caption: "Where craft lives",
  },
  {
    src: "/images/photo3.jpg",
    label: "004",
    heading: "Made",
    sub: "To last",
    caption: "Products that hold their weight",
  },
];

const Photos = () => {
  const photosRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const photoElements = Array.from(
        photosRef.current?.querySelectorAll<HTMLElement>(".photo") ?? [],
      );
      const textBlocks = Array.from(
        photosRef.current?.querySelectorAll<HTMLElement>(".photo-text") ?? [],
      );

      photoElements.forEach((photo, i) => {
        gsap.set(photo, { zIndex: -i, y: 40, opacity: i === 0 ? 1 : 0 });
      });
      textBlocks.forEach((block, i) => {
        gsap.set(block, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 20 });
      });

      const isMobile = window.innerWidth < 768;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: photosRef.current,
          start: "top top",
          end: `+=${photos.length * window.innerHeight * (isMobile ? 0.5 : 0.6)}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate(self) {
            const idx = Math.min(
              photos.length - 1,
              Math.floor(self.progress * photos.length),
            );
            setActiveIndex(idx);
          },
        },
      });

      photoElements.forEach((photo, i) => {
        const position = i * 0.3;

        timeline.to(
          photo,
          { zIndex: 1, opacity: 1, y: 0, ease: "power3.inOut", duration: 1.2 },
          position,
        );

        if (i > 0) {
          timeline.to(
            textBlocks[i - 1],
            { opacity: 0, y: -14, duration: 0.35, ease: "power2.in" },
            position,
          );
          timeline.to(
            textBlocks[i],
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            position + 0.08,
          );
        }
      });
    }, photosRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={photosRef}
      className="photos min-h-[100vh] relative flex justify-center items-center w-full overflow-hidden"
    >
      {/* Photo stack */}
      {photos.map((photo, index) => (
        <div
          key={index}
          className={`photo photo-${index} w-full h-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden origin-bottom`}
        >
          <Image
            priority
            src={photo.src}
            fill
            alt={`Photo ${index + 1}`}
            className="absolute w-full h-full brightness-[0.65] object-cover"
            style={{ transform: "translateZ(0)" }}
          />
          {/* Gradient — heavier at bottom for text legibility, subtle left vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
        </div>
      ))}

      {/* Text blocks — bottom-anchored on mobile, centered left on desktop */}
      <div className="absolute inset-0 z-50 pointer-events-none flex items-end xl:items-center">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="photo-text absolute w-full xl:px-24 px-6 pb-24 xl:pb-0"
          >
            <div className="flex flex-col gap-2 xl:gap-3">
              {/* Counter + thin rule */}
              <div className="flex items-center gap-3">
                <div className="w-4 h-px bg-white/25" />
                <span className="font-anonymous text-[8px] tracking-[0.35em] uppercase text-white/35">
                  {photo.label} / 00{photos.length}
                </span>
              </div>

              {/* Headline — cylburn drop char + anonymous body */}
              <h2 className="font-anonymous uppercase text-white leading-none">
                <span className="font-cylburn text-[4rem] xl:text-[7rem] leading-[0.85]">
                  {photo.heading[0]}
                </span>
                <span className="text-xl xl:text-4xl tracking-[0.04em]">
                  {photo.heading.slice(1)}
                </span>
                <br />
                <span className="font-cylburn text-[4rem] xl:text-[7rem] leading-[0.85]">
                  {photo.sub[0]}
                </span>
                <span className="text-xl xl:text-4xl tracking-[0.04em]">
                  {photo.sub.slice(1)}
                </span>
              </h2>

              {/* Caption */}
              <span className="font-anonymous text-[8px] xl:text-[9px] tracking-[0.25em] uppercase text-white/35 mt-2">
                {photo.caption}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Progress — active segment brightens, right on desktop / center on mobile */}
      <div className="absolute bottom-8 xl:bottom-10 left-1/2 xl:left-auto -translate-x-1/2 xl:translate-x-0 xl:right-24 z-50 flex gap-2 items-center">
        {photos.map((_, i) => (
          <div
            key={i}
            className="h-px transition-all duration-500"
            style={{
              width: i === activeIndex ? "32px" : "16px",
              background:
                i === activeIndex
                  ? "rgba(255,255,255,0.7)"
                  : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>

      {/* Slide label — top right, desktop only */}
      <div className="absolute top-8 right-8 xl:right-24 z-50 hidden xl:flex flex-col items-end gap-1">
        <span className="font-anonymous text-[7px] tracking-[0.3em] uppercase text-white/20">
          Selected work
        </span>
      </div>
    </section>
  );
};

export default Photos;
