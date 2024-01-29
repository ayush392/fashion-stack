"use server";
import connect from "@/config/db";
import accountModel from "@/models/account.model";
import { getUserId } from "../helper";

// calcPrice
// addToCart
// getCart
// removeFromCart
// updateCart

async function calcPrice(data: any) {
  let tPrice = 0,
    mrp = 0,
    discount = 0;
  data.forEach((item: any) => {
    tPrice += item.product.price * item.quantity;
    mrp += item.product.mrp * item.quantity;
    discount += mrp - tPrice;
  });
  return {
    totalPrice: tPrice,
    totalMrp: mrp,
    totalDiscount: discount,
  };
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
    const prices = await calcPrice(res.cart);
    // console.log(res, "res");
    return await JSON.parse(JSON.stringify({ cart: res.cart, prices }));
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

    const res = await accountModel
      .findOneAndUpdate(
        { user: userId },
        { $pull: { cart: { product: productId } } },
        { new: true }
      )
      .populate({
        path: "cart.product",
        select: "imageUrl title price mrp discount brand sizes",
      })
      .select("cart");
    const prices = await calcPrice(res.cart);
    // console.log(res, "res");
    return await JSON.parse(JSON.stringify({ cart: res.cart, prices }));
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

    const res = await accountModel
      .findOneAndUpdate(
        { user: userId, "cart.product": productId },
        { $set: { "cart.$.quantity": quantity, "cart.$.size": size } },
        { new: true }
      )
      .populate({
        path: "cart.product",
        select: "imageUrl brand title price mrp discount sizes",
      })
      .select("cart");
    const prices = await calcPrice(res.cart);
    // console.log(res, "res");
    return await JSON.parse(JSON.stringify({ cart: res.cart, prices }));
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
}
