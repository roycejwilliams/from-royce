import Link from "next/link";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const MobileMenu = ({
  menu,
  toggleMenu,
}: {
  menu: boolean;
  toggleMenu: () => void;
}) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (menu) {
      gsap.to(menuRef.current, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        display: "flex",
      });
    } else {
      gsap.to(menuRef.current, {
        x:0,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => {
          if (menuRef.current) {
            menuRef.current.style.display = "none"; // Hide after animation
          }
        },
      });
    }
  }, [menu]);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleMenu}
        className="min-w-8 min-h-8 rounded-full xl:hidden relative overflow-hidden z-50 flex justify-center items-center cursor-pointer"
      >
        <span
          className={`text-4xl font-anonymous text-[#888898] ${
            menu ? "rotate-[135deg]" : "rotate-0"
          } ease-in-out duration-300 transition`}
        >
          +
        </span>
      </button>

      {/* Always Render the Section, But Hide It */}
      <section
        ref={menuRef}
        className="bg-[#FFFFF8]/65 backdrop-blur-md  flex-col justify-center items-end px-8 fixed h-screen w-screen left-0 top-0 z-40 opacity-0 translate-x-full hidden"
      >
        <div className="text-[#828282] cursor-pointer z-40 flex gap-x-1 justify-center hover:text-white duration-200 ease-in-out transition items-center tracking-[0.2em] rounded-full text-center group">
          <div className="relative px-4 py-2 mt-4 rounded-full tracking-[0.2em] transition font-anonymous uppercase text-xs">
            <span className="transition-opacity duration-200 ease-in-out opacity-100 group-hover:opacity-0 text-sm">
              <span className="font-cylburn text-4xl">w</span>ork
            </span>
            <span className="absolute inset-0 transition-opacity duration-200 ease-in-out opacity-0 group-hover:opacity-100 text-sm">
              <span className="font-cylburn text-4xl">c</span>oming soon
            </span>
          </div>
        </div>

        <Link
          href="/blog"
          className="text-[#828282] cursor-pointer z-40 flex gap-x-1 justify-center hover:text-white duration-200 ease-in-out transition items-center tracking-[0.2em] rounded-full text-center group"
        >
          <div className="px-4 py-2 mt-4 rounded-full tracking-widest font-anonymous uppercase text-sm">
            <span className="font-cylburn text-4xl">e</span>thos
          </div>
        </Link>
      </section>
    </>
  );
};

export default MobileMenu;
