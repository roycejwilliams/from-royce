import { ref, uploadBytes, getDownloadURL, type FirebaseStorage } from "firebase/storage";

// Preserve one path for a selected file. A failed URL lookup must not re-upload
// bytes that Storage already accepted. Never delete after an uncertain create.
const uploads = new WeakMap<File, { path: string; uploaded: boolean }>();
export async function uploadImageForDraft(storage: FirebaseStorage | undefined, folder: "posts" | "work", file: File) {
  if (!storage) throw new Error("Image storage is not available. Please reload and try again.");
  let upload = uploads.get(file);
  if (!upload) {
    upload = { path: `${folder}/${crypto.randomUUID()}`, uploaded: false };
    uploads.set(file, upload);
  }
  const imageRef = ref(storage, upload.path);
  if (!upload.uploaded) {
    await uploadBytes(imageRef, file);
    upload.uploaded = true;
  }
  return getDownloadURL(imageRef);
}
