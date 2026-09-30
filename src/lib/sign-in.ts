import { browserLocalPersistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword, type Auth } from "firebase/auth";

export async function signInWithPersistence(auth: Auth | undefined, email: string, password: string, remember: boolean) {
  if (!auth) throw new Error("Sign in is not available. Please reload and try again.");
  await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
  return signInWithEmailAndPassword(auth, email, password);
}
