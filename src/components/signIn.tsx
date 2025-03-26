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

  console.log(email, password);
  console.log(user);

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

  return (
    <section className="min-h-[75vh] w-full flex flex-col justify-center items-center">
      {error && (
    <p className="text-xs text-red-500 text-center mt-2">{error}</p>
)}
      {user ? (
        <Draft />
      ) : (
        <div className="p-4 space-y-4 md:space-y-6 sm:p-8 bg-white/30 backdrop-blur-2xl shadow-[0px_5px_30px_5px_#FFFFFF] hover:shadow-[0px_15px_50px_10px_#FFFFFF] ease-in-out transition duration-200 border border-t border-l border-r sm:max-w-lg w-[90%] tracking-[0.1em] rounded-xl">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 md:space-y-6"
            action="#"
          >
            <div className="">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border text-xs border-gray-300 text-gray-900 placeholder:text-gray-500 rounded-lg block w-full p-2.5"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-transparent text-xs border border-gray-300 text-gray-900 placeholder:text-gray-500 rounded-lg block w-full p-2.5 "
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-3 h-3 border border-gray-300 rounded bg-transparent focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm ">
                  <label
                    htmlFor="remember"
                    className="text-gray-500 text-xs uppercase bg-transparent  dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full black text-xs font-light uppercase bg-gradient-to-r backdrop-blur-lg bg-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Sign in
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

export default SignIn;
