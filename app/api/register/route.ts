import { NextResponse, NextRequest } from "next/server";
import userModel from "@/models/user.model";
import connectDb from "@/config/db";

export async function POST(request: NextRequest) {
  try {
    await connectDb();
    const { fullName, email, password, username } = await request.json();
    if (!fullName || !email || !password || !username)
      return NextResponse.json({
        message: "please fill all the fields",
        status: 400,
      });

    const user = await userModel.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return NextResponse.json({ message: "user already exists", status: 400 });
    }

    const newUser = await userModel.create({
      fullName,
      email,
      password,
      username,
    });

    return NextResponse.json({
      message: "user created successfully",
      status: 201,
      id: newUser._id,
      email: newUser.email,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
