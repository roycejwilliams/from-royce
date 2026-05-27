import React, { useRef, useState, useEffect } from "react";
import { Send, Aperture, CircleCheckBig, CircleSlash } from "lucide-react";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Upload from "./uploadImage";
import Image from "next/image";
import { useCreatePost } from "../hooks/api";

interface FileExtended extends File {
  url?: string;
}

const Draft: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [textArea, setTextArea] = useState("");
  const [title, setTitle] = useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);

  const {
    mutate: createPost,
    isPending,
    isSuccess,
    isError,
    reset,
  } = useCreatePost();

  useEffect(() => {
    if (imageUrl?.startsWith("blob:")) {
      return () => URL.revokeObjectURL(imageUrl);
    }
  }, [imageUrl]);

  useEffect(() => {
    if (isSuccess) {
      const t = setTimeout(reset, 5000);
      return () => clearTimeout(t);
    }
  }, [isSuccess, reset]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextArea(e.target.value);
    if (textRef.current) {
      textRef.current.style.height = "auto";
      const maxH = window.innerHeight * 0.4;
      const newH = textRef.current.scrollHeight;
      textRef.current.style.height = `${Math.min(newH, maxH)}px`;
      textRef.current.style.overflowY = newH >= maxH ? "auto" : "hidden";
    }
  };

  const handleFileUpload = (files: FileExtended[]) => {
    if (files.length > 0) {
      setImageUrl(files[0].url ?? null);
      setUploadedFile(files[0]);
    } else {
      setImageUrl(null);
      setUploadedFile(null);
    }
  };

  const handleSubmit = async () => {
    if (!title || !textArea) return;

    let finalImageUrl = imageUrl;

    if (uploadedFile) {
      const imageRef = ref(storage, `posts/${uploadedFile.name}-${Date.now()}`);
      try {
        const snapshot = await uploadBytes(imageRef, uploadedFile);
        finalImageUrl = await getDownloadURL(snapshot.ref);
        setImageUrl(finalImageUrl);
      } catch {
        return;
      }
    }

    createPost(
      { title, content: textArea, image: finalImageUrl },
      {
        onSuccess: () => {
          setTitle("");
          setTextArea("");
          setImageUrl(null);
          setUploadedFile(null);
        },
      },
    );
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center xl:px-24 px-6">
      <div className="w-full max-w-lg flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-4 h-px bg-black/20" />
            <span className="font-anonymous uppercase text-[8px] tracking-[0.35em] text-black/30">
              Draft
            </span>
          </div>
          <h1 className="font-anonymous uppercase text-black/80 tracking-[0.08em] text-sm">
            <span className="font-cylburn text-5xl leading-none">W</span>rite
          </h1>
        </div>

        {/* Status */}
        {isSuccess && (
          <div className="flex items-center gap-3">
            <CircleCheckBig className="w-4 h-4 text-black/40" />
            <span className="font-anonymous uppercase text-[8px] tracking-[0.25em] text-black/40">
              Published
            </span>
          </div>
        )}
        {isError && (
          <div className="flex items-center gap-3">
            <CircleSlash className="w-4 h-4 text-red-400" />
            <span className="font-anonymous uppercase text-[8px] tracking-[0.25em] text-red-400">
              Something went wrong
            </span>
          </div>
        )}

        {/* Form */}
        {isPending ? (
          <div className="flex items-center gap-3">
            <span className="font-anonymous uppercase text-[8px] tracking-[0.35em] text-black/30 animate-pulse">
              Publishing...
            </span>
          </div>
        ) : (
          <form
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex flex-col gap-6"
          >
            {/* Title */}
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              id="title"
              placeholder="Title"
              required
              className="w-full bg-transparent border-b border-black/15 py-3 font-anonymous text-xs tracking-[0.08em] text-black/70 placeholder:text-black/25 outline-none focus:border-black/40 transition-colors duration-200"
            />

            {/* Body */}
            <textarea
              ref={textRef}
              onChange={handleInput}
              name="post"
              id="post"
              placeholder="Let it out."
              value={textArea}
              required
              rows={4}
              className="w-full bg-transparent border-b border-black/15 py-3 font-anonymous text-xs tracking-[0.08em] leading-[2] text-black/70 placeholder:text-black/25 outline-none focus:border-black/40 transition-colors duration-200 resize-none"
            />

            {/* Image preview */}
            {imageUrl && (
              <div className="relative w-full h-[40vh] rounded-xl overflow-hidden">
                <Image
                  src={imageUrl}
                  fill
                  alt="Uploaded image preview"
                  className="object-cover"
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <Upload onFilesSelected={handleFileUpload}>
                <button
                  type="button"
                  className="flex items-center gap-2 font-anonymous uppercase text-[8px] tracking-[0.25em] text-black/30 hover:text-black/60 transition-colors duration-200 cursor-pointer"
                >
                  <Aperture className="w-3.5 h-3.5" />
                  {imageUrl ? "Change image" : "Add image"}
                </button>
              </Upload>

              <button
                type="submit"
                disabled={isPending}
                className="font-anonymous uppercase text-[8px] tracking-[0.25em] px-5 py-2.5 border border-black/15 rounded-full text-black/50 hover:text-black/85 hover:border-black/35 transition-all duration-300 cursor-pointer flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Publish <Send className="w-3 h-3" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Draft;
