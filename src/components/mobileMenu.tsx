import Link from "next/link";
import React, {  useRef } from "react";
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
        className="bg-[#FFFFF8]/65 backdrop-blur-md  flex-col justify-center items-end px-8 gap-y-8 fixed h-screen w-screen left-0 top-0 z-40 opacity-0 translate-x-full hidden"
      >
        <div className="text-[#828282] cursor-pointer z-40 flex gap-x-1  justify-center hover:text-[#844444] duration-200 ease-in-out transition items-center tracking-[0.2em] rounded-full group">
          <div className="relative  mt-4 rounded-full tracking-[0.2em] transition font-anonymous uppercase text-xs">
            <span className="transition-opacity duration-200 ease-in-out opacity-100 group-hover:opacity-0 text-sm">
              <span className="font-cylburn text-3xl">w</span>ork
            </span>
            <span className="absolute inset-0 transition-opacity  duration-200 ease-in-out text-left opacity-0 group-hover:opacity-100 text-sm">
              <span className="font-cylburn text-3xl">s</span>oon
            </span>
          </div>
        </div>

        <Link
          href="/blog"
          className="text-[#828282] cursor-pointer z-40 flex gap-x-1 justify-center hover:text-[#844444] duration-200 ease-in-out transition items-center tracking-[0.2em] rounded-full  group"
        >
          <div className=" mt-4 rounded-full tracking-widest font-anonymous uppercase text-sm">
            <span className="font-cylburn text-5xl">e</span>thos
          </div>
        </Link>
      </section>
    </>
  );
};

export default MobileMenu;
