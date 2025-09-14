"use client";
import "../styles/globals.css";
import TransitionProvider from "../context/TransitionContext";
import Transition from "../components/Transition";
import { AuthProvider } from "../context/AuthContext";
import { PostProvider } from "../context/PostContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <PostProvider>
            <TransitionProvider>
              <Transition>
                <Component key={router.route} {...pageProps} />
              </Transition>
            </TransitionProvider>
          </PostProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
