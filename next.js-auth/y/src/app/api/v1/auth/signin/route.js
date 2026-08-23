import { Connect } from "@/db/dbconfiguration";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "@/models/Usermodel";
import { NextResponse } from "next/server";

Connect();
export async function POST(request) {
  const body = await request.json();
  const { email, password } = body;
  console.log(" POST request at /api/v1/auth/signin ", body);

  // check if user is registered first or not
  const foundUser = await UserModel.findOne({ email });

  if (!foundUser) {
    console.log("User not Registered First but tries to login:: ");
    return NextResponse.json(
      {
        message: "User Not Registered, Go and register first",
      },
      {
        status: 400,
      },
    );
  }
  const isValidPassword = await bcryptjs.compare(password, foundUser.password);
  if (!isValidPassword) {
    console.log("password is wrong to signin");
    return NextResponse.json(
      {
        message: "Invalid password",
      },
      { status: 401 },
    );
  }
  const payload = {
    id: foundUser._id,
    username: foundUser.username,
    email: foundUser.email,
  };
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  const response = NextResponse.json(
    {
      message: "Signin successfully",
    },
    { status: 200 },
  );

  response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true, // Prevents client-side JS from reading the cookie
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day in seconds
  });

  return response;
}
