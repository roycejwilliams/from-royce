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
          
          <div className="relative  mt-4 rounded-full tracking-[0.2em] transition font-anonymous uppercase text-xs">
            <span className="transition-opacity duration-200 ease-in-out opacity-100 group-hover:opacity-0">
              <span className="font-cylburn text-2xl">w</span>ork
            </span>
            <span className="absolute inset-0 transition-opacity duration-200 ease-in-out opacity-0 group-hover:opacity-100">
              <span className="font-cylburn text-2xl">S</span>oon
            </span>
          </div>
        </div>

        <Link
          href="/blog"
          className="text-[#828282] px-4 cursor-pointer z-40 flex gap-x-1 justify-center hover:text-black duration-200 ease-in-out transition items-center tracking-[0.2em] rounded-full text-center group"
        >
         

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
