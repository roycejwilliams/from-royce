import Head from "next/head";
import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

const Splash = () => {
  const logoRef = useRef<HTMLAnchorElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 1.6, ease: "power3.out" },
    )
      .fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.8, ease: "power2.out" },
        "-=0.4",
      )
      .fromTo(
        promptRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4",
      );
  }, []);

  return (
    <>
      <Head>
        <title>From Royce</title>
        <meta
          name="description"
          content="From Royce – Design and visual thinking by Royce Williams."
        />
        <meta property="og:title" content="From Royce" />
        <meta
          property="og:description"
          content="Design and visual thinking by Royce Williams."
        />
        <meta property="og:image" content="https://from-royce.com/cover.png" />
        <meta property="og:url" content="https://from-royce.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="From Royce" />
        <meta
          name="twitter:description"
          content="Design and visual thinking by Royce Williams."
        />
        <meta name="twitter:image" content="https://from-royce.com/cover.png" />
      </Head>

      <section className="w-full h-[100dvh] bg-[#f0ebe5] overflow-hidden flex flex-col justify-center items-center relative">
        {/* Geometric SVG background */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <style>{`
            .g { fill: none; stroke: #1e1b18; stroke-linecap: round; stroke-dasharray: 2400; stroke-dashoffset: 2400; animation: draw 2.4s cubic-bezier(0.4,0,0.2,1) forwards; }
            .g1 { stroke-width: 0.7; animation-delay: 0s; }
            .g2 { stroke-width: 0.7; animation-delay: 0.12s; }
            .g3 { stroke-width: 0.7; animation-delay: 0.24s; }
            .g4 { stroke-width: 0.4; animation-delay: 0.36s; }
            .g5 { stroke-width: 0.4; animation-delay: 0.48s; }
            .g6 { stroke-width: 0.4; animation-delay: 0.6s; }
            .g7 { stroke-width: 0.7; animation-delay: 0.72s; }
            .g8 { stroke-width: 0.5; stroke-dasharray: 1200; stroke-dashoffset: 1200; animation-delay: 0.9s; }
            .g9 { stroke-width: 0.5; stroke-dasharray: 1200; stroke-dashoffset: 1200; animation-delay: 1.1s; }
            @keyframes draw { to { stroke-dashoffset: 0; } }
          `}</style>

          {/* Diagonals */}
          <line className="g g1" x1="-40" y1="0" x2="1480" y2="900" />
          <line className="g g2" x1="-40" y1="180" x2="1480" y2="1080" />
          <line className="g g3" x1="1480" y1="0" x2="-40" y2="900" />

          {/* Verticals */}
          <line className="g g4" x1="720" y1="-20" x2="720" y2="920" />
          <line className="g g5" x1="360" y1="-20" x2="360" y2="920" />
          <line className="g g6" x1="1080" y1="-20" x2="1080" y2="920" />

          {/* Horizontal midline */}
          <line className="g g7" x1="-40" y1="450" x2="1480" y2="450" />

          {/* Nested rects centered on logo */}
          <rect
            className="g g8"
            x="560"
            y="340"
            width="320"
            height="220"
            rx="0"
          />
          <rect
            className="g g9"
            x="620"
            y="390"
            width="200"
            height="120"
            rx="0"
          />
        </svg>

        {/* Corner labels */}
        <span className="absolute top-8 left-8 xl:left-24 font-anonymous text-[7px] tracking-[0.3em] uppercase text-black/20">
          2026
        </span>
        <span className="absolute top-8 right-8 xl:right-24 font-anonymous text-[7px] tracking-[0.3em] uppercase text-black/20">
          from-royce.com
        </span>

        {/* Logo — sits above SVG */}
        <Link
          ref={logoRef}
          scroll={false}
          href="/portfolio"
          className="relative z-10 opacity-0 hover:opacity-60 transition-opacity duration-300"
        >
          <Image
            src="/images/from-royce-white.png"
            alt="from royce"
            width={80}
            height={80}
            className="object-contain invert"
            priority
          />
        </Link>

        {/* Enter prompt */}
        <div
          ref={promptRef}
          className="absolute bottom-10 z-10 flex flex-col items-center gap-3 opacity-0"
        >
          <div
            ref={lineRef}
            className="w-8 h-px bg-black/20"
            style={{ transformOrigin: "left center" }}
          />
          <Link
            scroll={false}
            href="/portfolio"
            className="font-anonymous uppercase text-[8px] tracking-[0.35em] text-black/30 hover:text-black/60 transition-colors duration-300"
          >
            Enter
          </Link>
        </div>
      </section>
    </>
  );
};

Splash.noNav = true;

export default Splash;
