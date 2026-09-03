import Head from "next/head";
import MusicPlayer from "../components/musicPlayer";

// Dev only preview of the same MusicPlayer rendered live on /portfolio.
// Not linked in nav. Kept for isolated review without scrolling the full page.
const MusicPreview = () => {
  return (
    <>
      <Head>
        <title>Music Player Preview, From Royce</title>
      </Head>
      <div className="w-full min-h-[100svh] bg-[#f0ebe5] flex items-center justify-center xl:px-24 px-6 py-24">
        <MusicPlayer />
      </div>
    </>
  );
};

export default MusicPreview;
