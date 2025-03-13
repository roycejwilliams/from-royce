import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./mobileMenu";

function Nav() {
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };

  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.height = "100vh";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.height = "";
    };
  }, [menu]);

  return (
    <div className="xl:px-24 px-8 py-4 w-full flex justify-between items-center">
      <Link href="/portfolio" className="z-40">
        <Image
          src="/images/royce-logo.png"
          alt="from royce logo"
          width={55}
          height={55}
          className="object-contain hover:invert duration-200 ease-in-out transition"
        />
      </Link>

      {/* Desktop Nav */}
      <div className="xl:flex gap-x-12 hidden">
        <div className="text-[#828282] px-4 cursor-pointer z-40 flex gap-x-4 justify-center hover:text-black duration-200 ease-in-out transition items-center tracking-[0.2em] rounded-full text-center group">
          {/* <div className="relative w-8 h-8">
            <svg
              className="w-full h-full z-50  absolute -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2" // Inherits width and height from parent
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="25"
                cy="25"
                r="23.5"
                stroke="#FF5C00"
                strokeWidth="3"
                strokeDasharray="6 6"
                fill="none"
                className="hover:rotate-[270deg] transition duration-300 ease-in-out"
              />
              <path
                d="M37.3839 26.3839C37.872 25.8957 37.872 25.1043 37.3839 24.6161L29.4289 16.6612C28.9408 16.173 28.1493 16.173 27.6612 16.6612C27.173 17.1493 27.173 17.9408 27.6612 18.4289L34.7322 25.5L27.6612 32.5711C27.173 33.0592 27.173 33.8507 27.6612 34.3388C28.1493 34.827 28.9408 34.827 29.4289 34.3388L37.3839 26.3839ZM13.5 26.75H36.5V24.25H13.5V26.75Z"
                fill="#FF5C00"
              />
            </svg>
          </div> */}
          <div className="relative  mt-4 rounded-full tracking-[0.2em] transition font-anonymous uppercase text-xs">
            <span className="transition-opacity duration-200 ease-in-out opacity-100 group-hover:opacity-0">
              <span className="font-cylburn text-2xl">w</span>ork
            </span>
            <span className="absolute inset-0 transition-opacity duration-200 ease-in-out opacity-0 group-hover:opacity-100">
              <span className="font-cylburn text-2xl">c</span>oming soon
            </span>
          </div>
        </div>

        <Link
          href="/blog"
          className="text-[#828282] px-4 cursor-pointer z-40 flex gap-x-1 justify-center hover:text-black duration-200 ease-in-out transition items-center tracking-[0.2em] rounded-full text-center group"
        >
          {/* <div className="relative w-8 h-8">
            <svg
              className="w-full h-full z-50 absolute -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2" // Inherits width and height from parent
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="1.5"
                y="1.5"
                width="47"
                height="47"
                rx="23.5"
                stroke="#FF5C00"
                strokeWidth="3"
                strokeDasharray="6 6"
              />
              <path
                d="M37.3839 26.3839C37.872 25.8957 37.872 25.1043 37.3839 24.6161L29.4289 16.6612C28.9408 16.173 28.1493 16.173 27.6612 16.6612C27.173 17.1493 27.173 17.9408 27.6612 18.4289L34.7322 25.5L27.6612 32.5711C27.173 33.0592 27.173 33.8507 27.6612 34.3388C28.1493 34.827 28.9408 34.827 29.4289 34.3388L37.3839 26.3839ZM13.5 26.75H36.5V24.25H13.5V26.75Z"
                fill="#FF5C00"
              />
            </svg>
          </div> */}

          <div className=" mt-4 rounded-full tracking-widest font-anonymous uppercase text-xs">
            <span className="font-cylburn text-2xl">e</span>thos
          </div>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <MobileMenu menu={menu} toggleMenu={toggleMenu} />
    </div>
  );
}

export default Nav;
