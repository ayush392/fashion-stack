import connect from "@/config/db";
import productModel from "@/models/product.model";
import Card from "@/components/Card";

async function Products({ searchParams }: any) {
  await connect();
  console.log("params", searchParams);

  const res = await productModel.where("category").equals("dress");
  const products = await JSON.parse(JSON.stringify(res));
  console.log("pro", products);

  // const res = await productModel.deleteMany({ color: "" });
  // console.log(res);

  return (
    <div className="">
      <h1 className="text-xl md:text-2xl lg:text-3xl mb-4">Products</h1>
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5 xl:gap-7">
        {products.map((product: any, i: number) => {
          return <Card key={i} product={product} i={i} />;
        })}
      </div>
    </div>
  );
}

export default Products;
