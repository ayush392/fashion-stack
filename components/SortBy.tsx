"use client";
import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SortBy() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <div className="text-sm md:text-base text-end mb-2">
      <label htmlFor="sort-select">Sort by: </label>
      <select
        name="sort"
        id="sort-select"
        className="border rounded-md p-1 md:p-2 font-medium focus:outline-none"
        onChange={(e) =>
          router.push(
            pathname + "?" + createQueryString("sort", e.target.value)
          )
        }
      >
        <option value="recommended">Recommended</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="discount_desc">Discount: High to Low</option>
      </select>
    </div>
  );
}

export default SortBy;
