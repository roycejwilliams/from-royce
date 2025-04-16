"use client";
import "../styles/globals.css";
import TransitionProvider from '../context/TransitionContext';
import Transition from '../components/Transition';
import { AuthProvider } from "../context/AuthContext";
import { PostProvider } from '../context/PostContext';

export default function App({ Component, pageProps, router }) {

  if (!selectedPost) {
    return (
      <div className="p-8 min-h-screen bg-white font-anonymous flex justify-center items-center">
        <p className="text-black text-sm text-center">No post found. Please go back to the blog page.</p>
      </div>
    );
  }

 


  return (
    <>
    
  
   

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
