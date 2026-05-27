import React from "react";
import Image from "next/image";

const photos = [
  { src: "/images/image25.jpg", shape: "rounded-full", span: "aspect-square" },
  {
    src: "/images/image23.jpg",
    shape: "rounded-2xl",
    span: "row-span-2 aspect-[3/4]",
  },
  { src: "/images/image24.jpg", shape: "rounded-2xl", span: "aspect-[4/3]" },
];

function WorkCon() {
  return (
    <section className="xl:px-24 px-8 py-24 flex flex-col xl:flex-row-reverse gap-16 xl:gap-24 items-center w-full">
      {/* Photo grid */}
      <div className="w-full xl:w-1/2 grid grid-cols-2 gap-3 auto-rows-auto">
        {photos.map(({ src, shape, span }) => (
          <div
            key={src}
            className={`reveal relative ${span} ${shape} overflow-hidden`}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(max-width: 1280px) 50vw, 25vw"
              className="object-cover saturate-0 transition duration-700 hover:saturate-100"
            />
          </div>
        ))}
      </div>

      {/* Text side */}
      <div className="reveal w-full xl:w-1/2 flex flex-col justify-center gap-6">
        {/* Drop cap + label row */}
        <div className="flex items-start gap-4">
          <div className="flex flex-col justify-end h-full pb-24 gap-3">
            <span className="font-anonymous uppercase text-[8px] tracking-[0.3em] text-black/30">
              On purpose
            </span>
            <div className="w-8 h-px bg-black/20" />
          </div>
        </div>

        {/* Quote body */}
        <p className="font-anonymous uppercase text-xs leading-[2.2] text-black/60 tracking-[0.08em] max-w-sm">
          <span className="font-cylburn text-[11rem] xl:text-[14rem] leading-[0] text-black/90 select-none">
            A
          </span>
          ctively contributing to initiatives that foster positive impacts. I
          engineer and cultivate sustainable products that transcend
          accessibility barriers. My purpose is aiming to make a lasting,
          meaningful difference for all.
        </p>

        {/* Attribution line */}
      </div>
    </section>
  );
}

export default WorkCon;
