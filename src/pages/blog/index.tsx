import Head from "next/head";
import Post from "../../components/post";

function Blog() {
  return (
    <>
      <Head>
        <title>Ethos – From Royce</title>
        <meta
          name="description"
          content="Frames of mind. Essays and thoughts by Royce Williams."
        />
        <meta property="og:title" content="Ethos – From Royce" />
        <meta
          property="og:description"
          content="Frames of mind. Essays and thoughts by Royce Williams."
        />
        <meta property="og:image" content="https://from-royce.com/cover.png" />
        <meta property="og:url" content="https://from-royce.com/blog" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ethos – From Royce" />
        <meta
          name="twitter:description"
          content="Frames of mind. Essays and thoughts by Royce Williams."
        />
        <meta name="twitter:image" content="https://from-royce.com/cover.png" />
      </Head>
      <div className="w-full bg-[#f0ebe5] min-h-[100svh] overflow-x-hidden">
        <section aria-labelledby="posts-heading">
          <header className="xl:px-24 px-6 pt-16 xl:pt-24 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-4 h-px bg-black/20" />
              <span className="font-anonymous text-[8px] tracking-[0.35em] uppercase text-black/30">
                Essays &amp; thoughts
              </span>
            </div>
            <h2
              id="posts-heading"
              className="font-anonymous uppercase text-black/85 leading-none"
            >
              <span className="font-cylburn text-[3.5rem] xl:text-[5rem] leading-[0.85]">
                E
              </span>
              <span className="text-xl xl:text-3xl tracking-[0.06em]">
                thos
              </span>
            </h2>
          </header>
          <Post />
        </section>
      </div>
    </>
  );
}

export default Blog;
