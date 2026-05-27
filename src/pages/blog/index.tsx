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
          <h2 id="posts-heading" className="sr-only">
            Blog Posts
          </h2>
          <Post />
        </section>
      </div>
    </>
  );
}

export default Blog;
