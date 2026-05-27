import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { usePosts } from "../hooks/api";
import { useReveal } from "../hooks/useReveal";

function PostSkeleton() {
  return (
    <div className="w-full border-b border-black/8 py-8 animate-pulse flex gap-6 items-center">
      <div className="hidden xl:block w-[120px] h-[80px] rounded-xl bg-black/6 flex-shrink-0" />
      <div className="flex flex-col gap-3 flex-1">
        <div className="h-3 bg-black/6 rounded w-2/3" />
        <div className="h-2 bg-black/6 rounded w-1/3" />
      </div>
      <div className="w-4 h-4 rounded-full bg-black/6 flex-shrink-0" />
    </div>
  );
}

function Post() {
  const { data, isPending, isError } = usePosts();
  useReveal([data]);

  if (isError) {
    return (
      <p className="xl:px-24 px-8 font-anonymous text-[8px] tracking-[0.3em] uppercase text-black/30 mt-24 text-center">
        Failed to load posts.
      </p>
    );
  }

  if (isPending) {
    return (
      <div className="xl:px-24 px-6 mt-12">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    );
  }

  const latestId = Math.max(...data.map((p) => p.post_id));

  return (
    <div className="xl:px-24 px-6 pb-24 mt-12 w-full font-anonymous">
      {data.map((p, i) => {
        const isLatest = p.post_id === latestId;

        return (
          <div key={p.post_id} className={!isLatest ? "reveal" : ""}>
            <Link
              href={`/blog/${p.slug}`}
              className="group w-full flex items-center gap-6 xl:gap-10 py-7 border-b border-black/8 hover:border-black/20 transition-colors duration-300"
            >
              {/* Index + latest badge */}
              <div className="hidden xl:flex flex-col items-center gap-1 w-8 flex-shrink-0">
                <span className="font-anonymous text-[7px] tracking-[0.2em] uppercase text-black/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {isLatest && (
                  <span className="w-1 h-1 rounded-full bg-black/30" />
                )}
              </div>

              {/* Thumbnail */}
              {p.post_image && (
                <div className="relative w-[80px] h-[56px] xl:w-[110px] xl:h-[72px] rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={p.post_image}
                    fill
                    priority
                    alt={p.post_title}
                    className="object-cover saturate-0 group-hover:saturate-100 transition duration-500"
                  />
                </div>
              )}

              {/* Title + meta */}
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  {isLatest && (
                    <span className="font-anonymous text-[7px] tracking-[0.25em] uppercase text-black/30 border border-black/10 px-2 py-0.5 rounded-sm">
                      Latest
                    </span>
                  )}
                </div>
                <h2 className="font-anonymous uppercase text-sm xl:text-base tracking-[0.06em] text-black/70 group-hover:text-black/90 transition-colors duration-200 truncate">
                  {p.post_title}
                </h2>
                <div className="flex items-center gap-4">
                  <span className="font-anonymous text-[8px] tracking-[0.2em] uppercase text-black/25">
                    {p.formatted_date}
                  </span>
                  <span className="w-px h-2.5 bg-black/10" />
                  <span className="font-anonymous text-[8px] tracking-[0.2em] uppercase text-black/25">
                    {p.formatted_time}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <ArrowUpRight
                size={14}
                className="text-black/20 group-hover:text-black/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 flex-shrink-0"
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Post;
