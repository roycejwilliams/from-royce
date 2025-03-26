import React from "react";
import Image from "next/image";

function Work() {
  return (
    <section className="xl:p-24 h-[100vh] flex flex-col lg:flex-row md:justify-center md:items-center w-full relative">
      <div className="relative w-full xl:w-1/2 h-full flex justify-center items-center">
        <div
          data-scroll
          data-scroll-speed="0.12"
          data-scroll-repeat
          className="reveal w-72 h-72 md:w-96 md:h-96 absolute xl:left-8 top-0 -translate-x-1/2 rounded-full shadow-sm overflow-hidden opacity-0 translate-y-10 transition-all duration-700"
        >
          <Image
            src="/images/image6.jpg"
            alt="image6"
            fill
            className="absolute top-8 w-full h-full object-cover"
          />
        </div>

        <div
          data-scroll
          data-scroll-speed="0.16"
          data-scroll-repeat
          className="reveal w-72 h-96 md:w-80 md:96 absolute xl:top-[10rem] md:top-[14rem] top-[12rem] xl:left-1/3 -translate-x-1/2 rounded-md shadow-sm overflow-hidden opacity-0 translate-y-10 transition-all duration-700"
        >
          <Image
            src="/images/image5.jpg"
            alt="image5"
            fill
            className="absolute w-full h-full object-cover saturate-0"
          />
        </div>

        <div
          data-scroll
          data-scroll-speed="0.20"
          data-scroll-repeat
          className="reveal w-96 h-52 md:h-60 absolute xl:left-0 top-[26rem] -translate-x-1/2 rounded-full shadow-sm overflow-hidden opacity-0 translate-y-10 transition-all duration-700"
        >
          <Image
            src="/images/image8.jpg"
            alt="image8"
            fill
            className="absolute w-full h-full object-cover saturate-0"
          />
        </div>

        <div
          data-scroll
          data-scroll-speed="0.24"
          data-scroll-repeat
          className="reveal w-60 h-60 md:w-72 md:h-72 absolute -translate-x-1/2 left-1/4 top-[34rem] rounded-md shadow-sm overflow-hidden opacity-0 translate-y-10 transition-all duration-700"
        >
          <Image
            src="/images/image7.jpg"
            alt="image7"
            fill
            className="absolute w-full h-full object-cover saturate-0"
          />
        </div>
      </div>

      <div
        data-scroll
        data-scroll-repeat
        className="reveal w-1/2 p-16 hidden xl:flex justify-center items-center opacity-0 translate-y-10 transition-all duration-700"
      >
        <h1 className="uppercase text-sm font-anonymous mt-16 leading-[2rem] text-white/90">
          <span className="font-cylburn text-[22rem]">Q</span>uality in a
          product creates a compass, guiding users through their journey with
          confidence and trust.
        </h1>
      </div>
    </section>
  );
}

export default Work;
