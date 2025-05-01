"use client";
import Head from "next/head";
import Nav from "../../components/nav";
import Image from "next/image";
import { useEffect, useState, useCallback} from "react";
import { useParams } from "next/navigation";
import { format, parseISO } from "date-fns";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


interface BlogPost {
  post_id: number;
  post_title: string;
  post_content: string;
  post_image: string | null;
  post_time: string;
  post_date: string;
  formatted_date: string;
  formatted_time: string;
}

export default function BlogSlugPage() {
  const params = useParams(); 
  const slug = params?.slug;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
 
  const BASE_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:5002"
      : "https://from-royce.web.app";

  const fetchPost = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/posts`);
      const data = await res.json();

      const matchingPost = data.post.find((p: BlogPost) => {
        const cleanedSlug = p.post_title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim();

        return cleanedSlug === slug;
      });

      if (matchingPost) {
        matchingPost.formatted_date = format(parseISO(matchingPost.post_date), "MM/dd/yy");
        matchingPost.formatted_time = format(parseISO(`1970-01-01T${matchingPost.post_time}`), "hh:mm a");
      }

      setPost(matchingPost || null);
    } finally {
      setLoading(false);
    }
  }, [slug, BASE_URL]);

  useEffect(() => {
    if (!slug) return;
    fetchPost();
  }, [fetchPost, slug]);

  useGSAP(() => {
    if (!post) return;
  
    gsap.fromTo(
      '.show',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power3.out", 
        delay: 0.2,
      }
    );
  }, [post]);

   if (loading) return <p className="p-8 text-center"></p>;

   if (!post) {
     return (
       <div className="p-8 min-h-screen bg-white font-anonymous relative flex flex-col justify-end items-center overflow-hidden">
         <h1 className=" font-extrabold absolute xl:text-[52rem] text-[18rem] w-fit h-fit transform left-[48%] -translate-x-1/2  top-[60%] -translate-y-1/2 z-10 font-cylburn">404</h1>
         <p className="text-black text-xs text-center mb-52">No post found. Please go back to the blog page.</p>
       </div>
     );
   }

   const { post_title, post_content, post_image, formatted_date, formatted_time } = post; // Object Destructing
   const description = post_content.slice(0, 150).replace(/\n/g, " ");
   const ogImage = "https://from-royce.com/cover.png";
   const url = `https://from-royce.com/blog/${slug}`;

  
  return (
    <>
      <Head>
        <title>{post_title} – Royce</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`${post_title} by royce`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${post_title} – Royce`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <div className="bg-[#FFF6F6] text-black min-h-[100svh]">
        <Nav />
        <div className="xl:p-24 p-8 font-anonymous">
          <h1  className="xl:text-6xl text-3xl show font-light uppercase mb-2">{post_title}</h1>
          <p  className="text-sm font-medium show mt-8 uppercase">Date: {formatted_date}</p>
          <p  className="text-sm font-medium show mt-8 uppercase">Time: {formatted_time}</p>

        {post_image && (
            <div 
            className="xl:w-[50%] w-[100%] h-[65vh] show group hover:scale-105 hover:shadow-2xl hover:shadow-black/50 duration-500 ease-in-out transition-transform relative inset-0 overflow-hidden shadow-xl shadow-black/50 rounded-xl mx-auto my-8">
              <Image
                src={post_image}
                alt={post_title}
                fill
                priority
                className="mb-6 rounded-lg w-full h-full object-cover absolute transform transition duration-500 ease-in-out group-hover:scale-105"
              />
            </div>
        )}
          <p className="whitespace-pre-line mt-16 tracking-widest leading-loose font-anonymous font-light text-sm md:text-base">
            {post_content}
          </p>
        </div>
      </div>
    </>
  );
}