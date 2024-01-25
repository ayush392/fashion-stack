import { NextResponse, NextRequest } from "next/server";

export function GET(request: NextRequest) {
  //   const body = JSON.parse(request.body);
  console.log("hello");
  //   return NextResponse.redirect("/api/redirected");
  return NextResponse.json({ hello: "world" });
}
