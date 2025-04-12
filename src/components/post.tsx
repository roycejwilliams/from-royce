"use client";
import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import Image from "next/image";

interface Blog {
  post_id: number; // Matches SERIAL PRIMARY KEY
  post_title: string; // Matches VARCHAR(500) NOT NULL
  post_content: string; // Matches TEXT NOT NULL
  post_image: string | null; // Matches VARCHAR(255), nullable
  post_time: string; // Matches TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  post_date: string;
  formatted_date: string;
  formatted_time: string;
}

declare global {
  interface Window {
    locomotive: {
      update: () => void;
      // add other methods if needed like start, stop etc.
    };
  }
}

function Post() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<Blog[]>([]);

  const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/from-royce/us-central1/nextApp"
    : "https://from-royce.web.app";

  const getAllPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BASE_URL}/api/posts`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Error Retrieving Post");
      }

      const response = await res.json();

      // Process each post to add formatted fields
      const formattedPosts = response.post.map((p: Blog) => {
        // Format post_date as MM/DD/YY
        const formattedDate = p.post_date
          ? format(parseISO(p.post_date), "MM/dd/yy")
          : "Invalid date";

        // Format post_time as HH:MM AM/PM
        const formattedTime = p.post_time
          ? format(parseISO(`1970-01-01T${p.post_time}`), "hh:mm a")
          : "Invalid time";

        return {
          ...p,
          formatted_date: formattedDate,
          formatted_time: formattedTime,
        };
      });

      setPost(formattedPosts);

      if (typeof window !== 'undefined' && window.locomotive) {
        window.locomotive.update();
      }
    } catch (error) {
      console.log("Error Retrieving Blog Post: ", error);
      setError("Failed to retrieve posts.");
    } finally {
      setLoading(false);
    }
  };

  console.log("Individual Post:", post);

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <div className="xl:p-24 p-8 w-full tracking-[0.1em] z-50 overflow-hidden text-white mt-24 inline-block font-anonymous">
      {error && <p className="text-xs text-red-400">{error}</p>}
      {post.length === 0  ?       <>{loading && <span className="loading loading-infinity loading-lg"></span>} </>
 : 
      <>
      {post.map((p, index) => (
        <>
          <div
        data-scroll
        data-scroll-speed="0.12"
        data-scroll-repeat
        className={`w-full flex reveal opacity-0 translate-y-10 transition-all duration-700 ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            } `}
          >
            {" "}
            <div
              
              className="xl:p-4 xl:w-1/2 w-full my-8 xl:my-2 xl:max-w-1/2 "
            >
              <h1 className="uppercase text-2xl mb-2">{p.post_title}</h1>
              {p.post_image ? (
                <div className="relative w-full h-[75vh] rounded-lg shadow-md overflow-hidden inset-0 my-4">
                  <Image
                    src={p.post_image || ""}
                    fill
                    alt="uploaded image"
                    className="absolute w-full h-full object-cover"
                  />
                </div>
              ) : (
                ""
              )}
              <div
              
                key={index}
                className="p-4  border-white/40   rounded-lg shadow-md shadow-white/20 h-auto w-fit  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-30"
              >
                <p className="my-4 text-xs font-thin"> {p.post_content}</p>
              </div>
              <div className="p-2 mt-2 flex justify-between items-center">
                <p className="text-xs font-thin">
                  {" "}
                  <span className="uppercase font-light">Date:</span>{" "}
                  {p.formatted_date}
                </p>

                <p className="text-xs font-thin">
                  <span className="uppercase font-light">Time:</span>{" "}
                  {p.formatted_time}
                </p>
              </div>
            </div>
          </div>
        </>
      ))}
      </>
    }
    </div>
  );
}

export default Post;
