import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { queryClient } from "@/lib/queryClient";
import { AuthProvider } from "@/context/AuthContext";
import { PostProvider } from "@/context/PostContext";
import TransitionProvider from "@/context/TransitionContext";
import type { ReactNode } from "react";

const persister = createSyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <AuthProvider>
        <PostProvider>
          <TransitionProvider>{children}</TransitionProvider>
        </PostProvider>
      </AuthProvider>
    </PersistQueryClientProvider>
  );
}
