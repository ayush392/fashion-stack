"use server";
import { cookies } from "next/headers";

export async function getUserId() {
  let cookie = cookies().get("nextJsAuth");
  return cookie ? cookie.value : "";
}
