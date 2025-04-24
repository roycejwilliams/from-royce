"use client";
import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  post_id: number;
  post_title: string;
  post_content: string;
  post_image: string | null;
  post_time: string;
  post_date: string;
  formatted_date: string;
  formatted_time: string;
  slug: string; 
}

function Post() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Blog[]>([]);
  

  const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5002"
    : "https://from-royce.web.app";

const getAllPost = async () => {
  setLoading(true);
  setError(null);
  try {
    const res = await fetch(`${BASE_URL}/api/posts`);
    if (!res.ok) throw new Error("Error Retrieving Post");

    const response = await res.json();

    const formattedPosts = response.post.map((p: Blog) => {
      const formattedDate = p.post_date
        ? format(parseISO(p.post_date), "MM/dd/yy")
        : "Invalid date";
      const formattedTime = p.post_time
        ? format(parseISO(`1970-01-01T${p.post_time}`), "hh:mm a")
        : "Invalid time";

        const slug = p.post_title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")  // Removes special characters (like commas, quotes, etc.)
        .replace(/\s+/g, "-")      // Replaces spaces with dashes
        .replace(/-+/g, "-")       // Collapses multiple dashes
        .trim();         
      return {
        ...p,
        formatted_date: formattedDate,
        formatted_time: formattedTime,
        slug, 
      };
    });

    setPosts(formattedPosts);
  } catch (err) {
    console.log("Error:", err);
    setError("Failed to retrieve posts.");
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    getAllPost();
  }, []);



  return (
    <div className="xl:p-24 p-8 w-full tracking-[0.1em] z-50 overflow-hidden mt-16 inline-block font-anonymous">
      {error && <p className="text-xs text-red-400">{error}</p>}
      {loading ? (
        <span className="loading loading-infinity loading-lg" />
      ) : (
        posts.map((p) => (
          <div
          data-scroll
          data-scroll-speed="0.12"
          data-scroll-repeat
            key={p.post_id}
            className="xl:p-4 xl:w-[55%] reveal w-full mx-auto my-8 xl:my-2 xl:max-w-1/2 "
          >
            <Link
             href={`/blog/${p.slug}`}
            className=" p-4 group relative  flex xl:flex-row flex-col cursor-pointer hover:scale-105 transition duration-500 border-l border-t border-r border-white/50 rounded-lg shadow-2xl shadow-white/70 w-full"
            >
              <div className="via-white/15 from-black/75 bg-gradient-to-t to-white/50 blur-2xl w-full h-full  absolute"></div>

              {p.post_image && (
                <div className="relative w-[100%] xl:w-[35%] xl:h-[20vh] h-[50vh] rounded-lg shadow-lg overflow-hidden inset-0 my-4">
                  <Image
                    src={p.post_image}
                    fill
                    alt={p.post_title}
                    className="absolute w-full h-full object-cover inset-0 transform transition duration-500 ease-in-out  group-hover:scale-105"
                  />
                </div>
              )}
              <div className=" text-white flex flex-col xl:p-8 p-4 w-auto justify-between ">
              <h1 className="uppercase xl:text-2xl w-fit text-base font-medium mb-2">{p.post_title}</h1>
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
        ))
      )}
    </div>
  );
}

export default Post;
