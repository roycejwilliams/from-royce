"use client";
import React, { useContext, useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Draft from "./draft";
import { AuthContext } from "../context/AuthContext";

function SignIn() {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  if (user) return <Draft />;

  return (
    <section className=" w-full xl:px-24 px-6 overflow-y-hidden flex justify-center items-center min-h-screen">
      <div className="w-full max-w-sm flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-4 h-px bg-black/20" />
            <span className="font-anonymous uppercase text-[8px] tracking-[0.35em] text-black/30">
              Access
            </span>
          </div>
          <h1 className="font-anonymous uppercase text-black/80 tracking-[0.08em] text-sm">
            <span className="font-cylburn text-5xl leading-none">S</span>ign in
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full bg-transparent border-b border-black/15 py-3 font-anonymous text-xs tracking-[0.08em] text-black/70 placeholder:text-black/25 outline-none focus:border-black/40 transition-colors duration-200"
          />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full bg-transparent border-b border-black/15 py-3 font-anonymous text-xs tracking-[0.08em] text-black/70 placeholder:text-black/25 outline-none focus:border-black/40 transition-colors duration-200"
          />

          {/* Error */}
          {error && (
            <p className="font-anonymous text-[8px] tracking-[0.2em] uppercase text-red-400">
              {error}
            </p>
          )}

          {/* Remember + submit */}
          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                id="remember"
                type="checkbox"
                className="w-3 h-3 border border-black/20 rounded-sm bg-transparent accent-black/60"
              />
              <span className="font-anonymous uppercase text-[8px] tracking-[0.2em] text-black/30 group-hover:text-black/50 transition-colors duration-200">
                Remember me
              </span>
            </label>

            <button
              type="submit"
              className="font-anonymous uppercase text-[8px] tracking-[0.25em] px-5 py-2.5 border border-black/15 rounded-full text-black/50 hover:text-black/85 hover:border-black/35 transition-all duration-300 cursor-pointer"
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignIn;
