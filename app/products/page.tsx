import connect from "@/config/db";
import productModel from "@/models/product.model";
import Card from "@/components/Card";
import Filter from "@/components/Filter";

async function Products({ searchParams }: any) {
  await connect();
  let { category, gender, query, color, sort, page, limit } = searchParams;
  // if (searchParams) console.log(searchParams, "is empty");

  // if (!gender) gender = "Women";

  // <------------------- SEARCH USING REGEX IN ARRAY ------------------>
  //   var keywords = ["xd", "sd", "ad"],
  //     regex = keywords.join("|");
  // db.papertest.find({
  //     "category": {
  //         "$regex": regex,
  //         "$options": "i"
  //     }
  // });

  if (!page) page = 0;
  if (!limit) limit = 15;
  limit = Math.min(limit, 15);

  let myFilterObj: any = {};
  let sortObj: any = {};

  if (query) {
    let regex = { $regex: `/${query}/i` };
    let x = {
      $or: [
        { title: regex },
        { description: regex },
        { brand: regex },
        { color: regex },
        { category: regex },
      ],
    };
  }

  if (category) {
    let catArr: string[] = category.split(",");
    myFilterObj.category = { $in: catArr };
  }

  if (color) {
    let colorArr: string[] = color.split(",");
    myFilterObj.color = { $in: colorArr };
  }

  if (gender) {
    myFilterObj.gender = gender;
  }

  switch (sort) {
    case "price_asc":
      sortObj.price = 1;
      break;
    case "price_desc":
      sortObj.price = -1;
      break;
    case "discount_desc":
      sortObj.discount = -1;
      break;
  }

  const res = await productModel
    .find(myFilterObj)
    .skip(page * limit)
    .limit(limit)
    .sort(sortObj)
    .select("imageUrl brand title price mrp discount");
  const products = await JSON.parse(JSON.stringify(res));
  // console.log(products);

  return (
    <div>
      <h1 className="text-xl md:text-2xl lg:text-3xl mb-4">Products</h1>
      <Filter />
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5 xl:gap-7">
        {products.map((product: any, i: number) => {
          return <Card key={i} product={product} i={i} />;
        })}
      </div>
      {/* Pagination */}
      {/* <div className="pt-3 my-3 text-lg border-t text-center">Pagination</div> */}
      <div className="pt-3 my-3 text-2xl border-t text-center font-bold">
        FOOTER
      </div>
    </div>
  );
}

export default Products;
