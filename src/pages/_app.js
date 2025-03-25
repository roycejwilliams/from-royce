"use client";
import "../styles/globals.css";
import TransitionProvider from '../context/TransitionContext'
import Transition from '../components/Transition';
import { AuthProvider } from "../context/AuthContext";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function App({ Component, pageProps, router }) {

  useEffect(() => {
    // Normalize scroll only on mobile/touch devices
    if (ScrollTrigger.isTouch) {
      ScrollTrigger.normalizeScroll();
    }

    // Refresh on resize to handle viewport height/address bar changes
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
