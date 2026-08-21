import { UserModel } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    console.log("Call is received at signup route");

    const body = await req.json();
    const { email, password, username } = body;

    console.log(body);

    if (!email || !password || !username) {
      return NextResponse.json(
        { msg: "Email, password, and username are required" },
        { status: 400 },
      );
    }

    const existingUser = await UserModel.findOne({ email });

    console.log(existingUser);

    if (existingUser) {
      return NextResponse.json({ msg: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const feedback = await UserModel.create({
      email,
      password: hashedPassword,
      username,
    });

    return NextResponse.json(
      { msg: "User registered successfully", feedback },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
