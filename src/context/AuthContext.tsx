"use client";
import { createContext, useEffect, useState, ReactNode } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { create } from "domain";

interface AuthContextProps {
    user: User | null;
}

export const AuthContext = createContext<AuthContextProps>({user: null});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      return () => unsubscribe();
    }, []);

    return (
      <AuthContext.Provider value={{ user }}>
        {children}
      </AuthContext.Provider>
    );
  };