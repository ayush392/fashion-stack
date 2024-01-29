"use server";
import connect from "@/config/db";
import accountModel from "@/models/account.model";
import { addToCart } from "./cartController";
import { getUserId } from "../helper";

// addToWishlist
// getWishlist
// removeFromWishlist
// addToCartFromWishlist

export async function addToWishlist(productId: any) {
  try {
    await connect();
    const userId = await getUserId();
    if (!userId || !productId) {
      throw new Error("Please login");
    }
    const data = await accountModel.findOne({ user: userId });
    data.wishlist.push({ product: productId });
    await data.save();
    return "item added to wishlist";
  } catch (error) {
    console.log(error, "utils-addtoWishlist");
    return (error as Error).message;
  }
}

export async function getWishlist() {
  try {
    await connect();
    const userId = await getUserId();
    if (!userId) {
      throw new Error("Please login");
    }

    const res = await accountModel
      .findOne({ user: userId })
      .populate({
        path: "wishlist.product",
        select: "imageUrl title price mrp discount sizes",
      })
      .select("wishlist");
    console.log(res.wishlist, "res");
    // return res.wishlist;
    return await JSON.parse(JSON.stringify(res.wishlist));
  } catch (error) {
    return (error as Error).message;
  }
}

export async function removeFromWishlist(productId: any) {
  try {
    await connect();
    const userId = await getUserId();
    if (!userId || !productId) {
      throw new Error("Please login");
    }
    const update = await accountModel
      .findOneAndUpdate(
        { user: userId },
        { $pull: { wishlist: { product: productId } } },
        { new: true }
      )
      .populate({
        path: "wishlist.product",
        select: "imageUrl title price mrp discount sizes",
      });
    console.log(update.wishlist, "update");
    return await JSON.parse(JSON.stringify(update.wishlist));
  } catch (error) {
    console.log(error, "utils-removeFromWishlist");
    return (error as Error).message;
  }
}

export async function addToCartFromWishlist(productId: any, size: string) {
  try {
    await addToCart(productId, 1, size);
    const res = await removeFromWishlist(productId);
    return res;
  } catch (error) {
    return (error as Error).message;
  }
}
