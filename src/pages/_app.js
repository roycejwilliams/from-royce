"use client";
import { useEffect } from "react";
import "../styles/globals.css";
import TransitionProvider from "../context/TransitionContext";
import Transition from "../components/Transition";
import { AuthProvider } from "../context/AuthContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function App({ Component, pageProps, router }) {
  useEffect(() => {
    // Normalize scroll on mobile for smoother GSAP scroll-based animations
    ScrollTrigger.normalizeScroll(true);
  }, []);

  return (
    <AuthProvider>
      <TransitionProvider>
        <Transition>
          <Component key={router.route} {...pageProps} />
        </Transition>
      </TransitionProvider>
    </AuthProvider>
  );
}
