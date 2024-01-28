// "use client";
// import { getCart } from "@/utils/productData";
// import { useEffect, useState } from "react";

// function Cart() {
//   const [data, setData] = useState([]);

//   async function fetchCartData() {
//     const res = await getCart();
//     console.log(res);
//   }

//   useEffect(() => {
//     fetchCartData();
//   }, []);

//   return <div>Cart</div>;
// }

// export default Cart;

// import React from 'react'
import connect from "@/config/db";
import accountModel from "@/models/account.model";
import { getUserId } from "@/utils/cartController";
import CartCard from "@/components/cards/CartCard";

async function Cart() {
  await connect();
  const userId = await getUserId();

  const res = await accountModel
    .findOne({ user: userId })
    .populate({
      path: "cart.product",
      select: "imageUrl title price mrp discount brand sizes",
    })
    .select("cart");

  const cartItems = await JSON.parse(JSON.stringify(res.cart));
  let totalPrice = 0,
    totalDiscount = 0,
    totalMrp = 0;

  cartItems.forEach((item: any) => {
    totalPrice += item.product.price * item.quantity;
    totalMrp += item.product.mrp * item.quantity;
    totalDiscount += totalMrp - totalPrice;
  });

  // console.log(cartItems);

  let rupee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  return (
    // Navbar
    <div className="w-full max-w-screen-lg m-auto text-gray-700">
      <div className="flex flex-col md:flex-row md:gap-x-6">
        <div className="w-full">
          {cartItems.map((item: any, i: number) => {
            return (
              <CartCard
                key={i}
                product={item.product}
                quantity={item.quantity}
                size={item.size}
                i={i}
              />
            );
          })}
        </div>
        <div className="m-3 md:w-full lg:w-3/5 ">
          <div className="flex flex-col ">
            <h3 className="font-bold mb-3">{`Price Details (${cartItems.length} Items)`}</h3>
            <div className="flex justify-between mb-3">
              <h3>Total MRP</h3>
              <h3>{rupee.format(totalMrp)}</h3>
            </div>
            <div className="flex justify-between mb-3">
              <h3>Discount on MRP</h3>
              <h3 className="text-green-600">
                - {rupee.format(totalDiscount)}
              </h3>
            </div>
            <div className="flex justify-between mb-3">
              <h3>Platform Fee</h3>
              <h3 className="text-green-600">FREE</h3>
            </div>
            <div className="flex justify-between mb-3">
              <h3>Shipping Fee</h3>
              <h3 className="text-green-600">FREE</h3>
            </div>
            <hr className="mb-3" />
            <div className="flex justify-between mb-3">
              <h2 className="font-bold">Total Amount</h2>
              <h2 className="font-bold">{rupee.format(totalPrice)}</h2>
            </div>

            <button className=" w-full text-center font-bold py-2 bg-orange-600 border  text-white">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
