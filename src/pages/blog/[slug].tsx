"use client";
import Head from "next/head";
import Nav from "../../components/nav";
import { usePostContext } from "../../context/PostContext";
import Image from "next/image";

export default function BlogSlugPage() {
  const { selectedPost } = usePostContext();

  if (!selectedPost) {
    return (
      <div className="p-8 min-h-screen bg-white font-anonymous relative flex overflow-hidden flex-col justify-center items-center">
        <h1 className="my-8 text-[96rem] absolute transform translate-x-1/2 left-[50%] translate-y-1/2 top-[50%] -z-10 text-gray-400 font-cylburn font-extrabold">404</h1>
        <p className="text-black text-sm text-center">No post found. Please go back to the blog page.</p>
      </div>
    );
  }

  const { post_title, post_content } = selectedPost;
  const description = post_content.slice(0, 150).replace(/\n/g, " ");
  const ogImage =  "https://from-royce.com/cover.png";
  const slug = post_title.toLowerCase().replace(/[^\w\s-]/g, "") .replace(/\s+/g, "-").replace(/-+/g, "-").trim();                   
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
    
  
    <div className=" bg-[#FFF6F6] text-black min-h-[100svh]">
      <Nav />
      <div className="xl:p-24 p-8 font-anonymous">
        <h1 className="xl:text-6xl text-3xl  font-light w-1/2 uppercase mb-2">{selectedPost.post_title}</h1>
        <p className="text-sm font-medium mt-8 uppercase">
         Date: {selectedPost.formatted_date} 
        </p>
        <p className="text-sm font-medium mt-8 uppercase">
          Time: {selectedPost.formatted_time} 
        </p>
        {selectedPost.post_image && (
        <div className="xl:w-[50%] w-[100%] h-[70vh] group hover:scale-105 hover:shadow-2xl hover:shadow-black/50 duration-500 ease-in-out transition-transform relative inset-0 overflow-hidden shadow-xl shadow-black/50 rounded-xl mx-auto my-8">
          
            <Image
              src={selectedPost.post_image}
              alt={selectedPost.post_title}
              fill
              className="mb-6 rounded-lg w-full h-full object-cover absolute transform transition duration-500 ease-in-out group-hover:scale-105"
            />
        </div>
          )}

        <p className="whitespace-pre-line mt-16 tracking-widest leading-loose font-anonymous font-light text-sm md:text-base">{selectedPost.post_content}</p>
      </div>
    </div>
    </>
  );
}
