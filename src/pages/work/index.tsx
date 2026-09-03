import Head from "next/head";
import WorkCatalogue from "../../components/workCatalogue";
import Footer from "../../components/footer";
import { useReveal } from "../../hooks/useReveal";

const Work = () => {
  useReveal();

  return (
    <>
      <Head>
        <title>Work – From Royce</title>
        <meta
          name="description"
          content="Selected projects by Royce Williams — engineering and design treated as one practice."
        />
        <meta property="og:title" content="Work – From Royce" />
        <meta
          property="og:description"
          content="Selected projects by Royce Williams — engineering and design treated as one practice."
        />
        <meta property="og:image" content="https://from-royce.com/cover.png" />
        <meta property="og:url" content="https://from-royce.com/work" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Work – From Royce" />
        <meta
          name="twitter:description"
          content="Selected projects by Royce Williams — engineering and design treated as one practice."
        />
        <meta name="twitter:image" content="https://from-royce.com/cover.png" />
      </Head>
      <div className="w-full bg-[#f0ebe5] overflow-x-hidden">
        <WorkCatalogue />
        <Footer />
      </div>
    </>
  );
};

export default Work;
