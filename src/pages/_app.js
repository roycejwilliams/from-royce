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
        <link rel="icon" href="public/favicon.ico" />
        <title>Your Site Title</title>
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
