import React, {  useCallback, ReactNode } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploadProps {
  onFilesSelected: (files: FileExtended[]) => void;
  initialFiles?: File[];
  children: ReactNode;
}

interface FileExtended extends File {
  url?: string;
}

const Upload: React.FC<FileUploadProps> = ({ onFilesSelected, children }) => {
  // Ensure selectedFiles is an array, since onFilesSelected expects FileExtended[]

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0] as FileExtended;
        file.url = URL.createObjectURL(file);
        onFilesSelected([file]);
      }
    },
    [onFilesSelected]
  );

  const {
    getRootProps,
    getInputProps,
    open: triggerFileDialog,
  } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
    maxFiles: 1,
    noClick: true, // Prevent automatic file selection trigger
  });

  return (
    <div {...getRootProps()} className="relative">
      <input {...getInputProps()} />
      {/* Clicking on this will trigger file selection */}
      <div onClick={triggerFileDialog} className="cursor-pointer">
        {children}
      </div>
    </div>
  );
};

export default Upload;
