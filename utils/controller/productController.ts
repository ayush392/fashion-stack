"use server";
import connect from "@/config/db";
import productModel from "@/models/product.model";

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
