import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Head from "next/head";

export async function proxy(request) {
  console.log("Middleware ran:: ");

  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  console.log("token recieved:: ", token);

  const isApiRoute = pathname.startsWith("/api/");
  const isProtectedRoute = pathname.startsWith("/profile");

  // 1. Handle Backend API Route Protection
  if (isApiRoute) {
    const isPublicApi =
      pathname.startsWith("/api/v1/auth/signin") ||
      pathname.startsWith("/api/v1/auth/signup");

    if (isPublicApi) {
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token provided" },
        { status: 401 },
      );
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Invlid or broken token" },
        { status: 401 },
      );
    }

    console.log("cookie verified and got the payload:: ", payload);

    // Inject validated data into request headers for downstream API routes

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.id);
    requestHeaders.set("x-user-email", payload.email);
    requestHeaders.set("x-user-username", payload.username);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // 2. Handle Frontend Page Protection (Redirects)
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/signin", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if ((pathname === "/signin" || pathname === "/signup") && token) {
    const profileUrl = new URL("/profile", request.url);
    return NextResponse.redirect(profileUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/v1/:path*", "/profile/:path*", "/signin", "/signup"],
};