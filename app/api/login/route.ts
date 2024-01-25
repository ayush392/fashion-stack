import { NextResponse, NextRequest } from "next/server";
import userModel from "@/models/user.model";
import connectDb from "@/config/db";

function generateCookie(res: any, id: any) {
  const cookieOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 100,
    path: "/",
  };
  res.cookies.set("nextJsAuth", id, cookieOption);
  return res;
}

export async function POST(request: NextRequest) {
  try {
    await connectDb();

    const { email, password } = await request.json();
    console.log(email, password);
    if (!email || !password)
      return NextResponse.json({
        message: "please fill all the fields",
        status: 400,
      });

    // console.log(email, password);

    const user = await userModel.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "invalid email", status: 400 });
    }

    if (user.password !== password) {
      return NextResponse.json({ message: "invalid password", status: 400 });
    }

    const res = NextResponse.json({});
    // generateCookie(res);

    // return NextResponse.json({
    //   message: "login successfully",
    //   status: 200,
    //   id: user._id,
    //   email: user.email,
    // });
    return generateCookie(res, user._id);
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
