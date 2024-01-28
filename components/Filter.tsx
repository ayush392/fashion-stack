"use client";
import { useState } from "react";
import { getFilter } from "@/utils/cartController";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

function Filter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState([] as any);
  const [color, setColor] = useState([] as any);
  const [limit, setLimit] = useState(8);

  async function getData() {
    // console.log(searchParams);
    const gender = searchParams.get("gender");
    const category = searchParams.get("category");
    const { categories, colors } = await getFilter(gender, category);
    setCategory(categories);
    setColor(colors);
  }

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.forEach((val, key) => {
      params.delete(key);
    });
    router.push(pathname);
    // getData();
  };

  useEffect(() => {
    getData();
  }, [searchParams]);

  const createQueryString = useCallback(
    (name: string, value: string, checked: boolean) => {
      const params = new URLSearchParams(searchParams.toString());
      //   console.log(params.get("color"));
      if (name === "gender") {
        params.set(name, value);
        return params.toString();
      }
      if (checked) {
        let newVal = value;
        if (params.has(name)) {
          newVal = newVal + "," + params?.get(name);
        }
        params.set(name, newVal);
      } else {
        let x =
          params.getAll(name).length > 0
            ? params.getAll(name)[0].split(",")
            : [];
        // console.log(x[0], typeof x[0]);

        if (x.length <= 1) {
          params.delete(name);
        } else {
          const y = x.filter((val) => val !== value);
          params.delete(name);
          params.append(name, y.toString());
        }
      }
      return params.toString();
    },
    [searchParams]
  );

  const isChecked = (name: string, value: string) => {
    return searchParams.get(name)?.split(",").includes(value);
  };

  const handleChange = (e: any) => {
    const { name, value, checked } = e.target;
    router.push(pathname + "?" + createQueryString(name, value, checked));
  };

  return (
    <div className="text-sm md:w-56">
      <div className="flex justify-between items-center border-b pb-3 pl-4 pr-3">
        <h2 className="md:text-lg font-bold">FILTERS</h2>
        <button className="font-medium text-red-600" onClick={handleClear}>
          Clear All
        </button>
      </div>

      <div className=" border-r border-b pb-3 pl-4">
        <h2 className="font-semibold py-3">GENDER</h2>
        <div>
          <div>
            <input
              id="gender"
              type="radio"
              value="Men"
              name="gender"
              onChange={handleChange}
              checked={isChecked("gender", "Men")}
            />
            <label className="ml-2" htmlFor="gender">
              Men
            </label>
          </div>
          <div>
            <input
              id="gender"
              type="radio"
              value="Women"
              name="gender"
              onChange={handleChange}
              checked={isChecked("gender", "Women")}
            />
            <label className="ml-2" htmlFor="gender">
              Women
            </label>
          </div>
        </div>
      </div>

      <div className=" border-r border-b pb-3 pl-4">
        <h2 className="font-semibold py-3">CATEGORIES</h2>
        <div>
          {category.map((cat: string, i: number) => {
            return (
              <div key={i}>
                <input
                  id="category"
                  type="checkbox"
                  value={cat}
                  name="category"
                  onChange={handleChange}
                  checked={isChecked("category", cat)}
                />
                <label className="ml-2" htmlFor="category">
                  {cat}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      <div className=" border-r border-b pb-3 pl-4">
        <h2 className="font-semibold py-3">COLORS</h2>
        <div>
          {color.slice().map((col: string, i: number) => {
            return (
              <div key={i}>
                <input
                  id="color"
                  type="checkbox"
                  value={col}
                  name="color"
                  onChange={handleChange}
                  checked={isChecked("color", col)}
                />
                <label className="ml-2" htmlFor="color">
                  {col}
                </label>
              </div>
            );
          })}
          {limit > 8 ? (
            <p
              className=" cursor-pointer text-center text-sm text-blue-600"
              onClick={() => setLimit(8)}
            >
              Show Less
            </p>
          ) : (
            <p
              className=" cursor-pointer text-center text-sm text-blue-600"
              onClick={() => setLimit(color.length)}
            >
              Show More{" "}
            </p>
          )}
        </div>
      </div>
    </div>

    // <div className="my-4 border">
    //   <p>Filter</p>
    //   <input
    //     id="check"
    //     type="checkbox"
    //     value="black"
    //     name="color"
    //     onChange={handleChange}
    //   />
    //   <label htmlFor="check">Black</label>

    //   <input
    //     id="check2"
    //     type="checkbox"
    //     value="Men"
    //     name="gender"
    //     onChange={handleChange}
    //   />
    //   <label htmlFor="check2">Men</label>
    // </div>
  );
}

export default Filter;
