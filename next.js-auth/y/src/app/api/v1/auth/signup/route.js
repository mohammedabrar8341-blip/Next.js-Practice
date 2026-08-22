import UserModel from "@/models/Usermodel";
import { Connect } from "@/db/dbconfiguration";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request) {
  await Connect();
  const body = await request.json();
  const { username, email, password } = body;
  console.log("Recieved at /auth/signup route:: ", body);

  // Check if user already exists or not
  const foundUser = await UserModel.findOne({ email });
  if (foundUser) {
    console.log("User already existed", foundUser);
    return NextResponse.json(
      {
        json: "User already exists in db, cannot create a same user again",
      },
      {
        status: 400,
      },
    );
  }

  // Hash Pasword before finally saving to db
  const salt = await bcryptjs.genSalt(10);
  const hashedpass = await bcryptjs.hash(password, salt);

  const feedback = await UserModel.create({
    email,
    password: hashedpass,
    username,
  });
  console.log("user loggin successfully");
  return NextResponse.json({
    message: "Signup Successful, User created in DB",
    feedback,
    success: true,
  });
}
