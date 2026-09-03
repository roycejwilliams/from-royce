import Head from "next/head";
import MusicPlayer from "../components/musicPlayer";

// Standalone preview page for the custom Apple Music player — not linked in
// nav. Review here before deciding whether/where it replaces the plain
// iframe embed in grid.tsx's "What I'm playing" panel.
const MusicPreview = () => {
  return (
    <>
      <Head>
        <title>Music Player Preview – From Royce</title>
      </Head>
      <div className="w-full min-h-[100svh] bg-[#f0ebe5] flex items-center justify-center xl:px-24 px-6 py-24">
        <MusicPlayer />
      </div>
    </>
  );
};

export default MusicPreview;
