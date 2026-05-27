import React from "react";
import Head from "next/head";
import Intro from "../../components/intro";
import Work from "../../components/work";
import WorkCon from "../../components/workCon";
import Grid from "../../components/grid";
import Photos from "../../components/photoTransition";
import Footer from "../../components/footer";
import { useReveal } from "../../hooks/useReveal";

const Portfolio = () => {
  useReveal();

  return (
    <>
      <Head>
        <title>Portfolio – From Royce</title>
        <meta name="description" content="Design and development work by Royce Williams." />
        <meta property="og:title" content="Portfolio – From Royce" />
        <meta property="og:description" content="Design and development work by Royce Williams." />
        <meta property="og:image" content="https://from-royce.com/cover.png" />
        <meta property="og:url" content="https://from-royce.com/portfolio" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio – From Royce" />
        <meta name="twitter:description" content="Design and development work by Royce Williams." />
        <meta name="twitter:image" content="https://from-royce.com/cover.png" />
      </Head>
      <div className="w-full bg-[#f0ebe5] overflow-x-hidden">
        <Intro />
        <Work />
        <WorkCon />
        <Grid />
        <Photos />
        <Footer />
      </div>
    </>
  );
};

export default Portfolio;
