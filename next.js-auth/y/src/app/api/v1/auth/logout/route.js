import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({
    message: "logout  request ",
    success: true,
  });
  response.cookies.set({
    name: "token",
    value: "",
    httpOnly: true, // Prevents client-side JS from reading the cookie
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });
  return response;
}
