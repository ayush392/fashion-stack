"use client";
import React from "react";
import Image from "next/image";
import { removeFromCart, updateCart } from "@/utils/controller/cartController";

function CartCard({ product, quantity, size, setData }: any) {
  async function handleUpdate(quantity: any, size: any, id: any) {
    const res = await updateCart(id, quantity, size);
    setData(res);
  }

  async function handleDelete(id: any) {
    if (confirm("Are you sure you want to delete this item?")) {
      const res = await removeFromCart(id);
      setData(res);
    }
  }

  return (
    <>
      <div className="m-2 border rounded">
        <div className="flex p-3 gap-3 relative">
          <Image
            className=" w-28 h-36 border rounded"
            src={product?.imageUrl}
            alt={product?.title}
            height={600}
            width={150}
          />
          <div className="flex flex-col justify-between">
            <p className="font-semibold truncate">{product?.brand}</p>
            <p className=" text-xs md:text-sm text-slate-700">
              {product?.title}
            </p>
            {/* size and quantity */}
            <div className="flex gap-3">
              <label htmlFor="quantity" className="text-sm font-medium">
                Quantity:
                <select
                  defaultValue={quantity}
                  name="quantity"
                  id="quantity"
                  className="border rounded px-1 py-px ml-1"
                  onChange={(e) =>
                    handleUpdate(e.target.value, size, product?._id)
                  }
                >
                  {[1, 2, 3, 4].map((x) => {
                    return (
                      <option key={x} value={x}>
                        {x}
                      </option>
                    );
                  })}
                </select>
              </label>

              <label htmlFor="size" className="text-sm font-medium">
                Size:
                <select
                  name="size"
                  id="size"
                  defaultValue={size}
                  className="border rounded px-1 py-px ml-1"
                  onChange={(e) =>
                    handleUpdate(quantity, e.target.value, product?._id)
                  }
                >
                  {product?.sizes?.map((size: any, i: number) => {
                    return (
                      <option key={i} value={size}>
                        {size}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>

            <div className="flex gap-1 text-xs lg:text-sm items-baseline">
              <p className=" text-sm lg:text-base font-bold">{`Rs. ${
                product?.price * quantity
              }`}</p>
              <p className=" line-through text-gray-500">
                {`Rs.${product?.mrp * quantity}`}
              </p>
              <p className="text-green-500">{`${product?.discount}% OFF`}</p>
            </div>
            <p className="text-xs text-gray-500">
              <span className="font-bold">7 days</span> return available
            </p>
          </div>
          <button
            onClick={() => handleDelete(product?._id)}
            className="absolute right-0 top-0 mt-3 mr-3 bg-red-500 size-4"
          ></button>
        </div>
      </div>
    </>
  );
}

export default CartCard;
