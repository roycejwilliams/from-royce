"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePosts } from "../hooks/api";

interface PostProps {
  onReady: () => void;
}

function Post({ onReady }: PostProps) {
  const { data, isPending, isError } = usePosts();

  console.log("Output:", data, isPending, isError);

  useEffect(() => {
    if (data && data.length > 0) {
      onReady();
    }
  }, [data, onReady]);

  return (
    <div className="xl:p-24 p-8 w-full tracking-[0.1em] z-50 overflow-hidden mt-4 inline-block font-anonymous">
      {isError && <p className="text-xs text-red-400">{isError}</p>}
      {isPending ? (
        <span className="loading loading-infinity loading-md" />
      ) : (
        data.map((p) => {
          const latestPostId = Math.max(...data.map((p) => p.post_id));
          const isLatest = p.post_id === latestPostId;

          return (
            <div
              key={p.post_id}
              data-scroll
              data-scroll-speed="0.12"
              data-scroll-repeat
              className={`xl:p-4 xl:w-[55%] ${
                !isLatest ? "reveal" : ""
              } translate-y-10 transition-all duration-700 w-full mx-auto my-8 xl:my-2 xl:max-w-1/2`}
            >
              <Link
                href={`/blog/${p.slug}`}
                className="p-4 group relative flex xl:flex-row flex-col cursor-pointer hover:scale-105 transition duration-500 border-l border-t border-r border-white/50 rounded-lg shadow-lg shadow-white/70 w-full"
              >
                <div className="via-white/15 from-black/75 bg-gradient-to-t to-white/50 blur-2xl w-full h-full absolute"></div>
                {p.post_image && (
                  <div className="relative w-[100%] xl:w-[35%] xl:h-[20vh] h-[50vh] rounded-lg shadow-lg overflow-hidden inset-0 my-4">
                    <Image
                      src={p.post_image}
                      fill
                      priority
                      alt={p.post_title}
                      className="absolute w-full h-full object-cover inset-0 transform transition duration-500 ease-in-out group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="text-white flex flex-col xl:p-8 w-full justify-between">
                  <h1 className="uppercase xl:text-2xl w-fit text-base font-medium mb-2">
                    {p.post_title}
                  </h1>
                  <div className="flex justify-between gap-x-4">
                    <p className="text-xs font-thin">
                      <span className="uppercase font-light">Date:</span>{" "}
                      {p.formatted_date}
                    </p>
                    <p className="text-xs font-thin">
                      <span className="uppercase font-light">Time:</span>{" "}
                      {p.formatted_time}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Post;
