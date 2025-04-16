"use client";
import "../styles/globals.css";
import Head from "next/head";
import TransitionProvider from '../context/TransitionContext';
import Transition from '../components/Transition';
import { AuthProvider } from "../context/AuthContext";
import { PostProvider } from '../context/PostContext';

export default function App({ Component, pageProps, router }) {
  return (
    <>
    
    <Head>
      <title>Royce – Portfolio</title>
      <meta name="description" content="The digital home of Royce – Designer & Engineer." />

      <meta property="og:title" content="Royce – Portfolio" />
      <meta property="og:description" content="The digital home of Royce – Designer & Engineer." />
      <meta property="og:image" content="https://from-royce.com/cover.png" />
      <meta property="og:url" content="https://from-royce.com" />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="https://from-royce.com/cover.png" />
    </Head>

      <AuthProvider>
        <PostProvider>
          <TransitionProvider>
            <Transition>
              <Component key={router.route} {...pageProps} />
            </Transition>
          </TransitionProvider>
        </PostProvider>
      </AuthProvider>
    </>
  );
}
