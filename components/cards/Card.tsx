"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Card({ product, i }: any) {
  //   let rupee = new Intl.NumberFormat('en-IN', {
  //     style: 'currency',
  //     currency: 'INR',
  // });
  // console.log(product);
  const router = useRouter();

  return (
    <div
      className="w-full border hover:shadow-lg cursor-pointer"
      onClick={() => router.push(`/products/${product._id}`)}
    >
      <Image
        className="w-full h-[225px] sm:h-[275px] lg:h-[300px] border-b"
        src={product.imageUrl}
        alt={product.title}
        height={280}
        width={210}
      />
      <div className="px-2 py-1">
        <p className=" font-semibold truncate">{product.brand}</p>
        <p className=" text-xs text-slate-700 truncate">{product.title}</p>
        <div className="flex gap-1 text-xs lg:text-sm items-baseline">
          <p className=" text-sm lg:text-base font-bold">{`Rs. ${product.price}`}</p>
          <p className=" line-through text-gray-500">{product.mrp} </p>
          <p className="text-green-500">{`(-${product.discount}%)`}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
