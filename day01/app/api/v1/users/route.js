import { UserModel } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allusers = await UserModel.find().select("-password");

    return NextResponse.json({
      msg: "get request recevied on /users",
      allusers,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "faild to fetch",
      error: error?.message || "unknown error",
    });
  }
}
