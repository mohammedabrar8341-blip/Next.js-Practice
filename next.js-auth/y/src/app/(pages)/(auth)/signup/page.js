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
    <div>
      <h1>SIGNUP PAGE</h1>

      <input
        className="bg-yellow-50 text-slate-900 m-9 px-4 py-1"
        placeholder="Enter your username: "
        id="username"
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />

      <input
        className="bg-yellow-50 text-slate-900 m-9 px-4 py-1"
        placeholder="Enter your email: "
        id="email"
        type="email"
        value={email}
        onChange={(e) => {
          setEamil(e.target.value);
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

      <button className="bg-amber-400 m-9 px-4 py-1" onClick={handlingAxios}>
        {loading ? "loading..." : "Signup"}
      </button>
    </div>
  );
}
