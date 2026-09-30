import Link from "next/link";
import { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const LINKS = [
  { href: "/portfolio", letter: "H", rest: "ome", label: "Home" },
  { href: "/blog", letter: "E", rest: "thos", label: "Ethos" },
  { href: "/work", letter: "W", rest: "ork", label: "Work" },
];

const MobileMenu = ({
  menu,
  toggleMenu,
}: {
  menu: boolean;
  toggleMenu: () => void;
}) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const linksRef = useRef<HTMLUListElement | null>(null);
  const router = useRouter();
  const toggleMenuRef = useRef(toggleMenu);
  toggleMenuRef.current = toggleMenu;

  useEffect(() => {
    if (!menu) return;
    const background = document.querySelector<HTMLElement>("#page-content");
    const wasInert = background?.inert ?? false;
    const frame = requestAnimationFrame(() => linksRef.current?.querySelector<HTMLAnchorElement>("a")?.focus());
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); toggleMenuRef.current(); return; }
      if (event.key !== "Tab") return;
      const focusable = [toggleRef.current, ...Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a,button") ?? [])].filter(Boolean) as HTMLElement[];
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (!focusable.includes(document.activeElement as HTMLElement)) { event.preventDefault(); (event.shiftKey ? last : first)?.focus(); return; }
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", keydown);
    if (background && !background.contains(menuRef.current)) background.inert = true;
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", keydown);
      if (background) background.inert = wasInert;
      toggleRef.current?.focus();
    };
  }, [menu]);

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
        ref={toggleRef}
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
        aria-label="Main navigation"
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
                  className={`inline-flex flex-nowrap items-baseline whitespace-nowrap uppercase font-['Anonymous_Pro_Minus'] text-2xl sm:text-4xl transition-colors duration-200 ${
                    active
                      ? "text-black/80"
                      : "text-black/25 hover:text-black/60"
                  }`}
                >
                  <span className="font-cylburn text-4xl sm:text-6xl leading-none tracking-normal shrink-0">
                    {letter}
                  </span>
                  <span className="text-lg sm:text-2xl ml-2 tracking-[0.12em]">{rest}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Bottom: socials + label */}
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
