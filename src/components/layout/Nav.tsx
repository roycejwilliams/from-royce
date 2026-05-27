import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import MobileMenu from "../mobileMenu";

const LINKS = [
  { href: "/portfolio", letter: "H", rest: "ome", label: "Home" },
  { href: "/blog", letter: "E", rest: "thos", label: "Ethos" },
];

function Nav() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setMenu((prev) => !prev);
  const isActive = (href: string) => router.pathname.startsWith(href);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // iOS-safe scroll lock
  useEffect(() => {
    if (menu) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = parseInt(document.body.style.top || "0") * -1;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    }
    return () => {
      const scrollY = parseInt(document.body.style.top || "0") * -1;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, [menu]);

  return (
    <nav
      className={`xl:px-24 px-8 w-full flex justify-between items-center sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-[#f0ebe5]/80 backdrop-blur-md border-b border-black/8"
          : "py-5 bg-transparent border-b border-black/8"
      }`}
    >
      {/* Logo */}
      <Link href="/portfolio" className="z-40 group">
        <Image
          src="/images/from-royce-white.png"
          alt="from royce logo"
          width={55}
          height={55}
          className={`object-contain invert ease-in-out transition-all duration-300 group-hover:opacity-50 ${
            scrolled ? "w-[42px] h-[42px]" : "w-[55px] h-[55px]"
          }`}
        />
      </Link>

      {/* Desktop links */}
      <ul className="xl:flex gap-x-10 hidden list-none p-0 m-0 z-50 items-center">
        {LINKS.map(({ href, letter, rest }) => {
          const active = isActive(href);
          return (
            <li key={href} className="relative flex flex-col items-center">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex gap-x-1.5 items-center tracking-[0.22em] font-anonymous uppercase text-[9px] transition-colors duration-200 group ${
                  active ? "text-black/80" : "text-black/40 hover:text-black/70"
                }`}
              >
                <span
                  className={`font-cylburn text-xl italic leading-none transition-colors duration-200 ${
                    active ? "text-black/80" : "group-hover:text-black/70"
                  }`}
                >
                  {letter}
                </span>
                {rest}
              </Link>
              <span
                aria-hidden="true"
                className={`mt-1 w-[3px] h-[3px] rounded-full bg-black/50 transition-all duration-300 ${
                  active ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`}
              />
            </li>
          );
        })}
        <li>
          <button
            className="text-black/25 cursor-not-allowed flex gap-x-2 items-center tracking-[0.22em] font-anonymous uppercase text-[9px]"
            aria-label="Work (Coming Soon)"
            disabled
          >
            <span className="font-cylburn text-xl italic leading-none">W</span>
            ork
            <span className="border border-black/15 text-[7px] tracking-[0.15em] px-1.5 py-0.5 rounded-sm text-black/25">
              soon
            </span>
          </button>
        </li>
      </ul>

      {/* Section progress dots */}
      <div
        className={`absolute bottom-0 left-8 xl:left-24 right-8 xl:right-24 flex justify-between items-center transition-all duration-300 ${
          scrolled
            ? "opacity-0 pointer-events-none translate-y-1"
            : "opacity-100"
        }`}
      ></div>

      <MobileMenu menu={menu} toggleMenu={toggleMenu} />
    </nav>
  );
}

export default Nav;
