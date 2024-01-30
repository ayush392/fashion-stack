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
  try {
    await connect();
    const res = await accountModel
      .findOne({ user: id })
      .select("cart wishlist");

    let cartSize = parseInt(res.cart.length);
    let wishlistSize = parseInt(res.wishlist.length);

    if (cartSize === undefined) cartSize = 0;
    if (wishlistSize === undefined) wishlistSize = 0;

    return { cartSize: cartSize, wishlistSize: wishlistSize };
  } catch (error) {
    return { cartSize: 0, wishlistSize: 0 };
  }
}
