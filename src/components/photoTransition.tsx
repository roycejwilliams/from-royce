"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { dropCapTightening } from "@/lib/typography";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  {
    src: "/images/fr1.jpeg",
    heading: "Visions",
    sub: "Crafted",
    caption: "An engineer's perspective",
  },
  {
    src: "/images/fr2.jpeg",
    heading: "Built",
    sub: "With intent",
    caption: "Every decision deliberate",
  },
  {
    src: "/images/fr3.jpeg",
    heading: "Depth",
    sub: "In the detail",
    caption: "Where craft lives",
  },
  {
    src: "/images/fr4.jpeg",
    heading: "Made",
    sub: "To last",
    caption: "Products that hold their weight",
  },
  {
    src: "/images/fr5.jpeg",
    heading: "Quiet",
    sub: "Confidence",
    caption: "No noise, just signal",
  },
  {
    src: "/images/fr6.jpeg",
    heading: "Shape",
    sub: "Of things",
    caption: "Form follows function",
  },
];

const Photos = () => {
  const photosRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
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

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: photosRef.current,
          start: "top top",
          // A function (not a fixed string) so a resize/orientation change
          // recalculates the pinned scroll distance instead of locking in
          // whatever the viewport happened to be at mount.
          end: () =>
            `+=${
              photos.length *
              document.documentElement.clientHeight *
              (window.innerWidth < 768 ? 0.75 : 0.6)
            }`,
          scrub: 1,
          // Prevents a fast flick/fling scroll from leaving several slides'
          // text blocks mid-crossfade at once (scrub normally animates
          // through every intermediate frame, which can't keep up with a
          // large jump) by snapping straight to the nearest end state.
          fastScrollEnd: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate(self) {
            const idx = Math.min(
              photos.length - 1,
              Math.round(self.progress * (photos.length - 1)),
            );
            setActiveIndex(idx);
          },
        },
      });

      // Each image needs its own segment of scroll. The old 1.2-unit image
      // tween started every 0.3 units, leaving four slides active at once.
      // On a touch fling, scrub visibly stacked their titles and images.
      const STEP = 1;
      const IMAGE_DURATION = 0.7;

      // Slide zero is visible from gsap.set above. Transition only the
      // remaining five, so the first scroll segment is not a redundant tween.
      photoElements.slice(1).forEach((photo, offset) => {
        const i = offset + 1;
        const position = i * STEP;

        timeline.to(
          textBlocks[i - 1],
          { opacity: 0, y: -14, duration: 0.12, ease: "power2.in" },
          position,
        );
        timeline.to(
          photo,
          { zIndex: i + 1, opacity: 1, y: 0, ease: "power3.inOut", duration: IMAGE_DURATION },
          position,
        );
        timeline.to(
          textBlocks[i],
          { opacity: 1, y: 0, duration: 0.24, ease: "power2.out" },
          position + 0.14,
        );
      });
    },
    { scope: photosRef, dependencies: [] },
  );

  return (
    <section
      ref={photosRef}
      className="photos min-h-[100vh] relative flex justify-center items-center w-full overflow-hidden"
    >
      {/* Grain filter def: generates noise independent of source content */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <filter id="photo-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.05 0"
          />
        </filter>
      </svg>

      {/* Photo stack */}
      {photos.map((photo, index) => (
        <div
          key={index}
          className={`photo photo-${index} w-full h-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden origin-bottom`}
        >
          <Image
            priority={index === 0}
            src={photo.src}
            fill
            sizes="100vw"
            alt={`Photo ${index + 1}`}
            className="absolute w-full h-full grayscale contrast-110 brightness-[0.8] object-cover"
            style={{ transform: "translateZ(0)" }}
          />
          {/* Duotone tint: warm brand mid-tone multiplied over the grayscale photo */}
          <div
            className="absolute inset-0 bg-royce-mid/35"
            style={{ mixBlendMode: "multiply" }}
          />
          {/* Grain: editorial print texture, sits above the tint */}
          <div
            className="absolute inset-0 opacity-40"
            style={{ filter: "url(#photo-grain)", mixBlendMode: "overlay" }}
          />
          {/* Ghost numeral: large faint index mark, desktop only */}
          <span
            aria-hidden="true"
            className="hidden xl:block absolute -right-4 top-1/2 -translate-y-1/2 font-cylburn text-white/[0.07] select-none pointer-events-none"
            style={{ fontSize: "42rem", lineHeight: 1 }}
          >
            {index + 1}
          </span>
          {/* Gradient: heavier at bottom for text legibility, subtle left vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
        </div>
      ))}

      {/* Text blocks: bottom-anchored on mobile, centered left on desktop */}
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
                  {String(index + 1).padStart(3, "0")} /{" "}
                  {String(photos.length).padStart(3, "0")}
                </span>
              </div>

              {/* Headline: cylburn drop char + anonymous body */}
              <h2 className="font-anonymous uppercase text-white leading-none">
                <span
                  className={`font-cylburn text-[4rem] xl:text-[7rem] leading-[0.85] ${dropCapTightening(photo.heading[0])}`}
                >
                  {photo.heading[0]}
                </span>
                <span className="text-xl xl:text-4xl tracking-[0.04em]">
                  {photo.heading.slice(1)}
                </span>
                <br />
                <span
                  className={`font-cylburn text-[4rem] xl:text-[7rem] leading-[0.85] ${dropCapTightening(photo.sub[0])}`}
                >
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

      {/* Progress: active segment brightens, right on desktop / center on mobile */}
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

      {/* Slide label: top right, desktop only */}
      <div className="absolute top-8 right-8 xl:right-24 z-50 hidden xl:flex flex-col items-end gap-1">
        <span className="font-anonymous text-[7px] tracking-[0.3em] uppercase text-white/20">
          Selected work
        </span>
      </div>
    </section>
  );
};

export default Photos;
