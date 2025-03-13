import React from "react";
import Image from "next/image";

function WorkCon() {
  return (
    <section className="md:p-24 h-[100vh] flex md:justify-center md:items-center xl:flex-row-reverse  w-full relative">
      <div className="xl:w-1/2 w-full min-h-[90vh] relative  flex justify-center items-center">
        <div
          data-scroll
          data-scroll-speed="0.1"
          className="absolute  xl:left-0 -translate-x-1/2  top-0 md:w-80 md:h-80 w-64 h-64 overflow-hidden rounded-full z-20 shadow-sm"
        >
          <Image
            src="/images/image25.jpg"
            fill
            alt=""
            className="w-full h-full object-fill"
          />
        </div>
        <div
          data-scroll
          data-scroll-speed="0.18"
          className="absolute md:min-w-96 border md:min-h-96 min-w-72 min-h-72  overflow-hidden xl:left-1/4 md:left-10  -translate-x-1/2 xl:top-1/4 top-[20%] rounded-2xl z-10 shadow-sm"
        >
          <Image
            src="/images/image23.jpg"
            fill
            alt=""
            className="w-full h-full object-fill"
          />
        </div>
        <div
          data-scroll
          data-scroll-speed="0.26"
          className="absolute md:min-w-96 md:min-h-72 min-w-80 min-h-60  overflow-hidden xl:left-16  -translate-x-1/2 xl:top-[55%] md:top-[50%] lg:top-[40%] top-[40%] rounded-2xl shadow-sm"
        >
          <Image
            src="/images/image24.jpg"
            fill
            alt=""
            className="w-full h-full object-fill"
          />
        </div>
      </div>
      <div className=" w-1/2 p-24 xl:flex hidden justify-center items-center">
        <h1 className="uppercase text-sm font-anonymous mt-80 leading-[2rem] text-white/90">
          <span className="font-cylburn text-[22rem]">A</span>ctively
          contributing to initiatives that foster positive impacts. I engineer
          and cultivate sustainable products that transcend accessibility
          barriers. My purpose is aiming to make a lasting, meaningful
          difference for all.
        </h1>
      </div>
    </section>
  );
}

export default WorkCon;
