"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");

  const handlingAxios = async () => {
    console.log("signup botton click,sending data", {
      username,
      email,
      password,
    });
    setLoading(true);
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/signup",
      {
        username,
        email,
        password,
      },
    );
    console.log("sigup successfully", response.data);
    setLoading(false);
    alert("Signup successfullly");
    router.push("/signin");
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-12 text-slate-100">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-black/30 sm:p-10">
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Create an account
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Sign up
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Join us with a few details.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="username">
              Username
            </label>
            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              placeholder="Enter your username"
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="email">
              Email address
            </label>
            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              placeholder="you@example.com"
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEamil(e.target.value);
              }}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300" htmlFor="password">
              Password
            </label>
            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              placeholder="Create a password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <button
            className="w-full rounded-lg bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handlingAxios}
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </div>
      </div>
    </main>
  );
}
