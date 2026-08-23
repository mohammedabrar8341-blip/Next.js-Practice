"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profile() {
  const router = useRouter();
  const [loadinglogout, setloadinglogout] = useState("");

  const handleProfile = async () => {
    console.log("logout funcatoin called");
    setloadinglogout(true);

    await axios.get("/api/v1/auth/logout", { withCredentials: true });

    router.push("/signup");
  };
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-3xl">
        <div className="border-b border-slate-800 pb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Account
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Your profile
          </h1>
          <p className="mt-2 text-slate-400">
            Manage your account session from here.
          </p>
        </div>

        <section className="mt-8 flex flex-col items-start justify-between gap-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-white">Signed-in session</h2>
            <p className="mt-1 text-sm text-slate-400">
              Your account is currently active.
            </p>
          </div>
          <button
            className="rounded-lg border border-rose-400/50 px-5 py-2.5 font-semibold text-rose-300 transition hover:border-rose-300 hover:bg-rose-400/10 focus:outline-none focus:ring-2 focus:ring-rose-300 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handleProfile}
            disabled={loadinglogout}
          >
            {loadinglogout ? "Signing out..." : "Log out"}
          </button>
        </section>
      </div>
    </main>
  );
}
