import React from "react";
import Image from "next/image";

function Footer() {
  return (
    <section className="w-full h-[80vh] relative xl:px-24 px-8 ">
      <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/20 to-white/10 backdrop-blur-lg bg-opacity-40 z-20 "></div>
      <Image
        src="/images/footer.jpg" // Correct path for images inside the public folder
        alt="footer image"
        fill
        className="object-cover absolute w-[100%] h-[100%] brightness-50 contrast-100 saturate-0 z-10"
      />
      <h2
        className="relative flex justify-center items-center gap-x-4 
  font-anonymous uppercase text-white text-xs z-30
  top-1/2 -translate-y-1/2 
  left-1/2 -translate-x-1/2
  lg:float-right lg:translate-x-0 lg:left-auto"
      >
        © 2025 <div className="w-36 border"></div> From-Royce
      </h2>
    </section>
  );
}

export default Footer;
