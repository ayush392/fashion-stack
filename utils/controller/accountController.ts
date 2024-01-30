"use server";
import connect from "@/config/db";
import { getUserId } from "../helper";
import accountModel from "@/models/account.model";

//add address
// getaddress

export async function addAddress(address: any) {
  await connect();
  const userId = await getUserId();
  if (!userId || userId === "") {
    throw new Error("Please Login");
  }
  try {
    const data = await accountModel.findOne({ user: userId });
    data.address.push(address);
    await data.save();
    return "address added";
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
}

export async function getAddress() {
  await connect();
  const userId = await getUserId();
  if (!userId || userId === "") {
    throw new Error("Please Login");
  }

  try {
    const res = await accountModel.findOne({ user: userId }).select("address");
    return await JSON.parse(JSON.stringify(res.address));
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
}
