import { NextResponse, NextRequest } from "next/server";
import userModel from "@/models/user.model";
import connectDb from "@/config/db";
// import next from "next";

export async function GET(request: NextRequest) {
  try {
    await connectDb();
    const cookie = request.cookies.get("nextJsAuth");
    // console.log(cookie)
    // if(cookie){
    //   // return NextResponse.json({ user: user, status: 200 });
    // }
    // const res = request.headers.get("authorisation");
    // const data = res?.split(" ")[1];
    // if (!data || data?.length < 5) {
    //   return NextResponse.json({ message: "Invalid Credentials", status: 400 });
    // }
    // const json = await JSON.parse(data as string);

    // if (!json || json == null) {
    //   return NextResponse.json({ message: "Invalid Credentials", status: 400 });
    // }

    // const { _id, email } = json;

    const user = await userModel.findOne({ _id: cookie?.value });

    if (!user) {
      return NextResponse.json({ message: "Invalid Credentials", status: 400 });
    }

    return NextResponse.json({ user: user, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
