import React, { useState, useEffect } from "react";
import { Send, Aperture, CircleCheckBig, CircleSlash } from "lucide-react";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Upload from "./uploadImage";
import Image from "next/image";
import { useCreateWork } from "../hooks/work";

interface FileExtended extends File {
  url?: string;
}

const fieldCls =
  "w-full bg-transparent border-b border-black/15 py-3 font-anonymous text-xs tracking-[0.08em] text-black/70 placeholder:text-black/25 outline-none focus:border-black/40 transition-colors duration-200";

const WorkDraft: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [descriptor, setDescriptor] = useState("");
  const [role, setRole] = useState("");
  const [tags, setTags] = useState("");
  const [year, setYear] = useState("");
  const [stack, setStack] = useState("");
  const [status, setStatus] = useState("");
  const [liveUrl, setLiveUrl] = useState("");

  const {
    mutate: createWork,
    isPending,
    isSuccess,
    isError,
    reset,
  } = useCreateWork();

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
    if (!title || !descriptor || !role || !year || !imageUrl) return;

    let finalImageUrl = imageUrl;

    if (uploadedFile) {
      if (!storage) return;
      const imageRef = ref(storage, `work/${uploadedFile.name}-${Date.now()}`);
      try {
        const snapshot = await uploadBytes(imageRef, uploadedFile);
        finalImageUrl = await getDownloadURL(snapshot.ref);
        setImageUrl(finalImageUrl);
      } catch {
        return;
      }
    }

    createWork(
      {
        title,
        descriptor,
        role,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        year,
        src: finalImageUrl,
        stack: stack || null,
        status: status || null,
        liveUrl: liveUrl || null,
      },
      {
        onSuccess: () => {
          setTitle("");
          setDescriptor("");
          setRole("");
          setTags("");
          setYear("");
          setStack("");
          setStatus("");
          setLiveUrl("");
          setImageUrl(null);
          setUploadedFile(null);
        },
      },
    );
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center xl:px-24 px-6 py-16">
      <div className="w-full max-w-lg flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-4 h-px bg-black/20" />
            <span className="font-anonymous uppercase text-[8px] tracking-[0.35em] text-black/30">
              Catalogue
            </span>
          </div>
          <h1 className="font-anonymous uppercase text-black/80 tracking-[0.08em] text-sm">
            <span className="font-cylburn text-5xl leading-none">N</span>ew project
          </h1>
        </div>

        {/* Status */}
        {isSuccess && (
          <div className="flex items-center gap-3">
            <CircleCheckBig className="w-4 h-4 text-black/40" />
            <span className="font-anonymous uppercase text-[8px] tracking-[0.25em] text-black/40">
              Added to the catalogue
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
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              placeholder="Title"
              required
              className={fieldCls}
            />

            <textarea
              value={descriptor}
              onChange={(e) => setDescriptor(e.target.value)}
              name="descriptor"
              placeholder="One line descriptor"
              required
              rows={2}
              className={`${fieldCls} leading-[2] resize-none`}
            />

            <div className="grid grid-cols-2 gap-6">
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                name="role"
                placeholder="Role"
                required
                className={fieldCls}
              />
              <input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                name="year"
                placeholder="Year"
                required
                className={fieldCls}
              />
            </div>

            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              name="tags"
              placeholder="Tags, comma separated"
              className={fieldCls}
            />

            <div className="grid grid-cols-2 gap-6">
              <input
                value={stack}
                onChange={(e) => setStack(e.target.value)}
                name="stack"
                placeholder="Stack (optional)"
                className={fieldCls}
              />
              <input
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                name="status"
                placeholder="Status (optional)"
                className={fieldCls}
              />
            </div>

            <input
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              name="liveUrl"
              placeholder="Live URL (optional)"
              className={fieldCls}
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

export default WorkDraft;
