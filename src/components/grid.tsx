"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Grid = () => {
  const logos = [
    {
      social: "/images/insta.webp",
      href: "https://instagram.com/roycejwilliams",
      alt: "instagram",
    },
    {
      social: "/images/google.png",
      href: "mailto:roycewilliamsj@gmail.com",
      alt: "email",
    },
    {
      social: "/images/github.png",
      href: "https://github.com/roycejwilliams",
      alt: "github",
    },
    {
      social: "/images/linkedin.png",
      href: "https://www.linkedin.com/in/royce-williams-9bb2021a1/",
      alt: "linkedin",
    },
  ];

  const playlistUrl =
    "https://embed.music.apple.com/us/playlist/summer/pl.u-9N9LLpyTx2XgDXJ";

  const skills = [
    "UX / UI",
    "Branding",
    "Product Design",
    "Interface Design",
    "Design Consulting",
    "App & Web Development",
  ];

  const gridContainer = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState(0);

  useGSAP(() => {
    if (!gridContainer.current) return;
    if (window.innerWidth < 1280) return;

    const sections = Array.from(
      gridContainer.current.querySelectorAll<HTMLElement>(".section"),
    );
    const skillItems =
      gridContainer.current.querySelectorAll(".skills-list li");

    sections.forEach((section, i) => {
      gsap.set(section, { opacity: i === 0 ? 1 : 0 });
    });

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: gridContainer.current,
          start: "top top",
          end: `+=${skills.length * 100}vh`,
          pin: true,
          scrub: 1,
          onUpdate(self) {
            const idx = Math.min(
              sections.length - 1,
              Math.floor(self.progress * sections.length),
            );
            setActivePanel(idx);
          },
        },
      });

      sections.forEach((section, i) => {
        if (i < sections.length - 1) {
          timeline.to(
            section,
            { opacity: 0, duration: 0.5, ease: "power2.inOut" },
            i * 0.75,
          );
          timeline.to(
            sections[i + 1],
            { opacity: 1, duration: 0.5, ease: "power2.inOut" },
            i * 0.75,
          );
        }
      });

      skillItems.forEach((skill, i) => {
        timeline.fromTo(
          skill,
          { opacity: 0.15, x: -8 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" },
          i * 0.5,
        );
      });
    }, gridContainer);

    return () => ctx.revert();
  }, []);

  const panelLabel = (text: string) => (
    <div className="flex items-center gap-3 mb-1">
      <div className="w-4 h-px bg-black/20" />
      <span className="font-anonymous uppercase text-[7px] tracking-[0.35em] text-black/30">
        {text}
      </span>
    </div>
  );

  const iframeBlock = (
    <iframe
      allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
      width="100%"
      height="450"
      style={{ borderRadius: "10px" }}
      src={playlistUrl}
    />
  );

  // Shared panel shell — desktop uses absolute positioning on top of this
  const mobilePanelCls =
    "flex flex-col gap-4 border border-black/8 rounded-2xl p-6 bg-[#f0ebe5]/80 backdrop-blur-sm";
  const desktopPanelCls =
    "section absolute w-[78%] flex flex-col gap-5 border border-black/8 rounded-2xl p-8 bg-[#f0ebe5]/80 backdrop-blur-sm";

  return (
    <div
      ref={gridContainer}
      className="w-full xl:px-24 px-6 py-16 xl:py-24 flex flex-col xl:flex-row justify-center gap-12 xl:min-h-[100vh] items-start xl:items-center"
    >
      {/* ── MOBILE — stacked cards ── */}
      <div className="flex xl:hidden flex-col gap-4 w-full">
        <div className={mobilePanelCls}>
          {panelLabel("About")}
          <p className="font-anonymous text-xs leading-[2.3] tracking-[0.06em] uppercase text-black/65">
            <span className="font-cylburn text-[4rem] leading-[0.75] text-black/85 float-left mr-2 mt-1">
              I
            </span>
            &apos;m a full-stack engineer and founder who thinks like a
            designer. I build products end-to-end — from database to interface —
            and care deeply about what the thing actually feels like to use.
          </p>
        </div>

        <div className={mobilePanelCls}>
          {panelLabel("What I do")}
          <ul className="font-anonymous flex flex-col gap-3 tracking-[0.18em] uppercase text-xs">
            {skills.map((skill, i) => (
              <li key={i} className="text-black/55 flex items-center gap-3">
                <span className="w-1 h-1 rounded-full bg-black/20 flex-shrink-0" />
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className={mobilePanelCls}>
          {panelLabel("Find me")}
          <div className="flex items-center gap-4">
            {logos.map((logo, i) => (
              <Link
                href={logo.href}
                key={i}
                target={logo.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  logo.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="relative w-8 h-8 rounded-full overflow-hidden opacity-40 hover:opacity-90 transition-opacity duration-300"
              >
                <Image
                  src={logo.social}
                  alt={logo.alt}
                  fill
                  className="object-cover saturate-0"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className={mobilePanelCls}>
          {panelLabel("What I'm playing")}
          {iframeBlock}
        </div>

        <div className={mobilePanelCls}>
          {panelLabel("Work together")}
          <div className="flex items-end justify-between gap-6">
            <p className="font-anonymous uppercase text-xs leading-[2.2] tracking-[0.06em] text-black/65">
              <span className="font-cylburn text-[3.5rem] leading-[0.75] text-black/85 float-left mr-1 mt-0.5">
                G
              </span>
              ot something worth building? I want to hear it.
            </p>
            <Link
              href="mailto:roycewilliamsj@gmail.com"
              className="font-anonymous uppercase text-[8px] tracking-[0.2em] px-4 py-2.5 border border-black/15 rounded-full text-black/50 hover:text-black/85 hover:border-black/35 transition-all duration-300 whitespace-nowrap flex items-center gap-1.5"
            >
              Get in touch <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── DESKTOP — rotating panels ── */}
      <div className="w-full xl:w-1/2 hidden relative xl:flex justify-center items-center min-h-[300px]">
        {/* Panel 0 — About */}
        <div
          className={desktopPanelCls}
          style={{ visibility: activePanel === 0 ? "visible" : "hidden" }}
        >
          {panelLabel("About")}
          <p className="font-anonymous text-xs leading-[2.3] tracking-[0.06em] uppercase text-black/65">
            <span className="font-cylburn text-[4.5rem] leading-[0.75] text-black/85 float-left mr-2 mt-1">
              I
            </span>
            &apos;m a full-stack engineer and founder who thinks like a
            designer. I build products end-to-end — from database to interface —
            and care deeply about what the thing actually feels like to use.
          </p>
        </div>

        {/* Panel 1 — Socials */}
        <div
          className={desktopPanelCls}
          style={{
            opacity: 0,
            visibility: activePanel === 1 ? "visible" : "hidden",
          }}
        >
          {panelLabel("Find me")}
          <div className="flex items-center gap-5 pt-1">
            {logos.map((logo, i) => (
              <Link
                href={logo.href}
                key={i}
                target={logo.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  logo.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="relative w-10 h-10 rounded-full overflow-hidden opacity-40 hover:opacity-90 transition-opacity duration-300"
              >
                <Image
                  src={logo.social}
                  alt={logo.alt}
                  fill
                  className="object-cover saturate-0"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Panel 2 — Music */}
        <div
          className={desktopPanelCls}
          style={{
            opacity: 0,
            visibility: activePanel === 2 ? "visible" : "hidden",
          }}
        >
          {panelLabel("What I'm playing")}
          {iframeBlock}
        </div>

        {/* Panel 3 — Contact */}
        <div
          className={desktopPanelCls}
          style={{
            opacity: 0,
            visibility: activePanel === 3 ? "visible" : "hidden",
          }}
        >
          {panelLabel("Work together")}
          <div className="flex items-end justify-between gap-8 pt-1">
            <p className="font-anonymous uppercase text-xs leading-[2.3] tracking-[0.06em] text-black/65 max-w-[55%]">
              <span className="font-cylburn text-[4rem] leading-[0.75] text-black/85 float-left mr-2 mt-1">
                G
              </span>
              ot something worth building? I want to hear it.
            </p>
            <Link
              href="mailto:roycewilliamsj@gmail.com"
              className="font-anonymous uppercase text-[8px] tracking-[0.2em] px-5 py-3 border border-black/15 rounded-full text-black/50 hover:text-black/85 hover:border-black/35 transition-all duration-300 whitespace-nowrap flex items-center gap-1.5"
            >
              Get in touch <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── DESKTOP skills column ── */}
      <div className="hidden xl:flex flex-col xl:w-1/2 justify-center items-start h-full gap-8">
        <div className="flex flex-col gap-2">
          <span className="font-anonymous uppercase text-[7px] tracking-[0.35em] text-black/30">
            What I do
          </span>
          <div className="w-6 h-px bg-black/15" />
        </div>
        <ul className="skills-list font-anonymous flex flex-col gap-7 tracking-[0.18em] uppercase">
          {skills.map((skill, i) => (
            <li
              key={i}
              className="text-black/30 transition-all duration-300 flex items-center gap-4 text-sm md:text-base"
            >
              <span className="w-1 h-1 rounded-full bg-black/15 flex-shrink-0" />
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Grid;
