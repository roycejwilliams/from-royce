"use client";
import Nav from "../../components/nav";
import { usePostContext } from "../../context/PostContext";
import Image from "next/image";

export default function BlogSlugPage() {
  const { selectedPost } = usePostContext();

  if (!selectedPost) {
    return (
      <div className="p-8 min-h-screen bg-white font-anonymous flex justify-center items-center">
        <p className="text-black">No post found. Please go back to the blog page.</p>
      </div>
    );
  }

  return (
    <div className=" bg-[#FFF6F6] text-black min-h-[100svh]">
      <Nav />
      <div className="xl:p-24 p-8">
        <h1 className="xl:text-6xl text-3xl  font-light font-anonymous uppercase mb-2">{selectedPost.post_title}</h1>
        <p className="text-sm font-medium mt-8 uppercase">
         Date: {selectedPost.formatted_date} 
        </p>
        <p className="text-sm font-medium mt-8 uppercase">
          Time: {selectedPost.formatted_time} 
        </p>
        {selectedPost.post_image && (
        <div className="xl:w-[50%] w-[100%] h-[65vh] group hover:scale-105 hover:shadow-2xl hover:shadow-black/50 duration-500 ease-in-out transition-transform relative inset-0 overflow-hidden shadow-xl shadow-black/50 rounded-xl mx-auto my-8">
          
            <Image
              src={selectedPost.post_image}
              alt={selectedPost.post_title}
              fill
              className="mb-6 rounded-lg w-full h-full object-cover absolute transform transition duration-500 ease-in-out group-hover:scale-105"
            />
        </div>
          )}

        <p className="whitespace-pre-line mt-16 tracking-widest leading-loose font-anonymous text-justify xl:text-left font-light text-sm md:text-base">{selectedPost.post_content}</p>
      </div>
    </div>
  );
}
