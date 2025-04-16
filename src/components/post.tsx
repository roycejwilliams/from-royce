"use client";
import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { usePostContext } from "../context/PostContext";

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
  const { setSelectedPost } = usePostContext();
  

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
        const slug = p.post_title.toLowerCase().replace(/\s+/g, "-"); // ✅ Add this
      
        return {
          ...p,
          formatted_date: formattedDate,
          formatted_time: formattedTime,
          slug, // Added slug
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
            key={p.post_id}
            className="xl:p-4 xl:w-1/2 w-full mx-auto my-8 xl:my-2 xl:max-w-1/2"
          >
            <Link
             href={`/blog/${p.slug}`}
             onClick={() => setSelectedPost(p)}
            className="block p-4 group text-black reveal bg-white cursor-pointer hover:scale-105 transition duration-500 border border-white/30 rounded-lg shadow-2xl shadow-white/70 w-full"
            >
              {p.post_image && (
                <div className="relative w-full xl:h-[65vh] md:h-[50vh] h-[35vh] rounded-lg shadow-md overflow-hidden inset-0 my-4">
                  <Image
                    src={p.post_image}
                    fill
                    alt="uploaded image"
                    className="absolute w-full h-full object-cover inset-0 transform transition duration-500 ease-in-out group-hover:scale-105"
                  />
                </div>
              )}
              <h1 className="uppercase xl:text-4xl text-2xl mb-2">{p.post_title}</h1>
              <div className="p-2 mt-4 flex justify-between items-center">
                <p className="text-xs font-thin">
                  <span className="uppercase font-light">Date:</span>{" "}
                  {p.formatted_date}
                </p>
                <p className="text-xs font-thin">
                  <span className="uppercase font-light">Time:</span>{" "}
                  {p.formatted_time}
                </p>
              </div>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Post;
