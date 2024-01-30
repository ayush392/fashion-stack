"use server";
import connect from "@/config/db";
import { getUserId } from "../helper";
import orderModel from "@/models/order.model";

export async function getAllOrders() {
  await connect();
  try {
    const userId = await getUserId();
    if (!userId || userId === "") {
      throw new Error("Please Login");
    }

    //todo: check if admin

    const res = await orderModel
      .find({})
      .populate({
        path: "products.product",
        select: "imageUrl title brand",
      })
      .sort({ orderDate: -1 });
    // console.log("orders", res);
    return await JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
}

export async function updateOrderStatus(
  orderId: any,
  productId: any,
  status: string
) {
  await connect();
  try {
    const userId = await getUserId();
    if (!userId || userId === "") {
      throw new Error("Please Login");
    }

    //todo: check if admin

    const res = await orderModel
      .findOneAndUpdate(
        { _id: orderId, "products.product": productId },
        { $set: { "products.$.orderStatus": status } },
        { new: true }
      )
      .populate({
        path: "products.product",
        select: "imageUrl title brand",
      });
    // console.log(res);
    return await JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
}
