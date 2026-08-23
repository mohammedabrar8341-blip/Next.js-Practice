"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signin() {
  const router = useRouter();
  const [loading, setLoading] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    console.log("Sigin boutton clicked, sending data", {
      email,
      password,
    });
    setLoading(true);

    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/signin",
      {
        email,
        password,
      },
    );
    console.log("Signin successfully");
    setLoading(false);
    alert("Signin successfully");
    router.push("/profile");
  };
  return (
    <div>
      <h1>SIGNIN PAGE:</h1>

      <input
        className="bg-yellow-50 text-slate-900 m-9 px-4 py-1"
        placeholder="Enter your email"
        id="email"
        type="eamil"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <input
        className="bg-yellow-50 text-slate-900 m-9 px-4 py-1"
        placeholder="Enter your password: "
        id="password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <button className="bg-amber-400 m-9 px-4 py-1" onClick={handleSignin}>
        {loading ? "loading..." : "Signin"}
      </button>
    </div>
  );
}
