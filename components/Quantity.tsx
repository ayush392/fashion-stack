"use client";
import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Quantity() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      if (value === "0") {
        return "";
      }
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <>
      <h3 className="text-base font-semibold mb-2">Select Quantity: </h3>
      <select
        className="border rounded-md p-1 w-20"
        onChange={(e) =>
          router.push(
            pathname + "?" + createQueryString("quantity", e.target.value)
          )
        }
      >
        <option value="1"> 1</option>
        <option value="2"> 2</option>
        <option value="3"> 3</option>
        <option value="4"> 4</option>
        {/* <option value="5"> 5</option> */}
      </select>
    </>
  );
}

export default Quantity;
