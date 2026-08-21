import { UserModel } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    console.log("Call is received at signup route");

    const body = await req.json();
    const emailValue = body.email?.trim().toLowerCase();
    const usernameValue = body.username?.trim();
    const { password } = body;

    console.log(body);

    if (!emailValue || !password || !usernameValue) {
      return NextResponse.json(
        { msg: "Email, password, and username are required" },
        { status: 400 },
      );
    }

    const existingUser = await UserModel.findOne({
      $or: [{ email: emailValue }, { username: usernameValue }],
    });

    console.log(existingUser);

    if (existingUser) {
      return NextResponse.json(
        { msg: "Username or email is already registered" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const feedback = await UserModel.create({
      email: emailValue,
      password: hashedPassword,
      username: usernameValue,
    });

    return NextResponse.json(
      { msg: "User registered successfully", feedback },
      { status: 201 },
    );
  } catch (error) {
    if (error?.code === 11000) {
      return NextResponse.json(
        { msg: "Username or email is already registered" },
        { status: 409 },
      );
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
