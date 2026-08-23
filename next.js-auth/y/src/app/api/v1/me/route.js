import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "@/models/Usermodel";




export async function GET(request) {

    const token=  request.cookies.get("token")?.value;
    if (!token) {
        return NextResponse.json({
            success:false,message:"unauthorized :- login required token",

        },{
            status:"401"
        })
    }

    const payload= jwt.verify(token,process.env.JWT_SECRET)
    const userId=payload.id
    
    if (!userId) {
        return NextResponse.json(
         { success: false, message: "Unauthorized: Invalid token payload" },
      { status: 401 },
    );
  }
  const userData=await UserModel.findOne({_id:userId}).select("-password")
  return NextResponse.json({
    success:true,data:userData
  })
}