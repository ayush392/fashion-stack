// import React from 'react'
import connect from "@/config/db";
import productModel from "@/models/product.model";
import Image from "next/image";
import Button from "@/components/Button";
import Size from "@/components/Size";
import Quantity from "@/components/Quantity";
import accountModel from "@/models/account.model";
import { getUserId } from "@/utils/helper";

// async function updateColor(formData: any) {
//   "use server";
//   console.log("formdata", formData.get("color"));
//   // console.log(params);
//   const res = await productModel.findByIdAndUpdate(
//     { _id: formData.get("id") },
//     { color: formData.get("color") },
//     { replace: true }
//   );
//   console.log(res);
// }

async function SingleProduct({ params }: any) {
  await connect();
  const res = await productModel.findOne({ _id: params.id });
  const userId = await getUserId();

  const inCart =
    userId === ""
      ? 0
      : await accountModel.countDocuments({
          user: userId,
          "cart.product": params.id,
        });

  const inWishlist =
    userId === ""
      ? 0
      : await accountModel.countDocuments({
          user: userId,
          "wishlist.product": params.id,
        });

  const product = await JSON.parse(JSON.stringify(res));

  let rupee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  return (
    // Navbar
    <div className="w-full max-w-screen-lg m-auto">
      <div className="flex flex-col md:flex-row md:gap-x-6">
        <div className="w-full">
          <Image
            className="block w-full rounded-b-xl md:rounded-lg h-auto max-h-svh"
            src={product.imageUrl}
            alt={product.title}
            height={1600}
            width={600}
          />
        </div>
        <div className="m-3 md:w-full">
          {/* brand title description <price, mrp, discount> size*/}
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
            {product.brand}
          </h1>
          <h2 className="text-lg md:text-xl lg:text-2xl text-gray-700 font-medium">
            {product.title}
          </h2>
          <div className="my-2 md:my-4 lg:my-5 text-gray-700">
            <p className=" md:text-lg border-b mb-1">Description: </p>
            <p className=" text-sm md:text-base lg:text-lg ">
              {product.description}
            </p>
          </div>
          <div className="flex gap-2 my-3 md:my-4 lg:my-5 items-baseline">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold">
              {rupee.format(product.price)}
            </h2>
            <h3 className=" text-gray-700 font-semibold line-through">
              {rupee.format(product.mrp)}
            </h3>
            <h3 className=" text-green-500">{`(${product.discount}% OFF)`}</h3>
          </div>

          <div className="flex my-3 md:my-4 lg:my-5 gap-3">
            <Size sizes={product.sizes} />
          </div>

          <Quantity />

          <div className="flex gap-3 my-3 md:my-4 lg:my-5">
            <Button
              btnName={inWishlist ? "Go to Wishlist" : "Add to Wishlist"}
              action={inWishlist ? "gotoWishlist" : "addToWishlist"}
              clsName="w-full font-semibold px-3 py-2 border rounded-lg hover:border-black"
            />
            <Button
              btnName={inCart ? "Go to Cart" : "Add to Cart"}
              action={inCart ? "goToCart" : "addToCart"}
              clsName="w-full font-semibold px-3 py-2 md:py-3 bg-green-600 hover:bg-green-700 text-white border rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
