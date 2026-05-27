import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { AuthProvider } from "@/context/AuthContext";
import { PostProvider } from "@/context/PostContext";
import TransitionProvider from "@/context/TransitionContext";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PostProvider>
          <TransitionProvider>{children}</TransitionProvider>
        </PostProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
