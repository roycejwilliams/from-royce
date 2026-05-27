import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const LINKS = [
  { href: "/portfolio", letter: "H", rest: "ome", label: "Home" },
  { href: "/blog", letter: "E", rest: "thos", label: "Ethos" },
];

const MobileMenu = ({
  menu,
  toggleMenu,
}: {
  menu: boolean;
  toggleMenu: () => void;
}) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<HTMLUListElement | null>(null);
  const router = useRouter();

  const isActive = (href: string) => router.pathname.startsWith(href);

  useGSAP(() => {
    if (menu) {
      gsap.to(menuRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        display: "flex",
      });
      gsap.fromTo(
        linksRef.current?.querySelectorAll("li") ?? [],
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.07,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.15,
        },
      );
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (menuRef.current) menuRef.current.style.display = "none";
        },
      });
    }
  }, [menu]);

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={toggleMenu}
        className="min-w-8 min-h-8 xl:hidden relative z-50 flex justify-center items-center cursor-pointer"
        aria-label={menu ? "Close menu" : "Open menu"}
        aria-expanded={menu}
        aria-controls="mobile-navigation"
      >
        <span
          className={`text-3xl font-anonymous text-black/40 leading-none transition-transform duration-300 ease-in-out ${
            menu ? "rotate-[135deg]" : "rotate-0"
          }`}
        >
          +
        </span>
      </button>

      {/* Overlay */}
      <nav
        ref={menuRef}
        id="mobile-navigation"
        aria-hidden={!menu}
        className="fixed inset-0 z-40 hidden opacity-0 flex-col justify-between bg-[#f0ebe5] px-8 pt-28 pb-16 overflow-y-auto"
      >
        {/* Links */}
        <ul ref={linksRef} className="flex flex-col gap-y-2 pt-2 overflow-visible">
          {LINKS.map(({ href, letter, rest }) => {
            const active = isActive(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={toggleMenu}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-baseline gap-1 tracking-[0.12em] uppercase font-anonymous text-4xl transition-colors duration-200 ${
                    active
                      ? "text-black/80"
                      : "text-black/25 hover:text-black/60"
                  }`}
                >
                  <span className="font-cylburn text-7xl leading-[0.9] block">
                    {letter}
                  </span>
                  <span className="text-2xl">{rest}</span>
                </Link>
              </li>
            );
          })}

          {/* Work — coming soon */}
          <li>
            <span className="flex items-baseline gap-1 tracking-[0.12em] uppercase font-anonymous text-black/15 cursor-not-allowed">
              <span className="font-cylburn text-7xl leading-[0.9] block">W</span>
              <span className="text-2xl">ork</span>
              <span className="font-anonymous text-[8px] tracking-[0.2em] uppercase text-black/20 border border-black/10 px-2 py-1 rounded-sm ml-2 self-center">
                soon
              </span>
            </span>
          </li>
        </ul>

        {/* Bottom — socials + label */}
        <div className="flex flex-col gap-4">
          <div className="w-6 h-px bg-black/15" />
          <div className="flex gap-6 items-center">
            <Link
              href="https://instagram.com/roycejwilliams"
              target="_blank"
              rel="noopener noreferrer"
              className="font-anonymous uppercase text-[8px] tracking-[0.25em] text-black/30 hover:text-black/60 transition-colors duration-200"
            >
              Instagram
            </Link>
            <Link
              href="https://github.com/roycejwilliams"
              target="_blank"
              rel="noopener noreferrer"
              className="font-anonymous uppercase text-[8px] tracking-[0.25em] text-black/30 hover:text-black/60 transition-colors duration-200"
            >
              Github
            </Link>
            <Link
              href="https://www.linkedin.com/in/royce-williams-9bb2021a1/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-anonymous uppercase text-[8px] tracking-[0.25em] text-black/30 hover:text-black/60 transition-colors duration-200"
            >
              LinkedIn
            </Link>
          </div>
          <span className="font-anonymous uppercase text-[7px] tracking-[0.3em] text-black/20">
            © 2026 From-Royce
          </span>
        </div>
      </nav>
    </>
  );
};

export default MobileMenu;
