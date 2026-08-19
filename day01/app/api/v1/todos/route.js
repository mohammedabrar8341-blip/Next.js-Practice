import { NextResponse } from "next/server";

export  function GET() {
  return  NextResponse.json({
    todo: "HELLO WORLD",
  });
}

export function POST() {
  return NextResponse.json({
    msg: "POST request received",
  });
}
