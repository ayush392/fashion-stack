"use server";
import connect from "@/config/db";
import productModel from "@/models/product.model";
import userModel from "@/models/user.model";
import { cookies } from "next/headers";
import accountModel from "@/models/account.model";

// todo: getFilter
// addToCart
// getCart
// removeFromCart
// addToWishlist

export async function getUserId() {
  let cookie = cookies().get("nextJsAuth");
  return cookie ? cookie.value : "";
}

export async function getFilter(gender: any, category: any) {
  await connect();
  // console.log(gender, category, "utils");
  let myFilterObj1: any = {};
  let myFilterObj2: any = {};

  if (gender) {
    myFilterObj1.gender = gender;
    myFilterObj2.gender = gender;
  }

  if (category) {
    let catArr: string[] = category.split(",");
    myFilterObj2.category = { $in: catArr };
  }

  const categories = await productModel.find(myFilterObj1).distinct("category");
  const colors = await productModel.find(myFilterObj2).distinct("color");

  return { categories, colors };
}

export async function addToCart(
  productId: any,
  quantity: number,
  size: string
) {
  await connect();
  //userId, productId, quantity, size
  const userId = await getUserId();
  console.log(userId);
  try {
    if (!quantity) quantity = 1;
    if (!userId || !productId || !size) {
      throw new Error("Please Login");
    }

    const data = await accountModel.findOne({ user: userId });
    console.log(data, "data");
    data.cart.push({
      product: productId,
      quantity: quantity,
      size: size,
    });
    await data.save();
    return "Item added to cart";
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
}

export async function getCart() {
  await connect();
  try {
    const userId = await getUserId();
    if (!userId || userId === "") {
      throw new Error("Please Login");
    }

    const res = await accountModel
      .findOne({ user: userId })
      .populate({
        path: "cart.product",
        select: "imageUrl title price mrp discount brand sizes",
      })
      .select("cart");
    console.log(res, "res");
    return res.cart;
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
}

export async function removeFromCart(productId: any) {
  try {
    await connect();
    const userId = await getUserId();

    if (userId === "" || !productId) {
      throw new Error("Invalid data");
    }

    const update = await accountModel.findOneAndUpdate(
      { user: userId },
      { $pull: { cart: { product: productId } } },
      { new: true }
    );
    console.log(update.cart, "update");
    return "Product removed from cart";
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
}

export async function updateCart(
  productId: any,
  quantity: number,
  size: string
) {
  try {
    await connect();
    const userId = await getUserId();

    if (userId === "" || !productId) {
      throw new Error("Invalid data");
    }

    const update = await accountModel.findOneAndUpdate(
      { user: userId, "cart.product": productId },
      { $set: { "cart.$.quantity": quantity, "cart.$.size": size } },
      { new: true }
    );
    console.log(update.cart, "update");
    return "Cart updated";
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
}

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
