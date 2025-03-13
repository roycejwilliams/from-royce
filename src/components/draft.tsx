import React, { useRef, useState, useEffect } from "react";
import {
  Send,
  Aperture,
  CircleCheckBig,
  CircleSlash,
} from "lucide-react";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Upload from "./uploadImage";
import Image from "next/image";

interface FileExtended extends File {
  url?: string;
}

const Draft: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [textArea, setTextArea] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const textRef = useRef<HTMLTextAreaElement>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextArea(e.target.value);

    if (textRef.current) {
      textRef.current.style.height = "auto"; // Reset to auto to recalculate
      const newHeight = textRef.current.scrollHeight;
      const maxHeight = window.innerHeight * 0.15;

      textRef.current.style.height = `${Math.min(newHeight, maxHeight)}px`;
      textRef.current.style.overflowY =
        newHeight >= maxHeight ? "auto" : "hidden"; // Enable scroll if exceeded
    }
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleFileUpload = (files: FileExtended[]) => {
    if (files.length > 0) {
      const file = files[0];
      setImageUrl(file.url || null);
      setUploadedFile(file);
    } else {
      setImageUrl(null);
      setUploadedFile(null);
    }
  };

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
    };
  }, [imageUrl]);

  //Send Post
  const handleSubmit = async () => {
    if (!title || !textArea) {
      console.log("Title and content are required!");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    let finalImageUrl = imageUrl; // Default to selected file URL if available

    if (uploadedFile) {
      const imageRef = ref(storage, `posts/${uploadedFile.name}-${Date.now()}`);

      try {
        // ✅ Upload image to Firebase Storage
        const snapshot = await uploadBytes(imageRef, uploadedFile);
        const firebaseImageUrl = await getDownloadURL(snapshot.ref);
        console.log("Image uploaded to Firebase:", firebaseImageUrl);

        // ✅ Update state with Firebase image URL before sending
        setImageUrl(firebaseImageUrl);
        finalImageUrl = firebaseImageUrl;
      } catch (error) {
        console.error("Error uploading image:", error);
        setError("Image upload failed");
        setLoading(false);
        return;
      }
    }

    try {
      const res = await fetch("http://localhost:5001/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content: textArea,
          image: finalImageUrl,
        }),
      });

      if (!res.ok) {
        throw new Error("Error Sending Post!");
      }

      const response = await res.json();
      console.log("Success:", response);
      setSuccess(true);
    } catch  {
      setError("Failed to send post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 5000); // Clear success after 3 seconds

      return () => clearTimeout(timer); // Cleanup
    }
  }, [success]);

  return (
    <div className="w-full flex flex-col  justify-center items-center mx-auto">
      <h1 className="font-light uppercase tracking-wider font-anonymous sm:text-xs  my-8 text-gray-500/75">
        {loading ? (
          "Sending, please wait..."
        ) : success ? (
          <span className="p-4 relative">
            <CircleCheckBig className="absolute text-green-500 w-8 h-8 -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2" />
          </span>
        ) : error ? (
          <div className="p-4 relative flex">
            <CircleSlash className=" text-red-500 w-8 h-8 -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2" />
          </div>
        ) : (
          "What's on your mind?"
        )}
      </h1>

      <div className="p-4 space-y-4 md:space-y-6 sm:p-8 bg-white/30 backdrop-blur-2xl shadow-[0px_5px_30px_5px_#FFFFFF] hover:shadow-[0px_15px_50px_10px_#FFFFFF] ease-in-out transition duration-200 border border-t border-l border-r sm:max-w-lg w-[90%] tracking-[0.1em] rounded-xl">
        {loading ? (
          <div className="w-full flex flex-col text-xs justify-center items-center space-y-2">
            <span className="loading loading-dots loading-sm text-center"></span>
            <p className="text-gray-500 font-medium">Submitting...</p>
          </div>
        ) : (
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="lg:gap-x-4 gap-y-4 flex flex-col lg:flex-row items-center justify-between"
          >
            <div className="flex flex-col gap-y-4 p-4 max-w-1/2 w-5/6">
              <input
                onChange={handleTitle}
                name="title"
                id="title"
                placeholder="What's the topic?"
                className="border text-xs border-gray-200  placeholder:text-black/40 rounded-md bg-transparent focus:ring-primary-600 focus:border-primary-600 block p-4"
              />
              <textarea
                ref={textRef}
                onChange={handleInput}
                name="post"
                id="post"
                className="border text-xs border-gray-200 max-h-3/4 placeholder:text-black/40 transition-[height] bg-transparent duration-300 ease-in-out  rounded-md focus:ring-primary-600 focus:border-primary-600 block p-4"
                placeholder="Let it out."
                value={textArea}
                required
                rows={2}
              />
              {imageUrl && (
                <div className="relative w-full h-[40vh] rounded-md overflow-hidden border">
                  <Image
                    src={imageUrl}
                    fill
                    alt="Uploaded image preview"
                    className="absolute w-full h-full object-cover inset-0"
                  />
                </div>
              )}
            </div>
            <div className="flex lg:flex-col flex-row gap-x-4 lg:gap-y-4">
              <Upload onFilesSelected={handleFileUpload}>
                <button
                  type="button"
                  className="p-4 flex items-center hover:scale-110 duration-200 transition ease-in-out justify-center relative rounded-full border"
                >
                  <Aperture className="absolute w-5 h-5 -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2" />
                </button>
              </Upload>
              <button
                type="submit"
                disabled={loading}
                className={`p-4 flex items-center hover:scale-110 duration-200 transition ease-in-out justify-center relative rounded-full border ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Send className="absolute w-5 h-5 -translate-x-1/2 left-1/2 -translate-y-1/2 top-1/2" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Draft;
