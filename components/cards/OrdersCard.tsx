// "use client";
// import React from "react";
import Image from "next/image";

function OrdersCard({ item }: any) {
  return (
    <>
      <div className="border rounded-md">
        <h1 className=" bg-gray-50 p-2 font-semibold">
          Status: {item.orderStatus}
        </h1>
        <div className="flex gap-3 md:gap-4 p-3">
          <Image
            className="w-[80px] h-[120px] md:w-[92px] md:h-[135px] rounded-sm"
            src={item.product.imageUrl}
            alt={item.product.title}
            height={135}
            width={92}
          />
          <div>
            <h1 className="font-semibold">{item.product.brand}</h1>
            <p className="text-xs md:text-sm">{item.product.title}</p>
            <p className="">{`Size: ${item.size}`}</p>
            <p className="">{`Quantity: ${item.quantity}`}</p>
            <h1 className="font-medium">{`Price per Item: Rs.${item.price}`}</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrdersCard;
