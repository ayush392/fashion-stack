"use server";
import connect from "@/config/db";
import { getUserId } from "../helper";
import orderModel from "@/models/order.model";
import productModel from "@/models/product.model";

// create order
// get orders

export async function createOrder(
  cartItems: any,
  orderAmount: number,
  shippingAddress: any
) {
  await connect();
  const userId = await getUserId();
  if (!userId || !orderAmount || !shippingAddress?.house) return "Invalid data";
  //   console.log(cartItems, orderAmount, shippingAddress);
  try {
    let pro = [] as any;
    cartItems.forEach((item: any) => {
      const obj = {} as any;
      //
      obj.product = item.product._id;
      obj.quantity = item.quantity;
      obj.size = item.size;
      obj.price = item.product.price;
      pro.push(obj);
    });

    console.log(cartItems, pro);

    const res = await orderModel.create({
      user: userId,
      products: pro,
      orderAmount,
      shippingAddress,
    });
    //clear cart
    return "Order placed";
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
}

export async function getOrders() {
  await connect();
  try {
    const userId = await getUserId();
    if (!userId || userId === "") {
      throw new Error("Please Login");
    }

    const res = await orderModel.find({ user: userId }).populate({
      path: "products.product",
      select: "imageUrl title brand",
    });
    return await JSON.parse(JSON.stringify(res));
  } catch (error) {
    console.log(error);
    return (error as Error).message;
  }
}
