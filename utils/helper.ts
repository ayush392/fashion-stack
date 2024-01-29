"use server";
import { cookies } from "next/headers";
import userModel from "@/models/user.model";
import connect from "@/config/db";
import accountModel from "@/models/account.model";

export async function getUserId() {
  let cookie = cookies().get("nextJsAuth");
  return cookie ? cookie.value : "";
}

export async function logout() {
  cookies().delete("nextJsAuth");
}

export async function getSize(id: any) {
  await connect();
  const res = await accountModel.findOne({ user: id }).select("cart wishlist");
  // .select("account.cart account.wishlist");

  // console.log(res, "size");
  return { cartSize: res.cart.length, wishlistSize: res.wishlist.length };
}
