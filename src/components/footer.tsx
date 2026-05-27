import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="w-full bg-[#f0ebe5] xl:px-24 px-8 pt-24 pb-12 flex flex-col gap-24">
      {/* Top — CTA + nav */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-4">
          <span className="font-anonymous uppercase text-[8px] tracking-[0.3em] text-black/30">
            Let&apos;s build
          </span>
          <Link
            href="mailto:roycewilliamsj@gmail.com"
            className="font-anonymous uppercase text-[9px] tracking-[0.2em] text-black/50 hover:text-black/90 transition-colors duration-200"
          >
            roycewilliamsj@gmail.com
          </Link>
        </div>

        <nav className="flex flex-col items-end gap-3">
          <Link
            href="/blog"
            className="font-anonymous uppercase text-[9px] tracking-[0.2em] text-black/35 hover:text-black/70 transition-colors duration-200"
          >
            <span className="font-cylburn text-lg italic">E</span>thos
          </Link>
          <Link
            href="https://github.com/roycejwilliams"
            target="_blank"
            rel="noopener noreferrer"
            className="font-anonymous uppercase text-[9px] tracking-[0.2em] text-black/35 hover:text-black/70 transition-colors duration-200"
          >
            Github
          </Link>
          <Link
            href="https://www.linkedin.com/in/royce-williams-9bb2021a1/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-anonymous uppercase text-[9px] tracking-[0.2em] text-black/35 hover:text-black/70 transition-colors duration-200"
          >
            LinkedIn
          </Link>
        </nav>
      </div>

      {/* Bottom — legal */}
      <div className="flex justify-between items-center pt-6 border-t border-black/8">
        <p className="font-anonymous uppercase text-[7px] tracking-[0.25em] text-black/25">
          © 2026 From-Royce
        </p>
        <p className="font-anonymous uppercase text-[7px] tracking-[0.25em] text-black/25">
          Design &amp; Code
        </p>
      </div>
    </footer>
  );
}

export default Footer;
