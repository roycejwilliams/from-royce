import Head from "next/head";
import Nav from "../../components/nav";
import SignIn from "../../components/signIn";
import React from "react";

function Post() {
  return (
    <>
  <Head>
        <title>Blog – From Royce</title>
        <meta name="description" content="Read insights, ideas, and stories from Royce." />
        <meta property="og:title" content="Blog – Royce" />
        <meta property="og:description" content="Read insights, ideas, and stories from Royce." />
        <meta property="og:image" content="https://from-royce.com/cover.png" />
        <meta property="og:url" content="https://from-royce.com/blog" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://from-royce.com/cover.png" />
      </Head>
    <section className=" bg-gradient-to-b  from-[#DCDCDC] via-[#AEA198] to-[#F0EAD6]] min-h-screen">
      <Nav />
      <SignIn />
    </section>
    </>
  );
}

export default Post;
