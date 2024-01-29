"use client";
import { useEffect, useState } from "react";
import {
  addToCartFromWishlist,
  getWishlist,
} from "@/utils/controller/wishlistController";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Wishlist() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  async function fetchData() {
    const res = await getWishlist();
    console.log(res);
    setProducts(res);
  }

  async function handleMove(productId: string, size: string) {
    try {
      const res = await addToCartFromWishlist(productId, size);
      setProducts(res);
      alert("Product moved to cart");
    } catch (error: any) {
      alert(error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-screen-xl m-auto">
      <h1 className="text-xl font-bold my-3">
        My Wishlist
        <span className=" font-medium text-lg">{` (${products.length} items)`}</span>
      </h1>

      <div className="flex flex-wrap justify-between">
        {products.length > 0 &&
          products.map((data: any, i: number) => {
            return (
              <div
                key={i}
                className=" w-fit max-w-[49%] mb-2 sm:max-w-[210px] border cursor-pointer lg:m-4 lg:ml-0"
              >
                <Image
                  className=" aspect-[3/4]"
                  src={data.product.imageUrl}
                  alt={data.product.title}
                  height={280}
                  width={210}
                  onClick={() => router.push(`/products/${data.product._id}`)}
                />
                <div className="px-2 py-1">
                  <p className=" text-xs text-slate-700 truncate my-2">
                    {data.product.title}
                  </p>
                  <div className="flex gap-1 text-xs lg:text-sm items-baseline my-2">
                    <p className=" text-sm lg:text-base font-bold">{`Rs. ${data.product.price}`}</p>
                    <p className=" line-through text-gray-500">
                      {data.product.mrp}{" "}
                    </p>
                    <p className="text-green-500">{`(-${data.product.discount}%)`}</p>
                  </div>
                </div>
                <button
                  className="w-full border-t py-2 text-center font-semibold text-orange-600"
                  onClick={() =>
                    handleMove(data.product._id, data.product.sizes[0])
                  }
                >
                  Move to Cart
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Wishlist;
