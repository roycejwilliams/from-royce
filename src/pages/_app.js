"use client";
import "../styles/globals.css";
import TransitionProvider from '../context/TransitionContext'
import Transition from '../components/Transition';
import { AuthProvider } from "../context/AuthContext";
import { useEffect } from "react";

export default function App({ Component, pageProps, router }) {

  useEffect(() => {
    // Prevent this logic from ever running on the server
  
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  
      gsap.registerPlugin(ScrollTrigger);
    })(); // <-- This was missing
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
